
import React, { useState } from 'react';
import { ExternalLink, Code, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const typeColors = {
    'web-app': 'bg-blue-500/10 text-blue-600 border-blue-200',
    'website': 'bg-green-500/10 text-green-600 border-green-200', 
    'web-game': 'bg-purple-500/10 text-purple-600 border-purple-200'
  };

  const typeLabels = {
    'web-app': 'Web Application',
    'website': 'Website',
    'web-game': 'Web Game'
  };

  return (
    <div 
      className="group relative bg-card rounded-2xl overflow-hidden hover-lift glass border border-primary/10 transform-3d"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image/Preview */}
      <div className="relative overflow-hidden h-64">
        <img 
          src={project.image} 
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`} />
        
        {/* Hover overlay with preview button */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {project.liveUrl && (
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => window.open(project.liveUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Preview
            </Button>
          )}
        </div>

        {/* Project type badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className={`${typeColors[project.type]} glass`}>
            {typeLabels[project.type]}
          </Badge>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-card-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-primary/20 hover:border-primary/40 transition-colors">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {project.liveUrl && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 border-primary/30 hover:bg-primary/5"
              onClick={() => window.open(project.liveUrl, '_blank')}
            >
              <Monitor className="w-4 h-4 mr-1" />
              View Live
            </Button>
          )}
          {project.codeUrl && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 border-primary/30 hover:bg-primary/5"
              onClick={() => window.open(project.codeUrl, '_blank')}
            >
              <Code className="w-4 h-4 mr-1" />
              Source
            </Button>
          )}
        </div>
      </div>

      {/* 3D hover effect elements */}
      <div className={`absolute -top-2 -right-2 w-4 h-4 bg-primary/20 rounded-full transition-transform duration-300 ${
        isHovered ? 'transform translate-x-1 -translate-y-1 scale-150' : ''
      }`} />
      <div className={`absolute -bottom-2 -left-2 w-3 h-3 border border-primary/30 rounded transition-transform duration-300 ${
        isHovered ? 'transform -translate-x-1 translate-y-1 rotate-45' : ''
      }`} />
    </div>
  );
};

export default ProjectCard;
