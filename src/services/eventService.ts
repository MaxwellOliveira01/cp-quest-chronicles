
import { EventCreateModel, EventFullModel, EventModel, EventUpdateModel } from "api/event";

const apiRoute: string = 'http://localhost:5169/api/events';

class EventService {

  async get(id: string): Promise<EventFullModel> {
      let response = await fetch(`${apiRoute}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch person');
      let data: EventFullModel = await response.json();
      return data;
  }

  async filter(prefix: string): Promise<EventModel[]> {
    let response = await fetch(`${apiRoute}/list?prefix=${encodeURIComponent(prefix)}`);
    if (!response.ok) throw new Error('Failed to fetch events');
    let data: EventModel[] = await response.json();
    return data;
  }

  async create(data: EventCreateModel): Promise<void> {
      let response = await fetch(apiRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    if (!response.ok) throw new Error('Failed to create event');
  }

  async update(data: EventUpdateModel): Promise<void> {
     let response = await fetch(apiRoute, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create event');
  }

  async delete(id: string): Promise<void> {
    let response = await fetch(`${apiRoute}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete event');
  }
  
}

export const eventService = new EventService();
