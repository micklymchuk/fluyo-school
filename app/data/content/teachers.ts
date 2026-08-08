import type { TeacherProfile } from './types'

// All three profiles render through the same showcase; the founder leads the list
// and is set apart by the founder badge + closing quote rather than a separate section.
export const teacherProfiles = [
  {
    id: 'catherina',
    scriptName: 'Catherina',
    photo: '/images/teachers/catherina-web.png',
    audienceFit: ['general', 'speaking-club', 'professional', 'interview'],
    isFounder: true
  },
  {
    id: 'ksenia',
    scriptName: 'Ksenia',
    photo: '/images/teachers/ksenia-web.png',
    audienceFit: ['kids']
  },
  {
    id: 'diana',
    scriptName: 'Diana',
    photo: '/images/teachers/diana-web.png',
    audienceFit: ['exam']
  }
] as const satisfies readonly TeacherProfile[]
