# Content And Launch Gates

This companion binds content integrity rules for `SPEC-fluyo-school`.

## Content Sources

| Content class | Required status before public launch |
| --- | --- |
| Prices | Approved final paid trial, individual, pair, and mini-group terms. |
| Trial details | Approved final trial duration and what the trial includes. |
| Teacher profiles | Approved real profiles, portraits, credentials, and audience fit. |
| Certificates | Approved images or metadata with private data removed or obscured. |
| Lesson screenshots | Approved privacy-safe screenshots or non-deceptive illustrative previews. |
| Testimonials/results | Approved real quotes/results with consent and context. |
| FAQ answers | Approved policy-sensitive answers for payment, schedule, rescheduling, online format, language, kids, and exam prep. |
| Telegram messages | Approved prepared messages for generic, exam, kids, adult, and format-specific inquiries. |

## Status Rules

- `mock` content can support internal preview, layout testing, and copy-density testing only.
- `approved` content can render publicly as a Fluyo claim.
- `hidden` content is not rendered publicly.
- Launch-sensitive records cannot omit status.
- Public proof assets require alt text, approval status, privacy status, and usage context.

## Approved Strategy

- Proof must appear before or around serious price comparison.
- Exam specificity must name NMT, EVI, Cambridge, TOEFL, CELPIP, or equivalent exam language where relevant.
- Parent-facing proof must show teacher warmth, safety, online lesson visibility, and progress feedback.
- Adult-facing proof must emphasize practical speaking without judgment for work, travel, study, and everyday communication.
- The site should feel modern, premium, clean, minimal, friendly, inspiring, and trustworthy.

## Visual Guardrails

- Use white, charcoal, and deep burgundy as the core brand palette.
- Use real teacher/student imagery and approved proof where possible.
- Wax-stamp motifs, tactile object references, and custom 3D icons are allowed as brand accents.
- Avoid busy layouts, rainbow education palettes, cartoon styling, generic stock imagery, dense screens, and cold corporate SaaS styling.

## Release Gate

Before public launch, verify:

- No mock teacher, testimonial, result, screenshot, price, or trial-duration claim is rendered as approved.
- Pricing is understandable without contacting the manager.
- Telegram CTAs use the centralized context contract.
- Ukrainian and English content are both present for visible copy and SEO metadata.
- `npm run build` passes.
