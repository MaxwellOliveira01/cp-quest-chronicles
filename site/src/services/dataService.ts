import { profileService, Profile } from './profileService';
import { universityService, University } from './universityService';
import { teamService, Team } from './teamService';
import { contestService, Contest } from './contestService';
import { eventService, Event } from './eventService';

// Import API models
import type { ProfileModel, ProfileFullModel } from '../../../api/profile';
import type { UniversityModel, UniversityFullModel } from '../../../api/university';
import type { TeamModel, TeamMembersModel, TeamFullModel } from '../../../api/team';
import type { ContestModel, ContestResultModel, ContestResultFullModel } from '../../../api/contest';
import type { EventModel, EventFullModel } from '../../../api/events';
import type { ProblemModel, ProblemResultModel } from '../../../api/problem';

// Configuration flag to switch between mock data and backend calls
const USE_BACKEND = false;

// Re-export types for backward compatibility, but now using API models
export type { 
  ProfileModel as Profile, 
  UniversityModel as University, 
  TeamModel as Team, 
  ContestModel as Contest, 
  EventModel as Event,
  ProblemModel,
  ProblemResultModel,
  ContestResultModel,
  ContestResultFullModel
};

class DataService {
  private async delay(): Promise<void> {
    const randomDelay = Math.random() * 1500 + 500; // 0.5 to 2 seconds
    return new Promise(resolve => setTimeout(resolve, randomDelay));
  }

  // Backend API calls (placeholder implementations)
  private async callBackendAPI<T>(endpoint: string, method: string = 'GET', data?: any): Promise<T> {
    // This is where we'll make actual HTTP calls when backend is ready
    // For now, return mock data through existing services
    throw new Error('Backend not implemented yet');
  }

  // Getter methods with async delays
  async getProfiles(): Promise<ProfileModel[]> {
    if (USE_BACKEND) {
      return this.callBackendAPI<ProfileModel[]>('/api/profiles');
    }
    
    await this.delay();
    return profileService.getAll();
  }

  async getUniversities(): Promise<UniversityModel[]> {
    if (USE_BACKEND) {
      return this.callBackendAPI<UniversityModel[]>('/api/universities');
    }
    
    await this.delay();
    return universityService.getAll();
  }

  async getTeams(): Promise<TeamModel[]> {
    if (USE_BACKEND) {
      return this.callBackendAPI<TeamModel[]>('/api/teams');
    }
    
    await this.delay();
    return teamService.getAll();
  }

  async getContests(): Promise<ContestModel[]> {
    if (USE_BACKEND) {
      return this.callBackendAPI<ContestModel[]>('/api/contests');
    }
    
    await this.delay();
    return contestService.getAll();
  }

  async getEvents(): Promise<EventModel[]> {
    if (USE_BACKEND) {
      return this.callBackendAPI<EventModel[]>('/api/events');
    }
    
    await this.delay();
    return eventService.getAll();
  }

  // Find methods with async delays
  async findProfile(id: string): Promise<ProfileModel | undefined> {
    if (USE_BACKEND) {
      return this.callBackendAPI<ProfileModel>(`/api/profiles/${id}`);
    }
    
    await this.delay();
    return profileService.findById(id);
  }

  async findUniversity(id: string): Promise<UniversityModel | undefined> {
    if (USE_BACKEND) {
      return this.callBackendAPI<UniversityModel>(`/api/universities/${id}`);
    }
    
    await this.delay();
    return universityService.findById(id);
  }

  async findTeam(id: string): Promise<TeamModel | undefined> {
    if (USE_BACKEND) {
      return this.callBackendAPI<TeamModel>(`/api/teams/${id}`);
    }
    
    await this.delay();
    return teamService.findById(id);
  }

  async findContest(id: string): Promise<ContestModel | undefined> {
    if (USE_BACKEND) {
      return this.callBackendAPI<ContestModel>(`/api/contests/${id}`);
    }
    
    await this.delay();
    return contestService.findById(id);
  }

  async findEvent(id: string): Promise<EventModel | undefined> {
    if (USE_BACKEND) {
      return this.callBackendAPI<EventModel>(`/api/events/${id}`);
    }
    
    await this.delay();
    return eventService.findById(id);
  }

