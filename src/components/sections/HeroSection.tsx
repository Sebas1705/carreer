import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { SectionProps } from '../../types'

const ease = [0.22, 1, 0.36, 1] as const

const item = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease },
})

export default function HeroSection({ onNext }: SectionProps) {
  const { t } = useTranslation()

  return (
    <section className="h-full w-full overflow-y-auto md:overflow-hidden flex flex-col scroll-smooth overscroll-contain px-5 sm:px-8 lg:px-12">
      <div className="max-w-5xl w-full mx-auto my-auto py-20 md:py-0 text-center">

        <motion.p {...item(0.05)} className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-3 sm:mb-5">
          {t('hero.greeting')}
        </motion.p>

        <motion.h1
          {...item(0.15)}
          className="text-[2.75rem] sm:text-7xl lg:text-9xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3 sm:mb-5 leading-tight break-words hyphens-auto"
        >
          {t('hero.name')}
        </motion.h1>

        <motion.p
          {...item(0.25)}
          className="text-lg sm:text-2xl lg:text-4xl font-light text-violet-600 dark:text-violet-400 mb-5 sm:mb-7"
        >
          {t('hero.role')}
        </motion.p>

        <motion.p
          {...item(0.35)}
          className="text-slate-500 dark:text-slate-400 text-sm sm:text-lg max-w-xl mx-auto mb-8 sm:mb-12 leading-relaxed"
        >
          {t('hero.tagline')}
        </motion.p>

        <motion.div {...item(0.45)} className="flex flex-wrap gap-3 sm:gap-4 justify-center">
          <button
            onClick={onNext}
            className="px-6 sm:px-8 py-3 sm:py-3.5 bg-violet-600 hover:bg-violet-700 text-white rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/30 cursor-pointer text-sm sm:text-base touch-manipulation"
          >
            {t('hero.cta_work')}
          </button>
          <a
            href="mailto:sebssgarcia502580@gmail.com"
            className="px-6 sm:px-8 py-3 sm:py-3.5 border border-slate-200 dark:border-slate-700 rounded-full font-semibold hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base touch-manipulation"
          >
            {t('hero.cta_contact')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 sm:mt-14 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600"
        >
          <span className="text-xs tracking-widest uppercase">explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 10l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
