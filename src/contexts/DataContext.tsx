
import React, { createContext, useContext, ReactNode } from 'react';
import { useProjects, Project } from '@/hooks/useProjects';
import { useContactInfo, ContactInfo } from '@/hooks/useContactInfo';

interface DataContextType {
  projects: Project[];
  contactInfo: ContactInfo;
  isLoading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: projects = [], isLoading: projectsLoading, error: projectsError } = useProjects();
  const { data: contactInfo, isLoading: contactLoading, error: contactError } = useContactInfo();

  const defaultContactInfo: ContactInfo = {
    email: 'jdevelopersd@gmail.com',
    phone: '+1 (555) 123-4567',
    address: 'San Diego, CA'
  };

  return (
    <DataContext.Provider value={{
      projects,
      contactInfo: contactInfo || defaultContactInfo,
      isLoading: projectsLoading || contactLoading,
      error: projectsError?.message || contactError?.message || null
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
