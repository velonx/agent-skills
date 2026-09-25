---
name: research-paper
description: "Write, structure, and typeset academic research papers — original research, surveys, literature reviews, case studies, or conference/journal submissions. Trigger this skill whenever the user wants to write a research paper, publish research, turn findings/data/a project into a paper, draft an abstract, do a literature review, format something in IEEE/ACM/Springer style, or says things like 'make a paper on X', 'convert my research into a paper', 'I want to publish this', or 'write my college research paper'. Produces a full IMRaD-structured paper with REAL verified citations and delivers it as Overleaf-ready IEEE LaTeX and/or an editable Word document. Use it even for vague asks like 'help me publish something'."
license: MIT
metadata:
  title: Research Paper
  version: "1.0.0"
  author: Rishi Pandey
  category: writing
  tags: [research-paper, academic-writing, literature-review, citations, latex, ieee]
  platforms: [generic, claude, openai, gemini, cursor]
  requirements: [web-access, filesystem, code-execution]
  icon: doc
---

# Research Paper

## Overview

Turn research, project work, or findings into a submission-ready academic paper. The user is often a student aiming at their first publication — the job is to produce a paper a reviewer takes seriously, and to protect the user from the mistakes that get papers desk-rejected: fake citations, fabricated results, no clear contribution, and plagiarized phrasing.

## When to Use

- "Write a research paper on X", "make a paper on X", "convert my research / project into a paper", "I want to publish this".
- Drafting an abstract or a literature review, or formatting a paper in IEEE, ACM or Springer style.
- Vague asks like "help me publish something" or "write my college research paper".

## Usage

Hold the integrity rules at every step, then work through the six phases in order. Show the skeleton before writing prose.

### Non-negotiable integrity rules

These override everything else, including user impatience:

1. **Never fabricate data, results, or experiments.** If the user hasn't run the study, either (a) help design it and write the paper up to Methodology with clearly-marked `[RESULTS PENDING]` placeholders, or (b) reframe the paper as a survey/position paper that needs no new data. Say which route is being taken and why.
2. **Never invent citations.** Every reference must come from an actual web search hit — verify the paper exists, and cite what it actually says. One fabricated reference can get a submission blacklisted. If a claim can't be sourced, either drop it or mark it as the paper's own argument.
3. **Never copy sentences from sources.** Synthesize in original words. Facts get cited; phrasing stays original.

### Workflow

#### Phase 1 — Scope (fast, one pass)

Pin down, from the conversation or by asking at most one compact question:

- **Paper type:** original research / survey-review / case study / position paper
- **Core contribution:** the ONE sentence answer to "what does this paper add that didn't exist before?" If the user can't say it, derive candidate contributions from what they have and pick the strongest.
- **What the user already has:** data, experiments, a built system, field observations — inventory it. Existing work (projects, platforms, prior research) is raw material; mine the conversation and memory for it.
- **Target venue & format:** default to **IEEE conference format** (two-column, IEEE numeric citations) — the standard for engineering students — unless they name a venue.

#### Phase 2 — Literature research (web search, wide)

Run 5–10 searches to build the Related Work section and position the contribution:

- Prior papers on the same problem (Google Scholar-visible results, arXiv, IEEE/ACM/Springer pages)
- Adjacent work the reviewers will expect to see cited
- Recent work (last 2–3 years) — reviewers check whether the paper knows the current state of the art
- Real-world grounding: laws, standards, statistics, news the paper cites (e.g. regulations, incident reports)

For every source, capture: authors, title, venue/year, and the specific claim it supports. Build the reference list ONLY from these. Aim for 15–25 references for a full paper, 8–12 for a short one.

#### Phase 3 — Skeleton before prose

Draft the full outline and show it before writing sections. Standard IMRaD skeleton (adapt per paper type):

