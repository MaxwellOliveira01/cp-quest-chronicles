
import { EventFullModel, EventSearchModel } from "../../api/models";
import { supabase } from '@/integrations/supabase/client';

class EventService {

  async get(id: string): Promise<EventFullModel> {
    // Get event data
    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (eventError) {
      throw new Error('Failed to fetch event');
    }

    // Get participants (students) for this event
    const { data: participants, error: participantsError } = await supabase
      .from('profile_events')
      .select(`
        profiles (
          id,
          name,
          handle,
          universities (
            name
          )
        )
      `)
      .eq('event_id', id);
    
    if (participantsError) {
      throw new Error('Failed to fetch event participants');
    }
    
    return {
      id: eventData.id,
      name: eventData.name,
      location: eventData.location,
      startDate: eventData.start_date,
      endDate: eventData.end_date,
      students: participants?.map(p => ({
        id: p.profiles.id,
        name: p.profiles.name,
        handle: p.profiles.handle,
        university: p.profiles.universities?.name || ''
      })) || []
    };
  }

  async list(prefix: string): Promise<EventSearchModel[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .ilike('name', `%${prefix}%`)
      .limit(10);
    
    if (error) {
      throw new Error('Failed to fetch events');
    }
    
    return data.map(event => ({
      id: event.id,
      name: event.name,
      location: event.location,
      startDate: event.start_date,
      endDate: event.end_date
    }));
  }
  
}

export const eventService = new EventService();
