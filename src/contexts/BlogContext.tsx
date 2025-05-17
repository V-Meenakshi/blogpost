import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Blog, User } from '../types';
import { mockBlogs as initialBlogs } from '../data/mockData';

interface BlogContextType {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  createBlog: (blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'author'>) => void;
  updateBlog: (id: string, blog: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;
  getBlogById: (id: string) => Blog | undefined;
  getUserBlogs: (userId: string) => Blog[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load blogs from localStorage if available, otherwise use mock data
  const storedBlogs = localStorage.getItem('blogs');
  const [blogs, setBlogs] = useState<Blog[]>(
    storedBlogs ? JSON.parse(storedBlogs) : initialBlogs
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Store blogs in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  const createBlog = (blogData: Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'author'>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get current user from localStorage
      const storedUser = localStorage.getItem('blogUser');
      if (!storedUser) {
        throw new Error('User must be logged in to create a blog');
      }
      
      const user = JSON.parse(storedUser) as User;
      const now = new Date().toISOString();
      
      const newBlog: Blog = {
        ...blogData,
        id: `${blogs.length + 1}`,
        author: user,
        createdAt: now,
        updatedAt: now,
      };
      
      setBlogs(prevBlogs => [newBlog, ...prevBlogs]);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
      throw err;
    }
  };

  const updateBlog = (id: string, blogData: Partial<Blog>) => {
    setLoading(true);
    setError(null);
    
    try {
      const now = new Date().toISOString();
      
      setBlogs(prevBlogs => 
        prevBlogs.map(blog => 
          blog.id === id 
            ? { ...blog, ...blogData, updatedAt: now } 
            : blog
        )
      );
      
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
      throw err;
    }
  };

  const deleteBlog = (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
      throw err;
    }
  };

  const getBlogById = (id: string) => {
    return blogs.find(blog => blog.id === id);
  };

  const getUserBlogs = (userId: string) => {
    return blogs.filter(blog => blog.author.id === userId);
  };

  return (
    <BlogContext.Provider 
      value={{ 
        blogs, 
        loading, 
        error, 
        createBlog, 
        updateBlog, 
        deleteBlog, 
        getBlogById,
        getUserBlogs
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};