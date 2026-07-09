# Review - Adversarial Divergence

Verdict: Pass after applied fixes.

Attacks attempted:

1. Two route builders both obey the four-route IA, but one stores language in local storage while another uses query params.
   - Fix applied: AD-3 and conventions now define Ukrainian as queryless default and English as `lang=en` for v1.

2. A proof-page builder puts mock screenshots under public assets while a pricing builder enforces mock status in content only.
   - Fix applied: structural seed now keeps public proof assets approved-only and keeps raw references outside public app assets by default.

3. A page builder localizes visible copy but hard-codes English meta tags.
   - Fix applied: AD-11 assigns localized SEO metadata to page content records and one helper.

4. A pricing CTA builder links directly to Telegram while the header uses prepared messages.
   - Covered by AD-5: all CTAs use one helper and typed inquiry context.

5. A section builder creates custom button/card styling while another uses UI primitives.
   - Covered by AD-7: UI foundation is local tokens plus shared primitives under `app/`.

No unresolved high-severity divergence remains in the spine.
