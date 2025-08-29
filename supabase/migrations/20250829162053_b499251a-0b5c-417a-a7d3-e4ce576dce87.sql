-- Update the projects category check constraint to include 'software'
ALTER TABLE projects 
DROP CONSTRAINT IF EXISTS projects_category_check;

ALTER TABLE projects 
ADD CONSTRAINT projects_category_check 
CHECK (category IN ('web-app', 'website', 'web-game', 'software'));