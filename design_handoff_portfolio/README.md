# Handoff: Precious Okoro Portfolio Redesign

## Overview
A full redesign of Precious Okoro's content design portfolio (8 pages) for the existing repo `kachi334/Precious-Okoro-portfolio` (branch `main`). Positioning: content design and language infrastructure for AI agents and complex products. After this handoff, **the codebase is the source of truth**. All future design and copy changes are made in code.

## About the Design Files
The `.dc.html` files in this bundle are **design references built in HTML**. They show the intended look and behaviour. They are not production code to ship as-is: they depend on a prototyping runtime (`support.js`) and use inline styles throughout. Recreate them in the repo's existing environment. The current repo is plain static HTML (`index.html`, `about.html`, `assets/style.css`, …), so the natural target is static HTML and CSS with a shared stylesheet built from the tokens below. Moving to a small static-site setup (e.g. Astro or Eleventy) is also fine if content files are wanted later.

To view a reference, open any `.dc.html` file in a browser from this folder; `support.js` must sit beside it.

## Fidelity
**High-fidelity.** Colours, type, spacing, copy and interactions are final. Recreate them pixel-close.

## Pages (reference file → repo file)
| Reference | Repo target |
|---|---|
| Homepage.dc.html | index.html |
| About.dc.html | about.html |
| Work.dc.html | work.html |
| Experience.dc.html | experience.html |
| Contact.dc.html | contact.html |
| Moniger.dc.html | moniger.html |
| FastTrackUX.dc.html | fasttrackux.html |
| Beacon.dc.html | beacon.html |

All copy in the reference files is final. Copy it verbatim.

### Shared layout
- Content container: `max-width:1200px; margin:0 auto; padding:0 32px`. Sections are separated by bottom padding of 140–160px.
- Sticky top nav with links to all pages and a light/dark theme toggle.
- Footer: top border `1px solid rgba(ink,0.14)`, padding `40px 32px 56px`. It holds the copyright line on the left and Email/LinkedIn links on the right.
- Section eyebrow labels: IBM Plex Mono, 14px, weight 600, letter-spacing 1.2px, uppercase. Each section uses its own accent colour (Selected Work `--accent`, Industries `--amber-text`, Words From Clients `--accent`, Writing `--coral-text`, Side Projects `--mint-text`, The Human Side `--coral-text`).
- Section H2s: Space Grotesk 700, `clamp(34px,4.4vw,56px)`, letter-spacing -0.03em, line-height 1.05. One accent word per heading is set in Fraunces italic 500 in `--accent`.

### Homepage (index.html), top to bottom
1. **Hero**
   - H1: Space Grotesk 700, `clamp(44px,7.4vw,104px)`, max 13ch.
   - Intro paragraph: max 58ch, `clamp(17px,1.5vw,19px)`, `--ink-soft`.
   - Below the paragraph, the label "Content systems shipped for" (IBM Plex Mono, 12px, uppercase, `--ink-faint`).
   - Under the label, a wrapping row of client names (Moniger, Culangex, FastTrackUX, Beacon, Babelos). Each name is 16px, weight 500, `--ink`, flanked by two small laurel SVGs (16×28) in `--accent`; the right laurel is mirrored. Gap 12px 36px.
   - Two CTAs: a solid pill in `--accent`, then a secondary button.
2. **Proof/metrics module.** Interactive: clicking a tab switches the metric (Moniger 25% conversions, FastTrackUX logins nearly doubled, Beacon 62% drop in misclassification). Can be toggled off.
3. **Selected Work** (`#work`). Four alternating rows (image panel / text):
   - **Image panel:** radius 32px, gradient `linear-gradient(160deg, var(--t-X-a), var(--t-X-b))`, padding `clamp(24px,4vw,56px)`, hover lift `translateY(-4px)`.
   - **Text column:** meta line in mono 12px, H3 Space Grotesk 700 `clamp(24px,2.4vw,32px)`, a paragraph, mono tag pills (11px, 1px border at 22% ink, radius 999px), then "Read case study →".
   - Rows: Moniger (mint), FastTrackUX (amber, reversed), Beacon (violet), Voxra (coral, reversed).
   - **Voxra is disabled** (`aria-disabled="true"`, `cursor:not-allowed`, no link). Its panel has no image: "Content system for AI agents" (mono, uppercase, `--coral-text`) and a "Coming soon" status sit at the top, with a centred wordmark "Vox" + italic "ra" (Space Grotesk 700 / Fraunces italic in `--coral-text`, `clamp(80px,13vw,180px)`). Its text column ends with a dashed "Case study coming soon" pill in place of a link.
   - The section closes with "View all case studies →".
