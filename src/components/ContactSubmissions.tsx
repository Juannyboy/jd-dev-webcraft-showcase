
import React, { useState } from 'react';
import { Mail, Clock, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useContactSubmissions, ContactSubmission } from '@/hooks/useContactSubmissions';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const ContactSubmissions = () => {
  const { data: submissions = [], isLoading } = useContactSubmissions();
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const queryClient = useQueryClient();

  const markAsReadMutation = useMutation({
    mutationFn: async ({ id, read }: { id: string; read: boolean }) => {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ read })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-submissions'] });
      toast.success('Submission updated');
    },
    onError: (error) => {
      console.error('Error updating submission:', error);
      toast.error('Failed to update submission');
    },
  });

  const handleMarkAsRead = (submission: ContactSubmission) => {
    markAsReadMutation.mutate({ id: submission.id, read: !submission.read });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading submissions...</div>
      </div>
    );
  }

  const unreadCount = submissions.filter(s => !s.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Contact Submissions</h2>
          <p className="text-muted-foreground">
            {submissions.length} total submissions, {unreadCount} unread
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submissions List */}
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No contact submissions yet</p>
            </div>
          ) : (
            submissions.map((submission) => (
              <div
                key={submission.id}
                className={`bg-card rounded-lg border p-4 cursor-pointer transition-colors hover:bg-accent/50 ${
                  selectedSubmission?.id === submission.id ? 'ring-2 ring-primary' : ''
                } ${!submission.read ? 'border-primary/50' : ''}`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{submission.name}</h3>
                    {!submission.read && (
                      <Badge variant="default" className="text-xs">New</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(submission.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{submission.email}</p>
                <p className="text-sm line-clamp-2">{submission.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Submission Detail */}
        <div className="bg-card rounded-lg border p-6">
          {selectedSubmission ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Message Details</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkAsRead(selectedSubmission)}
                  disabled={markAsReadMutation.isPending}
                >
                  {selectedSubmission.read ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Mark Unread
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Mark Read
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">From</label>
                  <p className="font-semibold">{selectedSubmission.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p>{selectedSubmission.email}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <p>{new Date(selectedSubmission.created_at).toLocaleString()}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    {selectedSubmission.read ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Read</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Unread</span>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Message</label>
                  <div className="mt-2 p-4 bg-background rounded-lg border">
                    <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${selectedSubmission.email}`, '_blank')}
                  className="w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Reply via Email
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select a submission to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSubmissions;
