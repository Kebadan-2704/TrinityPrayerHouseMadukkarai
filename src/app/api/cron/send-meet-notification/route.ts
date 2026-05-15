import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, ''),
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Configure Web Push with VAPID keys
webpush.setVapidDetails(
  'mailto:contact@trinityprayerhouse.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

export async function GET(request: Request) {
  // Enforce auth: reject if CRON_SECRET is unset or header is missing/wrong
  const expectedSecret = process.env.CRON_SECRET;
  if (!expectedSecret) {
    console.error('CRON_SECRET is not configured');
    return new Response('Server misconfigured — CRON_SECRET not set', { status: 500 });
  }
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${expectedSecret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // 1. Fetch all subscriptions from Supabase using the admin client
    const { data: subscriptions, error } = await supabaseAdmin
      .from('push_subscriptions')
      .select('*');

    if (error) {
      console.error('Failed to fetch subscriptions:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ success: true, message: 'No subscriptions found' });
    }

    // 2. Prepare the payload
    const payload = JSON.stringify({
      title: 'Trinity Prayer House',
      body: 'We will be having a meet in 10 minutes. Join us!',
      url: '/online-meet',
    });

    // 3. Send pushes to everyone in parallel
    const sendPromises = subscriptions.map(async (sub: { id: string; endpoint: string; p256dh: string; auth: string }) => {
      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      };

      try {
        await webpush.sendNotification(pushSubscription, payload);
      } catch (err: unknown) {
        // If a subscription is no longer valid (e.g. user revoked permission), we delete it
        if (typeof err === 'object' && err !== null && 'statusCode' in err) {
          const statusCode = (err as { statusCode: number }).statusCode;
          if (statusCode === 404 || statusCode === 410) {
            console.log(`Subscription ${sub.id} expired or unsubscribed. Deleting...`);
            await supabaseAdmin.from('push_subscriptions').delete().eq('id', sub.id);
          } else {
            console.error('Failed to send push to subscription:', sub.id, err);
          }
        } else {
          console.error('Failed to send push to subscription:', sub.id, err);
        }
      }
    });

    await Promise.all(sendPromises);

    return NextResponse.json({ success: true, count: subscriptions.length });
  } catch (error) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
