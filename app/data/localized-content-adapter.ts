import { assetManifest, type AssetManifestEntry } from './asset-manifest'
import {
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

export const getLocalizedPriceItems = (locale: Locale): readonly LocalizedPriceItem[] => {
  return priceItems.map((item) => ({
    ...item,
    ...getPriceItemMessage(locale, item.id)
  }))
}

export const getLocalizedTeacherProfiles = (locale: Locale): readonly LocalizedTeacherProfile[] => {
  return teacherProfiles.map((item) => ({
    ...item,
    ...getTeacherProfileMessage(locale, item.id)
  }))
}

export const getLocalizedProofAssets = (locale: Locale): readonly LocalizedProofAsset[] => {
  return proofAssets.map((item) => ({
    ...item,
    ...getProofAssetMessage(locale, item.id)
  }))
}

export const getLocalizedTestimonials = (locale: Locale): readonly LocalizedTestimonial[] => {
  return testimonials.map((item) => ({
    ...item,
    ...getTestimonialMessage(locale, item.id)
  }))
}

export const getLocalizedFaqItems = (locale: Locale): readonly LocalizedFaqItem[] => {
  return faqItems.map((item) => ({
    ...item,
    ...getFaqItemMessage(locale, item.id)
  }))
}

export const getLocalizedAssetManifest = (locale: Locale): readonly LocalizedAssetManifestEntry[] => {
  return assetManifest.map((item) => ({
    ...item,
    ...getAssetMessage(locale, item.id)
  }))
}
