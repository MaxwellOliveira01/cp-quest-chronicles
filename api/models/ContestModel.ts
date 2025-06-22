
export interface ContestData {
  id: string;
  name: string;
  officialUrl: string;
  problemsUrl: string | null;
  solutionsUrl: string | null;
  problemCount: number;
  teams: Array<{
    name: string;
    penalty: number;
    problems: Record<string, {
      solved: boolean;
      submissions?: number;
      timeMinutes?: number;
    }>;
  }>;
}

export class ContestModel {
  static async getAll(): Promise<ContestData[]> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async findById(id: string): Promise<ContestData | null> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async create(data: Omit<ContestData, 'id'>): Promise<ContestData> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async update(id: string, data: Partial<ContestData>): Promise<ContestData | null> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }

  static async delete(id: string): Promise<boolean> {
    // Backend implementation will go here
    throw new Error('Backend not implemented');
  }
}
