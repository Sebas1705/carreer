import { createContext, useContext, useEffect, useState } from 'react'
import type { ML } from '../lib/localize'

// ── Raw data types (mirrors public/data/*.json) ───────────────────────────────

export interface RawSkill {
  id: string
  name: string
  iconUrl?: string
  level: 1 | 2 | 3 | 4
  category: string
}

export interface RawJob {
  id: string
  role: ML
  company: string
  companyUrl: string
  period: ML
  type: ML
  desc: ML
  projects: ML[]
  achievements: ML[]
}

export interface RawProject {
  id: string
  name: string
  context: string
  desc: ML
  long_desc: ML
  tags: string[]
  github: string | null
  demo: string | null
}

export interface RawEduItem {
  degree: ML
  school: string
  period: ML
  detail: ML
  icon: string
}

export interface RawCert {
  name: ML
  issuer: string
  date: string
  desc: ML
  url: string
}

export interface RawSoftSkill {
  icon: string
  name: ML
}

export interface RawPillar {
  icon: string
  title: ML
  desc: ML
}

export interface RawPersonal {
  name: string
  greeting: ML
  role: ML
  tagline: ML
  bio: ML
  email: string
  location: ML
  cvUrl?: string
  social: {
    github: string
    linkedin: string
    codewars: string
  }
  pillars: RawPillar[]
}

// ── Aggregated portfolio data ─────────────────────────────────────────────────

export interface PortfolioRawData {
  personal:   RawPersonal
  softSkills: RawSoftSkill[]
  skills:     RawSkill[]
  jobs:       RawJob[]
  projects:   { work: RawProject[]; featured: RawProject[] }
  education:  { items: RawEduItem[]; certs: RawCert[] }
}

// ── Context ───────────────────────────────────────────────────────────────────

interface PortfolioContextValue extends PortfolioRawData {
  loading: boolean
  error: string | null
  reload: () => void
}

const PILLARS: RawPillar[] = [
  { icon: '🔭', title: { en: 'Curiosity', es: 'Curiosidad' }, desc: { en: 'I stay current with the latest tech developments and love exploring new ideas and tools.', es: 'Me mantengo al día con los últimos avances tecnológicos y disfruto explorando nuevas ideas y herramientas.' } },
  { icon: '⚡', title: { en: 'Constancy', es: 'Constancia' }, desc: { en: 'I sustain effort on complex, long-term projects, pushing through challenges with dedication.', es: 'Mantengo el esfuerzo en proyectos complejos y a largo plazo, superando desafíos con dedicación.' } },
  { icon: '🎯', title: { en: 'Responsibility', es: 'Responsabilidad' }, desc: { en: 'I deliver professional work with commitment, meeting standards with attention to detail.', es: 'Entrego trabajo profesional con compromiso, cumpliendo estándares con atención al detalle.' } },
]

const EMPTY_PERSONAL: RawPersonal = {
  name: '', greeting: '', role: '', tagline: '', bio: '',
  email: '', location: '',
  social: { github: '', linkedin: '', codewars: '' },
  pillars: PILLARS,
}

const defaultValue: PortfolioRawData = {
  personal:   EMPTY_PERSONAL,
  softSkills: [],
  skills:     [],
  jobs:       [],
  projects:   { work: [], featured: [] },
  education:  { items: [], certs: [] },
}

const PortfolioContext = createContext<PortfolioContextValue>({
  ...defaultValue,
  loading: true,
  error: null,
  reload: () => {},
})

// ── API config ────────────────────────────────────────────────────────────────
const API_BASE = (import.meta.env.VITE_CAREER_API_URL as string | undefined)?.replace(/\/$/, '')
  ?? 'https://career-api.sebas1705.workers.dev'

const CACHE_KEY = 'portfolio_data_v4'

