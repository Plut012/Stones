#!/usr/bin/env python3
"""Split zen.md into individual chapter markdown files"""

from pathlib import Path
import re

def split_into_chapters():
    """Parse zen.md and create individual chapter files"""

    zen_path = Path.home() / "data/dev/go/docs/zen.md"
    chapters_dir = Path("content/chapters")

    zen_text = zen_path.read_text()

    # Define chapter structure
    chapters = [
        # Philosophy of Direction
        {
            "num": 1,
            "slug": "power-of-stones",
            "title": "The Power of Stones",
            "section": "The Philosophy of Direction",
            "quote": "Each stone, whether it stands alone or with others, is invested with a power all its own.",
        },
        {
            "num": 2,
            "slug": "existential-placement",
            "title": "The Existential Act of Placement",
            "section": "The Philosophy of Direction",
            "quote": "Every time you place a stone on the board, you are exposing something of yourself.",
        },
        {
            "num": 3,
            "slug": "wholeness-and-relationship",
            "title": "Wholeness and Relationship",
            "section": "The Philosophy of Direction",
            "quote": "Understanding the relationship between each stone and the overall position.",
        },
        # The Zen Connection
        {
            "num": 4,
            "slug": "presence-and-flow",
            "title": "Presence and Flow",
            "section": "The Zen Connection",
            "quote": "We engage the present moment as fully as we can.",
        },
        {
            "num": 5,
            "slug": "emptiness-over-accumulation",
            "title": "Emptiness Over Accumulation",
            "section": "The Zen Connection",
            "quote": "Like a cup that must be empty to be filled, the mind must be clear to see the board's truth.",
        },
        {
            "num": 6,
            "slug": "humility-and-patience",
            "title": "Humility and Patience",
            "section": "The Zen Connection",
            "quote": "The ego seeks victory. The spirit seeks understanding.",
        },
        {
            "num": 7,
            "slug": "paradox-of-mastery",
            "title": "The Paradox of Mastery",
            "section": "The Zen Connection",
            "quote": "Mastery requires intensive, focused study of core principles.",
        },
        # Principles for Practice
        {
            "num": 8,
            "slug": "each-stone-matters",
            "title": "Each Stone Matters",
            "section": "Principles for Practice",
            "quote": "Every stone carries your intention and expresses your character.",
        },
        {
            "num": 9,
            "slug": "see-the-whole-board",
            "title": "See the Whole Board",
            "section": "Principles for Practice",
            "quote": "Think in terms of influence, not just territory.",
        },
        {
            "num": 10,
            "slug": "accept-what-is",
            "title": "Accept What Is",
            "section": "Principles for Practice",
            "quote": "Once a stone is played, it is permanent.",
        },
        {
            "num": 11,
            "slug": "journey-is-destination",
            "title": "The Journey Is the Destination",
            "section": "Principles for Practice",
            "quote": "Victory and defeat are both teachers. Only the practice remains.",
        },
    ]

    # Extract content for each chapter based on H3 headers
    for chapter in chapters:
        # Find the section content
        pattern = f"### {re.escape(chapter['title'])}\\n\\n(.*?)(?=\\n### |\\n---\\n|\\Z)"
        match = re.search(pattern, zen_text, re.DOTALL)

        if match:
            content = match.group(1).strip()

            # Create markdown file with frontmatter
            filename = f"{chapter['num']:02d}-{chapter['slug']}.md"
            filepath = chapters_dir / filename

            markdown = f"""---
chapter: {chapter['num']}
title: "{chapter['title']}"
quote: "{chapter['quote']}"
---

{content}
"""

            filepath.write_text(markdown)
            print(f"✓ Created: {filename}")
        else:
            print(f"✗ Could not find content for: {chapter['title']}")

    print(f"\n✓ Created {len(chapters)} chapters in {chapters_dir}")

if __name__ == "__main__":
    split_into_chapters()
