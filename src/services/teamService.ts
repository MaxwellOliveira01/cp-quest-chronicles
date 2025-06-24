
import { TeamFullModel, TeamSearchModel } from '../../api/models';
import { supabase } from '@/integrations/supabase/client';

class TeamService {

  async get(id: string): Promise<TeamFullModel> {
    // Get team with university and direct members
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .select(`
        *,
        universities (
          name
        ),
        member1:profiles!teams_member1_id_fkey (
          id,
          name
        ),
        member2:profiles!teams_member2_id_fkey (
          id,
          name
        ),
        member3:profiles!teams_member3_id_fkey (
          id,
          name
        )
      `)
      .eq('id', id)
      .single();
    
    if (teamError) {
      throw new Error('Failed to fetch team');
    }

    // Get all team members from junction table
    const { data: teamMemberships, error: membersError } = await supabase
      .from('team_members')
      .select(`
        profiles (
          id,
          name
        )
      `)
      .eq('team_id', id);

    if (membersError) {
      throw new Error('Failed to fetch team members');
    }

    // Get contest performances for this team
    const { data: performances, error: performancesError } = await supabase
      .from('contest_performances')
      .select(`
        position,
        contests (
          id,
          name,
          year
        )
      `)
      .eq('team_id', id);

    if (performancesError) {
      throw new Error('Failed to fetch contest performances');
    }

    // Combine direct members and junction table members
    const allMembers = [];
    
    // Add direct members if they exist
    if (teamData.member1) {
      allMembers.push({
        id: teamData.member1.id,
        name: teamData.member1.name,
        profileId: teamData.member1.id
      });
    }
    if (teamData.member2) {
      allMembers.push({
        id: teamData.member2.id,
        name: teamData.member2.name,
        profileId: teamData.member2.id
      });
    }
    if (teamData.member3) {
      allMembers.push({
        id: teamData.member3.id,
        name: teamData.member3.name,
        profileId: teamData.member3.id
      });
    }

    // Add junction table members (avoid duplicates)
    const existingIds = new Set(allMembers.map(m => m.id));
    teamMemberships?.forEach(tm => {
      if (!existingIds.has(tm.profiles.id)) {
        allMembers.push({
          id: tm.profiles.id,
          name: tm.profiles.name,
          profileId: tm.profiles.id
        });
      }
    });
    
    return {
      id: teamData.id,
      name: teamData.name,
      university: teamData.universities?.name || '',
      members: allMembers,
      contests: performances?.map(p => ({
        position: p.position,
        contest: {
          id: p.contests.id,
          name: p.contests.name,
          year: p.contests.year
        }
      })) || []
    };
  }

  async list(prefix: string): Promise<TeamSearchModel[]> {
    const { data, error } = await supabase
      .from('teams')
      .select(`
        *,
        universities (
          name
        )
      `)
      .ilike('name', `%${prefix}%`)
      .limit(10);
    
    if (error) {
      throw new Error('Failed to fetch teams');
    }
    
    return data.map(team => ({
      id: team.id,
      name: team.name,
      university: team.universities?.name || '',
      members: []
    }));
  }
  
}

export const teamService = new TeamService();
