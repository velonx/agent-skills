---
name: academic-research
description: Find, read and summarise peer-reviewed papers and build a short cited literature review. Use when the user asks what the research says, wants papers on a topic, needs a literature review, or asks to evaluate a study's methods.
license: MIT
metadata:
  title: Academic Research
  version: "1.2.0"
  author: Velonx
  category: research
  tags: [research, papers, literature-review, citations]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: [web-access]
  icon: book
---

# Academic Research

## Overview

Search scholarly sources, screen papers by relevance and quality, and synthesise them into a literature review with proper citations and an honest read of the evidence.

## When to Use

- "What does the research say about…", "find papers on…", "literature review of…"
- Evaluating a specific study ("is this paper any good?").
- Preparing background for a thesis, grant or technical decision.

## Usage

1. **Scope.** Define the question, the time window and inclusion criteria (study type, population, field). Confirm with the user if unclear.
2. **Search** scholarly indexes (Google Scholar, Semantic Scholar, PubMed, arXiv, SSRN — whichever fit the field). Use 2–3 query variants plus the key authors' names once you find them.
3. **Screen** titles and abstracts. Keep 5–15 papers. Prefer systematic reviews and meta-analyses, then large or well-controlled studies.
4. **Read** each kept paper's abstract, methods and results. For each record: design, sample size, main finding, effect size, limitations, funding/conflicts.
5. **Synthesise by theme**, not paper by paper. Note where findings agree, conflict, or where evidence is thin.
6. **Output:**
   - One-paragraph summary of the state of evidence.
   - Themed sections with in-text citations `(Author, Year)`.
   - A table: paper · design · n · finding · quality note.
   - Reference list in the style the user asks for (default APA).
7. Mark preprints as **not peer-reviewed**.

## Examples

**Prompt:** "Summarise the research on spaced repetition for learning programming."

The agent finds reviews on the spacing effect, narrows to studies in computing education, builds a table of 8 papers, and concludes that evidence is strong for factual recall but limited for problem-solving skills.

## Limitations

- Full text may be paywalled; the agent says when it only read the abstract.
- Never invents citations — if a reference can't be found again, it is dropped.
- Not a substitute for a formal systematic review.

## Changelog

- **1.2.0** — Preprints are now flagged explicitly; added quality-note column.
- **1.1.0** — Themed synthesis instead of per-paper summaries.
- **1.0.0** — Initial release.
