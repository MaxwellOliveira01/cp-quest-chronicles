
import { ContestFullModel, ContestSearchModel } from "../../api/models";
import { supabase } from '@/integrations/supabase/client';

class ContestService {

  async get(id: string): Promise<ContestFullModel> {
    // Get contest data
    const { data: contestData, error: contestError } = await supabase
      .from('contests')
      .select('*')
      .eq('id', id)
      .single();
    
    if (contestError) {
      throw new Error('Failed to fetch contest');
    }

    // Get team performances for this contest
    const { data: teamPerformances, error: teamError } = await supabase
      .from('contest_performances')
      .select(`
        position,
        teams (
          id,
          name,
          universities (
            name
          )
        )
      `)
      .eq('contest_id', id)
      .not('team_id', 'is', null)
      .order('position');

    if (teamError) {
      throw new Error('Failed to fetch team performances');
    }
    
    return {
      id: contestData.id,
      name: contestData.name,
      year: contestData.year,
      officialUrl: contestData.official_url,
      problemsUrl: contestData.problems_url,
      solutionsUrl: contestData.solutions_url,
      problemCount: contestData.problem_count,
      teams: teamPerformances?.map(tp => tp.teams.id) || [],
      problems: Array.from({ length: contestData.problem_count }, (_, i) => ({
        id: String.fromCharCode(65 + i),
        name: `Problem ${String.fromCharCode(65 + i)}`,
        label: String.fromCharCode(65 + i)
      })),
      ranking: teamPerformances?.map(tp => ({
        team: {
          id: tp.teams.id,
          name: tp.teams.name,
          university: tp.teams.universities?.name || '',
          members: []
        },
        position: tp.position,
        penalty: 0,
        submissions: []
      })) || []
    };
  }

  async list(prefix: string, yearFilter?: number): Promise<ContestSearchModel[]> {
    let query = supabase
      .from('contests')
      .select('*')
      .ilike('name', `%${prefix}%`)
      .limit(10);

    if (yearFilter) {
      query = query.eq('year', yearFilter);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw new Error('Failed to fetch contests');
    }
    
    return data.map(contest => ({
      id: contest.id,
      name: contest.name,
      year: contest.year
    }));
  }

  async getAll(): Promise<ContestFullModel[]> {
    const { data, error } = await supabase
      .from('contests')
      .select('*');
    
    if (error) {
      throw new Error('Failed to fetch contests');
    }
    
    return data.map(contest => ({
      id: contest.id,
      name: contest.name,
      year: contest.year,
      officialUrl: contest.official_url,
      problemsUrl: contest.problems_url,
      solutionsUrl: contest.solutions_url,
      problemCount: contest.problem_count,
      teams: [],
      problems: Array.from({ length: contest.problem_count }, (_, i) => ({
        id: String.fromCharCode(65 + i),
        name: `Problem ${String.fromCharCode(65 + i)}`,
        label: String.fromCharCode(65 + i)
      })),
      ranking: []
    }));
  }

  async create(contest: Omit<ContestFullModel, 'id' | 'teams' | 'problems' | 'ranking'>): Promise<void> {
    const { error } = await supabase
      .from('contests')
      .insert({
        name: contest.name,
        year: contest.year,
        official_url: contest.officialUrl,
        problems_url: contest.problemsUrl,
        solutions_url: contest.solutionsUrl,
        problem_count: contest.problemCount
      });
    
    if (error) {
      throw new Error('Failed to create contest');
    }
  }

  async update(id: string, contest: Omit<ContestFullModel, 'id' | 'teams' | 'problems' | 'ranking'>): Promise<void> {
    const { error } = await supabase
      .from('contests')
      .update({
        name: contest.name,
        year: contest.year,
        official_url: contest.officialUrl,
        problems_url: contest.problemsUrl,
        solutions_url: contest.solutionsUrl,
        problem_count: contest.problemCount
      })
      .eq('id', id);
    
    if (error) {
      throw new Error('Failed to update contest');
    }
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('contests')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error('Failed to delete contest');
    }
  }
  
}

export const contestService = new ContestService();
