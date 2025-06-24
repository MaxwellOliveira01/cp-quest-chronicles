
import { ContestFullModel, ContestSearchModel } from "../../api/models";
import { supabase } from '@/integrations/supabase/client';

class ContestService {

  async get(id: string): Promise<ContestFullModel> {
    const { data, error } = await supabase
      .from('contests')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw new Error('Failed to fetch contest');
    }
    
    return {
      id: data.id,
      name: data.name,
      year: data.year,
      officialUrl: data.official_url,
      problemsUrl: data.problems_url,
      solutionsUrl: data.solutions_url,
      problemCount: data.problem_count,
      teams: [],
      problems: [
        { id: 'A', name: 'Problem A', label: 'A' },
        { id: 'B', name: 'Problem B', label: 'B' },
        { id: 'C', name: 'Problem C', label: 'C' }
      ],
      ranking: []
    };
  }

  async list(prefix: string): Promise<ContestSearchModel[]> {
    const { data, error } = await supabase
      .from('contests')
      .select('*')
      .ilike('name', `%${prefix}%`)
      .limit(10);
    
    if (error) {
      throw new Error('Failed to fetch contests');
    }
    
    return data.map(contest => ({
      id: contest.id,
      name: contest.name,
      year: contest.year
    }));
  }
  
}

export const contestService = new ContestService();
