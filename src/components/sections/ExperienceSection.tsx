import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface Job {
  role: string
  company: string
  period: string
  type: string
  desc: string
  projects: string[]
}

export default function ExperienceSection() {
  const { t } = useTranslation()
  const jobs = t('experience.jobs', { returnObjects: true }) as Job[]

  return (
    <section className="h-full w-full flex items-center justify-center px-8">
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-3">
            {t('nav.experience')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('experience.title')}
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-3 bottom-3 w-px bg-linear-to-b from-violet-500 via-violet-400 to-transparent" />

          <div className="space-y-6">
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                className="relative pl-20"
              >
                <div className="absolute left-6.5 top-5 w-5 h-5 rounded-full bg-violet-600 dark:bg-violet-400 border-4 border-white dark:border-slate-950 shadow-sm" />

                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-200">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{job.role}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-violet-600 dark:text-violet-400 font-medium">{job.company}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{job.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.projects.map(p => (
                      <span
                        key={p}
                        className="text-xs px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-800/50"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
