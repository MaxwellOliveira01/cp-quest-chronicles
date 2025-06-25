
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

  async list(prefix: string, dateFilter?: { startDate?: string; endDate?: string }): Promise<EventSearchModel[]> {
    let query = supabase
      .from('events')
      .select('*')
      .ilike('name', `%${prefix}%`)
      .limit(10);

    if (dateFilter?.startDate) {
      query = query.gte('start_date', dateFilter.startDate);
    }
    if (dateFilter?.endDate) {
      query = query.lte('end_date', dateFilter.endDate);
    }
    
    const { data, error } = await query;
    
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

  async getAll(): Promise<EventFullModel[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*');
    
    if (error) {
      throw new Error('Failed to fetch events');
    }
    
    return data.map(event => ({
      id: event.id,
      name: event.name,
      location: event.location,
      startDate: event.start_date,
      endDate: event.end_date,
      students: []
    }));
  }

  async create(event: Omit<EventFullModel, 'id' | 'students'>): Promise<void> {
    const { error } = await supabase
      .from('events')
      .insert({
        name: event.name,
        location: event.location,
        start_date: event.startDate,
        end_date: event.endDate
      });
    
    if (error) {
      throw new Error('Failed to create event');
    }
  }

  async update(id: string, event: Omit<EventFullModel, 'id' | 'students'>): Promise<void> {
    const { error } = await supabase
      .from('events')
      .update({
        name: event.name,
        location: event.location,
        start_date: event.startDate,
        end_date: event.endDate
      })
      .eq('id', id);
    
    if (error) {
      throw new Error('Failed to update event');
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error('Failed to delete event');
    }
  }
  
}

export const eventService = new EventService();
