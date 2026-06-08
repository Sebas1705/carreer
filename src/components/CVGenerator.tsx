import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioData } from '../context/PortfolioDataContext'
import { localize } from '../lib/localize'
import { useLang } from '../hooks/useLang'

// ── Role profiles ─────────────────────────────────────────────────────────────
type RoleId = 'fullstack' | 'mobile' | 'backend' | 'frontend'

interface RoleProfile {
  labelEn: string
  labelEs: string
  tabEn: string
  tabEs: string
  // Keyword tags shown under the title (ATS bait + human scan)
  keywordsEn: string[]
  keywordsEs: string[]
  // Concise, quantified, action-verb summary
  summaryEn: string
  summaryEs: string
  prioritySkillIds: string[]
  projectIds: string[]
  maxCerts: number
}

const ROLES: Record<RoleId, RoleProfile> = {
  fullstack: {
    labelEn: 'Full Stack & Mobile Developer',
    labelEs: 'Desarrollador Full Stack & Móvil',
    tabEn: 'Full Stack',
    tabEs: 'Full Stack',
    keywordsEn: ['Kotlin', 'TypeScript', 'C#', 'React', '.NET', 'Jetpack Compose', 'Docker', 'Microservices', 'CI/CD', 'Azure'],
    keywordsEs: ['Kotlin', 'TypeScript', 'C#', 'React', '.NET', 'Jetpack Compose', 'Docker', 'Microservicios', 'CI/CD', 'Azure'],
    summaryEn:
      'Full Stack & Mobile Developer with 2+ years of production experience at Solusoft (Madrid, Hybrid). Promoted from Junior to Senior in recognition of technical ownership and leadership. Delivered two native Android apps to Google Play Store — EPDM Music Portal (built from scratch) and Iberext (migrated from legacy Windows). Proficient across the full stack: Kotlin/Jetpack Compose, .NET/C#, React/TypeScript, SQL Server and Azure. Master\'s TFM: AxiomNode — a 16-repository microservices platform with AI engine (Python/LLM), mobile client (Kotlin/Compose) and DevSecOps pipeline (Docker, Kubernetes, 90% test coverage, CodeQL SAST, Trivy SCA).',
    summaryEs:
      'Desarrollador Full Stack & Móvil con más de 2 años de experiencia en producción en Solusoft (Madrid, Híbrido). Promocionado de Junior a Senior por liderazgo técnico y ownership demostrado. Publicadas dos apps Android nativas en Google Play Store — EPDM Portal Musical (desde cero) e Iberext (migración desde Windows legacy). Dominio completo de la pila: Kotlin/Jetpack Compose, .NET/C#, React/TypeScript, SQL Server y Azure. TFM del Máster: AxiomNode — plataforma de 16 repositorios con motor de IA (Python/LLM), cliente móvil (Kotlin/Compose) y pipeline DevSecOps (Docker, Kubernetes, 90% cobertura, CodeQL SAST, Trivy SCA).',
    prioritySkillIds: ['kotlin','typescript','csharp','javascript','java','jetpack-compose','react','dotnet','spring-boot','tailwindcss','docker','docker-compose','kubernetes','git','sqlserver','sql','postgresql','mongodb','firebase','azure','mvvm','mvc','microservices','bff','clean-architecture','multimodular-mixed','adr','scrum','tdd','devsecops','owasp','solid','prompt-engineering','copilot','llmops'],
    projectIds: ['epdm','iberext','axiomnode','youknow','agedi','sisley','vpslocalorchestrator'],
    maxCerts: 5,
  },
  mobile: {
    labelEn: 'Android Developer',
    labelEs: 'Desarrollador Android',
    tabEn: 'Android',
    tabEs: 'Android',
    keywordsEn: ['Kotlin', 'Jetpack Compose', 'MVVM', 'MVI', 'Clean Architecture', 'Firebase', 'Multi-Module', 'Google Play Store', 'Android Studio', 'Coroutines'],
    keywordsEs: ['Kotlin', 'Jetpack Compose', 'MVVM', 'MVI', 'Arquitectura Limpia', 'Firebase', 'Multi-Módulo', 'Google Play Store', 'Android Studio', 'Coroutines'],
    summaryEn:
      'Android Developer with 2+ years of production experience at Solusoft (Madrid, Hybrid). Full ownership of two Google Play Store apps: EPDM Music Portal (built from scratch in Kotlin/Jetpack Compose) and Iberext fire-prevention app (migrated from legacy Windows tablet). Expert in multimodular clean architecture (MVVM/MVI), Firebase (Auth, Firestore, Storage), Gradle convention plugins and the full Android development lifecycle. Promoted to Senior role in January 2026. Master\'s TFM contribution: native Android client for AxiomNode platform with Google Sign-In, Firebase Auth and offline/online game modes.',
    summaryEs:
      'Desarrollador Android con más de 2 años de experiencia en producción en Solusoft (Madrid, Híbrido). Ownership completo de dos apps en Google Play Store: EPDM Portal Musical (construida desde cero en Kotlin/Jetpack Compose) e Iberext (migración desde tablet Windows legacy). Experto en arquitectura limpia multimodular (MVVM/MVI), Firebase (Auth, Firestore, Storage), plugins de convención Gradle y el ciclo completo de desarrollo Android. Promocionado a Senior en enero 2026. TFM del Máster: cliente Android nativo para la plataforma AxiomNode con Google Sign-In, Firebase Auth y modos de juego offline/online.',
    prioritySkillIds: ['kotlin','java','jetpack-compose','firebase','mvvm','mvi','clean-architecture','multimodular-mixed','multimodular-feature','android-studio','gradle','git','sqlserver','sql','figma','scrum','agile','copilot','chatgpt'],
    projectIds: ['epdm','iberext','youknow','impostor'],
    maxCerts: 4,
  },
  backend: {
    labelEn: 'Backend Developer',
    labelEs: 'Desarrollador Backend',
    tabEn: 'Backend',
    tabEs: 'Backend',
    keywordsEn: ['C#', '.NET', 'REST API', 'SQL Server', 'Docker', 'Azure', 'Spring Boot', 'Node.js', 'Microservices', 'RBAC'],
    keywordsEs: ['C#', '.NET', 'API REST', 'SQL Server', 'Docker', 'Azure', 'Spring Boot', 'Node.js', 'Microservicios', 'RBAC'],
    summaryEn:
      'Backend Developer with 2+ years building and maintaining production enterprise APIs at Solusoft (Madrid, Hybrid). Core technologies: C# / .NET (MVC, Web API), SQL Server and Azure. Experience with Spring Boot, Node.js/TypeScript and Python (FastAPI). Master\'s TFM: AxiomNode — microservices platform (TypeScript/Node.js) with API Gateway, BFF pattern, RBAC, AES encryption, audit logging, distributed tracing, 555 automated tests across 23 suites, CodeQL SAST and Trivy SCA. Docker and Kubernetes deployments managed via centralised CI/CD (GitHub Actions).',
    summaryEs:
      'Desarrollador Backend con más de 2 años construyendo y manteniendo APIs empresariales en producción en Solusoft (Madrid, Híbrido). Tecnologías principales: C# / .NET (MVC, Web API), SQL Server y Azure. Experiencia con Spring Boot, Node.js/TypeScript y Python (FastAPI). TFM del Máster: AxiomNode — plataforma de microservicios (TypeScript/Node.js) con API Gateway, patrón BFF, RBAC, cifrado AES, auditoría, trazabilidad distribuida, 555 tests en 23 suites, CodeQL SAST y Trivy SCA. Despliegues Docker y Kubernetes gestionados mediante CI/CD centralizado (GitHub Actions).',
    prioritySkillIds: ['csharp','java','kotlin','typescript','python','dotnet','spring-boot','spring','nodejs','fastapi','express','sqlserver','sql','mysql','postgresql','mongodb','docker','docker-compose','kubernetes','azure','firebase','mvc','clean-architecture','microservices','bff','hexagonal','event-driven','adr','git','postman','scrum','agile'],
    projectIds: ['agedi','sisley','axiomnode','vpslocalorchestrator','iberext','epdm'],
    maxCerts: 4,
  },
  frontend: {
    labelEn: 'Frontend Developer',
    labelEs: 'Desarrollador Frontend',
    tabEn: 'Frontend',
    tabEs: 'Frontend',
    keywordsEn: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Astro', 'Next.js', 'Accessibility', 'Playwright', 'Vitest', 'CI/CD'],
    keywordsEs: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Astro', 'Next.js', 'Accesibilidad', 'Playwright', 'Vitest', 'CI/CD'],
    summaryEn:
      'Frontend Developer with experience building enterprise web interfaces (C# / .NET + JavaScript) and modern SPAs. Portfolio site built with Astro/TypeScript and Clean Architecture, achieving 100% Vitest unit test coverage, 91.66% branch coverage, Playwright E2E tests and automated CI/CD deployment. Master\'s TFM: React/TypeScript backoffice for AxiomNode platform with role-based access control (SuperAdmin, Admin, Inspector, Viewer, Gamer), Playwright E2E smoke tests and API integration via BFF pattern.',
    summaryEs:
      'Desarrollador Frontend con experiencia construyendo interfaces web empresariales (C# / .NET + JavaScript) y SPAs modernas. Portfolio construido con Astro/TypeScript y Arquitectura Limpia, con 100% de cobertura unitaria Vitest, 91.66% de ramas, tests e2e Playwright y despliegue CI/CD automatizado. TFM del Máster: backoffice React/TypeScript para la plataforma AxiomNode con control de acceso basado en roles (SuperAdmin, Admin, Inspector, Viewer, Gamer), tests E2E Playwright y integración de API mediante patrón BFF.',
    prioritySkillIds: ['typescript','javascript','html','css','react','tailwindcss','astro','vite','nextjs','vue','reactnative','figma','playwright','vitest','git','npm','docker','github','gitlab','scrum','copilot'],
    projectIds: ['portfolio','axiomnode','agedi','sisley'],
    maxCerts: 3,
  },
}

