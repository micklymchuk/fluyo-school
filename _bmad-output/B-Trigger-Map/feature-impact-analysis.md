# Feature Impact Analysis: fluyo-school

> Strategic feature prioritization for Fluyo School's landing page

**Created:** 2026-06-25  
**Status:** Approved  
**Method:** WDS Trigger Mapping - Feature Impact Analysis  

---

## Scoring

**Primary Persona:** Danylo the Deadline-Driven Exam Student  
High = 5 pts | Medium = 3 pts | Low = 1 pt

**Supporting Personas:** Olena the Observant Parent, Marta the Momentum-Seeking Adult  
High = 3 pts | Medium = 1 pt | Low = 0 pts

**Max Possible Score:** 11  
**Must Have Threshold:** 8+ or Primary Persona High  

---

## Prioritized Features

| Rank | Feature | Danylo | Olena | Marta | Score | Decision |
| ---: | --- | --- | --- | --- | ---: | --- |
| 1 | Audience path routing | High (5) | High (3) | High (3) | 11 | Must Have |
| 2 | How learning works sequence | High (5) | High (3) | High (3) | 11 | Must Have |
| 3 | Teacher proof section | High (5) | High (3) | High (3) | 11 | Must Have |
| 4 | Programs and pricing section | High (5) | High (3) | High (3) | 11 | Must Have |
| 5 | Context-aware Telegram booking flow | High (5) | High (3) | High (3) | 11 | Must Have |
| 6 | Final CTA section | High (5) | High (3) | High (3) | 11 | Must Have |
| 7 | Bilingual UA/EN support | High (5) | High (3) | High (3) | 11 | Must Have |
| 8 | Lesson experience section | Medium (3) | High (3) | High (3) | 9 | Must Have |
| 9 | Results and testimonials section | High (5) | High (3) | Medium (1) | 9 | Must Have |
| 10 | Hero promise and primary Telegram CTA | High (5) | Medium (1) | Medium (1) | 7 | Must Have |
| 11 | FAQ section | Medium (3) | High (3) | Medium (1) | 7 | Consider |
| 12 | Exam preparation path | High (5) | Low (0) | Low (0) | 5 | Must Have |
| 13 | Why Fluyo section | Medium (3) | Medium (1) | Medium (1) | 5 | Consider |
| 14 | Kids/Parents path | Low (1) | High (3) | Low (0) | 4 | Consider |
| 15 | Adults path | Low (1) | Low (0) | High (3) | 4 | Consider |
| 16 | Wax-stamp / 3D visual motif system | Low (1) | Medium (1) | Medium (1) | 3 | Defer |

---

## Decisions

### Must Have MVP

- Audience path routing (11)
- How learning works sequence (11)
- Teacher proof section (11)
- Programs and pricing section (11)
- Context-aware Telegram booking flow (11)
- Final CTA section (11)
- Bilingual UA/EN support (11)
- Lesson experience section (9)
- Results and testimonials section (9)
- Hero promise and primary Telegram CTA (7)
- Exam preparation path (5)

**Why lower-scoring items can still be Must Have:** Hero promise and Exam preparation path score lower than 8 because they are less balanced across all personas, but both score High for the primary persona. By the confirmed method, any Primary High feature belongs in Must Have.

### Consider for MVP

- FAQ section (7)
- Why Fluyo section (5)
- Kids/Parents path (4)
- Adults path (4)

These features are strategically useful, but they should be built in a lean form after the Must Have conversion spine is solid. Kids/Parents and Adults are important launch paths, but they are not the primary conversion spine.

### Defer

- Wax-stamp / 3D visual motif system (3)

This motif can strengthen brand distinctiveness, but it should not compete with trust, proof, pricing, and booking clarity. Use only if it supports the Must Have content without delaying it.

---

## Feature Details & Rationale

### 1. Audience path routing - Must Have

**Strategic role:** Prevents the page from sounding generic and lets each visitor identify their path quickly.

**Persona rationale:**
- **Danylo:** Needs to find exam preparation immediately.
- **Olena:** Needs the kids path to speak to her as the decision maker.
- **Marta:** Needs adult speaking confidence to feel relevant, not hidden behind exam/kids messaging.

**Design implication:** The hero can stay broad, but the next interaction should route into Exams, Kids, and Adults without requiring a long scroll.

### 2. How learning works sequence - Must Have

**Strategic role:** Reduces uncertainty around the trial, level check, teacher plan, and regular lesson path.

**Persona rationale:**
- **Danylo:** Wants diagnostic clarity and structured preparation.
- **Olena:** Needs to know how child fit, feedback, and progress work.
- **Marta:** Needs a low-pressure path that makes restarting feel manageable.

**Design implication:** Treat this as a conversion section, not a decorative process strip.

### 3. Teacher proof section - Must Have

**Strategic role:** Teacher trust is the emotional center of the page.

**Persona rationale:**
- **Danylo:** Needs exam-capable teachers.
- **Olena:** Needs warm, safe, child-appropriate teachers.
- **Marta:** Needs supportive correction and non-judgmental speaking practice.

**Design implication:** Use real portraits, credentials, short bios, teaching style, and path relevance.

### 4. Programs and pricing section - Must Have

**Strategic role:** Direct pricing reduces anxiety before Telegram contact.

**Persona rationale:**
- **Danylo:** Needs to know whether serious preparation is financially realistic.
- **Olena:** Compares formats around family budget and schedule.
- **Marta:** Needs flexible options without hidden commitment.

**Design implication:** Show direct comparison and label unresolved mock values clearly until final prices are confirmed.

### 5. Context-aware Telegram booking flow - Must Have

