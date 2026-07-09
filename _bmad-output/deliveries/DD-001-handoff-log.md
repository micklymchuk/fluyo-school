# Handoff Log: DD-001

**Delivery:** Fluyo School Production Four-Page Site  
**Date:** 2026-07-08  
**Documented At:** 2026-07-08T21:12:40+0300  
**Duration:** Prepared as structured 10-phase handoff packet  
**Status:** Official handoff issued; direct architect acknowledgement pending outside this chat  

**Participants:**
- WDS UX Expert: Freya / Codex
- Product Owner: king
- BMad Architect: pending acknowledgement

---

## Phase 1: Introduction

Design Delivery `DD-001` packages the production Fluyo School website for implementation.

This delivery includes:
- 4 production routes: `/`, `/programs`, `/teachers`, `/pricing`
- 3 persona journeys: Danylo, Olena, Marta
- 11 source UX modules migrated into the four-page IA
- 1 adapted implementation-led UI foundation workstream
- 1 validation scenario: `TS-001`

The key adaptation is deliberate: standalone design-system generation is deferred. The design system is created in code as Epic 0 during implementation from the verified UX/layout sources and available raw design-reference assets.

## Phase 2: User Value

**Problem:** Visitors need to quickly understand whether Fluyo fits their exam, child, or adult speaking goal; trust the teacher-led model; see practical price clarity; and contact Telegram with useful context.

**Solution:** Build the finalized four-page public site with clear path routing, trust proof, pricing clarity, bilingual content, and centralized Telegram CTA context.

**Success Criteria:**
- Visitors can choose Exam, Kids & Parents, or Adults Speaking from Home and continue to the relevant Learning Paths section.
- Visitors can reach full pricing and open Telegram with preserved path or format context.
- Trust-sensitive visitors can inspect teachers, credentials, lesson proof, results, testimonials, and FAQ before booking.
- Ukrainian and English content have equivalent structure and responsive safety.
- Launch-sensitive content is hidden or blocked until approved.

**Business Value:** Qualified paid-trial Telegram inquiries with enough context to reduce manager back-and-forth.

## Phase 3: Scenario Walkthrough

### Scenario 01: Danylo's Exam Trial Booking

**Flow:** `/` -> `/programs#exam-preparation` -> `/pricing?path=exam` -> Telegram  
**User Need:** Confirm exact exam fit, structured preparation, diagnostic trial value, and price clarity.  
**Design Reference:** `_bmad-output/C-UX-Scenarios/01-danylo-exam-trial-booking/01-danylo-exam-trial-booking.md`

### Scenario 02: Olena's Parent Trust Check

**Flow:** `/` -> `/programs#kids-parents` -> `/teachers` -> `/pricing?path=kids` -> Telegram  
**User Need:** Verify teacher warmth, credentials, engaging lesson proof, parent-visible progress, and practical trial terms.  
**Design Reference:** `_bmad-output/C-UX-Scenarios/02-olena-parent-trust-check/02-olena-parent-trust-check.md`

### Scenario 03: Marta's Adult Speaking Fit

**Flow:** `/` -> `/programs#adults-speaking` -> `/pricing?path=adult` -> Telegram  
**User Need:** Recognize a respectful adult speaking path, practical situations, supportive correction, and manageable first step.  
**Design Reference:** `_bmad-output/C-UX-Scenarios/03-marta-adult-speaking-fit/03-marta-adult-speaking-fit.md`

### Page-Level Implementation Target

| Route | Page | Required Sections |
| --- | --- | --- |
| `/` | Home | Header, Hero, Path Cards, Proof Snapshot, Trial & Prices Preview, Footer / Contact Strip |
| `/programs` | Learning Paths | Page Header, Exam Preparation, Kids & Parents, Adults Speaking, Path Price Hints, CTA Strip, Footer |
| `/teachers` | Teachers & Proof | Trust Header, Teacher Cards, Credentials Proof, Lesson Proof, Results/Testimonials, Trust CTA Strip, Footer |
| `/pricing` | Trial & Pricing | Trial First Step, Individual, Pair, Mini-Group, Included Items, Practical FAQ, Final Booking CTA, Footer |

