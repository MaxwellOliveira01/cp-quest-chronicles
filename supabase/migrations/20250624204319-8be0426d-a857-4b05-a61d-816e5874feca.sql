
-- First, let's drop existing tables to start fresh with proper relationships
DROP TABLE IF EXISTS public.teams CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.universities CASCADE;
DROP TABLE IF EXISTS public.contests CASCADE;

-- Create universities table first (no dependencies)
CREATE TABLE public.universities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create profiles table with FK to universities
CREATE TABLE public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  handle TEXT NOT NULL UNIQUE,
  university_id UUID REFERENCES public.universities(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contests table (no dependencies)
CREATE TABLE public.contests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM now()),
  official_url TEXT NOT NULL,
  problems_url TEXT,
  solutions_url TEXT,
  problem_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create events table (no dependencies)
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create teams table with FK to universities and member FKs
CREATE TABLE public.teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  university_id UUID REFERENCES public.universities(id) ON DELETE SET NULL,
  member1_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  member2_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  member3_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create N:N relationship table between teams and profiles
CREATE TABLE public.team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(team_id, profile_id)
);

-- Create N:N relationship table between profiles and events
CREATE TABLE public.profile_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(profile_id, event_id)
);

-- Create contest performance table for profiles/teams
CREATE TABLE public.contest_performances (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contest_id UUID NOT NULL REFERENCES public.contests(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CHECK ((profile_id IS NOT NULL AND team_id IS NULL) OR (profile_id IS NULL AND team_id IS NOT NULL))
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contest_performances ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Enable read access for all users" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.profiles FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.profiles FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON public.universities FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.universities FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.universities FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.universities FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON public.contests FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.contests FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.contests FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.contests FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.teams FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.teams FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.teams FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON public.events FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.events FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.events FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.team_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.team_members FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.team_members FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON public.profile_events FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.profile_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.profile_events FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.profile_events FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON public.contest_performances FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.contest_performances FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.contest_performances FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.contest_performances FOR DELETE USING (true);
