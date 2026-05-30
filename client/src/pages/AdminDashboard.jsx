import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ShieldAlert, Wifi, UserCheck, Edit3, PlusCircle, BookOpen, Users, GraduationCap } from 'lucide-react';
import { SkeletonCard } from '../components/Skeleton';

// Course Management Panel Component (For Admin)
const CourseManagement = () => {
  const { courses, addCourse, showToast } = useAuth();
  
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [credits, setCredits] = useState('3');
  const [department, setDepartment] = useState('Computer Science');
  const [progress, setProgress] = useState('0');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) {
      showToast('Please enter both course code and title.', 'error');
      return;
    }
    
    // Check for duplicate course code
    const exists = courses.some(c => c.code.toLowerCase() === code.trim().toLowerCase());
    if (exists) {
      showToast(`Course code ${code.toUpperCase()} already exists.`, 'error');
      return;
    }

    addCourse({
      code: code.toUpperCase().trim(),
      title: title.trim(),
      credits: parseInt(credits),
      department: department.trim(),
      progress: parseInt(progress),
      grade: 'IP'
    });

    // Reset Form
    setCode('');
    setTitle('');
    setProgress('0');
  };

  return (
    <div className="space-y-6">
      
      {/* Create Course Form */}
      <div className="rounded-xl glass p-6">
        <h3 className="text-sm font-bold text-heading mb-6 tracking-wide flex items-center gap-2">
          <PlusCircle className="h-4.5 w-4.5 text-rose-500" /> Create New Course Syllabus
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">Course Code</label>
            <input
              type="text"
              placeholder="e.g. CS-401"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="block w-full rounded-lg border border-theme bg-[var(--input-bg)] py-2 px-3 text-sm text-heading placeholder-slate-500 outline-none focus:border-rose-500/80 focus:bg-[var(--nav-button-bg)] transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">Course Title</label>
            <input
              type="text"
              placeholder="e.g. Artificial Intelligence"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full rounded-lg border border-theme bg-[var(--input-bg)] py-2 px-3 text-sm text-heading placeholder-slate-500 outline-none focus:border-rose-500/80 focus:bg-[var(--nav-button-bg)] transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">Credits</label>
            <select
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="block w-full rounded-lg border border-theme bg-[var(--input-bg)] py-2 px-3 text-sm text-heading placeholder-slate-500 outline-none focus:border-rose-500/80 focus:bg-[var(--nav-button-bg)] transition-all duration-300"
            >
              <option value="2">2 Credits</option>
              <option value="3">3 Credits</option>
              <option value="4">4 Credits</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">Department</label>
            <input
              type="text"
              placeholder="e.g. Computer Science"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="block w-full rounded-lg border border-theme bg-[var(--input-bg)] py-2 px-3 text-sm text-heading placeholder-slate-500 outline-none focus:border-rose-500/80 focus:bg-[var(--nav-button-bg)] transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">Default Progress</label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-[var(--nav-profile-bg)] border border-theme outline-none accent-rose-500 py-2.5"
            />
            <div className="flex justify-between text-[10px] text-muted mt-1">
              <span>0% (Not Started)</span>
              <span className="font-bold text-rose-650 dark:text-rose-400">{progress}%</span>
              <span>100% (Finished)</span>
            </div>
          </div>

          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-pink-650 px-4 py-2.5 text-sm font-bold text-white shadow shadow-rose-650/10 hover:from-rose-500 hover:to-pink-550 transition-all cursor-pointer"
            >
              <PlusCircle className="h-4.5 w-4.5" /> Publish Course Syllabus
            </button>
          </div>
        </form>
      </div>

      {/* Catalog Table List */}
      <div className="rounded-xl glass p-6">
        <h3 className="text-sm font-bold text-heading mb-6 tracking-wide flex items-center gap-2">
          <BookOpen className="h-4.5 w-4.5 text-rose-505" /> Live Shared Course Catalog ({courses.length})
        </h3>
        
        <div className="overflow-x-auto max-h-[300px] pr-1">
          <table className="min-w-full divide-y divide-theme/20 text-xs">
            <thead>
              <tr className="text-left font-bold text-muted uppercase tracking-wider">
                <th className="pb-3 pr-2">Code</th>
                <th className="pb-3 px-2">Title</th>
                <th className="pb-3 px-2">Dept</th>
                <th className="pb-3 px-2 text-center">Cr</th>
                <th className="pb-3 pl-2 text-right">Prog</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme/20 font-medium text-heading">
              {courses.map((course) => (
                <tr key={course.code} className="hover:bg-[var(--nav-profile-bg)]/40 transition-colors duration-300">
                  <td className="py-3 pr-2 font-bold text-rose-650 dark:text-rose-400">{course.code}</td>
                  <td className="py-3 px-2 max-w-[120px] truncate" title={course.title}>{course.title}</td>
                  <td className="py-3 px-2 text-muted max-w-[80px] truncate" title={course.department}>{course.department}</td>
                  <td className="py-3 px-2 text-center text-muted">{course.credits || 3}</td>
                  <td className="py-3 pl-2 text-right font-bold text-rose-650 dark:text-rose-400">{course.progress || 0}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

// Profile Customizer Section
const ProfileCustomizer = () => {
  const { user, showToast } = useAuth();
  const [profileName, setProfileName] = useState(user?.name || '');
  const [avatarColor, setAvatarColor] = useState(user?.avatarColor || 'bg-violet-600');

  const colors = [
    { name: 'Violet', class: 'bg-violet-650 dark:bg-violet-600', ring: 'ring-violet-500' },
    { name: 'Rose', class: 'bg-rose-650 dark:bg-rose-500', ring: 'ring-rose-500' },
    { name: 'Emerald', class: 'bg-emerald-650 dark:bg-emerald-500', ring: 'ring-emerald-500' },
    { name: 'Amber', class: 'bg-amber-600 dark:bg-amber-550', ring: 'ring-amber-500' },
    { name: 'Sky', class: 'bg-sky-650 dark:bg-sky-500', ring: 'ring-sky-500' }
  ];

  const handleSave = () => {
    if (!profileName.trim()) {
      showToast('Name cannot be empty.', 'error');
      return;
    }
    const updatedUser = { ...user, name: profileName, avatarColor };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    window.location.reload();
  };

  return (
    <div className="rounded-xl glass p-6">
      <h3 className="text-sm font-bold text-heading mb-6 tracking-wide flex items-center gap-2">
        <Edit3 className="h-4.5 w-4.5 text-violet-555" /> Customize Profile
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Display Name</label>
          <input
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            className="block w-full rounded-lg border border-theme bg-[var(--input-bg)] py-2 px-3 text-sm text-heading placeholder-slate-500 outline-none focus:border-violet-500/80 focus:bg-[var(--nav-button-bg)] transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Avatar Theme</label>
          <div className="flex gap-2.5">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setAvatarColor(c.class)}
                className={`h-7 w-7 rounded-full ${c.class} transition-all duration-300 cursor-pointer ${
                  avatarColor === c.class ? `ring-2 ring-offset-2 ring-offset-slate-900 ${c.ring} scale-110` : 'hover:scale-105'
                }`}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow hover:from-violet-500 hover:to-indigo-500 transition-all cursor-pointer"
        >
          <UserCheck className="h-4 w-4" /> Save Preferences
        </button>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { getProtectedData, courses } = useAuth();
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      setError('');
      const res = await getProtectedData('admin');

      if (res.success) {
        setApiResponse(res.data);
      } else {
        setError(res.message);
      }
      setLoading(false);
    };

    fetchAdminData();
  }, []);

  const stats = [
    { title: 'Active Syllabus', value: `${courses.length} Courses`, icon: BookOpen, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10' },
    { title: 'Student Body', value: '148 Enrolled', icon: GraduationCap, color: 'text-indigo-650 dark:text-indigo-400', bg: 'bg-indigo-500/10' },
    { title: 'Faculty Members', value: '18 Educators', icon: Users, color: 'text-violet-650 dark:text-violet-400', bg: 'bg-violet-500/10' }
  ];

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
      <div className="absolute top-1/6 left-1/4 h-64 w-64 rounded-full bg-rose-655/4 blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-violet-655/4 blur-3xl pointer-events-none animate-float-reverse"></div>

      {/* Admin Title Card */}
      <div className="relative z-10 rounded-2xl glass-rose p-8 shadow-xl mb-10 overflow-hidden animate-slide-up">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-rose-500/5 blur-2xl pointer-events-none"></div>

        <h1 className="text-3xl font-bold tracking-tight text-heading mb-2">
          Admin Console
        </h1>
        <p className="text-sm text-muted max-w-xl">
          System telemetry and privilege authorization configurations. Operations on this portal are fully audited.
        </p>

        {/* API connection */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--nav-profile-bg)] border border-theme px-3.5 py-1.5 text-xs text-heading transition-colors duration-300">
          <Wifi className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>
            API Connection:{' '}
            <span className="font-semibold text-emerald-650 dark:text-emerald-400">Authorized ({apiResponse?.message || 'OK'})</span>
          </span>
        </div>
      </div>

      {apiResponse && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main management panel (Left side - spans 2 cols) */}
          <div className="lg:col-span-2 space-y-8 relative z-10">
            {/* Stats grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 animate-slide-up delay-100">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="group rounded-xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-theme shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-lg ${stat.bg} p-3 ${stat.color} border border-theme transition-transform group-hover:scale-110`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted uppercase tracking-wider">{stat.title}</p>
                        <p className="text-xl font-bold text-heading mt-1">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Shared Course Management System */}
            <CourseManagement />
          </div>

          {/* Right sidebar options (spans 1 col) */}
          <div className="relative z-10 space-y-6 animate-slide-up delay-200">
            {/* Customize profile details */}
            <ProfileCustomizer />

            {/* Academic Calendar / Term panel */}
            <div className="rounded-xl glass p-6">
              <h3 className="text-sm font-bold text-heading mb-4 tracking-wide">Academic Term Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted">Current Term</span>
                  <span className="font-semibold text-heading">Spring 2026</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted">Term Progress</span>
                  <span className="font-semibold text-heading">72% Completed</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted">Academic Phase</span>
                  <span className="font-semibold text-violet-650 dark:text-violet-400">Final Exams</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="relative z-10 rounded-xl glass-rose p-6 text-center max-w-xl mx-auto animate-slide-up">
          <ShieldAlert className="h-10 w-10 text-rose-505 dark:text-rose-455 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-heading mb-2">Insufficient Permissions</h3>
          <p className="text-sm text-muted leading-relaxed mb-4">
            Access to this portal is restricted. Only user accounts registered with the role of `Admin` can view the admin console.
          </p>
          <div className="text-xs font-mono text-rose-605 dark:text-rose-450 bg-rose-500/10 rounded px-3 py-1.5 inline-block">
            Error Details: {error}
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
