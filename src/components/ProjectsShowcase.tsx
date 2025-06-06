
import React from 'react';
import ProjectCard from './ProjectCard';
import { useData } from '@/contexts/DataContext';

const ProjectsShowcase = () => {
  const { projects } = useData();

  return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient-mint">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of cutting-edge web solutions, from dynamic applications to immersive gaming experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-primary/10 rounded-2xl border border-primary/20 glass">
            <div className="w-3 h-3 bg-primary rounded-full pulse-mint"></div>
            <span className="text-primary font-medium">Want to see your project here?</span>
            <button 
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
