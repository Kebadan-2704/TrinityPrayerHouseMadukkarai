import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { supabase } from '@/lib/supabase';

// Configure Web Push with VAPID keys
webpush.setVapidDetails(
  'mailto:contact@trinityprayerhouse.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

export async function GET(request: Request) {
  // Optional: Add a simple security check so only Vercel Cron can call this
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // 1. Fetch all subscriptions from Supabase
    const { data: subscriptions, error } = await supabase
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
    const sendPromises = subscriptions.map(async (sub: any) => {
      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      };

      try {
        await webpush.sendNotification(pushSubscription, payload);
      } catch (err: any) {
        // If a subscription is no longer valid (e.g. user revoked permission), we delete it
        if (err.statusCode === 404 || err.statusCode === 410) {
          console.log(`Subscription ${sub.id} expired or unsubscribed. Deleting...`);
          await supabase.from('push_subscriptions').delete().eq('id', sub.id);
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
