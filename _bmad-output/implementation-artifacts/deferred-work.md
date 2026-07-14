## Deferred from: code review of DD-001.0.2-ui-primitives-and-app-shell.md (2026-07-10)

- `_bmad-output/project-context.md` is included in the review diff, but the story record says these edits were pre-existing dirty work and not part of DD-001.0.2. Keep this separated from the story implementation when preparing final changes.

## Deferred from: code review of DD-001.2.2-learning-paths-route.md (2026-07-13)

- `/pricing?path=...` context emitted by the Programs page CTAs has no consumer — `app/pages/pricing.vue` is still the starter stub, so the param dies on arrival (and tampered values like `?path=foo` are unvalidated). Consume and validate it in the upcoming pricing story (DD-001.3.x).

## Open Bugs

- `BUG-001`: Home section copy is hard-coded in route section components via `sectionCopy`, `proofItems`, and `pricingSummaryCopy`; move it into the i18n message layer and add a guard. See `_bmad-output/implementation-artifacts/DD-001-fluyo-production-site/bugs/BUG-001-home-section-copy-must-use-i18n.md`.
