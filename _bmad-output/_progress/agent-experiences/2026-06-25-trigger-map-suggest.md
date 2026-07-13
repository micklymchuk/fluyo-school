# Trigger Map Suggest Session

**Project:** fluyo-school  
**Mode:** Suggest  
**Started:** 2026-06-25  
**Facilitator:** Codex / Saga  

## Layer 1: WDS Form Learned

### Methodology Loaded

- `_bmad/wds/data/agent-guides/saga/trigger-mapping.md`
- `_bmad/wds/data/agent-guides/saga/dream-up-approach.md`
- `.agents/skills/wds-2-trigger-mapping/data/business-goals-template.md`
- `.agents/skills/wds-2-trigger-mapping/data/quality-checklist.md`
- `.agents/skills/wds-2-trigger-mapping/templates/trigger-map.template.md`
- `.agents/skills/wds-2-trigger-mapping/templates/persona-document.template.md`
- `.agents/skills/wds-2-trigger-mapping/data/key-insights-structure.md`

### Reference Substitution

The autonomous workflow references `docs/method/phase-wds-2-trigger-mapping-guide.md`, `docs/quick-start/0wds-2-trigger-mapping.md`, `src/data/agent-guides/saga/trigger-mapping.md`, `docs/models/impact-effect-mapping.md`, and `docs/method/dream-up-rubric-phase-2.md`. Those exact paths are not present in this repository. The installed WDS guide, dream-up guide, local templates, and quality checklist are used as the active methodology source for this session.

### Structure Internalized

- Four-layer map: Business Goals -> Product/Solution -> Target Groups -> Driving Forces.
- Business goals should be visionary, with SMART objectives as measures.
- Target groups should be limited to three or four prioritized groups.
- Personas must emphasize psychology and usage context rather than demographics.
- Driving forces must include both positive pulls and negative fears/frustrations.
- Solutions stay out of the map; design decisions are made against the map later.

### Quality Standards

- Strategic depth: specific psychology rather than surface observations.
- Usage-context clarity: active goals during this landing-page decision, not broad life goals.
- Negative drivers present and strong enough to inform content and UX.
- Actionable specificity: drivers should suggest concrete proof, messaging, structure, or CTA choices later.
- Business-goal connection: each persona must clearly serve trial booking, trust, pricing clarity, or proof confidence.

## Layer 2: Project Context (Initial Load)

### From Product Brief

**Business:** Fluyo School, a modern online English school positioned as premium, warm, practical, and teacher-led.  
**Brand idea:** Fluent + Flow; English learning should feel natural, confident, and manageable rather than overwhelming.  
**Primary conversion:** Paid trial lesson booking through Telegram.  
**Secondary actions:** View programs, meet teachers, explore pricing, review proof.  

### Confirmed Launch Audiences

1. Exam preparation students preparing for NMT, EVI, Cambridge, TOEFL, CELPIP, and similar goals.
2. Parents choosing online English lessons for children 6+.
3. Adults who want practical speaking confidence for life, work, travel, studies, or growth.

### Constraints And Open Gaps

- Ukrainian is the default language; English is secondary.
- Telegram manager URL is confirmed: `https://t.me/fluyo_manager`.
- Mini-groups are capped at four students.
- Pricing and paid trial duration are final content/production until confirmed.
- Teacher bios, testimonials, exact results, certificates, and lesson screenshots are approved in category but not cataloged.
- Contact strategy beyond Telegram is tracked.

### Strategic Direction

- The page must segment quickly into exams, kids, and adults.
- Trust and proof must appear before pricing, not only near the end.
- Pricing should be direct and easy to compare.
- The page should feel premium and warm, not childish, generic, or corporate.

## Step 1: Business Goals

### Layer 3: Domain Research

Sources checked:

- Preply English tutor listing: `https://preply.com/en/online/english-tutors`
- Cambly English page: `https://www.cambly.com/english?lang=en`
- Novakid kids English page: `https://www.novakidschool.com/`

Findings applied:

- Mature online-language pages make trial booking or tutor matching highly visible.
- Teacher proof is concrete: reviews, ratings, certificates, specialties, experience, lesson counts, or teaching style.
- Pricing/format visibility supports user confidence before contact.
- Parent-facing offers need extra reassurance: teacher qualifications, child progress visibility, feedback, recordings or account visibility, and preparation guidance.
- Progress language matters for adults and exam learners: clear goals, personalization, practice, and measurable improvement reduce perceived risk.

