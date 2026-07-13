export const SUPPORTED_LOCALES = ['uk', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE = 'uk' satisfies Locale

export type LocalizedString = Record<Locale, string>

export type PageRouteId = 'home' | 'programs' | 'teachers' | 'pricing'
export type PagePath = '/' | '/programs' | '/teachers' | '/pricing'
export type LearningPathId = 'exam' | 'kids' | 'adult'
export type PriceItemId = 'trial' | 'exam-group' | 'kids-group' | 'adult-individual'
export type TeacherProfileId = 'olena-bondar' | 'marta-koval' | 'andriy-lev'
export type ProofAssetId = 'student-result-ielts' | 'kids-class-snapshot' | 'adult-speaking-note' | 'lesson-format-board'
export type TestimonialId = 'danylo-exam' | 'olena-parent' | 'marta-adult'
export type FaqItemId = 'trial-booking' | 'format-choice' | 'teacher-match' | 'pricing-policy' | 'schedule-policy' | 'english-switch'

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

export type TrackingPayload = {
  route?: string | null
  locale?: Locale | null
  path?: TelegramPathContext | null
  format?: TelegramFormatContext | null
  sourceRoute?: CtaSourceRoute | null
  messageIntent?: MessageIntent | null
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
}

export type PriceFormat = 'trial' | 'group' | 'individual'

export type PriceItem = {
  id: PriceItemId
  format: PriceFormat
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
