import { CreateUniversityModel, UniversityFullModel, UniversityModel, UpdateUniversityModel } from "../../api/university";

const apiRoute: string = 'http://localhost:5169/university';

class UniversityService {
  async get(id: string): Promise<UniversityFullModel> {
    const response = await fetch(`${apiRoute}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch university');
    const data: UniversityFullModel = await response.json();
    return data;
  }

  async list(prefix: string): Promise<UniversityModel[]> {
       const response = await fetch(`${apiRoute}/list?prefix=${encodeURIComponent(prefix)}`);
       if (!response.ok) throw new Error('Failed to fetch persons');
       const data: UniversityModel[] = await response.json();
       return data;
  }

  async getAll(): Promise<UniversityModel[]> {
    const response = await fetch(`${apiRoute}/list`);
    if (!response.ok) throw new Error('Failed to fetch persons');
    const data: UniversityModel[] = await response.json();
    return data;
  }

  async create(data: CreateUniversityModel): Promise<void> {
    const response = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create university');
  }

  async update(data: UpdateUniversityModel): Promise<void> {
    const response = await fetch(apiRoute, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update university');
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${apiRoute}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete university');
  }

}

export const universityService = new UniversityService();
