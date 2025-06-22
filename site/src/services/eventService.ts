import { BaseService } from './baseService';

export interface Event {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  participants: string[]; // Profile IDs
}

class EventService extends BaseService<Event> {
  constructor() {
    super();
    this.initializeData();
  }

  private initializeData() {
    this.setItems([
      {
        id: "1",
        name: "ICPC World Finals 2023",
        location: "Dhaka, Bangladesh",
        startDate: "2023-11-15",
        endDate: "2023-11-20",
        participants: ["1", "2"]
      },
      {
        id: "2",
        name: "Programming Bootcamp 2022",
        location: "San Francisco, CA",
        startDate: "2022-07-10",
        endDate: "2022-07-17",
        participants: ["1", "3"]
      }
    ]);
  }
}

export const eventService = new EventService();