// ── API response → portfolio shape adapters ───────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ml = (en: any, es: any): ML => ({ en: en ?? '', es: es ?? '' })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parse = (v: any) => { try { return typeof v === 'string' ? JSON.parse(v) : v } catch { return [] } }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptPersonal(raw: any): RawPersonal {
  return {
    name:     raw.name     ?? '',
    greeting: raw.greeting ?? ml('', ''),
    role:     raw.role     ?? ml('', ''),
    tagline:  raw.tagline  ?? ml('', ''),
    bio:      raw.bio      ?? ml('', ''),
    email:    raw.email    ?? '',
    location: raw.location ?? ml('', ''),
    cvUrl:    raw.cv_url   ?? undefined,
    social: {
      github:   raw.github   ?? '',
      linkedin: raw.linkedin ?? '',
      codewars: raw.codewars ?? '',
    },
    pillars: PILLARS,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptJobs(rows: any[]): RawJob[] {
  return rows.map(r => {
    // achievements: API returns { en: string[], es: string[] } → zip into ML[]
    const achEn: string[] = r.achievements?.en ?? []
    const achEs: string[] = r.achievements?.es ?? []
    const achievements: ML[] = achEn.map((en, i) => ml(en, achEs[i] ?? en))

    // projects: API returns string[] (project IDs / names) → wrap as ML[]
    const projectNames: string[] = Array.isArray(r.projects) ? r.projects : parse(r.projects)
    const projects: ML[] = projectNames.map(p => ml(p, p))

    return {
      id:         r.id,
      role:       r.role,
      company:    r.company,
      companyUrl: r.companyUrl,
      period:     r.period,
      type:       r.type,
      desc:       r.desc,
      projects,
      achievements,
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptProjects(rows: any[]): { work: RawProject[]; featured: RawProject[] } {
  const toProject = (r: any): RawProject => ({
    id:        r.id,
    name:      r.name,
    context:   r.context,
    desc:      r.desc,
    long_desc: r.long_desc,
    tags:      Array.isArray(r.tags) ? r.tags : parse(r.tags),
    github:    r.github ?? null,
    demo:      r.demo ?? null,
  })
  return {
    work:     rows.filter(r => r.context === 'work').map(toProject),
    featured: rows.filter(r => r.context !== 'work').map(toProject),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptEducation(eduRows: any[], certRows: any[]): { items: RawEduItem[]; certs: RawCert[] } {
  return {
    items: eduRows.map(r => ({
      degree: r.degree,
      school: r.school,
      period: r.period,
      detail: r.detail,
      icon:   ({ graduation: '🎓', university: '🎓', school: '🏫', master: '🎓' } as Record<string, string>)[r.icon] ?? r.icon ?? '🎓',
    })),
    certs: certRows.map(r => ({
      name:   r.name,
      issuer: r.issuer,
      date:   r.date,
      desc:   r.desc,
      url:    r.url,
    })),
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData]       = useState<PortfolioRawData>(defaultValue)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [tick, setTick]       = useState(0)

  const reload = () => {
    sessionStorage.removeItem(CACHE_KEY)
    setTick(t => t + 1)
  }

  useEffect(() => {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      try { setData(JSON.parse(cached)); setLoading(false); return }
      catch { sessionStorage.removeItem(CACHE_KEY) }
    }

    setLoading(true)
    setError(null)

    const get = (path: string) =>
      fetch(`${API_BASE}${path}`).then(r => {
        if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`)
        return r.json()
      })

    Promise.all([
      get('/personal'),
      get('/soft-skills'),
      get('/skills'),
      get('/jobs'),
      get('/projects'),
      get('/education'),
      get('/certifications'),
    ])
      .then(([personal, softSkillsRaw, skillsRaw, jobsRaw, projectsRaw, eduRaw, certsRaw]) => {
        const loaded: PortfolioRawData = {
          personal:   adaptPersonal(personal),
          softSkills: softSkillsRaw.map((s: any) => ({ icon: s.icon ?? '✦', name: s.name ?? ml('', '') })),
          skills:     skillsRaw.map((s: any) => ({ id: s.id, name: s.name, iconUrl: s.icon_url, level: s.level, category: s.category })),
          jobs:       adaptJobs(jobsRaw),
          projects:   adaptProjects(projectsRaw),
          education:  adaptEducation(eduRaw, certsRaw),
        }
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(loaded))
        setData(loaded)
        setLoading(false)
      })
      .catch(err => {
        console.error('[PortfolioData]', err)
        setError(err.message ?? 'Failed to load portfolio data')
        setLoading(false)
      })
  }, [tick])

  return (
    <PortfolioContext.Provider value={{ ...data, loading, error, reload }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolioData = () => useContext(PortfolioContext)
