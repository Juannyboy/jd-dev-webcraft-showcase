
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export const useContactSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ContactSubmission) => {
      // Insert the submission into the database
      const { data: submission, error } = await supabase
        .from('contact_submissions')
        .insert([data])
        .select()
        .single();

      if (error) throw error;

      // Call the edge function to send email notification
      try {
        const { error: emailError } = await supabase.functions.invoke('send-contact-notification', {
          body: {
            submission_id: submission.id,
            name: submission.name,
            email: submission.email,
            message: submission.message,
            created_at: submission.created_at
          }
        });

        if (emailError) {
          console.error('Error sending email notification:', emailError);
          // Don't throw here - the submission was successful even if email failed
        }
      } catch (emailError) {
        console.error('Error calling email notification function:', emailError);
        // Don't throw here - the submission was successful even if email failed
      }

      return submission;
    },
    onSuccess: () => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      // Invalidate contact submissions to refresh the admin view
      queryClient.invalidateQueries({ queryKey: ['contact-submissions'] });
    },
    onError: (error) => {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    },
  });
};
