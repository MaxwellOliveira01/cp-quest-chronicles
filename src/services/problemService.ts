import { ProblemCreateModel, ProblemFullModel, ProblemModel, ProblemUpdateModel } from "../../api/problem";

const apiRoute: string = 'http://localhost:5169/api/problems';

class ProblemService {
  async get(id: string): Promise<ProblemFullModel> {
    const response = await fetch(`${apiRoute}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch problem');
    const data: ProblemFullModel = await response.json();
    return data;
  }

  async list(): Promise<ProblemModel[]> {
    const response = await fetch(`${apiRoute}/list`);
    if (!response.ok) throw new Error('Failed to fetch problems');
    const data: ProblemModel[] = await response.json();
    return data;
  }

  async create(data: ProblemCreateModel): Promise<void> {
    const response = await fetch(apiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create problem');
  }

  async update(data: ProblemUpdateModel): Promise<void> {
    const response = await fetch(apiRoute, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update problem');
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${apiRoute}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete problem');
  }
}

export const problemService = new ProblemService();