1. **Title** — specific, contribution-forward, no clickbait
2. **Abstract** (150–250 words: context → gap → method → key result → implication)
3. **Keywords** (4–6)
4. **Introduction** — problem, why it matters, the gap, contribution bullets ("The contributions of this paper are:")
5. **Related Work** — grouped by theme, each group ending with what's missing that this paper provides
6. **Methodology** — reproducible detail: setup, data collection, tools, ethics measures where relevant
7. **Results** — findings with tables/figures; numbers, not adjectives
8. **Discussion** — what the results mean, comparison with prior work, surprises
9. **Limitations** — write this honestly; a paper with no limitations section reads as naive
10. **Conclusion & Future Work**
11. **References**

For surveys, replace 6–8 with a taxonomy + comparative analysis tables.

#### Phase 4 — Write

- Academic register, but plain: short sentences, active voice where natural, zero filler ("In today's fast-paced world..." is an instant reviewer eye-roll — open with the problem instead).
- Every factual claim carries a citation `[n]`; every citation maps to a Phase-2 verified source.
- Results get tables and figures described concretely; propose figure content even if the user will create the images.
- Quantify wherever possible. "Significantly improved" is nothing; "reduced leakage exposure across 14 of 17 sampled shops" is a paper.
- Keep the user's authentic materials central — their data, their observations, their system. The paper's voice is theirs.

#### Phase 5 — Typeset and deliver

Before producing a Word file, read the docx skill if your agent has one (in Claude: the built-in `docx` skill).

Deliver in this order unless the user specifies:

1. **Overleaf-ready LaTeX** — a complete `main.tex` using the `IEEEtran` document class plus a `references.bib` with real BibTeX entries, zipped. Tell the user: upload the zip to overleaf.com → compile → done. (Don't attempt local LaTeX compilation; the .tex is the deliverable.)
2. **Editable .docx** — IMRaD-formatted Word document for supervisors who want tracked changes, via the docx skill.

Offer both; produce what's asked. Name files after the paper's short title, not "paper.docx".

#### Phase 6 — Pre-submission check (always run, report briefly)

- Contribution stated explicitly in both Abstract and Introduction?
- Every reference real and actually cited in-text? Count matches?
- Any `[RESULTS PENDING]` placeholders left? Flag them loudly.
- Limitations section present?
- Abstract within word limit?
- One-line note on where to submit: suggest 2–3 realistic venues (student conferences, IEEE regional conferences, arXiv preprint) matched to the paper's weight — don't point a first paper at a top-tier venue.

### Rules

- Show the skeleton (Phase 3) and get a nod before writing full prose — a wrong structure wastes an hour; a wrong outline wastes a minute.
- If the user's existing research or prior conversations contain the raw material, use it — don't make them re-explain their own work.
- When the paper touches human subjects, privacy, or security (e.g. field studies of data leakage), add an ethics paragraph in Methodology: consent, anonymization, responsible disclosure.
- If the honest verdict is "this isn't publishable yet, here's what's missing", say exactly that and list the missing pieces — that's more useful than a weak paper.

## Examples

**Project into paper.** "Turn my campus food-delivery app into a paper." → Phase 1 pins the contribution and inventories what exists (the built system, usage data). Phase 2 runs 5–10 searches for related work. Phase 3 shows an IMRaD outline for approval. The result is an IEEE `main.tex` + `references.bib` zip for Overleaf, and a .docx on request.

**No data yet.** "Write a paper on data leakage in small shops, I haven't done the study." → Either designs the study and writes up to Methodology with `[RESULTS PENDING]` placeholders, or reframes it as a survey paper. It says which route it took and why, and never invents results.

**Survey.** "Literature review of LLM agents for code." → A taxonomy and comparison tables in place of Methodology/Results, 15–25 verified references, and 2–3 realistic venues to submit to.

## Limitations

- Needs web search. Without it the skill can't verify citations, and it won't invent them.
- It never fabricates data or results. A paper without a real study ends at Methodology with placeholders, or becomes a survey or position paper.
- Delivers LaTeX source rather than a compiled PDF; compile it on Overleaf. The .docx output relies on the agent's Word-document tooling.
- Suggests venues but doesn't guarantee acceptance, and it will say so when the work isn't publishable yet.

## Changelog

- 1.0.0 — First version in the Velonx registry.
