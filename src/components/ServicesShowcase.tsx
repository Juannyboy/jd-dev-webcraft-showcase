
import React from 'react';
import { Code, Globe, Gamepad2, Monitor, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesShowcase = () => {
  const services = [
    {
      icon: Code,
      title: "Web Applications",
      description: "Full-stack web applications with modern frameworks and cloud deployment",
      features: ["React & TypeScript", "Node.js Backend", "Database Integration", "Cloud Hosting"],
      link: "/web-applications",
      gradient: "from-mint-500 to-mint-700"
    },
    {
      icon: Globe,
      title: "Website Creation",
      description: "Professional websites that convert visitors into customers",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "CMS Integration"],
      link: "/website-creation", 
      gradient: "from-mint-400 to-mint-600"
    },
    {
      icon: Gamepad2,
      title: "Web Games",
      description: "Interactive gaming experiences that engage and entertain users",
      features: ["HTML5 Games", "Mobile Friendly", "Leaderboards", "Social Features"],
      link: "/web-games",
      gradient: "from-mint-600 to-mint-800"
    },
    {
      icon: Monitor,
      title: "Software Development",
      description: "Desktop and mobile applications for business automation",
      features: ["Cross-Platform", "Database Integration", "User Management", "API Development"],
      link: "/software-development",
      gradient: "from-mint-700 to-mint-900"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our <span className="text-gradient-mint">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions to transform your business and engage your audience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.link}
              className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
