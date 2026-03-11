# Stones - Current Status

*Last updated: 2026-03-10*

---

## ✓ What's Complete

### Foundation
- ✓ Next.js 15 + TypeScript + Tailwind + Framer Motion setup
- ✓ Project structure established
- ✓ Dark warm aesthetic (charcoal & amber palette)
- ✓ Responsive layout with text, board, and enso

### Content System
- ✓ 11 chapters fully rewritten in zen meditation style
- ✓ Markdown-based content system with frontmatter
- ✓ Chapter format defined: Title → Quote → Meditation → Koan
- ✓ CHAPTER_GUIDE.md created for writing consistency

### Visual Design
- ✓ Color palette: warm charcoal (#2B2420), amber (#D4A574), cream text (#F5E6D3)
- ✓ Breathing enso animation (amber glow, subtle pulse)
- ✓ Generous vertical spacing (mb-24, mb-32, mb-48)
- ✓ Large, centered text (5xl title, xl-2xl body)
- ✓ Three-column layout: Text (left) + Board (middle) + Enso (right)

### Navigation
- ✓ Table of contents on home page
- ✓ Chapter routing working
- ✓ Smooth fade transitions between pages

---

## 🚧 In Progress / Needs Implementation

### Go Board Rendering
**Current state:** Placeholder canvas with 19x19 grid
**Needs:**
- Parse SGF file format (Smart Game Format)
- Render stones (black/white circles)
- Display move sequence
- Optional: Navigation controls (prev/next move)
- Optional: Stone placement animation

**Approach:**
- Use @sabaki/shudan (already installed) OR
- Adapt custom canvas renderer from ~/data/dev/phone_go/go-flow.html
- Files: `components/GoBoard.tsx`, consider creating `lib/sgf.ts` for parsing

**Current SGF:**
- `public/diagrams/chapter-01.sgf` — Takemiya Masaki vs Kajiwara Takeo
- Only Chapter 1 has SGF assigned

### Zen Koans
**Current state:** Blockquotes in chapters ending with ">"
**Needs:**
- Visual differentiation from regular blockquotes
- Perhaps special styling or placement
- User will provide koans for each chapter later

**To add koan to chapter:**
```markdown
> What remains when victory no longer matters?
```

---

## 📋 Next Steps (Priority Order)

### 1. Implement SGF Rendering ⚡ HIGH PRIORITY
The board is visible but shows empty grid. Need to:
1. Parse SGF file in `components/GoBoard.tsx`
2. Extract moves and board state
3. Render black/white stones
4. Test with chapter-01.sgf

### 2. Add Remaining SGF Files
User will provide SGF files for chapters 2-11.
Process:
```bash
# User downloads SGF
cp ~/Downloads/game.sgf /data/dev/kajiwara/public/diagrams/chapter-NN.sgf

# Update chapter frontmatter
sgf: "chapter-NN.sgf"
```

### 3. Enso Koan Interaction ✨
**Future goal:** When hovering over the enso, the koan slowly fades in and overlays the page
- Koan text appears centered over content
- Subtle fade-in animation (2-3s)
- Fade out when hover ends
- Implementation in `components/Enso.tsx` and `components/ChapterContent.tsx`

### 4. Polish & Refinements
- [ ] Responsive design (mobile layout)
- [ ] Board size adjustment for smaller screens
- [ ] Accessibility (keyboard navigation, aria labels)
- [ ] Performance optimization (lazy load boards)
- [ ] Add loading states

### 5. Optional Enhancements
- [ ] Koan styling differentiation
- [ ] Background subtle animations (particles, light shifts?)
- [ ] Sound design (optional ambient sound)
- [ ] Share/bookmark functionality

---

## 🎨 Design System Reference

### Colors
```css
Background:    #2B2420  /* Deep warm charcoal */
Text:          #F5E6D3  /* Warm cream */
Accent:        #D4A574  /* Amber/gold */
Highlight:     #8B6F47  /* Muted bronze */
Enso:          #E8C4A0  /* Glowing amber */
Muted:         #C4B5A0  /* Light bronze */
```

### Typography
- **Title**: 5xl, font-light, amber (#E8C4A0)
- **Quote**: xl, italic, amber (#D4A574)
- **Body**: xl, leading-loose, cream (#F5E6D3)
- **Koan**: 2xl, italic, center, amber (#D4A574)

### Spacing
- Header → Content: mb-48
- Title → Quote: space-y-24
- Paragraphs: mb-24
- Blockquotes: my-32

### Layout
```
┌──────────────────────────────────────────────┐
│  [Text Content]    [Go Board]    [Enso]     │
│     flex-1           600px        300px      │
│                                              │
│  Evenly spaced with justify-between         │
└──────────────────────────────────────────────┘
```

---

## 📁 Key Files

### Content
- `content/chapters/*.md` — 11 meditation chapters
- `public/diagrams/*.sgf` — Go game files
- `CHAPTER_GUIDE.md` — Writing guidelines

### Components
- `components/ChapterContent.tsx` — Main chapter layout
- `components/GoBoard.tsx` — Board rendering (needs SGF parsing)
- `components/Enso.tsx` — Breathing circle animation
- `components/TableOfContents.tsx` — Home page chapter list

### Utilities
- `lib/content.ts` — Markdown loading and parsing
- `types/chapter.ts` — TypeScript types

### Styling
- `app/globals.css` — Color variables, body styles
- Tailwind configured in Tailwind 4 format

---

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build production
npm run build

# View at
http://localhost:3000

# Add new chapter
# 1. Create content/chapters/NN-slug.md
# 2. Add SGF to public/diagrams/chapter-NN.sgf
# 3. Will auto-appear in TOC
```

---

## 🎯 Vision & Philosophy

**Stones** is a meditative digital experience — not a book display, not a game player.

**Core principles:**
- Emptiness over accumulation
- Space and silence as elements
- Direct, present-tense wisdom
- Calm zen teacher voice
- No explanations, just pointing

**User experience:**
1. Arrive at TOC (calm, spacious)
2. Choose a chapter
3. Read meditation with board and enso
4. Sit with the koan
5. Return to TOC or continue

---

## 📞 Reference Materials

- **Original book**: "The Direction of Play" by Takeo Kajiwara (9-dan)
- **Source distillation**: `~/data/dev/go/docs/zen.md`
- **Go board reference**: `~/data/dev/phone_go/go-flow.html` (custom canvas renderer)
- **SGF format**: Smart Game Format (text-based Go game notation)

---

## 🔥 Known Issues

1. **SGF not rendering** — Board shows grid but no stones (needs implementation)
2. **Enso hover interaction** — Koan doesn't appear on enso hover yet
3. **Mobile not optimized** — Layout needs responsive breakpoints
4. **Missing koans** — Chapters 1-11 have placeholder koans, need real ones

---

*"Each stone, whether it stands alone or with others, is invested with a power all its own."*
