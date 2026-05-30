import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';

const Login = () => {
  const { login, showToast } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      showToast('Please fill in all details.', 'error');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address.', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const res = await login(formData.email, formData.password);
    
    if (res.success) {
      setTimeout(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const userObj = JSON.parse(userStr);
          if (userObj.role === 'Admin') {
            navigate('/admin');
          } else if (userObj.role === 'Student') {
            navigate('/student');
          } else {
            navigate('/');
          }
        } else {
          navigate('/');
        }
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Decorative Glow Nodes */}
      <div className="absolute top-1/4 left-1/3 h-52 w-52 rounded-full bg-violet-600/5 blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/4 right-1/3 h-60 w-60 rounded-full bg-indigo-600/5 blur-3xl pointer-events-none animate-float-reverse"></div>

      <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl glass p-8 shadow-2xl animate-slide-up pt-14">
        
        {/* Back Button */}
        <Link 
          to="/" 
          className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-lg border border-theme bg-[var(--nav-button-bg)] text-heading hover:bg-[var(--nav-button-hover)] shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer z-20"
          title="Back to Home"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-heading">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-muted">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          <div className="space-y-4">
            
            {/* Email Field */}
            <div className="transition-all duration-300 focus-within:translate-x-1">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full rounded-lg border border-theme bg-[var(--input-bg)] py-2.5 pl-10 pr-4 text-sm text-heading placeholder-slate-500 outline-none focus:border-violet-500/80 focus:bg-[var(--nav-button-bg)] focus:ring-1 focus:ring-violet-500/80 transition-all duration-300 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="transition-all duration-300 focus-within:translate-x-1">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full rounded-lg border border-theme bg-[var(--input-bg)] py-2.5 pl-10 pr-10 text-sm text-heading placeholder-slate-500 outline-none focus:border-violet-500/80 focus:bg-[var(--nav-button-bg)] focus:ring-1 focus:ring-violet-500/80 transition-all duration-300 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-350 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] hover:shadow-violet-600/35 active:scale-[0.98] outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;