Do not rebuild the historical 11-section landing prototype. Do not split exam, kids, and adults into separate v1 routes.

## Phase 4: Technical Requirements

**Platform:**
- Frontend: Nuxt 4.4.8, Vue 3.5.x
- Router: Nuxt pages / Vue Router 5.1.x
- Deployment: Cloudflare Pages through Nuxt Nitro `cloudflare-pages`
- Package manager: npm with `package-lock`

**Architecture Rules:**
- Pages compose sections and shared layout.
- Sections consume typed content, UI primitives, and composables.
- UI primitives consume framework primitives and CSS tokens.
- Public copy lives in typed `uk` / `en` content records.
- Telegram URLs and prepared messages are built through one helper.
- Tracking events are emitted through one adapter.
- Route, query, hash, and local state are enough for v1; no global store needed.

**Integrations:**
- Telegram: `https://t.me/fluyo_manager`
- Analytics adapter: stable event contract before vendor choice
- Cloudflare Pages: production deployment boundary

**Data Models:**
- `PageContent`
- `LearningPath`
- `PriceItem`
- `TeacherProfile`
- `ProofAsset`
- `Testimonial`
- `FaqItem`
- `CtaIntent`

## Phase 5: Design System Components

The design system is implementation-led and must be extracted as Epic 0.

**Required Outputs:**
- `app/assets/css/tokens.css`
- `app/assets/css/main.css`
- `app/components/ui/`
- `app/components/navigation/`
- `app/components/sections/`

**Components/Patterns to Stabilize:**
- Global header
- Mobile navigation
- Footer/contact strip
- Language control
- Telegram CTA button and secondary links
- Path card
- Proof snapshot item
- Program section panel
- Price hint
- Teacher card
- Credential/proof item
- Lesson proof preview
- Testimonial/result item
- Pricing format block
- FAQ accordion row
- CTA strip

**Visual Direction:**
- Editorial spacing
- Square geometry
- Hairline borders
- Restrained black/ivory/deep burgundy palette
- No decorative shadows
- No viewport-width font scaling
- No negative letter spacing

## Phase 6: Acceptance Criteria

**Functional:**
- Header and mobile nav expose the approved four-route IA and contact actions.
- Home path cards route to the correct Learning Paths context.
- Learning Paths contains all three launch audience paths.
- Teachers & Proof contains teacher, credential, lesson, result/testimonial, and CTA proof surfaces.
- Trial & Pricing contains paid trial, formats, included items, FAQ, and final Telegram CTA.
- `/pricing` adapts to `path=exam`, `path=kids`, and `path=adult`.
- Telegram CTA uses preserved context where available and safe generic fallback otherwise.
- Ukrainian is default; English keeps equivalent structure.

**Non-Functional:**
- Build passes with `npm run build`.
- No horizontal overflow at 375, 428, 768, 1440, or 1920 widths.
- Components use the in-code UI foundation.
- Text does not overlap, clip, or overflow controls.
- Cloudflare Pages compatibility is preserved.

**Edge Cases:**
- Unknown path query falls back safely.
- Missing approved proof/pricing/testimonial content cannot render as real public proof.
- Unsupported locale falls back to Ukrainian.
- Rapid CTA clicks keep links and analytics payloads valid.
- Long Ukrainian and English strings wrap cleanly.

## Phase 7: Testing Approach

Validation scenario: `_bmad-output/test-scenarios/TS-001-fluyo-production-site.yaml`

TS-001 covers:
- Danylo, Olena, and Marta happy paths
- Unknown path, missing CTA context, unsupported locale, and missing approved launch-content states
- Anchor/query/mobile/content edge cases
- Implementation-led design-system validation
- Accessibility checks
- Responsive viewport checks
- Build and route direct-load checks
- Content integrity gates
- Analytics event contract
- Sign-off criteria

## Phase 8: Complexity Estimate

**Size:** Large  
**Estimated Effort:** 2-4 implementation weeks for first production pass  
**Risk:** Medium

**Risk Rationale:**
- UX and architecture are mature.
- Final commercial/proof content remains unresolved.
- UI foundation is intentionally created during implementation, which requires discipline.
- Bilingual responsive content can expose layout issues if not tested early.

