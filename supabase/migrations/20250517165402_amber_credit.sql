/*
  # Add sample content

  1. New Content
    - Creates an admin profile
    - Adds sample blog posts with professional content
  
  2. Changes
    - Inserts initial data into profiles and blogs tables
*/

-- Create admin profile
INSERT INTO profiles (id, username, created_at)
VALUES (
  'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  'admin',
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Add sample blog posts
INSERT INTO blogs (title, content, user_id, created_at, updated_at)
VALUES
  (
    'Getting Started with Modern Web Development',
    E'<h2>The Evolution of Web Development</h2>\n\nThe landscape of web development has transformed dramatically over the past decade. With the advent of powerful frameworks, cloud computing, and sophisticated development tools, building web applications has become both more capable and more complex.\n\n<h3>Key Modern Development Practices</h3>\n\n<ul>\n<li>Component-based architecture</li>\n<li>State management solutions</li>\n<li>Server-side rendering</li>\n<li>Progressive Web Apps (PWAs)</li>\n</ul>\n\n<p>Understanding these fundamentals is crucial for any developer looking to build modern web applications.</p>',
    'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    NOW() - INTERVAL '3 days',
    NOW() - INTERVAL '3 days'
  ),
  (
    'Best Practices for Secure Authentication',
    E'<h2>Security in Modern Applications</h2>\n\nImplementing secure authentication is fundamental to protecting user data and maintaining application integrity. This post explores essential security practices every developer should know.\n\n<h3>Key Security Considerations</h3>\n\n<ul>\n<li>Password hashing and salting</li>\n<li>JWT token management</li>\n<li>Multi-factor authentication</li>\n<li>Session handling</li>\n</ul>\n\n<p>Following these practices helps ensure your application remains secure and trustworthy.</p>',
    'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '2 days'
  ),
  (
    'Optimizing Application Performance',
    E'<h2>Performance Matters</h2>\n\nIn today''s fast-paced digital world, application performance can make or break user experience. Let''s explore key strategies for optimizing your web applications.\n\n<h3>Performance Optimization Techniques</h3>\n\n<ul>\n<li>Code splitting and lazy loading</li>\n<li>Caching strategies</li>\n<li>Image optimization</li>\n<li>Database query optimization</li>\n</ul>\n\n<p>Implementing these techniques can significantly improve your application''s performance and user satisfaction.</p>',
    'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '1 day'
  );