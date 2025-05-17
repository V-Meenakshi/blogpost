import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PenSquare, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
          BlogSpace
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/"
            className={`font-medium ${location.pathname === '/' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'} transition-colors`}
          >
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/create"
                className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <PenSquare size={18} />
                <span>New Post</span>
              </Link>
              
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User size={18} className="text-indigo-600" />
                    </div>
                  )}
                  <span className="text-gray-700">{user?.name}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                  >
                    Your Profile
                  </Link>
                  <Link 
                    to="/my-blogs" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                  >
                    Your Blogs
                  </Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden bg-white ${isMenuOpen ? 'max-h-screen py-4' : 'max-h-0 py-0'} overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <Link 
            to="/"
            className={`font-medium px-4 py-2 rounded-md ${location.pathname === '/' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/create"
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md"
                onClick={closeMenu}
              >
                <PenSquare size={18} />
                <span>New Post</span>
              </Link>
              <Link 
                to="/profile"
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                onClick={closeMenu}
              >
                Your Profile
              </Link>
              <Link 
                to="/my-blogs"
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                onClick={closeMenu}
              >
                Your Blogs
              </Link>
              <button 
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-md"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                onClick={closeMenu}
              >
                Sign In
              </Link>
              <Link 
                to="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;