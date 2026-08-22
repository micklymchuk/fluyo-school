import type { CtaIntent, LearningPath, MessageIntent, PagePath, PageRouteId } from './types'

const ctaIntent = (path: PagePath, sourceRoute: PageRouteId, messageIntent: MessageIntent): CtaIntent => ({
  path,
  format: 'telegram',
  sourceRoute,
  messageIntent
})

export const learningPaths = [
  {
    id: 'general',
    anchorId: 'general-english',
    priceHintIds: ['TRIAL', 'INDIVIDUAL'],
    ctaIntent: ctaIntent('/programs', 'programs', 'ask_program'),
    telegramFormat: 'individual'
  },
  {
    id: 'exam',
    anchorId: 'exam-preparation',
    priceHintIds: ['TRIAL', 'EXAM_PREP'],
    ctaIntent: ctaIntent('/programs', 'programs', 'ask_program'),
    telegramFormat: 'individual'
  },
  {
    id: 'speaking-club',
    anchorId: 'speaking-club',
    priceHintIds: ['TRIAL'],
    ctaIntent: ctaIntent('/programs', 'programs', 'ask_program'),
    telegramFormat: 'speaking-club'
  },
  {
    id: 'kids',
    anchorId: 'kids-parents',
    priceHintIds: ['TRIAL', 'KIDS_GROUP'],
    ctaIntent: ctaIntent('/programs', 'programs', 'book_trial'),
    telegramFormat: 'mini-group'
  },
  {
    id: 'professional',
    anchorId: 'professional-english',
    priceHintIds: ['TRIAL', 'INDIVIDUAL'],
    ctaIntent: ctaIntent('/programs', 'programs', 'ask_program'),
    telegramFormat: 'individual'
  },
  {
    id: 'interview',
    anchorId: 'interview-preparation',
    priceHintIds: ['TRIAL', 'INDIVIDUAL'],
    ctaIntent: ctaIntent('/programs', 'programs', 'ask_program'),
    telegramFormat: 'individual'
  }
] as const satisfies readonly LearningPath[]