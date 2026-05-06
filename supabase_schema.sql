-- Table: projects
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  html_url text,
  homepage text,
  language text,
  topics text[],
  stars integer DEFAULT 0,
  forks integer DEFAULT 0,
  account text CHECK (account IN ('personal', 'company')),
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table: messages
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  source text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Table: collaborations
CREATE TABLE IF NOT EXISTS collaborations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  idea text NOT NULL,
  budget text,
  timeline text,
  tech_stack text[],
  brief_url text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'accepted', 'declined')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborations ENABLE ROW LEVEL SECURITY;

-- Create Policies (Read-only for public projects)
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);

-- Create Policies (Admin only for messages and collabs)
-- Note: Replace 'your-admin-id' with actual admin auth id if using auth.uid()
-- For now, we'll keep them private (no select for public)
