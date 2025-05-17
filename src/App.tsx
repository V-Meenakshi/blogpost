import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BlogProvider } from './contexts/BlogContext';
import ProtectedRoute from './components/utils/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CreateBlogPage from './pages/CreateBlogPage';
import EditBlogPage from './pages/EditBlogPage';
import UserBlogsPage from './pages/UserBlogsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/create" 
                  element={
                    <ProtectedRoute>
                      <CreateBlogPage />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/edit/:id" 
                  element={
                    <ProtectedRoute>
                      <EditBlogPage />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/my-blogs" 
                  element={
                    <ProtectedRoute>
                      <UserBlogsPage />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;