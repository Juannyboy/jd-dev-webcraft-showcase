
import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectsShowcase = () => {
  // Demo projects - in real app this would come from the admin-managed data
  const projects = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A modern, responsive e-commerce solution with advanced filtering, cart management, and secure payment integration.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://demo-ecommerce.com',
      codeUrl: 'https://github.com/jd-dev/ecommerce',
      tags: ['React', 'TypeScript', 'Stripe', 'Tailwind'],
      type: 'web-app' as const
    },
    {
      id: '2', 
      title: 'Portfolio Website',
      description: 'Clean, minimalist portfolio showcasing creative work with smooth animations and mobile-first design.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://portfolio-demo.com',
      tags: ['Next.js', 'Framer Motion', 'CSS Grid'],
      type: 'website' as const
    },
    {
      id: '3',
      title: 'Interactive Game Hub',
      description: 'Engaging web-based gaming platform with real-time multiplayer capabilities and immersive 3D graphics.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://game-hub-demo.com',
      codeUrl: 'https://github.com/jd-dev/game-hub',
      tags: ['Three.js', 'WebGL', 'Socket.io', 'WebRTC'],
      type: 'web-game' as const
    },
    {
      id: '4',
      title: 'Dashboard Analytics',
      description: 'Comprehensive business intelligence dashboard with real-time data visualization and advanced reporting.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://dashboard-demo.com',
      tags: ['Vue.js', 'D3.js', 'Chart.js', 'REST API'],
      type: 'web-app' as const
    },
    {
      id: '5',
      title: 'Restaurant Website',
      description: 'Beautiful restaurant website with online reservations, menu showcase, and location integration.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://restaurant-demo.com',
      tags: ['HTML5', 'SCSS', 'JavaScript', 'Google Maps'],
      type: 'website' as const
    },
    {
      id: '6',
      title: 'VR Experience',
      description: 'Immersive virtual reality web experience showcasing architectural designs with WebXR technology.',
      image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://vr-demo.com',
      codeUrl: 'https://github.com/jd-dev/vr-experience',
      tags: ['WebXR', 'A-Frame', 'Three.js', 'WebGL'],
      type: 'web-game' as const
    }
  ];

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
