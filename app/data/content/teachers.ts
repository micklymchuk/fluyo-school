import type { TeacherProfile } from './types'

export const teacherProfiles = [
  {
    id: 'olena-bondar',
    audienceFit: ['exam'],
    portraitAssetId: 'portrait-olena-bondar'
  },
  {
    id: 'marta-koval',
    audienceFit: ['kids'],
    portraitAssetId: 'portrait-marta-koval'
  },
  {
    id: 'andriy-lev',
    audienceFit: ['adult'],
    portraitAssetId: 'portrait-andriy-lev'
  }
] as const satisfies readonly TeacherProfile[]
