// npm run validate — check every skill. Exits 1 on any error. Also run by CI on every PR.
import { loadSkills, validateAll, report } from './lib.mjs';

const skills = validateAll(loadSkills());
const errors = report(skills);
console.log(errors
  ? `✗ ${errors} error${errors > 1 ? 's' : ''} in ${skills.filter((s) => s.errors.length).length} of ${skills.length} skills`
  : `✓ ${skills.length} skills valid`);
process.exit(errors ? 1 : 0);
