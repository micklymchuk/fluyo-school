# UX Scenarios: fluyo-school

> Scenario outlines connecting Trigger Map personas to concrete user journeys

**Created:** 2026-06-25
**IA Revision:** 2026-07-07
**Author:** king with Codex
**Method:** Whiteport Design Studio (WDS)

---

## Current IA Decision

The production site should be built from the finalized smaller four-page IA instead of the overloaded one-page prototype. The route-level source of truth is:

- [Final UX Layout Source](00-multi-page-ia-redesign.md)
- [HTML Page Layout Schemas](../planning-artifacts/fluyo-school-page-layout-schemas.html)

The existing 11 detailed specs remain source modules for content, components, and proof patterns. They should not be rebuilt as one continuous scroll page, and Exam/Kids/Adults should not be split into separate routes unless this planning decision is reopened.

---

## Scenario Summary

| ID | Scenario | Persona | Route Touchpoints | Priority | Status |
|----|----------|---------|-------------------|----------|--------|
| 01 | Danylo's Exam Trial Booking | Danylo the Deadline-Driven Exam Student | Home -> Learning Paths -> Pricing/Telegram | P1 | UX layout finalized |
| 02 | Olena's Parent Trust Check | Olena the Observant Parent | Home -> Learning Paths -> Teachers -> Pricing/Telegram | P2 | UX layout finalized |
| 03 | Marta's Adult Speaking Fit | Marta the Momentum-Seeking Adult | Home -> Learning Paths -> Pricing/Telegram | P3 | UX layout finalized |

---

## Scenarios

### [01: Danylo's Exam Trial Booking](01-danylo-exam-trial-booking/01-danylo-exam-trial-booking.md)
**Persona:** Danylo the Deadline-Driven Exam Student — wants a clear path from current level to target score and fears wasting weeks on generic lessons.
**Route Touchpoints:** `/`, `/programs#exam-preparation`, `/pricing?path=exam`, Telegram
**User Value:** Danylo understands exam fit, teacher-led preparation, paid trial value, formats, and price before messaging Telegram.
**Business Value:** Fluyo receives a qualified Telegram inquiry with exam, deadline, level, and trial intent.

---

### [02: Olena's Parent Trust Check](02-olena-parent-trust-check/02-olena-parent-trust-check.md)
**Persona:** Olena the Observant Parent — wants teacher safety, engaging online lessons, and visible child progress.
**Route Touchpoints:** `/`, `/programs#kids-parents`, `/teachers`, `/pricing?path=kids`, Telegram
**User Value:** Olena sees teacher warmth, child lesson proof, parent progress reassurance, practical answers, and a safe first step.
**Business Value:** Fluyo receives a parent-funded Telegram inquiry with child-specific context and fewer basic manager questions.

---

### [03: Marta's Adult Speaking Fit](03-marta-adult-speaking-fit/03-marta-adult-speaking-fit.md)
**Persona:** Marta the Momentum-Seeking Adult — wants practical speaking without judgment and a flexible rhythm she can keep.
**Route Touchpoints:** `/`, `/programs#adults-speaking`, `/pricing?path=adult`, Telegram
**User Value:** Marta recognizes a respectful adult speaking path and sees why Fluyo can feel practical, supportive, and manageable.
**Business Value:** Fluyo earns adult audience-path engagement and a qualified speaking-focused trial lead beyond exams and kids.

---

## Route Coverage Matrix

| Route | Page | Primary Decision | Source Modules |
|-------|------|------------------|----------------|
| `/` | Home | Is Fluyo relevant, trustworthy enough, and financially clear enough to continue? | 01.1 Landing Page / Hero, selected 03.1 Audience Paths, selected 01.4 Programs And Pricing |
| `/programs` | Learning Paths | Which learning path fits me, and what price shape should I expect? | 01.2 Exam Preparation Path, 02.1 Kids / Parents Path, 03.2 Adults Path, selected 01.3, selected 01.4, selected 02.2, selected 02.3, selected 03.3 |
| `/teachers` | Teachers & Proof | Do I trust the teachers, materials, and proof? | 02.2 Teachers, 02.3 Lesson Experience, selected 02.4 Results / Testimonials / FAQ / Final CTA, selected 03.3 Why Fluyo |
| `/pricing` | Trial & Pricing | What does the paid first step cost, what formats exist, and how do I book? | 01.3 How Learning Works, 01.4 Programs And Pricing, selected 02.4 Results / Testimonials / FAQ / Final CTA |

**Coverage:** 4 site routes using 11/11 existing WDS source modules.

---

## Next Phase

Before production implementation, create the design system and architecture from [Final UX Layout Source](00-multi-page-ia-redesign.md) and [HTML Page Layout Schemas](../planning-artifacts/fluyo-school-page-layout-schemas.html). The previous single-page prototype and earlier six-route split are historical artifacts.

---

_Generated with Whiteport Design Studio framework_
