import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Award, Clock, CheckCircle2, ShieldAlert, Wifi, WifiOff } from 'lucide-react';
import { SkeletonCard } from '../components/Skeleton';

// SVG Circular Progress Ring Component
const CircularProgress = ({ value, label }) => {
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-theme bg-slate-900/5 dark:bg-slate-900/30 w-full transition-all duration-300 hover:border-violet-500/20 hover:scale-[1.01]">
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="var(--border-color)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="url(#ringGradient)"
            className="transition-all duration-1000 ease-out"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute text-sm font-bold text-heading">{value}%</span>
      </div>
      <span className="text-[10px] text-muted tracking-wider uppercase font-bold mt-3 text-center truncate w-full" title={label}>{label}</span>
    </div>
  );
};

// SVG GPA line chart
const GPAChart = () => {
  return (
    <div className="rounded-xl border border-theme bg-slate-900/5 dark:bg-slate-900/30 p-5 mt-8 transition-all hover:border-indigo-500/20">
      <h3 className="text-sm font-bold text-heading mb-6 tracking-wide">Academic GPA Progression</h3>
      <div className="relative h-44 w-full flex items-end">
        {/* Horizontal Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[4.0, 3.0, 2.0, 1.0].map((level) => (
            <div key={level} className="w-full border-t border-theme/20 text-[9px] text-muted pt-1 flex justify-between">
              <span>{level.toFixed(1)}</span>
            </div>
          ))}
        </div>
        
        {/* Line graph elements */}
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 560 160" preserveAspectRatio="none">
          {/* Glowing Area Fill */}
          <path
            d="M 40 120 C 150 90 280 60 520 20 L 520 160 L 40 160 Z"
            fill="url(#areaGradient)"
            className="opacity-30 transition-all duration-1000"
          />
          
          {/* Main Line */}
          <path
            d="M 40 120 C 150 90 280 60 520 20"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3.5"
            className="transition-all duration-1000"
          />

          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Dots */}
          {[
            { x: 40, y: 120, val: 3.20, label: 'Semester 1' },
            { x: 200, y: 92, val: 3.55, label: 'Semester 2' },
            { x: 360, y: 64, val: 3.78, label: 'Semester 3' },
            { x: 520, y: 20, val: 3.92, label: 'Semester 4' }
          ].map((pt, idx) => (
            <g key={idx} className="group/dot cursor-pointer">
              {/* Pulse effect */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="8"
                className="fill-violet-500/30 opacity-0 group-hover/dot:opacity-100 transition-opacity"
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                className="fill-violet-600 dark:fill-violet-400 stroke-white dark:stroke-slate-950 stroke-2 transition-all"
              />
              <text
                x={pt.x}
                y={pt.y - 12}
                textAnchor="middle"
                className="text-[10px] font-bold fill-slate-800 dark:fill-white drop-shadow"
              >
                {pt.val}
              </text>
              <text
                x={pt.x}
                y={155}
                textAnchor="middle"
                className="text-[9px] font-bold fill-slate-500"
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const { user, getProtectedData, courses } = useAuth();
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPortalData = async () => {
      setLoading(true);
      setError('');
      const res = await getProtectedData('student');
      
      if (res.success) {
        setApiResponse(res.data);
      } else {
        setError(res.message);
      }
      setLoading(false);
    };

    fetchPortalData();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <SkeletonCard />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 overflow-hidden min-h-[85vh]">
      
      {/* Decorative Glow Nodes */}
      <div className="absolute top-1/6 left-1/4 h-64 w-64 rounded-full bg-indigo-650/4 blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-violet-650/4 blur-3xl pointer-events-none animate-float-reverse"></div>

      {/* Welcome Banner */}
      <div className="relative z-10 rounded-2xl glass-indigo p-8 shadow-xl mb-10 overflow-hidden animate-slide-up">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-indigo-500/5 blur-2xl pointer-events-none"></div>
        
        <h1 className="text-3xl font-bold tracking-tight text-heading mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-sm text-muted max-w-xl">
          You are currently in the secure Student Portal. All academic metrics and active course syllabi are displayed below.
        </p>

        {/* API Connection Indicator */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--nav-profile-bg)] border border-theme px-3.5 py-1.5 text-xs text-heading transition-colors duration-300">
          <Wifi className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>
            API Status:{' '}
            <span className="font-semibold text-emerald-650 dark:text-emerald-400">Connected ({apiResponse?.message || 'OK'})</span>
          </span>
        </div>
      </div>

      {apiResponse && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Course list (Left side - spans 2 cols) */}
          <div className="lg:col-span-2 space-y-8 relative z-10">
            <div className="rounded-xl glass p-6 animate-slide-up delay-100">
              <h2 className="text-xl font-bold text-heading mb-6">Current Coursework</h2>
              
              <div className="space-y-6">
                {courses.map((course) => (
                  <div key={course.code} className="border-b border-theme pb-6 last:border-b-0 last:pb-0 group">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div>
                        <span className="text-xs font-semibold tracking-wider bg-[var(--nav-profile-bg)] border border-theme px-2.5 py-0.5 rounded text-indigo-650 dark:text-indigo-400">
                          {course.code}
                        </span>
                        <h3 className="text-base font-semibold text-heading mt-1 sm:mt-0 sm:inline sm:ml-2">
                          {course.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 mt-2 sm:mt-0">
                        <span className="text-xs text-muted">
                          Credits: <span className="font-semibold text-heading mr-3">{course.credits || 3}</span>
                          Grade: <span className="font-semibold text-heading">{course.grade || 'IP'}</span>
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-4 w-4" /> In Progress
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[var(--nav-profile-bg)] rounded-full h-2.5 border border-theme overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-violet-500 to-indigo-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-muted mt-1.5">
                      <span>Syllabus completed: {course.progress || 0}%</span>
                      <span>100% (Exam Ready)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GPA line chart */}
            <GPAChart />
          </div>

          {/* Right sidebar details - spans 1 col */}
          <div className="space-y-6 relative z-10 animate-slide-up delay-200">
            {/* Progress Rings */}
            <div className="rounded-xl glass p-6">
              <h3 className="text-sm font-bold text-heading mb-6 tracking-wide">Course Progress Status</h3>
              <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1">
                {courses.map((course) => (
                  <CircularProgress key={course.code} value={course.progress || 0} label={course.title} />
                ))}
              </div>
            </div>

            {/* Academic stats summaries */}
            <div className="rounded-xl glass p-6 space-y-4">
              <h3 className="text-sm font-bold text-heading tracking-wide">Key Academic Stats</h3>
              
              <div className="flex items-center justify-between border-b border-theme pb-3">
                <div className="flex items-center gap-2.5 text-muted">
                  <Award className="h-4 w-4 text-violet-500" />
                  <span className="text-xs">Cumulative GPA</span>
                </div>
                <span className="text-sm font-bold text-heading">3.82 / 4.00</span>
              </div>

              <div className="flex items-center justify-between border-b border-theme pb-3">
                <div className="flex items-center gap-2.5 text-muted">
                  <Clock className="h-4 w-4 text-indigo-500" />
                  <span className="text-xs">Attendance</span>
                </div>
                <span className="text-sm font-bold text-heading">94.5%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-muted">
                  <BookOpen className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs">Credits Earned</span>
                </div>
                <span className="text-sm font-bold text-heading">
                  {courses.reduce((sum, c) => sum + (c.credits || 3), 0)} Credits
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="relative z-10 rounded-xl glass-rose p-6 text-center max-w-xl mx-auto animate-slide-up">
          <ShieldAlert className="h-10 w-10 text-rose-500 dark:text-rose-455 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-heading mb-2">Authorization Error</h3>
          <p className="text-sm text-muted leading-relaxed mb-4">
            Could not retrieve student portal data. Please ensure the backend server is running and your account possesses student privileges.
          </p>
          <div className="text-xs font-mono text-rose-600 dark:text-rose-400 bg-rose-500/10 rounded px-3 py-1.5 inline-block">
            Error Details: {error}
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentDashboard;