const ROLE_IDS: RoleId[] = ['fullstack', 'mobile', 'backend', 'frontend']

// ── Spoken languages (static, not in data) ───────────────────────────────────
const SPOKEN_LANGS = {
  en: [
    { lang: 'Spanish', level: 'Native (C2)' },
    { lang: 'English',  level: 'Professional working proficiency (B2)' },
  ],
  es: [
    { lang: 'Español', level: 'Nativo (C2)' },
    { lang: 'Inglés',  level: 'Competencia profesional (B2)' },
  ],
}

// ── Category labels ───────────────────────────────────────────────────────────
const CAT_LABEL: Record<string, { en: string; es: string }> = {
  languages:    { en: 'Programming Languages', es: 'Lenguajes' },
  frameworks:   { en: 'Frameworks & Libraries', es: 'Frameworks' },
  tools:        { en: 'Tools & DevOps',         es: 'Herramientas & DevOps' },
  databases:    { en: 'Databases',              es: 'Bases de datos' },
  cloud:        { en: 'Cloud',                  es: 'Cloud' },
  architecture: { en: 'Architecture & Patterns','es': 'Arquitectura' },
  methodologies:{ en: 'Methodologies',          es: 'Metodologías' },
  ides:         { en: 'IDEs',                   es: 'IDEs' },
  os:           { en: 'OS',                     es: 'SO' },
  ai:           { en: 'AI Tools',               es: 'Herramientas IA' },
}

