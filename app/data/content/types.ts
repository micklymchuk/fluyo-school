export const SUPPORTED_LOCALES = ['uk', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE = 'uk' satisfies Locale

export type LocalizedString = Record<Locale, string>

/**
 * Copy that lives in a content const rather than i18n. Either a single string used
 * for every locale, or a per-locale record when the text differs by language.
 */
export type LocalizedText = string | LocalizedString

export type PageRouteId = 'home' | 'programs' | 'teachers' | 'pricing'
export type PagePath = '/' | '/programs' | '/teachers' | '/pricing'
export type LearningPathId = 'general' | 'exam' | 'speaking-club' | 'kids' | 'professional' | 'interview'
export type PriceItemId =
  | 'TRIAL'
  | 'TRIAL_LESSON'
  | 'EXAM_PREP'
  | 'MINI_GROUP'
  | 'INDIVIDUAL'
  | 'PAIR'
  | 'KIDS_THIRTY'
  | 'KIDS_FORTY_FIVE'
  | 'KIDS_SIXTY'
export type TeacherProfileId = 'catherina' | 'diana' | 'ksenia'
export type ProofAssetId = 'student-result-ielts' | 'kids-class-snapshot' | 'adult-speaking-note' | 'lesson-format-board'
export type TestimonialId = 'danylo-exam' | 'olena-parent' | 'marta-adult'
export type FaqItemId =
  | 'enrollment'
  | 'consultation-vs-trial'
  | 'subscription-benefit'
  | 'teacher-match'
  | 'online-format'
  | 'why-miro'
  | 'progress-time'
  | 'pair-lessons'
  | 'format-choice'

export type PageContent = {
  routeId: PageRouteId
  path: PagePath
  messageKey: PageRouteId
}

export type CtaFormat = 'telegram' | 'anchor' | 'route'
export type MessageIntent = 'book_consultation' | 'book_trial' | 'ask_program' | 'ask_teacher' | 'ask_price'
export type TelegramPathContext = 'general' | 'exam' | 'speaking-club' | 'kids' | 'professional' | 'interview' | 'generic'
export type TelegramFormatContext = 'individual' | 'speaking-club' | 'mini-group' | 'generic'
export type CtaSourceRoute = PageRouteId | 'header' | 'footer' | 'section' | 'final-booking'

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

export type PriceItem = {
  id: PriceItemId
}

export type PriceCurrency = 'UAH'
export type PriceUnit = 'thirty-minutes' | 'forty-five-minutes' | 'sixty-minutes' | 'seventy-five-minutes' | 'lesson'

export type PriceConfig = {
  amount: number
  currency: PriceCurrency
  unit: PriceUnit
  isFromPrice: boolean
}

export type PricingFormatId = 'individual' | 'mini-group'

export type PricingFormat = {
  id: PricingFormatId
  telegramFormat: TelegramFormatContext
  priceItemIds: readonly PriceItemId[]
  pathFit: readonly LearningPathId[]
}

/** Who the package tracks are priced for; drives the audience switch on the home pricing block. */
export type PriceAudienceId = 'adults' | 'kids'

export type PricePackageTrackId =
  | 'general'
  | 'exam-prep'
  | 'kids-five-six'
  | 'kids-seven-nine'
  | 'kids-ten-plus'

export type PricePackageTier = {
  lessonCount: number
  totalAmount: number
  perLessonAmount: number
  currency: PriceCurrency
  isPopular: boolean
}

export type PricePackageTrack = {
  id: PricePackageTrackId
  /** The single-lesson item this track derives from, for label/telegram reuse. */
  priceItemId: PriceItemId
  telegramFormat: TelegramFormatContext
  telegramPath: TelegramPathContext
  tiers: readonly PricePackageTier[]
}

export type PricingIncludedItemId = 'teacher-matching' | 'live-lesson' | 'materials' | 'feedback-progress'

export type PricingIncludedItem = {
  id: PricingIncludedItemId
}

export type TeacherProfile = {
  id: TeacherProfileId
  /** Latin display name for the script lockup (Pinyon has no Cyrillic glyphs), so it stays locale-neutral. */
  scriptName: string
  /** Public path to the cut-out portrait asset. */
  photo: string
  /** Public path to the square head-and-shoulders crop used by compact cards. */
  avatar: string
  audienceFit: readonly LearningPathId[]
  /** Marks the founder so her profile carries the founder badge and closing quote. */
  isFounder?: boolean
  /** Public path to the founder's full-length cut-out, used by the home founder section. */
  founderPhoto?: string
}

export type ProofKind = 'result' | 'classroom' | 'method' | 'format'

export type ProofAsset = {
  id: ProofAssetId
  kind: ProofKind
  usageContext: readonly PageRouteId[]
}

export type Testimonial = {
  id: TestimonialId
  /** Testimonial copy, held verbatim in the const (not localized). */
  quote: string
  /** Attribution, resolved from the const (not i18n). Localized or a single string. */
  sourceLabel: LocalizedText
}

export type FaqItem = {
  id: FaqItemId
}
