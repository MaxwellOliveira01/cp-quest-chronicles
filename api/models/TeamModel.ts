
export interface TeamData {
  id: string;
  name: string;
  university: string;
  members: Array<{
    name: string;
    profileId: string;
  }>;
  contests: Array<{
    name: string;
    year: number;
    contestId: string;
    position?: number;
    problems?: Record<string, {
      solved: boolean;
      submissions?: number;
      timeMinutes?: number;
    }>;
  }>;
}

export class TeamModel {
  static async getAll(): Promise<TeamData[]> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async findById(id: string): Promise<TeamData | null> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async create(data: Omit<TeamData, 'id'>): Promise<TeamData> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async update(id: string, data: Partial<TeamData>): Promise<TeamData | null> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async delete(id: string): Promise<boolean> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }
}