### Layer 4: Generated Artifact

Created `_bmad-output/B-Trigger-Map/01-Business-Goals.md` with three goals:

1. Turn qualified interest into paid trial bookings.
2. Build trust before the visitor compares price.
3. Make each launch audience feel immediately recognized.

The metrics are marked proposed because baseline traffic, final pricing, and trial duration are not confirmed.

### Layer 5: Self-Review

**Completeness score:** 8/9

- Vision present.
- Three visionary goals present.
- Three measurable objectives per goal present.
- Primary conversion is clearly marked as the engine.
- Assumptions and tracked dependencies are visible.
- Related documents are linked.
- Target groups are not yet connected because that is the next step.

**Quality score:** 6/7

- Goals are strategic, not just feature requests.
- Metrics support goals instead of replacing them.
- The primary goal maps directly to the product brief's conversion objective.
- Trust and audience-fit goals reflect the brief's key risks.
- Bilingual clarity is included because it affects credibility and conversion.
- Main gap: numeric targets are proposed without baseline data.

**Mistakes avoided:** 4/4

- No solutions are placed on the trigger map.
- No generic "better experience" goal is used without measurable backing.
- Goals are not demographics.
- Open assumptions are not hidden.

**Refinement plan:**

- Confirm whether the proposed target ranges are acceptable.
- Adjust metrics once traffic baseline, analytics plan, and pricing/trial details are known.
- In the next step, connect each target group to the three approved business goals.

### User Review

Approved by user on 2026-06-25 with "confirm".

## Step 2: Target Groups

### Step Guidance Loaded

- `.agents/skills/wds-2-trigger-mapping/steps-c/step-03-target-groups.md`

### Layer 3: Domain Research

Sources checked:

- Preply English tutor listing: `https://preply.com/en/online/english-tutors`
- Novakid kids English page: `https://www.novakidschool.com/`
- Lingoda English page: `https://www.lingoda.com/en/english/`

Findings applied:

- Exam and adult learners need visible matching to goals, schedule, budget, teacher profile, and lesson format.
- Parent-facing pages need teacher qualifications, age fit, progress visibility, and reassurance around the first lesson.
- Adult learners respond to speaking confidence, structured levels, flexibility, and practical real-world lesson topics.
- Strong language-learning pages separate audience needs instead of relying on one generic "learn English" promise.

### Layer 4: Generated Artifact

Created `_bmad-output/B-Trigger-Map/02-Target-Groups.md` with three prioritized personas:

1. Danylo the Deadline-Driven Exam Student - primary conversion persona.
2. Olena the Observant Parent - trust and retention persona.
3. Marta the Momentum-Seeking Adult - confidence and flexibility persona.

### Layer 5: Self-Review

**Completeness score:** 8/9

- Three focus groups selected from the confirmed launch paths.
- Each group has a narrative persona, not only bullet points.
- Each persona includes context, emotional state, behavior pattern, current behavior, and business-goal relationship.
- Prioritization rationale is explicit.
- Cross-group patterns and differences are documented.
- Open validation questions are captured.
- Main gap: names and priority order need user confirmation against real Fluyo customer knowledge.

**Quality score:** 6/7

- Personas are psychology-led rather than demographic-only.
- The parent/kids path correctly treats the parent as the buyer/decision maker while preserving child-fit concerns.
- The exam persona is tied to urgency and concrete proof needs.
- The adult persona is tied to speaking anxiety, flexible schedule, and low-pressure start.
- The page-level usage context is clear.
- Main gap: exact customer quotes or real examples are not yet available.

**Mistakes avoided:** 4/4

- Kept to three groups, within the 2-4 group limit.
- Did not add features to the map.
- Did not dilute launch focus with every possible program category.
- Did not treat target groups as simple age bands.

**Refinement plan:**

- Confirm or adjust the priority order.
- Decide whether Business English should remain inside adult learning or become a fourth group later.
- In Driving Forces, create three positive and three negative usage-context drivers per approved persona.

### User Review

Approved by user on 2026-06-25 with "Approved".

## Step 3: Driving Forces

