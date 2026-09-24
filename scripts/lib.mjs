// Shared by validate.mjs, build-registry.mjs and the tests: load skills/*/SKILL.md and check them.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';
import Ajv from 'ajv';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));

const schema = readJson('registry/schema.json');
const checkSchema = new Ajv({ allErrors: true, allowUnionTypes: true }).compile(schema);
export const CATEGORIES = readJson('registry/categories.json').categories.map((c) => c.id);

const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const REQUIRED_SECTIONS = ['Overview', 'When to Use', 'Usage', 'Examples', 'Limitations', 'Changelog'];
const METADATA_KEYS = Object.keys(schema.properties.metadata.properties);
const TEXT_EXT = new Set(['', '.md', '.txt', '.json', '.yml', '.yaml', '.toml', '.csv', '.py', '.js', '.mjs', '.cjs', '.ts', '.sh', '.bash', '.zsh', '.ps1', '.rb', '.go', '.sql', '.html']);

// Obvious bad patterns only. Maintainer review is still required — see SECURITY.md.
const BANNED = [
  [/AKIA[0-9A-Z]{16}/, 'looks like an AWS access key'],
  [/\bgh[pousr]_[A-Za-z0-9]{36,}/, 'looks like a GitHub token'],
  [/\bsk-(?:ant-|proj-)?[A-Za-z0-9_-]{24,}/, 'looks like an API secret key'],
  [/xox[baprs]-[A-Za-z0-9-]{10,}/, 'looks like a Slack token'],
  [/-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/, 'contains a private key'],
  // Placeholders like "YOUR_API_KEY" or "${TOKEN}" are fine.
  [/\b(?:[Pp]ass(?:wor)?d|PASS(?:WOR)?D|[Ss]ecret|SECRET|[Aa]pi[_-]?[Kk]ey|API[_-]?KEY|[Tt]oken|TOKEN)\s*[:=]\s*["'](?![A-Z0-9_]+["'])(?![Yy]our|YOUR|[Ee]xample|EXAMPLE|changeme|xxx|<|\$\{)[^"'\s]{8,}["']/, 'hard-coded credential'],
  [/\brm\s+-[a-zA-Z]*[rR][a-zA-Z]*\s+(?:--no-preserve-root\s+)?(?:\/\*?|~\/?|\$HOME\/?)(?=[\s"'`;]|$)/m, 'destructive command (rm -r on / or ~)'],
  [/\bmkfs(?:\.\w+)?\s/, 'destructive command (mkfs)'],
  [/\bdd\s[^\n]*\bof=\/dev\/(?:sd|hd|nvme|disk)/, 'destructive command (dd to a disk)'],
  [/:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:/, 'fork bomb'],
  [/\b(?:curl|wget)\b[^\n|]*\|\s*(?:sudo\s+)?(?:ba|z)?sh\b/, 'pipes a remote script into a shell'],
  [/\bbase64\s+(?:-d|--decode)\b[^\n]*\|\s*(?:ba|z)?sh\b/, 'decodes and executes an encoded payload'],
  [/\beval\s*\(\s*(?:atob|Buffer\.from)\s*\(/, 'evals an encoded payload'],
  [/\bchmod\s+(?:-R\s+)?777\s+\/(?:\s|$)/m, 'makes / world-writable'],
];

const rel = (p) => relative(ROOT, p);

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)]);
}

/** Parse one skill folder. Never throws; problems go into skill.errors. */
export function loadSkill(dir) {
  const skill = { folder: basename(dir), dir, file: join(dir, 'SKILL.md'), errors: [], warnings: [] };
  if (!existsSync(skill.file)) { skill.errors.push('Missing SKILL.md'); return skill; }
  const text = readFileSync(skill.file, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) { skill.errors.push('SKILL.md must start with YAML frontmatter between two "---" lines'); return skill; }
  try {
    skill.meta = parseYaml(m[1]) ?? {};
  } catch (e) {
    skill.errors.push(`Invalid YAML frontmatter: ${e.message.split('\n')[0]}`);
    return skill;
  }
  skill.body = m[2];
  return skill;
}

export function loadSkills(skillsDir = join(ROOT, 'skills')) {
  return readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => loadSkill(join(skillsDir, d.name)))
    .sort((a, b) => a.folder.localeCompare(b.folder));
}

function schemaErrors(meta) {
  if (checkSchema(meta)) return [];
  return checkSchema.errors.map((e) => {
    const at = e.instancePath.replace(/^\//, '').replaceAll('/', '.');
    const where = at ? `"${at}"` : 'frontmatter';
    switch (e.keyword) {
      case 'required':
        return `Missing required ${at === 'metadata' ? 'metadata' : 'field'}: ${e.params.missingProperty}`;
      case 'additionalProperties': {
        const k = e.params.additionalProperty;
        if (!at && METADATA_KEYS.includes(k)) return `"${k}" must go under "metadata:" (top level is reserved for the Agent Skills standard)`;
        return `Unknown field "${at ? at + '.' : ''}${k}"`;
      }
      case 'enum':
        return `${where} must be one of: ${e.params.allowedValues.join(', ')}`;
      case 'pattern':
        if (at === 'metadata.version') return `"metadata.version" must be semver like 1.0.0 (quote it in YAML)`;
        if (at === 'description') return '"description" must not contain < or >';
        return `${where} has an invalid format`;
      case 'type':
        if (at === 'metadata.version') return `"metadata.version" must be a quoted string like "1.0.0"`;
        return `${where} must be ${e.params.type}`;
      default:
        return `${where} ${e.message}`;
    }
  });
}

function checkMarkdown(skill) {
  const lines = skill.body.split('\n');
  const fences = lines.filter((l) => /^\s*(```|~~~)/.test(l)).length;
  if (fences % 2) skill.errors.push('Unclosed code fence (``` or ~~~)');

  // Headings outside code blocks.
  let inFence = false;
  const headings = [];
  for (const l of lines) {
    if (/^\s*(```|~~~)/.test(l)) inFence = !inFence;
    else if (!inFence && /^#{1,6}\s/.test(l)) headings.push(l.trim());
  }
  const h1 = headings.filter((h) => /^#\s/.test(h));
  if (h1.length !== 1) skill.errors.push(`Expected exactly one "# Title" heading, found ${h1.length}`);
  const h2 = new Set(headings.filter((h) => /^##\s/.test(h)).map((h) => h.slice(3).trim().toLowerCase()));
  const missing = REQUIRED_SECTIONS.filter((s) => !h2.has(s.toLowerCase()));
  if (missing.length) skill.errors.push(`Missing required section${missing.length > 1 ? 's' : ''}: ${missing.map((s) => '## ' + s).join(', ')}`);
}

function checkFiles(skill) {
  for (const f of walk(skill.dir)) {
    const ext = extname(f).toLowerCase();
    if (!TEXT_EXT.has(ext)) continue;
    if (statSync(f).size > 1_000_000) { skill.errors.push(`${rel(f)}: text file larger than 1 MB`); continue; }
    const text = readFileSync(f, 'utf8');
    for (const [re, why] of BANNED) if (re.test(text)) skill.errors.push(`${rel(f)}: ${why}`);
    if (ext !== '.md') continue;

    // Relative links must resolve inside this skill — skills get installed on their own.
    const noCode = text.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`/g, '');
    for (const [, target] of noCode.matchAll(/\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) {
      if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(target)) continue;
      const path = resolve(dirname(f), decodeURI(target.split('#')[0]));
      if (!path.startsWith(skill.dir + '/') && path !== skill.dir) skill.errors.push(`${rel(f)}: link "${target}" points outside the skill folder`);
      else if (!existsSync(path)) skill.errors.push(`${rel(f)}: broken link "${target}"`);
    }
  }
}

/** Validate every skill in place and add cross-skill errors. Returns the same array. */
export function validateAll(skills) {
  for (const s of skills) {
    if (!NAME_RE.test(s.folder)) s.errors.push(`Folder name "${s.folder}" must be lowercase kebab-case`);
    if (!s.meta) continue;
    s.errors.push(...schemaErrors(s.meta));
    if (s.meta.name && s.meta.name !== s.folder) s.errors.push(`"name" is "${s.meta.name}" but the folder is "${s.folder}" — they must match`);
    const cat = s.meta.metadata?.category;
    if (typeof cat === 'string' && !CATEGORIES.includes(cat)) s.errors.push(`Unknown category "${cat}". Use one of: ${CATEGORIES.join(', ')}`);
    if (s.meta.metadata?.deprecated === false) s.warnings.push('"deprecated: false" is the default — remove it');
    checkMarkdown(s);
    checkFiles(s);
  }

  const names = new Set(skills.map((s) => s.meta?.name).filter(Boolean));
  const seen = { name: new Map(), title: new Map() };
  for (const s of skills) {
    for (const [key, value] of [['name', s.meta?.name], ['title', s.meta?.metadata?.title?.toLowerCase?.()]]) {
      if (!value) continue;
      if (seen[key].has(value)) s.errors.push(`Duplicate ${key} "${value}" (also used by skills/${seen[key].get(value)})`);
      else seen[key].set(value, s.folder);
    }
    for (const d of s.meta?.metadata?.dependencies ?? []) {
      if (!names.has(d)) s.errors.push(`Dependency "${d}" is not a skill in this registry`);
    }
  }
  return skills;
}

export function report(skills, log = console.log) {
  let errors = 0;
  for (const s of skills) {
    for (const msg of s.errors) { errors++; log(`ERROR  ${rel(s.file)}\n       ${msg}\n`); }
    for (const msg of s.warnings) log(`WARN   ${rel(s.file)}\n       ${msg}\n`);
  }
  return errors;
}
