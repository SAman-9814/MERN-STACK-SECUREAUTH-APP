export const SkeletonCard = () => (
  <div className="w-full rounded-xl border border-theme bg-[var(--glass-bg)] p-6 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-lg bg-slate-205 dark:bg-slate-800/80"></div>
      <div className="flex-grow space-y-2">
        <div className="h-3.5 w-1/3 rounded bg-slate-205 dark:bg-slate-800/80"></div>
        <div className="h-5 w-2/3 rounded bg-slate-205 dark:bg-slate-800/80"></div>
      </div>
    </div>
  </div>
);

export const SkeletonLogs = () => (
  <div className="w-full rounded-xl border border-theme bg-[var(--glass-bg)] p-6 animate-pulse space-y-5">
    <div className="flex items-center gap-2 mb-4">
      <div className="h-5 w-5 rounded bg-slate-205 dark:bg-slate-800/80"></div>
      <div className="h-5 w-1/3 rounded bg-slate-205 dark:bg-slate-800/80"></div>
    </div>
    
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme pb-3 last:border-0 last:pb-0">
          <div className="flex items-center gap-2 flex-grow">
            <div className="h-3 w-12 rounded bg-slate-205 dark:bg-slate-800/80"></div>
            <div className="h-4.5 w-1/2 rounded bg-slate-205 dark:bg-slate-800/80"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-4.5 w-10 rounded bg-slate-205 dark:bg-slate-800/80"></div>
            <div className="h-4.5 w-14 rounded bg-slate-205 dark:bg-slate-800/80"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
