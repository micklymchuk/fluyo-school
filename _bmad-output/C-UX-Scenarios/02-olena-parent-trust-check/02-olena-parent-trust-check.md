---
design_intent: L
design_status: not-started
---

# 02: Olena's Parent Trust Check

**Project:** fluyo-school
**Created:** 2026-06-25
**IA Revision:** 2026-07-07
**Method:** Whiteport Design Studio (WDS)

---

## Transaction (Q1)

**What this scenario covers:**
Decide Fluyo is safe and effective for my child, then book a paid trial through Telegram.

---

## Business Goal (Q2)

**Goal:** Secondary Goal: Build Trust Before The Visitor Compares Price
**Objective:** Proof visibility and trust-section engagement from the Trigger Map.

---

## User & Situation (Q3)

**Persona:** Olena the Observant Parent (Secondary)
**Situation:** Olena is a mother comparing online English options on her phone after her child complained that a previous lesson felt boring. She wants a teacher who feels warm and competent, but she also needs to know online lessons will be active enough to hold her child's attention.

---

## Driving Forces (Q4)

**Trigger:** Her child complains that a previous online English lesson felt boring.

**Hope:** See real teachers, engaging child lesson examples, and clear progress reassurance before she pays for a trial.

**Worry:** Choose an online lesson that her child dislikes, ignores, or abandons after one attempt.

> CONSTRAINT: One sentence per component. Phrases, not paragraphs.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile
**Entry:** Olena opens Fluyo from an Instagram post or another parent's shared link while comparing children's online English options on her phone.

---

## Best Outcome (Q7)

**User Success:**
Olena sees real teacher warmth, child-friendly lesson proof, parent-visible progress, pricing/format clarity, and messages Telegram with her child's age, level, and schedule needs.

**Business Success:**
Fluyo receives a parent-funded Telegram inquiry with child-specific context, stronger trust, and fewer basic questions for the manager to answer.

---

## Shortest Path (Q8)

1. **Home (`/`)** — Olena sees that kids are a first-class path and chooses it without reading exam or adult detail.
2. **Learning Paths (`/programs#kids-parents`)** — She confirms Fluyo understands child motivation, parent visibility, and a gentle first trial inside the gathered paths page.
3. **Teachers & Proof (`/teachers`)** — She verifies teacher warmth, credentials, lesson examples, and concise proof.
4. **Trial & Pricing (`/pricing?path=kids`)** — She resolves practical trial/format questions, then opens Telegram with child context. ✓

---

## Trigger Map Connections

**Persona:** Olena the Observant Parent (Secondary)

**Driving Forces Addressed:**
- ✅ **Want:** Feel that her child will be emotionally safe with the teacher.
- ❌ **Fear:** Pay for lessons her child does not enjoy.

**Business Goal:** Secondary Goal: Build Trust Before The Visitor Compares Price, especially proof visibility and trust-section engagement.

---

## Scenario Steps

Route-level steps for the multi-page IA. Existing detailed page specs remain source modules, not one-page scroll sections.

| Step | Route | Source Modules | Purpose | Exit Action |
|------|-------|----------------|---------|-------------|
| 02.1 | `/` | selected `01.1-landing-page-hero/`, selected `03.1-audience-paths/`, selected `01.4-programs-and-pricing/` | Recognize that Fluyo has a dedicated kids path and visible price review. | Navigate to `/programs#kids-parents`. |
| 02.2 | `/programs#kids-parents` | `02.1-kids-parents-path/`, selected `02.2-teachers/`, selected `02.3-lesson-experience/`, selected `01.4-programs-and-pricing/` | Confirm parent reassurance, child engagement, progress visibility, and child-path price hints. | Open Telegram with child context or continue to `/teachers`. |
| 02.3 | `/teachers` | `02.2-teachers/`, `02.3-lesson-experience/`, selected `02.4-results-testimonials-faq-final-cta/` | Verify real teachers, credentials, lesson proof, and concise parent/student proof. | Continue to `/pricing?path=kids` or open Telegram. |
| 02.4 | `/pricing?path=kids` | selected `01.4-programs-and-pricing/`, selected `02.4-results-testimonials-faq-final-cta/` | Resolve practical paid-trial, schedule, format, and payment questions. | Final Telegram booking click. ✓ |

**Kids block** (`/programs#kids-parents`) carries the full Olena entry context (Q3 + Q4 + Q5 + Q6).
**Decision budget:** Olena should get teacher and lesson proof without a long marketplace, testimonial wall, or exam/adult content.
