import { UniversityFullModel, UniversitySearchModel } from "../../api/models";
import { supabase } from '@/integrations/supabase/client';

class UniversityService {
  async get(id: string): Promise<UniversityFullModel> {
    // Get university data
    const { data: universityData, error: universityError } = await supabase
      .from('universities')
      .select('*')
      .eq('id', id)
      .single();
    
    if (universityError) {
      throw new Error('Failed to fetch university');
    }

    // Get students from this university
    const { data: students, error: studentsError } = await supabase
      .from('persons')
      .select('id, name, handle')
      .eq('university_id', id);

    if (studentsError) {
      throw new Error('Failed to fetch students');
    }

    // Get teams from this university
    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('id, name')
      .eq('university_id', id);

    if (teamsError) {
      throw new Error('Failed to fetch teams');
    }

    // Get contests that teams from this university participated in
    const { data: contestData, error: contestsError } = await supabase
      .from('contest_performances')
      .select(`
        contests (
          id,
          name,
          year
        )
      `)
      .in('team_id', teams?.map(t => t.id) || []);

    if (contestsError) {
      throw new Error('Failed to fetch contests');
    }

    // Remove duplicates from contests
    const uniqueContests = contestData?.reduce((acc, curr) => {
      const existing = acc.find(c => c.id === curr.contests.id);
      if (!existing) {
        acc.push({
          id: curr.contests.id,
          name: curr.contests.name,
          year: curr.contests.year
        });
      }
      return acc;
    }, [] as any[]) || [];
    
    return {
      id: universityData.id,
      name: universityData.name,
      location: universityData.location,
      students: students?.map(s => ({
        id: s.id,
        name: s.name,
        handle: s.handle,
        university: universityData.name
      })) || [],
      teams: teams?.map(t => ({
        id: t.id,
        name: t.name,
        university: universityData.name,
        members: []
      })) || [],
      contests: uniqueContests
    };
  }

  async list(prefix: string): Promise<UniversitySearchModel[]> {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .ilike('name', `%${prefix}%`)
      .limit(10);
    
    if (error) {
      throw new Error('Failed to fetch universities');
    }
    
    return data.map(university => ({
      id: university.id,
      name: university.name,
      location: university.location
    }));
  }

  async getAll(): Promise<UniversityFullModel[]> {
    const { data, error } = await supabase
      .from('universities')
      .select('*');
    
    if (error) {
      throw new Error('Failed to fetch universities');
    }
    
    return data.map(university => ({
      id: university.id,
      name: university.name,
      location: university.location,
      students: [],
      teams: [],
      contests: []
    }));
  }

  async create(university: Omit<UniversityFullModel, 'id' | 'students' | 'teams' | 'contests'>): Promise<void> {
    const { error } = await supabase
      .from('universities')
      .insert({
        name: university.name,
        location: university.location
      });
    
    if (error) {
      throw new Error('Failed to create university');
    }
  }

  async update(id: string, university: Omit<UniversityFullModel, 'id' | 'students' | 'teams' | 'contests'>): Promise<void> {
    const { error } = await supabase
      .from('universities')
      .update({
        name: university.name,
        location: university.location
      })
      .eq('id', id);
    
    if (error) {
      throw new Error('Failed to update university');
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('universities')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error('Failed to delete university');
    }
  }
}

export const universityService = new UniversityService();
