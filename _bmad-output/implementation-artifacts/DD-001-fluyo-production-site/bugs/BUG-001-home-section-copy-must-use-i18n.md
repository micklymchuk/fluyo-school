# BUG-001: Home Section Copy Must Use I18n

**Status:** Fixed
**Reported:** 2026-07-13
**Severity:** Medium
**Area:** DD-001 Home route, content/i18n contract
**Related Story:** `DD-001.2.1-home-route`

## Problem

The Home route section components currently own public bilingual copy in component-local objects instead of reading that copy from the i18n message layer.

Known offenders:

- `app/components/sections/HomePathCardsSection.vue` defines `sectionCopy`.
- `app/components/sections/HomeProofSnapshotSection.vue` defines `proofItems`.
- `app/components/sections/HomeTrialPricingSection.vue` defines `pricingSummaryCopy`.

This violates the DD-001 content rule that public route copy must be sourced from typed content/i18n records, not hard-coded inside route-specific UI primitives.

## Expected Behavior

- Move Home section public copy into `app/i18n/locales/uk.json` and `app/i18n/locales/en.json`.
- Preserve structural, non-copy configuration in components only, such as route anchors, tracking IDs, and section IDs.
- Read localized section copy directly through Nuxt i18n `t()` calls.
- Keep Ukrainian and English message structure equivalent.
- Extend verification so new route-section public copy cannot be reintroduced as component-local `uk`/`en` objects.

## Acceptance Criteria

- [x] `sectionCopy`, `proofItems`, and `pricingSummaryCopy` are removed from section components.
- [x] Equivalent Home section messages exist in both locale JSON files.
- [x] The Home route renders the same public copy through Nuxt i18n `t()` access.
- [x] Existing Home route tracking and CTA behavior is unchanged.
- [x] A verification script fails if route section components define public bilingual copy locally.
- [x] `npm run test:home-route`, `npm run test:content-locale`, and `npm run build` pass.

## Resolution

- Moved Home section copy into `app/i18n/locales/uk.json` and `app/i18n/locales/en.json` under `homeSections`.
- Removed custom runtime message/adapter modules in favor of Nuxt i18n `t()` calls.
- Updated Home route section components to keep only structural configuration and tracking behavior locally.
- Strengthened Home route and content-locale verification to validate `homeSections` parity, reject component-local bilingual copy, and fail if custom runtime i18n adapters are reintroduced.

## Notes

This is a content architecture bug, not a visual redesign. The fix should be narrow and should not alter layout, styling, routes, or production-facing wording unless needed to preserve i18n parity.