  // CRUD operations for Profiles with async delays
  async addProfile(profile: Omit<ProfileModel, 'id'>): Promise<ProfileModel> {
    if (USE_BACKEND) {
      return this.callBackendAPI<ProfileModel>('/api/profiles', 'POST', profile);
    }
    
    await this.delay();
    return profileService.add(profile);
  }

  async updateProfile(id: string, updates: Partial<ProfileModel>): Promise<ProfileModel | null> {
    if (USE_BACKEND) {
      return this.callBackendAPI<ProfileModel>(`/api/profiles/${id}`, 'PUT', updates);
    }
    
    await this.delay();
    return profileService.update(id, updates);
  }

  async deleteProfile(id: string): Promise<boolean> {
    if (USE_BACKEND) {
      await this.callBackendAPI(`/api/profiles/${id}`, 'DELETE');
      return true;
    }
    
    await this.delay();
    return profileService.delete(id);
  }

  // CRUD operations for Universities with async delays
  async addUniversity(university: Omit<UniversityModel, 'id'>): Promise<UniversityModel> {
    if (USE_BACKEND) {
      return this.callBackendAPI<UniversityModel>('/api/universities', 'POST', university);
    }
    
    await this.delay();
    return universityService.add(university);
  }

  async updateUniversity(id: string, updates: Partial<UniversityModel>): Promise<UniversityModel | null> {
    if (USE_BACKEND) {
      return this.callBackendAPI<UniversityModel>(`/api/universities/${id}`, 'PUT', updates);
    }
    
    await this.delay();
    return universityService.update(id, updates);
  }

  async deleteUniversity(id: string): Promise<boolean> {
    if (USE_BACKEND) {
      await this.callBackendAPI(`/api/universities/${id}`, 'DELETE');
      return true;
    }
    
    await this.delay();
    return universityService.delete(id);
  }

  // CRUD operations for Teams with async delays
  async addTeam(team: Omit<TeamModel, 'id'>): Promise<TeamModel> {
    if (USE_BACKEND) {
      return this.callBackendAPI<TeamModel>('/api/teams', 'POST', team);
    }
    
    await this.delay();
    return teamService.add(team);
  }

  async updateTeam(id: string, updates: Partial<TeamModel>): Promise<TeamModel | null> {
    if (USE_BACKEND) {
      return this.callBackendAPI<TeamModel>(`/api/teams/${id}`, 'PUT', updates);
    }
    
    await this.delay();
    return teamService.update(id, updates);
  }

  async deleteTeam(id: string): Promise<boolean> {
    if (USE_BACKEND) {
      await this.callBackendAPI(`/api/teams/${id}`, 'DELETE');
      return true;
    }
    
    await this.delay();
    return teamService.delete(id);
  }

  // CRUD operations for Contests with async delays
  async addContest(contest: Omit<ContestModel, 'id'>): Promise<ContestModel> {
    if (USE_BACKEND) {
      return this.callBackendAPI<ContestModel>('/api/contests', 'POST', contest);
    }
    
    await this.delay();
    return contestService.add(contest);
  }

  async updateContest(id: string, updates: Partial<ContestModel>): Promise<ContestModel | null> {
    if (USE_BACKEND) {
      return this.callBackendAPI<ContestModel>(`/api/contests/${id}`, 'PUT', updates);
    }
    
    await this.delay();
    return contestService.update(id, updates);
  }

  async deleteContest(id: string): Promise<boolean> {
    if (USE_BACKEND) {
      await this.callBackendAPI(`/api/contests/${id}`, 'DELETE');
      return true;
    }
    
    await this.delay();
    return contestService.delete(id);
  }

  // CRUD operations for Events with async delays
  async addEvent(event: Omit<EventModel, 'id'>): Promise<EventModel> {
    if (USE_BACKEND) {
      return this.callBackendAPI<EventModel>('/api/events', 'POST', event);
    }
    
    await this.delay();
    return eventService.add(event);
  }

  async updateEvent(id: string, updates: Partial<EventModel>): Promise<EventModel | null> {
    if (USE_BACKEND) {
      return this.callBackendAPI<EventModel>(`/api/events/${id}`, 'PUT', updates);
    }
    
    await this.delay();
    return eventService.update(id, updates);
  }

  async deleteEvent(id: string): Promise<boolean> {
    if (USE_BACKEND) {
      await this.callBackendAPI(`/api/events/${id}`, 'DELETE');
      return true;
    }
    
    await this.delay();
    return eventService.delete(id);
  }
}

export const dataService = new DataService();
