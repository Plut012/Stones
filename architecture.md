# Architecture

## Tech Stack

### Core
- **Next.js 15** — React framework, App Router, SSG for fast loads
- **TypeScript** — Type safety for maintainability
- **Framer Motion** — Beautiful, declarative animations
- **Tailwind CSS** — Utility-first styling, easy theming

### Go Board Rendering
- **Custom Canvas Rendering** — HTML5 Canvas for board display
- **Custom SGF Parser** — Parse and render SGF game records
- Interactive move navigation (click left/right)
- Completion tracking for koan reveal

### Content
- **Markdown** with frontmatter metadata
- **gray-matter** — Parse frontmatter
- **react-markdown** or **MDX** — Render markdown content

---

## Project Structure

```
stones/
├── app/                       # Next.js App Router
│   ├── page.tsx              # TOC intro page
│   ├── chapter/[slug]/
│   │   └── page.tsx          # Chapter reading page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
│
├── components/
│   ├── Enso.tsx              # Animated enso circle
│   ├── TableOfContents.tsx   # Chapter list
│   ├── ChapterContent.tsx    # Markdown + board renderer
│   ├── GoBoard.tsx           # SGF board display
│   └── PageTransition.tsx    # Fade in/out wrapper
│
├── content/
│   ├── raw/                  # Original PDF text (not committed)
│   │   └── direction-of-play.txt
│   │
│   └── chapters/             # Distilled markdown files
│       ├── 01-power-of-stones.md
│       ├── 02-existential-placement.md
│       ├── 03-wholeness.md
│       └── ...
│
├── public/
│   └── diagrams/             # SGF files
│       ├── chapter-01.sgf
│       ├── chapter-02.sgf
│       └── ...
│
├── lib/
│   ├── content.ts            # Load and parse markdown files
│   └── sgf.ts                # SGF parsing helpers
│
└── types/
    └── chapter.ts            # TypeScript types
```

---

## Data Flow

### Content Loading (Build Time)
1. `/content/chapters/*.md` files are read at build time
2. Frontmatter parsed for metadata (title, chapter number, sgf path)
3. Markdown content converted to React components
4. Static pages generated for each chapter

### User Journey (Runtime)
1. **Entry**: User lands on `/` → TOC intro page
2. **Select**: Click chapter → Navigate to `/chapter/[slug]`
3. **Transition**: TOC fades out, chapter fades in
4. **Read**: Scroll through chapter content + Go board
5. **Exit**: Scroll past end → fade back to `/` TOC intro
6. **Repeat**: Select another chapter or leave

---

## Chapter Structure

Each chapter has **four elements**:

1. **Title** — The concept being contemplated
2. **Quote** — Kajiwara's words from "The Direction of Play"
3. **Meditative Reflection** — 2-4 contemplative statements
4. **Poetic Koan** — Brief contemplative question visible in content

### Two Types of Koans

**Poetic Koan** (visible):
- Appears as blockquote at end of chapter content
- Always visible to reader
- Brief contemplative question
- Example: "Before you place the stone, where does its power live?"

**Hidden Koan** (revealed):
- Stored in frontmatter as `hiddenKoan`
- Full zen story/teaching
- Revealed when user completes board or clicks enso
- Example: "One Note of Zen" (Kakua story)

### Markdown Format

```markdown
---
chapter: 1
title: "The Power of Stones"
sgf: "chapter-01.sgf"
quote: "Each stone is invested with a power all its own."
hiddenKoan: |
  **One Note of Zen**

  After Kakua visited the emperor...
---

A stone falls to the board.

Not merely placed — invested with presence.

> Before you place the stone, where does its power live?
```

---

## Visual Design System