### Step Guidance Loaded

- `.agents/skills/wds-2-trigger-mapping/steps-c/step-04-driving-forces.md`

### Layer 3: Domain Research

Sources checked:

- Preply English tutor listing: `https://preply.com/en/online/english-tutors`
- Novakid kids English page: `https://www.novakidschool.com/`
- Lingoda English page: `https://www.lingoda.com/en/english/`
- Foreign language anxiety overview: `https://en.wikipedia.org/wiki/Foreign_language_anxiety`
- Test anxiety overview: `https://en.wikipedia.org/wiki/Test_anxiety`

Findings applied:

- Foreign-language anxiety commonly centers on communication apprehension, test anxiety, and fear of negative evaluation.
- Deadline-driven exam learners need diagnostic clarity, structured practice, feedback, and reduced uncertainty.
- Parent-facing learning decisions need child engagement, teacher trust, progress visibility, and communication reassurance.
- Adult speaking learners need low-pressure correction, practical usage contexts, and a path that makes restarting feel manageable.
- Competitor/comparable pages consistently foreground teacher proof, structured paths, trial clarity, progress, and flexible formats.

### Layer 4: Generated Artifact

Created `_bmad-output/B-Trigger-Map/03-Driving-Forces.md` with four positive and four negative drivers for each approved persona:

1. Danylo the Deadline-Driven Exam Student.
2. Olena the Observant Parent.
3. Marta the Momentum-Seeking Adult.

The document also identifies shared drivers, unique drivers, and potential cross-persona tensions.

### Layer 5: Self-Review

**Completeness score:** 9/9

- Every persona has positive and negative driving forces.
- Each persona has four positive and four negative drivers, within the requested 3-5 range.
- Each driver is written in landing-page usage context.
- Each driver includes a Fluyo Promise or Fluyo Answer.
- Shared patterns, unique drivers, and tensions are captured.
- Open validation questions are listed.

**Quality score:** 6/7

- Drivers are specific enough to influence later content, proof, CTA, and section-order decisions.
- Negative drivers are strong and not treated as an afterthought.
- The drivers remain psychological rather than feature lists.
- The three personas have distinct motivations while sharing a coherent school-level pattern.
- Main gap: real customer language from Fluyo inquiries is not available, so wording should be validated against actual Telegram/Instagram conversations later.

**Mistakes avoided:** 4/4

- Did not skip negative drivers.
- Did not reduce drivers to generic "convenience" or "quality".
- Did not add solution features to the map.
- Did not proceed to prioritization without review.

**Refinement plan:**

- Confirm whether the strongest fears and wants match real Fluyo customers.
- In prioritization, score each driver by frequency, intensity, and fit.
- Use high-priority drivers to shape the final trigger map and feature-impact analysis.

### User Review

Approved by user on 2026-06-25 with "Approved".

## Step 4: Prioritization

### Step Guidance Loaded

- `.agents/skills/wds-2-trigger-mapping/steps-c/step-05-prioritization.md`

### Layer 3: Domain Research

Sources checked:

- MoSCoW method overview: `https://en.wikipedia.org/wiki/MoSCoW_method`
- Loss aversion overview: `https://en.wikipedia.org/wiki/Loss_aversion`

Findings applied:

- MoSCoW is useful for separating Must, Should, Could, and out-of-scope focus so launch tradeoffs are explicit.
- Loss aversion supports giving negative drivers extra attention when they represent wasted time, embarrassment, failed fit, or uncertainty.
- WDS frequency, intensity, and fit scoring was used as the primary driver prioritization model.

### Layer 4: Generated Artifact

Created `_bmad-output/B-Trigger-Map/04-Prioritization.md` with:

1. Business goal priority.
2. Top-goal objective priority.
3. Target group priority.
4. Driver scores for Danylo, Olena, and Marta.
5. MoSCoW design focus.
6. Final design focus statement.
7. Explicit strategic tradeoffs.

### Layer 5: Self-Review

**Completeness score:** 9/9

- Business goals are ranked with reasoning.
- Top-goal objectives are ranked with reasoning.
- Target groups are ranked with challenged tradeoff notes.
- Drivers are scored by frequency, intensity, and fit.
- Must/Should/Could focus statement is present.
- "Not for first launch focus" items are named.
- Research and related documents are linked.

