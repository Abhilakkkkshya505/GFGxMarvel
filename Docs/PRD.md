# Product Requirements Document
## GeeksForGeeks Student Chapter, Bennett University — Event Website

---

## 1. Overview

**What:** A single-page, cinematic event landing site for the GFG Student Chapter at Bennett University, themed around the Marvel Multiverse / Doctor Strange (per `design.md`).

**Why:** Drive event awareness and registrations, and double as a showcase piece (Awwwards-quality bar) for the chapter.

**Who it's for:** Bennett University students (primary audience), plus guest speakers/judges/sponsors who land on the page to check credibility.

---

## 2. Goals

- Get visitors to register (primary conversion action)
- Communicate what the event is, when, and why it's worth attending, in under 30 seconds of scrolling
- Feel premium and distinct — not a template college-fest site
- Fully responsive, fast, accessible

## 3. Non-goals

- No backend/auth system — registration can point to an external form (Google Form / Unstop / Devfolio link) unless stated otherwise
- No CMS — content is hardcoded per this PRD; edits are code edits
- No multi-page site — everything lives on one scrolling page (FAQ, speakers, etc. are sections, not routes)

---

## 4. Tech stack

- **Delivery:** static HTML/CSS/JS files, built one section at a time and assembled in Antigravity
- **Styling:** plain CSS with custom properties (tokens from `design.md`) — Tailwind optional if requested later
- **Animation:** CSS transitions/keyframes + IntersectionObserver for scroll-reveal (GSAP only if a section needs motion CSS can't do cleanly)
- **Fonts:** Google Fonts — Fraunces (display), Inter (body)
- **Icons:** Lucide (inline SVG, no heavy icon-font dependency)
- **No frameworks required** — kept framework-free so it drops into any project structure Antigravity assembles

---

## 5. Page structure & requirements

Each row = one section = one file, built independently and later stitched into `index.html`.

| # | Section | Must include | Priority |
|---|---|---|---|
| 1 | Hero | Event name, one-line hook, countdown timer, Register + Explore buttons, scroll indicator | P0 |
| 2 | Mission Brief | 2–3 sentence "about the event" copy, chapter/university credit | P0 |
| 3 | Event Highlights | Grid of activity cards (Hackathon, Coding Battles, Quiz, Workshops, Networking, Prizes) | P0 |
| 4 | Timeline | Vertical schedule: Registration → Opening → Sessions → Competitions → Finale → Awards, with dates/times | P0 |
| 5 | Speakers | Photo, name, title/org, 1 social link, per speaker (min 2 placeholder speakers) | P1 |
| 6 | Why Attend | 4–6 stats/reasons (attendee count, certificates, prizes, internship angle) | P1 |
| 7 | Gallery | Scrollable image set (placeholder images until real ones are supplied) | P2 |
| 8 | FAQ | Accordion, min 5 Q&As (what is it, who can join, is it free, team size, prizes) | P1 |
| 9 | Registration CTA | Restated hook + register button, deadline if known | P0 |
| 10 | Footer | Chapter socials, quick nav, copyright | P0 |

**Open content gaps to fill before final copy pass:** exact event name/date/venue, real speaker list, real prize details, registration link. Placeholder copy will be used until these are provided.

---

## 6. Design requirements

Governed by `design.md`. Key constraints carried into every section:
- Colors: `--void`, `--ink`, `--paper`, `--sanctum-orange`, `--eldritch-green`, `--dust` only
- Fonts: Fraunces (display) + Inter (body) only
- One ring motif per section max, never centered
- One motion moment per section on scroll-into-view; no ambient looping animation
- Left-aligned editorial grid, not centered poster layout

## 7. Functional requirements

- Countdown timer counts down to a configurable event date/time
- FAQ accordion: click to expand/collapse, only one open at a time (or independent — decide when building)
- Register buttons link to an external URL (placeholder `#register` until real link supplied)
- All images lazy-loaded
- Smooth scroll for in-page nav links

## 8. Non-functional requirements

- **Performance:** 60fps animations, images optimized/lazy-loaded, no layout shift (CLS)
- **Responsive:** breakpoints for mobile (< 480px), tablet (< 768px), desktop (≥ 1024px) — no horizontal scroll except the intentional gallery
- **Accessibility:** visible keyboard focus states, semantic HTML, alt text on all images, `prefers-reduced-motion` respected, sufficient contrast on text over dark backgrounds
- **SEO:** proper `<title>`, meta description, Open Graph tags for sharing

## 9. Build plan / sequencing

Build order (one file per turn, as requested):
1. Design tokens + base CSS reset (shared across all sections)
2. Hero
3. Mission Brief
4. Event Highlights
5. Timeline
6. Speakers
7. Why Attend
8. Gallery
9. FAQ
10. Registration CTA + Footer
11. Final assembly pass: stitch into single `index.html`, check section-to-section spacing/consistency

## 10. Success criteria

- All P0 sections complete and responsive
- Page loads and scrolls smoothly on a mid-range phone
- Design reviewer (you) confirms it doesn't read as a generic template
- Real event details dropped in without breaking layout
