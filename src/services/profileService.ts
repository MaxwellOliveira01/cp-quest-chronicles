
import { ProfileFullModel, ProfileSearchModel } from '../../api/models';
import { supabase } from '@/integrations/supabase/client';

class ProfileService {

  async get(id: string): Promise<ProfileFullModel> {
    // Get profile with university
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select(`
        *,
        universities (
          id,
          name,
          location
        )
      `)
      .eq('id', id)
      .single();
    
    if (profileError) {
      throw new Error('Failed to fetch profile');
    }

    // Get teams for this profile
    const { data: teamMemberships, error: teamsError } = await supabase
      .from('team_members')
      .select(`
        teams (
          id,
          name,
          universities (
            name
          )
        )
      `)
      .eq('profile_id', id);

    if (teamsError) {
      throw new Error('Failed to fetch teams');
    }

    // Get events for this profile
    const { data: eventMemberships, error: eventsError } = await supabase
      .from('profile_events')
      .select(`
        events (
          id,
          name,
          location,
          start_date,
          end_date
        )
      `)
      .eq('profile_id', id);

    if (eventsError) {
      throw new Error('Failed to fetch events');
    }

    // Get contest performances for this profile
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
      .eq('profile_id', id);

    if (performancesError) {
      throw new Error('Failed to fetch contest performances');
    }

    return {
      id: profileData.id,
      name: profileData.name,
      handle: profileData.handle,
      university: profileData.universities?.name || '',
      teams: teamMemberships?.map(tm => ({
        id: tm.teams.id,
        name: tm.teams.name,
        university: tm.teams.universities?.name || '',
        members: []
      })) || [],
      events: eventMemberships?.map(em => ({
        id: em.events.id,
        name: em.events.name,
        location: em.events.location,
        startDate: em.events.start_date,
        endDate: em.events.end_date
      })) || [],
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

  async list(prefix: string, universityFilter?: string): Promise<ProfileSearchModel[]> {
    let query = supabase
      .from('profiles')
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
      throw new Error('Failed to fetch profiles');
    }
    
    return data.map(profile => ({
      id: profile.id,
      name: profile.name,
      handle: profile.handle,
      university: profile.universities?.name || ''
    }));
  }

  async getAll(): Promise<ProfileFullModel[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        universities (
          name
        )
      `);
    
    if (error) {
      throw new Error('Failed to fetch profiles');
    }
    
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

  async create(profile: Omit<ProfileFullModel, 'id' | 'teams' | 'events' | 'contests'>): Promise<void> {
    // Find university ID if university name is provided
    let universityId = null;
    if (profile.university) {
      const { data: university } = await supabase
        .from('universities')
        .select('id')
        .eq('name', profile.university)
        .single();
      universityId = university?.id || null;
    }

    const { error } = await supabase
      .from('profiles')
      .insert({
        name: profile.name,
        handle: profile.handle,
        university_id: universityId
      });
    
    if (error) {
      throw new Error('Failed to create profile');
    }
  }

  async update(id: string, profile: Omit<ProfileFullModel, 'id' | 'teams' | 'events' | 'contests'>): Promise<void> {
    // Find university ID if university name is provided
    let universityId = null;
    if (profile.university) {
      const { data: university } = await supabase
        .from('universities')
        .select('id')
        .eq('name', profile.university)
        .single();
      universityId = university?.id || null;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        name: profile.name,
        handle: profile.handle,
        university_id: universityId
      })
      .eq('id', id);
    
    if (error) {
      throw new Error('Failed to update profile');
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error('Failed to delete profile');
    }
  }
  
}

export const profileService = new ProfileService();
