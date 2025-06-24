import { universityService } from './universityService';
import { teamService } from './teamService';
import { contestService } from './contestService';
import { eventService } from './eventService';

// Import API models
import type { UniversityModel } from '../../../api/university';
import type { TeamModel } from '../../../api/team';
import type { ContestModel } from '../../../api/contest';
import type { EventModel } from '../../../api/events';


class DataService {
  private async delay(): Promise<void> {
    // const randomDelay = Math.random() * 1500 + 500; // 0.5 to 2 seconds
    const randomDelay = 0;
    return new Promise(resolve => setTimeout(resolve, randomDelay));
  }

  // Backend API calls (placeholder implementations)
  private async callBackendAPI<T>(endpoint: string, method: string = 'GET', data?: any): Promise<T> {
    // This is where we'll make actual HTTP calls when backend is ready
    // For now, return mock data through existing services
    throw new Error('Backend not implemented yet');
  }

  async getUniversities(): Promise<UniversityModel[]> {
    await this.delay();
    return universityService.getAll();
  }

  async getTeams(): Promise<TeamModel[]> {
    await this.delay();
    return teamService.getAll();
  }

  async getContests(): Promise<ContestModel[]> {
    
    await this.delay();
    return contestService.getAll();
  }

  async getEvents(): Promise<EventModel[]> {
    await this.delay();
    return eventService.getAll();
  }

  async findUniversity(id: string): Promise<UniversityModel | undefined> {
    await this.delay();
    return universityService.findById(id);
  }

  async findTeam(id: string): Promise<TeamModel | undefined> {
    await this.delay();
    return teamService.findById(id);
  }

  async findContest(id: string): Promise<ContestModel | undefined> {
    await this.delay();
    return contestService.findById(id);
  }

  async findEvent(id: string): Promise<EventModel | undefined> {
    await this.delay();
    return eventService.findById(id);
  }

  // CRUD operations for Universities with async delays
  async addUniversity(university: Omit<UniversityModel, 'id'>): Promise<UniversityModel> {
    await this.delay();
    return universityService.add(university);
  }

  async updateUniversity(id: string, updates: Partial<UniversityModel>): Promise<UniversityModel | null> {
    await this.delay();
    return universityService.update(id, updates);
  }

  async deleteUniversity(id: string): Promise<boolean> {
    await this.delay();
    return universityService.delete(id);
  }

  // CRUD operations for Teams with async delays
  async addTeam(team: Omit<TeamModel, 'id'>): Promise<TeamModel> {
    await this.delay();
    return teamService.add(team);
  }

  async updateTeam(id: string, updates: Partial<TeamModel>): Promise<TeamModel | null> {
    await this.delay();
    return teamService.update(id, updates);
  }

  async deleteTeam(id: string): Promise<boolean> {
    await this.delay();
    return teamService.delete(id);
  }

  // CRUD operations for Contests with async delays
  async addContest(contest: Omit<ContestModel, 'id'>): Promise<ContestModel> {
    await this.delay();
    return contestService.add(contest);
  }

  async updateContest(id: string, updates: Partial<ContestModel>): Promise<ContestModel | null> {
    await this.delay();
    return contestService.update(id, updates);
  }

  async deleteContest(id: string): Promise<boolean> {
    await this.delay();
    return contestService.delete(id);
  }

  // CRUD operations for Events with async delays
  async addEvent(event: Omit<EventModel, 'id'>): Promise<EventModel> {    
    await this.delay();
    return eventService.add(event);
  }

  async updateEvent(id: string, updates: Partial<EventModel>): Promise<EventModel | null> {    
    await this.delay();
    return eventService.update(id, updates);
  }

  async deleteEvent(id: string): Promise<boolean> {
    await this.delay();
    return eventService.delete(id);
  }
}

export const dataService = new DataService();
