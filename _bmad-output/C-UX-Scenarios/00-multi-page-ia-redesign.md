# Final UX Layout Source: Fluyo School

**Project:** fluyo-school  
**Created:** 2026-07-07  
**Finalized:** 2026-07-07  
**Method:** Whiteport Design Studio (WDS)  
**Status:** UX planning source of truth before production build  
**Layout Schema:** [Page Layout Schemas](../../planning-artifacts/fluyo-school-page-layout-schemas.html)

---

## Design Decision

The current source of truth for the site is a small four-page structure:

1. **Home** (`/`)
2. **Learning Paths** (`/programs`)
3. **Teachers & Proof** (`/teachers`)
4. **Trial & Pricing** (`/pricing`)

Exam Preparation, Kids & Parents, and Adults Speaking are gathered into the single **Learning Paths** page. This keeps the site small while preserving the three approved WDS personas and conversion goals.

The approved strategy remains unchanged:

- **Danylo the Deadline-Driven Exam Student:** primary paid-trial conversion persona.
- **Olena the Observant Parent:** secondary trust and retention persona.
- **Marta the Momentum-Seeking Adult:** tertiary recognition and speaking-confidence persona.
- **Primary conversion engine:** confident paid trial bookings through Telegram.
- **Trust goal:** show proof before deep price comparison.
- **Audience goal:** exams, kids, and adults are recognized quickly.
- **Price clarity rule:** Home gets a compact price preview; Learning Paths gets path price hints; full comparison stays on Trial & Pricing.

The previous 11 detailed page specs remain valid as source modules. They should be composed into these four page schemas, not rebuilt as an 11-section landing page and not split into separate `/exams`, `/kids`, or `/adults` routes.

---

## Page Inventory

| Route | Page | Visitor Decision | Primary CTA | Source Modules |
|-------|------|------------------|-------------|----------------|
| `/` | Home | "Is Fluyo relevant, trustworthy enough, and financially clear enough to continue?" | Choose a path / book trial | 01.1, selected 03.1, selected 01.4 |
| `/programs` | Learning Paths | "Which learning path fits me, and what price shape should I expect?" | Continue to pricing / proof / Telegram | 01.2, selected 01.3, 02.1, selected 02.2, selected 02.3, 03.2, selected 03.3, selected 01.4 |
| `/teachers` | Teachers & Proof | "Do I trust the teachers, materials, and proof?" | Book trial / view pricing | 02.2, 02.3, selected 02.4, selected 03.3 |
| `/pricing` | Trial & Pricing | "What does the paid first step cost, what formats exist, and how do I book?" | Open Telegram | 01.3, 01.4, selected 02.4 |

---

## Page Schemas

### `/` Home

**Page Purpose:** Establish Fluyo, route visitors into the right learning path, show compact proof, and provide enough price clarity that the first paid step does not feel hidden.

**Sections:**

1. **Global Header:** shared navigation, logo, language requirement, Instagram, Telegram CTA.
2. **Hero:** first-screen Fluyo promise and primary next step.
3. **Path Cards:** Exam Path Card, Kids Path Card, Adults Path Card. Cards lead to `/programs` or anchors inside `/programs`.
4. **Proof Snapshot:** Teacher-Led Proof, Progress Proof, Trial Step Proof.
5. **Trial & Prices Preview:** compact price preview for paid trial and lesson formats. No full pricing table.
6. **Footer / Contact Strip:** repeated contact and key route navigation.

**Do Not Include:** full teacher gallery, long FAQ, full testimonials, detailed methodology, full pricing comparison.

---

### `/programs` Learning Paths

**Page Purpose:** Gather Exam Preparation, Kids & Parents, and Adults Speaking into one page where visitors can compare path fit without jumping between three separate pages.

**Sections:**

1. **Global Header:** shared navigation.
2. **Learning Paths Header:** page title and short orientation.
3. **Exam Preparation:** exam fit, seriousness, structure, diagnostic-trial cue.
4. **Kids & Parents:** parent reassurance, child engagement, progress visibility cue.
5. **Adults Speaking:** adult recognition, real-life speaking situations, supportive method cue.
6. **Path Price Hints:** concise path-specific price signals. Full prices remain on `/pricing`.
7. **Learning Paths CTA Strip:** continue to `/pricing`, `/teachers`, or Telegram with selected path context.
8. **Footer / Contact Strip:** repeated contact and key route navigation.

**Do Not Include:** full pricing table, full teacher gallery, full testimonial wall, long FAQ.

---

### `/teachers` Teachers & Proof

**Page Purpose:** Give trust-sensitive visitors enough evidence about teachers, credentials, lesson materials, and outcomes before they compare full price or book.

**Sections:**

1. **Global Header:** shared navigation.
2. **Trust Header:** frames the page as the proof/checking page.
3. **Teacher Cards:** real teacher profiles and audience fit.
4. **Credentials Proof:** qualifications, certificates, experience, or methodology evidence.
5. **Lesson Proof:** lesson screenshots, materials, feedback examples, or lesson-flow evidence.
6. **Results And Testimonials:** concise outcomes/quotes/results only.
7. **Trust CTA Strip:** book trial, view pricing, or return to Learning Paths.
8. **Footer / Contact Strip:** repeated contact and key route navigation.

