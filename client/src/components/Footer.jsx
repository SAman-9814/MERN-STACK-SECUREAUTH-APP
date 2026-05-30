import { Shield, Cpu, BookOpen, ArrowUp, Activity, Server, Database, Key } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-theme bg-[var(--navbar-bg)] backdrop-blur-md transition-all duration-300 py-12 px-4 mt-auto relative z-15">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10">
          
          {/* Column 1: Branding & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-heading group">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 shadow-md shadow-violet-500/20 transition-transform duration-300 group-hover:rotate-6">
                <Shield className="h-4.5 w-4.5 text-white" />
              </span>
              <span className="text-heading font-extrabold">
                Secure<span className="text-violet-600 dark:text-violet-400">Auth</span>
              </span>
            </Link>
            <p className="text-xs text-muted leading-relaxed max-w-sm">
              A premium sandbox demonstrator illustrating stateless JSON Web Token management, secure HTTPOnly cookie transmission, and dynamic academic syllabus sync protocols.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Column 2: Interactive Stack Badges */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="text-xs font-extrabold text-heading uppercase tracking-wider flex items-center gap-2">
              <Cpu className="h-4 w-4 text-violet-600 dark:text-violet-405" />
              Technical Stack
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-muted uppercase tracking-widest block">Frontend</span>
                <div className="flex flex-col gap-1">
                  {['React 19 & JSX', 'Vite Bundler', 'Tailwind CSS v4'].map((tech) => (
                    <span 
                      key={tech} 
                      className="text-[10.5px] font-medium text-muted hover:text-heading cursor-default transition-colors"
                    >
                      • {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-muted uppercase tracking-widest block">Backend & DB</span>
                <div className="flex flex-col gap-1">
                  {['Node & Express', 'MongoDB Atlas', 'JWT Stateless'].map((tech) => (
                    <span 
                      key={tech} 
                      className="text-[10.5px] font-medium text-muted hover:text-heading cursor-default transition-colors"
                    >
                      • {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Site Portals */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-extrabold text-heading uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-650 dark:text-indigo-400" />
              Directory
            </h4>
            <ul className="text-xs space-y-2">
              {[
                { name: 'Home Portal', path: '/' },
                { name: 'Student Portal', path: '/student' },
                { name: 'Admin Console', path: '/admin' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-muted hover:text-violet-600 dark:hover:text-violet-400 transition-colors inline-flex items-center gap-1 hover:translate-x-1 duration-200 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: System Monitor Telemetry */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-extrabold text-heading uppercase tracking-wider flex items-center gap-2">
              <Activity className="h-4 w-4 text-rose-600 dark:text-rose-450" />
              Live Telemetry
            </h4>
            <div className="space-y-2.5 rounded-xl border border-theme bg-[var(--nav-profile-bg)] p-3 text-[10px] font-medium text-muted shadow-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Server className="h-3.5 w-3.5 text-violet-550" /> API Server
                </span>
                <span className="font-bold text-heading">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-indigo-550" /> MongoDB Conn
                </span>
                <span className="font-bold text-heading text-emerald-600">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Key className="h-3.5 w-3.5 text-amber-500" /> JWT Check
                </span>
                <span className="font-mono text-heading">HS256 Verified</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="pt-6 border-t border-theme/20 grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-[10.5px] text-muted">
          {/* Left spacer for desktop alignment balance */}
          <div className="hidden md:block"></div>

          {/* Centered Copyright Text */}
          <div className="text-center font-medium">
            <span>&copy; {new Date().getFullYear()} SecureAuth. Engineered for Academic Administration.</span>
          </div>

          {/* Back to Top Trigger */}
          <div className="flex justify-center md:justify-end">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-theme bg-[var(--nav-button-bg)] text-heading hover:bg-[var(--nav-button-hover)] hover:scale-105 active:scale-95 shadow-sm transition-all duration-300 cursor-pointer text-xs font-bold"
              title="Scroll to top"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5 animate-pulse" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
