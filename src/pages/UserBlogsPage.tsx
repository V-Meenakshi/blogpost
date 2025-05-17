import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBlog } from '../contexts/BlogContext';
import BlogList from '../components/blog/BlogList';
import { PenSquare } from 'lucide-react';

const UserBlogsPage: React.FC = () => {
  const { user } = useAuth();
  const { getUserBlogs } = useBlog();
  
  const userBlogs = user ? getUserBlogs(user.id) : [];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Your Blogs</h1>
        
        <Link 
          to="/create" 
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <PenSquare size={18} className="mr-2" />
          New Blog
        </Link>
      </div>
      
      {userBlogs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-medium text-gray-700 mb-4">You haven't created any blogs yet</h3>
          <p className="text-gray-500 mb-6">
            Start sharing your knowledge and insights with the world!
          </p>
          <Link 
            to="/create" 
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md transition-colors"
          >
            <PenSquare size={18} className="mr-2" />
            Create Your First Blog
          </Link>
        </div>
      ) : (
        <BlogList blogs={userBlogs} />
      )}
    </div>
  );
};

export default UserBlogsPage;