import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { useAuth } from '../contexts/AuthContext';
import BlogForm from '../components/blog/BlogForm';
import { AlertCircle } from 'lucide-react';

const EditBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBlogById, updateBlog } = useBlog();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [blog, setBlog] = useState(id ? getBlogById(id) : undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (id) {
      const blogData = getBlogById(id);
      setBlog(blogData);
      
      if (!blogData) {
        // Blog not found, redirect to home
        navigate('/');
        return;
      }
      
      // Check if the current user is the author
      if (user && blogData && user.id !== blogData.author.id) {
        setError('You do not have permission to edit this blog');
      }
    }
  }, [id, getBlogById, navigate, user]);
  
  const handleSubmit = async (blogData: {
    title: string;
    content: string;
    excerpt: string;
    coverImage?: string;
  }) => {
    if (!id || !blog) return;
    
    setIsSubmitting(true);
    
    try {
      updateBlog(id, blogData);
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error('Failed to update blog:', error);
      setIsSubmitting(false);
    }
  };
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle size={20} className="text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Blog</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <BlogForm 
          initialData={blog} 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
};

export default EditBlogPage;