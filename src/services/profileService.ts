import { ProfileFullModel, ProfileSearchModel } from "../../api/models";

class ProfileService {

  async get(id: string): Promise<ProfileFullModel> {
    const response = await fetch(`/api/profile/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    return response.json();
  }

  async list(prefix: string): Promise<ProfileSearchModel[]> {
    const response = await fetch(`/api/profile?prefix=${encodeURIComponent(prefix)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch profiles');
    }
    return response.json();
  }
  
}

export const profileService = new ProfileService();
