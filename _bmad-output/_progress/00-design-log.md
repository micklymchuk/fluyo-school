# Design Log

**Project:** fluyo-school
**Started:** 2026-06-25
**Method:** Whiteport Design Studio (WDS)

---

## Backlog

- [x] Define trigger map - Phase 2
- [x] Create user scenarios - Phase 3
- [x] Create UX specifications - Phase 4
- [x] Mock launch content gaps for implementation preview
- [ ] Replace mock launch content before public launch: exact pricing, trial duration, teacher bios, testimonials, lesson screenshots, and approved results

---

## Current

| Task | Started | Agent |
|------|---------|-------|
| - | - | - |

**Rules:** Mark what you start. Complete it when done (move to Log). One task at a time per agent.

---

## Design Loop Status

| Scenario | Step | Page | Status | Updated |
|----------|------|------|--------|---------|
| 01-danylo-exam-trial-booking | 01.1 | Landing Page / Hero | specified | 2026-06-26 |
| 01-danylo-exam-trial-booking | 01.2 | Exam Preparation Path | specified | 2026-06-26 |
| 01-danylo-exam-trial-booking | 01.3 | How Learning Works | specified | 2026-06-26 |
| 01-danylo-exam-trial-booking | 01.4 | Programs And Pricing | specified | 2026-06-26 |
| 02-olena-parent-trust-check | 02.1 | Kids / Parents Path | specified | 2026-06-26 |
| 02-olena-parent-trust-check | 02.2 | Teachers | specified | 2026-06-26 |
| 02-olena-parent-trust-check | 02.3 | Lesson Experience | specified | 2026-06-26 |
| 02-olena-parent-trust-check | 02.4 | Results / Testimonials / FAQ / Final CTA | specified | 2026-06-26 |
| 03-marta-adult-speaking-fit | 03.1 | Audience Paths | specified | 2026-06-26 |
| 03-marta-adult-speaking-fit | 03.2 | Adults Path | specified | 2026-06-26 |
| 03-marta-adult-speaking-fit | 03.3 | Why Fluyo | specified | 2026-06-26 |

**Status values:** `discussed` -> `wireframed` -> `specified` -> `explored` -> `building` -> `built` -> `approved` | `removed`

---

## Key Decisions

| Date | Decision | Context | Owner |
|------|----------|---------|-------|
| 2026-06-25 | Suggest mode used for Phase 2 Trigger Mapping | User selected Suggest mode for WDS Phase 2 | Codex / Saga + king |
| 2026-06-25 | Paid trial bookings are the business engine | Business Goals approved | Codex / Saga + king |
| 2026-06-25 | Danylo the Deadline-Driven Exam Student is primary design persona | Target Groups and Prioritization approved | Codex / Saga + king |
| 2026-06-25 | Olena the Observant Parent is secondary and Marta the Momentum-Seeking Adult is tertiary | Target Groups approved | Codex / Saga + king |
| 2026-06-25 | Must-have MVP focus is proof-led conversion: path routing, learning flow, teacher proof, pricing, Telegram flow, final CTA, bilingual support, lesson proof, results/testimonials, hero CTA, and exam path | Feature Impact Analysis approved | Codex / Saga + king |
| 2026-06-25 | Phase 3 will use three persona-named screen-flow scenarios for a small presentation site | Phase 3: Scenarios | Codex / Saga + king |
| 2026-06-25 | Page ownership assigned across scenarios: Danylo covers conversion spine, Olena covers trust proof, Marta covers adult recognition | Phase 3: Scenarios | Codex / Saga + king |
| 2026-06-25 | Phase 4 design intent set to Later for all three UX scenarios | Phase 3: Handover | Codex / Saga + king |

---

## Log

### 2026-06-26 - Phase 6: Mock Launch Content Pack Created

**Agent:** Codex / WDS Asset Generation  
**Status:** mock content ready for implementation preview  

**Artifacts Updated:**
- `_bmad-output/E-Assets/content/mock-launch-content.md`
- `_bmad-output/A-Product-Brief/project-brief-addendum.md`
- `_bmad-output/_progress/00-design-log.md`

**Summary:** Created a centralized mock launch-content pack for implementation preview. The pack includes mock commercial terms, four fictional teacher profiles, certificate proof placeholders, lesson screenshot slots, fictional testimonials, illustrative proof cards, FAQ answers, and Telegram message intents in Ukrainian and English. All proof and commercial content is explicitly marked as mock/placeholder and must be replaced before public launch.

