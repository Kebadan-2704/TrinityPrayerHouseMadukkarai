import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let supabaseAdmin: SupabaseClient | null = null;

function getSupabaseAdmin() {
  if (supabaseAdmin) return supabaseAdmin;

  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!supabaseUrl || !serviceRoleKey) return null;

  supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
  return supabaseAdmin;
}

function configureWebPush() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
  const privateKey = process.env.VAPID_PRIVATE_KEY || '';

  if (!publicKey || !privateKey) return false;

  webpush.setVapidDetails('mailto:contact@trinityprayerhouse.com', publicKey, privateKey);
  return true;
}

export async function GET(request: Request) {
  const expectedSecret = process.env.CRON_SECRET;
  if (!expectedSecret) {
    console.error('CRON_SECRET is not configured');
    return new Response('Server misconfigured - CRON_SECRET not set', { status: 500 });
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${expectedSecret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Push subscription storage is not configured' }, { status: 500 });
    }

    if (!configureWebPush()) {
      return NextResponse.json({ error: 'Web push is not configured' }, { status: 500 });
    }

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

    const payload = JSON.stringify({
      title: 'Trinity Prayer House',
      body: 'We will be having a meet in 10 minutes. Join us!',
      url: '/online-meet',
    });

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
        if (typeof err === 'object' && err !== null && 'statusCode' in err) {
          const statusCode = (err as { statusCode: number }).statusCode;
          if (statusCode === 404 || statusCode === 410) {
            console.log(`Subscription ${sub.id} expired or unsubscribed. Deleting...`);
            await supabase.from('push_subscriptions').delete().eq('id', sub.id);
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
