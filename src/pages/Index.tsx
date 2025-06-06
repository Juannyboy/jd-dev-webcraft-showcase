
import Hero from '@/components/Hero';
import ServicesShowcase from '@/components/ServicesShowcase';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesShowcase />
      <ProjectsShowcase />
      <Contact />
    </div>
  );
};

export default Index;
