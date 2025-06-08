
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export const useContactSubmissions = () => {
  return useQuery({
    queryKey: ['contact-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ContactSubmission[];
    },
  });
};
