---
id: SPEC-fluyo-school
companions:
  - routes-and-measurement.md
  - content-and-launch-gates.md
  - ../../project-context.md
  - ../../planning-artifacts/architecture/architecture-fluyo-school-2026-07-08/ARCHITECTURE-SPINE.md
  - ../../E-Assets/content/mock-launch-content.md
sources:
  - ../../A-Product-Brief/project-brief.md
  - ../../A-Product-Brief/project-brief-addendum.md
  - ../../B-Trigger-Map/05-Key-Insights.md
  - ../../C-UX-Scenarios/00-multi-page-ia-redesign.md
---

> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate. Source documents listed in frontmatter are for traceability only.

# Fluyo School Production Website

## Why

Fluyo School needs a premium, human, bilingual website that turns interested visitors into confident paid-trial starters. The force behind the work is a conversion gap: exam students, parents, and adults need to recognize their path, trust the teachers, understand pricing, and open Telegram with enough context to book the first paid step.

## Capabilities

- **CAP-1**
  - **intent:** Visitors can understand the Fluyo promise, trust signal, audience paths, and compact price preview from Home.
  - **success:** `/` exposes a hero, three audience path cards, proof snapshot, trial/prices preview, and Telegram or path next steps without becoming the full proof or pricing page.

- **CAP-2**
  - **intent:** Visitors can compare exam preparation, kids/parents, and adult speaking paths on one Learning Paths page.
  - **success:** `/programs` gives each path its fit, proof cue, price hint, and next step to pricing, proof, or Telegram.

- **CAP-3**
  - **intent:** Trust-sensitive visitors can verify teachers, credentials, lesson experience, and outcomes before booking.
  - **success:** `/teachers` shows real or clearly gated teacher/proof assets and provides next steps to pricing or Telegram.

- **CAP-4**
  - **intent:** Qualified visitors can understand the paid trial first step and lesson format prices before messaging.
  - **success:** `/pricing` explains the trial, individual, pair, and mini-group formats, what is included, practical FAQ, and a final Telegram CTA.

- **CAP-5**
  - **intent:** Visitors can use the site in Ukrainian or English without losing page context.
  - **success:** Ukrainian is default, English is reachable through the switcher, and localized copy plus SEO metadata remain structurally matched.

- **CAP-6**
  - **intent:** Telegram booking CTAs preserve inquiry context.
  - **success:** CTA clicks can carry path or format context and emit `telegram_click` plus `telegram_context` events.

- **CAP-7**
  - **intent:** Implementers can replace mock launch content with approved production content from one typed source.
  - **success:** Mock prices, teachers, testimonials, screenshots, results, and trial duration cannot ship as approved public claims.

- **CAP-8**
  - **intent:** The site emits the agreed discovery, proof, pricing, and booking events through one adapter.
  - **success:** The seven UX event names are available independent of analytics vendor.

## Constraints

- V1 routes are `/`, `/programs`, `/teachers`, and `/pricing`; do not rebuild the 11-section single page or create separate `/exams`, `/kids`, or `/adults` routes.
- Primary conversion is paid trial booking through Telegram username `fluyo_manager`; direct pricing is shown before contact.
- Launch audiences are exam preparation students, parents/kids, and adults; exam preparation is the primary conversion persona while parents and adults remain strongly visible.
- Ukrainian is default and English is secondary; layouts must survive localized text expansion and SEO metadata must be localized.
- Teacher photos, certificates, lesson screenshots, testimonials, and results may be used only when approved and privacy-safe; mock proof remains preview-only.
- Mini-groups are capped at 4 students.
- Use Nuxt 4 on Cloudflare Pages with the in-code UI foundation defined by the architecture spine; do not create a standalone WDS design system for v1.
- Mock launch content is allowed for internal preview and layout testing only; public release requires approved production content or hidden dependent sections.

## Non-goals

- No CMS/admin, payments, scheduling, CRM, authentication, or automated enrollment in v1.
- No standalone WDS design-system package in v1.
- No separate SEO pages for exam prep, kids English, adult speaking, teens, or Business English in v1.
- No WhatsApp-first or multi-channel booking flow unless Telegram is intentionally replaced.

## Success signal

A Ukrainian-default or English visitor can identify the right path, see credible proof before deep price comparison, understand the paid trial and lesson formats, and open Telegram with path or format context. A pre-launch review can verify that no mock price, teacher, testimonial, result, screenshot, or trial-duration claim is presented as approved public content.

## Open Questions

- What are the final paid trial price and duration?
- What are the final prices for individual, pair, and mini-group lessons?
- Which teacher profiles, certificates, testimonials, student results, and lesson screenshots are approved for public launch?
- What prepared Telegram messages should be used for exam, kids, adult, format-specific, and generic inquiries?
- Which analytics vendor should receive the stable event contract before launch?
