# Getting started

## 1. Find a skill

Browse [skills.velonx.com](https://skills.velonx.com), the [`skills/`](../skills) folder, or [registry/skills.json](../registry/skills.json). Before installing, read the skill's `SKILL.md` — it's exactly what your agent will read.

## 2. Install it

> A `velonx` CLI is **coming soon**. For now, install by copying the folder.

Copy the whole `skills/<name>/` folder, not just `SKILL.md` — examples and scripts are referenced from it.

```bash
# from a clone of this repo
cp -R skills/web-research ~/.claude/skills/
```

| Agent | Where the folder goes |
|---|---|
| **Claude Code** | `.claude/skills/<name>/` in a project, or `~/.claude/skills/<name>/` for every project |
| **Claude apps** | Upload the zipped folder under Settings → Capabilities → Skills |
| **Claude API / Agent SDK** | Upload via the Skills API, or load the folder in the SDK's skills directory |
| **Cursor** | Add `SKILL.md` as a project rule (`.cursor/rules/<name>.mdc`), keeping the folder alongside for resources |
| **OpenAI, Gemini and others** | Paste `SKILL.md` into the system prompt / custom instructions, or load it with your framework's instruction files |

Check your agent's own docs for the current location — these paths change between versions.

## 3. Use it

Just ask. Agents that support skills pick one when your request matches its `description`, so "research whether…" loads `web-research`. You can also name it: "use the code-review skill on this branch".

## 4. Update it

Compare `metadata.version` in your copy with the registry, read the skill's `## Changelog`, and re-copy the folder. MAJOR version bumps may change behaviour.

## Requirements and platforms

Each skill lists:

- `platforms` — agents it has been written for (`generic` means any agent that can follow Markdown instructions).
- `requirements` — capabilities the agent needs, e.g. `web-access` or `code-execution`. If your agent lacks one, the skill won't work fully.
