# ANIMATION_SPEC_OOYE.md
# Animation & Interaction Specifications — Oyekunmi Oyediji (O.Oye)

## 1. Overall Philosophy
- **Vibe:** Alive, subtle, restrained. Not an animation showcase.
- **Accessibility:** All animations must respect `prefers-reduced-motion`. Provide instant state transitions or subtle opacity fades when reduced motion is requested.

---

## 2. Section & Element Animations

### Wordmark Glow
- **Trigger:** Continuous loop.
- **Behavior:** A soft diagonal silver glow sweeps across `O.Oye` from top-left to bottom-right every ~5 seconds.

### Hero Memoji Blinking
- **Trigger:** Timed interval (~10 seconds).
- **Behavior:** Alternates between `memoji_open.png` and `memoji_closed.png` for a brief frame (e.g., 150ms) to simulate a natural blink.

### Shared Button Container (Hero & Contact)
- **Trigger:** Hover over "Book a Call".
- **Behavior:** The button subtly stretches slightly to the right (`transform: scaleX(1.05)` with smooth cubic-bezier easing), creating a pulled/elastic effect.

### Selected Work Cards & Links
- **Cards:** Project images zoom in or slightly pop out on hover (`transform: scale(1.02)` or image zoom `scale(1.05)` inside container overflow hidden).
- **Case Study Links:** Underline transitions from partial opacity to fully opaque (`opacity: 0.5` to `1`).

### Services Carousel / Slider
- **Desktop:** Navigation dots control active slides with smooth horizontal slide or fade transitions.
- **Mobile:** Native or smooth touch-drag horizontal swiping.

### About Certificate Modal
- **Trigger:** Click on "TechCrush Academy".
- **Behavior:** Backdrop fades in (`opacity 0 -> 1`), modal scales up smoothly from 0.95 to 1.0. Click outside dismisses.

### Experience Scroll Trail
- **Structure:** Vertical trail consisting of a thin line and circular indicators.
- **Indicator Specs:** 7px filled center, 18px outline, enclosing a 30x30px Memoji head.
- **Behavior:** A 40px Memoji circle follows the scroll position down the experience section, stopping at each card and leaving a faded copy of itself at ~50% opacity.

### Footer Memoji Easter Egg
- **Trigger:** Visitor reaches the bottom of the website / enters the footer zone.
- **Behavior:** 
  1. A 40x40px Memoji floats in from the bottom-middle of the viewport and settles around the footer.
  2. Remains visible for ~5–7 seconds.
  3. Floats away upward or toward one side, gradually reducing in size proportionally until fully hidden.
  4. **Persistence rule:** The animation continues running even if the user quickly scrolls back up; it does not abruptly vanish or reset.

---

## 3. General Section Reveals
- Use subtle fade-in and upward drift (`opacity: 0; transform: translateY(20px);` transitioning to `1` and `0`) via Intersection Observer as sections enter the viewport.