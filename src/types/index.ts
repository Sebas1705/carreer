export type Theme = 'light' | 'dark'
export type Lang = 'en' | 'es'

export interface SectionProps {
  onNext?: () => void
  onPrev?: () => void
  onOpenCV?: () => void
}
