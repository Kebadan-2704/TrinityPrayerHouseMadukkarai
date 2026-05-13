-- Run this in your Supabase SQL Editor to create the table for Push Notifications
CREATE TABLE push_subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint text UNIQUE NOT NULL,
  p256dh text NOT NULL,
  auth text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optional: Enable Row Level Security (RLS) to keep the table secure
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (so users can subscribe from the website)
CREATE POLICY "Allow anonymous inserts to push_subscriptions" ON push_subscriptions
  FOR INSERT TO anon WITH CHECK (true);

-- Deny read access to anonymous users (for privacy, so users can't see others' endpoints)
CREATE POLICY "Deny anonymous reads from push_subscriptions" ON push_subscriptions
  FOR SELECT TO anon USING (false);
