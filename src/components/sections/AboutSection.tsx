import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const pillars = ['curiosity', 'constancy', 'responsibility'] as const
const icons = ['🔭', '⚡', '🎯']

export default function AboutSection() {
  const { t } = useTranslation()

  return (
    <section className="h-full w-full overflow-y-auto md:overflow-hidden flex flex-col scroll-smooth overscroll-contain px-5 sm:px-8 lg:px-12">
      <div className="max-w-5xl w-full mx-auto my-auto py-20 md:py-0">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-3 sm:mb-4">
            {t('nav.about')}
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 sm:mb-5 tracking-tight">
            {t('about.title')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-lg leading-relaxed">
            {t('about.bio')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 sm:p-7 border border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 group"
            >
              <span className="text-3xl sm:text-4xl mb-4 sm:mb-5 block">{icons[i]}</span>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {t(`about.pillars.${pillar}.title`)}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t(`about.pillars.${pillar}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
