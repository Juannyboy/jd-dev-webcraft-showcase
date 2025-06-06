
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export const useContactSubmission = () => {
  return useMutation({
    mutationFn: async (data: ContactSubmission) => {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([data]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
    },
    onError: (error) => {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    },
  });
};
