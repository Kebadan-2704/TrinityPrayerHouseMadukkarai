-- ============================================================
-- Trinity Prayer House Madukkarai — Supabase Schema
-- ============================================================
-- Run this in your Supabase SQL Editor once.
-- ============================================================

-- ── 1. Push Notifications (existing) ───────────────────────────
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint text UNIQUE NOT NULL,
  p256dh text NOT NULL,
  auth text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE IF EXISTS push_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous inserts to push_subscriptions" ON push_subscriptions;
DROP POLICY IF EXISTS "Deny anonymous reads from push_subscriptions" ON push_subscriptions;

CREATE POLICY "Allow anonymous inserts to push_subscriptions" ON push_subscriptions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Deny anonymous reads from push_subscriptions" ON push_subscriptions
  FOR SELECT TO anon USING (false);

-- ── 2. Contact Form Submissions ────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text,
  email text NOT NULL,
  phone text,
  subject text DEFAULT 'General Enquiry',
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new','read','replied','closed')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE IF EXISTS contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous inserts to contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Deny anonymous reads from contact_submissions" ON contact_submissions;

CREATE POLICY "Allow anonymous inserts to contact_submissions" ON contact_submissions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Deny anonymous reads from contact_submissions" ON contact_submissions
  FOR SELECT TO anon USING (false);

-- ── 3. Prayer Requests ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS prayer_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text,
  prayer_need text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new','praying','answered','closed')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE IF EXISTS prayer_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous inserts to prayer_requests" ON prayer_requests;
DROP POLICY IF EXISTS "Deny anonymous reads from prayer_requests" ON prayer_requests;

CREATE POLICY "Allow anonymous inserts to prayer_requests" ON prayer_requests
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Deny anonymous reads from prayer_requests" ON prayer_requests
  FOR SELECT TO anon USING (false);

-- ── 4. Newsletter Subscribers ───────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text,
  source text DEFAULT 'website',
  subscribed_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE IF EXISTS newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous inserts to newsletter_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Deny anonymous reads from newsletter_subscribers" ON newsletter_subscribers;

CREATE POLICY "Allow anonymous inserts to newsletter_subscribers" ON newsletter_subscribers
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Deny anonymous reads from newsletter_subscribers" ON newsletter_subscribers
  FOR SELECT TO anon USING (false);

-- ── 5. Indexes for fast lookups ────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_contact_email    ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_status   ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_prayer_status    ON prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
