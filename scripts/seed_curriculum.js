const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, '../dashboard/src/data/missionsData.ts');
const content = fs.readFileSync(tsPath, 'utf8');

// Match mission blocks accurately
const regex = /{\s*id:\s*'(mission-\d+)',\s*caseNumber:\s*'([^']+)',\s*tier:\s*'([^']+)',\s*title:\s*'((?:\\'|[^'])+)',\s*officialCaseFile:\s*'([^']*)',\s*target:\s*'((?:\\'|[^'])+)'/g;

let match;
let sql = '-- Seed 30 Curriculum Cases into sovereign_osint\n';
let count = 0;

while ((match = regex.exec(content)) !== null) {
  count++;
  const [_, id, caseNum, tier, rawTitle, file, rawTarget] = match;
  const title = rawTitle.replace(/\\'/g, "'");
  const target = rawTarget.replace(/\\'/g, "'");
  const escapedTitle = title.replace(/'/g, "''");
  const escapedTarget = target.replace(/'/g, "''");
  const priority = tier === 'BEGINNER' ? 'MEDIUM' : tier === 'INTERMEDIATE' ? 'HIGH' : 'CRITICAL';
  const classification = tier === 'BEGINNER' ? 'TLP:CLEAR' : tier === 'INTERMEDIATE' ? 'TLP:GREEN' : 'TLP:AMBER';
  
  sql += `INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('${caseNum}', '${escapedTitle}', '${classification}', 'ACTIVE_INVESTIGATION', '${priority}', 'Lead_Investigator_Chevalier', '${escapedTarget}', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: ${tier}.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;\n`;
}

console.log('Parsed and generated SQL for cases:', count);
fs.writeFileSync(path.join(__dirname, 'seed_curriculum.sql'), sql);
