import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const AuthContext = createContext(null);

// Configure axios default base URL and withCredentials for cookie handling
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';
axios.defaults.withCredentials = true;

// Toast Container Component
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let borderClass = 'border-l-indigo-500';
        let textClass = 'text-indigo-650 dark:text-indigo-400';
        
        if (toast.type === 'success') {
          Icon = CheckCircle;
          borderClass = 'border-l-emerald-500';
          textClass = 'text-emerald-650 dark:text-emerald-400';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-l-rose-500';
          textClass = 'text-rose-600 dark:text-rose-400';
        }

        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 rounded-lg border border-theme border-l-4 ${borderClass} glass p-4 shadow-xl animate-toast-in w-full relative group overflow-hidden pointer-events-auto`}
          >
            <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${textClass}`} />
            <div className="text-sm font-medium pr-6 text-heading">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="absolute top-2 right-2 text-slate-400 hover:text-heading opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'; // Default to light mode
  });
  const [toasts, setToasts] = useState([]);
  
  // Shared Courses state initialized with default values
  const [courses, setCourses] = useState(() => {
    const stored = localStorage.getItem('courses');
    return stored ? JSON.parse(stored) : [
      { code: 'CS-301', title: 'Database Management Systems', progress: 85, grade: 'A', credits: 3, department: 'Computer Science' },
      { code: 'CS-302', title: 'Operating Systems & Architecture', progress: 68, grade: 'B+', credits: 4, department: 'Computer Science' },
      { code: 'CS-305', title: 'Web Application Development', progress: 92, grade: 'A+', credits: 3, department: 'Software Engineering' },
      { code: 'CS-310', title: 'Introduction to Cybersecurity', progress: 45, grade: 'C', credits: 3, department: 'Security' }
    ];
  });

  // Sync theme class with HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync courses with localStorage
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync state with localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addCourse = (newCourse) => {
    setCourses((prev) => [...prev, newCourse]);
    showToast(`Course ${newCourse.code} created successfully!`, 'success');
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });
      const { data } = response;
      
      if (data.success) {
        const loggedUser = data.user;
        const userToken = data.token;

        setUser(loggedUser);
        setToken(userToken);

        localStorage.setItem('user', JSON.stringify(loggedUser));
        localStorage.setItem('token', userToken);

        showToast(data.message || 'Logged in successfully.', 'success');
        return { success: true, message: data.message || 'Logged in successfully.' };
      }
      showToast(data.message || 'Login failed.', 'error');
      return { success: false, message: data.message || 'Login failed.' };
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Something went wrong during login.';
      showToast(message, 'error');
      return { success: false, message };
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const response = await axios.post('/signup', { name, email, password, role });
      const { data } = response;

      if (data.success) {
        showToast(data.message || 'Registration successful!', 'success');
        return { success: true, message: data.message || 'Registration successful!' };
      }
      showToast(data.message || 'Registration failed.', 'error');
      return { success: false, message: data.message || 'Registration failed.' };
    } catch (error) {
      console.error('Signup error:', error);
      const message = error.response?.data?.message || 'Something went wrong during registration.';
      showToast(message, 'error');
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    showToast('Logged out successfully.', 'success');
  };

  const getProtectedData = async (route) => {
    try {
      const response = await axios.get(`/${route}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error(`Error fetching protected ${route} data:`, error);
      const message = error.response?.data?.message || `Failed to fetch data from ${route}.`;
      showToast(message, 'error');
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, getProtectedData, theme, toggleTheme, showToast, courses, addCourse }}>
      {!loading && children}
      <ToastContainer toasts={toasts} removeToast={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
