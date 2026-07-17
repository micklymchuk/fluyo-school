export type PrimaryNavigationLink = {
  labelKey: string
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
  { labelKey: 'navigation.links.home', to: '/' },
  { labelKey: 'navigation.links.programs', to: '/programs' },
  { labelKey: 'navigation.links.teachers', to: '/teachers' },
  { labelKey: 'navigation.links.pricing', to: '/pricing' }
] as const satisfies readonly PrimaryNavigationLink[]

export const instagramAction = {
  label: 'Instagram',
  href: 'https://www.instagram.com/fluyo.school/'
} as const satisfies ContactAction

export const telegramAction = {
  label: 'Telegram'
} as const satisfies LabeledAction
