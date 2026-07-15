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
    priceHintIds: ['TRIAL', 'EXAM_PREP'],
    ctaIntent: ctaIntent('/programs', 'programs', 'ask_program'),
    telegramFormat: 'individual'
  },
  {
    id: 'kids',
    anchorId: 'kids-parents',
    priceHintIds: ['TRIAL', 'MINI_GROUP'],
    ctaIntent: ctaIntent('/programs', 'programs', 'book_trial'),
    telegramFormat: 'mini-group'
  },
  {
    id: 'adult',
    anchorId: 'adults-speaking',
    priceHintIds: ['TRIAL', 'INDIVIDUAL'],
    ctaIntent: ctaIntent('/programs', 'programs', 'ask_program'),
    telegramFormat: 'individual'
  }
] as const satisfies readonly LearningPath[]