**Dependencies:**
- Approved prices and trial duration before public launch
- Approved teacher bios, portraits, credentials, testimonials, proof assets, lesson screenshots
- Final prepared Telegram messages or safe generic fallback
- Analytics vendor can remain deferred if event adapter exists

## Phase 9: Special Considerations

- Treat `Epic 0: in-code UI foundation` as mandatory, not optional polish.
- Do not ship mock proof, mock testimonials, mock teachers, or mock prices as real launch content.
- The earlier single-page prototype is historical; it is not the production IA.
- The earlier six-route IA is superseded by the four-route IA.
- Content records need source status: `mock`, `approved`, or `hidden`.
- UI primitives must not own route-specific public prose.
- Public pages should avoid unnecessary client-side state and heavy runtime dependencies.

## Phase 10: Confirmation & Next Steps

**Artifacts Ready:**
- Design Delivery: `_bmad-output/deliveries/DD-001-fluyo-production-site.yaml`
- Test Scenario: `_bmad-output/test-scenarios/TS-001-fluyo-production-site.yaml`
- Final UX Source: `_bmad-output/C-UX-Scenarios/00-multi-page-ia-redesign.md`
- Visual Layout Schema: `_bmad-output/planning-artifacts/fluyo-school-page-layout-schemas.html`
- Raw Design References: `docs/design-ref/design-els/`, `docs/design-ref/design-instagram-elements/`
- Architecture Spine: `_bmad-output/planning-artifacts/architecture/architecture-fluyo-school-2026-07-08/ARCHITECTURE-SPINE.md`

**Proposed Epic Breakdown:**
1. Epic 0: Extract in-code UI foundation
2. Epic 1: Content model, locale, routing, CTA, and tracking contracts
3. Epic 2: Home and Learning Paths
4. Epic 3: Teachers & Proof and Trial & Pricing
5. Epic 4: Quality, accessibility, responsive QA, analytics, and launch-content gates

**Action Items:**
- [ ] Architect: acknowledge receipt of DD-001 and TS-001.
- [ ] Architect: confirm or adjust epic breakdown.
- [ ] Architect: create implementation architecture/story plan from DD-001.
- [ ] Developer: start with Epic 0 before route build-out.
- [ ] Product owner: replace or approve launch-sensitive content before public launch.
- [ ] Designer: validate implementation with TS-001 when ready.

## Questions & Answers

Q: Is the design system complete before handoff?  
A: No. It is intentionally deferred into implementation as Epic 0 after standalone generation attempts produced poor token/system artifacts.

Q: Can implementation proceed anyway?  
A: Yes, if Epic 0 is treated as a required implementation workstream before route surfaces are built.

Q: Is architecture already available?  
A: Yes. The final architecture spine exists at `_bmad-output/planning-artifacts/architecture/architecture-fluyo-school-2026-07-08/ARCHITECTURE-SPINE.md`.

Q: What blocks public launch?  
A: Mock prices, trial duration, teacher bios/assets, testimonials, results, lesson screenshots, proof assets, policy-sensitive FAQ answers, and final Telegram prepared messages.

Q: Is the previously logged UI elements review board available?  
A: No. `_bmad-output/design-reviews/fluyo-ui-elements-review.html` is referenced in the WDS log but is missing from the current worktree and was not tracked by Git. Official handoff uses the verified layout schema and raw design-reference folders instead.

## Status

**Handoff Dialog:** Documented as structured packet  
**Architect Acknowledgement:** Pending  
**Delivery Status:** in_development  
**Official Handoff Notification:** `_bmad-output/deliveries/DD-001-official-handoff.md`  
**Direct Architect Acknowledgement:** pending outside this chat  
**Next Touch Point:** BMad architecture/story planning, implementation start, then designer validation through TS-001

## Official Handoff Update

**Issued At:** 2026-07-08T21:15:52+0300  
**Confirmed By:** king  
**Assigned To:** BMad Architect  
**Tracker:** `_bmad-output/deliveries/design-deliveries-tracker.md`

The delivery is now marked `in_development` for implementation planning. Because no separate BMad Architect responded inside this chat, direct architect acknowledgement remains pending and should be confirmed when the architect/dev workflow starts.
