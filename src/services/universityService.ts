import { UniversityFullModel, UniversitySearchModel } from "../../api/models";

class UniversityService {
  async get(id: string): Promise<UniversityFullModel> {
    const response = await fetch(`/api/profile/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    return response.json();
  }

  async list(prefix: string): Promise<UniversitySearchModel[]> {
    const response = await fetch(`/api/profile?prefix=${encodeURIComponent(prefix)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch profiles');
    }
    return response.json();
  }
}

export const universityService = new UniversityService();