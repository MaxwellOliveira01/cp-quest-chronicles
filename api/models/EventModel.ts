
export interface EventData {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  participants: string[]; // Profile IDs
}

export class EventModel {
  static async getAll(): Promise<EventData[]> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async findById(id: string): Promise<EventData | null> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async create(data: Omit<EventData, 'id'>): Promise<EventData> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async update(id: string, data: Partial<EventData>): Promise<EventData | null> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async delete(id: string): Promise<boolean> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }
}
