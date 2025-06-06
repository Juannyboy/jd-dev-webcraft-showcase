
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  codeUrl?: string;
  tags: string[];
  type: 'web-app' | 'website' | 'web-game';
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

interface DataContextType {
  projects: Project[];
  contactInfo: ContactInfo;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateContactInfo: (info: ContactInfo) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A modern, responsive e-commerce solution with advanced filtering, cart management, and secure payment integration.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    liveUrl: 'https://demo-ecommerce.com',
    codeUrl: 'https://github.com/jd-dev/ecommerce',
    tags: ['React', 'TypeScript', 'Stripe', 'Tailwind'],
    type: 'web-app'
  },
  {
    id: '2', 
    title: 'Portfolio Website',
    description: 'Clean, minimalist portfolio showcasing creative work with smooth animations and mobile-first design.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
    liveUrl: 'https://portfolio-demo.com',
    tags: ['Next.js', 'Framer Motion', 'CSS Grid'],
    type: 'website'
  },
  {
    id: '3',
    title: 'Interactive Game Hub',
    description: 'Engaging web-based gaming platform with real-time multiplayer capabilities and immersive 3D graphics.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    liveUrl: 'https://game-hub-demo.com',
    codeUrl: 'https://github.com/jd-dev/game-hub',
    tags: ['Three.js', 'WebGL', 'Socket.io', 'WebRTC'],
    type: 'web-game'
  },
  {
    id: '4',
    title: 'Dashboard Analytics',
    description: 'Comprehensive business intelligence dashboard with real-time data visualization and advanced reporting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    liveUrl: 'https://dashboard-demo.com',
    tags: ['Vue.js', 'D3.js', 'Chart.js', 'REST API'],
    type: 'web-app'
  },
  {
    id: '5',
    title: 'Restaurant Website',
    description: 'Beautiful restaurant website with online reservations, menu showcase, and location integration.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    liveUrl: 'https://restaurant-demo.com',
    tags: ['HTML5', 'SCSS', 'JavaScript', 'Google Maps'],
    type: 'website'
  },
  {
    id: '6',
    title: 'VR Experience',
    description: 'Immersive virtual reality web experience showcasing architectural designs with WebXR technology.',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?auto=format&fit=crop&w=800&q=80',
    liveUrl: 'https://vr-demo.com',
    codeUrl: 'https://github.com/jd-dev/vr-experience',
    tags: ['WebXR', 'A-Frame', 'Three.js', 'WebGL'],
    type: 'web-game'
  }
];

const initialContactInfo: ContactInfo = {
  email: 'jdevelopersd@gmail.com',
  phone: '+1 (555) 123-4567',
  address: 'San Diego, CA'
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo);

  const addProject = (project: Project) => {
    setProjects(prev => [...prev, project]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
  };

  return (
    <DataContext.Provider value={{
      projects,
      contactInfo,
      addProject,
      updateProject,
      deleteProject,
      updateContactInfo
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
