
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

  async list(prefix: string, universityFilter?: string): Promise<TeamSearchModel[]> {
    let query = supabase
      .from('teams')
      .select(`
        *,
        universities (
          name
        )
      `)
      .ilike('name', `%${prefix}%`)
      .limit(10);

    if (universityFilter) {
      query = query.eq('universities.name', universityFilter);
    }
    
    const { data, error } = await query;
    
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

  async getAll(): Promise<TeamFullModel[]> {
    const { data: teams, error } = await supabase
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
      `);
    
    if (error) {
      throw new Error('Failed to fetch teams');
    }

    // Get all team members from junction table for all teams
    const teamIds = teams.map(t => t.id);
    const { data: allTeamMemberships, error: membersError } = await supabase
      .from('team_members')
      .select(`
        team_id,
        profiles (
          id,
          name
        )
      `)
      .in('team_id', teamIds);

    if (membersError) {
      throw new Error('Failed to fetch team members');
    }

    // Get contest performances for all teams
    const { data: allPerformances, error: performancesError } = await supabase
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

    if (performancesError) {
      throw new Error('Failed to fetch contest performances');
    }

    return teams.map(team => {
      // Combine direct members and junction table members
      const allMembers = [];
      
      // Add direct members if they exist
      if (team.member1) {
        allMembers.push({
          id: team.member1.id,
          name: team.member1.name,
          profileId: team.member1.id
        });
      }
      if (team.member2) {
        allMembers.push({
          id: team.member2.id,
          name: team.member2.name,
          profileId: team.member2.id
        });
      }
      if (team.member3) {
        allMembers.push({
          id: team.member3.id,
          name: team.member3.name,
          profileId: team.member3.id
        });
      }

      // Add junction table members (avoid duplicates)
      const existingIds = new Set(allMembers.map(m => m.id));
      const teamMemberships = allTeamMemberships?.filter(tm => tm.team_id === team.id) || [];
      teamMemberships.forEach(tm => {
        if (!existingIds.has(tm.profiles.id)) {
          allMembers.push({
            id: tm.profiles.id,
            name: tm.profiles.name,
            profileId: tm.profiles.id
          });
        }
      });

      // Get performances for this team
      const teamPerformances = allPerformances?.filter(p => p.team_id === team.id) || [];

      return {
        id: team.id,
        name: team.name,
        university: team.universities?.name || '',
        members: allMembers,
        contests: teamPerformances.map(p => ({
          position: p.position,
          contest: {
            id: p.contests.id,
            name: p.contests.name,
            year: p.contests.year
          }
        }))
      };
    });
  }

  async create(team: Omit<TeamFullModel, 'id'>): Promise<void> {
    // Find university ID
    let universityId = null;
    if (team.university) {
      const { data: university } = await supabase
        .from('universities')
        .select('id')
        .eq('name', team.university)
        .single();
      universityId = university?.id || null;
    }

    // Create team
    const { data: newTeam, error: teamError } = await supabase
      .from('teams')
      .insert({
        name: team.name,
        university_id: universityId,
        member1_id: team.members[0]?.profileId || null,
        member2_id: team.members[1]?.profileId || null,
        member3_id: team.members[2]?.profileId || null
      })
      .select('id')
      .single();
    
    if (teamError) {
      throw new Error('Failed to create team');
    }

    // Add team members to junction table
    if (team.members.length > 0) {
      const memberInserts = team.members.map(member => ({
        team_id: newTeam.id,
        profile_id: member.profileId
      }));

      const { error: membersError } = await supabase
        .from('team_members')
        .insert(memberInserts);

      if (membersError) {
        throw new Error('Failed to add team members');
      }
    }
  }

  async update(id: string, team: TeamFullModel): Promise<void> {
    // Find university ID
    let universityId = null;
    if (team.university) {
      const { data: university } = await supabase
        .from('universities')
        .select('id')
        .eq('name', team.university)
        .single();
      universityId = university?.id || null;
    }

    // Update team
    const { error: teamError } = await supabase
      .from('teams')
      .update({
        name: team.name,
        university_id: universityId,
        member1_id: team.members[0]?.profileId || null,
        member2_id: team.members[1]?.profileId || null,
        member3_id: team.members[2]?.profileId || null
      })
      .eq('id', id);
    
    if (teamError) {
      throw new Error('Failed to update team');
    }

    // Update team members in junction table
    // First delete existing members
    await supabase
      .from('team_members')
      .delete()
      .eq('team_id', id);

    // Add new members
    if (team.members.length > 0) {
      const memberInserts = team.members.map(member => ({
        team_id: id,
        profile_id: member.profileId
      }));

      const { error: membersError } = await supabase
        .from('team_members')
        .insert(memberInserts);

      if (membersError) {
        throw new Error('Failed to update team members');
      }
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error('Failed to delete team');
    }
  }
  
}

export const teamService = new TeamService();
