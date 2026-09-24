# Security Policy

Skills are instructions that AI agents follow, and some include scripts agents may run. Treat every skill as **potentially executable** — that's how we treat them too.

## Reporting a vulnerability

**Please don't open a public issue.** Report privately through GitHub:

1. Go to the [Security tab](https://github.com/velonx/agent-skills/security) of this repository.
2. Click **Report a vulnerability**.
3. Include the affected skill or file, what an attacker could do, and steps to reproduce.

This covers malicious or dangerous skills, secrets committed by mistake, flaws in the validator or CI, and anything that could harm people using the registry.

**What to expect:** acknowledgement within 3 working days, an assessment within 10, and credit in the fix (unless you'd rather stay anonymous). Please give us a reasonable window to fix before disclosing publicly — we'll agree the date with you.

Dangerous skills already merged are removed first and investigated after.

## What skills must never contain

- API keys, tokens, passwords, private keys or any credentials — not even "test" ones
- destructive commands (recursive deletes of system or home directories, disk formatting, etc.)
- remote scripts piped into a shell (`curl … | sh`), decode-and-execute, `eval` of encoded data
- obfuscated or minified code
- hidden network calls, telemetry or data exfiltration
- credential harvesting, phishing, or malware of any kind
- instructions to skip user confirmation for irreversible actions (sending, deleting, paying, publishing)

## How we protect the registry

1. **Automated checks** on every PR (`npm run validate`) flag obvious secrets, destructive commands and obfuscated payloads. They only catch known patterns — **automated validation is not a substitute for maintainer review.**
2. **Maintainer review.** A maintainer reads every file in every skill before merge, including scripts.
3. **No execution.** CI parses skill files; it never runs them. Nothing in this project executes submitted skills.
4. **Least privilege CI.** PR workflows have read-only access. Only the `main` workflow can write, and only the generated registry.
5. **Takedown.** Maintainers remove dangerous skills immediately; the website drops them on the next rebuild.

## Using skills safely

- Read a skill's `SKILL.md` and any `scripts/` before installing it — the website shows every file.
- Prefer skills that ask for confirmation before irreversible actions.
- Run agents with the least access they need. A research skill doesn't need your shell.

## Committed a secret by accident?

Revoke it with the provider **first**, then tell us through the private report above. Removing it from git history doesn't un-leak it.
