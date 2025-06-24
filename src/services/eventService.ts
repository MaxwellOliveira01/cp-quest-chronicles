
import { EventFullModel, EventSearchModel } from "../../api/models";
import { supabase } from '@/integrations/supabase/client';

class EventService {

  async get(id: string): Promise<EventFullModel> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw new Error('Failed to fetch events');
    }
    
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      startDate: data.start_date,
      endDate: data.end_date,
      participants: data.participants || []
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
