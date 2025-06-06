
import React, { useState, useRef } from 'react';
import { Globe, Code, Gamepad2, Server } from 'lucide-react';

const ServicesShowcase = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: 'Website Creation',
      description: 'Custom websites that captivate and convert visitors into customers.',
      icon: Globe,
      color: 'mint-400',
      gradient: 'from-mint-400 to-mint-600'
    },
    {
      title: 'Web Applications',
      description: 'Powerful web apps that streamline your business operations.',
      icon: Code,
      color: 'mint-500',
      gradient: 'from-mint-500 to-mint-700'
    },
    {
      title: 'Web Based Games',
      description: 'Immersive gaming experiences that engage and entertain.',
      icon: Gamepad2,
      color: 'mint-600',
      gradient: 'from-mint-600 to-mint-800'
    },
    {
      title: 'Hosting & Maintenance',
      description: 'Reliable hosting and ongoing support to keep you running smoothly.',
      icon: Server,
      color: 'mint-300',
      gradient: 'from-mint-300 to-mint-500'
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient-mint">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive web development solutions tailored to bring your digital vision to life.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative max-w-6xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {/* 3D Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeService === index;
              
              return (
                <div
                  key={index}
                  className={`relative group cursor-pointer transition-all duration-500 transform-3d ${
                    isActive ? 'scale-105 z-10' : 'hover:scale-102'
                  }`}
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                  style={{
                    transform: isActive 
                      ? 'rotateX(5deg) rotateY(5deg) translateZ(20px)' 
                      : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  {/* 3D Card */}
                  <div className={`
                    relative glass rounded-2xl p-8 border border-primary/20 
                    transition-all duration-500 hover-lift
                    ${isActive ? 'border-primary/40 shadow-2xl' : ''}
                  `}>
                    {/* Floating Icon */}
                    <div className={`
                      relative mb-6 w-20 h-20 mx-auto
                      transition-all duration-500
                      ${isActive ? 'transform scale-110 rotate-12' : 'transform scale-100 rotate-0'}
                    `}>
                      <div className={`
                        w-full h-full rounded-2xl bg-gradient-to-br ${service.gradient}
                        flex items-center justify-center
                        shadow-lg transition-all duration-500
                        ${isActive ? 'shadow-primary/30' : 'shadow-primary/10'}
                      `}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      
                      {/* Floating particles */}
                      {isActive && (
                        <>
                          <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary/60 rounded-full animate-bounce" 
                               style={{ animationDelay: '0.1s' }} />
                          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-primary/40 rounded-full animate-bounce" 
                               style={{ animationDelay: '0.3s' }} />
                          <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" 
                               style={{ animationDelay: '0.5s' }} />
                        </>
                      )}
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className={`
                        text-2xl font-bold mb-4 transition-colors duration-300
                        ${isActive ? 'text-primary' : 'text-card-foreground'}
                      `}>
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Interactive glow effect */}
                    <div className={`
                      absolute inset-0 rounded-2xl transition-opacity duration-500
                      bg-gradient-to-br ${service.gradient} opacity-0
                      ${isActive ? 'opacity-5' : 'group-hover:opacity-3'}
                    `} />

                    {/* 3D depth indicators */}
                    <div className={`
                      absolute -bottom-1 -right-1 w-full h-full rounded-2xl 
                      bg-gradient-to-br ${service.gradient} opacity-10 -z-10
                      transition-all duration-500
                      ${isActive ? 'transform translate-x-2 translate-y-2' : 'transform translate-x-1 translate-y-1'}
                    `} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Background 3D elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl float-animation" />
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/10 rounded-full blur-lg float-animation" 
                 style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/3 right-1/4 w-6 h-6 border border-primary/30 rotate-slow" />
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-primary/10 rounded-2xl border border-primary/20 glass">
            <div className="w-3 h-3 bg-primary rounded-full pulse-mint"></div>
            <span className="text-primary font-medium">Ready to start your project?</span>
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

export default ServicesShowcase;
