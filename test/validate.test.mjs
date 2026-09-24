import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { ROOT, loadSkills, validateAll } from '../scripts/lib.mjs';

const fixtures = validateAll(loadSkills(join(ROOT, 'test/fixtures/skills')));
const errorsOf = (folder) => fixtures.find((s) => s.folder === folder).errors.join('\n');

test('every real skill is valid', () => {
  const bad = validateAll(loadSkills()).filter((s) => s.errors.length);
  assert.deepEqual(bad.map((s) => `${s.folder}: ${s.errors.join('; ')}`), []);
});

test('broken skill reports each problem', () => {
  const e = errorsOf('bad-skill');
  for (const expected of [
    'Missing required field: license',
    '"version" must go under "metadata:"',
    '"metadata.version" must be a quoted string',
    '"name" is "not-bad-skill" but the folder is "bad-skill"',
    'Unknown category "cooking"',
    '"metadata.tags.0" has an invalid format',
    '"metadata.platforms.1" must be one of',
    'Dependency "does-not-exist"',
    'Unclosed code fence',
    'Missing required sections: ## When to Use, ## Usage',
    'broken link "examples/nope.md"',
    'points outside the skill folder',
    'pipes a remote script into a shell',
    'hard-coded credential',
  ]) assert.ok(e.includes(expected), `expected "${expected}" in:\n${e}`);
});

test('folder naming, missing SKILL.md and duplicate titles', () => {
  assert.match(errorsOf('Bad_Folder'), /must be lowercase kebab-case/);
  assert.match(errorsOf('no-skill-md'), /Missing SKILL.md/);
  assert.equal(errorsOf('dupe-a'), '');
  assert.match(errorsOf('dupe-b'), /Duplicate title "same title" \(also used by skills\/dupe-a\)/);
});
