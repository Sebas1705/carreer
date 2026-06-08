import { useTranslation } from 'react-i18next'

/** Returns the current active language code ('en' | 'es'). */
export function useLang(): 'en' | 'es' {
  const { i18n } = useTranslation()
  return i18n.language.startsWith('es') ? 'es' : 'en'
}
