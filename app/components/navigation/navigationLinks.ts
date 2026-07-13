export type PrimaryNavigationLink = {
  label: string
  to: string
}

export type ContactAction = {
  label: string
  href: string
}

export type LabeledAction = {
  label: string
}

export const primaryNavigationLinks = [
  { label: 'Home', to: '/' },
  { label: 'Learning Paths', to: '/programs' },
  { label: 'Teachers & Proof', to: '/teachers' },
  { label: 'Trial & Pricing', to: '/pricing' }
] as const satisfies readonly PrimaryNavigationLink[]

export const instagramAction = {
  label: 'Instagram',
  href: 'https://www.instagram.com/fluyo.school/'
} as const satisfies ContactAction

export const telegramAction = {
  label: 'Telegram'
} as const satisfies LabeledAction