**Open Items:** Replace mock content with approved production content before launch: exact prices, trial duration, teacher bios, real portraits, credentials, testimonials, lesson screenshots, results, policy-sensitive FAQ answers, and final Telegram prepared-message behavior.

**Next:** Use the mock content pack during implementation, while keeping production replacement as a launch gate.

### 2026-06-26 - Phase 4: 03.3 Why Fluyo Specified

**Agent:** Codex / Freya  
**Scenario:** 03 - Marta's Adult Speaking Fit  
**Page:** 03.3 Why Fluyo  
**Status:** specified  

**Artifacts Updated:**
- `_bmad-output/C-UX-Scenarios/03-marta-adult-speaking-fit/03.3-why-fluyo/03.3-why-fluyo.md`
- `_bmad-output/_progress/00-design-log.md`

**Summary:** Created the full WDS page specification for the Why Fluyo landing-page section: page basics, scenario continuity, 5 layout sections, 44 Object IDs, Ukrainian/English content, five reason pillars, proof snapshots, first-step fit sequence, final adult Telegram prompt, page/component states, non-form validation constraints, spacing objects, and typography tokens. The section keeps differentiation concise and proof-backed so it supports Marta's final decision without duplicating Teachers, Lesson Experience, Pricing, or Results sections.

**Open Items:** Final proof snapshot assets, whether pillar cards link to deeper sections or remain static, adult Telegram prepared message behavior, optional Instagram presence in this section, and approved commercial terms before public price/trial copy references them.

**Next:** All 11 Phase 4 page specifications are complete. Resolve launch content gaps next, then move into implementation.

### 2026-06-26 - Phase 4: 03.2 Adults Path Specified

**Agent:** Codex / Freya  
**Scenario:** 03 - Marta's Adult Speaking Fit  
**Page:** 03.2 Adults Path  
**Status:** specified  

**Artifacts Updated:**
- `_bmad-output/C-UX-Scenarios/03-marta-adult-speaking-fit/03.2-adults-path/03.2-adults-path.md`

**Summary:** Created the full WDS page specification for the Adults Path landing-page section: page basics, scenario continuity, 5 layout sections, 40 Object IDs, Ukrainian/English content, speaking-anxiety recognition, practical adult situations, supportive speaking method, individual/pair/mini-group format strip, Why Fluyo/Telegram/pricing interactions, page/component states, non-form validation constraints, spacing objects, and typography tokens. The section makes adult speaking feel practical and respectful without merging exams, kids, and adults into one vague topic.

**Open Items:** Adult lesson visuals, whether situation cards are selectable or static, final Why Fluyo anchor ID, and adult Telegram prepared message behavior.

**Next:** Continue Phase 4 with 03.3 Why Fluyo.

### 2026-06-26 - Phase 4: 03.1 Audience Paths Specified

**Agent:** Codex / Freya  
**Scenario:** 03 - Marta's Adult Speaking Fit  
**Page:** 03.1 Audience Paths  
**Status:** specified  

**Artifacts Updated:**
- `_bmad-output/C-UX-Scenarios/03-marta-adult-speaking-fit/03.1-audience-paths/03.1-audience-paths.md`

**Summary:** Created the full WDS page specification for the Audience Paths landing-page section: page basics, first-step context, 5 layout sections, 30 Object IDs, Ukrainian/English content, exam/kids/adults routing cards, adult recognition cues, selected-path CTAs, Telegram adult-goal interaction, page/component states, non-form validation constraints, spacing objects, and typography tokens. The section makes adults a first-class route while guarding against duplicate path-routing blocks if this spec merges with the hero Audience Path Preview.

**Open Items:** Whether this section merges with the hero Audience Path Preview or remains standalone, final anchor IDs for Exam/Kids/Adults, selected-path persistence for Telegram context, and audience path visual/icon assets.

**Next:** Continue Phase 4 with 03.2 Adults Path.

### 2026-06-26 - Phase 4: 02.4 Results / Testimonials / FAQ / Final CTA Specified

**Agent:** Codex / Freya  
**Scenario:** 02 - Olena's Parent Trust Check  
**Page:** 02.4 Results / Testimonials / FAQ / Final CTA  
**Status:** specified  

**Artifacts Updated:**
- `_bmad-output/C-UX-Scenarios/02-olena-parent-trust-check/02.4-results-testimonials-faq-final-cta/02.4-results-testimonials-faq-final-cta.md`

