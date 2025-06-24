import { EventFullModel, EventSearchModel } from "../../../api/models";

class EventService {

  async get(id: string): Promise<EventFullModel> {
    const response = await fetch(`/api/event/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  }

  async list(prefix: string): Promise<EventSearchModel[]> {
    const response = await fetch(`/api/events?prefix=${encodeURIComponent(prefix)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  }
  
}

export const eventService = new EventService();
