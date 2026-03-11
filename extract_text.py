#!/usr/bin/env python3
"""Extract text from The Direction of Play PDF"""

from pypdf import PdfReader
from pathlib import Path

def extract_pdf_text(pdf_path: str, output_path: str):
    """Extract all text from PDF and save to file"""
    reader = PdfReader(pdf_path)

    print(f"Total pages: {len(reader.pages)}")

    full_text = []
    for i, page in enumerate(reader.pages, 1):
        text = page.extract_text()
        full_text.append(f"\n{'='*80}\n")
        full_text.append(f"PAGE {i}\n")
        full_text.append(f"{'='*80}\n")
        full_text.append(text)

        if i <= 5:  # Print first 5 pages for inspection
            print(f"\n--- Page {i} preview ---")
            print(text[:500])

    # Save full text
    output = Path(output_path)
    output.write_text('\n'.join(full_text), encoding='utf-8')
    print(f"\n✓ Extracted text saved to {output_path}")
    print(f"  Total pages: {len(reader.pages)}")

if __name__ == "__main__":
    pdf_path = "content/raw/direction-of-play.pdf"
    output_path = "content/raw/full-text.txt"

    extract_pdf_text(pdf_path, output_path)