**Quality score:** 6/7

- Priorities are tied to the approved business engine: paid trial bookings.
- The artifact makes hard choices instead of treating all audiences equally.
- Danylo receives primary design weight without removing Olena or Marta.
- Negative drivers get tie-break priority where relevant.
- Main gap: scores are reasoned estimates because analytics and customer inquiry data are not available yet.

**Mistakes avoided:** 4/4

- Did not rank by gut feel alone.
- Did not hide tradeoffs.
- Did not let broad audience coverage dilute launch conversion.
- Did not proceed to feature impact without user review.

**Refinement plan:**

- Confirm whether Danylo should remain the primary design target.
- Confirm whether the Must/Should/Could focus matches the intended launch scope.
- If approved, assemble the full trigger-map hub and proceed to feature-impact analysis or handoff.

### User Review

Approved by user on 2026-06-25 with "Approved".

## Feature Impact Analysis: Feature Extraction

### Step Guidance Loaded

- `.agents/skills/wds-2-trigger-mapping/steps-c/step-06a-extract-features.md`

### Extracted Feature List

Confirmed by user on 2026-06-25 with "Approved".

Confirmed features:

1. Hero promise and primary Telegram CTA.
2. Audience path routing.
3. Exam preparation path.
4. Kids/Parents path.
5. Adults path.
6. Why Fluyo section.
7. How learning works sequence.
8. Teacher proof section.
9. Lesson experience section.
10. Programs and pricing section.
11. Results and testimonials section.
12. FAQ section.
13. Bilingual language switcher and UA/EN content support.
14. Context-aware Telegram booking flow.
15. Wax-stamp / 3D visual motif system.
16. Final CTA section.

### Assessment Approach Approval

Loaded `.agents/skills/wds-2-trigger-mapping/steps-c/step-06b-confirm-assessment.md`.

Confirmed by user on 2026-06-25 with "Approved".

Scoring method:

- Danylo as Primary: High = 5, Medium = 3, Low = 1.
- Olena and Marta as supporting personas: High = 3, Medium = 1, Low = 0.

### Initial Assessment Approval

Loaded `.agents/skills/wds-2-trigger-mapping/steps-c/step-06c-make-assessment.md`.

Confirmed by user on 2026-06-25 with "Approved".

Top scores:

- Audience path routing (11)
- How learning works sequence (11)
- Teacher proof section (11)
- Programs and pricing section (11)
- Context-aware Telegram booking flow (11)
- Final CTA section (11)
- Bilingual UA/EN support (11)

### Feature Impact Document Generated

Loaded `.agents/skills/wds-2-trigger-mapping/steps-c/step-06d-generate-document.md`.

Created `_bmad-output/B-Trigger-Map/feature-impact-analysis.md`.

### User Review

Feature Impact Analysis approved by user on 2026-06-25 with "Approved".

## Completion

### Documents Generated

- `_bmad-output/B-Trigger-Map/00-trigger-map.md`
- `_bmad-output/B-Trigger-Map/trigger-map.md`
- `_bmad-output/B-Trigger-Map/01-Business-Goals.md`
- `_bmad-output/B-Trigger-Map/02-Target-Groups.md`
- `_bmad-output/B-Trigger-Map/02-Danylo-the-Exam-Student.md`
- `_bmad-output/B-Trigger-Map/03-Driving-Forces.md`
- `_bmad-output/B-Trigger-Map/03-Olena-the-Observant-Parent.md`
- `_bmad-output/B-Trigger-Map/04-Prioritization.md`
- `_bmad-output/B-Trigger-Map/04-Marta-the-Adult-Learner.md`
- `_bmad-output/B-Trigger-Map/05-Key-Insights.md`
- `_bmad-output/B-Trigger-Map/06-Feature-Impact.md`
- `_bmad-output/B-Trigger-Map/feature-impact-analysis.md`
- `_bmad-output/B-Trigger-Map/personas/index.md`

### Quality Verification

- Required files exist and are non-empty.
- Hub contains Mermaid diagram.
- Local markdown links resolve.
- Persona documents include driving forces with Fluyo Promise/Answer entries.
- Design log updated.
- WDS workflow status updated: Phase 2 Trigger Mapping is complete.
