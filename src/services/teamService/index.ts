
import { TeamFullModel, TeamSearchModel } from '../../../api/models';
import { supabase } from '@/integrations/supabase/client';
import { combineTeamMembers } from './memberUtils';
import { 
  fetchTeamById,
  fetchAllTeams,
  fetchTeamMembers,
  fetchAllTeamMembers,
  fetchContestPerformances,
  fetchAllContestPerformances
} from './queries';

class TeamService {
  async get(id: string): Promise<TeamFullModel> {
    // Get team with university and direct members
    const teamData = await fetchTeamById(id);
    
    // Get all team members from junction table
    const teamMemberships = await fetchTeamMembers(id);

    // Get contest performances for this team
    const performances = await fetchContestPerformances(id);

    // Combine all members
    const allMembers = combineTeamMembers(
      teamData.member1,
      teamData.member2,
      teamData.member3,
      teamMemberships
    );
    
    return {
      id: teamData.id,
      name: teamData.name,
      university: teamData.universities?.name || '',
      members: allMembers,
      contests: performances.map(p => ({
        position: p.position,
        contest: {
          id: p.contests.id,
          name: p.contests.name,
          year: p.contests.year
        }
      }))
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
    const teams = await fetchAllTeams();
    
    // Get all team members from junction table for all teams
    const teamIds = teams.map(t => t.id);
    const allTeamMemberships = await fetchAllTeamMembers(teamIds);

    // Get contest performances for all teams
    const allPerformances = await fetchAllContestPerformances(teamIds);

    return teams.map(team => {
      // Get memberships and performances for this specific team
      const teamMemberships = allTeamMemberships.filter(tm => tm.team_id === team.id);
      const teamPerformances = allPerformances.filter(p => p.team_id === team.id);

      // Combine all members
      const allMembers = combineTeamMembers(
        team.member1,
        team.member2,
        team.member3,
        teamMemberships
      );

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
        person1_id: team.members[0]?.personId || null,
        person2_id: team.members[1]?.personId || null,
        person3_id: team.members[2]?.personId || null
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
        person_id: member.personId
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
        person1_id: team.members[0]?.personId || null,
        person2_id: team.members[1]?.personId || null,
        person3_id: team.members[2]?.personId || null
      })
      .eq('id', id);
    
    if (teamError) {
      throw new Error('Failed to update team');
    }

    // Update team members in junction table
    await supabase
      .from('team_members')
      .delete()
      .eq('team_id', id);

    // Add new members
    if (team.members.length > 0) {
      const memberInserts = team.members.map(member => ({
        team_id: id,
        person_id: member.personId
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
