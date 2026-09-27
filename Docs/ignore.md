# ignore.md — Things NOT to do (AI-slop checklist)

Check every section against this before calling it done. If you spot any of these, fix it.

---

## Layout / structure tells

- ❌ Everything in identical rounded-corner cards, same border-radius on every element regardless of hierarchy
- ❌ Same soft grey box-shadow (`rgba(0,0,0,.1)`) under every card
- ❌ Centered-everything poster layout — hero text, headings, buttons all dead-center
- ❌ Numbered markers (01 / 02 / 03) on content that isn't actually a sequence
- ❌ 3-equal-column grids for everything (speakers, highlights, stats) regardless of how many items there actually are
- ❌ Gradient wash used as pure decoration behind a card with no reason

## Typography tells

- ❌ Tracked-out ALL-CAPS "eyebrow" label above every single heading
- ❌ One word in a headline randomly bolded/italicized/colored for "emphasis"
- ❌ Meta info joined with middle dots (`Speaker · Bennett University · 2026`)
- ❌ Labels styled as `WORD — fragment` with a spaced em dash
- ❌ Monospace font used for labels/tags just to look "techy"
- ❌ Unnecessary label slapped above content that doesn't need one (e.g. "OUR MISSION" above the mission text)

## Color tells

- ❌ Warm cream background + high-contrast serif + terracotta accent (the generic "AI portfolio" look)
- ❌ Near-black background + single acid-green/vermilion accent used everywhere with no logic
- ❌ Using tinted near-black (#0B0B0B / #111) and calling it "black" — use the actual token (`--void`)
- ❌ Orange and green accents mixed with equal weight in the same component (breaks the dimension logic in design.md)

## Motion tells

- ❌ Fade-up-on-scroll applied identically to every section with no variation
- ❌ Hover effects on every card: scale + tilt + glow, all at once, everywhere
- ❌ Ambient looping background animation that never stops (floating shapes forever, infinite particle drift) — motion should answer scroll/click, not run forever unprompted
- ❌ A "→" arrow appended to every link/button text out of habit
- ❌ Cursor-follow glow effect used just because it's trendy, with no relation to the ring/portal motif

## Copy tells

- ❌ Generic filler like "Join us for an unforgettable experience" with no specific event detail
- ❌ Selling language ("revolutionary," "cutting-edge," "game-changing") instead of plain, specific description
- ❌ Buttons that don't say what they do ("Submit" instead of "Register Now")
- ❌ Placeholder stats that stay vague forever ("Many prizes!" instead of an actual number, even a placeholder number)

## Component tells

- ❌ Generic Bootstrap-style navbar with logo-left, links-right, no personality
- ❌ Icon + heading + one-line-description card repeated 6 times as "Why Attend" (that's the SaaS-card default — use the stat + short list layout from design.md instead)
- ❌ FAQ accordion with a plain plus/minus icon and no connection to the visual system

---

## Before shipping each section, ask:

1. Does this look like it was made for *this* event, or could I paste it into any other hackathon site unchanged?
2. Is there exactly one bold/memorable move in this section, with everything else quiet around it?
3. Did I use only the tokens in `design.md` (colors, fonts, ring motif) — nothing extra snuck in?
4. If I removed one decorative element, would the section still work? (If yes — remove it.)
