# Routes And Measurement

This companion binds page-level scope, navigation context, and event names for `SPEC-fluyo-school`.

## Routes

| Route | Page | Visitor decision | Required sections |
| --- | --- | --- | --- |
| `/` | Home | Is Fluyo relevant, trustworthy enough, and financially clear enough to continue? | Global header, hero, path cards, proof snapshot, trial/prices review, footer/contact strip. |
| `/programs` | Learning Paths | Which learning path fits me, and what price shape should I expect? | Learning Paths header, Exam Preparation, Kids & Parents, Adults Speaking, path price hints, CTA strip, footer/contact strip. |
| `/teachers` | Teachers & Proof | Do I trust the teachers, materials, and proof? | Trust header, teacher cards, credentials proof, lesson proof, results/testimonials, CTA strip, footer/contact strip. |
| `/pricing` | Trial & Pricing | What does the paid first step cost, what formats exist, and how do I book? | Trial first step, individual format, pair format, mini-group format, inclusions, practical FAQ, final booking CTA, footer/contact strip. |

## Navigation Context

- Header routes are `/`, `/programs`, `/teachers`, `/pricing`, plus the Telegram CTA.
- Home path cards route to `/programs#exam-preparation`, `/programs#kids-parents`, or `/programs#adults-speaking`.
- Learning Paths CTAs route to `/pricing?path=exam`, `/pricing?path=kids`, `/pricing?path=adult`, or Telegram with the same path context.
- Pricing adapts heading/helper state to `path=exam`, `path=kids`, or `path=adult` when present.
- Missing path context falls back to a generic paid-trial Telegram intent.

## Measurement Events

| Event | Purpose |
| --- | --- |
| `path_card_click` | Measures audience-path engagement from Home. |
| `program_path_view` | Measures which Learning Paths block receives attention. |
| `pricing_summary_view` | Measures whether visitors see compact price clarity before deeper pricing. |
| `pricing_view` | Measures whether visitors reach full pricing after path recognition or proof. |
| `teacher_proof_view` | Measures trust-section engagement. |
| `telegram_click` | Measures primary conversion CTA engagement. |
| `telegram_context` | Records whether inquiry context was exam, kids, adult, format, or generic. |

## Out Of Route Scope

- Home does not include the full teacher gallery, long FAQ, full testimonial wall, detailed methodology, or full pricing table.
- Learning Paths does not include the full pricing table, full teacher gallery, full testimonial wall, or long FAQ.
- Teachers & Proof does not include full program explanations, duplicate Home path chooser, or full pricing table.
- Trial & Pricing does not include broad audience recognition copy, full teacher gallery, or full testimonial wall.
