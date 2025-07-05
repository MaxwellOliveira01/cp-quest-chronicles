import { LocalModel } from "api/local";

const apiRoute: string = 'http://localhost:5169/api/locals';

class LocalService {
  async getAll(): Promise<LocalModel[]> {
    const response = await fetch(`${apiRoute}/list`);
    if (!response.ok) throw new Error('Failed to fetch locals');
    const data: LocalModel[] = await response.json();
    return data;
  }
}

export const localService = new LocalService();
