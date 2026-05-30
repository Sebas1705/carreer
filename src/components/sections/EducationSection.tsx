import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface EduItem {
  degree: string
  school: string
  period: string
  detail: string
  icon: string
}

interface Cert {
  name: string
  issuer: string
  date: string
  desc: string
  url: string
}

const ExternalLinkIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

export default function EducationSection() {
  const { t } = useTranslation()
  const items = t('education.items', { returnObjects: true }) as EduItem[]
  const certs = t('education.certs', { returnObjects: true }) as Cert[]

  return (
    <section className="h-full w-full flex items-center justify-center px-8">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-3">
            {t('nav.education')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('education.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-100 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-200 flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">{item.degree}</p>
                  <p className="text-violet-600 dark:text-violet-400 text-xs mt-1">{item.school}</p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">{item.period}</p>
                  {item.detail && (
                    <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 leading-relaxed">{item.detail}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-4">
              {t('education.certifications')}
            </p>
            <div className="space-y-3">
              {certs.map((cert, i) => (
                <motion.a
                  key={i}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                  className="flex items-start gap-4 bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-md hover:shadow-violet-500/5 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-base shrink-0">
                    🏆
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="font-medium text-slate-900 dark:text-white text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                        {cert.name}
                      </p>
                      <span className="text-slate-400 dark:text-slate-500 shrink-0">
                        <ExternalLinkIcon />
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {cert.issuer} · {cert.date}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-relaxed">{cert.desc}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