// ── Print helper ──────────────────────────────────────────────────────────────
function printCV(html: string, uiLang: string) {
  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(`<!DOCTYPE html>
<html lang="${uiLang}">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width"/>
<title>CV – Sebastián Ramiro Entrerrios García</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0 }

  body {
    font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 10.5pt;
    color: #1e293b;
    background: #fff;
    line-height: 1.45;
    padding: 18mm 16mm;
  }

  /* ── Header ── */
  .cv-header { display: flex; gap: 16px; align-items: flex-start; }
  .cv-photo {
    width: 76px; height: 76px; border-radius: 50%; object-fit: cover;
    border: 2.5px solid #7c3aed; flex-shrink: 0;
  }
  .cv-header-text { flex: 1; min-width: 0; }
  .cv-name { font-size: 22pt; font-weight: 800; color: #1e293b; letter-spacing: -0.03em; }
  .cv-title { font-size: 12pt; font-weight: 600; color: #7c3aed; margin-top: 2px; }
  .cv-contact {
    display: flex; flex-wrap: wrap; gap: 4px 18px;
    margin-top: 6px; font-size: 8.5pt; color: #475569;
    border-top: 1.5px solid #7c3aed; padding-top: 6px; margin-top: 6px;
  }
  .cv-contact a { color: #475569; text-decoration: none; }
  .cv-keywords {
    display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px;
  }
  .cv-kw {
    background: #f5f3ff; color: #6d28d9; border: 1px solid #ddd6fe;
    border-radius: 3px; padding: 1px 7px; font-size: 8pt; font-weight: 600;
  }

  /* ── Sections ── */
  h2 {
    font-size: 8pt; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.12em; color: #7c3aed;
    border-bottom: 1px solid #ede9fe; padding-bottom: 2px;
    margin: 14px 0 7px;
  }

  /* ── Experience ── */
  .job { margin-bottom: 10px; }
  .job-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  .job-title { font-size: 10pt; font-weight: 700; color: #1e293b; }
  .job-company { font-weight: 600; color: #7c3aed; }
  .job-meta { font-size: 8.5pt; color: #64748b; white-space: nowrap; }
  .job-sub { font-size: 8.5pt; color: #64748b; margin-top: 1px; }
  .job ul { margin: 5px 0 0 14px; }
  .job li { font-size: 9pt; color: #334155; margin-bottom: 2px; }
  .job-projs { font-size: 8.5pt; color: #64748b; margin-top: 3px; }
  .job-projs strong { color: #475569; }

  /* ── Skills ── */
  .skill-row { display: flex; gap: 6px; margin-bottom: 4px; align-items: baseline; }
  .skill-cat { font-size: 8pt; font-weight: 700; color: #475569; width: 140px; flex-shrink: 0; }
  .skill-list { font-size: 9pt; color: #1e293b; }

  /* ── Projects ── */
  .project { margin-bottom: 8px; }
  .proj-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  .proj-name { font-size: 9.5pt; font-weight: 700; color: #1e293b; }
  .proj-name a { color: #7c3aed; text-decoration: none; font-weight: 400; font-size: 8.5pt; }
  .proj-ctx { font-size: 8pt; color: #94a3b8; text-transform: capitalize; }
  .proj-desc { font-size: 8.5pt; color: #475569; margin-top: 2px; }

  /* ── Education ── */
  .edu-item { margin-bottom: 8px; }
  .edu-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  .edu-deg { font-size: 9.5pt; font-weight: 700; color: #1e293b; }
  .edu-period { font-size: 8.5pt; color: #64748b; white-space: nowrap; }
  .edu-school { font-size: 8.5pt; color: #475569; margin-top: 1px; }
  .edu-detail { font-size: 8pt; color: #94a3b8; margin-top: 1px; }

  /* ── Certs ── */
  .cert-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin-bottom: 4px; }
  .cert-name { font-size: 9pt; color: #334155; font-weight: 500; }
  .cert-name a { color: #7c3aed; text-decoration: none; }
  .cert-meta { font-size: 8pt; color: #94a3b8; white-space: nowrap; }

  /* ── Languages ── */
  .lang-row { display: flex; gap: 24px; flex-wrap: wrap; }
  .lang-item { font-size: 9pt; color: #334155; }
  .lang-item strong { color: #1e293b; }

  /* ── Print ── */
  @media print {
    @page { size: A4; margin: 14mm 13mm; }
    body { padding: 0; }
    a { color: inherit !important; }
  }
</style>
</head>
<body>${html}</body>
</html>`)
  win.document.close()
  setTimeout(() => win.print(), 350)
}

