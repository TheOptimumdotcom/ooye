# DESIGN_SYSTEM_OOYE.md
# Portfolio Design System & Specifications — Oyekunmi Oyediji (O.Oye)

## 1. Global Design Principles
- **Personality:** Calm, intelligent, minimal, professional, and slightly entertaining.
- **Approach:** Plain HTML, CSS, and Vanilla JavaScript. No frameworks (no React, Next.js, etc.).
- **Default Theme:** Dark Mode (`data-theme="dark"` on root `<html>` or `<body>`). Toggleable to Light Mode (`data-theme="light"`).
- **Layout Margins:** 
  - Desktop (1728px viewport): 100px left and right margins.
  - Mobile (440px viewport): 20px left and right margins.

---

## 2. Colour System & CSS Variables

```css
:root {
  /* Default: Dark Mode */
  --bg-main: #171717;
  --text-main: #F3F3F3;
  --text-body: #D9D9D9;
  --wordmark: #D9D9D9;
  
  --nav-bg: #222222;
  --nav-text: #D9D9D9;
  --nav-hover: #FFFFFF;
  --btn-primary-bg: #FFFFFF;
  --btn-primary-text: #171717;

  --hero-halfcircle-bg: #222222;
  --hero-heading: #F3F3F3;
  --hero-sub: #D9D9D9;
  --theme-toggle-knob: #D6D0C4;
  --availability-dot: #74C111;

  --section-bg-dark: #222222;
  --tag-bg: rgba(243, 243, 243, 0.05);
  --border-color: rgba(255, 255, 255, 0.1);

  --proj-lumivox: #1A2122;
  --proj-learnflow: #211F24;
  --proj-eliteshine: #252021;
  --proj-auracayane: #1C1E22;
}

[data-theme="light"] {
  --bg-main: #F5F5F5;
  --text-main: #111111;
  --text-body: #4A4A4A;
  --wordmark: #4A4A4A;
  
  --nav-bg: #EAEAEA;
  --nav-text: #111111;
  --nav-hover: #171717;
  --btn-primary-bg: #111111;
  --btn-primary-text: #F5F5F5;

  --hero-halfcircle-bg: #EAEAEA;
  --hero-heading: #111111;
  --hero-sub: #111111;
  --theme-toggle-knob: #171717;
  --availability-dot: #2ECF56;

  --section-bg-light: #EAEAEA;
  --tag-bg: rgba(17, 17, 17, 0.05);
  --border-color: rgba(0, 0, 0, 0.1);

  --proj-lumivox: #DBE4E4;
  --proj-learnflow: #EEECEF;
  --proj-eliteshine: #E8E3E5;
  --proj-auracayane: #E0E2E7;
}
```

---

## 3. Typography System
- **Primary Font:** `Geist` (Headings, project names, display text).
- **Secondary Font:** `Inter` (Body text, labels, buttons, metadata).

### Desktop Specifications
| Element | Font | Weight | Size | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| O.Oye Wordmark | Geist | ExtraBold | 28px | auto | normal |
| Meet ...ye! | Inter | Medium | 40px | auto | normal |
| Your Design Partner | Geist | SemiBold | 80px | auto | -2px |
| Hero supporting text | Inter | Regular | 18px | auto | normal |
| Availability text | Inter | Regular | 16px | auto | normal |
| Section background labels | Geist | ExtraBold | 160px | auto | 12px |
| Section headings | Geist | SemiBold | 72px | auto | -2px |
| Project category | Inter | Regular | 14px | auto | normal |
| Project name | Geist | Medium | 48px | auto | -2px |
| Project description | Inter | Regular | 24px | 38px | -1px |
| Project statistics | Inter | Regular | 16px | auto | normal |
| Case study link | Inter | Regular | 18px | auto | normal |
| Service title | Geist | Medium | 48px | auto | -2px |
| Service category | Inter | Regular | 14px | auto | normal |
| Service description | Inter | Regular | 20px | 36px | -1px |
| About heading | Geist | Medium | 36px | auto | -2px |
| About body | Inter | Regular | 22px | 40px | -1px |
| Tools label | Inter | Regular | 16px | auto | normal |
| Tools list | Inter | Regular | 20px | auto | normal |
| Statistics (Numbers) | Geist | SemiBold | 64px | auto | normal |
| Statistics labels | Inter | Regular | 18px | auto | normal |
| Experience introduction | Inter | Regular | 26px | 40px | -2px |
| Experience company name | Geist | Medium | 36px | auto | -2px |
| Experience description | Inter | Regular | 20px | 32px | normal |
| Experience metadata | Inter | Regular | 14px | auto | normal |
| Contact heading | Geist | SemiBold | 96px | auto | -2px |
| Contact supporting text | Inter | Regular | 26px | auto | -2px |
| Contact buttons | Inter | Regular | 20px | auto | -1px |
| Footer | Inter | Regular | 16px | auto | normal |

### Mobile Specifications
| Element | Font | Weight | Size | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| O.Oye Wordmark | Geist | ExtraBold | 28px | auto | normal |
| Meet ...ye! | Inter | Medium | 24px | auto | normal |
| Your Design Partner | Geist | SemiBold | 32px | auto | normal |
| Hero supporting text | Inter | Regular | 16px | auto | normal |
| Availability text | Inter | Regular | 11px | auto | normal |
| Section background labels | Geist | ExtraBold | 56px | auto | 3px |
| Section headings | Geist | SemiBold | 24px | auto | normal |
| Project category | Inter | Regular | 12px | auto | normal |
| Project name | Geist | Medium | 36px | auto | -2px |
| Project description | Inter | Regular | 16px | 24px | normal |
| Project statistics | Inter | Regular | 14px | auto | normal |
| Case study link | Inter | Regular | 14px | auto | normal |
| Service title | Geist | Medium | 36px | auto | -2px |
| Service category | Inter | Regular | 12px | auto | normal |
| Service description | Inter | Regular | 16px | 24px | normal |
| About heading | Geist | Medium | 24px | auto | -1px |
| About body | Inter | Regular | 18px | 28px | normal |
| Tools label | Inter | Regular | 12px | auto | normal |
| Tools list | Inter | Regular | 16px | auto | normal |
| Statistics (Numbers) | Geist | SemiBold | 36px | auto | normal |
| Statistics labels | Inter | Regular | 14px | auto | normal |
| Experience introduction | Inter | Regular | 18px | 26px | -1px |
| Experience company name | Geist | Medium | 24px | auto | -2px |
| Experience description | Inter | Regular | 14px | 22px | normal |
| Experience metadata | Inter | Regular | 12px | auto | normal |
| Contact heading | Geist | SemiBold | 36px | auto | -2px |
| Contact supporting text | Inter | Regular | 18px | 28px | -1px |
| Contact buttons | Inter | Regular | 14px | auto | -1px |
| Footer | Inter | Regular | 12px | auto | normal |