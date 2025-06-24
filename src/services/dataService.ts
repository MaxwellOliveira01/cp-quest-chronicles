
import { supabase } from '@/integrations/supabase/client';
import { 
  ProfileFullModel, 
  UniversityFullModel, 
  TeamFullModel, 
  EventFullModel, 
  ContestFullModel 
} from '../../api/models';

class DataService {

  // Profile CRUD operations
  async getProfiles(): Promise<ProfileFullModel[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        universities (
          name
        )
      `);
    
    if (error) throw new Error('Failed to fetch profiles');
    
    return data.map(profile => ({
      id: profile.id,
      name: profile.name,
      handle: profile.handle,
      university: profile.universities?.name || '',
      teams: [],
      events: [],
      contests: []
    }));
  }

  async addProfile(profile: Omit<ProfileFullModel, 'id'>): Promise<void> {
    // Find university by name
    let universityId = null;
    if (profile.university) {
      const { data: university } = await supabase
        .from('universities')
        .select('id')
        .eq('name', profile.university)
        .single();
      universityId = university?.id;
    }

    const { error } = await supabase
      .from('profiles')
      .insert({
        name: profile.name,
        handle: profile.handle,
        university_id: universityId
      });
    
    if (error) throw new Error('Failed to add profile');
  }

  async updateProfile(id: string, profile: Partial<ProfileFullModel>): Promise<void> {
    // Find university by name if provided
    let universityId = null;
    if (profile.university) {
      const { data: university } = await supabase
        .from('universities')
        .select('id')
        .eq('name', profile.university)
        .single();
      universityId = university?.id;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        name: profile.name,
        handle: profile.handle,
        university_id: universityId
      })
      .eq('id', id);
    
    if (error) throw new Error('Failed to update profile');
  }

  async deleteProfile(id: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error('Failed to delete profile');
  }

  // University CRUD operations
  async getUniversities(): Promise<UniversityFullModel[]> {
    const { data, error } = await supabase
      .from('universities')
      .select('*');
    
    if (error) throw new Error('Failed to fetch universities');
    
    return data.map(university => ({
      id: university.id,
      name: university.name,
      location: university.location,
      students: [],
      teams: [],
      contests: []
    }));
  }

  async addUniversity(university: Omit<UniversityFullModel, 'id' | 'students' | 'teams' | 'contests'>): Promise<void> {
    const { error } = await supabase
      .from('universities')
      .insert({
        name: university.name,
        location: university.location
      });
    
    if (error) throw new Error('Failed to add university');
  }

  async updateUniversity(id: string, university: Partial<UniversityFullModel>): Promise<void> {
    const { error } = await supabase
      .from('universities')
      .update({
        name: university.name,
        location: university.location
      })
      .eq('id', id);
    
    if (error) throw new Error('Failed to update university');
  }

  async deleteUniversity(id: string): Promise<void> {
    const { error } = await supabase
      .from('universities')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error('Failed to delete university');
  }

  // Team CRUD operations
  async getTeams(): Promise<TeamFullModel[]> {
    const { data, error } = await supabase
      .from('teams')
      .select(`
        *,
        universities (
          name
        )
      `);
    
    if (error) throw new Error('Failed to fetch teams');
    
    return data.map(team => ({
      id: team.id,
      name: team.name,
      university: team.universities?.name || '',
      members: [],
      contests: []
    }));
  }

  async addTeam(team: Omit<TeamFullModel, 'id'>): Promise<void> {
    // Find university by name
    let universityId = null;
    if (team.university) {
      const { data: university } = await supabase
        .from('universities')
        .select('id')
        .eq('name', team.university)
        .single();
      universityId = university?.id;
    }

    // Insert team
    const { data: newTeam, error: teamError } = await supabase
      .from('teams')
      .insert({
        name: team.name,
        university_id: universityId,
        member1_id: team.members[0]?.profileId || null,
        member2_id: team.members[1]?.profileId || null,
        member3_id: team.members[2]?.profileId || null
      })
      .select()
      .single();
    
    if (teamError) throw new Error('Failed to add team');

    // Add team members to junction table
    if (team.members.length > 0) {
      const teamMemberships = team.members.map(member => ({
        team_id: newTeam.id,
        profile_id: member.profileId
      }));

      const { error: membersError } = await supabase
        .from('team_members')
        .insert(teamMemberships);
      
      if (membersError) throw new Error('Failed to add team members');
    }

    // Add contest performances
    if (team.contests.length > 0) {
      const performances = team.contests.map(contest => ({
        contest_id: contest.contest.id,
        team_id: newTeam.id,
        position: contest.position
      }));

      const { error: contestsError } = await supabase
        .from('contest_performances')
        .insert(performances);
      
      if (contestsError) throw new Error('Failed to add contest performances');
    }
  }

  async updateTeam(id: string, team: Partial<TeamFullModel>): Promise<void> {
    // Find university by name if provided
    let universityId = null;
    if (team.university) {
      const { data: university } = await supabase
        .from('universities')
        .select('id')
        .eq('name', team.university)
        .single();
      universityId = university?.id;
    }

    // Update team basic info
    const { error: teamError } = await supabase
      .from('teams')
      .update({
        name: team.name,
        university_id: universityId,
        member1_id: team.members?.[0]?.profileId || null,
        member2_id: team.members?.[1]?.profileId || null,
        member3_id: team.members?.[2]?.profileId || null
      })
      .eq('id', id);
    
    if (teamError) throw new Error('Failed to update team');

    // Update team members - delete existing and add new ones
    if (team.members) {
      // Delete existing memberships
      await supabase
        .from('team_members')
        .delete()
        .eq('team_id', id);

      // Add new memberships
      if (team.members.length > 0) {
        const teamMemberships = team.members.map(member => ({
          team_id: id,
          profile_id: member.profileId
        }));

        const { error: membersError } = await supabase
          .from('team_members')
          .insert(teamMemberships);
        
        if (membersError) throw new Error('Failed to update team members');
      }
    }

    // Update contest performances
    if (team.contests) {
      // Delete existing performances
      await supabase
        .from('contest_performances')
        .delete()
        .eq('team_id', id);

      // Add new performances
      if (team.contests.length > 0) {
        const performances = team.contests.map(contest => ({
          contest_id: contest.contest.id,
          team_id: id,
          position: contest.position
        }));

        const { error: contestsError } = await supabase
          .from('contest_performances')
          .insert(performances);
        
        if (contestsError) throw new Error('Failed to update contest performances');
      }
    }
  }

  async deleteTeam(id: string): Promise<void> {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error('Failed to delete team');
  }

  // Event CRUD operations
  async getEvents(): Promise<EventFullModel[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*');
    
    if (error) throw new Error('Failed to fetch events');
    
    return data.map(event => ({
      id: event.id,
      name: event.name,
      location: event.location,
      startDate: event.start_date,
      endDate: event.end_date,
      students: []
    }));
  }

  async addEvent(event: Omit<EventFullModel, 'id'>): Promise<void> {
    // Insert event
    const { data: newEvent, error: eventError } = await supabase
      .from('events')
      .insert({
        name: event.name,
        location: event.location,
        start_date: event.startDate,
        end_date: event.endDate
      })
      .select()
      .single();
    
    if (eventError) throw new Error('Failed to add event');

    // Add event participants
    if (event.students.length > 0) {
      const participations = event.students.map(student => ({
        event_id: newEvent.id,
        profile_id: student.id
      }));

      const { error: participantsError } = await supabase
        .from('profile_events')
        .insert(participations);
      
      if (participantsError) throw new Error('Failed to add event participants');
    }
  }

  async updateEvent(id: string, event: Partial<EventFullModel>): Promise<void> {
    // Update event basic info
    const { error: eventError } = await supabase
      .from('events')
      .update({
        name: event.name,
        location: event.location,
        start_date: event.startDate,
        end_date: event.endDate
      })
      .eq('id', id);
    
    if (eventError) throw new Error('Failed to update event');

    // Update participants
    if (event.students) {
      // Delete existing participants
      await supabase
        .from('profile_events')
        .delete()
        .eq('event_id', id);

      // Add new participants
      if (event.students.length > 0) {
        const participations = event.students.map(student => ({
          event_id: id,
          profile_id: student.id
        }));

        const { error: participantsError } = await supabase
          .from('profile_events')
          .insert(participations);
        
        if (participantsError) throw new Error('Failed to update event participants');
      }
    }
  }

  async deleteEvent(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error('Failed to delete event');
  }

  // Contest CRUD operations
  async getContests(): Promise<ContestFullModel[]> {
    const { data, error } = await supabase
      .from('contests')
      .select('*');
    
    if (error) throw new Error('Failed to fetch contests');
    
    return data.map(contest => ({
      id: contest.id,
      name: contest.name,
      year: contest.year,
      officialUrl: contest.official_url,
      problemsUrl: contest.problems_url,
      solutionsUrl: contest.solutions_url,
      problemCount: contest.problem_count,
      teams: [],
      problems: [],
      ranking: []
    }));
  }

  async addContest(contest: Omit<ContestFullModel, 'id' | 'teams' | 'problems' | 'ranking'>): Promise<void> {
    const { error } = await supabase
      .from('contests')
      .insert({
        name: contest.name,
        year: contest.year,
        official_url: contest.officialUrl,
        problems_url: contest.problemsUrl,
        solutions_url: contest.solutionsUrl,
        problem_count: contest.problemCount
      });
    
    if (error) throw new Error('Failed to add contest');
  }

  async updateContest(id: string, contest: Partial<ContestFullModel>): Promise<void> {
    const { error } = await supabase
      .from('contests')
      .update({
        name: contest.name,
        year: contest.year,
        official_url: contest.officialUrl,
        problems_url: contest.problemsUrl,
        solutions_url: contest.solutionsUrl,
        problem_count: contest.problemCount
      })
      .eq('id', id);
    
    if (error) throw new Error('Failed to update contest');
  }

  async deleteContest(id: string): Promise<void> {
    const { error } = await supabase
      .from('contests')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error('Failed to delete contest');
  }
}

export const dataService = new DataService();