// ── Main component ────────────────────────────────────────────────────────────
interface Props { onClose: () => void }

export default function CVGenerator({ onClose }: Props) {
  const lang = useLang()
  const { personal, skills, jobs, projects, education, loading } = usePortfolioData()
  const [role, setRole] = useState<RoleId>('fullstack')

  const profile = ROLES[role]
  const loc = (v: unknown) => localize(v as Parameters<typeof localize>[0], lang)
  const isEs = lang === 'es'

  // Filtered & ordered skills
  const cvSkills = profile.prioritySkillIds
    .map(id => skills.find(s => s.id === id))
    .filter(Boolean) as typeof skills

  const skillGroups: Record<string, string[]> = {}
  cvSkills.forEach(s => {
    if (!skillGroups[s.category]) skillGroups[s.category] = []
    skillGroups[s.category].push(s.name)
  })

  // Merge cloud+databases, enforce fixed display order
  const CV_ROW_ORDER = [
    { key: 'languages',    cats: ['languages'],                label: { en: 'Programming Languages', es: 'Lenguajes' } },
    { key: 'frameworks',   cats: ['frameworks'],               label: { en: 'Frameworks & Libraries', es: 'Frameworks' } },
    { key: 'tools',        cats: ['tools'],                    label: { en: 'Tools & DevOps',         es: 'Herramientas & DevOps' } },
    { key: 'clouddb',      cats: ['databases', 'cloud'],       label: { en: 'Cloud & Databases',      es: 'Cloud & Bases de datos' } },
    { key: 'architecture', cats: ['architecture'],             label: { en: 'Architecture',            es: 'Arquitectura' } },
    { key: 'methodologies',cats: ['methodologies'],            label: { en: 'Methodologies',           es: 'Metodologías' } },
    { key: 'ai',           cats: ['ai', 'ides', 'os'],         label: { en: 'AI & Tools',              es: 'IA y Herramientas' } },
  ] as const
  const skillRows = CV_ROW_ORDER
    .map(row => ({ ...row, names: row.cats.flatMap(c => skillGroups[c] ?? []) }))
    .filter(row => row.names.length > 0)

  // Projects
  const allProjects = [...(projects.work ?? []), ...(projects.featured ?? [])]
  const cvProjects = profile.projectIds
    .map(id => allProjects.find(p => p.id === id))
    .filter(Boolean) as typeof allProjects

  const cvCerts = (education.certs ?? []).slice(0, profile.maxCerts)
  const spokenLangs = SPOKEN_LANGS[isEs ? 'es' : 'en']
  const keywords = isEs ? profile.keywordsEs : profile.keywordsEn
  const summary  = isEs ? profile.summaryEs : profile.summaryEn
  const roleTitle = isEs ? profile.labelEs : profile.labelEn

  // ── Build print HTML ────────────────────────────────────────────────────────
  const buildPrintHTML = () => {
    const contactItems = [
      `<a href="mailto:${personal.email}">${personal.email}</a>`,
      personal.social?.linkedin
        ? `<a href="${personal.social.linkedin}">linkedin.com/in/sebastián-ramiro-entrerrios-garcía-b1a713217</a>`
        : '',
      personal.social?.github
        ? `<a href="${personal.social.github}">github.com/Sebas1705</a>`
        : '',
      `📍 ${loc(personal.location)}`,
    ].filter(Boolean).join(' &nbsp;|&nbsp; ')

    const kwHTML = keywords.map(k => `<span class="cv-kw">${k}</span>`).join('')

    const jobsHTML = jobs.map(j => {
      const bullets = (j.achievements ?? []).map(a => `<li>${loc(a)}</li>`).join('')
      const projs   = (j.projects ?? []).map(p => loc(p)).join(', ')
      return `<div class="job">
        <div class="job-row">
          <span class="job-title">${loc(j.role)}</span>
          <span class="job-meta">${loc(j.period)} · ${loc(j.type)}</span>
        </div>
        <div class="job-sub"><span class="job-company">${j.company}</span></div>
        <div class="job-sub" style="margin-top:2px">${loc(j.desc)}</div>
        ${bullets ? `<ul>${bullets}</ul>` : ''}
        ${projs ? `<div class="job-projs"><strong>${isEs ? 'Proyectos' : 'Products'}:</strong> ${projs}</div>` : ''}
      </div>`
    }).join('')

    const skillsHTML = skillRows.map(row => {
      return `<div class="skill-row"><span class="skill-cat">${row.label[lang]}:</span><span class="skill-list">${row.names.join(', ')}</span></div>`
    }).join('')

    const projsHTML = cvProjects.slice(0, 5).map(p => {
      const links = [
        p.github ? `<a href="${p.github}">GitHub ↗</a>` : '',
        p.demo   ? `<a href="${p.demo}">Demo ↗</a>`     : '',
      ].filter(Boolean).join(' · ')
      const tags = (p.tags ?? []).slice(0, 6).join(', ')
      return `<div class="project">
        <div class="proj-row">
          <span class="proj-name">${p.name}${links ? ` &nbsp;${links}` : ''}</span>
          <span class="proj-ctx">${p.context}</span>
        </div>
        <div class="proj-desc">${loc(p.desc)}</div>
        ${tags ? `<div class="proj-desc" style="color:#94a3b8;margin-top:1px">${tags}</div>` : ''}
      </div>`
    }).join('')

    const eduHTML = (education.items ?? []).map(e => `
      <div class="edu-item">
        <div class="edu-row">
          <span class="edu-deg">${loc(e.degree)}</span>
          <span class="edu-period">${loc(e.period)}</span>
        </div>
        <div class="edu-school">${e.school}</div>
        <div class="edu-detail">${loc(e.detail)}</div>
      </div>`).join('')

    const certsHTML = cvCerts.map(c => `
      <div class="cert-row">
        <span class="cert-name"><a href="${c.url}">${loc(c.name)}</a></span>
        <span class="cert-meta">${c.issuer} · ${c.date}</span>
      </div>`).join('')

    const langsHTML = `<div class="lang-row">${spokenLangs.map(l =>
      `<div class="lang-item"><strong>${l.lang}:</strong> ${l.level}</div>`
    ).join('')}</div>`

    const expLabel  = isEs ? 'Experiencia Profesional' : 'Professional Experience'
    const skillsLbl = isEs ? 'Habilidades Técnicas'    : 'Technical Skills'
    const projsLbl  = isEs ? 'Proyectos Destacados'    : 'Key Projects'
    const eduLbl    = isEs ? 'Formación Académica'      : 'Education'
    const certsLbl  = isEs ? 'Certificaciones'          : 'Certifications'
    const langsLbl  = isEs ? 'Idiomas'                  : 'Languages'
    const profileLbl= isEs ? 'Perfil Profesional'       : 'Professional Profile'

    const githubUser = personal.social?.github?.split('/').pop() ?? ''
    const avatarUrl  = githubUser ? `https://avatars.githubusercontent.com/${githubUser}` : ''

    return `
      <div class="cv-header">
        ${avatarUrl ? `<img class="cv-photo" src="${avatarUrl}" alt="photo" />` : ''}
        <div class="cv-header-text">
          <div class="cv-name">Sebastián Ramiro Entrerrios García</div>
          <div class="cv-title">${roleTitle}</div>
          <div class="cv-contact">${contactItems}</div>
          <div class="cv-keywords">${kwHTML}</div>
        </div>
      </div>

      <h2>${profileLbl}</h2>
      <p style="font-size:9.5pt;color:#334155;line-height:1.5">${summary}</p>

      <h2>${expLabel}</h2>
      ${jobsHTML}

      <h2>${skillsLbl}</h2>
      ${skillsHTML}

      <h2>${projsLbl}</h2>
      ${projsHTML}

      <h2>${eduLbl}</h2>
      ${eduHTML}

      ${certsHTML ? `<h2>${certsLbl}</h2>${certsHTML}` : ''}

      <h2>${langsLbl}</h2>
      ${langsHTML}
    `
  }

  // ── Preview render ──────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        data-modal
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm"
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {isEs ? 'Generador de CV' : 'CV Generator'}
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                {isEs ? 'Optimizado para ATS y procesos de selección actuales' : 'Optimised for ATS and modern recruitment processes'}
              </p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Role tabs */}
          <div className="flex gap-2 px-5 py-3 border-b border-slate-100 dark:border-slate-800 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {ROLE_IDS.map(r => (
              <button key={r} onClick={() => setRole(r)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap border ${role === r ? 'bg-violet-100 text-violet-800 border-violet-400 shadow-sm dark:bg-violet-600 dark:text-white dark:border-violet-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'}`}>
                {isEs ? ROLES[r].tabEs : ROLES[r].tabEn}
              </button>
            ))}
          </div>

          {/* CV Preview */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6" style={{ scrollbarWidth: 'thin' }}>
            {loading ? (
              <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
                {isEs ? 'Cargando datos…' : 'Loading data…'}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm font-['Segoe_UI',sans-serif]">

                {/* Name + title */}
                <div className="pb-4 border-b-2 border-violet-600 flex gap-4 items-start">
                  {/* Avatar */}
                  {personal.social?.github && (() => {
                    const user = personal.social.github.split('/').pop()
                    return user ? (
                      <img
                        src={`https://avatars.githubusercontent.com/${user}`}
                        alt="photo"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-violet-500 flex-shrink-0"
                      />
                    ) : null
                  })()}

                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      Sebastián Ramiro Entrerrios García
                    </h1>
                    <p className="text-sm font-semibold text-violet-700 mt-0.5">{roleTitle}</p>

                    {/* Contact */}
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-[10px] text-slate-500">
                      <a href={`mailto:${personal.email}`} className="hover:text-violet-600">{personal.email}</a>
                      {personal.social?.linkedin && (
                        <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-violet-600">
                          LinkedIn ↗
                        </a>
                      )}
                      {personal.social?.github && (
                        <a href={personal.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-violet-600">
                          github.com/Sebas1705
                        </a>
                      )}
                      <span>📍 {loc(personal.location)}</span>
                    </div>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {keywords.map(k => (
                        <span key={k} className="text-[9px] font-semibold px-1.5 py-0.5 bg-violet-50 text-violet-700 border border-violet-200 rounded">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Profile */}
                <section className="mt-4 mb-4">
                  <h2 className="text-[9px] font-bold uppercase tracking-[0.12em] text-violet-700 border-b border-violet-100 pb-1 mb-2">
                    {isEs ? 'Perfil Profesional' : 'Professional Profile'}
                  </h2>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{summary}</p>
                </section>

                {/* Experience */}
                <section className="mb-4">
                  <h2 className="text-[9px] font-bold uppercase tracking-[0.12em] text-violet-700 border-b border-violet-100 pb-1 mb-3">
                    {isEs ? 'Experiencia Profesional' : 'Professional Experience'}
                  </h2>
                  <div className="space-y-4">
                    {jobs.map(j => (
                      <div key={j.id}>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[11px] font-bold text-slate-900">{loc(j.role)}</span>
                          <span className="text-[9px] text-slate-400 whitespace-nowrap flex-shrink-0">{loc(j.period)} · {loc(j.type)}</span>
                        </div>
                        <a href={j.companyUrl} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] font-semibold text-violet-600 hover:underline">{j.company}</a>
                        <p className="text-[10px] text-slate-500 mt-0.5 italic">{loc(j.desc)}</p>
                        {j.achievements?.length > 0 && (
                          <ul className="mt-1.5 space-y-0.5 list-disc list-inside">
                            {j.achievements.map((a, i) => (
                              <li key={i} className="text-[10px] text-slate-700">{loc(a)}</li>
                            ))}
                          </ul>
                        )}
                        {j.projects?.length > 0 && (
                          <p className="text-[9px] text-slate-400 mt-1">
                            <strong className="text-slate-500">{isEs ? 'Productos' : 'Products'}:</strong>{' '}
                            {j.projects.map(p => loc(p)).join(', ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Technical skills — inline comma format (ATS-friendly) */}
                <section className="mb-4">
                  <h2 className="text-[9px] font-bold uppercase tracking-[0.12em] text-violet-700 border-b border-violet-100 pb-1 mb-2">
                    {isEs ? 'Habilidades Técnicas' : 'Technical Skills'}
                  </h2>
                  <div className="space-y-1">
                    {skillRows.map(row => (
                      <div key={row.key} className="flex gap-2 items-baseline">
                        <span className="text-[9px] font-bold text-slate-500 w-36 flex-shrink-0">
                          {row.label[lang]}:
                        </span>
                        <span className="text-[10px] text-slate-700">{row.names.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Projects */}
                <section className="mb-4">
                  <h2 className="text-[9px] font-bold uppercase tracking-[0.12em] text-violet-700 border-b border-violet-100 pb-1 mb-3">
                    {isEs ? 'Proyectos Destacados' : 'Key Projects'}
                  </h2>
                  <div className="space-y-3">
                    {cvProjects.slice(0, 5).map(p => (
                      <div key={p.id}>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[11px] font-bold text-slate-900">
                            {p.name}
                            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="ml-2 text-violet-500 font-normal text-[9px] hover:underline">GitHub ↗</a>}
                            {p.demo   && <a href={p.demo}   target="_blank" rel="noopener noreferrer" className="ml-1 text-violet-500 font-normal text-[9px] hover:underline">Demo ↗</a>}
                          </span>
                          <span className="text-[9px] text-slate-400 capitalize whitespace-nowrap flex-shrink-0">{p.context}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5">{loc(p.desc)}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">{(p.tags ?? []).slice(0, 7).join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section className="mb-4">
                  <h2 className="text-[9px] font-bold uppercase tracking-[0.12em] text-violet-700 border-b border-violet-100 pb-1 mb-3">
                    {isEs ? 'Formación Académica' : 'Education'}
                  </h2>
                  <div className="space-y-2.5">
                    {(education.items ?? []).map((e, i) => (
                      <div key={i}>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[11px] font-bold text-slate-900">{loc(e.degree)}</span>
                          <span className="text-[9px] text-slate-400 whitespace-nowrap flex-shrink-0">{loc(e.period)}</span>
                        </div>
                        <p className="text-[10px] text-slate-600 font-medium">{e.school}</p>
                        <p className="text-[9px] text-slate-400">{loc(e.detail)}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Certifications */}
                {cvCerts.length > 0 && (
                  <section className="mb-4">
                    <h2 className="text-[9px] font-bold uppercase tracking-[0.12em] text-violet-700 border-b border-violet-100 pb-1 mb-2">
                      {isEs ? 'Certificaciones' : 'Certifications'}
                    </h2>
                    <div className="space-y-1.5">
                      {cvCerts.map((c, i) => (
                        <div key={i} className="flex items-baseline justify-between gap-2">
                          <a href={c.url} target="_blank" rel="noopener noreferrer"
                            className="text-[10px] text-violet-600 hover:underline font-medium">{loc(c.name)}</a>
                          <span className="text-[9px] text-slate-400 whitespace-nowrap flex-shrink-0">{c.issuer} · {c.date}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Languages */}
                <section>
                  <h2 className="text-[9px] font-bold uppercase tracking-[0.12em] text-violet-700 border-b border-violet-100 pb-1 mb-2">
                    {isEs ? 'Idiomas' : 'Languages'}
                  </h2>
                  <div className="flex flex-wrap gap-x-8 gap-y-1">
                    {spokenLangs.map(l => (
                      <div key={l.lang} className="text-[10px] text-slate-700">
                        <strong>{l.lang}:</strong> {l.level}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              {isEs
                ? '💡 Optimizado para ATS · Se abrirá ventana para guardar como PDF'
                : '💡 ATS-optimised · A new window will open to save as PDF'}
            </p>
            <div className="flex gap-2">
              <button onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                {isEs ? 'Cerrar' : 'Close'}
              </button>
              <button onClick={() => printCV(buildPrintHTML(), lang)} disabled={loading}
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer">
                {isEs ? '⬇ Descargar / Imprimir' : '⬇ Download / Print'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
