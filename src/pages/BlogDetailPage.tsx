import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Clock, Calendar, Edit, Trash2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBlogById, deleteBlog } = useBlog();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [blog, setBlog] = useState(id ? getBlogById(id) : undefined);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const isAuthor = user && blog && user.id === blog.author.id;
  
  useEffect(() => {
    if (id) {
      const blogData = getBlogById(id);
      setBlog(blogData);
      
      if (!blogData) {
        // Blog not found, redirect to home
        navigate('/');
      }
    }
  }, [id, getBlogById, navigate]);
  
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-4">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Blog Not Found</h2>
          <p className="text-gray-600 mb-4">The blog you're looking for doesn't exist or has been removed</p>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      deleteBlog(blog.id);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete blog:', error);
      setIsDeleting(false);
    }
  };
  
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to all blogs</span>
          </Link>
        </div>
        
        {blog.coverImage && (
          <div className="mb-8 rounded-xl overflow-hidden h-64 md:h-80 lg:h-96 shadow-md">
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-8">
            <div className="flex items-center">
              {blog.author.avatar ? (
                <img 
                  src={blog.author.avatar} 
                  alt={blog.author.name} 
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                  <span className="text-indigo-600 font-medium">
                    {blog.author.name.charAt(0)}
                  </span>
                </div>
              )}
              <span>{blog.author.name}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>Published {formatDate(blog.createdAt)}</span>
            </div>
            
            {blog.updatedAt !== blog.createdAt && (
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>Updated {formatDate(blog.updatedAt)}</span>
              </div>
            )}
          </div>
          
          {isAuthor && (
            <div className="flex space-x-4 mb-6">
              <Link
                to={`/edit/${blog.id}`}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <Edit size={16} className="mr-1" />
                <span>Edit</span>
              </Link>
              
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
              >
                <Trash2 size={16} className="mr-1" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>
            {blog.content}
          </ReactMarkdown>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Delete Blog?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this blog? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-70"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetailPage;