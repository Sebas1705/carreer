import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Project {
  id: string
  name: string
  context: string
  desc: string
  long_desc: string
  tags: string[]
  github: string | null
  demo: string | null
}
type Tab = 'work' | 'featured'

const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)
const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const CONTEXT_CLASS: Record<string, string> = {
  work:     'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  personal: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
  academic: 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400',
}

export default function ProjectsSection() {
  const { t } = useTranslation()
  const workProjects     = t('projects.work',     { returnObjects: true }) as Project[]
  const featuredProjects = t('projects.featured', { returnObjects: true }) as Project[]
  const [tab, setTab]       = useState<Tab>('work')
  const [expanded, setExpanded] = useState<string | null>(null)

  const projects = tab === 'work' ? workProjects : featuredProjects
  const switchTab = (next: Tab) => { setTab(next); setExpanded(null) }

  return (
    <section className="h-full w-full overflow-y-auto md:overflow-hidden flex flex-col scroll-smooth overscroll-contain px-5 sm:px-8 lg:px-12">
      <div className="max-w-6xl w-full mx-auto my-auto py-20 md:py-0">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4 sm:mb-6">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-2 sm:mb-3">
            {t('nav.projects')}
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('projects.title')}
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-2 justify-center mb-4 sm:mb-6">
          {(['work', 'featured'] as Tab[]).map(t2 => (
            <button
              key={t2}
              onClick={() => switchTab(t2)}
              className={`px-4 sm:px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer touch-manipulation ${
                tab === t2
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t(`projects.filter_${t2}`)}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${tab === t2 ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                {t2 === 'work' ? workProjects.length : featuredProjects.length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Cards:
            mobile  → 2 cols (never single col — avoids 4-card vertical overflow)
            sm      → 2 cols
            lg      → 4 cols
        */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4"
          >
            {projects.map((project, i) => {
              const isExpanded = expanded === project.id
              const hasLinks   = project.github || project.demo
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                  onClick={() => setExpanded(isExpanded ? null : project.id)}
                  className="group bg-slate-50 dark:bg-slate-900 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 flex flex-col cursor-pointer select-none"
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium ${CONTEXT_CLASS[project.context] ?? CONTEXT_CLASS.academic}`}>
                      {t(`projects.context_${project.context}`)}
                    </span>
                    {isExpanded && (
                      <svg className="text-slate-400 shrink-0" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    )}
                  </div>

                  <h3 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white mb-1.5 sm:mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-snug">
                    {project.name}
                  </h3>

                  <AnimatePresence initial={false} mode="wait">
                    {isExpanded ? (
                      <motion.p key="long" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
                        className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1 mb-2 sm:mb-3">
                        {project.long_desc}
                      </motion.p>
                    ) : (
                      <motion.p key="short" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                        className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-3 flex-1 mb-2 sm:mb-3">
                        {project.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                    {project.tags.slice(0, isExpanded ? undefined : 3).map(tag => (
                      <span key={tag} className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">{tag}</span>
                    ))}
                    {!isExpanded && project.tags.length > 3 && (
                      <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {hasLinks && (
                    <div className="flex items-center gap-2 sm:gap-3 mt-auto flex-wrap" onClick={e => e.stopPropagation()}>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors touch-manipulation">
                          <GitHubIcon /><span className="hidden sm:inline">{t('projects.view_code')}</span><span className="sm:hidden">Code</span>
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors touch-manipulation">
                          <ExternalIcon /><span className="hidden sm:inline">{t('projects.view_demo')}</span><span className="sm:hidden">Demo</span>
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-center text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-600 mt-3 sm:mt-4">
          {t('projects.click_hint', 'Tap a card to read more')}
        </motion.p>
      </div>
    </section>
  )
}
