
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export const useContactInfo = () => {
  return useQuery({
    queryKey: ['contact-info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('website_settings')
        .select('setting_value')
        .eq('setting_key', 'contact_info')
        .single();

      if (error) throw error;
      return data.setting_value as unknown as ContactInfo;
    },
  });
};
