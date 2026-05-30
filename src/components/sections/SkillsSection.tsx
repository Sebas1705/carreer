import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SKILLS, type Skill, type SkillCategory } from '../../data/skills'

type Tab = 'languages' | 'frameworks' | 'tools' | 'databases' | 'architecture' | 'other'
const TABS: Tab[] = ['languages', 'frameworks', 'tools', 'databases', 'architecture', 'other']

const TAB_CATEGORIES: Record<Tab, SkillCategory[]> = {
  languages:    ['languages'],
  frameworks:   ['frameworks'],
  tools:        ['tools'],
  databases:    ['databases', 'cloud'],
  architecture: ['architecture', 'methodologies'],
  other:        ['ides', 'os', 'ai'],
}

const TAB_CHIP: Record<Tab, { top: string; more: string }> = {
  languages:    { top: 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/50', more: 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-500 border-slate-100 dark:border-slate-800/30' },
  frameworks:   { top: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50', more: 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-500 border-slate-100 dark:border-slate-800/30' },
  tools:        { top: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',           more: 'bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-slate-800/30' },
  databases:    { top: 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/50',                   more: 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-500 border-slate-100 dark:border-slate-800/30' },
  architecture: { top: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50', more: 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-500 border-slate-100 dark:border-slate-800/30' },
  other:        { top: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50',       more: 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-500 border-slate-100 dark:border-slate-800/30' },
}

// Short tab labels for mobile (shown below sm breakpoint)
const TAB_SHORT: Record<Tab, string> = {
  languages:    'Lang.',
  frameworks:   'FW',
  tools:        'Tools',
  databases:    'DB',
  architecture: 'Arch.',
  other:        'IDEs',
}

const SOFT_ICONS = ['🤝', '💬', '🧩', '🔄', '🚀', '⏰', '🤔', '📚', '🔍', '💡', '❤️', '💪']

function SkillChip({ skill, chipClass }: { skill: Skill; chipClass: string }) {
  const [imgOk, setImgOk] = useState(true)
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium select-none ${chipClass}`}>
      {skill.iconUrl && imgOk ? (
        <img src={skill.iconUrl} alt="" className="w-4 h-4 object-contain shrink-0" onError={() => setImgOk(false)} />
      ) : (
        <span className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold shrink-0 bg-current/10">
          {skill.name.charAt(0)}
        </span>
      )}
      <span className="truncate max-w-[80px] sm:max-w-none">{skill.name}</span>
      <span className="flex gap-0.5 ml-0.5 shrink-0">
        {[1, 2, 3, 4].map(i => (
          <span key={i} className={`w-1 h-1 rounded-full ${i <= skill.level ? 'bg-current opacity-70' : 'bg-current opacity-15'}`} />
        ))}
      </span>
    </span>
  )
}

export default function SkillsSection() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<Tab>('languages')
  const [showAll, setShowAll]     = useState(false)

  const softList   = t('skills.softList', { returnObjects: true }) as string[]
  const filtered   = SKILLS.filter(s => TAB_CATEGORIES[activeTab].includes(s.category))
  const topSkills  = filtered.filter(s => s.level >= 3)
  const moreSkills = filtered.filter(s => s.level  < 3)
  const { top: topClass, more: moreClass } = TAB_CHIP[activeTab]

  const switchTab = (tab: Tab) => { setActiveTab(tab); setShowAll(false) }

  return (
    <section className="h-full w-full overflow-y-auto md:overflow-hidden flex flex-col scroll-smooth overscroll-contain px-5 sm:px-8 lg:px-12">
      <div className="max-w-6xl w-full mx-auto my-auto py-20 md:py-0">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4 sm:mb-6">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-2 sm:mb-3">
            {t('nav.skills')}
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('skills.title')}
          </h2>
        </motion.div>

        {/* Tabs — horizontal scroll on mobile with right-fade hint */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mb-4 sm:mb-6">
          <div className="relative">
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {TABS.map(tab => {
                const count    = SKILLS.filter(s => TAB_CATEGORIES[tab].includes(s.category)).length
                const isActive = activeTab === tab
                return (
                  <button
                    key={tab}
                    onClick={() => switchTab(tab)}
                    className={`flex-shrink-0 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer touch-manipulation whitespace-nowrap ${
                      isActive
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {/* Short label on very small screens */}
                    <span className="sm:hidden">{TAB_SHORT[tab]}</span>
                    <span className="hidden sm:inline">{t(`skills.tab_${tab}`)}</span>
                    <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
            {/* Right fade hint for horizontal scroll on mobile */}
            <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white dark:from-slate-950 to-transparent pointer-events-none sm:hidden" />
          </div>
        </motion.div>

        {/* Skill chips */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="mb-4 sm:mb-5"
          >
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
              {topSkills.map((skill, i) => (
                <motion.div key={skill.id} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.02, duration: 0.2 }}>
                  <SkillChip skill={skill} chipClass={topClass} />
                </motion.div>
              ))}
            </div>

            {moreSkills.length > 0 && (
              <>
                <AnimatePresence initial={false}>
                  {showAll && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 pt-1">
                        {moreSkills.map((skill, i) => (
                          <motion.div key={skill.id} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.015, duration: 0.18 }}>
                            <SkillChip skill={skill} chipClass={moreClass} />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setShowAll(v => !v)}
                  className="flex items-center gap-1.5 text-xs font-medium text-violet-500 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors cursor-pointer touch-manipulation mt-1"
                >
                  <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.2 }}>▾</motion.span>
                  {showAll ? t('skills.show_less') : t('skills.show_more', { count: moreSkills.length })}
                </button>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Soft skills */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-2 sm:mb-2.5 text-center">
            {t('skills.soft')}
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {softList.map((name, i) => (
              <span key={name} className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800/50">
                <span>{SOFT_ICONS[i] ?? '•'}</span>
                {name}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
