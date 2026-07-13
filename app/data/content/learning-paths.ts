import type { CtaIntent, LearningPath, MessageIntent, PagePath, PageRouteId } from './types'

const ctaIntent = (path: PagePath, sourceRoute: PageRouteId, messageIntent: MessageIntent): CtaIntent => ({
  path,
  format: 'telegram',
  sourceRoute,
  messageIntent
})

export const learningPaths = [
  {
    id: 'exam',
    anchorId: 'exam-preparation',
    priceHintIds: ['trial', 'exam-group'],
    ctaIntent: ctaIntent('/programs', 'programs', 'ask_program')
  },
  {
    id: 'kids',
    anchorId: 'kids-parents',
    priceHintIds: ['trial', 'kids-group'],
    ctaIntent: ctaIntent('/programs', 'programs', 'book_trial')
  },
  {
    id: 'adult',
    anchorId: 'adults-speaking',
    priceHintIds: ['trial', 'adult-individual'],
    ctaIntent: ctaIntent('/programs', 'programs', 'ask_program')
  }
] as const satisfies readonly LearningPath[]
