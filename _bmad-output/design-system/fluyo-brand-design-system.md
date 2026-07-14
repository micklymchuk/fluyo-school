# Fluyo School — Brand Design System

Extracted from the Instagram reference set in `public/design-insta/` (12 posts, 5 highlight icons, 8 stickers). All hex values sampled directly from the source images (dominant-color histograms, not eyeballed).

## Brand essence

**Vintage editorial romance with a wink.** The feed reads like a 1950s issue of Vogue that learned internet humor: black-and-white Hollywood photography, wax seals, postage stamps, and calligraphy — collaged with headphone cats, meme captions, and pop-culture stills. Old-school elegance is the frame; warmth and wit are the content.

Mood words: **warm · editorial · nostalgic · confident · playful · personal**
Tagline in use: *Learn · Speak · Grow*

What it is **not**: corporate ed-tech blue, flat illustration, neon gradients, sterile minimalism, childish primary colors.

## 1. Color palette

Two colors carry the entire brand — deep burgundy and warm cream. Everything else is a supporting tint of one of them, or neutral gray from the B&W photography.

### Core

| Token | Hex | Sampled from | Role |
|---|---|---|---|
| `burgundy` | `#7A1E2B` | opening-post frame, review-dark bg, highlight icons | Primary brand color. Frames, filled surfaces, headings, icons, CTAs |
| `burgundy-deep` | `#5E1420` | derived (hover/pressed of burgundy) | Hover/active states, text-on-cream when extra weight needed |
| `cream` | `#FAF5F2` | post backgrounds (identical across 6 posts) | Page background. Never pure white |
| `cream-on-dark` | `#F7F3EF` | text/photo mats inside burgundy frames | Text and surfaces sitting on burgundy |

### Supporting

| Token | Hex | Sampled from | Role |
|---|---|---|---|
| `rose` | `#8B5059` | soft accents in speaking-club, lessons posts | Muted secondary — dividers, secondary underlines, subdued icons |
| `blush` | `#E9D5D2` | word-hint post, F-monogram watermarks | Watermarks, soft fills, hover tint on cream |
| `ink` | `#3C2A2A` | body text (warm near-black) | Body text on cream (warm-toned, not pure black) |
| `charcoal` | `#494747` | B&W photo shadows | Secondary text, captions |
| `silver` | `#A5A5A5` | B&W retro photography midtones | Muted metadata, disabled states |
| `gray-wash` | `#D3D3D3` | earworm post background | Optional alternate section background (rare — one post only) |

### Usage rules observed in the references

- **Burgundy on cream, cream on burgundy** — that inversion is the whole system. Roughly 70% cream surfaces / 25% burgundy / 5% neutral gray.
- Burgundy is used at full strength for type and fills; softened variants (`rose`, `blush`) only for texture and watermarks, never for primary copy.
- Photography is desaturated (B&W or muted retro grade); burgundy props inside photos (telephone, coffee cup, phone case) provide the only color pop. Full-color photos are the exception and stay warm-toned.
- Contrast: `#7A1E2B` on `#FAF5F2` = 8.4:1 (AAA); `#F7F3EF` on `#7A1E2B` = 8.2:1 (AAA). `rose` and `blush` are decorative-only (fail AA for text).

## 2. Typography

Three voices, strict division of labor:

### Script — the brand voice
High-contrast formal calligraphy (Bickham-style). Used for: the "Fluyo" wordmark, emotional headings ("Student reviews", "happy as a clam"), single accent words inside headings ("SPEAKING *club*"), and the F-monogram watermark.

- Closest match: **Bickham Script Pro** (Adobe Fonts). Free equivalent: **Pinyon Script** (Google Fonts); softer alternative: Great Vibes.
- **Latin only** — in the references, script never sets Cyrillic; Ukrainian copy always falls to the sans. Keep script for brand moments and English accent words in both locales.
- Always burgundy on cream, or cream on burgundy. Large sizes only (it dies below ~28px).
- Never for body copy, buttons, or navigation.

### Sans — the workhorse
Clean neo-grotesque (Graphik/Helvetica-like in the posts). Sets everything else: body copy, lists, buttons, labels, all Ukrainian text.

- Recommendation: **Inter** (excellent Cyrillic, variable weights). Alternatives with the same feel + Cyrillic: Golos Text, Onest.
- Body: regular 400, generous line-height (~1.6 in the testimonial cards).
- Small labels ("founder & english teacher", "school"): regular, slightly tracked.

### Display sans — the loud voice
The same sans pushed hard: **bold, uppercase, tracked**, occasionally italic ("STOP SAYING *"HAPPY"*", "YOU LOOK LIKE MY NEW STUDENT", the giant vertical "SPEAKING").

