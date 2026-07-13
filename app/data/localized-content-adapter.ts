import { assetManifest, type AssetManifestEntry } from './asset-manifest'
import {
  filterRenderableContentRecords,
  faqItems,
  learningPaths,
  priceItems,
  proofAssets,
  teacherProfiles,
  testimonials,
  type FaqItem,
  type LearningPath,
  type Locale,
  type PriceItem,
  type ProofAsset,
  type RenderMode,
  type TeacherProfile,
  type Testimonial
} from './content'
import {
  getAssetMessage,
  getFaqItemMessage,
  getLearningPathMessage,
  getPriceItemMessage,
  getProofAssetMessage,
  getTeacherProfileMessage,
  getTestimonialMessage,
  type AssetMessage,
  type FaqItemMessage,
  type LearningPathMessage,
  type PriceItemMessage,
  type ProofAssetMessage,
  type TeacherProfileMessage,
  type TestimonialMessage
} from '../i18n/messages'

export type LocalizedLearningPath = LearningPath & LearningPathMessage
export type LocalizedPriceItem = PriceItem & PriceItemMessage
export type LocalizedTeacherProfile = TeacherProfile & TeacherProfileMessage
export type LocalizedProofAsset = ProofAsset & ProofAssetMessage
export type LocalizedTestimonial = Testimonial & TestimonialMessage
export type LocalizedFaqItem = FaqItem & FaqItemMessage
export type LocalizedAssetManifestEntry = AssetManifestEntry & AssetMessage

export const getLocalizedLearningPaths = (locale: Locale): readonly LocalizedLearningPath[] => {
  return learningPaths.map((item) => ({
    ...item,
    ...getLearningPathMessage(locale, item.id)
  }))
}

export const getLocalizedPriceItems = (locale: Locale, renderMode: RenderMode = 'production'): readonly LocalizedPriceItem[] => {
  return filterRenderableContentRecords(priceItems, renderMode).map((item) => ({
    ...item,
    ...getPriceItemMessage(locale, item.id)
  }))
}

export const getLocalizedTeacherProfiles = (locale: Locale, renderMode: RenderMode = 'production'): readonly LocalizedTeacherProfile[] => {
  return filterRenderableContentRecords(teacherProfiles, renderMode).map((item) => ({
    ...item,
    ...getTeacherProfileMessage(locale, item.id)
  }))
}

export const getLocalizedProofAssets = (locale: Locale, renderMode: RenderMode = 'production'): readonly LocalizedProofAsset[] => {
  return filterRenderableContentRecords(proofAssets, renderMode).map((item) => ({
    ...item,
    ...getProofAssetMessage(locale, item.id)
  }))
}

export const getLocalizedTestimonials = (locale: Locale, renderMode: RenderMode = 'production'): readonly LocalizedTestimonial[] => {
  return filterRenderableContentRecords(testimonials, renderMode).map((item) => ({
    ...item,
    ...getTestimonialMessage(locale, item.id)
  }))
}

export const getLocalizedFaqItems = (locale: Locale, renderMode: RenderMode = 'production'): readonly LocalizedFaqItem[] => {
  return filterRenderableContentRecords(faqItems, renderMode).map((item) => ({
    ...item,
    ...getFaqItemMessage(locale, item.id)
  }))
}

export const getLocalizedAssetManifest = (locale: Locale, renderMode: RenderMode = 'production'): readonly LocalizedAssetManifestEntry[] => {
  return filterRenderableContentRecords(assetManifest, renderMode).map((item) => ({
    ...item,
    ...getAssetMessage(locale, item.id)
  }))
}
