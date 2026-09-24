---
name: pdf-analysis
description: Extract text, tables and specific fields from PDF documents and answer questions about them with page references. Use when the user shares a PDF or asks to summarise a report, pull numbers from an invoice or statement, extract tables, or compare PDFs.
license: MIT
compatibility: Works best with Python 3.10+ and pdfplumber or pypdf available; falls back to the agent's built-in PDF reading.
metadata:
  title: PDF Analysis
  version: "1.0.0"
  author: Velonx
  category: documents
  tags: [pdf, documents, extraction, tables]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: [filesystem, code-execution]
  icon: doc
  featured: true
---

# PDF Analysis

## Overview

Turns PDFs into answers: summaries with page citations, structured field extraction, and clean tables — while being explicit about pages that couldn't be read (scans, images, broken encoding).

## When to Use

- "Summarise this PDF", "what does page 12 say about…", "pull the totals from these invoices"
- Extracting tables to CSV, comparing two versions of a contract or report.

## Usage

1. **Inspect first:** page count, whether text is extractable, and which pages are scanned images. With Python:
   ```python
   import pdfplumber
   with pdfplumber.open(path) as pdf:
       for i, page in enumerate(pdf.pages, 1):
           text = page.extract_text() or ""
           print(i, len(text))  # ~0 chars → likely scanned; needs OCR
   ```
2. **Extract** text per page and keep page numbers attached to every chunk.
3. **Tables:** use `page.extract_tables()`; check headers and merged cells by eye against the page; export to CSV if asked.
4. **Field extraction** (invoices, forms, statements): define the fields up front, extract each with its page number, and return JSON. Leave a field `null` rather than guessing.
5. **Answer or summarise** with citations like `(p. 7)`. For long documents summarise per section first, then overall.
6. **Report gaps:** list pages that were scanned/unreadable and whether OCR was used.

## Examples

**Prompt:** "Get invoice number, date, vendor and total from these 20 PDFs into a CSV."

See [examples/invoice-fields.md](examples/invoice-fields.md) for the field spec and output format.

## Requirements

- File access to the PDF. Python with `pdfplumber` (or `pypdf`) improves table extraction; OCR needs `tesseract`.

## Limitations

- Scanned PDFs need OCR, which introduces errors — numbers from OCR should be double-checked.
- Complex layouts (multi-column, rotated tables) may extract out of order.
- Password-protected PDFs require the user to unlock them first.

## Changelog

- **1.0.0** — Initial release.
