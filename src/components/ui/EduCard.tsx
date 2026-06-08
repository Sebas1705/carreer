import { motion } from 'framer-motion'
import type { RawEduItem } from '../../context/PortfolioDataContext'
import { localize } from '../../lib/localize'
import { useLang } from '../../hooks/useLang'

interface Props {
  item: RawEduItem
  index: number
}

/**
 * Academic education card (degree, school, period, detail).
 * Self-contained: reads language internally.
 */
export default function EduCard({ item, index }: Props) {
  const lang = useLang()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-800 transition-all duration-200 flex gap-3 sm:gap-4 items-start"
    >
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xl sm:text-2xl shrink-0">
        {item.icon}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">
          {localize(item.degree, lang)}
        </p>
        <p className="text-violet-600 dark:text-violet-400 text-xs mt-1 font-medium">
          {item.school}
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
          {localize(item.period, lang)}
        </p>
        {item.detail && (
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 leading-relaxed">
            {localize(item.detail, lang)}
          </p>
        )}
      </div>
    </motion.div>
  )
}