4. **Industries.** Eyebrow plus pill chips.
5. **How I Think.** Three pillars (Language is infrastructure / I think in systems / Intelligent products change the job). Can be toggled off.
6. **Words From Clients.** Testimonial figures in a 2-up grid on `--surface`, radius 28px.
7. **Writing**, headed "Things I'm thinking about", with "All articles on Medium →" on the right.
   - Three article cards in a responsive grid (`auto-fit, minmax(300px,1fr)`, gap 24px), each linking to Medium in a new tab.
   - Card: `--surface`, radius 28px, hover lift.
   - Top panel: aspect 16/7, gradient tint (coral, mint, amber), with a big Fraunces italic number 01–03 in the matching `-text` colour.
   - Body: title (Space Grotesk 700, 21px), description (15px, `--ink-soft`), date line (mono 12px).
8. **Side Projects**, headed "Things I'm building". A simple list that is deliberately plain, with no cards.
   - Each row has a top/bottom 1px rule and 24px vertical padding.
   - Left: name (Space Grotesk 700, 20px) and description (15px). Right: status (mono 12px, `--ink-faint`).
   - Rows:
     - Voxra · In development
     - Editorial Standards Skill · Coming soon
     - Content QA Skill · Coming soon
     - Agentic Content Design Resources · Coming soon
   - When links exist, make the whole row an `<a>`.
9. **The Human Side.** A 2×2 photo grid (life-*.jpg images).
10. **Contact CTA** (`#contact`).
    - Card: background `#5942AA`, text `#FAF6ED`, radius 40px, `overflow:hidden`, two columns via flex-wrap.
    - **Left** (flex `3 1 520px`, padding `clamp(40px,6vw,88px)`, vertically centred): 72px round headshot; H2 `clamp(28px,3.2vw,44px)` line-height 1.18 max 24ch, with "experience" in Fraunces italic `#EFC670`; a 17px paragraph in `#EDE8F7`; buttons "Book a discovery call" (`#FAF6ED` pill, hover `#EFC670`) and "Email instead" (outline).
    - **Right** (flex `2 1 300px`, min-height 520px, stretches to card height): an image **showreel**.
      - Two columns are absolutely positioned inside the reel, gap 16px.
      - Each column holds 4 product images repeated 4 times. Column A scrolls up (`translateY(0 → -50%)`, 76s linear infinite); column B scrolls down (`-50% → 0`, 88s).
      - Images have radius 16px.
      - The reel is masked with a vertical gradient (transparent → black 15% → black 85% → transparent).
      - Disable the animation under `prefers-reduced-motion`.
      - Images: moniger-cover, beacon-cover, fasttrackux-cover, moniger-hero-budgeting, beacon-incident-flow, fasttrackux-after, moniger-hero-home, beacon-empty-states.

### Contact (contact.html)
- **Left column** (max 400px): H2 "What's on your mind?" and a ruled list of Email, LinkedIn and Calendly links (mono label left, value right).
- **Right column** (flex `2 1 520px`): the **Tally embed**.
  - Card: `--surface`, radius 32px, `padding:0; overflow:hidden`. The note "Required fields are marked *" (13.5px, `--ink-faint`) sits at the top.
  - The iframe is `min-height:680px`, borderless.
  - Under the iframe, the line "Prefer a call? Book a discovery call →".
  - Tally form ID: **`0QNAay`**. Embed URL: `https://tally.so/embed/0QNAay?alignLeft=1&hideTitle=1&dynamicHeight=1`. Add `&transparentBackground=1` **only in light mode**, because Tally's dark text is unreadable on the dark surface. Load `https://tally.so/widgets/embed.js`.

