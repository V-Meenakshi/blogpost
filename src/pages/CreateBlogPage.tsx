import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import BlogForm from '../components/blog/BlogForm';

const CreateBlogPage: React.FC = () => {
  const { createBlog } = useBlog();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (blogData: {
    title: string;
    content: string;
    excerpt: string;
    coverImage?: string;
  }) => {
    setIsSubmitting(true);
    
    try {
      createBlog(blogData);
      navigate('/');
    } catch (error) {
      console.error('Failed to create blog:', error);
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Blog</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <BlogForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default CreateBlogPage;