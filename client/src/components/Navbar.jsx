import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, LogOut, User as UserIcon, GraduationCap, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { user, logout, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-theme bg-[var(--navbar-bg)] backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-heading group">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 shadow-md shadow-violet-500/20 transition-transform duration-300 group-hover:scale-110">
                <Shield className="h-5 w-5 text-white" />
              </span>
              <span className="text-heading">
                SecureAuth
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-heading ${
                isActive('/') ? 'text-violet-600 dark:text-violet-400 font-semibold' : 'text-muted'
              }`}
            >
              Home
            </Link>

            {user && user.role === 'Student' && (
              <Link 
                to="/student" 
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-heading ${
                  isActive('/student') ? 'text-violet-600 dark:text-violet-400 font-semibold' : 'text-muted'
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                Student Portal
              </Link>
            )}

            {user && user.role === 'Admin' && (
              <Link 
                to="/admin" 
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-heading ${
                  isActive('/admin') ? 'text-violet-600 dark:text-violet-400 font-semibold' : 'text-muted'
                }`}
              >
                <Shield className="h-4 w-4" />
                Admin Panel
              </Link>
            )}
          </div>

          {/* Right Action side: Theme toggle + Auth State */}
          <div className="flex items-center gap-4">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-theme bg-[var(--nav-button-bg)] text-heading hover:bg-[var(--nav-button-hover)] shadow-sm transition-all duration-300 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4.5 w-4.5 text-amber-400" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-slate-700" />
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                {/* User Info Capsule */}
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-theme bg-[var(--nav-profile-bg)] py-1.5 pl-3 pr-4 text-xs font-medium text-heading">
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border border-theme/30 text-white ${user.avatarColor || 'bg-violet-650 dark:bg-violet-600'}`}>
                    <UserIcon className="h-2.5 w-2.5" />
                  </span>
                  <span>{user.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                    user.role === 'Admin' 
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-450 border border-rose-500/20' 
                      : user.role === 'Student'
                      ? 'bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border border-indigo-500/20'
                      : 'bg-emerald-500/10 text-emerald-650 dark:text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {user.role}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg border border-theme bg-[var(--nav-button-bg)] px-3.5 py-1.5 text-sm font-medium text-heading hover:bg-[var(--nav-button-hover)] shadow-sm transition-all duration-300 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-muted hover:text-heading transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
