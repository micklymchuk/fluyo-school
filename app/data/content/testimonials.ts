import type { Testimonial } from './types'

export const testimonials = [
  {
    id: 'danylo-exam',
    audience: 'exam'
  },
  {
    id: 'olena-parent',
    audience: 'kids'
  },
  {
    id: 'marta-adult',
    audience: 'adult'
  }
] as const satisfies readonly Testimonial[]
