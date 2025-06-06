
import React from 'react';
import { ArrowDown, Code, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden gradient-hero flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-xl float-animation"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-primary/30 rounded-full blur-lg float-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-2xl float-animation" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-primary/40 rotate-slow"></div>
        <div className="absolute bottom-1/4 right-20 w-20 h-20 border border-primary/30 rounded-full rotate-slow" style={{ animationDelay: '10s' }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto fade-in-up">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 glass">
            <Code className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Professional Web Development</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="text-gradient-mint">JD</span>
            <br />
            <span className="text-foreground">Development</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences with cutting-edge web technologies. 
            From concept to deployment, we bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 hover-lift bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Monitor className="w-5 h-5 mr-2" />
              View Our Work
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 hover-lift border-primary/30 hover:bg-primary/5"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </Button>
          </div>

          <div className="animate-bounce">
            <ArrowDown className="w-8 h-8 text-primary mx-auto pulse-mint" />
          </div>
        </div>
      </div>

      {/* 3D floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 transform-3d">
          <div className="w-6 h-6 bg-primary/40 rounded transform rotate-45 float-animation"></div>
        </div>
        <div className="absolute top-3/4 right-1/3 transform-3d">
          <div className="w-4 h-4 bg-primary/60 rounded-full float-animation" style={{ animationDelay: '3s' }}></div>
        </div>
        <div className="absolute top-1/2 right-1/4 transform-3d">
          <div className="w-8 h-8 border-2 border-primary/50 rounded-full float-animation" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
