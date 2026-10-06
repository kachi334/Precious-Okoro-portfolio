import {readFile, writeFile, cp, mkdir, rm, readdir} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PROJECT = '545bmmm1'
const DATASET = 'production'
const BASE = 'https://www.preciousokoro.site'
const FIXTURE = process.env.SANITY_FIXTURE

const GROQ = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  title, "slug": slug.current, publishedAt, summary, originalUrl, coverImage, body
}`

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function formatDate(iso) {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

function imageUrl(ref) {
  // image-<id>-<w>x<h>-<ext>
  const m = /^image-([^-]+)-(\d+x\d+)-([a-z]+)$/.exec(ref || '')
  if (!m) return null
  return `https://cdn.sanity.io/images/${PROJECT}/${DATASET}/${m[1]}-${m[2]}.${m[3]}`
}

async function fetchPosts() {
  if (FIXTURE) return JSON.parse(await readFile(FIXTURE, 'utf-8'))
  const url = `https://${PROJECT}.api.sanity.io/v2021-06-07/data/query/${DATASET}?query=${encodeURIComponent(GROQ)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sanity responded ${res.status}`)
  return (await res.json()).result
}

function spans(children = [], markDefs = []) {
  return children
    .map((c) => {
      let t = esc(c.text)
      for (const mark of c.marks || []) {
        if (mark === 'strong') t = `<strong>${t}</strong>`
        else if (mark === 'em') t = `<em>${t}</em>`
        else if (mark === 'code') t = `<code>${t}</code>`
        else {
          const def = markDefs.find((d) => d._key === mark)
          if (def && def._type === 'link') t = `<a href="${esc(def.href)}" rel="noopener">${t}</a>`
        }
      }
      return t
    })
    .join('')
}

function renderBody(blocks = []) {
  const out = []
  let list = null
  for (const b of blocks) {
    if (b._type === 'block' && b.listItem) {
      const tag = b.listItem === 'number' ? 'ol' : 'ul'
      if (!list || list.tag !== tag) {
        if (list) out.push(`</${list.tag}>`)
        list = {tag}
        out.push(`<${tag}>`)
      }
      out.push(`<li>${spans(b.children, b.markDefs)}</li>`)
      continue
    }
    if (list) {
      out.push(`</${list.tag}>`)
      list = null
    }
    if (b._type === 'block') {
      const text = spans(b.children, b.markDefs)
      if (!text.trim()) continue
      const tags = { h2: 'h2', h3: 'h3', h4: 'h3', blockquote: 'blockquote', normal: 'p' }
      const tag = tags[b.style] || 'p'
      out.push(`<${tag}>${text}</${tag}>`)
    } else if (b._type === 'image') {
      const src = imageUrl(b.asset?._ref)
      if (!src) continue
      out.push(`<figure><img src="${esc(src)}" alt="${esc(b.alt || '')}" loading="lazy"></figure>`)
    }
  }
  if (list) out.push(`</${list.tag}>`)
  return out.join('\n')
}

const THEME =
  "<script>(function(){try{var t=localStorage.getItem('theme');if(!t){t='dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>"

const ICONS = `<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16.png">
<link rel="icon" type="image/png" sizes="512x512" href="/images/favicon.png">
<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">`

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..600&family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;600&family=Caveat:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">`

const NAV = `<header class="nav">
  <div class="nav-inner">
    <a href="/" class="wordmark"><img src="/images/nav-avatar.png" alt="" width="30" height="30">Precious Okoro</a>
    <nav class="links">
      <a href="/work">Projects</a>
      <a href="/about">About</a>
      <a href="/cv">CV</a>
      <a href="/writing" class="active" aria-current="page">Writing</a>
      <a href="/contact" class="nav-cta">Work Together</a>
      <button class="theme-toggle" type="button" aria-label="Switch to dark theme">
        <svg class="icon-sun" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M14 9.5A6 6 0 1 1 6.5 2 4.8 4.8 0 0 0 14 9.5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>
        <svg class="icon-moon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.4"/><path d="M8 0.5V2.5M8 13.5V15.5M15.5 8H13.5M2.5 8H0.5M13.3 2.7L11.9 4.1M4.1 11.9L2.7 13.3M13.3 13.3L11.9 11.9M4.1 4.1L2.7 2.7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
      </button>
    </nav>
  </div>
</header>`

const FOOTER = `<footer class="site-footer">
  <span>© 2026 Precious Okoro. Language infrastructure and content systems for products built to scale.</span>
  <div class="footer-links">
    <a href="mailto:thepreciousokoro@gmail.com">Email</a>
    <a href="https://www.linkedin.com/in/okoro-onyekachi-precious/" target="_blank" rel="noopener">LinkedIn</a>
    <a href="https://calendly.com/thecontentdesignchief/30min" target="_blank" rel="noopener">Book a call</a>
  </div>
</footer>
<script src="/assets/main.js"></script>
</body>
</html>
`

