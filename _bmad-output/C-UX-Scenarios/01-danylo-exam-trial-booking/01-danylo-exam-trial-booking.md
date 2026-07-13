---
design_intent: L
design_status: not-started
---

# 01: Danylo's Exam Trial Booking

**Project:** fluyo-school
**Created:** 2026-06-25
**IA Revision:** 2026-07-07
**Method:** Whiteport Design Studio (WDS)

---

## Transaction (Q1)

**What this scenario covers:**
Decide Fluyo can help with my exact exam and book a paid trial through Telegram.

---

## Business Goal (Q2)

**Goal:** Primary Goal: Create Confident Paid Trial Starters
**Objective:** Paid trial booking rate and qualified inquiry quality from the Trigger Map.

---

## User & Situation (Q3)

**Persona:** Danylo the Deadline-Driven Exam Student (Primary)
**Situation:** Danylo is a university applicant studying from his phone between evening practice tasks, six weeks before an English exam that affects admission. He has been using YouTube and practice tests, but now feels he needs a teacher to diagnose his weak spots and build a realistic plan.

---

## Driving Forces (Q4)

**Trigger:** A frustrating practice test six weeks before the exam makes Danylo realize scattered self-study is not enough.

**Hope:** Find proof that Fluyo understands his exact exam and can turn his current level into a clear preparation plan.

**Worry:** Waste precious weeks on pleasant but generic lessons that do not improve his exam readiness.

> CONSTRAINT: One sentence per component. Phrases, not paragraphs.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile
**Entry:** Danylo searches on mobile for exam-prep English help after a frustrating practice test, sees Fluyo in search or Instagram, and opens the landing page to check whether it covers his exact exam.

---

## Best Outcome (Q7)

**User Success:**
Danylo understands that Fluyo covers his exam, sees credible teacher-led preparation, knows what the paid trial includes, compares formats/pricing, and messages Telegram with his exam, deadline, and level.

**Business Success:**
Fluyo receives a qualified Telegram inquiry that can convert into a paid trial booking, with enough context to reduce manager back-and-forth.

---

## Shortest Path (Q8)

1. **Home (`/`)** — Danylo recognizes Fluyo as a serious teacher-led English school and chooses the exam path without scanning kids or adult detail.
2. **Learning Paths (`/programs#exam-preparation`)** — He confirms his exam is covered inside the gathered paths page, sees that preparation is structured, and understands the paid trial as a diagnostic first step.
3. **Trial & Pricing (`/pricing?path=exam`)** — He compares the trial, individual, pair, and mini-group options, then opens Telegram with exam context. ✓

---

## Trigger Map Connections

**Persona:** Danylo the Deadline-Driven Exam Student (Primary)

**Driving Forces Addressed:**
- ✅ **Want:** See a clear path from current level to target score before committing.
- ❌ **Fear:** Waste weeks on lessons that are too general.

**Business Goal:** Primary Goal: Create Confident Paid Trial Starters, especially paid trial booking rate and qualified inquiry quality.

---

## Scenario Steps

Route-level steps for the multi-page IA. Existing detailed page specs remain source modules, not one-page scroll sections.

| Step | Route | Source Modules | Purpose | Exit Action |
|------|-------|----------------|---------|-------------|
| 01.1 | `/` | `01.1-landing-page-hero/`, selected `03.1-audience-paths/`, selected `01.4-programs-and-pricing/` | Recognize Fluyo, see compact proof and price review, then choose the exam path. | Navigate to `/programs#exam-preparation`. |
| 01.2 | `/programs#exam-preparation` | `01.2-exam-preparation-path/`, selected `01.3-how-learning-works/`, selected `01.4-programs-and-pricing/` | Confirm exact exam coverage, structured preparation, diagnostic trial value, and price shape. | Open Telegram with exam context or continue to `/pricing?path=exam`. |
| 01.3 | `/pricing?path=exam` | selected `01.3-how-learning-works/`, `01.4-programs-and-pricing/` | Compare trial and lesson formats without unrelated kids/adult content. | Final Telegram booking click. ✓ |

**First route** (`/`) includes full entry context (Q3 + Q4 + Q5 + Q6).
**Decision budget:** Danylo should see exam fit first within Learning Paths and should not need to read parent or adult detail before reaching exam trial/pricing.
