export type AssetManifestKind = 'brand' | 'portrait'
export type AssetManifestId =
  | 'avatar-catherina'
  | 'avatar-diana'
  | 'avatar-ksenia'
  | 'brand-logo-full'
  | 'brand-logo-short'
  | 'portrait-catherina'
  | 'portrait-catherina-founder'
  | 'portrait-diana'
  | 'portrait-ksenia'

export type AssetManifestEntry = {
  id: AssetManifestId
  kind: AssetManifestKind
  src: string
  ownerNote: string
}

export const assetManifest = [
  {
    id: 'avatar-catherina',
    kind: 'portrait',
    src: '/images/teachers/catherina-avatar.png',
    ownerNote: 'Head-and-shoulders crop of the founder portrait, for compact cards.'
  },
  {
    id: 'avatar-diana',
    kind: 'portrait',
    src: '/images/teachers/diana-avatar.png',
    ownerNote: 'Head-and-shoulders crop of the teacher portrait, for compact cards.'
  },
  {
    id: 'avatar-ksenia',
    kind: 'portrait',
    src: '/images/teachers/ksenia-avatar.png',
    ownerNote: 'Head-and-shoulders crop of the teacher portrait, for compact cards.'
  },
  {
    id: 'brand-logo-full',
    kind: 'brand',
    src: '/images/brand/fluyo-logo-full.png',
    ownerNote: 'Existing public brand asset.'
  },
  {
    id: 'brand-logo-short',
    kind: 'brand',
    src: '/images/brand/fluyo-logo-short.png',
    ownerNote: 'Existing public brand asset.'
  },
  {
    id: 'portrait-catherina',
    kind: 'portrait',
    src: '/images/teachers/catherina-web.png',
    ownerNote: 'Founder portrait, cut-out on transparent background.'
  },
  {
    id: 'portrait-catherina-founder',
    kind: 'portrait',
    src: '/images/teachers/catherina-founder.png',
    ownerNote: 'Full-length founder portrait, cut-out on transparent background, for the home founder section.'
  },
  {
    id: 'portrait-diana',
    kind: 'portrait',
    src: '/images/teachers/diana-web.png',
    ownerNote: 'Teacher portrait, cut-out on transparent background.'
  },
  {
    id: 'portrait-ksenia',
    kind: 'portrait',
    src: '/images/teachers/ksenia-web.png',
    ownerNote: 'Teacher portrait, cut-out on transparent background.'
  }
] as const satisfies readonly AssetManifestEntry[]
