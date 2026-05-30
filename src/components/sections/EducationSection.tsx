import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface EduItem { degree: string; school: string; period: string; detail: string; icon: string }
interface Cert    { name: string; issuer: string; date: string; desc: string; url: string }

const CERTS_VISIBLE = 4

const ExternalLinkIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

export default function EducationSection() {
  const { t } = useTranslation()
  const items = t('education.items', { returnObjects: true }) as EduItem[]
  const certs = t('education.certs', { returnObjects: true }) as Cert[]
  const [showAllCerts, setShowAllCerts] = useState(false)
  const hiddenCount = certs.length - CERTS_VISIBLE

  return (
    <section className="h-full w-full overflow-y-auto md:overflow-hidden flex flex-col scroll-smooth overscroll-contain px-5 sm:px-8 lg:px-12">
      <div className="max-w-6xl w-full mx-auto my-auto py-20 md:py-0">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-3 sm:mb-4">
            {t('nav.education')}
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('education.title')}
          </h2>
        </motion.div>

        {/* On mobile: stack naturally; on lg: 2 columns side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

          {/* Academic items */}
          <div className="space-y-3 sm:space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-200 flex gap-3 sm:gap-4 items-start"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">{item.degree}</p>
                  <p className="text-violet-600 dark:text-violet-400 text-xs mt-1 font-medium">{item.school}</p>
                  <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">{item.period}</p>
                  {item.detail && <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 leading-relaxed">{item.detail}</p>}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3 sm:mb-4">
              {t('education.certifications')}
            </p>

            <div className="space-y-2 sm:space-y-2.5">
              {certs.slice(0, CERTS_VISIBLE).map((cert, i) => (
                <CertCard key={cert.url} cert={cert} delay={0.18 + i * 0.07} />
              ))}

              <AnimatePresence initial={false}>
                {showAllCerts && certs.slice(CERTS_VISIBLE).map((cert, i) => (
                  <motion.div
                    key={cert.url}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden pt-2 sm:pt-2.5"
                  >
                    <CertCard cert={cert} delay={0} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {hiddenCount > 0 && (
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                onClick={() => setShowAllCerts(v => !v)}
                className="mt-3 flex items-center gap-1.5 text-xs font-medium text-violet-500 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors cursor-pointer touch-manipulation"
              >
                <motion.span animate={{ rotate: showAllCerts ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-block">▾</motion.span>
                {showAllCerts ? t('education.show_less') : t('education.show_more', { count: hiddenCount })}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function CertCard({ cert, delay }: { cert: Cert; delay: number }) {
  return (
    <motion.a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-2.5 sm:gap-3 bg-slate-50 dark:bg-slate-900 rounded-xl p-3 sm:p-3.5 border border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-md hover:shadow-violet-500/5 transition-all duration-200 group"
    >
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-sm shrink-0">🏆</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="font-medium text-slate-900 dark:text-white text-xs group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate leading-snug">
            {cert.name}
          </p>
          <span className="text-slate-400 dark:text-slate-500 shrink-0"><ExternalLinkIcon /></span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{cert.issuer} · {cert.date}</p>
        <p className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed line-clamp-1 sm:line-clamp-2">{cert.desc}</p>
      </div>
    </motion.a>
  )
}
