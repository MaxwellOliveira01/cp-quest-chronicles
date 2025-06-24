
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  handle TEXT NOT NULL UNIQUE,
  university TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create universities table
CREATE TABLE public.universities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contests table
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

-- Create teams table
CREATE TABLE public.teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  university TEXT NOT NULL,
  members JSONB DEFAULT '[]'::jsonb,
  contests JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  participants JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (admin functionality)
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
