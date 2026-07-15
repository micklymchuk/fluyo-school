import type { TeacherProfile } from './types'

export const teacherProfiles = [
  {
    id: 'olena-bondar',
    audienceFit: ['exam']
  },
  {
    id: 'marta-koval',
    audienceFit: ['kids']
  },
  {
    id: 'andriy-lev',
    audienceFit: ['adult']
  }
] as const satisfies readonly TeacherProfile[]
