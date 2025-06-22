
import { profileService, Profile } from './profileService';
import { universityService, University } from './universityService';
import { teamService, Team } from './teamService';
import { contestService, Contest } from './contestService';
import { eventService, Event } from './eventService';

// Re-export types for backward compatibility
export type { Profile, University, Team, Contest, Event };

// Configuration for switching between mock and real backend
const USE_BACKEND = false; // Set to true when backend is ready
const API_BASE_URL = 'http://localhost:3001/api'; // Update with your backend URL

class DataService {
  private async delay(): Promise<void> {
    const randomDelay = Math.random() * 1500 + 500; // 0.5 to 2 seconds
    return new Promise(resolve => setTimeout(resolve, randomDelay));
  }

  // Generic API call method for future backend integration
  private async apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
    if (!USE_BACKEND) {
      throw new Error('Backend is not enabled');
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Profile methods
  async getProfiles(): Promise<Profile[]> {
    await this.delay();
    
    if (USE_BACKEND) {
      return this.apiCall<Profile[]>('/profiles');
    }
    
    return profileService.getAll();
  }

  async findProfile(id: string): Promise<Profile | undefined> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        return await this.apiCall<Profile>(`/profiles/${id}`);
      } catch (error) {
        return undefined;
      }
    }
    
    return profileService.findById(id);
  }

  async addProfile(profile: Omit<Profile, 'id'>): Promise<Profile> {
    await this.delay();
    
    if (USE_BACKEND) {
      return this.apiCall<Profile>('/profiles', {
        method: 'POST',
        body: JSON.stringify(profile),
      });
    }
    
    return profileService.add(profile);
  }

  async updateProfile(id: string, updates: Partial<Profile>): Promise<Profile | null> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        return await this.apiCall<Profile>(`/profiles/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
      } catch (error) {
        return null;
      }
    }
    
    return profileService.update(id, updates);
  }

  async deleteProfile(id: string): Promise<boolean> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        await this.apiCall(`/profiles/${id}`, { method: 'DELETE' });
        return true;
      } catch (error) {
        return false;
      }
    }
    
    return profileService.delete(id);
  }

  // University methods
  async getUniversities(): Promise<University[]> {
    await this.delay();
    
    if (USE_BACKEND) {
      return this.apiCall<University[]>('/universities');
    }
    
    return universityService.getAll();
  }

  async findUniversity(id: string): Promise<University | undefined> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        return await this.apiCall<University>(`/universities/${id}`);
      } catch (error) {
        return undefined;
      }
    }
    
    return universityService.findById(id);
  }

  async addUniversity(university: Omit<University, 'id'>): Promise<University> {
    await this.delay();
    
    if (USE_BACKEND) {
      return this.apiCall<University>('/universities', {
        method: 'POST',
        body: JSON.stringify(university),
      });
    }
    
    return universityService.add(university);
  }

  async updateUniversity(id: string, updates: Partial<University>): Promise<University | null> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        return await this.apiCall<University>(`/universities/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
      } catch (error) {
        return null;
      }
    }
    
    return universityService.update(id, updates);
  }

  async deleteUniversity(id: string): Promise<boolean> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        await this.apiCall(`/universities/${id}`, { method: 'DELETE' });
        return true;
      } catch (error) {
        return false;
      }
    }
    
    return universityService.delete(id);
  }

  // Team methods
  async getTeams(): Promise<Team[]> {
    await this.delay();
    
    if (USE_BACKEND) {
      return this.apiCall<Team[]>('/teams');
    }
    
    return teamService.getAll();
  }

  async findTeam(id: string): Promise<Team | undefined> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        return await this.apiCall<Team>(`/teams/${id}`);
      } catch (error) {
        return undefined;
      }
    }
    
    return teamService.findById(id);
  }

  async addTeam(team: Omit<Team, 'id'>): Promise<Team> {
    await this.delay();
    
    if (USE_BACKEND) {
      return this.apiCall<Team>('/teams', {
        method: 'POST',
        body: JSON.stringify(team),
      });
    }
    
    return teamService.add(team);
  }

  async updateTeam(id: string, updates: Partial<Team>): Promise<Team | null> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        return await this.apiCall<Team>(`/teams/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
      } catch (error) {
        return null;
      }
    }
    
    return teamService.update(id, updates);
  }

  async deleteTeam(id: string): Promise<boolean> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        await this.apiCall(`/teams/${id}`, { method: 'DELETE' });
        return true;
      } catch (error) {
        return false;
      }
    }
    
    return teamService.delete(id);
  }

  // Contest methods
  async getContests(): Promise<Contest[]> {
    await this.delay();
    
    if (USE_BACKEND) {
      return this.apiCall<Contest[]>('/contests');
    }
    
    return contestService.getAll();
  }

  async findContest(id: string): Promise<Contest | undefined> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        return await this.apiCall<Contest>(`/contests/${id}`);
      } catch (error) {
        return undefined;
      }
    }
    
    return contestService.findById(id);
  }

  async addContest(contest: Omit<Contest, 'id'>): Promise<Contest> {
    await this.delay();
    
    if (USE_BACKEND) {
      return this.apiCall<Contest>('/contests', {
        method: 'POST',
        body: JSON.stringify(contest),
      });
    }
    
    return contestService.add(contest);
  }

  async updateContest(id: string, updates: Partial<Contest>): Promise<Contest | null> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        return await this.apiCall<Contest>(`/contests/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
      } catch (error) {
        return null;
      }
    }
    
    return contestService.update(id, updates);
  }

  async deleteContest(id: string): Promise<boolean> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        await this.apiCall(`/contests/${id}`, { method: 'DELETE' });
        return true;
      } catch (error) {
        return false;
      }
    }
    
    return contestService.delete(id);
  }

  // Event methods
  async getEvents(): Promise<Event[]> {
    await this.delay();
    
    if (USE_BACKEND) {
      return this.apiCall<Event[]>('/events');
    }
    
    return eventService.getAll();
  }

  async findEvent(id: string): Promise<Event | undefined> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        return await this.apiCall<Event>(`/events/${id}`);
      } catch (error) {
        return undefined;
      }
    }
    
    return eventService.findById(id);
  }

  async addEvent(event: Omit<Event, 'id'>): Promise<Event> {
    await this.delay();
    
    if (USE_BACKEND) {
      return this.apiCall<Event>('/events', {
        method: 'POST',
        body: JSON.stringify(event),
      });
    }
    
    return eventService.add(event);
  }

  async updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        return await this.apiCall<Event>(`/events/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates),
        });
      } catch (error) {
        return null;
      }
    }
    
    return eventService.update(id, updates);
  }

  async deleteEvent(id: string): Promise<boolean> {
    await this.delay();
    
    if (USE_BACKEND) {
      try {
        await this.apiCall(`/events/${id}`, { method: 'DELETE' });
        return true;
      } catch (error) {
        return false;
      }
    }
    
    return eventService.delete(id);
  }
}

export const dataService = new DataService();
