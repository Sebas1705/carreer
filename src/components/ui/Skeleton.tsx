/** Collection of loading skeleton components used across sections. */

// ── Base pulse shell ──────────────────────────────────────────────────────────
function Bar({ w = 'w-full', h = 'h-3', className = '' }: { w?: string; h?: string; className?: string }) {
  return <div className={`${h} ${w} rounded bg-slate-200 dark:bg-slate-700 ${className}`} />
}

// ── Skill chips ───────────────────────────────────────────────────────────────
export function SkillChipsSkeleton() {
  const widths = [80, 110, 75, 95, 100, 70, 90, 85, 105]
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2 animate-pulse">
      {widths.map((w, i) => (
        <div key={i} className="h-7 rounded-lg bg-slate-100 dark:bg-slate-800" style={{ width: w }} />
      ))}
    </div>
  )
}

// ── Job card ──────────────────────────────────────────────────────────────────
export function JobCardSkeleton() {
  return (
    <div className="relative pl-12 sm:pl-20 animate-pulse">
      <div className="absolute left-[14px] sm:left-[26px] top-5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 sm:p-6 space-y-3">
        <Bar w="w-2/3" h="h-4" />
        <Bar w="w-1/3" h="h-3" />
        <Bar w="w-full" />
        <Bar w="w-5/6" />
        <div className="flex gap-2 pt-1">
          <Bar w="w-20" className="rounded-lg" />
          <Bar w="w-20" className="rounded-lg" />
        </div>
      </div>
    </div>
  )
}

// ── Project card ──────────────────────────────────────────────────────────────
export function ProjectCardSkeleton() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-100 dark:border-slate-800 space-y-2.5 animate-pulse">
      <Bar w="w-1/2" h="h-3" />
      <Bar w="w-3/4" h="h-4" />
      <Bar w="w-full" />
      <Bar w="w-5/6" />
      <div className="flex gap-1.5 pt-1">
        <Bar w="w-10" h="h-4" className="rounded" />
        <Bar w="w-14" h="h-4" className="rounded" />
        <Bar w="w-10" h="h-4" className="rounded" />
      </div>
    </div>
  )
}

// ── Cert card ─────────────────────────────────────────────────────────────────
export function CertCardSkeleton() {
  return (
    <div className="flex gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 animate-pulse">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Bar w="w-3/4" />
        <Bar w="w-1/2" h="h-2.5" />
        <Bar w="w-full" h="h-2.5" />
      </div>
    </div>
  )
}

// ── Education item card ───────────────────────────────────────────────────────
export function EduCardSkeleton() {
  return (
    <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 animate-pulse">
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0" />
      <div className="flex-1 space-y-2">
        <Bar w="w-3/4" h="h-4" />
        <Bar w="w-1/2" />
        <Bar w="w-1/3" h="h-2.5" />
      </div>
    </div>
  )
}
