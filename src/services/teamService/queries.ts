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
    .maybeSingle();
  
  if (error) {
    throw new Error('Failed to fetch team');
  }
  
  if (!data) {
    throw new Error('Team not found');
  }
  
  // Transform the data to match RawTeamData type
  return {
    ...data,
    member1: Array.isArray(data.member1) ? data.member1[0] || null : data.member1,
    member2: Array.isArray(data.member2) ? data.member2[0] || null : data.member2,
    member3: Array.isArray(data.member3) ? data.member3[0] || null : data.member3,
  };
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
  
  // Transform the data to match RawTeamData[] type
  return (data || []).map(team => ({
    ...team,
    member1: Array.isArray(team.member1) ? team.member1[0] || null : team.member1,
    member2: Array.isArray(team.member2) ? team.member2[0] || null : team.member2,
    member3: Array.isArray(team.member3) ? team.member3[0] || null : team.member3,
  }));
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
