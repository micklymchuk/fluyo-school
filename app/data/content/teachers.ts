import type { TeacherProfile } from './types'

export const teacherProfiles = [
  {
    id: 'olena-bondar',
    audienceFit: ['exam'],
    portraitAssetId: 'portrait-olena-bondar',
    sourceStatus: 'mock'
  },
  {
    id: 'marta-koval',
    audienceFit: ['kids'],
    portraitAssetId: 'portrait-marta-koval',
    sourceStatus: 'mock'
  },
  {
    id: 'andriy-lev',
    audienceFit: ['adult'],
    portraitAssetId: 'portrait-andriy-lev',
    sourceStatus: 'needs_review'
  }
] as const satisfies readonly TeacherProfile[]
