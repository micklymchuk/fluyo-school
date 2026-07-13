import type { CtaIntent, LearningPath, Locale, MessageIntent, PagePath, PageRouteId } from './types'

const ctaIntent = (path: PagePath, sourceRoute: PageRouteId, locale: Locale, messageIntent: MessageIntent): CtaIntent => ({
  path,
  format: 'telegram',
  sourceRoute,
  locale,
  messageIntent
})

export const learningPaths = [
  {
    id: 'exam',
    anchorId: 'exam-prep',
    priceHintIds: ['trial', 'exam-group'],
    ctaIntent: {
      uk: ctaIntent('/programs', 'programs', 'uk', 'ask_program'),
      en: ctaIntent('/programs', 'programs', 'en', 'ask_program')
    }
  },
  {
    id: 'kids',
    anchorId: 'kids-parents',
    priceHintIds: ['trial', 'kids-group'],
    ctaIntent: {
      uk: ctaIntent('/programs', 'programs', 'uk', 'book_trial'),
      en: ctaIntent('/programs', 'programs', 'en', 'book_trial')
    }
  },
  {
    id: 'adult',
    anchorId: 'adult-speaking',
    priceHintIds: ['trial', 'adult-individual'],
    ctaIntent: {
      uk: ctaIntent('/programs', 'programs', 'uk', 'ask_program'),
      en: ctaIntent('/programs', 'programs', 'en', 'ask_program')
    }
  }
] as const satisfies readonly LearningPath[]
