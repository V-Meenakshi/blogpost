/*
  # Fix Foreign Key Relationship

  1. Changes
    - Add foreign key constraint between blogs.user_id and profiles.id
    - This enables proper joins between blogs and profiles tables
    
  2. Security
    - No changes to existing RLS policies
    - Maintains existing security model
*/

-- Add foreign key constraint between blogs and profiles
ALTER TABLE blogs DROP CONSTRAINT IF EXISTS blogs_user_id_fkey;
ALTER TABLE blogs ADD CONSTRAINT blogs_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES profiles(id) 
  ON DELETE CASCADE;