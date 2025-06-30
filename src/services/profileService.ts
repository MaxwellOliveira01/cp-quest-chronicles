import { PersonFullModel, PersonSearchModel } from '../../api/models';
import { supabase } from '@/integrations/supabase/client';

class ProfileService {

  async get(id: string): Promise<PersonFullModel> {
    // Get person with university
    const { data: personData, error: personError } = await supabase
      .from('persons')
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
    
    if (personError) {
      throw new Error('Failed to fetch person');
    }

    // Get teams for this person
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
      .eq('person_id', id);

    if (teamsError) {
      throw new Error('Failed to fetch teams');
    }

    // Get events for this person
    const { data: eventMemberships, error: eventsError } = await supabase
      .from('person_events')
      .select(`
        events (
          id,
          name,
          location,
          start_date,
          end_date
        )
      `)
      .eq('person_id', id);

    if (eventsError) {
      throw new Error('Failed to fetch events');
    }

    // Get contest performances for this person
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
      .eq('person_id', id);

    if (performancesError) {
      throw new Error('Failed to fetch contest performances');
    }

    return {
      id: personData.id,
      name: personData.name,
      handle: personData.handle,
      university: personData.universities?.name || '',
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

  async list(prefix: string, universityFilter?: string): Promise<PersonSearchModel[]> {
    let query = supabase
      .from('persons')
      .select(`
        *,
        universities (
          name
        )
      `)
      .ilike('name', `%${prefix}%`)
      .limit(10);

    if (universityFilter) {
      const { data: universityData } = await supabase
        .from('universities')
        .select('id')
        .eq('name', universityFilter)
        .single();
      
      if (universityData) {
        query = query.eq('university_id', universityData.id);
      } else {
        return [];
      }
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw new Error('Failed to fetch persons');
    }
    
    return data.map(person => ({
      id: person.id,
      name: person.name,
      handle: person.handle,
      university: person.universities?.name || ''
    }));
  }

  async getAll(): Promise<PersonFullModel[]> {
    const { data, error } = await supabase
      .from('persons')
      .select(`
        *,
        universities (
          name
        )
      `);
    
    if (error) {
      throw new Error('Failed to fetch persons');
    }
    
    return data.map(person => ({
      id: person.id,
      name: person.name,
      handle: person.handle,
      university: person.universities?.name || '',
      teams: [],
      events: [],
      contests: []
    }));
  }

  async create(profile: Omit<PersonFullModel, 'id' | 'teams' | 'events' | 'contests'>): Promise<void> {
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
      .from('persons')
      .insert({
        name: profile.name,
        handle: profile.handle,
        university_id: universityId
      });
    
    if (error) {
      throw new Error('Failed to create person');
    }
  }

  async update(id: string, profile: Omit<PersonFullModel, 'id' | 'teams' | 'events' | 'contests'>): Promise<void> {
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
      .from('persons')
      .update({
        name: profile.name,
        handle: profile.handle,
        university_id: universityId
      })
      .eq('id', id);
    
    if (error) {
      throw new Error('Failed to update person');
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('persons')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error('Failed to delete person');
    }
  }
  
}

export const profileService = new ProfileService();
