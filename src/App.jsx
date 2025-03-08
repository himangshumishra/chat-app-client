import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { ChatProvider } from './context/ChatContext';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Signup';
import ChatContainer from './components/ChatContainer';
import Profile from './pages/Profile';
import './App.css';

// Protected route component - requires authentication
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Public route component - redirects authenticated users to chat
const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
      </div>
    );
  }
  
  if (currentUser) {
    return <Navigate to="/chat" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <ChatProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes - redirect to chat if authenticated */}
              <Route path="/" element={
                <PublicRoute>
                  <HomePage />
                </PublicRoute>
              } />
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              
              {/* Protected routes - require authentication */}
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <ChatContainer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </ChatProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;