**Strategic role:** Increases qualified inquiry quality and reduces manager friction.

**Persona rationale:**
- **Danylo:** Should arrive in Telegram with exam name and deadline context.
- **Olena:** Should arrive with child age, level, and schedule constraints.
- **Marta:** Should arrive with speaking goal and preferred format.

**Design implication:** Use path-specific CTA context or prepared messages if technically feasible.

### 6. Final CTA section - Must Have

**Strategic role:** Converts after proof and pricing have reduced risk.

**Persona rationale:** All personas need a confident final step after reading enough proof.

**Design implication:** The final CTA should include reassurance, not just repeat the button.

### 7. Bilingual UA/EN support - Must Have

**Strategic role:** Ukrainian-default content must feel native and trustworthy; English support must not break layouts.

**Persona rationale:** Awkward translation or clipped text undermines credibility across all groups.

**Design implication:** Treat bilingual content as a UX requirement, not only a translation layer.

### 8. Lesson experience section - Must Have

**Strategic role:** Shows that lessons are active, practical, and real.

**Persona rationale:**
- **Olena:** Needs proof the child will be engaged.
- **Marta:** Needs proof lessons create usable speech.
- **Danylo:** Benefits from seeing structured practice, though exam proof matters more.

**Design implication:** Use real screenshots/material visuals if available.

### 9. Results and testimonials section - Must Have

**Strategic role:** Converts trust into evidence.

**Persona rationale:**
- **Danylo:** Needs result credibility.
- **Olena:** Needs parent/student reassurance.
- **Marta:** Needs proof of confidence growth, but less urgently than the other two.

**Design implication:** Segment proof by path where possible.

### 10. Hero promise and primary Telegram CTA - Must Have

**Strategic role:** Establishes the promise and first action.

**Persona rationale:** High for Danylo because the primary CTA must quickly lead to trial booking; medium for Olena and Marta because they need more proof before action.

**Design implication:** Keep the hero clear, broad, and action-oriented, then route quickly into paths.

### 11. FAQ section - Consider

**Strategic role:** Handles objections after core proof and pricing.

**Persona rationale:** Especially useful for parents; supportive for adults and exam students.

**Design implication:** Include a lean FAQ in MVP if content is ready, but do not let it delay core proof.

### 12. Exam preparation path - Must Have

**Strategic role:** Primary persona path and strongest launch conversion opportunity.

**Persona rationale:** High for Danylo, low for Olena and Marta.

**Design implication:** Even though cross-persona score is low, this must be prominent because primary persona impact is high.

### 13. Why Fluyo section - Consider

**Strategic role:** Explains differentiation and school philosophy.

**Persona rationale:** Supports all personas but usually indirectly.

**Design implication:** Keep it concise and proof-backed. Avoid generic claims.

### 14. Kids/Parents path - Consider

**Strategic role:** Important launch path for parent trust and retention.

**Persona rationale:** High for Olena, low for the other personas.

**Design implication:** It should exist in MVP as a path card and focused section, but it does not need to dominate the page.

### 15. Adults path - Consider

**Strategic role:** Broadens demand and expresses the "English in flow" promise.

**Persona rationale:** High for Marta, low for the other personas.

**Design implication:** Include practical speaking and flexible formats, but keep it lean for first launch.

### 16. Wax-stamp / 3D visual motif system - Defer

**Strategic role:** Brand distinctiveness.

**Persona rationale:** Does not directly resolve the highest-conversion fears.

**Design implication:** Use restraint. Visual polish should support trust, not replace proof.

---

## Strategic Implications

1. **The MVP spine is proof-led conversion.** The page should not start from brand decoration or broad education storytelling. It should route visitors, prove teacher trust, explain the trial, show pricing, and move to Telegram.

2. **Exam preparation should shape the sharpest conversion path.** Danylo is the primary persona because urgency and specificity make him the strongest paid-trial candidate.

3. **Parents and adults still need first-class recognition.** They should not dominate the priority stack, but their paths must feel real enough to avoid making Fluyo look exam-only.

4. **Transparent pricing is strategic, not administrative.** Hidden pricing would create anxiety for all personas and conflict with the approved business goals.

5. **Brand motifs are secondary to evidence.** Wax-stamp and 3D elements can create memorability, but only after proof assets, teacher credibility, lesson visibility, and booking clarity are in place.

---

## Questions For Designer

1. How can the first viewport signal premium warmth while still making the Telegram trial CTA obvious?
2. What is the cleanest way to route into Exams, Kids, and Adults immediately after the hero?
3. How can exam seriousness and brand softness coexist without weakening either?
4. Which proof assets should appear before pricing so a paid trial feels justified?
5. How should teacher cards show both credibility and warmth without becoming dense?
6. Can Telegram CTAs preserve path context without feeling mechanically personalized?
7. How should bilingual UA/EN content be structured so Ukrainian remains native and English does not break layout?
8. Where can wax-stamp or 3D motifs add brand memory without distracting from proof?

---

## Related Documents

- [Trigger Map Hub](00-trigger-map.md)
- [Business Goals](01-Business-Goals.md)
- [Target Groups](02-Target-Groups.md)
- [Driving Forces](03-Driving-Forces.md)
- [Prioritization](04-Prioritization.md)
- [Danylo the Exam Student](02-Danylo-the-Exam-Student.md)
- [Olena the Observant Parent](03-Olena-the-Observant-Parent.md)
- [Marta the Adult Learner](04-Marta-the-Adult-Learner.md)

---

_Generated with Whiteport Design Studio framework_  
_Strategic input for Phase 4: UX Design and Phase 6: PRD/Development_
