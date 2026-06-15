# Design Language: Supermemory

> Extracted from `https://supermemory.ai` on June 15, 2026
> 1643 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#f5f9ff` | rgb(245, 249, 255) | hsl(216, 100%, 98%) | 582 |
| Secondary | `#0562ef` | rgb(5, 98, 239) | hsl(216, 96%, 48%) | 486 |
| Accent | `#e4effd` | rgb(228, 239, 253) | hsl(214, 86%, 94%) | 4 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#888e94` | hsl(210, 5%, 56%) | 186 |
| `#000000` | hsl(0, 0%, 0%) | 100 |
| `#6b7480` | hsl(214, 9%, 46%) | 29 |
| `#3a4554` | hsl(215, 18%, 28%) | 2 |
| `#13191f` | hsl(210, 24%, 10%) | 1 |

### Background Colors

Used on large-area elements: `#f5f9ff`, `#e9f2ff`, `#0562ef`, `#001745`, `#fafafa`, `#0b1015`, `#e4effd`, `#07224f`, `#e8edf3`, `#f4f8ff`, `#eaf2ff`, `#0263ef`

### Text Colors

Text color palette: `#000000`, `#0b1015`, `#888e94`, `#ffffff`, `#0562ef`, `#001fdc`, `#047857`, `#1d4ed8`, `#6b7480`, `#f5f9ff`

### Gradients

```css
background-image: linear-gradient(0deg, rgb(249, 252, 255) 53.533%, rgb(137, 189, 255) 165.59%);
```

```css
background-image: radial-gradient(circle, rgba(124, 183, 255, 0.35) 1px, rgba(0, 0, 0, 0) 1.4px);
```

```css
background-image: linear-gradient(160deg, rgb(0, 194, 216) 0%, rgb(5, 98, 239) 50%, rgb(0, 21, 255) 100%), radial-gradient(120% 90% at 30% 100%, rgba(0, 21, 255, 0.4) 0%, rgba(0, 0, 0, 0) 60%);
```

```css
background-image: linear-gradient(160deg, rgb(237, 243, 252) 0%, rgb(250, 247, 242) 100%);
```

```css
background-image: linear-gradient(152deg, rgb(5, 98, 239) 17%, rgb(30, 120, 255) 117%);
```

```css
background-image: linear-gradient(160deg, rgb(0, 194, 216) 0%, rgb(5, 98, 239) 48%, rgb(0, 21, 255) 100%);
```

```css
background-image: radial-gradient(circle, rgb(5, 98, 239) 0.8px, rgba(0, 0, 0, 0) 0.8px);
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#0b1015` | text, border, background | 1955 |
| `#f5f9ff` | background, text, border | 582 |
| `#0562ef` | background, border, text | 486 |
| `#888e94` | text, border, background | 186 |
| `#000000` | text, border | 100 |
| `#001fdc` | border, background, text | 77 |
| `#c5dbf2` | border, text | 66 |
| `#6b7480` | text, border, background | 29 |
| `#1d4ed8` | text, border | 12 |
| `#7cb7ff` | background, text, border | 10 |
| `#047857` | text, border | 4 |
| `#e4effd` | background | 4 |
| `#3a4554` | text, border | 2 |
| `#ff9f5a` | text, border | 2 |
| `#f5a88b` | text, border | 2 |
| `#a0e0ff` | text, border | 2 |
| `#f59e0b` | background, border | 2 |
| `#4794e0` | border | 1 |
| `#001745` | background | 1 |
| `#13191f` | background | 1 |
| `#ff5f57` | background | 1 |
| `#febc2e` | background | 1 |
| `#28c840` | background | 1 |
| `#ffd667` | background | 1 |
| `#07224f` | background | 1 |
| `#b45309` | text | 1 |
| `#00a3ff` | border | 1 |

## Typography

### Font Families

