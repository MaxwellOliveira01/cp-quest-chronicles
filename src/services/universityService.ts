
import { UniversityFullModel, UniversitySearchModel } from "../../api/models";
import { supabase } from '@/integrations/supabase/client';

class UniversityService {
  async get(id: string): Promise<UniversityFullModel> {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw new Error('Failed to fetch university');
    }
    
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      students: [],
      teams: [],
      contests: []
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
}

export const universityService = new UniversityService();
