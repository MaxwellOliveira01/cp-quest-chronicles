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
    
    if (teamError) {
      throw new Error('Failed to fetch team');
    }

    // Get all team members from junction table
    const { data: teamMemberships, error: membersError } = await supabase
      .from('team_members')
      .select(`
        persons (
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
    
    // Add direct members if they exist - properly type check these
    if (teamData.member1 && typeof teamData.member1 === 'object' && 'id' in teamData.member1) {
      allMembers.push({
        id: teamData.member1.id,
        name: teamData.member1.name,
        personId: teamData.member1.id
      });
    }
    if (teamData.member2 && typeof teamData.member2 === 'object' && 'id' in teamData.member2) {
      allMembers.push({
        id: teamData.member2.id,
        name: teamData.member2.name,
        personId: teamData.member2.id
      });
    }
    if (teamData.member3 && typeof teamData.member3 === 'object' && 'id' in teamData.member3) {
      allMembers.push({
        id: teamData.member3.id,
        name: teamData.member3.name,
        personId: teamData.member3.id
      });
    }

    // Add junction table members (avoid duplicates)
    const existingIds = new Set(allMembers.map(m => m.id));
    teamMemberships?.forEach(tm => {
      if (tm.persons && !existingIds.has(tm.persons.id)) {
        allMembers.push({
          id: tm.persons.id,
          name: tm.persons.name,
          personId: tm.persons.id
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

    // Get all team members from junction table for all teams
    const teamIds = teams.map(t => t.id);
    const { data: allTeamMemberships, error: membersError } = await supabase
      .from('team_members')
      .select(`
        team_id,
        persons (
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
      
      // Add direct members if they exist - properly type check these
      if (team.member1 && typeof team.member1 === 'object' && 'id' in team.member1) {
        allMembers.push({
          id: team.member1.id,
          name: team.member1.name,
          personId: team.member1.id
        });
      }
      if (team.member2 && typeof team.member2 === 'object' && 'id' in team.member2) {
        allMembers.push({
          id: team.member2.id,
          name: team.member2.name,
          personId: team.member2.id
        });
      }
      if (team.member3 && typeof team.member3 === 'object' && 'id' in team.member3) {
        allMembers.push({
          id: team.member3.id,
          name: team.member3.name,
          personId: team.member3.id
        });
      }

      // Add junction table members (avoid duplicates)
      const existingIds = new Set(allMembers.map(m => m.id));
      const teamMemberships = allTeamMemberships?.filter(tm => tm.team_id === team.id) || [];
      teamMemberships.forEach(tm => {
        if (tm.persons && !existingIds.has(tm.persons.id)) {
          allMembers.push({
            id: tm.persons.id,
            name: tm.persons.name,
            personId: tm.persons.id
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
    // First delete existing members
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
