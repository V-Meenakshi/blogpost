import React, { useState } from 'react';
import { Blog } from '../../types';
import { AlertCircle } from 'lucide-react';

interface BlogFormProps {
  initialData?: Partial<Blog>;
  onSubmit: (data: {
    title: string;
    content: string;
    excerpt: string;
    coverImage?: string;
  }) => void;
  isSubmitting: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({ 
  initialData = {}, 
  onSubmit, 
  isSubmitting 
}) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [excerpt, setExcerpt] = useState(initialData.excerpt || '');
  const [coverImage, setCoverImage] = useState(initialData.coverImage || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (excerpt.length > 200) {
      newErrors.excerpt = 'Excerpt must be less than 200 characters';
    }
    
    if (coverImage && !isValidUrl(coverImage)) {
      newErrors.coverImage = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        title,
        content,
        excerpt,
        coverImage: coverImage || undefined,
      });
    }
  };
  
  // Generate automatic excerpt from content if both are provided
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    // If excerpt is empty or was auto-generated, update it
    if (!excerpt.trim() || excerpt === content.substring(0, 150).trim() + '...') {
      if (newContent.length > 150) {
        setExcerpt(newContent.substring(0, 150).trim() + '...');
      } else {
        setExcerpt(newContent);
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your blog title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
          Cover Image URL
        </label>
        <input
          id="coverImage"
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.coverImage ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="https://example.com/image.jpg"
        />
        {errors.coverImage && (
          <p className="mt-1 text-sm text-red-600">{errors.coverImage}</p>
        )}
        {coverImage && !errors.coverImage && (
          <div className="mt-2 h-32 overflow-hidden rounded-md">
            <img 
              src={coverImage} 
              alt="Cover preview" 
              className="w-full h-full object-cover"
              onError={() => setErrors(prev => ({ ...prev, coverImage: 'Unable to load image' }))}
            />
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
          Excerpt <span className="text-red-500">*</span>
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.excerpt ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="A brief summary of your blog (max 200 characters)"
          rows={3}
        />
        <div className="flex justify-between mt-1">
          {errors.excerpt ? (
            <p className="text-sm text-red-600">{errors.excerpt}</p>
          ) : (
            <p className="text-sm text-gray-500">
              Brief summary of your blog post that will appear in the listing
            </p>
          )}
          <p className={`text-sm ${excerpt.length > 200 ? 'text-red-600' : 'text-gray-500'}`}>
            {excerpt.length}/200
          </p>
        </div>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content <span className="text-red-500">*</span>
        </label>
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 border-b">
            Supports Markdown format
          </div>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            className={`w-full px-3 py-2 border-0 focus:outline-none focus:ring-0 ${
              errors.content ? 'bg-red-50' : ''
            }`}
            placeholder="Write your blog content here... (Markdown supported)"
            rows={15}
          />
        </div>
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content}</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 bg-indigo-600 text-white rounded-md ${
            isSubmitting 
              ? 'opacity-70 cursor-not-allowed' 
              : 'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          }`}
        >
          {isSubmitting ? 'Saving...' : initialData.id ? 'Update Blog' : 'Publish Blog'}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;