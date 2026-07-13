import type { ProofAssetId, SourceStatus, TeacherProfileId } from '~/data/content'

export type AssetManifestKind = 'brand' | 'teacher_portrait' | 'proof_image'
export type AssetManifestId =
  | 'brand-logo-full'
  | 'brand-logo-short'
  | `portrait-${TeacherProfileId}`
  | ProofAssetId

export type AssetManifestEntry = {
  id: AssetManifestId
  kind: AssetManifestKind
  src: string
  sourceStatus: SourceStatus
  requiredForLaunch: boolean
  ownerNote: string
}

export const assetManifest = [
  {
    id: 'brand-logo-full',
    kind: 'brand',
    src: '/images/brand/fluyo-logo-full.png',
    sourceStatus: 'approved',
    requiredForLaunch: true,
    ownerNote: 'Existing public brand asset.'
  },
  {
    id: 'brand-logo-short',
    kind: 'brand',
    src: '/images/brand/fluyo-logo-short.png',
    sourceStatus: 'approved',
    requiredForLaunch: true,
    ownerNote: 'Existing public brand asset.'
  },
  {
    id: 'portrait-olena-bondar',
    kind: 'teacher_portrait',
    src: '/images/mock/teachers/olena-bondar.png',
    sourceStatus: 'mock',
    requiredForLaunch: false,
    ownerNote: 'Placeholder until approved teacher portrait is provided.'
  },
  {
    id: 'portrait-marta-koval',
    kind: 'teacher_portrait',
    src: '/images/mock/teachers/marta-koval.png',
    sourceStatus: 'mock',
    requiredForLaunch: false,
    ownerNote: 'Placeholder until approved teacher portrait is provided.'
  },
  {
    id: 'portrait-andriy-lev',
    kind: 'teacher_portrait',
    src: '/images/mock/teachers/andriy-lev.png',
    sourceStatus: 'needs_review',
    requiredForLaunch: false,
    ownerNote: 'Needs teacher approval before use.'
  },
  {
    id: 'student-result-ielts',
    kind: 'proof_image',
    src: '/images/mock/proof/student-result-ielts.png',
    sourceStatus: 'mock',
    requiredForLaunch: false,
    ownerNote: 'Replace with anonymized approved result before launch.'
  },
  {
    id: 'kids-class-snapshot',
    kind: 'proof_image',
    src: '/images/mock/proof/youth-class-snapshot.png',
    sourceStatus: 'needs_review',
    requiredForLaunch: false,
    ownerNote: 'Requires privacy approval before public use.'
  },
  {
    id: 'adult-speaking-note',
    kind: 'proof_image',
    src: '/images/mock/proof/adult-speaking-note.png',
    sourceStatus: 'approved',
    requiredForLaunch: false,
    ownerNote: 'Approved method illustration, not a student identity asset.'
  },
  {
    id: 'lesson-format-board',
    kind: 'proof_image',
    src: '/images/mock/proof/lesson-format-board.png',
    sourceStatus: 'approved',
    requiredForLaunch: false,
    ownerNote: 'Approved format illustration.'
  }
] as const satisfies readonly AssetManifestEntry[]
