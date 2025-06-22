
export interface ProfileData {
  id: string;
  name: string;
  handle: string;
  university: string;
  contests: Array<{
    year: number;
    contest: string;
    position: number;
    contestId: string;
  }>;
  teams: Array<{
    name: string;
    year: number;
    teamId: string;
  }>;
  events: Array<{
    name: string;
    eventId: string;
  }>;
}

export class ProfileModel {
  static async getAll(): Promise<ProfileData[]> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async findById(id: string): Promise<ProfileData | null> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async create(data: Omit<ProfileData, 'id'>): Promise<ProfileData> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async update(id: string, data: Partial<ProfileData>): Promise<ProfileData | null> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async delete(id: string): Promise<boolean> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }
}
