import { UniversityCreateModel, UniversityFullModel, UniversityModel, UniversitUpdateModel } from "api/university";

const apiRoute: string = 'http://localhost:5169/api/universities';

class UniversityService {

  async get(id: string): Promise<UniversityFullModel> {
       let response = await fetch(`${apiRoute}/${id}`);
       if (!response.ok) throw new Error('Failed to fetch university');
       let data: UniversityFullModel = await response.json();
       return data;
  }

  async list(prefix: string): Promise<UniversityModel[]> {
    let response = await fetch(`${apiRoute}/list?prefix=${encodeURIComponent(prefix)}`);
    if (!response.ok) throw new Error('Failed to fetch universities');
    let data: UniversityModel[] = await response.json();
    return data;
  }

  async create(data: UniversityCreateModel): Promise<void> {
    let response = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create universities');
  }

  async update(data: UniversitUpdateModel): Promise<void> {
    let response = await fetch(apiRoute, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update university');
  }

  async delete(id: string): Promise<void> {
    let response = await fetch(`${apiRoute}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete university');
  }

}

export const universityService = new UniversityService();
