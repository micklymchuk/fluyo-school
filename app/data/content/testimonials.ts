import type { Testimonial } from './types'

export const testimonials = [
  {
    id: 'danylo-exam'
  },
  {
    id: 'olena-parent'
  },
  {
    id: 'marta-adult'
  }
] as const satisfies readonly Testimonial[]
