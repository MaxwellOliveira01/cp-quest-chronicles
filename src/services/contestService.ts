import { ContestCreateModel, ContestFullModel, ContestModel, ContestUpdateModel } from "api/contest";

const apiRoute: string = 'http://localhost:5169/api/contests';

class ContestService {

  async get(id: string): Promise<ContestFullModel> {
      let response = await fetch(`${apiRoute}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch contest');
      let data: ContestFullModel = await response.json();
      return data;
  }

  async list(prefix: string, yearFilter?: number): Promise<ContestModel[]> {
        let response = await fetch(`${apiRoute}/list`);
        if (!response.ok) throw new Error('Failed to fetch persons');
        let data: ContestModel[] = await response.json();
        return data;
  }

  async create(data: ContestCreateModel): Promise<void> {
    let response = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create contest');
  }

  async update(data: ContestUpdateModel): Promise<void> {
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
    let response = await fetch(`${apiRoute}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete contest');
  }
  
}

export const contestService = new ContestService();
