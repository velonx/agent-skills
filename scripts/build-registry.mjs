// npm run registry — validate, then write registry/skills.json. CI runs this on main; don't edit the output by hand.
import { writeFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, loadSkills, validateAll, report } from './lib.mjs';

const skills = validateAll(loadSkills());
if (report(skills)) {
  console.log('✗ registry not written — fix the errors above first');
  process.exit(1);
}

// First/last commit dates for a skill folder; empty outside git or before the first commit.
function gitDates(dir) {
  try {
    const out = execFileSync('git', ['log', '--format=%cs', '--', relative(ROOT, dir)], { cwd: ROOT, encoding: 'utf8' }).trim();
    const dates = out ? out.split('\n') : [];
    return { updatedAt: dates[0], createdAt: dates.at(-1) };
  } catch {
    return {};
  }
}

const files = (dir, base = dir) => readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
  d.isDirectory() ? files(join(dir, d.name), base) : [relative(base, join(dir, d.name))]).sort();

const registry = {
  version: 1,
  skills: skills.map(({ meta, dir }) => {
    const { metadata: m, ...top } = meta;
    const git = gitDates(dir);
    return {
      name: top.name,
      title: m.title,
      description: top.description,
      version: m.version,
      author: m.author,
      license: top.license,
      category: m.category,
      tags: m.tags,
      platforms: m.platforms,
      requirements: m.requirements,
      ...(top.compatibility && { compatibility: top.compatibility }),
      ...(m.dependencies?.length && { dependencies: m.dependencies }),
      ...(m.repository && { repository: m.repository }),
      ...(m.homepage && { homepage: m.homepage }),
      ...(m.documentation && { documentation: m.documentation }),
      ...(m.icon && { icon: m.icon }),
      featured: m.featured ?? false,
      deprecated: m.deprecated ?? false,
      createdAt: m.createdAt ?? git.createdAt ?? null,
      updatedAt: m.updatedAt ?? git.updatedAt ?? null,
      path: relative(ROOT, join(dir, 'SKILL.md')),
      files: files(dir),
    };
  }),
};

writeFileSync(join(ROOT, 'registry/skills.json'), JSON.stringify(registry, null, 2) + '\n');
console.log(`✓ registry/skills.json — ${registry.skills.length} skills`);
