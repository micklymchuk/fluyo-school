# Launch Content Approval Matrix

**Project:** fluyo-school  
**Created:** 2026-07-08  
**Method:** WDS Phase 4-5 continuation after DD-001 handoff  
**Status:** Content readiness artifact; production content still pending  
**Related Delivery:** `_bmad-output/deliveries/DD-001-fluyo-production-site.yaml`  
**Source Mock Pack:** `_bmad-output/E-Assets/content/mock-launch-content.md`

---

## Purpose

This matrix turns the mock launch-content pack into a production approval checklist for DD-001 implementation.

Implementation may use mock content for local preview and layout testing, but public launch must either:

1. render approved production content,
2. hide the affected section, or
3. fail/block release if the content is required for the page promise.

No mock teacher, testimonial, result, proof asset, price, trial term, or policy-sensitive FAQ answer may ship as real public content.

---

## Status Taxonomy

| Status | Meaning | Public Launch Behavior |
| --- | --- | --- |
| `approved` | Real production content reviewed by king/Fluyo and safe to publish. | Render normally. |
| `mock` | Placeholder content from the mock pack or implementation preview. | Preview only; block or hide in production. |
| `hidden` | Content intentionally omitted for launch. | Do not render public claim or placeholder. |
| `needs_input` | Final value/content has not been supplied. | Block release if required; otherwise hide. |
| `needs_review` | Supplied but not approved for publication, privacy, policy, or accuracy. | Do not render publicly until approved. |

**Implementation requirement:** every launch-sensitive content record must carry `sourceStatus: "approved" | "mock" | "hidden" | "needs_input" | "needs_review"` or equivalent.

---

## Required Release Gates

| Gate | Required Before Public Launch | Blocking Rule |
| --- | --- | --- |
| Commercial terms | Paid trial price/duration, recurring lesson prices, package/subscription structure if shown. | Block launch if pricing surfaces render mock or unknown values. |
| Teacher truth | Real teacher names, portraits, roles, bios, credentials, audience fit. | Hide teacher cards or block launch if fake profiles render as real. |
| Proof assets | Certificates, lesson screenshots/materials, results, progress examples. | Hide proof claims or block launch if privacy/source status is unresolved. |
| Testimonials/results | Real reviews/outcomes with permission, or section hidden. | Hide testimonial/result section if not approved. |
| Operational FAQ | Payment, schedule, cancellation, rescheduling, online format, language, trial contents. | Block launch if policy-sensitive answers are mock or unconfirmed. |
| Telegram behavior | Final prepared messages or approved generic fallback; app/browser fallback tested. | CTA may use generic direct Telegram link if prepared messages are not approved. |

---

## Route And Model Mapping

| Route | Sensitive Content | DD-001 Data Model |
| --- | --- | --- |
| `/` Home | price preview, proof snapshot, path CTAs, Telegram CTA | `PriceItem`, `ProofAsset`, `LearningPath`, `CtaIntent` |
| `/programs` Learning Paths | path descriptions, path price hints, exam list, kids/adult claims, Telegram path context | `LearningPath`, `PriceItem`, `ProofAsset`, `CtaIntent` |
| `/teachers` Teachers & Proof | teacher profiles, portraits, credentials, lesson proof, results/testimonials | `TeacherProfile`, `ProofAsset`, `Testimonial` |
| `/pricing` Trial & Pricing | trial terms, format prices, included items, practical FAQ, final Telegram CTA | `PriceItem`, `FaqItem`, `CtaIntent` |

---

## Commercial Terms

| ID | Current Mock Value | Routes | Required Production Input | Status | Public Handling |
| --- | --- | --- | --- | --- | --- |
| `price_trial` | 30 minutes, 300 UAH | `/`, `/pricing` | Exact paid trial price, duration, what is included, whether paid trial is always required. | `needs_input` | Block public pricing if not approved. |
| `price_individual` | 60 minutes, from 700 UAH | `/`, `/programs`, `/pricing` | Exact individual lesson price/range, lesson duration, billing unit. | `needs_input` | Block or hide price. |
| `price_pair` | 60 minutes, from 500 UAH / student | `/`, `/programs`, `/pricing` | Exact pair price, duration, per-student wording, pairing conditions. | `needs_input` | Block or hide price. |
| `price_mini_group` | 60 minutes, from 350 UAH / student | `/`, `/programs`, `/pricing` | Exact mini-group price, duration, per-student wording. | `needs_input` | Block or hide price. |
| `mini_group_size` | Up to 4 students | `/pricing` | Confirm max group size and any minimum group-start rules. | `needs_input` | Hide group-size claim if unconfirmed. |
| `packages_or_subscriptions` | Not defined | `/pricing` | Decide whether packages/subscriptions exist or are intentionally omitted. | `needs_input` | Omit package language until approved. |

---

## Teacher Profiles

