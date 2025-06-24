
import { TeamFullModel, TeamSearchModel } from '../../api/models';
import { supabase } from '@/integrations/supabase/client';

class TeamService {

  async get(id: string): Promise<TeamFullModel> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw new Error('Failed to fetch team');
    }
    
    return {
      id: data.id,
      name: data.name,
      university: data.university,
      members: data.members || [],
      contests: data.contests || []
    };
  }

  async list(prefix: string): Promise<TeamSearchModel[]> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .ilike('name', `%${prefix}%`)
      .limit(10);
    
    if (error) {
      throw new Error('Failed to fetch teams');
    }
    
    return data.map(team => ({
      id: team.id,
      name: team.name,
      university: team.university,
      members: []
    }));
  }
  
}

export const teamService = new TeamService();
