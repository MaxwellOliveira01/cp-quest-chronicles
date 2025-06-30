
import { supabase } from '@/integrations/supabase/client';
import { RawTeamData, TeamMembership, ContestPerformance } from './types';

export async function fetchTeamById(id: string): Promise<RawTeamData> {
  const { data, error } = await supabase
    .from('teams')
    .select(`
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
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    throw new Error('Failed to fetch team');
  }
  
  return data;
}

export async function fetchAllTeams(): Promise<RawTeamData[]> {
  const { data, error } = await supabase
    .from('teams')
    .select(`
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
    `);
  
  if (error) {
    throw new Error('Failed to fetch teams');
  }
  
  return data;
}

export async function fetchTeamMembers(teamId: string): Promise<TeamMembership[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select(`
      persons (
        id,
        name
      )
    `)
    .eq('team_id', teamId);
  
  if (error) {
    throw new Error('Failed to fetch team members');
  }
  
  return data;
}

export async function fetchAllTeamMembers(teamIds: string[]): Promise<Array<TeamMembership & { team_id: string }>> {
  const { data, error } = await supabase
    .from('team_members')
    .select(`
      team_id,
      persons (
        id,
        name
      )
    `)
    .in('team_id', teamIds);
  
  if (error) {
    throw new Error('Failed to fetch team members');
  }
  
  return data;
}

export async function fetchContestPerformances(teamId: string): Promise<ContestPerformance[]> {
  const { data, error } = await supabase
    .from('contest_performances')
    .select(`
      position,
      contests (
        id,
        name,
        year
      )
    `)
    .eq('team_id', teamId);
  
  if (error) {
    throw new Error('Failed to fetch contest performances');
  }
  
  return data;
}

export async function fetchAllContestPerformances(teamIds: string[]): Promise<Array<ContestPerformance & { team_id: string }>> {
  const { data, error } = await supabase
    .from('contest_performances')
    .select(`
      team_id,
      position,
      contests (
        id,
        name,
        year
      )
    `)
    .in('team_id', teamIds);
  
  if (error) {
    throw new Error('Failed to fetch contest performances');
  }
  
  return data;
}
