import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const CodewarsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.008 0C5.37 0 0 5.368 0 12.004 0 18.638 5.37 24 12.008 24 18.64 24 24 18.638 24 12.004 24 5.368 18.64 0 12.008 0zm-1.073 16.5l-4.41-4.313 1.424-1.393 2.99 2.918 6.562-6.438 1.42 1.394z" />
  </svg>
)

export default function ContactSection() {
  const { t } = useTranslation()

  return (
    <section className="h-full w-full flex items-center justify-center px-5 sm:px-8 lg:px-12">
      <div className="max-w-2xl w-full text-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-5xl sm:text-6xl mb-5 sm:mb-7"
        >
          👋
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-3 sm:mb-4">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-3 sm:mb-4">
            {t('nav.contact')}
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('contact.title')}
          </h2>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-slate-500 dark:text-slate-400 mb-8 sm:mb-10 max-w-sm mx-auto text-sm sm:text-base leading-relaxed px-2">
          {t('contact.subtitle')}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-10">
          <a
            href="mailto:sebssgarcia502580@gmail.com"
            className="px-5 sm:px-7 py-2.5 sm:py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/30 text-sm touch-manipulation"
          >
            {t('contact.email_cta')}
          </a>
          <a
            href="https://github.com/Sebas1705"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 border border-slate-200 dark:border-slate-700 rounded-full font-semibold hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 hover:scale-105 active:scale-95 text-sm touch-manipulation"
          >
            <GitHubIcon />GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sebastián-ramiro-entrerrios-garcía-b1a713217/"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 border border-slate-200 dark:border-slate-700 rounded-full font-semibold hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 hover:scale-105 active:scale-95 text-sm touch-manipulation"
          >
            <LinkedInIcon />LinkedIn
          </a>
          <a
            href="https://www.codewars.com/users/Sebas1705"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 border border-slate-200 dark:border-slate-700 rounded-full font-semibold hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 hover:scale-105 active:scale-95 text-sm touch-manipulation"
          >
            <CodewarsIcon />Codewars
          </a>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-sm text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
          <span>📍</span>
          {t('contact.location')}
        </motion.p>

      </div>
    </section>
  )
}