**Summary:** Created the full WDS page specification for the Results / Testimonials / FAQ / Final CTA landing-page section: page basics, 5 layout sections, 48 Object IDs, Ukrainian/English content, proof summary, testimonial filtering/expansion, parent-focused FAQ accordion, final Telegram and Instagram contact actions, page/component states, non-form validation constraints, spacing objects, and typography tokens. The section closes Olena's trust flow with approved-proof slots, practical answers, and a child-context booking prompt without inventing testimonials or unresolved policy details.

**Open Items:** Approved testimonials/results, final paid trial price/duration, final payment and rescheduling policy, testimonial filter mode, prepared Telegram message behavior, and whether Instagram is the only secondary contact/social link.

**Next:** Scenario 02 is fully specified. Continue Phase 4 with Scenario 03, starting 03.1 Audience Paths.

### 2026-06-26 - Phase 4: 02.3 Lesson Experience Specified

**Agent:** Codex / Freya  
**Scenario:** 02 - Olena's Parent Trust Check  
**Page:** 02.3 Lesson Experience  
**Status:** specified  

**Artifacts Updated:**
- `_bmad-output/C-UX-Scenarios/02-olena-parent-trust-check/02.3-lesson-experience/02.3-lesson-experience.md`

**Summary:** Created the full WDS page specification for the Lesson Experience landing-page section: page basics, 5 layout sections, 41 Object IDs, Ukrainian/English content, tabbed lesson-proof gallery, child lesson flow, parent-visible progress preview, Telegram and final-proof transitions, page/component states, non-form validation constraints, spacing objects, and typography tokens. The section focuses on proving that online lessons are active, structured, privacy-safe, and understandable for parents.

**Open Items:** Approved lesson screenshots/material previews, approved parent feedback/progress example, whether gallery media opens in zoom/dialog or stays static, and final Results / Testimonials / FAQ / Final CTA anchor ID.

**Next:** Continue Phase 4 with 02.4 Results / Testimonials / FAQ / Final CTA.

### 2026-06-26 - Phase 4: 02.2 Teachers Specified

**Agent:** Codex / Freya  
**Scenario:** 02 - Olena's Parent Trust Check  
**Page:** 02.2 Teachers  
**Status:** specified  

**Artifacts Updated:**
- `_bmad-output/C-UX-Scenarios/02-olena-parent-trust-check/02.2-teachers/02.2-teachers.md`

**Summary:** Created the full WDS page specification for the Teachers landing-page section: page basics, 5 layout sections, 33 Object IDs, Ukrainian/English content, teacher-card and certificate-proof interactions, page/component states, non-form validation constraints, spacing objects, and typography tokens. The section focuses on making teacher warmth, real credentials, child-teaching fit, and the transition to lesson-experience proof visible without turning the page into a marketplace catalog.

**Open Items:** Final launch teacher list, approved teacher portraits, approved credentials/certificates, whether teacher cards expand or stay static, and final Lesson Experience anchor ID.

**Next:** Continue Phase 4 with 02.3 Lesson Experience.

### 2026-06-26 - Phase 4: 02.1 Kids / Parents Path Specified

**Agent:** Codex / Freya  
**Scenario:** 02 - Olena's Parent Trust Check  
**Page:** 02.1 Kids / Parents Path  
**Status:** specified  

**Artifacts Updated:**
- `_bmad-output/C-UX-Scenarios/02-olena-parent-trust-check/02.1-kids-parents-path/02.1-kids-parents-path.md`

**Summary:** Created the full WDS page specification for the kids/parents landing-page section: page basics, first-step context, 5 layout sections, 29 Object IDs, Ukrainian/English content, teacher-proof and Telegram transition interactions, page/component states, non-form validation constraints, spacing objects, and typography tokens. The section focuses on parent reassurance, child engagement, progress visibility, and a warm transition into teacher proof.

**Open Items:** Approved child lesson screenshots/material previews, approved parent feedback/progress example, whether reassurance cards are interactive, and final Teachers anchor ID.

**Next:** Continue Phase 4 with 02.2 Teachers.

### 2026-06-26 - Phase 4: 01.4 Programs And Pricing Specified

**Agent:** Codex / Freya  
**Scenario:** 01 - Danylo's Exam Trial Booking  
**Page:** 01.4 Programs And Pricing  
**Status:** specified  

