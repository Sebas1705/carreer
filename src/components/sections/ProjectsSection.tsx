import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface Project {
  name: string
  desc: string
  tags: string[]
  github: string
}

const projectIcons = ['🖥️', '📱', '⚙️']

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

export default function ProjectsSection() {
  const { t } = useTranslation()
  const projects = t('projects.items', { returnObjects: true }) as Project[]

  return (
    <section className="h-full w-full flex items-center justify-center px-8">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-violet-600 dark:text-violet-400 mb-3">
            {t('nav.projects')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('projects.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="group bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 flex flex-col"
            >
              <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-2xl mb-5">
                {projectIcons[i]}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1 mb-4">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mt-auto"
              >
                <GitHubIcon />
                {t('projects.view_code')}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
