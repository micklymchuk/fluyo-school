import type { TeacherProfile } from './types'

// The founder is its own export: the home founder section renders her alone, while the
// teachers page renders the whole list — both read the same record.
export const founderProfile = {
  id: 'catherina',
  scriptName: 'Catherina',
  photo: '/images/teachers/catherina-web.png',
  avatar: '/images/teachers/catherina-avatar.png',
  founderPhoto: '/images/teachers/catherina-founder.png',
  audienceFit: ['general', 'speaking-club', 'professional', 'interview'],
  isFounder: true
} as const satisfies TeacherProfile

// All three profiles render through the same showcase; the founder leads the list
// and is set apart by the founder badge + closing quote rather than a separate section.
export const teacherProfiles = [
  founderProfile,
  {
    id: 'ksenia',
    scriptName: 'Ksenia',
    photo: '/images/teachers/ksenia-web.png',
    avatar: '/images/teachers/ksenia-avatar.png',
    audienceFit: ['kids']
  },
  {
    id: 'diana',
    scriptName: 'Diana',
    photo: '/images/teachers/diana-web.png',
    avatar: '/images/teachers/diana-avatar.png',
    audienceFit: ['exam']
  }
] as const satisfies readonly TeacherProfile[]