- Bold 700–800, uppercase, letter-spacing ~0.04–0.08em, tight line-height (~1.1).
- Italic uppercase is a deliberate retro-ad gesture — use for punchy claims.

### Pairing pattern (seen repeatedly)
Script line + sans line stacked: script "Catherina" over sans "founder & english teacher"; script "Fluyo" over tracked sans "school". This lockup is the heading formula for the site.

## 3. Spacing & layout feel

- **Generous air on cream.** Content never touches edges; posts keep ~8–10% margins minimum. Section padding on the site should feel unhurried — 4–6rem vertical.
- **Everything lives in a frame.** The signature container is a thick burgundy border (border weight ≈ 3–5% of container width — visually ~16–32px) around a cream well, like a mat around a print. Second signature: the **postage-stamp card** — cream rounded card with a zigzag/scalloped perforated edge, used for testimonials.
- **Asymmetric collage, not grid rigidity.** Elements overlap (photos cross frame edges, stickers sit on corners, the polaroid frame in word-hint is offset behind the photo). Rotation of ±2–4° on decorative elements is on-brand.
- **Pill labels** for eyebrows/tags: burgundy pill, script or small-caps cream text ("about us").
- **Underline as decoration**: short burgundy rules under list items (the "Glad / Pleased / Delighted" list) — a natural style for link hovers and vocabulary lists.
- Radii: pills for labels/buttons; ~16–24px on cards; photos themselves square-cornered inside their frames.

## 4. Visual motifs (the brand's texture library)

1. **F-monogram watermark** — the script "Fs" scattered at low opacity (blush on cream, lighter burgundy on burgundy) as background texture.
2. **Postage-stamp edge** — perforated border around testimonials/photos.
3. **Wax seal with rose** — used as a corner stamp; good for "guarantee"/signature moments.
4. **Thick offset frame** — burgundy polaroid-style frame slipped behind a photo.
5. **B&W retro photography** — 1950s–60s editorial portraits, women whispering/gossiping (recurring pair), color-pop burgundy props.
6. **Harlequin diamonds** — burgundy-on-cream diamond pattern as a full background (lessons post).
7. **Collage props** — paperclips, stacked books, coffee, notebooks, the headphone cat; photo-real stickers with burgundy outline strokes.
8. **Line icons** — burgundy on cream, two styles in the highlights: filled silhouettes (laptop, book) and 2.5px-ish rounded strokes (speech bubbles + heart, people). Prefer the stroke style for UI icons.

## 5. Drop-in tokens (Tailwind v4 `@theme`)

Aligns `app/assets/css/tailwind.css` to the sampled brand (current file already uses a near-miss burgundy `#721827` and white page — the deltas below are the brand-accurate values):

```css
@theme static {
  --color-page: #faf5f2;              /* was #ffffff */
  --color-surface: #f7f3ef;
  --color-surface-muted: #e9d5d2;     /* blush */
  --color-surface-inverse: #7a1e2b;   /* burgundy fills */
  --color-text: #3c2a2a;              /* warm ink */
  --color-text-muted: #494747;
  --color-text-inverse: #f7f3ef;
  --color-border-hairline: rgba(122, 30, 43, 0.18);
  --color-accent-burgundy: #7a1e2b;   /* was #721827 */
  --color-accent-burgundy-strong: #5e1420;
  --color-accent-rose: #8b5059;
  --color-accent-subdued: #e9d5d2;

  --font-body: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Inter", ui-sans-serif, system-ui, sans-serif; /* bold/upper/tracked */
  --font-script: "Pinyon Script", "Bickham Script Pro", cursive; /* Latin brand moments only */

  --tracking-display: 0.06em;
  --radius-card: 1.25rem;
  --radius-pill: 9999px;
}
```

## 6. Application guide for the 3 pages

- **Page background**: cream `#FAF5F2` everywhere; burgundy full-bleed bands for high-emphasis sections (testimonials, final CTA) — mirroring the review-dark post.
- **Hero**: the opening-post formula — thick burgundy frame around a cream well, script headline crossing the frame edge.
- **Headings**: script + sans lockup (script accent word inside an uppercase display line).
- **Testimonials**: postage-stamp cards, cream on burgundy band.
- **Buttons**: burgundy pill, cream text; hover → `burgundy-deep`. Secondary: cream pill with burgundy 1.5px border.
- **Eyebrows/tags**: burgundy pill labels à la "about us".
- **Backgrounds**: F-monogram watermark at ≤6% opacity for texture; harlequin diamonds reserved for one feature moment, not repeated.
- **Imagery**: desaturated/retro-graded photos; if only color photos exist, apply a warm muted grade. Burgundy prop or garment in frame is the ideal.
