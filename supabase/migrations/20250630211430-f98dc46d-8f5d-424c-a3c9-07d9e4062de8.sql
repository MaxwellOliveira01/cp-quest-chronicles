
-- Rename profiles table to persons
ALTER TABLE public.profiles RENAME TO persons;

-- Update foreign key references in other tables
ALTER TABLE public.team_members RENAME COLUMN profile_id TO person_id;
ALTER TABLE public.profile_events RENAME TO person_events;
ALTER TABLE public.person_events RENAME COLUMN profile_id TO person_id;
ALTER TABLE public.contest_performances RENAME COLUMN profile_id TO person_id;

-- Update foreign key constraints names for clarity
ALTER TABLE public.teams RENAME COLUMN member1_id TO person1_id;
ALTER TABLE public.teams RENAME COLUMN member2_id TO person2_id;
ALTER TABLE public.teams RENAME COLUMN member3_id TO person3_id;

-- Update RLS policy names to reflect the new table name
DROP POLICY IF EXISTS "Enable read access for all users" ON public.persons;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.persons;
DROP POLICY IF EXISTS "Enable update for all users" ON public.persons;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.persons;

CREATE POLICY "Enable read access for all users" ON public.persons FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.persons FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.persons FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.persons FOR DELETE USING (true);

-- Update RLS policies for renamed junction tables
DROP POLICY IF EXISTS "Enable read access for all users" ON public.person_events;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.person_events;
DROP POLICY IF EXISTS "Enable update for all users" ON public.person_events;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.person_events;

CREATE POLICY "Enable read access for all users" ON public.person_events FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.person_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.person_events FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON public.person_events FOR DELETE USING (true);
