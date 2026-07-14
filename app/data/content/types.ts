export const SUPPORTED_LOCALES = ['uk', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE = 'uk' satisfies Locale

export type LocalizedString = Record<Locale, string>

export type PageRouteId = 'home' | 'programs' | 'teachers' | 'pricing'
export type PagePath = '/' | '/programs' | '/teachers' | '/pricing'
export type LearningPathId = 'exam' | 'kids' | 'adult'
export type PriceItemId = 'trial' | 'exam-group' | 'kids-group' | 'adult-individual' | 'pair-lessons'
export type TeacherProfileId = 'olena-bondar' | 'marta-koval' | 'andriy-lev'
export type ProofAssetId = 'student-result-ielts' | 'kids-class-snapshot' | 'adult-speaking-note' | 'lesson-format-board'
export type TestimonialId = 'danylo-exam' | 'olena-parent' | 'marta-adult'
export type FaqItemId =
  | 'trial-booking'
  | 'format-choice'
  | 'teacher-match'
  | 'pricing-policy'
  | 'payment-method'
  | 'schedule-policy'
  | 'reschedule-policy'
  | 'online-format'
  | 'english-switch'

export type LocalizedSeoMetadata = {
  title: string
  description: string
}

export type PageIntro = {
  eyebrow: string
  heading: string
  summary: string
}

export type PageContent = {
  routeId: PageRouteId
  path: PagePath
  sectionOrder: readonly string[]
  messageKey: PageRouteId
}

export type CtaFormat = 'telegram' | 'anchor' | 'route'
export type MessageIntent = 'book_trial' | 'ask_program' | 'ask_teacher' | 'ask_price'
export type TelegramPathContext = 'exam' | 'kids' | 'adult' | 'generic'
export type TelegramFormatContext = 'individual' | 'pair' | 'mini-group' | 'generic'
export type CtaSourceRoute = PageRouteId | 'header' | 'footer' | 'section' | 'pricing' | 'final-booking'

export type CtaContext = {
  path?: TelegramPathContext
  format?: TelegramFormatContext
  sourceRoute?: CtaSourceRoute
  locale?: Locale
  messageIntent?: MessageIntent
}

export type TrackingTrigger = 'observe' | 'activate'
export type TeacherProofSurface = 'teacher-cards' | 'credentials-proof' | 'lesson-proof' | 'testimonials' | 'trust-cta'

export type TrackingPayload = {
  route?: string | null
  locale?: Locale | null
  path?: TelegramPathContext | null
  format?: TelegramFormatContext | null
  sourceRoute?: CtaSourceRoute | null
  messageIntent?: MessageIntent | null
  trigger?: TrackingTrigger | null
  surface?: TeacherProofSurface | null
}

export type CtaIntent = {
  path: PagePath
  format: CtaFormat
  sourceRoute: PageRouteId
  messageIntent: MessageIntent
}

export type LearningPath = {
  id: LearningPathId
  anchorId: string
  priceHintIds: readonly PriceItemId[]
  ctaIntent: CtaIntent
  telegramFormat: TelegramFormatContext
}

export type PriceFormat = 'trial' | 'group' | 'individual' | 'pair'

export type PriceItem = {
  id: PriceItemId
  format: PriceFormat
}

export type PricingFormatId = 'individual' | 'pair' | 'mini-group'

export type PricingFormat = {
  id: PricingFormatId
  telegramFormat: TelegramFormatContext
  priceItemIds: readonly PriceItemId[]
  pathFit: readonly LearningPathId[]
}

export type PricingIncludedItemId = 'teacher-matching' | 'live-lesson' | 'materials' | 'feedback-progress'

export type PricingIncludedItem = {
  id: PricingIncludedItemId
}

export type TeacherProfile = {
  id: TeacherProfileId
  audienceFit: readonly LearningPathId[]
  portraitAssetId: string
}

export type ProofKind = 'result' | 'classroom' | 'method' | 'format'

export type ProofAsset = {
  id: ProofAssetId
  kind: ProofKind
  usageContext: readonly PageRouteId[]
}

export type Testimonial = {
  id: TestimonialId
  audience: LearningPathId
}

export type PolicySensitivity = 'standard' | 'policy_sensitive'

export type FaqItem = {
  id: FaqItemId
  policySensitivity: PolicySensitivity
}
