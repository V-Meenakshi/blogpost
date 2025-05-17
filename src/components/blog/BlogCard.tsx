import React from 'react';
import { Link } from 'react-router-dom';
import { Blog } from '../../types';
import { User, Clock } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { id, title, excerpt, coverImage, author, createdAt } = blog;
  
  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      {coverImage && (
        <Link to={`/blog/${id}`} className="block h-48 overflow-hidden">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      )}
      
      <div className="p-6">
        <Link to={`/blog/${id}`}>
          <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-indigo-600 transition-colors">
            {title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            {author.avatar ? (
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <User size={16} className="text-indigo-600" />
              </div>
            )}
            <span className="text-sm text-gray-700">{author.name}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={16} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;