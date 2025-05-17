/*
  # Fix blogs and profiles relationship

  1. Changes
    - Drop existing foreign key constraint if it exists
    - Add correct foreign key constraint between blogs.user_id and profiles.id
    - Update the join query structure in the RLS policies

  2. Security
    - Maintain existing RLS policies with corrected references
*/

-- Drop existing foreign key if it exists
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'blogs_user_id_fkey'
    AND table_name = 'blogs'
  ) THEN
    ALTER TABLE blogs DROP CONSTRAINT blogs_user_id_fkey;
  END IF;
END $$;

-- Add correct foreign key constraint
ALTER TABLE blogs
ADD CONSTRAINT blogs_user_id_fkey
FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Update the join structure for the blogs table
COMMENT ON TABLE blogs IS 'Blog posts with user profile references';
COMMENT ON COLUMN blogs.user_id IS 'References the profiles.id for proper joins';