export type AssetManifestKind = 'brand'
export type AssetManifestId =
  | 'brand-logo-full'
  | 'brand-logo-short'

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
  }
] as const satisfies readonly AssetManifestEntry[]
