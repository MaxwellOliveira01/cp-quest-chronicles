
import { profileService, Profile } from './profileService';
import { universityService, University } from './universityService';
import { teamService, Team } from './teamService';
import { contestService, Contest } from './contestService';
import { eventService, Event } from './eventService';

// Re-export types for backward compatibility
export type { Profile, University, Team, Contest, Event };

class DataService {
  private async delay(): Promise<void> {
    const randomDelay = Math.random() * 1500 + 500; // 0.5 to 2 seconds
    return new Promise(resolve => setTimeout(resolve, randomDelay));
  }

  // Getter methods with async delays
  async getProfiles(): Promise<Profile[]> {
    await this.delay();
    return profileService.getAll();
  }

  async getUniversities(): Promise<University[]> {
    await this.delay();
    return universityService.getAll();
  }

  async getTeams(): Promise<Team[]> {
    await this.delay();
    return teamService.getAll();
  }

  async getContests(): Promise<Contest[]> {
    await this.delay();
    return contestService.getAll();
  }

  async getEvents(): Promise<Event[]> {
    await this.delay();
    return eventService.getAll();
  }

  // Find methods with async delays
  async findProfile(id: string): Promise<Profile | undefined> {
    await this.delay();
    return profileService.findById(id);
  }

  async findUniversity(id: string): Promise<University | undefined> {
    await this.delay();
    return universityService.findById(id);
  }

  async findTeam(id: string): Promise<Team | undefined> {
    await this.delay();
    return teamService.findById(id);
  }

  async findContest(id: string): Promise<Contest | undefined> {
    await this.delay();
    return contestService.findById(id);
  }

  async findEvent(id: string): Promise<Event | undefined> {
    await this.delay();
    return eventService.findById(id);
  }

  // CRUD operations for Profiles with async delays
  async addProfile(profile: Omit<Profile, 'id'>): Promise<Profile> {
    await this.delay();
    return profileService.add(profile);
  }

  async updateProfile(id: string, updates: Partial<Profile>): Promise<Profile | null> {
    await this.delay();
    return profileService.update(id, updates);
  }

  async deleteProfile(id: string): Promise<boolean> {
    await this.delay();
    return profileService.delete(id);
  }

  // CRUD operations for Universities with async delays
  async addUniversity(university: Omit<University, 'id'>): Promise<University> {
    await this.delay();
    return universityService.add(university);
  }

  async updateUniversity(id: string, updates: Partial<University>): Promise<University | null> {
    await this.delay();
    return universityService.update(id, updates);
  }

  async deleteUniversity(id: string): Promise<boolean> {
    await this.delay();
    return universityService.delete(id);
  }

  // CRUD operations for Teams with async delays
  async addTeam(team: Omit<Team, 'id'>): Promise<Team> {
    await this.delay();
    return teamService.add(team);
  }

  async updateTeam(id: string, updates: Partial<Team>): Promise<Team | null> {
    await this.delay();
    return teamService.update(id, updates);
  }

  async deleteTeam(id: string): Promise<boolean> {
    await this.delay();
    return teamService.delete(id);
  }

  // CRUD operations for Contests with async delays
  async addContest(contest: Omit<Contest, 'id'>): Promise<Contest> {
    await this.delay();
    return contestService.add(contest);
  }

  async updateContest(id: string, updates: Partial<Contest>): Promise<Contest | null> {
    await this.delay();
    return contestService.update(id, updates);
  }

  async deleteContest(id: string): Promise<boolean> {
    await this.delay();
    return contestService.delete(id);
  }

  // CRUD operations for Events with async delays
  async addEvent(event: Omit<Event, 'id'>): Promise<Event> {
    await this.delay();
    return eventService.add(event);
  }

  async updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
    await this.delay();
    return eventService.update(id, updates);
  }

  async deleteEvent(id: string): Promise<boolean> {
    await this.delay();
    return eventService.delete(id);
  }
}

export const dataService = new DataService();