### Other pages
About, Work, Experience and the three case studies (Moniger, FastTrackUX, Beacon) follow the same tokens and patterns. Take structure and copy from each reference file. About uses `images/precious-sun.jpeg` as its main portrait.

## Interactions & Behaviour
- **Theme toggle:** sets `data-theme="light|dark"` on `<html>` and persists it to `localStorage.theme`. The first visit follows `prefers-color-scheme`. Body background and colour transition over 0.25s.
- **Links:** default `a` colour is `--accent`; hover is `--accent-strong`.
- **Focus:** `:focus-visible` shows a 2px solid `--accent` outline with a 2px offset.
- **Hovers:** card lifts use `transform .3s cubic-bezier(.2,.8,.2,1)`.
- **External links** open in a new tab with `rel="noopener"`.
- **Responsive:** every multi-column row uses flex-wrap or auto-fit grids, so it stacks to one column on narrow screens. No fixed widths on text.

## Design Tokens
Fonts (Google Fonts): Space Grotesk 500/700 (headings), Inter 400–700 (body), Fraunces italic 400–600 (accent words), IBM Plex Mono 400–600 (labels and meta), Caveat 500/700 (handwritten notes in the metrics module).

| Token | Light | Dark |
|---|---|---|
| --paper | #FAF6ED | #0A0908 |
| --surface | #FFFCF5 | #161411 |
| --ink | #17130E | #F0EDE6 |
| --ink-soft | #4A4438 | #B8B2A3 |
| --ink-faint | #6B6459 | #9A9184 |
| --fade | #A39C8E | #6F685D |
| --accent | #6B4FD6 | #9B85E8 |
| --accent-strong | #5942AA | #B6A6F0 |
| --mint-text | #0E7A50 | #3CC98A |
| --amber-text | #8C5E0C | #E5B04A |
| --coral-text | #B23A5C | #F08DA6 |
| --sky-text | #1D6E96 | #5DB3EA |
| --t-mint-a / -b | #DDF2E6 / #F1F7EE | #11281D / #0D1C15 |
| --t-amber-a / -b | #F7E7C4 / #FBF2DF | #2B2110 / #1C170D |
| --t-violet-a / -b | #E4DDFA / #F1EDFB | #221B3D / #17132A |
| --t-coral-a / -b | #FBE1E7 / #FDF0F2 | #30161E / #211116 |
| --t-neutral | #EFEAE0 | #1C1915 |

Also keep `--ink-rgb` (23,19,14 light / 240,237,230 dark) for rules and borders at rgba(ink, 0.14–0.3).

Fixed brand colours: mint #1FAE6E, amber #D69A1A, coral #EC6F8E, violet #6B4FD6, CTA card #5942AA, CTA highlight #EFC670.

Radii: pills 999px; cards 22–28px; large panels 32px; CTA card 40px; images inside panels 16–18px.

Shadows: soft coloured drop shadows, e.g. `0 30px 80px -40px rgba(31,174,110,0.55)` on the mint panel. Each panel uses its own hue.

## Assets
- `images/`: all case-study covers, inner case-study images, `life-*` Human Side photos, `precious-headshot.jpg`, `precious-sun.jpeg` and `precious-bw.jpeg` (retired).
- `favicon.svg`.
- Laurel marks on the homepage are inline SVG (copy them from Homepage.dc.html).
- Icons are inline SVG; there is no icon library.

## Files in this bundle
- 8 `.dc.html` page references (see table above)
- `support.js`: the prototype runtime, needed only for viewing the references
- `images/`, `favicon.svg`

## Working on the site after handoff
The code is now the master copy. Make text and design changes by asking Claude Code in plain language, for example "add a fifth article to Writing" or "link the Content QA Skill row to <url>". Open items:
- Add links for the three "Coming soon" side projects when they're ready.
- Turn the Voxra case study on (re-enable the link) when it's published.
