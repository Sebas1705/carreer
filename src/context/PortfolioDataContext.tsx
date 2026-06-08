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

const EMPTY_PERSONAL: RawPersonal = {
  name: '', greeting: '', role: '', tagline: '', bio: '',
  email: '', location: '',
  social: { github: '', linkedin: '', codewars: '' },
  pillars: [],
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

// ── Data source ───────────────────────────────────────────────────────────────
// Default: fetches from public/data/ (same-origin static files).
// Override with VITE_DATA_URL in .env to point to any CDN or API.
//   Example: VITE_DATA_URL=https://cdn.example.com/my-portfolio-data
const DATA_BASE = (import.meta.env.VITE_DATA_URL as string | undefined)?.replace(/\/$/, '')
  ?? `${import.meta.env.BASE_URL}data`.replace('//', '/')

const CACHE_KEY = 'portfolio_data_v2'

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

    const get = (file: string) =>
      fetch(`${DATA_BASE}/${file}`).then(r => {
        if (!r.ok) throw new Error(`${file}: HTTP ${r.status}`)
        return r.json()
      })

    Promise.all([
      get('personal.json'),
      get('soft-skills.json'),
      get('skills.json'),
      get('jobs.json'),
      get('projects.json'),
      get('education.json'),
    ])
      .then(([personal, softSkills, skills, jobs, projects, education]) => {
        const loaded: PortfolioRawData = { personal, softSkills, skills, jobs, projects, education }
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