**Artifacts Updated:**
- `_bmad-output/C-UX-Scenarios/01-danylo-exam-trial-booking/01.4-programs-and-pricing/01.4-programs-and-pricing.md`

**Summary:** Created the full WDS page specification for the pricing conversion section: page basics, 5 layout sections, 29 Object IDs, Ukrainian/English content, Telegram and optional format-selection interactions, page/component states, non-form validation constraints, spacing objects, and typography tokens. The section keeps direct pricing as a launch requirement while preventing mock placeholder prices from being treated as final public content.

**Open Items:** Final paid trial price/duration, final recurring lesson prices, package/subscription structure, and whether format cards are selectable or comparative only.

**Next:** Danylo's Scenario 01 conversion spine is fully specified. Continue Phase 4 with Scenario 02, starting 02.1 Kids / Parents Path.

### 2026-06-26 - Phase 4: 01.3 How Learning Works Specified

**Agent:** Codex / Freya  
**Scenario:** 01 - Danylo's Exam Trial Booking  
**Page:** 01.3 How Learning Works  
**Status:** specified  

**Artifacts Updated:**
- `_bmad-output/C-UX-Scenarios/01-danylo-exam-trial-booking/01.3-how-learning-works/01.3-how-learning-works.md`

**Summary:** Created the full WDS page specification for the learning-process landing-page section: page basics, 5 layout sections, 28 Object IDs, Ukrainian/English content, Telegram and pricing-scroll interactions, page/component states, non-form validation constraints, spacing objects, and typography tokens. The section explains the paid trial as a diagnostic first step without relying on unapproved price or duration values.

**Open Items:** Final paid trial price/duration, selected-exam context persistence, and final Programs and Pricing anchor ID.

**Next:** Continue Phase 4 with 01.4 Programs And Pricing.

### 2026-06-26 - Phase 4: 01.2 Exam Preparation Path Specified

**Agent:** Codex / Freya  
**Scenario:** 01 - Danylo's Exam Trial Booking  
**Page:** 01.2 Exam Preparation Path  
**Status:** specified  

**Artifacts Updated:**
- `_bmad-output/C-UX-Scenarios/01-danylo-exam-trial-booking/01.2-exam-preparation-path/01.2-exam-preparation-path.md`

**Summary:** Created the full WDS page specification for the exam-preparation landing-page section: page basics, 5 layout sections, 28 Object IDs, Ukrainian/English content, exam-card selection behavior, Telegram and scroll interactions, states, non-form validation constraints, spacing objects, and typography tokens. The section is specified as an anchor on `/`, not a standalone route.

**Open Items:** Approved exam-prep proof/testimonial, selected-exam persistence behavior, and final How Learning Works anchor ID.

**Next:** Continue Phase 4 with 01.3 How Learning Works.

### 2026-06-26 - Phase 4: 01.1 Landing Page / Hero Specified

**Agent:** Codex / Freya  
**Scenario:** 01 - Danylo's Exam Trial Booking  
**Page:** 01.1 Landing Page / Hero  
**Status:** specified  

**Artifacts Updated:**
- `_bmad-output/C-UX-Scenarios/01-danylo-exam-trial-booking/01.1-landing-page-hero/01.1-landing-page-hero.md`

**Summary:** Created the full WDS page specification for the mobile-first landing hero: page basics, layout sections, 18 Object IDs, Ukrainian/English content, interaction behaviors, page/component states, non-form validation constraints, spacing objects, and typography tokens. The hero trust line was simplified to separate the school promise from audience segmentation, with audience paths carrying Exams, Kids, and Adults.

**Open Items:** Hero visual asset, browser SEO title/meta description, and final section anchor IDs.

**Next:** Continue Phase 4 with 01.2 Exam Preparation Path.

### 2026-06-25 - Phase 3: UX Scenarios Complete

**Agent:** Codex / Saga  
**Scenarios:** 3 scenarios covering 11 pages  
**Quality:** Excellent  

