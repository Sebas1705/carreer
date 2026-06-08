import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface Props {
  /** i18n key for the small label above the title (e.g. 'nav.skills') */
  navKey: string
  /** i18n key for the main h2 title (e.g. 'skills.title') */
  titleKey: string
  className?: string
  /** Optional subtitle rendered below the title */
  subtitle?: string
}

/**
 * Animated section header: monospace nav badge + large bold h2.
 * Optional subtitle paragraph.
 */
export default function SectionHeader({ navKey, titleKey, className = '', subtitle }: Props) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-center ${className}`}
    >
      <p className="font-mono text-xs tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-2 sm:mb-3">
        {t(navKey)}
      </p>
      <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {t(titleKey)}
      </h2>
      {subtitle && (
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-lg leading-relaxed mt-4 sm:mt-5">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