- **DM Sans** — used for all (1307 elements)
- **Space Grotesk** — used for all (168 elements)
- **DM Mono** — used for all (133 elements)
- **ui-sans-serif** — used for body (35 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 193.939px | 12.1212rem | 400 | 290.909px | normal | div, a, svg, path |
| 81.92px | 5.12rem | 500 | 73.728px | -3.2768px | div |
| 79.36px | 4.96rem | 500 | 79.36px | -3.1744px | span |
| 72px | 4.5rem | 500 | 74.88px | -4.176px | h1, br, span, img |
| 58.88px | 3.68rem | 500 | 64.768px | -2.0608px | h2, span |
| 56px | 3.5rem | 500 | 58.8px | -2.24px | h3, span |
| 52px | 3.25rem | 500 | 52px | -1.82px | span |
| 47px | 2.9375rem | 500 | 47.94px | -1.88px | h3, span |
| 45.056px | 2.816rem | 500 | 40.5504px | -0.90112px | span |
| 44px | 2.75rem | 500 | 44.88px | -1.76px | h4, h2, span, h3 |
| 40px | 2.5rem | 500 | 52px | -1.6px | h2, span, svg, path |
| 38px | 2.375rem | 500 | 39.9px | -1.52px | h3, h4 |
| 36px | 2.25rem | 500 | 39.6px | -1.44px | h2, span |
| 32px | 2rem | 500 | 33.92px | -1.12px | h3, span |
| 28.16px | 1.76rem | 500 | 29.568px | -0.5632px | div |

### Heading Scale

```css
h1 { font-size: 72px; font-weight: 500; line-height: 74.88px; }
h2 { font-size: 58.88px; font-weight: 500; line-height: 64.768px; }
h3 { font-size: 56px; font-weight: 500; line-height: 58.8px; }
h3 { font-size: 47px; font-weight: 500; line-height: 47.94px; }
h4 { font-size: 44px; font-weight: 500; line-height: 44.88px; }
h2 { font-size: 40px; font-weight: 500; line-height: 52px; }
h3 { font-size: 38px; font-weight: 500; line-height: 39.9px; }
h2 { font-size: 36px; font-weight: 500; line-height: 39.6px; }
h3 { font-size: 32px; font-weight: 500; line-height: 33.92px; }
h4 { font-size: 28px; font-weight: 500; line-height: 30.8px; }
h4 { font-size: 26px; font-weight: 500; line-height: 30.68px; }
h3 { font-size: 23.04px; font-weight: 600; line-height: 25.344px; }
h3 { font-size: 22px; font-weight: 500; line-height: 22px; }
h2 { font-size: 16px; font-weight: 400; line-height: 24px; }
h3 { font-size: 11px; font-weight: 400; line-height: 16.5px; }
h4 { font-size: 10.5px; font-weight: 500; line-height: 15.75px; }
```

### Body Text

```css
body { font-size: 16px; font-weight: 400; line-height: 24px; }
```

### Font Weights in Use

`400` (1313x), `500` (316x), `600` (9x), `700` (5x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-1 | 1px | 0.0625rem |
| spacing-28 | 28px | 1.75rem |
| spacing-32 | 32px | 2rem |
| spacing-36 | 36px | 2.25rem |
| spacing-40 | 40px | 2.5rem |
| spacing-44 | 44px | 2.75rem |
| spacing-48 | 48px | 3rem |
| spacing-56 | 56px | 3.5rem |
| spacing-64 | 64px | 4rem |
| spacing-72 | 72px | 4.5rem |
| spacing-75 | 75px | 4.6875rem |
| spacing-80 | 80px | 5rem |
| spacing-96 | 96px | 6rem |
| spacing-108 | 108px | 6.75rem |
| spacing-121 | 121px | 7.5625rem |
| spacing-140 | 140px | 8.75rem |
| spacing-143 | 143px | 8.9375rem |
| spacing-177 | 177px | 11.0625rem |
| spacing-183 | 183px | 11.4375rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| xs | 1px | 14 |
| sm | 5px | 6 |
| md | 10px | 1 |
| xl | 19px | 1 |
| full | 50px | 12 |
| full | 999px | 1 |

## Box Shadows

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(11, 16, 21, 0.03) 0px 1px 0px 0px;
```

**sm** — blur: 0px
```css
box-shadow: rgb(250, 250, 250) 0px 0px 0px 1.5px, rgba(11, 16, 21, 0.1) 0px 0px 0px 2.5px;
```

**sm** — blur: 0px
```css
box-shadow: color(srgb 0.313726 0.25098 0.815686 / 0.4) 0px 0px 0px 1px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(5, 98, 239, 0.1) 0px 0px 0px 4px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(5, 98, 239, 0.1) 0px 0px 0px 4px, rgba(5, 98, 239, 0.4) 0px 4px 10px -3px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(255, 255, 255, 0.12) 0px 0px 0px 1px inset;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.18) 0px 1px 0px 0px inset, rgba(5, 16, 40, 0.18) 0px 2px 8px 0px;
```

**xs** — blur: 0px
```css
box-shadow: color(srgb 0.0431373 0.0627451 0.0823529 / 0.06) 0px 1px 0px 0px, color(srgb 0.0431373 0.0627451 0.0823529 / 0.18) 0px 6px 16px -10px;
```

**xs (inset)** — blur: 0px
```css
box-shadow: rgba(5, 98, 239, 0.28) 1px 0px 0px 0px inset, rgba(5, 98, 239, 0.28) -1px 0px 0px 0px inset;
```

**xs** — blur: 0px
```css
box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px;
```

**md** — blur: 10px
```css
box-shadow: rgba(5, 98, 239, 0.45) 0px 4px 10px -3px;
```

**lg (inset)** — blur: 30px
```css
box-shadow: rgba(118, 193, 255, 0.6) 0px 2px 30px -2px inset, rgba(0, 0, 0, 0.2) 0px 9px 17px 5px;
```

**xl** — blur: 64px
```css
box-shadow: rgba(11, 16, 21, 0.28) 0px 32px 64px -24px, rgba(11, 16, 21, 0.1) 0px 8px 16px -4px, rgba(11, 16, 21, 0.04) 0px 0px 0px 1px;
```

## CSS Custom Properties

### Colors

```css
--cf-tick-color: #1d4ed88c;
--tw-ring-offset-shadow: 0 0 #0000;
--tw-ring-shadow: 0 0 #0000;
--color-grid: #0b101529;
--color-paper-blue: #f6f8fc;
--color-mem-panel-border: #e4ecf9;
--color-border-light: #4794e04d;
--color-bg-alt: #f4f8ff;
--color-text-dim: #888e94;
--color-slate-800: oklch(27.9% .041 260.031);
--color-bg: #f5f9ff;
--color-slate-500: oklch(55.4% .046 257.417);
--tw-inset-ring-shadow: 0 0 #0000;
--color-blue-hover: #3782f2;
--color-mem-panel: #fbfcfe;
--color-blue-tint: #eaf2ff;
--tw-ring-offset-color: #fff;
--color-white: #fff;
--color-border-dashed: #0b101529;
--color-blue-400: oklch(70.7% .165 254.624);
--color-slate-400: oklch(70.4% .04 256.788);
--tw-border-style: solid;
--color-mem-strip: #fafafa;
--color-text: #0b1015;
--color-border-strong: #9bc1ea;
--tw-ring-offset-width: 0px;
--color-border: #c5dbf2;
--color-card-blue: #ddebff;
--color-text-muted: #0b101599;
--color-blue: #0562ef;
--color-paper: #fafafa;
--color-blue-light: #1e78ff;
```

### Spacing

```css
--spacing: .25rem;
```

### Typography

```css
--text-2xl: 1.5rem;
--leading-relaxed: 1.625;
--leading-snug: 1.375;
--text-lg: 1.125rem;
--font-body: "DM Sans", sans-serif;
--text-5xl--line-height: 1;
--text-2xl--line-height: calc(2 / 1.5);
--text-base--line-height: 1.5;
--font-mono: "DM Mono", monospace;
--tracking-wider: .05em;
--font-weight-semibold: 600;
--text-sm: .875rem;
--text-lg--line-height: calc(1.75 / 1.125);
--leading-tight: 1.25;
--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
--text-4xl: 2.25rem;
--font-weight-bold: 700;
--text-sm--line-height: calc(1.25 / .875);
--text-3xl--line-height: 1.2;
--text-5xl: 3rem;
--text-3xl: 1.875rem;
--text-xs--line-height: calc(1 / .75);
--tracking-widest: .1em;
--text-xs: .75rem;
--font-weight-light: 300;
--font-weight-medium: 500;
--default-font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
--font-weight-normal: 400;
--text-4xl--line-height: calc(2.5 / 2.25);
--font-heading: "Space Grotesk", sans-serif;
--text-base: 1rem;
--default-mono-font-family: "DM Mono", monospace;
--tracking-tight: -.025em;
```

### Shadows

```css
--tw-inset-shadow-alpha: 100%;
--tw-drop-shadow-alpha: 100%;
--tw-inset-shadow: 0 0 #0000;
--tw-shadow-alpha: 100%;
--tw-shadow: 0 0 #0000;
```

### Radii

```css
--radius-3xl: 1.5rem;
--radius-sm: .25rem;
--radius-xl: .75rem;
--radius-2xl: 1rem;
--radius-md: .375rem;
--radius-lg: .5rem;
```

### Other

```css
--cf-stroke: #0b10152e;
--ease-out-strong: cubic-bezier(.23, 1, .32, 1);
--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
--tw-outline-style: solid;
--container-5xl: 64rem;
--tw-translate-z: 0;
--tw-gradient-via: rgba(0, 0, 0, 0);
--container-3xl: 48rem;
--tw-translate-y: 0;
--ease-out: cubic-bezier(0, 0, .2, 1);
--tw-divide-x-reverse: 0;
--tw-gradient-from: rgba(0, 0, 0, 0);
--tw-gradient-to: rgba(0, 0, 0, 0);
--tw-divide-y-reverse: 0;
--tw-translate-x: 0;
--tw-gradient-via-position: 50%;
--nav-height: 71px;
--tw-gradient-to-position: 100%;
--default-transition-duration: .15s;
--container-xl: 36rem;
--tw-gradient-from-position: 0%;
--blur-sm: 8px;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Breakpoints

| Name | Value | Type |
|------|-------|------|
| xs | 360px | max-width |
| sm | 420px | max-width |
| sm | 640px | max-width |
| md | 767px | max-width |
| md | 768px | max-width |
| 880px | 880px | max-width |
| lg | 1023px | max-width |
| lg | 1024px | max-width |
| xl | 1280px | max-width |
| 1920px | 1920px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.12s`, `0.18s`, `0.15s`, `0.2s`, `0.22s`, `0.32s`, `0.24s`, `0.28s`, `0.16s`, `1.8s`, `0.6s`, `0.7s`, `0.5s`, `0s`, `0.25s`, `0.36s`, `0.8s`, `0.3s`, `0.06s`, `0.52s`, `0.72s`

### Common Transitions

```css
transition: all;
transition: transform 0.12s cubic-bezier(0.23, 1, 0.32, 1);
transition: color 0.18s cubic-bezier(0.23, 1, 0.32, 1), transform 0.12s cubic-bezier(0.23, 1, 0.32, 1);
transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), translate 0.15s cubic-bezier(0.4, 0, 0.2, 1), scale 0.15s cubic-bezier(0.4, 0, 0.2, 1), rotate 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), fill 0.15s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
transition: opacity 0.22s cubic-bezier(0.2, 0, 0, 1), transform 0.22s cubic-bezier(0.2, 0, 0, 1), filter 0.22s cubic-bezier(0.2, 0, 0, 1);
transition: grid-template-rows 0.32s cubic-bezier(0.22, 1, 0.36, 1), border-top-color 0.32s cubic-bezier(0.22, 1, 0.36, 1);
```

### Keyframe Animations

**logo-draw**
```css
@keyframes logo-draw {
  0% { stroke-dashoffset: 120; fill-opacity: 0; }
  70% { fill-opacity: 0; }
  100% { stroke-dashoffset: 0; fill-opacity: 1; }
}
```

**logo-redraw**
```css
@keyframes logo-redraw {
  0% { stroke-dashoffset: 0; fill-opacity: 1; }
  50% { stroke-dashoffset: 120; fill-opacity: 0; }
  100% { stroke-dashoffset: 0; fill-opacity: 1; }
}
```

**hero-ticker-scroll**
```css
@keyframes hero-ticker-scroll {
  0% { transform: translateZ(0px); }
  100% { transform: translate3d(-50%, 0px, 0px); }
}
```

**hero-hands-in**
```css
@keyframes hero-hands-in {
  100% { opacity: 1; filter: blur(0px); }
}
```

**hero-step-in**
```css
@keyframes hero-step-in {
  100% { opacity: 1; transform: translateY(0px); }
}
```

**catalog-float-in**
```css
@keyframes catalog-float-in {
  0% { transform: translateY(8px) scale(0.96); opacity: 0; }
  100% { transform: translateY(0px) scale(1); opacity: 1; }
}
```

**footer-mark-draw**
```css
@keyframes footer-mark-draw {
  0% { stroke-dashoffset: 120; fill-opacity: 0; }
  70% { fill-opacity: 0; }
  100% { stroke-dashoffset: 0; fill-opacity: 1; }
}
```

**footer-mark-redraw**
```css
@keyframes footer-mark-redraw {
  0% { stroke-dashoffset: 0; fill-opacity: 1; }
  50% { stroke-dashoffset: 120; fill-opacity: 0; }
  100% { stroke-dashoffset: 0; fill-opacity: 1; }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (28 instances)

```css
.button {
  background-color: rgb(5, 98, 239);
  color: rgb(11, 16, 21);
  font-size: 16px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Cards (47 instances)

```css
.card {
  background-color: rgb(5, 98, 239);
  border-radius: 0px;
  box-shadow: rgba(11, 16, 21, 0.28) 0px 32px 64px -24px, rgba(11, 16, 21, 0.1) 0px 8px 16px -4px, rgba(11, 16, 21, 0.04) 0px 0px 0px 1px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (90 instances)

```css
.link {
  color: rgb(11, 16, 21);
  font-size: 16px;
  font-weight: 400;
}
```

### Navigation (34 instances)

```css
.navigatio {
  background-color: rgb(245, 249, 255);
  color: rgb(11, 16, 21);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
  box-shadow: color(srgb 0.0431373 0.0627451 0.0823529 / 0.06) 0px 1px 0px 0px, color(srgb 0.0431373 0.0627451 0.0823529 / 0.18) 0px 6px 16px -10px;
}
```

### Footer (49 instances)

```css
.foote {
  background-color: rgb(250, 250, 250);
  color: rgb(255, 255, 255);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 16px;
}
```

### Modals (1 instances)

```css
.modal {
  border-radius: 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Dropdowns (5 instances)

```css
.dropdown {
  border-radius: 0px;
  border-color: rgb(11, 16, 21);
  padding-top: 0px;
}
```

### Badges (11 instances)

```css
.badge {
  background-color: rgb(5, 98, 239);
  color: rgba(255, 255, 255, 0.55);
  font-size: 11px;
  font-weight: 500;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Avatars (1 instances)

```css
.avatar {
  border-radius: 999px;
}
```

### Tabs (20 instances)

```css
.tab {
  background-color: rgb(245, 249, 255);
  color: rgb(11, 16, 21);
  font-size: 16px;
  font-weight: 400;
  padding-top: 18px;
  padding-right: 4px;
  border-color: rgb(11, 16, 21);
  border-radius: 0px;
}
```

### ProgressBars (14 instances)

```css
.progressBar {
  background-color: rgb(5, 98, 239);
  color: rgb(11, 16, 21);
  border-radius: 0px;
  font-size: 16px;
}
```

### Switches (25 instances)

```css
.switche {
  border-radius: 0px;
  border-color: rgb(136, 142, 148);
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 2 instances, 2 variants

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(11, 16, 21);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(11, 16, 21);
  font-size: 15px;
  font-weight: 500;
```

**Variant 2** (1 instance)

```css
  background: rgb(250, 250, 250);
  color: rgb(11, 16, 21);
  padding: 8px 20px 8px 20px;
  border-radius: 0px;
  border: 1px solid rgb(197, 219, 242);
  font-size: 15px;
  font-weight: 500;
```

### Button — 8 instances, 2 variants

**Variant 1** (1 instance)

```css
  background: rgb(250, 250, 250);
  color: rgba(11, 16, 21, 0.6);
  padding: 0px 14px 0px 14px;
  border-radius: 0px;
  border: 1px dashed rgba(11, 16, 21, 0.2);
  font-size: 12.5px;
  font-weight: 400;
```

**Variant 2** (7 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(11, 16, 21);
  padding: 18px 4px 18px 4px;
  border-radius: 0px;
  border: 0px none rgb(11, 16, 21);
  font-size: 16px;
  font-weight: 400;
```

### Card — 7 instances, 1 variant

**Variant 1** (7 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(11, 16, 21);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(11, 16, 21);
  font-size: 16px;
  font-weight: 400;
```

### Card — 7 instances, 1 variant

**Variant 1** (7 instances)

```css
  background: rgb(5, 98, 239);
  color: rgb(11, 16, 21);
  padding: 64px 64px 64px 64px;
  border-radius: 0px;
  border: 0px solid rgb(11, 16, 21);
  font-size: 16px;
  font-weight: 400;
```

### Card — 7 instances, 1 variant

**Variant 1** (7 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(11, 16, 21);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(11, 16, 21);
  font-size: 16px;
  font-weight: 400;
```

### Card — 7 instances, 1 variant

**Variant 1** (7 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(11, 16, 21);
  padding: 40px 48px 44px 48px;
  border-radius: 0px;
  border: 0px solid rgb(11, 16, 21);
  font-size: 16px;
  font-weight: 400;
```

### Link — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(5, 98, 239);
  color: rgb(255, 255, 255);
  padding: 48px 48px 48px 48px;
  border-radius: 0px;
  border: 0px 1px 0px 0px solid rgb(197, 219, 242);
  font-size: 16px;
  font-weight: 400;
```

### Link — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(245, 249, 255);
  color: rgb(11, 16, 21);
  padding: 48px 48px 48px 48px;
  border-radius: 0px;
  border: 0px solid rgb(11, 16, 21);
  font-size: 16px;
  font-weight: 400;
```

### Card — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgb(245, 249, 255);
  color: rgb(11, 16, 21);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 1px dashed rgb(5, 98, 239);
  font-size: 16px;
  font-weight: 400;
```

### Button — 6 instances, 2 variants

**Variant 1** (5 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(11, 16, 21);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 1px solid rgb(197, 219, 242);
  font-size: 14px;
  font-weight: 400;
```

**Variant 2** (1 instance)

```css
  background: rgb(5, 98, 239);
  color: rgb(255, 255, 255);
  padding: 6px 10px 6px 10px;
  border-radius: 0px;
  border: 1px solid rgb(5, 98, 239);
  font-size: 11px;
  font-weight: 400;
```

### Card — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(11, 16, 21);
  padding: 0px 0px 80px 0px;
  border-radius: 0px;
  border: 0px solid rgb(11, 16, 21);
  font-size: 16px;
  font-weight: 400;
```

### Card — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(11, 16, 21);
  padding: 0px 56px 0px 32px;
  border-radius: 0px;
  border: 0px solid rgb(11, 16, 21);
  font-size: 16px;
  font-weight: 400;
```

### Card — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(11, 16, 21);
  padding: 28px 28px 28px 28px;
  border-radius: 0px;
  border: 0px none rgb(11, 16, 21);
  font-size: 16px;
  font-weight: 400;
```

### Card — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgb(250, 250, 250);
  color: rgb(11, 16, 21);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px 0px 1px solid rgb(11, 16, 21) rgb(11, 16, 21) rgb(197, 219, 242);
  font-size: 16px;
  font-weight: 400;
```

### Card — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgb(244, 248, 255);
  color: rgb(11, 16, 21);
  padding: 36px 28px 36px 28px;
  border-radius: 0px;
  border: 0px 1px 0px 0px solid rgb(197, 219, 242);
  font-size: 16px;
  font-weight: 400;
```

### Card — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(5, 98, 239);
  color: rgb(255, 255, 255);
  padding: 36px 28px 36px 28px;
  border-radius: 0px;
  border: 0px 1px solid oklab(0.999994 0.0000455678 0.0000200868 / 0.15);
  font-size: 16px;
  font-weight: 400;
```

### Button — 7 instances, 1 variant

**Variant 1** (7 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(11, 16, 21);
  padding: 20px 32px 20px 32px;
  border-radius: 0px;
  border: 0px solid rgb(11, 16, 21);
  font-size: 16px;
  font-weight: 400;
```

## Layout System

**52 grid containers** and **461 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 100% | 0px |
| 1232px | 0px |
| 460px | 0px |
| 800px | 0px |
| 440px | 0px |
| 360px | 0px |
| 860px | 80px |
| 834.86px | 0px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 2-column | 17x |
| 3-column | 12x |
| 4-column | 12x |
| 1-column | 10x |
| 5-column | 1x |

### Grid Templates

```css
grid-template-columns: 582px 582px;
grid-template-columns: 418.188px 811.812px;
gap: normal 0px;
grid-template-columns: 307.5px 307.5px 307.5px 307.5px;
grid-template-columns: 407.25px 339.375px 339.375px;
gap: 56px 40px;
grid-template-columns: 582px 582px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 332x |
| column/nowrap | 128x |
| row/wrap | 1x |

**Gap values:** `10px`, `12px`, `14px`, `16.4864px`, `16px`, `18px`, `20px`, `22px`, `24px`, `28px`, `2px`, `32px`, `32px 40px`, `32px 64px`, `3px`, `40px`, `48px`, `4px`, `56px 40px`, `64px`, `6px`, `7px`, `8px`, `9px`, `normal 0px`, `normal 18px`

## Accessibility (WCAG 2.1)

**Overall Score: 93%** — 13 passing, 1 failing color pairs

### Failing Color Pairs

| Foreground | Background | Ratio | Level | Used On |
|------------|------------|-------|-------|---------|
| `#0b1015` | `#6b7480` | 4.03:1 | FAIL | span (1x) |

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#ffffff` | `#0562ef` | 5.25:1 | AA |
| `#0b1015` | `#ffffff` | 19.11:1 | AAA |
| `#0b1015` | `#f5f9ff` | 18.08:1 | AAA |
| `#0b1015` | `#fafafa` | 18.3:1 | AAA |
| `#0562ef` | `#ffffff` | 5.25:1 | AA |
| `#0b1015` | `#7cb7ff` | 9.17:1 | AAA |
| `#0b1015` | `#ffd667` | 13.71:1 | AAA |

## Design System Score

**Overall: 76/100 (Grade: C)**

| Category | Score |
|----------|-------|
| Color Discipline | 80/100 |
| Typography Consistency | 40/100 |
| Spacing System | 85/100 |
| Shadow Consistency | 78/100 |
| Border Radius Consistency | 90/100 |
| Accessibility | 93/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Well-defined spacing scale, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 4 font families — consider limiting to 2 (heading + body)
- 41 distinct font sizes — consider a tighter type scale
- 1 WCAG contrast failures
- 84 !important rules — prefer specificity over overrides
- 2114 duplicate CSS declarations

## Gradients

**8 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| linear | 0deg | 2 | brand |
| radial | circle | 2 | brand |
| linear | 160deg | 3 | bold |
| radial | — | 3 | bold |
| linear | 160deg | 2 | brand |
| linear | 152deg | 2 | brand |
| linear | 160deg | 3 | bold |
| radial | circle | 2 | brand |

```css
background: linear-gradient(0deg, rgb(249, 252, 255) 53.533%, rgb(137, 189, 255) 165.59%);
background: radial-gradient(circle, rgba(124, 183, 255, 0.35) 1px, rgba(0, 0, 0, 0) 1.4px);
background: linear-gradient(160deg, rgb(0, 194, 216) 0%, rgb(5, 98, 239) 50%, rgb(0, 21, 255) 100%);
background: radial-gradient(120% 90% at 30% 100%, rgba(0, 21, 255, 0.4) 0%, rgba(0, 0, 0, 0) 60%);
background: linear-gradient(160deg, rgb(237, 243, 252) 0%, rgb(250, 247, 242) 100%);
```

## Z-Index Map

**10 unique z-index values** across 2 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| sticky | 10,50 | footer.f.o.o.t.e.r.-.d.r.e.n.c.h.e.d. .r.e.l.a.t.i.v.e. .z.-.1.0. .o.v.e.r.f.l.o.w.-.c.l.i.p, div.s.e.c.t.i.o.n.-.h.e.a.d.e.r. .w.-.f.u.l.l. .c.o.n.t.a.i.n.e.r.-.e.d.g.e. .b.g.-.b.g, div.s.e.c.t.i.o.n.-.h.e.a.d.e.r. .w.-.f.u.l.l. .c.o.n.t.a.i.n.e.r.-.e.d.g.e. .b.g.-.b.g |
| base | -1,5 | canvas.h.e.r.o.-.d.o.t.s, div.h.i.w.-.p.g.-.g.r.i.d, section.h.e.r.o.-.w.r.a.p. .r.e.l.a.t.i.v.e. .z.-.[.1.]. .w.-.f.u.l.l. .f.l.e.x. .f.l.e.x.-.c.o.l. .i.t.e.m.s.-.s.t.r.e.t.c.h. .t.e.x.t.-.c.e.n.t.e.r. .p.t.-.4. .m.a.x.-.m.d.:.p.t.-.3. .o.v.e.r.f.l.o.w.-.h.i.d.d.e.n |

## SVG Icons

**50 unique SVG icons** detected. Dominant style: **outlined**.

| Size Class | Count |
|------------|-------|
| xs | 26 |
| sm | 19 |
| md | 2 |
| xl | 3 |

**Icon colors:** `currentColor`, `rgb(0, 0, 0)`, `#F5F9FF`, `#0562EF`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| Space Grotesk | cdn | 400 700 | normal |
| DM Sans | cdn | 400 700 | normal |
| DM Mono | cdn | 500 | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 44 | objectFit: fill, borderRadius: 0px, shape: square |
| general | 12 | objectFit: contain, borderRadius: 0px, shape: square |
| avatar | 10 | objectFit: cover, borderRadius: 999px, shape: circular |
| gallery | 2 | objectFit: cover, borderRadius: 0px, shape: square |

**Aspect ratios:** 1:1 (32x), 4:3 (10x), 3.82:1 (4x), 4.33:1 (3x), 3.8:1 (3x), 3.56:1 (3x), 5.21:1 (3x), 3.5:1 (3x)

## Motion Language

**Feel:** responsive · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `instant` | `60ms` | 60 |
| `xs` | `120ms` | 120 |
| `sm` | `160ms` | 160 |
| `md` | `280ms` | 280 |
| `lg` | `500ms` | 500 |
| `xl` | `720ms` | 720 |
| `xxl` | `1.8s` | 1800 |

### Easing Families

- **ease-out** (187 uses) — `cubic-bezier(0.23, 1, 0.32, 1)`, `cubic-bezier(0.22, 1, 0.36, 1)`, `cubic-bezier(0, 0, 0.2, 1)`
- **custom** (46 uses) — `cubic-bezier(0.4, 0, 0.2, 1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **linear** (14 uses) — `linear`

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `logo-draw` | custom | stroke-dashoffset, fill-opacity | 2 |
| `hero-ticker-scroll` | slide | transform | 1 |
| `hero-hands-in` | fade | opacity, filter | 1 |
| `hero-step-in` | slide-y | opacity, transform | 8 |
| `catalog-float-in` | slide-y | transform, opacity | 1 |
| `footer-mark-draw` | custom | stroke-dashoffset, fill-opacity | 2 |

## Component Anatomy

### card — 42 instances

**Slots:** media
**Sizes:** lg

### button — 23 instances

**Slots:** label, icon
**Variants:** link
**Sizes:** medium · md

| variant | count | sample label |
|---|---|---|
| default | 22 | Login |
| link | 1 | Products |

### link — 2 instances

**Sizes:** md

## Brand Voice

**Tone:** neutral · **Pronoun:** we→you · **Headings:** Sentence case (tight)

### Top CTA Verbs

- **for** (2)
- **what** (2)
- **do** (2)
- **products** (1)
- **login** (1)
- **npx** (1)
- **memory** (1)
- **superrag** (1)

### Button Copy Patterns

- "products" (1×)
- "login" (1×)
- "$
npx supermemory setup" (1×)
- "01
memory & continual learning" (1×)
- "02
superrag (retrieval)" (1×)
- "03
filesystems" (1×)
- "04
profiles" (1×)
- "05
connectors" (1×)
- "06
extractors" (1×)
- "07
qualitative analysis" (1×)

### Sample Headings

> The context cloud for 
 agents.
> All the legos to build the perfect context for your agent.
> Memory & Continual Learning
> The context cloud for 
 agents.
> Bring your data 
 We build understanding. Your agent just knows.
> The Supermemory API
> Personal Supermemory
> LEGACY · A VECTOR DATABASE
> SUPERMEMORY
> How it works

## Page Intent

**Type:** `landing` (confidence 0.47)
**Description:** The memory layer for AI agents. Context engineering platform powering enterprise APIs, developer plugins, and a personal app that remembers everything.

Alternates: docs (0.7), legal (0.4), blog-post (0.35)

## Section Roles

Reading order (top→bottom): nav → testimonial → testimonial → content → testimonials → feature-grid → content → testimonial → comparison → testimonial → sidebar → faq → footer

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | nav | — | 0.9 |
| 1 | testimonial | The context cloud for 
 agents. | 0.8 |
| 2 | testimonial | The context cloud for 
 agents. | 0.8 |
| 3 | content | Bring your data 
 We build understanding. Your agent just knows. | 0.3 |
| 4 | testimonials | How it works | 0.4 |
| 5 | feature-grid | We don't think benchmarks tell the full story. | 0.8 |
| 6 | content | Use cases | 0.3 |
| 7 | testimonial | Enterprise | 0.8 |
| 8 | comparison | Testimonials | 0.7 |
| 9 | testimonial | — | 0.8 |
| 10 | sidebar | Custom | 0.4 |
| 11 | faq | The fine print, in plain English. | 0.85 |
| 12 | footer | Context infrastructure
for AI agents. | 0.95 |

## Material Language

**Label:** `mixed` (confidence 0.45)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.589 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 999px |
| backdrop-filter in use | no |
| Gradients | 8 |

## Imagery Style

**Label:** `flat-illustration` (confidence 0.088)
**Counts:** total 68, svg 33, icon 30, screenshot-like 0, photo-like 0
**Dominant aspect:** square-ish
**Radius profile on images:** rounded

## Component Library

**Detected:** `bootstrap` (confidence 0.6)

Evidence:
- bootstrap utility hits: 3

Also considered: tailwindcss (0.3)

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `DM Sans` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
