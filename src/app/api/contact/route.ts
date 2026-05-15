import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, subject, message } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'First name, email, and message are required.' }, { status: 400 });
    }

    // ── 1. Save to Supabase ──────────────────────────────────────────────────
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      first_name: firstName,
      last_name: lastName || '',
      email,
      phone: phone || '',
      subject: subject || 'General Enquiry',
      message,
      status: 'new',
    });

    if (dbError) {
      console.error('Supabase contact save error:', dbError);
    }

    // ── 2. Send email via Web3Forms ──────────────────────────────────────────
    const web3formsKey = process.env.WEB3FORMS_API_KEY;
    if (web3formsKey) {
      try {
        const fullName = [firstName, lastName].filter(Boolean).join(' ');
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: fullName,
            email,
            phone: phone || '',
            subject: `[TPH Contact] ${subject || 'General Enquiry'}`,
            message,
          }),
        });
      } catch (emailErr) {
        console.error('Web3Forms send error:', emailErr);
        // Non-fatal — data already saved to Supabase
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
