import ukMessages from '../../i18n/locales/uk.json'
import enMessages from '../../i18n/locales/en.json'
import type { AssetManifestId } from '../data/asset-manifest'
import type {
  FaqItemId,
  LearningPathId,
  Locale,
  LocalizedSeoMetadata,
  PageIntro,
  PageRouteId,
  PriceItemId,
  ProofAssetId,
  TeacherProfileId,
  TestimonialId
} from '../data/content'

export type RouteMessage = {
  seo: LocalizedSeoMetadata
  intro: PageIntro
}

export type LearningPathMessage = {
  title: string
  summary: string
  proofCues: readonly string[]
}

export type PriceItemMessage = {
  label: string
  value: string
  caption: string
}

export type TeacherProfileMessage = {
  name: string
  role: string
  bio: string
  credentials: readonly string[]
}

export type ProofAssetMessage = {
  title: string
  caption: string
  alt: string
}

export type TestimonialMessage = {
  quote: string
  sourceLabel: string
}

export type FaqItemMessage = {
  question: string
  answer: string
}

export type AssetMessage = {
  alt: string
}

export type LocaleMessageTree = {
  pages: Record<PageRouteId, RouteMessage>
  learningPaths: Record<LearningPathId, LearningPathMessage>
  priceItems: Record<PriceItemId, PriceItemMessage>
  teacherProfiles: Record<TeacherProfileId, TeacherProfileMessage>
  proofAssets: Record<ProofAssetId, ProofAssetMessage>
  testimonials: Record<TestimonialId, TestimonialMessage>
  faqItems: Record<FaqItemId, FaqItemMessage>
  assets: Record<AssetManifestId, AssetMessage>
}

export const localeMessages = {
  uk: ukMessages,
  en: enMessages
} satisfies Record<Locale, LocaleMessageTree>

export const getRouteMessage = (locale: Locale, routeId: PageRouteId): RouteMessage => {
  return localeMessages[locale]?.pages[routeId] ?? localeMessages.uk.pages[routeId]
}

export const getLearningPathMessage = (locale: Locale, id: LearningPathId): LearningPathMessage => {
  return localeMessages[locale]?.learningPaths[id] ?? localeMessages.uk.learningPaths[id]
}

export const getPriceItemMessage = (locale: Locale, id: PriceItemId): PriceItemMessage => {
  return localeMessages[locale]?.priceItems[id] ?? localeMessages.uk.priceItems[id]
}

export const getTeacherProfileMessage = (locale: Locale, id: TeacherProfileId): TeacherProfileMessage => {
  return localeMessages[locale]?.teacherProfiles[id] ?? localeMessages.uk.teacherProfiles[id]
}

export const getProofAssetMessage = (locale: Locale, id: ProofAssetId): ProofAssetMessage => {
  return localeMessages[locale]?.proofAssets[id] ?? localeMessages.uk.proofAssets[id]
}

export const getTestimonialMessage = (locale: Locale, id: TestimonialId): TestimonialMessage => {
  return localeMessages[locale]?.testimonials[id] ?? localeMessages.uk.testimonials[id]
}

export const getFaqItemMessage = (locale: Locale, id: FaqItemId): FaqItemMessage => {
  return localeMessages[locale]?.faqItems[id] ?? localeMessages.uk.faqItems[id]
}

export const getAssetMessage = (locale: Locale, id: AssetManifestId): AssetMessage => {
  return localeMessages[locale]?.assets[id] ?? localeMessages.uk.assets[id]
}
