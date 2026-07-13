import type { ProofAsset } from './types'

export const proofAssets = [
  {
    id: 'student-result-ielts',
    kind: 'result',
    approvalStatus: 'pending',
    privacyStatus: 'anonymized',
    usageContext: ['home', 'teachers'],
    sourceStatus: 'mock'
  },
  {
    id: 'kids-class-snapshot',
    kind: 'classroom',
    approvalStatus: 'pending',
    privacyStatus: 'withheld',
    usageContext: ['programs', 'teachers'],
    sourceStatus: 'needs_review'
  },
  {
    id: 'adult-speaking-note',
    kind: 'method',
    approvalStatus: 'approved',
    privacyStatus: 'public',
    usageContext: ['programs', 'teachers'],
    sourceStatus: 'approved'
  },
  {
    id: 'lesson-format-board',
    kind: 'format',
    approvalStatus: 'approved',
    privacyStatus: 'public',
    usageContext: ['pricing'],
    sourceStatus: 'approved'
  }
] as const satisfies readonly ProofAsset[]
