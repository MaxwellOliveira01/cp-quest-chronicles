import { PersonFullModel, CreatePersonModel, PersonSearchModel, UpdatePersonModel } from '../../api/person';

const apiRoute: string = 'http://localhost:5169/person';

class PersonService {

  async get(id: string): Promise<PersonFullModel> {
    let response = await fetch(`${apiRoute}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch person');
    let data: PersonFullModel = await response.json();
    return data;
  }

  async list(prefix: string, universityFilter?: string): Promise<PersonSearchModel[]> {
    let response = await fetch(`${apiRoute}/list?prefix=${encodeURIComponent(prefix)}&university=${encodeURIComponent(universityFilter || '')}`);
    if (!response.ok) throw new Error('Failed to fetch persons');
    let data: PersonSearchModel[] = await response.json();
    return data;
  }

  async create(data: CreatePersonModel): Promise<void> {
    let response = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create person');
  }

  async update(data: UpdatePersonModel): Promise<void> {    
    let response = await fetch(apiRoute, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create person');
  }

  async delete(id: string): Promise<void> {
    let response = await fetch(`${apiRoute}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete person');
  }

}

export const personService = new PersonService();
