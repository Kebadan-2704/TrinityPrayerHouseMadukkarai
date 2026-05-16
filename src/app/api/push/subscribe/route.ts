import { NextResponse } from 'next/server';
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

export async function POST(request: Request) {
  try {
    const subscription = await request.json();

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Push subscription storage is not configured' }, { status: 500 });
    }

    const { error } = await supabase
      .from('push_subscriptions')
      .upsert(
        {
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
        { onConflict: 'endpoint' }
      );

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: 'Failed to save subscription' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
