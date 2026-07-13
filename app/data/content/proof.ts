import type { ProofAsset } from './types'

export const proofAssets = [
  {
    id: 'student-result-ielts',
    kind: 'result',
    usageContext: ['home', 'teachers']
  },
  {
    id: 'kids-class-snapshot',
    kind: 'classroom',
    usageContext: ['programs', 'teachers']
  },
  {
    id: 'adult-speaking-note',
    kind: 'method',
    usageContext: ['programs', 'teachers']
  },
  {
    id: 'lesson-format-board',
    kind: 'format',
    usageContext: ['pricing']
  }
] as const satisfies readonly ProofAsset[]
