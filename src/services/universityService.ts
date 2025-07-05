import { UniversityCreateModel, UniversityFullModel, UniversityModel, UniversitUpdateModel, UniversitySearchModel } from "api/university";

const apiRoute: string = 'http://localhost:5169/api/universities';

class UniversityService {

  async get(id: string): Promise<UniversityFullModel> {
      const response = await fetch(`${apiRoute}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch university');
      const data: UniversityFullModel = await response.json();
      return data;
  }

  async list(): Promise<UniversityModel[]> {
    const response = await fetch(`${apiRoute}/list`);
    if (!response.ok) throw new Error('Failed to fetch universities');
    const data: UniversityModel[] = await response.json();
    return data;
  }

  async listForSearch(prefix: string): Promise<UniversitySearchModel[]> {
    const response = await fetch(`${apiRoute}/list/search-model?prefix=${encodeURIComponent(prefix)}`);
    if (!response.ok) throw new Error('Failed to fetch universities');
    const data: UniversitySearchModel[] = await response.json();
    return data;
  }

  async create(data: UniversityCreateModel): Promise<void> {
    const response = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create universities');
  }

  async update(data: UniversitUpdateModel): Promise<void> {
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
