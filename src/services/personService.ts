import { PersonFullModel, PersonCreateModel, PersonSearchModel, PersonUpdateModel } from '../../api/person';

const apiRoute: string = 'http://localhost:5169/api/persons';

class PersonService {

  async get(id: string): Promise<PersonFullModel> {
    const response = await fetch(`${apiRoute}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch person');
    const data: PersonFullModel = await response.json();
    return data;
  }

  async list(prefix: string, universityFilter?: string): Promise<PersonSearchModel[]> {
    const response = await fetch(`${apiRoute}/list?prefix=${encodeURIComponent(prefix)}&university=${encodeURIComponent(universityFilter || '')}`);
    if (!response.ok) throw new Error('Failed to fetch persons');
    const data: PersonSearchModel[] = await response.json();
    return data;
  }

  async listForSearch(prefix: string, universityFilter?: string): Promise<PersonSearchModel[]> {
    const response = await fetch(`${apiRoute}/list/search-model?prefix=${encodeURIComponent(prefix)}&university=${encodeURIComponent(universityFilter || '')}`);
    if (!response.ok) throw new Error('Failed to fetch persons');
    const data: PersonSearchModel[] = await response.json();
    return data;
  }

  async create(data: PersonCreateModel): Promise<void> {
    let response = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create person');
  }

  async update(data: PersonUpdateModel): Promise<void> {    
    let response = await fetch(apiRoute, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update person');
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${apiRoute}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete person');
  }

}

export const personService = new PersonService();
