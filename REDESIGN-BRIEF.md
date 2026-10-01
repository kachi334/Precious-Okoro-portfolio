# Full-Site Redesign Brief — Precious Okoro Portfolio

Paste this whole document back to Claude when you're ready to execute. It's self-contained — it doesn't assume Claude remembers this conversation.

---

## What this is

A full visual redesign of every page in `/Users/thechief/Downloads/Precious P/portfolio/` (index.html, about.html, work.html, experience.html, contact.html, moniger.html, fasttrackux.html, beacon.html), modeled closely on three reference sites, while keeping Precious's own colors, tags, and copy intact. This is a design/architecture pass, not a content rewrite — no new claims, no invented case-study details, no rewritten voice.

## References and what to take from each

1. **https://www.thecreativemena.com/** — restraint. Near-black background, one circular photo as the only visual anchor, huge negative space, minimal copy, no competing color blocks. Product work is shown as plain photography (devices in hand) in soft light cards against the dark page, not inside hard bordered boxes.

2. **https://www.arjun-r.com/** — the structural model for individual sections:
   - Headline treatment: mixed-weight fade across the sentence (bold → soft gray → back to full emphasis), with exactly ONE key phrase highlighted in a colored pill/stadium shape.
   - Work section: large soft-rounded-corner cards (not hard-edged boxes) alternating left/right, each paired with a plain-spoken one-sentence description and a small `year | category` meta line underneath.
   - Testimonials: named real people with their actual role, presented plainly, not generic quote-card filler.
   - Generous vertical whitespace between every section — nothing crowds anything else.
   - A simple, undecorated closing contact CTA.

3. **https://agarau.dev/** — the content/architecture model: no filler sections. Every section on the page must earn its place with real proof (a shipped case study, a real metric, real writing) — no generic "services" or "skills" grids with unverifiable claims. Homepage structure stays lean: hero → proof → work → writing-equivalent, nothing padded in between.

*(If "these 3" meant a different third site, correct this before Claude starts — this brief currently assumes agarau.dev is the third, since it's the architecture/restraint reference already driving this site's IA decisions.)*

## Hard constraints — do not change these

- **Accent colors**: keep the existing token system in `assets/style.css` exactly as-is — `--accent` (violet), `--accent-mint`, `--accent-amber`, `--accent-coral`, `--accent-sky`, and all their `-text` / `-deep` WCAG-tuned variants. Do not introduce a new palette. The warm cream base (`--paper: #FAF6ED`, `--surface: #FFFCF5`) established this session stays as the light-theme background.
- **Dark mode**: every change must keep working in `data-theme="dark"`, including the three "pinned" override blocks (`.dark-block`, `.violet-block`, `.mint-block`, `.client-deck`) that re-anchor light-mode tokens for punctuation sections. Re-verify contrast after any token-adjacent change rather than assuming it still passes.
- **Tags/pills**: keep all existing tag pills (skill tags on project cards, case-study skill/framework tags) — don't strip them down to nothing the way arjun-r.com's minimal version does. "Keep my colors and tags" is explicit.
- **Copy**: reuse existing, already-vetted copy verbatim wherever possible (case study descriptions, testimonial quotes, FAQ answers, bio paragraphs, CV blurb). Restructuring/re-flowing copy into a new layout is fine; inventing new claims, numbers, or testimonial content is not. If a section's copy doesn't fit the new layout, flag it rather than silently rewriting it.
- **Site structure**: this stays a multi-page site (index/about/work/experience/contact + 3 case studies) — do not collapse it into a single scrolling page like arjun-r.com's. The nav, page count, and IA built earlier this session (trimmed About/Experience teasers, no "How I Can Help" grid, h1 fixed on every page) stay.
- **Shape language already in place**: pill-shaped buttons/badges/tags (`border-radius: 999px`) are already applied globally — keep this, don't revert to the old hard-edged boxes.

## What's already built (as of this session) — extend it, don't redo it

- `index.html` hero: mixed-weight headline fade (`.headline-fade`), pill highlight on "systems" (`.headline-chip`), inline trust line folded into the subhead paragraph, dot-grid stadium portrait frame with 4 scattered skill-sticker badges (no photo — removed per feedback).
- `index.html` Featured Work section: large soft-rounded (32px) colored-glow project cards (`.project-feature-media .image-block`), alternating sides, 140px vertical rhythm between projects, all original copy/tags/CTA preserved.
- Warm cream tokens and pill shape language in `assets/style.css` — already propagated to buttons, badges, and tag pills site-wide via shared classes.

## What's still untouched — this is the actual scope of this prompt

1. **Propagate the hero headline-fade + pill-highlight pattern** to every other page's hero/heading (about.html, work.html, experience.html, contact.html, and the `.case-hero h1` on all 3 case studies).
2. **Propagate the soft-rounded colored-glow card treatment** to:
   - `work.html`'s case-study grid and the "Additional Engagements" client-deck cards
   - Case study pages' image pairs/support images (`.case-image-pair`, `.case-support-image`, `.laptop-mockup`)
3. **Testimonials** (on index.html and contact.html) — restyle toward arjun's named-person treatment: real name, real role, calmer card, less decorative framing.
4. **Rebuild the FAQ, proof strip, and contact sections** with the same restraint/whitespace principles — audit each for whether it's still earning its place per the agarau.dev "no filler" standard, not just restyled.
5. **About, Experience, and Contact pages** — currently still using the pre-redesign hard-edged treatment entirely; need the full pass (headline fade, soft cards where relevant, generous spacing).
6. **Footer** — restyle to match, still using the old dark-block hard-edged pattern.

## How to execute

Go page by page, not everything at once. Suggested order: about.html → experience.html → work.html → contact.html → the 3 case study pages → final footer/nav pass across all 8. After each page, start a dev server (`preview_start`), verify in both light and dark theme, verify mobile width, and check in before moving to the next page — don't build all 8 pages blind and present them at the end. Commit and push to GitHub after each verified page per the standing workflow, not just at the very end.
