import React from 'react';
import { useBlog } from '../contexts/BlogContext';
import BlogList from '../components/blog/BlogList';
import { BookOpen } from 'lucide-react';

const HomePage: React.FC = () => {
  const { blogs, loading } = useBlog();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-8 mb-12 text-white shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to BlogSpace
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-6">
            Discover insightful articles on technology, design, and programming
          </p>
          <div className="flex justify-center">
            <a 
              href="#blogs" 
              className="flex items-center bg-white text-indigo-700 font-medium px-6 py-3 rounded-md hover:bg-indigo-50 transition-colors"
            >
              <BookOpen size={20} className="mr-2" />
              Start Reading
            </a>
          </div>
        </div>
      </div>
      
      <div id="blogs" className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Articles</h2>
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
};

export default HomePage;