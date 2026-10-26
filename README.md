# 093333.com — Number Intel

Free, privacy-first mobile number checker, prefix directory and scam-text analyzer for the Philippines, Vietnam and Taiwan — monetized with Google AdSense, B2B lead generation, sponsorships and donations.

**Stack:** static HTML + Jekyll layout (built natively by GitHub Pages, free plan), vanilla JS, no build step.

## Structure
- `_layouts/default.html` — shared head (SEO, AdSense), top notice bar, nav, footer, cookie banner
- `index.html`, `checker.html`, `scam-check.html`, `tools.html`, `report.html`
- `business.html` (lead gen), `advertise.html`, `support.html` (donations), `contest.html`, `careers.html`, `videos.html`
- `guides/` — 6 long-form guides
- Legal: `about`, `contact`, `privacy`, `terms`, `disclaimer`, `cookies`, `trademark`
- `assets/js/data.js` (prefix data), `assets/js/main.js` (engine, tools, forms), `assets/css/style.css`
- `CNAME`, `ads.txt`, `robots.txt`, `sitemap.xml`

## Forms
All forms post via FormSubmit AJAX to a private inbox whose address is XOR-encoded in `main.js` and never appears as text. **First submission:** FormSubmit emails a one-time activation link to the inbox — click it once to start receiving submissions.

## Hosting (GitHub Pages)
Settings → Pages → Build and deployment → Source: *Deploy from a branch* → `main` / `(root)`. Custom domain `093333.com`, enforce HTTPS.
DNS at the registrar: `A @` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; `CNAME www` → `webworksa1.github.io`.

## Later
- Swap YouTube search cards for embeds by adding `<div class="video" data-yt="VIDEOID"></div>`.
- Add payment links (Ko-fi / PayPal / GCash) to the pledge confirmation email.

See `RESEARCH.md` and `BUILD-PROMPTS.md`.
