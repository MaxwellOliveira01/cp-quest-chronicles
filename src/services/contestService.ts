import { ContestFullModel, ContestSearchModel } from "../../api/models";

class ContestService {

  async get(id: string): Promise<ContestFullModel> {
    const response = await fetch(`/api/contest/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch contest');
    }
    return response.json();
  }

  async list(prefix: string): Promise<ContestSearchModel[]> {
    const response = await fetch(`/api/contest?prefix=${encodeURIComponent(prefix)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch contests');
    }
    return response.json();
  }
  
}

export const contestService = new ContestService();