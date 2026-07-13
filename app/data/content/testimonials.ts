import type { Testimonial } from './types'

export const testimonials = [
  {
    id: 'danylo-exam',
    audience: 'exam',
    permissionStatus: 'not_requested',
    sourceStatus: 'mock'
  },
  {
    id: 'olena-parent',
    audience: 'kids',
    permissionStatus: 'pending',
    sourceStatus: 'needs_review'
  },
  {
    id: 'marta-adult',
    audience: 'adult',
    permissionStatus: 'not_requested',
    sourceStatus: 'mock'
  }
] as const satisfies readonly Testimonial[]
