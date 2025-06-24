
import { supabase } from '@/integrations/supabase/client';
import type { ProfileFullModel, UniversityFullModel, TeamFullModel, ContestFullModel, EventFullModel } from '../../api/models';

const USE_BACKEND = true; // Toggle between mock data and real backend

class DataService {
  private async delay(): Promise<void> {
    const randomDelay = 0;
    return new Promise(resolve => setTimeout(resolve, randomDelay));
  }

  // Profiles
  async getProfiles(): Promise<ProfileFullModel[]> {
    if (!USE_BACKEND) {
      await this.delay();
      return [];
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    
    if (error) throw error;
    
    return data.map(profile => ({
      id: profile.id,
      name: profile.name,
      handle: profile.handle,
      university: profile.university,
      teams: [],
      events: [],
      contests: []
    }));
  }

  async findProfile(id: string): Promise<ProfileFullModel | undefined> {
    if (!USE_BACKEND) {
      await this.delay();
      return undefined;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      handle: data.handle,
      university: data.university,
      teams: [],
      events: [],
      contests: []
    };
  }

  async addProfile(profile: Omit<ProfileFullModel, 'id' | 'teams' | 'events' | 'contests'>): Promise<ProfileFullModel> {
    if (!USE_BACKEND) {
      await this.delay();
      const id = Math.random().toString(36).substr(2, 9);
      return { ...profile, id, teams: [], events: [], contests: [] };
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        name: profile.name,
        handle: profile.handle,
        university: profile.university
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      handle: data.handle,
      university: data.university,
      teams: [],
      events: [],
      contests: []
    };
  }

  async updateProfile(id: string, updates: Partial<ProfileFullModel>): Promise<ProfileFullModel | null> {
    if (!USE_BACKEND) {
      await this.delay();
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update({
        name: updates.name,
        handle: updates.handle,
        university: updates.university
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error || !data) return null;
    
    return {
      id: data.id,
      name: data.name,
      handle: data.handle,
      university: data.university,
      teams: [],
      events: [],
      contests: []
    };
  }

  async deleteProfile(id: string): Promise<boolean> {
    if (!USE_BACKEND) {
      await this.delay();
      return true;
    }
    
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
    
    return !error;
  }

  // Universities
  async getUniversities(): Promise<UniversityFullModel[]> {
    if (!USE_BACKEND) {
      await this.delay();
      return [];
    }
    
    const { data, error } = await supabase
      .from('universities')
      .select('*');
    
    if (error) throw error;
    
    return data.map(university => ({
      id: university.id,
      name: university.name,
      location: university.location,
      students: [],
      teams: [],
      contests: []
    }));
  }

  async findUniversity(id: string): Promise<UniversityFullModel | undefined> {
    if (!USE_BACKEND) {
      await this.delay();
      return undefined;
    }
    
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      students: [],
      teams: [],
      contests: []
    };
  }

  async addUniversity(university: Omit<UniversityFullModel, 'id' | 'students' | 'teams' | 'contests'>): Promise<UniversityFullModel> {
    if (!USE_BACKEND) {
      await this.delay();
      const id = Math.random().toString(36).substr(2, 9);
      return { ...university, id, students: [], teams: [], contests: [] };
    }
    
    const { data, error } = await supabase
      .from('universities')
      .insert({
        name: university.name,
        location: university.location
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      students: [],
      teams: [],
      contests: []
    };
  }

  async updateUniversity(id: string, updates: Partial<UniversityFullModel>): Promise<UniversityFullModel | null> {
    if (!USE_BACKEND) {
      await this.delay();
      return null;
    }
    
    const { data, error } = await supabase
      .from('universities')
      .update({
        name: updates.name,
        location: updates.location
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error || !data) return null;
    
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      students: [],
      teams: [],
      contests: []
    };
  }

  async deleteUniversity(id: string): Promise<boolean> {
    if (!USE_BACKEND) {
      await this.delay();
      return true;
    }
    
    const { error } = await supabase
      .from('universities')
      .delete()
      .eq('id', id);
    
    return !error;
  }

  // Teams
  async getTeams(): Promise<TeamFullModel[]> {
    if (!USE_BACKEND) {
      await this.delay();
      return [];
    }
    
    const { data, error } = await supabase
      .from('teams')
      .select('*');
    
    if (error) throw error;
    
    return data.map(team => ({
      id: team.id,
      name: team.name,
      university: team.university,
      members: team.members || [],
      contests: team.contests || []
    }));
  }

  async findTeam(id: string): Promise<TeamFullModel | undefined> {
    if (!USE_BACKEND) {
      await this.delay();
      return undefined;
    }
    
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      university: data.university,
      members: data.members || [],
      contests: data.contests || []
    };
  }

  async addTeam(team: Omit<TeamFullModel, 'id'>): Promise<TeamFullModel> {
    if (!USE_BACKEND) {
      await this.delay();
      const id = Math.random().toString(36).substr(2, 9);
      return { ...team, id };
    }
    
    const { data, error } = await supabase
      .from('teams')
      .insert({
        name: team.name,
        university: team.university,
        members: team.members,
        contests: team.contests
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      university: data.university,
      members: data.members || [],
      contests: data.contests || []
    };
  }

  async updateTeam(id: string, updates: Partial<TeamFullModel>): Promise<TeamFullModel | null> {
    if (!USE_BACKEND) {
      await this.delay();
      return null;
    }
    
    const { data, error } = await supabase
      .from('teams')
      .update({
        name: updates.name,
        university: updates.university,
        members: updates.members,
        contests: updates.contests
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error || !data) return null;
    
    return {
      id: data.id,
      name: data.name,
      university: data.university,
      members: data.members || [],
      contests: data.contests || []
    };
  }

  async deleteTeam(id: string): Promise<boolean> {
    if (!USE_BACKEND) {
      await this.delay();
      return true;
    }
    
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);
    
    return !error;
  }

  // Contests
  async getContests(): Promise<ContestFullModel[]> {
    if (!USE_BACKEND) {
      await this.delay();
      return [];
    }
    
    const { data, error } = await supabase
      .from('contests')
      .select('*');
    
    if (error) throw error;
    
    return data.map(contest => ({
      id: contest.id,
      name: contest.name,
      year: contest.year,
      officialUrl: contest.official_url,
      problemsUrl: contest.problems_url,
      solutionsUrl: contest.solutions_url,
      problemCount: contest.problem_count,
      teams: []
    }));
  }

  async findContest(id: string): Promise<ContestFullModel | undefined> {
    if (!USE_BACKEND) {
      await this.delay();
      return undefined;
    }
    
    const { data, error } = await supabase
      .from('contests')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      year: data.year,
      officialUrl: data.official_url,
      problemsUrl: data.problems_url,
      solutionsUrl: data.solutions_url,
      problemCount: data.problem_count,
      teams: []
    };
  }

  async addContest(contest: Omit<ContestFullModel, 'id' | 'teams'>): Promise<ContestFullModel> {
    if (!USE_BACKEND) {
      await this.delay();
      const id = Math.random().toString(36).substr(2, 9);
      return { ...contest, id, teams: [] };
    }
    
    const { data, error } = await supabase
      .from('contests')
      .insert({
        name: contest.name,
        year: contest.year,
        official_url: contest.officialUrl,
        problems_url: contest.problemsUrl,
        solutions_url: contest.solutionsUrl,
        problem_count: contest.problemCount
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      year: data.year,
      officialUrl: data.official_url,
      problemsUrl: data.problems_url,
      solutionsUrl: data.solutions_url,
      problemCount: data.problem_count,
      teams: []
    };
  }

  async updateContest(id: string, updates: Partial<ContestFullModel>): Promise<ContestFullModel | null> {
    if (!USE_BACKEND) {
      await this.delay();
      return null;
    }
    
    const { data, error } = await supabase
      .from('contests')
      .update({
        name: updates.name,
        year: updates.year,
        official_url: updates.officialUrl,
        problems_url: updates.problemsUrl,
        solutions_url: updates.solutionsUrl,
        problem_count: updates.problemCount
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error || !data) return null;
    
    return {
      id: data.id,
      name: data.name,
      year: data.year,
      officialUrl: data.official_url,
      problemsUrl: data.problems_url,
      solutionsUrl: data.solutions_url,
      problemCount: data.problem_count,
      teams: []
    };
  }

  async deleteContest(id: string): Promise<boolean> {
    if (!USE_BACKEND) {
      await this.delay();
      return true;
    }
    
    const { error } = await supabase
      .from('contests')
      .delete()
      .eq('id', id);
    
    return !error;
  }

  // Events
  async getEvents(): Promise<EventFullModel[]> {
    if (!USE_BACKEND) {
      await this.delay();
      return [];
    }
    
    const { data, error } = await supabase
      .from('events')
      .select('*');
    
    if (error) throw error;
    
    return data.map(event => ({
      id: event.id,
      name: event.name,
      location: event.location,
      startDate: event.start_date,
      endDate: event.end_date,
      participants: event.participants || []
    }));
  }

  async findEvent(id: string): Promise<EventFullModel | undefined> {
    if (!USE_BACKEND) {
      await this.delay();
      return undefined;
    }
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) return undefined;
    
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      startDate: data.start_date,
      endDate: data.end_date,
      participants: data.participants || []
    };
  }

  async addEvent(event: Omit<EventFullModel, 'id'>): Promise<EventFullModel> {
    if (!USE_BACKEND) {
      await this.delay();
      const id = Math.random().toString(36).substr(2, 9);
      return { ...event, id };
    }
    
    const { data, error } = await supabase
      .from('events')
      .insert({
        name: event.name,
        location: event.location,
        start_date: event.startDate,
        end_date: event.endDate,
        participants: event.participants
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      startDate: data.start_date,
      endDate: data.end_date,
      participants: data.participants || []
    };
  }

  async updateEvent(id: string, updates: Partial<EventFullModel>): Promise<EventFullModel | null> {
    if (!USE_BACKEND) {
      await this.delay();
      return null;
    }
    
    const { data, error } = await supabase
      .from('events')
      .update({
        name: updates.name,
        location: updates.location,
        start_date: updates.startDate,
        end_date: updates.endDate,
        participants: updates.participants
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error || !data) return null;
    
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      startDate: data.start_date,
      endDate: data.end_date,
      participants: data.participants || []
    };
  }

  async deleteEvent(id: string): Promise<boolean> {
    if (!USE_BACKEND) {
      await this.delay();
      return true;
    }
    
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    return !error;
  }
}

export const dataService = new DataService();

// Re-export types from api/models
export type {
  ProfileFullModel as Profile,
  UniversityFullModel as University,
  TeamFullModel as Team,
  ContestFullModel as Contest,
  EventFullModel as Event
} from '../../api/models';
