
import { profileService, Profile } from './profileService';
import { universityService, University } from './universityService';
import { teamService, Team } from './teamService';
import { contestService, Contest } from './contestService';
import { eventService, Event } from './eventService';

// Re-export types for backward compatibility
export type { Profile, University, Team, Contest, Event };

class DataService {
  // Getter methods
  getProfiles(): Profile[] {
    return profileService.getAll();
  }

  getUniversities(): University[] {
    return universityService.getAll();
  }

  getTeams(): Team[] {
    return teamService.getAll();
  }

  getContests(): Contest[] {
    return contestService.getAll();
  }

  getEvents(): Event[] {
    return eventService.getAll();
  }

  // Find methods
  findProfile(id: string): Profile | undefined {
    return profileService.findById(id);
  }

  findUniversity(id: string): University | undefined {
    return universityService.findById(id);
  }

  findTeam(id: string): Team | undefined {
    return teamService.findById(id);
  }

  findContest(id: string): Contest | undefined {
    return contestService.findById(id);
  }

  findEvent(id: string): Event | undefined {
    return eventService.findById(id);
  }

  // CRUD operations for Profiles
  addProfile(profile: Omit<Profile, 'id'>): Profile {
    return profileService.add(profile);
  }

  updateProfile(id: string, updates: Partial<Profile>): Profile | null {
    return profileService.update(id, updates);
  }

  deleteProfile(id: string): boolean {
    return profileService.delete(id);
  }

  // CRUD operations for Universities
  addUniversity(university: Omit<University, 'id'>): University {
    return universityService.add(university);
  }

  updateUniversity(id: string, updates: Partial<University>): University | null {
    return universityService.update(id, updates);
  }

  deleteUniversity(id: string): boolean {
    return universityService.delete(id);
  }

  // CRUD operations for Teams
  addTeam(team: Omit<Team, 'id'>): Team {
    return teamService.add(team);
  }

  updateTeam(id: string, updates: Partial<Team>): Team | null {
    return teamService.update(id, updates);
  }

  deleteTeam(id: string): boolean {
    return teamService.delete(id);
  }

  // CRUD operations for Contests
  addContest(contest: Omit<Contest, 'id'>): Contest {
    return contestService.add(contest);
  }

  updateContest(id: string, updates: Partial<Contest>): Contest | null {
    return contestService.update(id, updates);
  }

  deleteContest(id: string): boolean {
    return contestService.delete(id);
  }

  // CRUD operations for Events
  addEvent(event: Omit<Event, 'id'>): Event {
    return eventService.add(event);
  }

  updateEvent(id: string, updates: Partial<Event>): Event | null {
    return eventService.update(id, updates);
  }

  deleteEvent(id: string): boolean {
    return eventService.delete(id);
  }
}

export const dataService = new DataService();
