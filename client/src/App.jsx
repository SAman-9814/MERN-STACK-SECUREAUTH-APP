import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AlertCircle, RefreshCw } from 'lucide-react';

// Ambient Background Mouse Tracker Component
const MouseOrbTracker = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300">
      <div 
        className="absolute h-[350px] w-[350px] rounded-full bg-violet-600/3 dark:bg-violet-600/4 blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          left: 'var(--mouse-x, -500px)',
          top: 'var(--mouse-y, -500px)',
          transition: 'left 0.15s cubic-bezier(0.1, 0.8, 0.2, 1), top 0.15s cubic-bezier(0.1, 0.8, 0.2, 1)'
        }}
      />
    </div>
  );
};

const AppContent = () => {
  const { isDbConnected, checkDbConnection } = useAuth();
  const [retrying, setRetrying] = useState(false);

  const handleRetry = async () => {
    setRetrying(true);
    await checkDbConnection();
    setTimeout(() => setRetrying(false), 800);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[var(--body-bg)]">
      {/* Cursor Interactive Orb */}
      <MouseOrbTracker />

      {/* Global Header */}
      <Navbar />

      {/* Database Connection Warning Banner */}
      {!isDbConnected && (
        <div className="relative z-40 bg-amber-500/10 dark:bg-amber-500/5 border-b border-amber-500/20 py-2.5 px-4 text-center glass animate-fade-in">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-medium">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-500 animate-pulse" />
              Database Disconnected: Backend server is unable to reach MongoDB. Authentication and dashboard functionality may not work.
            </span>
            <button 
              onClick={handleRetry}
              disabled={retrying}
              className="flex items-center gap-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-500 disabled:bg-amber-700 text-white py-1 px-3 rounded shadow transition-all duration-300 active:scale-95 cursor-pointer disabled:pointer-events-none"
            >
              <RefreshCw className={`h-3 w-3 ${retrying ? 'animate-spin' : ''}`} />
              {retrying ? 'Connecting...' : 'Retry Connection'}
            </button>
          </div>
        </div>
      )}

      {/* Main Routing Content */}
      <main className="flex-grow relative z-10">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Student Portal */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Console */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback Redirection */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