**Artifacts Created:**
- `_bmad-output/C-UX-Scenarios/00-ux-scenarios.md` - Scenario index and page coverage matrix
- `_bmad-output/C-UX-Scenarios/01-danylo-exam-trial-booking/01-danylo-exam-trial-booking.md` - Danylo's Exam Trial Booking
- `_bmad-output/C-UX-Scenarios/01-danylo-exam-trial-booking/01.1-landing-page-hero/01.1-landing-page-hero.md` - Scenario step 01.1 Landing Page / Hero
- `_bmad-output/C-UX-Scenarios/02-olena-parent-trust-check/02-olena-parent-trust-check.md` - Olena's Parent Trust Check
- `_bmad-output/C-UX-Scenarios/02-olena-parent-trust-check/02.1-kids-parents-path/02.1-kids-parents-path.md` - Scenario step 02.1 Kids / Parents Path
- `_bmad-output/C-UX-Scenarios/03-marta-adult-speaking-fit/03-marta-adult-speaking-fit.md` - Marta's Adult Speaking Fit
- `_bmad-output/C-UX-Scenarios/03-marta-adult-speaking-fit/03.1-audience-paths/03.1-audience-paths.md` - Scenario step 03.1 Audience Paths

**Summary:** Phase 3 defined three persona-named screen-flow scenarios for the Fluyo School landing page: Danylo's exam trial booking, Olena's parent trust check, and Marta's adult speaking fit. The approved page assignment covers all 11 views exactly once, with Danylo owning the paid-trial conversion spine, Olena owning trust and proof sections, and Marta owning adult audience recognition. Quality review scored all three scenarios Excellent across completeness, quality criteria, mistakes avoided, and best practices.

**Next:** Phase 4 - UX Design

---

### 2026-06-25 - Phase 2: Trigger Mapping Complete

**Agent:** Codex / Saga  
**Mode:** Suggest  
**Personas:** 3 (Danylo the Deadline-Driven Exam Student, Olena the Observant Parent, Marta the Momentum-Seeking Adult)  
**Business Goals:** 3  

**Artifacts Created:**
- `_bmad-output/B-Trigger-Map/00-trigger-map.md` - Visual overview, Mermaid map, and navigation hub
- `_bmad-output/B-Trigger-Map/trigger-map.md` - Workflow output alias for the hub
- `_bmad-output/B-Trigger-Map/01-Business-Goals.md` - Vision, SMART objectives, and flywheel
- `_bmad-output/B-Trigger-Map/02-Target-Groups.md` - Prioritized target groups and persona summaries
- `_bmad-output/B-Trigger-Map/02-Danylo-the-Exam-Student.md` - Primary persona document
- `_bmad-output/B-Trigger-Map/03-Driving-Forces.md` - Positive and negative driving forces
- `_bmad-output/B-Trigger-Map/03-Olena-the-Observant-Parent.md` - Secondary persona document
- `_bmad-output/B-Trigger-Map/04-Prioritization.md` - Business, persona, and driver priorities
- `_bmad-output/B-Trigger-Map/04-Marta-the-Adult-Learner.md` - Tertiary persona document
- `_bmad-output/B-Trigger-Map/05-Key-Insights.md` - Strategic implications for design and development
- `_bmad-output/B-Trigger-Map/06-Feature-Impact.md` - Checklist alias for feature impact analysis
- `_bmad-output/B-Trigger-Map/feature-impact-analysis.md` - Feature scoring and MVP priority guidance
- `_bmad-output/B-Trigger-Map/personas/index.md` - Persona document index
- `_bmad-output/_progress/agent-experiences/2026-06-25-trigger-map-suggest.md` - Suggest-mode process log

**Summary:** Phase 2 established paid trial booking through Telegram as the business engine, with trust-before-price and immediate audience recognition as supporting goals. The primary design persona is Danylo the Deadline-Driven Exam Student; Olena the Observant Parent and Marta the Momentum-Seeking Adult shape trust, retention, and broad speaking-confidence support. Feature impact analysis prioritizes a proof-led conversion spine: audience routing, learning flow, teacher proof, pricing, Telegram flow, final CTA, bilingual support, lesson proof, testimonials/results, hero CTA, and exam preparation path.

**Next:** Phase 3 - UX Scenarios

---

### 2026-06-25 - Product brief imported into WDS Phase 1
- Source brief: `_bmad-output/planning-artifacts/briefs/brief-fluyo-school-2026-06-25/brief.md`
- Source addendum: `_bmad-output/planning-artifacts/briefs/brief-fluyo-school-2026-06-25/addendum.md`
- Canonical WDS brief: `_bmad-output/A-Product-Brief/project-brief.md`
- Validation report: `_bmad-output/A-Product-Brief/validation-report.md`
- Phase 1 status: complete with warnings

---

## About This Folder

- **This file** - Single source of truth for project progress
- **agent-experiences/** - Compressed insights from design discussions
- **wds-workflow-status.yaml** - Project configuration and phase status
