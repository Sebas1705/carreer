import { useState } from 'react'
import type { RawSkill } from '../../context/PortfolioDataContext'
import { useLang } from '../../hooks/useLang'

const LEVEL_LABEL: Record<number, { en: string; es: string }> = {
  1: { en: 'Basic',      es: 'Básico' },
  2: { en: 'Familiar',   es: 'Conocimiento' },
  3: { en: 'Proficient', es: 'Competente' },
  4: { en: 'Advanced',   es: 'Avanzado' },
  5: { en: 'Expert',     es: 'Experto' },
}

const CAT_LABEL: Record<string, { en: string; es: string }> = {
  languages:     { en: 'Language',    es: 'Lenguaje' },
  frameworks:    { en: 'Framework',   es: 'Framework' },
  tools:         { en: 'Tool',        es: 'Herramienta' },
  databases:     { en: 'Database',    es: 'Base de datos' },
  cloud:         { en: 'Cloud',       es: 'Cloud' },
  architecture:  { en: 'Architecture',es: 'Arquitectura' },
  methodologies: { en: 'Methodology', es: 'Metodología' },
  ai:            { en: 'AI',          es: 'IA' },
  ides:          { en: 'IDE',         es: 'IDE' },
  os:            { en: 'OS',          es: 'SO' },
}

interface Props {
  skill: RawSkill
  chipClass: string
}

export default function SkillChip({ skill, chipClass }: Props) {
  const lang = useLang()
  const [imgOk, setImgOk] = useState(true)
  const [show, setShow] = useState(false)

  const levelLabel = LEVEL_LABEL[skill.level]?.[lang] ?? ''
  const catLabel   = CAT_LABEL[skill.category]?.[lang] ?? skill.category

  return (
    <span
      className={`relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium select-none cursor-pointer transition-all duration-150 hover:scale-105 active:scale-95 hover:shadow-md ${chipClass}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={e => { e.stopPropagation(); setShow(s => !s) }}
    >
      {/* Icon */}
      {skill.iconUrl && imgOk ? (
        <img
          src={skill.iconUrl}
          alt=""
          className="w-4 h-4 object-contain shrink-0"
          onError={() => setImgOk(false)}
        />
      ) : (
        <span className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold shrink-0 bg-current/10">
          {skill.name.charAt(0)}
        </span>
      )}

      <span className="truncate max-w-[110px] sm:max-w-none">{skill.name}</span>

      {/* Level dots */}
      <span className="flex gap-0.5 ml-0.5 shrink-0">
        {[1, 2, 3, 4].map(i => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${i <= skill.level ? 'bg-current opacity-70' : 'bg-current opacity-15'}`}
          />
        ))}
      </span>

      {/* Floating tooltip */}
      {show && (
        <span
          className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-[300]
                     bg-slate-900 text-white rounded-xl px-3 py-2.5 shadow-2xl
                     border border-slate-700/50 whitespace-nowrap min-w-[140px]"
          style={{ fontSize: '11px' }}
        >
          {/* Name */}
          <span className="block font-semibold text-white text-xs mb-1.5">{skill.name}</span>

          {/* Level bar */}
          <span className="flex gap-1 mb-1">
            {[1, 2, 3, 4, 5].map(i => (
              <span
                key={i}
                className={`inline-block w-5 h-1.5 rounded-full ${i <= skill.level ? 'bg-violet-400' : 'bg-slate-700'}`}
              />
            ))}
          </span>

          {/* Level label + category */}
          <span className="block text-slate-400" style={{ fontSize: '10px' }}>
            {levelLabel} · {catLabel}
          </span>

          {/* Arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[5px] border-transparent border-t-slate-900" />
        </span>
      )}
    </span>
  )
}