function postPage(post, bodyHtml, date, image) {
  const url = `${BASE}/writing/${post.slug}`
  const t = esc(post.title)
  const d = esc(post.summary || '')
  const ogImage = image || `${BASE}/images/precious-headshot.jpg`
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
${THEME}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${t} · Precious Okoro</title>
<meta name="description" content="${d}">
${ICONS}
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:image" content="${esc(ogImage)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${esc(ogImage)}">
${FONTS}
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>

${NAV}

<main id="main">
  <article class="article">
    <a href="/writing" class="back-link">← All writing</a>
    <span class="meta-line" style="color:var(--accent)">${date}</span>
    <h1>${t}</h1>
    <div class="article-body">
${bodyHtml}
    </div>
    <nav class="article-end">
      <a href="/writing">← All writing</a>
      <a href="/contact">Work together →</a>
    </nav>
  </article>
</main>

${FOOTER}`
}

function indexPage(entries) {
  const items = entries
    .map(
      (p) => `
      <a href="/writing/${esc(p.slug)}" class="writing-item">
        <span class="w-date">${esc(p.date)}</span>
        <h2>${esc(p.title)}</h2>
        <p>${esc(p.summary)}</p>
      </a>`
    )
    .join('')
  const desc = 'Essays by Precious Okoro on content design, AI agent trust, and the language that makes AI products safe to use.'
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
${THEME}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Writing · Precious Okoro</title>
<meta name="description" content="${desc}">
${ICONS}
<link rel="canonical" href="${BASE}/writing">
<meta property="og:type" content="website">
<meta property="og:url" content="${BASE}/writing">
<meta property="og:title" content="Writing · Precious Okoro">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${BASE}/images/precious-headshot.jpg">
<meta name="twitter:card" content="summary">
${FONTS}
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>

${NAV}

<main id="main">
  <section class="work-hero" style="padding-bottom:40px">
    <span class="eyebrow">Writing</span>
    <h1><span class="fade">Things I'm thinking</span> <span class="accent-italic">about</span></h1>
  </section>

  <section class="wrap writing-list-wrap">
    <div class="writing-list">${items}
    </div>
  </section>
</main>

${FOOTER}`
}

async function main() {
  let posts
  try {
    posts = await fetchPosts()
  } catch (err) {
    console.warn(`[writing] Sanity unavailable, keeping committed pages: ${err.message}`)
    return
  }

  const legacy = JSON.parse(await readFile(path.join(ROOT, 'writing/legacy.json'), 'utf-8'))
  const sanityEntries = []

  for (const post of posts) {
    const date = formatDate(post.publishedAt)
    const cover = imageUrl(post.coverImage?.asset?._ref)
    const bodyHtml = renderBody(post.body)
    await writeFile(path.join(ROOT, 'writing', `${post.slug}.html`), postPage(post, bodyHtml, date, cover))
    sanityEntries.push({
      slug: post.slug,
      title: post.title,
      date,
      iso: post.publishedAt.slice(0, 10),
      summary: post.summary || '',
    })
  }

  const legacyBySlug = new Set(sanityEntries.map((e) => e.slug))
  const entries = [...sanityEntries, ...legacy.filter((l) => !legacyBySlug.has(l.slug))]
  entries.sort((a, b) => (a.iso < b.iso ? 1 : -1))

  await writeFile(path.join(ROOT, 'writing.html'), indexPage(entries))

  const staticPages = ['/', '/work', '/about', '/cv', '/contact', '/writing', '/moniger', '/fasttrackux', '/beacon', '/payr-case-study']
  const writingPages = entries.map((e) => `/writing/${e.slug}`)
  const today = new Date().toISOString().slice(0, 10)
  const urls = [...staticPages, ...writingPages]
    .map((p) => `  <url>\n    <loc>${BASE}${p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join('\n')
  await writeFile(
    path.join(ROOT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  )

  console.log(`[writing] built ${sanityEntries.length} Sanity post(s), index has ${entries.length} entries`)
}

const PUBLISHED_DIRS = ['assets', 'images', 'writing']
const PUBLISHED_FILES = ['sitemap.xml', 'robots.txt', 'llms.txt']

async function publish() {
  const out = path.join(ROOT, 'public')
  await rm(out, {recursive: true, force: true})
  await mkdir(out, {recursive: true})
  for (const file of (await readdir(ROOT)).filter((f) => f.endsWith('.html') || PUBLISHED_FILES.includes(f))) {
    await cp(path.join(ROOT, file), path.join(out, file))
  }
  for (const dir of PUBLISHED_DIRS) {
    await cp(path.join(ROOT, dir), path.join(out, dir), {
      recursive: true,
      filter: (src) => !src.endsWith('legacy.json'),
    })
  }
}

await main()
await publish()
