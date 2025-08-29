
import React, { useState } from 'react';
import { Plus, Edit, Trash, Save, X, ExternalLink, Settings, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/contexts/DataContext';
import { Project } from '@/hooks/useProjects';
import ImageUpload from './ImageUpload';
import ContactSubmissions from './ContactSubmissions';

const AdminPortal = () => {
  const { projects, contactInfo, addProject, updateProject, deleteProject, updateContactInfo } = useData();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showContactEdit, setShowContactEdit] = useState(false);
  const [contactFormData, setContactFormData] = useState(contactInfo);

  const emptyProject: Omit<Project, 'id' | 'created_at' | 'updated_at'> = {
    title: '',
    description: '',
    image: '',
    live_url: '',
    github_url: '',
    technologies: [],
    category: 'web-app',
    featured: false
  };

  const handleSave = async (project: Project | typeof emptyProject) => {
    try {
      if (isCreating) {
        await addProject(project as Omit<Project, 'id' | 'created_at' | 'updated_at'>);
        setIsCreating(false);
      } else {
        await updateProject(project as Project);
        setEditingProject(null);
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleContactSave = async () => {
    try {
      await updateContactInfo(contactFormData);
      setShowContactEdit(false);
    } catch (error) {
      console.error('Error updating contact info:', error);
    }
  };

  const ProjectForm = ({ project, onSave, onCancel }: { 
    project: Project | typeof emptyProject, 
    onSave: (project: Project | typeof emptyProject) => void, 
    onCancel: () => void 
  }) => {
    const [formData, setFormData] = useState(project);
    const [tagsInput, setTagsInput] = useState(project.technologies.join(', '));

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validate that image is uploaded
      if (!formData.image) {
        alert('Please upload an image for the project');
        return;
      }
      
      const updatedProject = {
        ...formData,
        technologies: tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      onSave(updatedProject);
    };

    const handleImageChange = (imageUrl: string) => {
      setFormData({ ...formData, image: imageUrl });
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-card rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">
            {isCreating ? 'Add New Project' : 'Edit Project'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <ImageUpload
              currentImage={formData.image}
              onImageChange={handleImageChange}
            />

            <div>
              <label className="block text-sm font-medium mb-1">Live URL (optional)</label>
              <Input
                value={formData.live_url || ''}
                onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">GitHub URL (optional)</label>
              <Input
                value={formData.github_url || ''}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Project Type</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Project['category'] })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="web-app">Web Application</option>
                <option value="website">Website</option>
                <option value="web-game">Web Game</option>
                <option value="software">Software Application</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Technologies (comma separated)</label>
              <Input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="React, TypeScript, Tailwind"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient-mint">JD Development Admin</h1>
            <p className="text-muted-foreground">Manage your portfolio projects and contact information</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setShowContactEdit(true)}
              className="border-primary/30 hover:bg-primary/5"
            >
              <Settings className="w-4 h-4 mr-2" />
              Contact Info
            </Button>
            <Button 
              onClick={() => {
                setEditingProject(emptyProject as any);
                setIsCreating(true);
              }}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="submissions">
              <Mail className="w-4 h-4 mr-2" />
              Contact Submissions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-card rounded-lg overflow-hidden border">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {project.live_url && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => window.open(project.live_url, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setEditingProject(project)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="submissions">
            <ContactSubmissions />
          </TabsContent>
        </Tabs>

        {/* Contact Edit Modal */}
        {showContactEdit && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Edit Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                    type="email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input
                    value={contactFormData.phone}
                    onChange={(e) => setContactFormData({ ...contactFormData, phone: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Input
                    value={contactFormData.address}
                    onChange={(e) => setContactFormData({ ...contactFormData, address: e.target.value })}
                    required
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleContactSave} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setShowContactEdit(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {(editingProject || isCreating) && (
          <ProjectForm
            project={editingProject || emptyProject}
            onSave={handleSave}
            onCancel={() => {
              setEditingProject(null);
              setIsCreating(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPortal;
