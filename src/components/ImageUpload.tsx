
import React, { useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  currentImage, 
  onImageChange, 
  className = "" 
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    
    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('project-images')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(data.path);

      setPreviewImage(publicUrl);
      onImageChange(publicUrl);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    onImageChange('');
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium mb-1">Project Image</label>
      
      {previewImage ? (
        <div className="relative">
          <img 
            src={previewImage} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="text-sm text-gray-600 mb-4">
            Upload a project image (PNG, JPG, GIF up to 5MB)
          </div>
          <label htmlFor="image-upload" className="cursor-pointer">
            <Button type="button" disabled={uploading} asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Choose Image'}
              </span>
            </Button>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
