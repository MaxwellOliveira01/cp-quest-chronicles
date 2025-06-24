
import { ProfileFullModel, ProfileSearchModel } from '../../api/models';
import { supabase } from '@/integrations/supabase/client';

class ProfileService {

  async get(id: string): Promise<ProfileFullModel> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw new Error('Failed to fetch profile');
    }
    
    return {
      id: data.id,
      name: data.name,
      handle: data.handle,
      university: { id: '', name: data.university, location: '' },
      teams: [],
      events: [],
      contests: []
    };
  }

  async list(prefix: string): Promise<ProfileSearchModel[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .ilike('name', `%${prefix}%`)
      .limit(10);
    
    if (error) {
      throw new Error('Failed to fetch profiles');
    }
    
    return data.map(profile => ({
      id: profile.id,
      name: profile.name,
      handle: profile.handle,
      university: profile.university
    }));
  }
  
}

export const profileService = new ProfileService();
