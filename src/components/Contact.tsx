
import React, { useState } from 'react';
import { Mail, Phone, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useData } from '@/contexts/DataContext';

const Contact = () => {
  const { contactInfo } = useData();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectType: 'Web Application',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = `New Project Inquiry - ${formData.projectType}`;
    const body = `
New project inquiry from ${formData.firstName} ${formData.lastName}

Email: ${formData.email}
Project Type: ${formData.projectType}

Message:
${formData.message}
    `.trim();

    const mailtoLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      projectType: 'Web Application',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-t from-primary/5 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's <span className="text-gradient-mint">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your vision to life? Contact us today and let's create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 fade-in-up">
            <div className="glass rounded-2xl p-8 border border-primary/10 hover-lift">
              <h3 className="text-2xl font-bold mb-6 text-gradient-mint">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email us</p>
                    <p className="text-muted-foreground">{contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Call us</p>
                    <p className="text-muted-foreground">{contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Development Services</p>
                    <p className="text-muted-foreground">Web Apps • Websites • Games</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating 3D elements */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full float-animation"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-primary/30 rotate-slow"></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-primary/10 hover-lift space-y-6">
              <h3 className="text-2xl font-bold mb-6">Start Your Project</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <Input 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="John" 
                    className="border-primary/20 focus:border-primary" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Doe" 
                    className="border-primary/20 focus:border-primary" 
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com" 
                  className="border-primary/20 focus:border-primary" 
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Type</label>
                <select 
                  value={formData.projectType}
                  onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                  className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:border-primary focus:outline-none bg-background"
                >
                  <option>Web Application</option>
                  <option>Business Website</option>
                  <option>E-commerce Store</option>
                  <option>Web Game</option>
                  <option>Hosting & Maintenance</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Description</label>
                <Textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your project, goals, and requirements..."
                  rows={4}
                  className="border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
