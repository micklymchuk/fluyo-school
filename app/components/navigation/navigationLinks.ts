export type PrimaryNavigationLink = {
  label: string
  to: string
}

export type ContactAction = {
  label: string
  href: string
}

export const primaryNavigationLinks = [
  { label: 'Home', to: '/' },
  { label: 'Learning Paths', to: '/learning-paths' },
  { label: 'Teachers & Proof', to: '/teachers-proof' },
  { label: 'Trial & Pricing', to: '/trial-pricing' }
] as const satisfies readonly PrimaryNavigationLink[]

export const instagramAction = {
  label: 'Instagram',
  href: 'https://www.instagram.com/fluyo.school/'
} as const satisfies ContactAction

export const telegramAction = {
  label: 'Telegram',
  href: 'https://t.me/fluyo_school'
} as const satisfies ContactAction
