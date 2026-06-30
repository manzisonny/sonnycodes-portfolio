-- ============================================================
-- SONNYCODES PORTFOLIO — SUPABASE DATABASE SETUP
-- Run this entire file in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- 1. PROJECTS TABLE (for GitHub repo sync)
create table if not exists projects (
  id          bigserial primary key,
  name        text unique not null,
  description text,
  html_url    text,
  homepage    text,
  language    text,
  topics      text[] default '{}',
  stars       int default 0,
  forks       int default 0,
  account     text,           -- 'personal' or 'company'
  created_at  timestamptz,
  updated_at  timestamptz default now()
);

-- 2. MESSAGES TABLE (contact form)
create table if not exists messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  source     text,
  is_read    boolean default false,
  created_at timestamptz default now()
);

-- 3. COLLABORATIONS TABLE (collab form)
create table if not exists collaborations (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  company    text,
  email      text not null,
  idea       text not null,
  budget     text,
  timeline   text,
  tech_stack text[] default '{}',
  status     text default 'new',   -- new | reviewing | accepted | declined
  brief_url  text,
  created_at timestamptz default now()
);

-- 4. CALL BOOKINGS TABLE (book a call form)
create table if not exists call_bookings (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  email          text not null,
  preferred_date date not null,
  preferred_time text not null,
  topic          text not null,
  notes          text,
  status         text default 'pending',  -- pending | confirmed | completed | cancelled
  created_at     timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
alter table projects      enable row level security;
alter table messages      enable row level security;
alter table collaborations enable row level security;
alter table call_bookings  enable row level security;

-- PROJECTS: public read (so the portfolio can fetch them)
create policy "Public can read projects"
  on projects for select using (true);

-- PROJECTS: only service role can insert/update (via sync API)
create policy "Service role can upsert projects"
  on projects for all using (auth.role() = 'service_role');

-- MESSAGES: anyone can insert (contact form submissions)
create policy "Anyone can submit messages"
  on messages for insert with check (true);

-- MESSAGES: only authenticated admin can read/update/delete
create policy "Admin can manage messages"
  on messages for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- COLLABORATIONS: anyone can insert
create policy "Anyone can submit collaborations"
  on collaborations for insert with check (true);

-- COLLABORATIONS: only admin can read/update/delete
create policy "Admin can manage collaborations"
  on collaborations for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- CALL BOOKINGS: anyone can insert
create policy "Anyone can submit call bookings"
  on call_bookings for insert with check (true);

-- CALL BOOKINGS: only admin can read/update/delete
create policy "Admin can manage call bookings"
  on call_bookings for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- ============================================================
-- REALTIME (enable for live admin dashboard)
-- ============================================================
alter publication supabase_realtime add table messages;
alter publication supabase_realtime add table collaborations;
alter publication supabase_realtime add table call_bookings;

-- ============================================================
-- DONE. Now fill in your .env.local with:
--   NEXT_PUBLIC_SUPABASE_URL  → Project Settings > API > Project URL
--   NEXT_PUBLIC_SUPABASE_ANON_KEY → Project Settings > API > anon public
--   SUPABASE_SERVICE_ROLE_KEY → Project Settings > API > service_role secret
-- ============================================================
