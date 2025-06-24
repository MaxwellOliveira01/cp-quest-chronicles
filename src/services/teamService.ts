
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
    
    const members = Array.isArray(data.members) ? data.members as { id: string; name: string; profileId: string }[] : [];
    const contests = Array.isArray(data.contests) ? data.contests as any[] : [];
    
    return {
      id: data.id,
      name: data.name,
      university: { id: '', name: data.university, location: '' },
      members: members,
      contests: contests.map(c => ({
        position: c.position || 1,
        contest: {
          id: c.contestId || c.id || '',
          name: c.name || '',
          year: c.year || new Date().getFullYear()
        }
      }))
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
