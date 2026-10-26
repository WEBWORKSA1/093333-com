# 093333.com — Phase-wise Build Prompts

Use these prompts in order to rebuild, extend or audit the site. Each phase is self-contained.

---

## Phase 0 — Strategy lock
> You are building **093333.com — "Number Intel: Know the number before you answer."** A free, privacy-first mobile-number intelligence and anti-scam toolkit for the Philippines (+63), Vietnam (+84) and Taiwan (+886). Revenue: Google AdSense (ca-pub-6620975821265271, auto ads only), B2B lead generation for SMS/OTP/virtual-number/call-centre/fraud providers, sponsorships, donations, contests. Never claim to identify number owners. Never expose the contact email in page text. Static site, GitHub Pages free plan, Jekyll layouts only (no plugins).

## Phase 1 — Foundation
> Create a Jekyll site: `_config.yml` (url https://093333.com), `_layouts/default.html` with: full SEO meta, OG/Twitter tags, canonical, JSON-LD WebSite + SearchAction, AdSense script in `<head>`, Google Fonts (Sora + IBM Plex Mono), a top notice bar on every page reading "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership" linking to https://web.works/contact, sticky header with logo badge `09`**`3333`**, nav (Checker, Scam Check, Tools, Guides, Videos, Contest, Business, Support), "Report a Number" CTA, theme toggle, burger menu, footer (newsletter form, 4 link columns, trademark/copyright disclosure), mobile sticky CTA bar, cookie banner. Add CNAME, ads.txt (`google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0`), robots.txt, sitemap.xml, webmanifest, SVG favicon + OG image, 404.

## Phase 2 — Design system
> Write `assets/css/style.css`: dark "signal" palette (navy #070b14, signal teal #2ef2c5, amber, red, blue) with light-theme overrides via `[data-theme=light]`, mono numerals, cards, stats, bands, tabs, tables, forms (multi-step indicator, option tiles), analyzer meter, pricing tiers, quiz, SMS bubbles, FAQ details, ticker, reveal-on-scroll, prefers-reduced-motion, responsive breakpoints at 1180/980/820/640/560px, grid children `min-width:0`, no horizontal scroll at 360px.

## Phase 3 — Data + number engine
> Create `assets/js/data.js` with PH 4-digit prefix map (Globe/TM, Smart/TNT, Sun, DITO incl. 0895–0898, 0991–0994), VN 3-digit map (Viettel, VinaPhone, MobiFone, Vietnamobile, Gmobile, iTel, Wintel), TW format, notes for conflicting prefixes, and official reporting channels (PH 1326/eGov eReport, VN 156/5656 syntax, TW 165). In `main.js` build `analyze()` that normalises any input (+63/+84/+886/00/0/bare 9XXXXXXXXX), returns all plausible countries (PH/VN/TW overlap on 09), sorts complete matches first, and `fmt()` that outputs local, E.164 and international display. Render results with validity tags, network, E.164, report channel, portability caveat, "Report this number", "Check a text" and copy buttons; store last 6 lookups in localStorage only.

## Phase 4 — Tools
> Pages: `checker.html` (checker + tabbed searchable prefix tables PH/VN/TW + explainer), `scam-check.html` (client-side analyzer with weighted EN/Filipino/Vietnamese rules: links, shorteners, OTP, urgency, prizes, job bait, wallets/banks, fees, delivery, investment, wrong-number, authority; risk meter; sample chips; official reporting cards; scoring table), `tools.html` (tabs: E.164/WhatsApp/tel converter, bulk network sorter with CSV export, vanity number scorer, dialing guide).

## Phase 5 — Lead generation (highest-value page)
> `business.html`: hero with market stats; 3-step quote form (needs → countries/volume/timeline/budget → contact + consent to share with up to 3 providers); "what to compare" education grid. Submit via FormSubmit AJAX to the XOR-obfuscated inbox (never in plain text). Tag subject "BUSINESS LEAD". Add secondary lead paths: `advertise.html` (sponsor tiers + enquiry), `report.html` (community reports), `contact.html`.

## Phase 6 — Community, donations, hiring, contests
> `support.html`: 4 tiers (Friend $5, Guardian $12/mo, Champion $50, Patron $250+), allocation bar (30% ops, 25% promotion/marketing, 20% hiring, 15% prizes, 10% new tools), pledge form → emailed payment link. `contest.html`: 8-question Scam Spotter quiz (scam vs legit SMS), auto-filled score, entry form, monthly countdown, prizes, official rules. `careers.html`: 6 roles + application form + "we will never" anti-scam box. `videos.html`: topic cards linking to YouTube searches; `.video[data-yt]` facade supports real IDs later.

## Phase 7 — Content for AdSense approval
> Write 6 original long-form guides (600–1,000 words each) in `/guides/`: Philippine prefixes, Vietnam 093/MobiFone, spotting scam texts, what to do if scammed, E.164 developer guide, vanity numbers. Plus About, Privacy (Google AdSense cookie disclosure + opt-out links), Terms, Disclaimer, Cookies, Trademark & Copyright. No placeholder text, no copied content, no ads near forms' submit buttons.

## Phase 8 — QA & launch
> Validate JS (`node --check`), run the engine against test numbers, check every internal link, confirm the email string never appears in any file, confirm the top notice on every page, mobile test at 360px, Lighthouse ≥90. Push to `WEBWORKSA1/093333-com` (main). Enable GitHub Pages (Deploy from branch → main / root), set custom domain 093333.com, enforce HTTPS. DNS: A records 185.199.108.153 / .109.153 / .110.153 / .111.153 and CNAME `www` → `webworksa1.github.io`. Submit sitemap in Search Console, then apply in AdSense.

## Phase 9 — Growth (post-approval)
> Add programmatic pages per prefix (`/prefix/0933.html` etc., ~120 pages) with unique copy; Filipino and Vietnamese translations (hreflang); weekly scam-alert posts; a "latest community reports" feed (moderated); a browser extension; partner API for providers; monthly contest winners page.
