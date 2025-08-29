
import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import { useProjectsByCategory } from '@/hooks/useProjects';
import { Link } from 'react-router-dom';
import { ArrowLeft, Monitor } from 'lucide-react';

const SoftwareDevelopment = () => {
  const { data: softwareProjects = [], isLoading, error } = useProjectsByCategory('software');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading software projects...</p>
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
            <div className="w-16 h-16 bg-gradient-to-br from-mint-700 to-mint-900 rounded-2xl flex items-center justify-center">
              <Monitor className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Software <span className="text-gradient-mint">Development</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Desktop and mobile applications that solve real-world problems. 
            Explore our portfolio of innovative software solutions.
          </p>
        </div>

        {/* Projects Grid */}
        {softwareProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softwareProjects.map((project, index) => (
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
              <Monitor className="w-12 h-12 text-primary/60" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-muted-foreground">No Software Projects Yet</h3>
            <p className="text-muted-foreground">Check back soon for our latest software applications!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoftwareDevelopment;
