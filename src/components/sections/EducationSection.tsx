import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePortfolioData } from '../../context/PortfolioDataContext'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeader from '../ui/SectionHeader'
import EduCard from '../ui/EduCard'
import CertCard from '../ui/CertCard'
import { EduCardSkeleton, CertCardSkeleton } from '../ui/Skeleton'

const CERTS_VISIBLE = 4

export default function EducationSection() {
  const { t } = useTranslation()
  const { education, loading } = usePortfolioData()
  const [showAllCerts, setShowAllCerts] = useState(false)

  const items = education.items ?? []
  const certs = education.certs ?? []
  const hiddenCount = certs.length - CERTS_VISIBLE

  return (
    <SectionWrapper maxWidth="max-w-6xl">
      <SectionHeader navKey="nav.education" titleKey="education.title" className="mb-6 sm:mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

        {/* Academic items */}
        <div className="space-y-3 sm:space-y-4">
          {loading
            ? [1, 2, 3].map(k => <EduCardSkeleton key={k} />)
            : items.map((item, i) => <EduCard key={i} item={item} index={i} />)
          }
        </div>

        {/* Certifications */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3 sm:mb-4">
            {t('education.certifications')}
          </p>

          {loading ? (
            <div className="space-y-2 sm:space-y-2.5">
              {[1, 2, 3, 4].map(k => <CertCardSkeleton key={k} />)}
            </div>
          ) : (
            <>
              <div className="space-y-2 sm:space-y-2.5">
                {certs.slice(0, CERTS_VISIBLE).map((cert, i) => (
                  <CertCard key={String(cert.url)} cert={cert} delay={0.18 + i * 0.07} />
                ))}

                <AnimatePresence initial={false}>
                  {showAllCerts && certs.slice(CERTS_VISIBLE).map((cert, i) => (
                    <motion.div key={String(cert.url)} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden pt-2 sm:pt-2.5">
                      <CertCard cert={cert} delay={0} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {hiddenCount > 0 && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                  onClick={() => setShowAllCerts(v => !v)}
                  className="mt-3 flex items-center gap-1.5 text-xs font-medium text-violet-500 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors cursor-pointer touch-manipulation">
                  <motion.span animate={{ rotate: showAllCerts ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-block">▾</motion.span>
                  {showAllCerts ? t('education.show_less') : t('education.show_more', { count: hiddenCount })}
                </motion.button>
              )}
            </>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