| ID | Mock Profile | Intended Role | Required Production Input | Status | Public Handling |
| --- | --- | --- | --- | --- | --- |
| `mock_teacher_anna` | Anna K. | Adults / speaking practice | Real teacher name, portrait, bio, speaking/adult teaching fit, approved credentials. | `mock` | Replace, hide, or convert to neutral method copy. |
| `mock_teacher_sofia` | Sofia M. | Kids 6+ | Real teacher name, portrait, child-teaching fit, parent feedback practice, approved credentials. | `mock` | Replace, hide, or convert to neutral method copy. |
| `mock_teacher_mariia` | Mariia H. | Exam preparation | Real teacher name, portrait, exam-prep coverage, approved credentials, exam list alignment. | `mock` | Replace, hide, or convert to neutral method copy. |
| `mock_teacher_olena` | Olena P. | Teens / Business English | Real teacher name, portrait, teenage/adult/business fit, approved credentials. | `mock` | Replace, hide, or convert to neutral method copy. |

**Minimum viable launch option:** if real teacher profiles are not ready, hide individual teacher cards and use non-personal teacher-selection/process copy only if it is true and approved.

---

## Credentials And Certificate Proof

| ID | Mock Proof | Required Production Input | Privacy Requirement | Status | Public Handling |
| --- | --- | --- | --- | --- | --- |
| `mock_certificate_language_teaching` | English teaching methodology certificate | Real certificate/training title or omit. | Crop/blur personal data; confirm permission. | `mock` | Hide until approved. |
| `mock_certificate_exam_prep` | Exam preparation certificate/training | Real certificate/training or neutral methodology proof. | Remove issuing/private details if needed. | `mock` | Hide until approved. |
| `mock_certificate_child_teaching` | Online children teaching training | Real child-teaching credential or approved process claim. | Privacy-safe crop. | `mock` | Hide until approved. |

---

## Lesson Proof Assets

| ID | Mock Slot | Route Use | Required Production Input | Status | Public Handling |
| --- | --- | --- | --- | --- | --- |
| `lesson_kids_interactive` | Kids interactive lesson | `/teachers`, optional `/programs` cue | Approved screenshot/material sample or generated non-proof visual clearly treated as illustrative. | `needs_input` | Hide screenshot proof if not approved. |
| `lesson_adult_speaking` | Adult speaking practice | `/teachers`, `/programs` cue | Approved speaking-practice material sample or illustrative visual. | `needs_input` | Hide proof claim if not approved. |
| `lesson_exam_task` | Exam-prep task | `/teachers`, `/programs` cue | Approved worksheet/task sample with no official branding misuse. | `needs_input` | Hide if unapproved. |
| `lesson_feedback_preview` | Feedback after lesson | `/teachers`, `/pricing` included items | Approved feedback example with no personal data. | `needs_input` | Use neutral process copy or hide. |

**Privacy rule:** no student names, faces, chat logs, scores, contact details, or private comments without explicit permission and privacy-safe treatment.

---

## Testimonials And Reviews

| ID | Mock Testimonial | Audience | Required Production Input | Status | Public Handling |
| --- | --- | --- | --- | --- | --- |
| `mock_testimonial_parent_01` | Parent of 8-year-old learner | Kids / parents | Real parent review with permission, anonymization decision, and wording approval. | `mock` | Hide testimonial card until approved. |
| `mock_testimonial_exam_01` | Student preparing for NMT | Exam prep | Real student review with permission and exam/program accuracy. | `mock` | Hide testimonial card until approved. |
| `mock_testimonial_adult_01` | Adult learner, speaking practice | Adults | Real adult learner review with permission. | `mock` | Hide testimonial card until approved. |
| `mock_testimonial_group_01` | Pair lessons | Pair / group | Real student review or omit pair-specific testimonial. | `mock` | Hide testimonial card until approved. |

**Minimum viable launch option:** remove the testimonial section and rely on teacher/process/proof sections until real reviews are approved.

---

## Results And Proof Claims

| ID | Mock Claim | Required Production Input | Status | Public Handling |
| --- | --- | --- | --- | --- |
| `proof_speaking_confidence` | From passive knowledge to live replies | Approved qualitative result, anonymized learner story, or neutral process claim. | `mock` | Convert to neutral method copy or hide. |
| `proof_parent_visibility` | Parents see lesson logic | Approved parent-visible feedback example or operationally true process statement. | `mock` | Use only if process is confirmed. |
| `proof_exam_structure` | Preparation does not turn into chaos | Approved exam-prep process proof or neutral planning claim. | `mock` | Use only if exam process is confirmed. |

**Rule:** do not imply measured outcomes, guaranteed improvement, or verified results without real evidence.

---

## FAQ And Policy-Sensitive Answers