### Colors
```css
/* Main palette */
background:    #F5E6D3    /* Light cream background */
body-text:     #4A3A2A    /* Warm dark brown */
title:         #5A4535    /* Warm brown */
quote:         #7A6048    /* Lighter warm brown */
accent:        #6B5540    /* Medium warm brown */

/* Go board */
board-bg:      #5A3535    /* Dark burgundy */
board-lines:   #000000    /* Black grid lines */
board-dots:    #000000    /* Black star points */

/* Enso */
enso-stroke:   #4A3A2A    /* Dark brown */

/* Hidden koan overlay */
koan-bg:       rgba(43, 36, 32, 0.97)  /* Dark brown overlay */
koan-text:     #F5E6D3    /* Light cream */
koan-title:    #E8C4A0    /* Light amber */
```

### Typography
- **Primary**: System font stack (SF Pro, Segoe UI, Inter fallback)
- **Size**: Large, comfortable reading (18-20px base)
- **Line height**: Generous (1.8-2.0)
- **Weight**: Light (300) for titles, Regular (400) for body

### Spacing
- **Vertical rhythm**: 2-3rem between paragraphs
- **Breathing room**: Content max-width 680px, centered
- **Margins**: Generous whitespace around all elements

### Animations
- **Page transitions**: 600-800ms ease-in-out fades
- **Enso**: Subtle breathing animation (4s cycle, scale 1-1.02)
- **Koan reveal**: 2s slow fade-in with gentle upward motion
- **Scroll**: Smooth, natural scrolling behavior

---

## Go Board Integration

### SGF File Structure
```
public/diagrams/chapter-01.sgf
```

### Rendering
- Custom canvas-based rendering (GoBoard.tsx)
- SGF parsing via `lib/sgf.ts`
- Dark burgundy board background (#5A3535)
- Black grid lines and star points
- Interactive: click left/right to navigate moves
- Tracks completion state for hidden koan reveal

### Board Interaction
- **Left half click**: Go back one move
- **Right half click**: Go forward one move
- **Completion detection**: Fires `onComplete` callback when final move reached
- **Visual feedback**: Click cursor on hover

---

## Hidden Koan Interaction

### Two Ways to Reveal

**1. Complete the Board**
- User clicks through all moves in sequence
- When final move reached, koan automatically appears
- One-time trigger (doesn't re-fire if user goes back)

**2. Click the Enso**
- Enso circle on right side is clickable
- Immediate koan reveal
- Hover/tap animations for discoverability

### Koan Display
- Full-screen dark overlay (97% opaque dark brown)
- Centered content, scrollable if needed
- Markdown-formatted (supports bold titles, paragraphs)
- Enso button on right to close
- 2-second fade-in animation

### Dismissal
- Click enso on right side of overlay
- Smooth fade-out animation
- Returns to chapter view

---

## Scroll Behavior

### Within Chapter
- Natural scroll through content
- Smooth, no scroll hijacking within the chapter

### End of Chapter
- Detect scroll past final element
- Trigger fade-out animation (800ms)
- Navigate back to `/` TOC intro
- TOC fades back in

### Implementation
- Use Framer Motion's `AnimatePresence`
- Scroll listener on chapter page
- Check if `scrollY + windowHeight >= documentHeight`
- Trigger transition when user tries to scroll beyond

---

## Deployment

- **Vercel** — Natural fit for Next.js, zero config
- **Static export** possible if preferred
- Fast global CDN, optimized images, perfect PageSpeed scores

---

## Principles

### Simplicity First
- No unnecessary abstractions
- Flat component structure
- Clear, readable code

### Performance
- Static generation for instant loads
- Minimal JavaScript
- Optimized images and assets

### Maintainability
- TypeScript for safety
- Clear file naming
- Documented data flow

### Extensibility
- Easy to add new chapters (just add markdown file)
- Easy to add SGF files (drop in `/public/diagrams`)
- Clear separation of content and presentation

---

## What We Don't Build

- User accounts or authentication
- Comments or social features
- Complex admin interface
- Game playing or puzzle features
- Mobile app (web-first, responsive)

Keep it pure. Keep it simple. A space for reading and meditation.
