# Stones

> A digital meditation on Kajiwara's "The Direction of Play"

A minimal, contemplative web experience distilling Takeo Kajiwara's Go wisdom into pure essence.

---

## Philosophy

**Stones** is a space between reading and meditation. Each chapter of Kajiwara's teaching is distilled to its core, presented with breathing room, accompanied by the stones themselves.

See [overview.md](./overview.md) for the full vision.

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to experience Stones.

---

## Project Structure

```
stones/
├── app/              # Next.js pages and routing
├── components/       # React components (Enso, TOC, Board)
├── content/          # Markdown chapters and raw text
│   ├── raw/         # Original PDF text (local only)
│   └── chapters/    # Distilled markdown files
├── public/diagrams/ # SGF game files
└── lib/             # Utilities (content loading, SGF parsing)
```

See [architecture.md](./architecture.md) for detailed technical decisions.

---

## Adding Content

### Adding a Chapter

1. Create a markdown file in `content/chapters/`:

```markdown
---
chapter: 1
title: "The Power of Stones"
sgf: "chapter-01.sgf"
quote: "Each stone is invested with a power all its own."
---

Your distilled content here...
```

2. If there's a game diagram, add the SGF file to `public/diagrams/chapter-01.sgf`

3. The chapter will automatically appear in the table of contents

### Content Guidelines

- Keep chapters concise (3-5 minutes of reading)
- Use generous spacing between paragraphs
- Emphasize key quotes with `>`
- Let the content breathe — less is more

---

## Tech Stack

- **Next.js 15** — React framework with App Router
- **TypeScript** — Type safety
- **Framer Motion** — Smooth animations and transitions
- **Tailwind CSS** — Styling
- **@sabaki/shudan** — Go board rendering
- **gray-matter** — Markdown frontmatter parsing

---

## Design System

### Colors
- **Cream**: `#FAF7F0` — Background
- **Black**: `#1A1A1A` — Text, enso
- **Grey**: `#666666` — Subtle elements

### Typography
- System font stack (SF Pro / Segoe UI / Inter)
- 18-20px base size
- 1.8-2.0 line height
- Generous spacing

### Principles
- Simplicity over complexity
- Space over density
- Presence over information

---

## Development

### File Naming
- Chapters: `01-slug-name.md` (numbered, kebab-case)
- Components: `ComponentName.tsx` (PascalCase)
- Utilities: `utility-name.ts` (kebab-case)

### Content Workflow
1. Extract text from PDF → `content/raw/`
2. Discuss and distill each chapter
3. Create markdown file in `content/chapters/`
4. Add corresponding SGF file to `public/diagrams/`
5. Test locally, commit when satisfied

---

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel deploy
```

The site is fully static and can be deployed anywhere that supports Next.js.

---

## What This Is Not

- Not a comprehensive Go tutorial
- Not a game playing interface
- Not trying to replace the book
- Not busy or complex

## What This Is

A quiet space to sit with Kajiwara's wisdom.

---

## License

Content © Kajiwara Takeo, "The Direction of Play"

Code: MIT License (to be added)

---

*"Each stone, whether it stands alone or with others, is invested with a power all its own."*
