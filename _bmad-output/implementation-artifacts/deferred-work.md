## Deferred from: code review of DD-001.0.2-ui-primitives-and-app-shell.md (2026-07-10)

- `_bmad-output/project-context.md` is included in the review diff, but the story record says these edits were pre-existing dirty work and not part of DD-001.0.2. Keep this separated from the story implementation when preparing final changes.

## Deferred from: code review of DD-001.2.2-learning-paths-route.md (2026-07-13)

- `/pricing?path=...` context emitted by the Programs page CTAs has no consumer — `app/pages/pricing.vue` is still the starter stub, so the param dies on arrival (and tampered values like `?path=foo` are unvalidated). Consume and validate it in the upcoming pricing story (DD-001.3.x).

## Deferred from: implementation of DD-001.3.1-teachers-proof-route.md (2026-07-14)

- Direct-loading any route with `?lang=en` renders English copy after hydration, but internal link `href`s and the Telegram CTA context keep the default-locale values until the visitor uses the language control. Verified identical on `/programs` and `/teachers`, so it belongs to the shared `useLocale`/hydration layer, not to a single route. Interactive switching through the header language control updates everything correctly.

## Deferred from: code review of DD-001.3.2-trial-pricing-route.md (2026-07-14)

- `scripts/verify-pricing-route.mjs` hardcodes id lists (`pricingFormatIds`, `priceItemIds`, `faqItemIds`) duplicated from the data files and checks only those known ids — a new data record added without i18n entries passes silently. Same convention exists in the programs/teachers verify scripts; derive ids from the actual data sources across all three scripts in one deliberate change.
- `scripts/verify-pricing-route.mjs` regexes assert exact source formatting (prop order/whitespace in `defineProps`, literal template attribute matches), so harmless reformatting breaks verification with no behavior change. Inherent to the grep-source verifier approach shared by all route verify scripts; revisit together with the id-list improvement.
- DD-001.3.2 Agent-Verifiable AC "non-approved price, trial, or policy FAQ records do not render as approved public truth in production build" remains unimplemented (readiness gating removed at `51c39ce`; `npm run test:production-content` is the documented equivalent). Deferred reason: the site carries only real approved content with no preview/draft states by policy — production content changes happen through an explicit task or manual edit, so record-level gating is not needed now. Revisit only if a draft-content workflow ever appears.

## Deferred from: code review of DD-001.3.1-teachers-proof-route.md (2026-07-14)

- Trust CTA strip's `teacher_proof_view` activate payloads are identical for the Pricing, Programs, and Telegram buttons (`surface: 'trust-cta'`, `trigger: 'activate'`), so pricing vs programs clicks are indistinguishable in analytics. Spec-conformant today; if per-CTA attribution ever matters, enrich the payload with a CTA-target field across the tracking contract.
- Proof-column kind/usage mapping is not pinned by `verify-teachers-route.mjs`: a content edit moving an asset off `kind: 'classroom'` or dropping `'teachers'` from `usageContext` leaves a column rendering headings/notes around zero assets while verification passes. Fix together with the deriving-checks-from-data improvement above.
- DD-001.3.1's readiness-gating AC is unimplemented, same as DD-001.3.2's: deferred for the same policy reason (only real approved content exists; no draft states; prod content changes via explicit task or manual edit).
- `scripts/verify-production-content.mjs` vocabulary check has inherent tripwire limits: page-describing copy in declined forms («На цій сторінці ви знайдете…», "This page lists…") or with verbs outside the enumerated set evades the patterns, and the `\bsnapshot\b(?!":)` key exemption is coupled to exact `"key":` JSON serialization. Copy review stays a human/LLM responsibility; extend the pattern set opportunistically when new evasions appear.

## Open Bugs

- `BUG-001`: Home section copy is hard-coded in route section components via `sectionCopy`, `proofItems`, and `pricingSummaryCopy`; move it into the i18n message layer and add a guard. See `_bmad-output/implementation-artifacts/DD-001-fluyo-production-site/bugs/BUG-001-home-section-copy-must-use-i18n.md`.
