
import { BaseService } from './baseService';
import type { EventModel } from '../../../api/events';

class EventService extends BaseService<EventModel> {
  constructor() {
    super();
    this.initializeData();
  }

  private initializeData() {
    this.setItems([
      {
        id: 1,
        name: "ICPC World Finals 2023",
        year: 2023,
        location: "Dhaka, Bangladesh"
      },
      {
        id: 2,
        name: "Programming Bootcamp 2022",
        year: 2022,
        location: "San Francisco, CA"
      }
    ]);
  }
}

export const eventService = new EventService();
