import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  Lock, 
  Eye, 
  Search, 
  Filter, 
  Database, 
  Check, 
  AlertTriangle, 
  Key, 
  Terminal,
  Cpu,
  BookOpen
} from 'lucide-react';

const Home = () => {
  const { user, courses } = useAuth();
  
  // JWT Simulator State
  const [simRole, setSimRole] = useState('Visitor');
  
  // Course Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  // Simulated JWT data matching actual database fields and JWT structure
  const getSimulatedToken = () => {
    if (simRole === 'Visitor') {
      return {
        raw: 'No token active (Unauthenticated)',
        header: { alg: 'None', typ: 'JWT' },
        payload: null,
        signature: 'None',
        verified: false
      };
    }
    
    if (simRole === 'Student') {
      const header = { alg: 'HS256', typ: 'JWT' };
      const payload = {
        id: 'usr_stu_59021',
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@university.edu',
        role: 'Student',
        iat: Math.floor(Date.now() / 1000) - 3600,
        exp: Math.floor(Date.now() / 1000) + 82800
      };
      return {
        raw: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl9zdHVfNTkwMjEiLCJuYW1lIjoiU2FyYWggSmVua2lucyIsImVtYWlsIjoic2FyYWguamVua2luc0B1bml2ZXJzaXR5LmVkdSIsInJvbGUiOiJTdHVkZW50IiwiaWF0IjoxNzg4Nzg3MjAwLCJleHAiOjE3ODg4NzM2MDB9.VERIFIED_HMAC256_SIGNATURE',
        header,
        payload,
        signature: '34a8de90fa2c4efd6e80b2a348e...',
        verified: true
      };
    }
    
    if (simRole === 'Admin') {
      const header = { alg: 'HS256', typ: 'JWT' };
      const payload = {
        id: 'usr_adm_09841',
        name: 'Dean Marcus',
        email: 'marcus.admin@university.edu',
        role: 'Admin',
        iat: Math.floor(Date.now() / 1000) - 1800,
        exp: Math.floor(Date.now() / 1000) + 84600
      };
      return {
        raw: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl9hZG1fMDk4NDEiLCJuYW1lIjoiRGVhbiBNYXJjdXMiLCJlbWFpbCI6Im1hcmN1cy5hZG1pbkB1bml2ZXJzaXR5LmVkdSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc4ODc4OTAwMCwiZXhwIjoxNzg4ODczNjAwfQ.VERIFIED_HMAC256_SIGNATURE',
        header,
        payload,
        signature: 'f49de812e98fa203b58bc109f02...',
        verified: true
      };
    }
  };

  const simToken = getSimulatedToken();

  // Get dynamic departments list from courses
  const departments = ['All', ...new Set(courses.map(c => c.department))];

  // Filter courses based on search text and department chips
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || course.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  // Calculate course badge color
  const getProgressColorClass = (progress) => {
    if (progress >= 85) return 'bg-emerald-500/10 text-emerald-650 dark:text-emerald-400 border border-emerald-500/20';
    if (progress >= 60) return 'bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border border-indigo-500/20';
    return 'bg-amber-500/10 text-amber-650 dark:text-amber-400 border border-amber-500/20';
  };

  const getStatusText = (progress) => {
    if (progress >= 85) return 'Honors Track';
    if (progress >= 60) return 'Active';
    return 'Review Needed';
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh]">
      
      {/* Decorative Glow Nodes */}
      <div className="absolute top-1/6 left-1/12 h-80 w-80 rounded-full bg-violet-600/8 dark:bg-violet-600/10 blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/5 right-1/12 h-96 w-96 rounded-full bg-indigo-600/8 dark:bg-indigo-600/10 blur-3xl pointer-events-none animate-float-reverse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-purple-500/3 blur-3xl pointer-events-none animate-pulse-glow"></div>

      {/* Hero Section */}
      <div className="relative z-10 text-center max-w-3xl mb-16 mt-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 px-4.5 py-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 mb-6 animate-fade-in shadow-sm">
          <ShieldCheck className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          <span>Role-Based Access Control System Activated</span>
        </div>
        <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl tracking-tight leading-tight mb-6 animate-slide-up text-heading">
          Unified Syllabus & <br />
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-750 dark:from-violet-400 dark:via-indigo-400 dark:to-violet-500 bg-clip-text text-transparent animate-text-shimmer">
            Role Authorization Portal
          </span>
        </h1>
        <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mx-auto animate-slide-up delay-100">
          A secure client dashboard engineered with React, Tailwind CSS, Express, Node.js, JSON Web Tokens (JWT), and HTTPOnly Cookie handling.
        </p>

        {!user && (
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-slide-up delay-200">
            <Link
              to="/signup"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 hover:from-violet-500 hover:to-indigo-500 transition-all hover:scale-[1.03] hover:shadow-violet-600/35 cursor-pointer"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-theme bg-[var(--nav-button-bg)] px-7 py-3 text-sm font-semibold text-heading hover:bg-[var(--nav-button-hover)] transition-all hover:scale-[1.03] cursor-pointer shadow-sm"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Main Portals Grid */}
      <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3 w-full max-w-6xl mt-4 animate-slide-up delay-300">
        
        {/* Card 1: Public Area */}
        <div className="group relative rounded-2xl glass p-6 border border-theme transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-slate-950/5 dark:hover:shadow-slate-950/40">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Eye className="h-16 w-16 text-slate-400" />
          </div>
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--nav-button-bg)] border border-theme text-muted transition-transform group-hover:scale-110">
            <Eye className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-heading mb-2">Public Area</h3>
          <p className="text-sm text-muted leading-relaxed mb-6">
            Accessible by everyone, authenticated or anonymous. Contains basic landing features and course list previews.
          </p>
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 rounded-md px-3 py-1.5 inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
            Open Access
          </div>
        </div>

        {/* Card 2: Student Portal */}
        <div className="group relative rounded-2xl glass p-6 border border-theme transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/25 hover:shadow-lg hover:shadow-violet-650/5">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <GraduationCap className="h-16 w-16 text-violet-550 dark:text-violet-400" />
          </div>
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-violet-950/10 dark:bg-violet-950/20 border border-violet-850/15 text-violet-600 dark:text-violet-400 transition-transform group-hover:scale-110">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-heading mb-2">Student Portal</h3>
          <p className="text-sm text-muted leading-relaxed mb-6">
            Restricted to accounts registered as Students. Contains protected student profile data, progress rings and SVG GPA graphs.
          </p>
          <Link
            to="/student"
            className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            Access Portal
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Card 3: Admin Panel */}
        <div className="group relative rounded-2xl glass p-6 border border-theme transition-all duration-300 hover:-translate-y-2 hover:border-rose-500/25 hover:shadow-lg hover:shadow-rose-650/5">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Lock className="h-16 w-16 text-rose-550 dark:text-rose-400" />
          </div>
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-rose-950/10 dark:bg-rose-950/20 border border-rose-850/15 text-rose-600 dark:text-rose-400 transition-transform group-hover:scale-110">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-heading mb-2">Admin Panel</h3>
          <p className="text-sm text-muted leading-relaxed mb-6">
            Highly restricted portal for system Administrators. Contains database configurations, active node metrics, and course syllabus publishers.
          </p>
          <Link
            to="/admin"
            className="text-xs font-semibold text-rose-600 dark:text-rose-450 hover:text-rose-500 dark:hover:text-rose-350 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            Access Panel
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

      {/* Interactive JWT & Route Simulator */}
      <div className="relative z-10 w-full max-w-6xl mt-24 animate-slide-up delay-350">
        
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 mb-3.5 shadow-sm">
            Interactive Playground
          </span>
          <h2 className="text-3xl font-extrabold text-heading tracking-tight">
            JWT Authorization Sandbox
          </h2>
          <p className="text-sm text-muted mt-2 max-w-lg mx-auto leading-relaxed">
            Toggle simulated identities below to inspect the structure of a live JSON Web Token (JWT) and test how route permissions react.
          </p>
        </div>

        {/* Sandbox Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Board: JWT Decoder */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl glass p-6 border border-theme shadow-md">
            
            <div>
              <div className="flex items-center justify-between border-b border-theme/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  <span className="text-sm font-bold text-heading">Identity Token Encoder</span>
                </div>
                <div className="flex bg-[var(--nav-profile-bg)] rounded-lg p-1 border border-theme/35">
                  {['Visitor', 'Student', 'Admin'].map((role) => (
                    <button
                      key={role}
                      onClick={() => setSimRole(role)}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                        simRole === role
                          ? 'bg-violet-600 text-white shadow-sm'
                          : 'text-muted hover:text-heading'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Encoded / Raw Token Visual */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-2">
                    Encoded Token String (Sent via Cookie/Header)
                  </label>
                  <div className="rounded-lg bg-slate-950 p-3.5 text-[11px] font-mono leading-relaxed break-all border border-slate-900 select-all shadow-inner">
                    {simRole === 'Visitor' ? (
                      <span className="text-slate-500">{simToken.raw}</span>
                    ) : (
                      <>
                        <span className="text-rose-400 font-semibold">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
                        <span className="text-white">.</span>
                        <span className="text-violet-400 font-semibold">
                          {simRole === 'Student' 
                            ? 'eyJpZCI6InVzcl9zdHVfNTkwMjEiLCJuYW1lIjoiU2FyYWggSmVua2lucyIsImVtYWlsIjoic2FyYWguamVua2luc0B1bml2ZXJzaXR5LmVkdSIsInJvbGUiOiJTdHVkZW50IiwiaWF0IjoxNzg4Nzg3MjAwLCJleHAiOjE3ODg4NzM2MDB9' 
                            : 'eyJpZCI6InVzcl9hZG1fMDk4NDEiLCJuYW1lIjoiRGVhbiBNYXJjdXMiLCJlbWFpbCI6Im1hcmN1cy5hZG1pbkB1bml2ZXJzaXR5LmVkdSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc4ODc4OTAwMCwiZXhwIjoxNzg4ODczNjAwfQ'}
                        </span>
                        <span className="text-white">.</span>
                        <span className="text-emerald-400 font-semibold">VERIFIED_HMAC256_SIGNATURE</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Decoded Token Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Header */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400 mb-1.5">
                      JWT Header
                    </label>
                    <pre className="rounded-lg bg-slate-950 p-3 text-xs font-mono text-rose-400 border border-rose-950/20 overflow-x-auto shadow-inner">
                      {JSON.stringify(simToken.header, null, 2)}
                    </pre>
                  </div>

                  {/* Payload */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-violet-500 dark:text-violet-400 mb-1.5">
                      JWT Payload (Claims)
                    </label>
                    <pre className="rounded-lg bg-slate-950 p-3 text-xs font-mono text-violet-400 border border-violet-950/20 overflow-x-auto shadow-inner min-h-[110px]">
                      {simToken.payload 
                        ? JSON.stringify(simToken.payload, null, 2)
                        : '// Null - Unauthenticated'}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-theme/20 pt-4 mt-6 text-xs text-muted">
              <Key className="h-4 w-4 text-emerald-500" />
              <span>Token Verification Method: <strong>HMAC SHA-256</strong> (Server Secret Key verified)</span>
            </div>

          </div>

          {/* Right Board: Access Guards checklist */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl glass p-6 border border-theme shadow-md bg-violet-600/3 dark:bg-violet-600/1 text-heading">
            
            <div>
              <div className="flex items-center justify-between border-b border-theme/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-bold text-heading">Middleware Route Guard</span>
                </div>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                  simRole === 'Visitor' 
                    ? 'bg-slate-500/10 text-slate-500 border-slate-500/20' 
                    : simRole === 'Student'
                    ? 'bg-violet-500/10 text-violet-650 dark:text-violet-400 border-violet-500/20'
                    : 'bg-rose-500/10 text-rose-650 dark:text-rose-450 border-rose-500/20'
                }`}>
                  {simRole} Guard
                </span>
              </div>

              {/* Route Guard Checklist */}
              <div className="space-y-4">
                
                {/* Route 1: Public */}
                <div className="flex items-center justify-between rounded-xl border border-theme bg-[var(--nav-button-bg)] p-3.5 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-heading">Public Routes</span>
                    <span className="text-[10px] text-muted">`/` & `/login` & `/signup`</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-650 dark:text-emerald-400">
                    <Check className="h-4 w-4" /> Allowed
                  </div>
                </div>

                {/* Route 2: Student */}
                <div className={`flex items-center justify-between rounded-xl border p-3.5 shadow-sm transition-all duration-300 ${
                  simRole === 'Student' 
                    ? 'border-violet-500/20 bg-violet-500/5' 
                    : 'border-theme bg-[var(--nav-button-bg)] opacity-70'
                }`}>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-heading">Student Portal</span>
                    <span className="text-[10px] text-muted">`/student` (Student Role Required)</span>
                  </div>
                  {simRole === 'Student' ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400">
                      <Check className="h-4 w-4" /> Allowed
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-450">
                      <Lock className="h-3.5 w-3.5" /> Blocked
                    </div>
                  )}
                </div>

                {/* Route 3: Admin */}
                <div className={`flex items-center justify-between rounded-xl border p-3.5 shadow-sm transition-all duration-300 ${
                  simRole === 'Admin' 
                    ? 'border-rose-500/25 bg-rose-500/5' 
                    : 'border-theme bg-[var(--nav-button-bg)] opacity-70'
                }`}>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-heading">Admin Console</span>
                    <span className="text-[10px] text-muted">`/admin` (Admin Role Required)</span>
                  </div>
                  {simRole === 'Admin' ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-405 font-semibold">
                      <Check className="h-4 w-4" /> Allowed
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-450">
                      <Lock className="h-3.5 w-3.5" /> Blocked
                    </div>
                  )}
                </div>

                {/* Route 4: API Database */}
                <div className={`flex items-center justify-between rounded-xl border p-3.5 shadow-sm transition-all duration-300 ${
                  simRole === 'Admin' 
                    ? 'border-indigo-500/20 bg-indigo-500/5' 
                    : 'border-theme bg-[var(--nav-button-bg)] opacity-70'
                }`}>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-heading">Course Editor Database Writes</span>
                    <span className="text-[10px] text-muted">POST `/api/v1/admin/courses`</span>
                  </div>
                  {simRole === 'Admin' ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      <Database className="h-4 w-4" /> Authorized
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-450">
                      <Lock className="h-3.5 w-3.5" /> Blocked
                    </div>
                  )}
                </div>

              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2 text-center rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 text-xs text-amber-700 dark:text-amber-400">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Simulation Only</span>
              </div>
              <p className="text-[10.5px] leading-snug">
                To test actual routing, please use the <strong>Sign In</strong> flow above with registered credentials.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Courses Catalog Section */}
      <div className="relative z-10 w-full max-w-6xl mt-24 animate-slide-up delay-400">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-theme/20 pb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-heading tracking-tight">Explore Shared Syllabus Directory</h2>
            <p className="text-sm text-muted mt-1.5">A dynamic compilation of course catalogs shared across portals</p>
          </div>
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md w-full shrink-0">
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search code or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-theme bg-[var(--input-bg)] text-heading placeholder-slate-400 outline-none focus:border-violet-500/80 focus:bg-[var(--nav-button-bg)] focus:ring-1 focus:ring-violet-500/80 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Department Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-[11px] font-bold text-muted mr-1 inline-flex items-center gap-1">
            <Filter className="h-3 w-3" /> Filter:
          </span>
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedDept === dept
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-[var(--nav-button-bg)] border border-theme text-muted hover:text-heading hover:bg-[var(--nav-button-hover)]'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Course Cards Deck */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div 
                key={course.code} 
                className="group relative rounded-xl glass border border-theme p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-violet-500/30 flex flex-col justify-between h-[180px] bg-[var(--nav-button-bg)]"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                      {course.code}
                    </span>
                    <span className="text-[9px] font-semibold text-muted">
                      {course.credits} Credits
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-bold text-heading mt-3.5 mb-1.5 line-clamp-2 leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" title={course.title}>
                    {course.title}
                  </h4>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between items-center text-[9px] text-muted mb-1.5">
                    <span>Syllabus Covered</span>
                    <span className="font-bold text-heading">{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-500" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[8.5px] mt-2 border-t border-theme/20 pt-2.5">
                    <span className="font-semibold text-muted truncate max-w-[100px]">{course.department}</span>
                    <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded ${getProgressColorClass(course.progress)}`}>
                      {getStatusText(course.progress)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-theme/35 p-12 text-center glass bg-[var(--nav-profile-bg)] animate-fade-in">
            <BookOpen className="h-8 w-8 text-slate-400 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-heading">No course syllabi found</h4>
            <p className="text-xs text-muted mt-1">Try modifying your search text or department filter chips.</p>
          </div>
        )}

      </div>

      {/* Logged in User Banner */}
      {user && (
        <div className="relative z-10 mt-20 w-full max-w-3xl rounded-xl border border-theme bg-[var(--nav-profile-bg)] p-4 text-center animate-slide-up delay-455 shadow-sm">
          <p className="text-xs sm:text-sm text-muted">
            Currently logged in as <span className="text-heading font-bold">{user.name}</span> with the role of{' '}
            <span className="text-violet-600 dark:text-violet-400 font-bold">{user.role}</span>.
          </p>
        </div>
      )}

    </div>
  );
};

export default Home;

