import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, prayerNeed } = body;

    if (!name || !prayerNeed) {
      return NextResponse.json({ error: 'Name and prayer need are required.' }, { status: 400 });
    }

    // ── 1. Save to Supabase ──────────────────────────────────────────────────
    const { error: dbError } = await supabase.from('prayer_requests').insert({
      name,
      phone: phone || '',
      prayer_need: prayerNeed,
      status: 'new',
    });

    if (dbError) {
      console.error('Supabase prayer save error:', dbError);
    }

    // ── 2. Send email via Web3Forms ──────────────────────────────────────────
    const web3formsKey = process.env.WEB3FORMS_API_KEY;
    if (web3formsKey) {
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3formsKey,
            name,
            phone: phone || 'Not provided',
            subject: '[TPH] New Prayer Request',
            message: prayerNeed,
          }),
        });
      } catch (emailErr) {
        console.error('Web3Forms send error:', emailErr);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Prayer API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
