
import { supabase } from '@/integrations/supabase/client';

export const TEAM_SELECT_QUERY = `
  *,
  universities (
    name
  ),
  member1:persons!teams_person1_id_fkey (
    id,
    name
  ),
  member2:persons!teams_person2_id_fkey (
    id,
    name
  ),
  member3:persons!teams_person3_id_fkey (
    id,
    name
  )
`;

export const TEAM_MEMBERS_QUERY = `
  persons (
    id,
    name
  )
`;

export const CONTEST_PERFORMANCES_QUERY = `
  position,
  contests (
    id,
    name,
    year
  )
`;

export async function fetchTeamById(id: string) {
  const { data, error } = await supabase
    .from('teams')
    .select(TEAM_SELECT_QUERY)
    .eq('id', id)
    .single();
  
  if (error) {
    throw new Error('Failed to fetch team');
  }
  
  return data;
}

export async function fetchAllTeams() {
  const { data, error } = await supabase
    .from('teams')
    .select(TEAM_SELECT_QUERY);
  
  if (error) {
    throw new Error('Failed to fetch teams');
  }
  
  return data;
}

export async function fetchTeamMembers(teamId: string) {
  const { data, error } = await supabase
    .from('team_members')
    .select(TEAM_MEMBERS_QUERY)
    .eq('team_id', teamId);

  if (error) {
    throw new Error('Failed to fetch team members');
  }

  return data || [];
}

export async function fetchAllTeamMembers(teamIds: string[]) {
  const { data, error } = await supabase
    .from('team_members')
    .select(`
      team_id,
      ${TEAM_MEMBERS_QUERY}
    `)
    .in('team_id', teamIds);

  if (error) {
    throw new Error('Failed to fetch team members');
  }

  return data || [];
}

export async function fetchContestPerformances(teamId: string) {
  const { data, error } = await supabase
    .from('contest_performances')
    .select(CONTEST_PERFORMANCES_QUERY)
    .eq('team_id', teamId);

  if (error) {
    throw new Error('Failed to fetch contest performances');
  }

  return data || [];
}

export async function fetchAllContestPerformances(teamIds: string[]) {
  const { data, error } = await supabase
    .from('contest_performances')
    .select(`
      team_id,
      ${CONTEST_PERFORMANCES_QUERY}
    `)
    .in('team_id', teamIds);

  if (error) {
    throw new Error('Failed to fetch contest performances');
  }

  return data || [];
}