| ID | Current Topic | Required Approval | Status | Public Handling |
| --- | --- | --- | --- | --- |
| `faq_trial_included` | What is included in trial lesson? | Confirm teacher/manager workflow after trial. | `needs_review` | Publish only after operations approval. |
| `faq_trial_price` | Trial price | Replace mock 300 UAH / 30 min with final terms. | `needs_input` | Block if pricing shown. |
| `faq_format_choice` | Choosing individual/pair/mini-group | Confirm available formats and group cap. | `needs_review` | Publish after operations approval. |
| `faq_kids_online` | Online lessons for children | Confirm screenshots/material claims and feedback practice. | `needs_review` | Remove screenshot claims if assets unavailable. |
| `faq_adult_speaking` | Adult fear of mistakes | Confirm brand/method wording. | `needs_review` | Usually safe if method is true. |
| `faq_exam_list` | NMT, EVI, Cambridge, TOEFL, CELPIP | Confirm exact active exam list and teacher coverage. | `needs_input` | Hide unsupported exams. |
| `faq_payment` | Payment terms | Supply exact payment methods/timing/refund policy if mentioned. | `needs_input` | Block policy answer if missing. |
| `faq_schedule` | Scheduling | Supply scheduling rules and response expectations. | `needs_input` | Keep generic or hide. |
| `faq_rescheduling` | Cancellation/rescheduling | Supply exact policy. | `needs_input` | Block policy answer if missing. |
| `faq_language` | Ukrainian/English support | Confirm lesson/support languages. | `needs_review` | Publish after approval. |

---

## Telegram Prepared Messages

| ID | Current Mock Intent | Required Decision | Status | Public Handling |
| --- | --- | --- | --- | --- |
| `telegram_general_trial` | General paid trial message | Approve exact UA/EN text and URL encoding behavior. | `needs_review` | Direct Telegram URL can be used as fallback. |
| `telegram_exam` | Exam, deadline placeholders | Decide whether placeholders stay in message or context is prefilled from path only. | `needs_review` | Use generic exam intent if placeholders are risky. |
| `telegram_kids` | Child age, level, schedule placeholders | Approve wording and privacy expectations. | `needs_review` | Use generic kids inquiry if placeholders are risky. |
| `telegram_adult` | Goal, level, preferred format placeholders | Approve wording and format labels. | `needs_review` | Use generic adult inquiry if placeholders are risky. |
| `telegram_app_browser_fallback` | Optional prepared messages | Test mobile app, desktop browser, and copied URL behavior. | `needs_input` | Use direct `https://t.me/fluyo_manager` until tested. |

---

## Social And Contact Placement

| ID | Decision Needed | Current Status | Public Handling |
| --- | --- | --- | --- |
| `instagram_placement` | Confirm whether Instagram appears only in header/final CTA or also in proof/contact sections. | `needs_input` | Header/footer only is safest default. |
| `telegram_primary_channel` | Confirm Telegram manager handle remains `fluyo_manager`. | `needs_review` | Block CTA if handle changes or is unverified. |

---

## Implementation Contract

### Preview Mode

Preview mode may render `mock` records when visibly scoped to internal/local preview.

Recommended behavior:

```ts
type SourceStatus = 'approved' | 'mock' | 'hidden' | 'needs_input' | 'needs_review'
type RenderMode = 'preview' | 'production'
```

### Production Mode

Production mode must follow these rules:

| Record Status | Production Behavior |
| --- | --- |
| `approved` | Render. |
| `hidden` | Do not render. |
| `mock` | Do not render; fail required launch gate if required. |
| `needs_input` | Do not render; fail required launch gate if required. |
| `needs_review` | Do not render; fail required launch gate if required. |

### Required Build/Release Check

Before public deployment, check:

- no visible `mock_*` IDs render in public pages,
- no `sourceStatus: "mock"` record renders in production mode,
- required `PriceItem` records are `approved` or the pricing section is intentionally hidden,
- required `TeacherProfile`, `ProofAsset`, and `Testimonial` records are `approved` or their sections are hidden,
- policy-sensitive `FaqItem` records are `approved` or omitted,
- Telegram CTA has an approved direct fallback even if prepared messages are deferred.

---

## Immediate Input Checklist For king

1. Exact paid trial price and duration.
2. Exact individual, pair, and mini-group prices/durations.
3. Whether packages/subscriptions exist for launch.
4. Final active exam list.
5. Real teacher list, bios, portraits, and credentials that can be public.
6. Approved certificate/proof assets or decision to hide credentials proof.
7. Approved lesson screenshots/materials or decision to use neutral illustrative visuals.
8. Real testimonials/results with permission or decision to hide testimonials.
9. Payment, scheduling, cancellation, and rescheduling policies.
10. Final Telegram prepared-message behavior and fallback.
11. Final Instagram placement.

---

## Recommended Launch-Safe Defaults Until Inputs Arrive

- Keep full pricing unavailable in production unless exact terms are approved.
- Use direct Telegram CTA as fallback without prepared message complexity.
- Hide individual teacher cards if real teacher assets are not approved.
- Hide testimonials until real reviews are approved.
- Convert proof/result claims to neutral process copy or hide them.
- Keep FAQ limited to operationally confirmed answers.
- Keep mock content in source only for preview and layout testing.
