import { DEFAULT_LOCALE, type Locale, type LocalizedText } from './types'

/**
 * Resolve const-held copy to a plain string for the active locale.
 * A single string is returned as-is; a per-locale record falls back to the
 * default locale when the requested locale is missing.
 */
export const resolveLocalizedText = (text: LocalizedText, locale: Locale): string => {
  if (typeof text === 'string') {
    return text
  }

  return text[locale] ?? text[DEFAULT_LOCALE]
}
