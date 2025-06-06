
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  live_url?: string;
  github_url?: string;
  technologies: string[];
  category: 'web-app' | 'website' | 'web-game';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
  });
};

export const useProjectsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['projects', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
  });
};