**Do Not Include:** full program explanations, duplicate Home path chooser, full pricing table.

---

### `/pricing` Trial & Pricing

**Page Purpose:** Make the paid trial and lesson formats clear enough for a qualified visitor to open Telegram with context.

**Sections:**

1. **Global Header:** shared navigation.
2. **Trial First Step:** paid trial price/duration placeholder and what the trial includes.
3. **Individual Format:** individual lesson pricing/fit block.
4. **Pair Format:** pair lesson pricing/fit block.
5. **Mini-Group Format:** mini-group lesson pricing/fit block.
6. **What Is Included:** teacher matching, live lesson, materials, feedback/progress.
7. **Practical FAQ:** payment, schedule, rescheduling, online format, language.
8. **Final Booking CTA:** Telegram CTA with path/format context.
9. **Footer / Contact Strip:** repeated contact and key route navigation.

**Do Not Include:** broad audience recognition copy, full teacher gallery, full testimonial wall.

---

## Navigation Model

**Primary header routes:** `/`, `/programs`, `/teachers`, `/pricing`, Telegram CTA.

**Mobile navigation:** collapsed menu with the same route order. Telegram remains visually distinct as the primary action.

**Path context rules:**

- Home path cards route to `/programs` with path context where possible: `#exam-preparation`, `#kids-parents`, `#adults-speaking`, or query state.
- Learning Paths CTAs route to `/pricing?path=exam`, `/pricing?path=kids`, or `/pricing?path=adult`, or to Telegram with path context.
- Teachers & Proof can preserve prior path context when entered from Learning Paths.
- Pricing should adapt its heading/helper state to `path=exam`, `path=kids`, or `path=adult` when present.
- If context is missing, Telegram opens with a generic paid-trial message.

---

## Source Module Migration

| Existing Spec | New Use |
|---------------|---------|
| 01.1 Landing Page / Hero | Home header, hero, path cards, proof snapshot, global navigation. |
| 01.2 Exam Preparation Path | Learning Paths / Exam Preparation block. |
| 01.3 How Learning Works | Learning Paths diagnostic-trial cue and Pricing trial-first-step explanation. |
| 01.4 Programs And Pricing | Home price preview, Learning Paths price hints, and full Pricing page. |
| 02.1 Kids / Parents Path | Learning Paths / Kids & Parents block. |
| 02.2 Teachers | Teachers & Proof page; compact teacher cue if needed inside Kids & Parents block. |
| 02.3 Lesson Experience | Teachers & Proof page; compact lesson cue if needed inside Kids & Parents block. |
| 02.4 Results / Testimonials / FAQ / Final CTA | Proof on Teachers & Proof; practical FAQ/final CTA on Pricing. |
| 03.1 Audience Paths | Home path cards and Learning Paths orientation. |
| 03.2 Adults Path | Learning Paths / Adults Speaking block. |
| 03.3 Why Fluyo | Selective adult trust reasons on Learning Paths and proof-backed reasons on Teachers & Proof. |

---

## Measurement Requirements

| Event | Purpose |
|-------|---------|
| `path_card_click` | Measures audience-path engagement from Home. |
| `program_path_view` | Measures which Learning Paths block receives attention. |
| `price_preview_view` | Measures whether visitors see compact price clarity before deeper pricing. |
| `pricing_view` | Measures whether visitors reach full pricing after path recognition or proof. |
| `teacher_proof_view` | Measures trust-section engagement. |
| `telegram_click` | Measures primary conversion CTA engagement. |
| `telegram_context` | Records whether inquiry context was exam, kids, adult, format, or generic. |

---

## Production Build Guardrails

- Use [Page Layout Schemas](../../planning-artifacts/fluyo-school-page-layout-schemas.html) as the visual planning source of truth.
- Build four production pages first: Home, Learning Paths, Teachers & Proof, Trial & Pricing.
- Do not rebuild the 11-section single HTML page.
- Do not split Exam, Kids, and Adults into separate routes unless this planning decision is reopened.
- Preserve bilingual production requirements.
- Keep mock prices, testimonials, teacher bios, proof, lesson screenshots, and policy-sensitive FAQ content marked as preview-only until replaced.
- Create the production design system and architecture before implementation starts.

---

## Open Questions

| # | Question | Context | Status |
|---|----------|---------|--------|
| 1 | Should the Learning Paths route slug be `/programs`, `/paths`, or `/learning-paths` in production? | Current schema uses `/programs`. | Open |
| 2 | What exact prices and trial duration should fill Home preview and Pricing page? | Current commercial terms are mock. | Open |
| 3 | What exact prepared Telegram messages should each path generate? | Context preservation improves qualified inquiry quality. | Open |
| 4 | Which proof assets are approved for launch? | Current proof/testimonial/teacher material is mock. | Open |

---

## UX Planning Completion Checklist

- [x] Preserves approved WDS personas.
- [x] Preserves paid-trial Telegram conversion goal.
- [x] Preserves trust-before-price strategy.
- [x] Adds price clarity before contact.
- [x] Gathers Exam, Kids, and Adults into one Learning Paths page.
- [x] Defines four page schemas and section order.
- [x] Maps all 11 existing source specs into the final layout.
- [x] Marks the HTML schema as the planning source of truth.
- [ ] Production design system created from this final UX layout.
- [ ] Production architecture created before implementation.
