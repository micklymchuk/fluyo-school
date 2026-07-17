export type AssetManifestKind = 'brand' | 'portrait'
export type AssetManifestId =
  | 'brand-logo-full'
  | 'brand-logo-short'
  | 'portrait-catherina'
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
