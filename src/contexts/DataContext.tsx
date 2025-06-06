
import React, { createContext, useContext, ReactNode } from 'react';
import { useProjects, Project } from '@/hooks/useProjects';
import { useContactInfo, ContactInfo } from '@/hooks/useContactInfo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DataContextType {
  projects: Project[];
  contactInfo: ContactInfo;
  isLoading: boolean;
  error: string | null;
  addProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateContactInfo: (contactInfo: ContactInfo) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: projects = [], isLoading: projectsLoading, error: projectsError } = useProjects();
  const { data: contactInfo, isLoading: contactLoading, error: contactError } = useContactInfo();

  const defaultContactInfo: ContactInfo = {
    email: 'jdevelopersd@gmail.com',
    phone: '+1 (555) 123-4567',
    address: 'San Diego, CA'
  };

  // Add project mutation
  const addProjectMutation = useMutation({
    mutationFn: async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
      const { error } = await supabase
        .from('projects')
        .insert([project]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project added successfully!');
    },
    onError: (error) => {
      console.error('Error adding project:', error);
      toast.error('Failed to add project');
    },
  });

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: async (project: Project) => {
      const { error } = await supabase
        .from('projects')
        .update({
          title: project.title,
          description: project.description,
          image: project.image,
          live_url: project.live_url,
          github_url: project.github_url,
          technologies: project.technologies,
          category: project.category,
          featured: project.featured,
        })
        .eq('id', project.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    },
  });

  // Update contact info mutation
  const updateContactMutation = useMutation({
    mutationFn: async (newContactInfo: ContactInfo) => {
      const { error } = await supabase
        .from('website_settings')
        .update({ setting_value: newContactInfo })
        .eq('setting_key', 'contact_info');
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-info'] });
      toast.success('Contact info updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating contact info:', error);
      toast.error('Failed to update contact info');
    },
  });

  return (
    <DataContext.Provider value={{
      projects,
      contactInfo: contactInfo || defaultContactInfo,
      isLoading: projectsLoading || contactLoading,
      error: projectsError?.message || contactError?.message || null,
      addProject: addProjectMutation.mutateAsync,
      updateProject: updateProjectMutation.mutateAsync,
      deleteProject: deleteProjectMutation.mutateAsync,
      updateContactInfo: updateContactMutation.mutateAsync,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
