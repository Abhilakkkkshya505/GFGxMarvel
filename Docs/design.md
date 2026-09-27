# GFG Bennett — "Fractures" Design System
### Theme: Multiverse / Doctor Strange

---

## 1. Concept

Not "Marvel movie poster." Not "sci-fi HUD." The idea: **the event page is itself a tear between universes** — a stable "home" dimension (dark, editorial, disciplined) that keeps cracking open at the edges to reveal glimpses of other realities (color, distortion, mirrored geometry). The single bold move: **content panels are literally fractured/offset like broken glass shards from a shattered mirror dimension**, rather than sitting in uniform rounded cards. Everything else stays quiet so that move reads clearly.

Avoid the generic tell: no glowing-card-grid-with-icons default. No tracked-out ALL-CAPS eyebrows. No middle-dot meta strings. The "portal" motif is expressed through **asymmetric clipped shapes and a single recurring ring motif**, not through literal glowing circles on every section.

---

## 2. Color

| Token | Hex | Role |
|---|---|---|
| `--void` | `#07070A` | Base background — near-black, slightly blue-cool, not pure black |
| `--ink` | `#0F0E14` | Secondary surface (fractured panels) |
| `--paper` | `#EDEAE3` | Primary text on dark — warm off-white, not pure white |
| `--sanctum-orange` | `#FF7A29` | Primary accent — mystic energy, sparingly, for the "tear" edges and key CTAs |
| `--eldritch-green` | `#3EE6A0` | Secondary accent — used only for the "other dimension" glimpses (small, rare) |
| `--dust` | `#8B87A0` | Muted lavender-grey for secondary text/labels |

Rule: orange and green never appear in the same component at equal weight — orange is home-dimension energy (portals, CTAs), green is glimpsed-dimension energy (used behind torn edges, gallery, quantum motifs only). This separation *is* the palette's logic, not decoration.

---

## 3. Type

- **Display / Headings:** `Fraunces` (variable, high-contrast serif, optical size set to display) — gives cinematic, slightly occult gravity without being a cliché sci-fi font. Used large, tight tracking, never all-caps.
- **Body / UI:** `Inter` — neutral workhorse for readability at small sizes, event details, forms.
- Two families, clearly distinct (serif display vs. grotesque body) — no third font.

Scale (base 18px): 18 / 22 / 28 / 40 / 64 / 96px, ratio ~1.35, display sizes jump further at the hero.

---

## 4. Layout

Left-aligned throughout — a briefing document, not a poster. Content sits inside a 12-col grid, max-width 1280px, but panels are allowed to **break the grid edge** with clipped-corner shapes to sell the "tear" motif.

```
HERO
┌──────────────────────────────────────────┐
│ logo                              nav →   │
│                                            │
│  BIG SERIF HEADLINE, 3 lines,             │
│  left aligned, ~60% width                 │
│  short subtitle line                      │
│  [Register Now] [Explore Mission]         │
│                                     ◐      │  ← single ring motif, offset right
└──────────────────────────────────────────┘

MISSION BRIEF                EVENT HIGHLIGHTS
┌───────────┐               ┌────┬────┬────┐
│ torn panel │  copy block   │shard│shard│shard│ ← offset, not uniform cards
└───────────┘               └────┴────┴────┘

TIMELINE (vertical, left rail, home-dimension orange thread)
SPEAKERS (asymmetric 2-up, not 3-col grid)
WHY ATTEND (big stat + short list, not 6 icon cards)
GALLERY (horizontal scroll, torn-edge frames)
FAQ (left-aligned accordion, hairline rule only)
CTA (full-bleed, one ring motif, one headline)
FOOTER (quiet, two columns)
```

---

## 5. The recurring motif — "the Ring"

One SVG ring (Sling Ring reference, abstracted to a plain circle + one broken arc) recurs exactly once per section, always the same weight, placed asymmetrically — never centered, never repeated multiple times in one section. It is the *only* circular/portal element on the page. This is the restraint move: one idea, used consistently, instead of glowing portals everywhere.

---

## 6. Motion principles

- One orchestrated hero sequence on load: headline clips in from a torn edge, ring motif rotates slightly into place, then stops. No further looping motion in the hero.
- Scroll motion limited to: panels sliding in from their "torn" direction (each panel has one consistent entry direction, established by its shard shape).
- Hover: only on interactive elements (buttons, cards you can click) — a slight shard-shift (2–4px translate along the panel's cut angle), not scale/tilt/glow-everywhere.
- Reduced-motion: all of the above collapse to opacity fades.

---

## 7. Principles recap

1. Fracture, don't glow — the multiverse tear is shown through broken/offset panel geometry, not through literal portals and light bloom on every card.
2. One ring, once per section, never centered.
3. Orange = our dimension (CTAs, structure). Green = glimpsed dimension (rare, small, gallery/quantum only).
4. Left-aligned editorial grid, briefing-document feel — cinematic through scale and type, not through centered poster layouts.
5. One motion moment per section, answering scroll or click — never ambient looping decoration.
