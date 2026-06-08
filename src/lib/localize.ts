/** A field that can be a plain string or a language map */
export type ML = string | { [lang: string]: string }

/**
 * Picks the value for the given language from a multilingual field.
 * Falls back to 'en', then to the first available value.
 */
export function localize(value: ML | undefined | null, lang: string): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang] ?? value['en'] ?? Object.values(value)[0] ?? ''
}

/** Resolves an array of ML items to localized strings */
export function localizeArr(arr: ML[] | undefined, lang: string): string[] {
  if (!arr) return []
  return arr.map(v => localize(v, lang))
}
