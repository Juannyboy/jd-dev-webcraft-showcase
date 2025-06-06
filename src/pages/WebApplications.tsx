
import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import { useProjectsByCategory } from '@/hooks/useProjects';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code } from 'lucide-react';

const WebApplications = () => {
  const { data: webAppProjects = [], isLoading, error } = useProjectsByCategory('web-app');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading web applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading projects</p>
          <Link to="/" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-mint-500 to-mint-700 rounded-2xl flex items-center justify-center">
              <Code className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Web <span className="text-gradient-mint">Applications</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Powerful web applications that streamline your business operations. 
            Discover our collection of innovative digital solutions.
          </p>
        </div>

        {/* Projects Grid */}
        {webAppProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webAppProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code className="w-12 h-12 text-primary/60" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-muted-foreground">No Web App Projects Yet</h3>
            <p className="text-muted-foreground">Check back soon for our latest web applications!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebApplications;
