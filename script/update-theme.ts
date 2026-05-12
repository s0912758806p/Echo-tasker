import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';

const now = new Date();
const pad = (n: number) => String(n).padStart(2, '0');
const stamp =
  `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}` +
  `-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
const human =
  `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
  `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
const dateOnly =
  `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

const pick = <T>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const hex = () =>
  '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');

const scssFiles = [
  'src/styles/theme.scss',
  'src/styles/components.scss',
  'src/styles/layout.scss',
];

const components = ['btn', 'card', 'panel', 'badge', 'chip', 'hint', 'tag', 'tile'];
const variants = ['primary', 'secondary', 'subtle', 'muted', 'accent', 'ghost'];
const sizes = ['sm', 'md', 'lg'];

function buildRule(): string {
  const className =
    `${pick(components)}-${pick(variants)}-${pick(sizes)}-${stamp.slice(-4)}`;
  return `
/* ${human} */
.${className} {
  margin: ${rand(0, 50)}px;
  padding: ${rand(0, 30)}px;
  color: ${hex()};
  background-color: ${hex()};
  border-radius: ${rand(0, 20)}px;
  font-size: ${rand(12, 24)}px;
  box-shadow: ${rand(1, 5)}px ${rand(1, 5)}px ${rand(1, 10)}px rgba(0, 0, 0, 0.${rand(1, 9)});
  transition: all ${rand(2, 8)}00ms ease;

  &:hover {
    transform: scale(${(rand(105, 115) / 100).toFixed(2)});
  }
}
`;
}

function opAppendSCSS(): string {
  const file = pick(scssFiles);
  mkdirSync('src/styles', { recursive: true });
  appendFileSync(file, buildRule());
  return pick([
    'style: tweak spacing',
    'style: adjust color palette',
    'chore: refresh theme tokens',
    'style(theme): update padding',
    'refactor: simplify utility class',
    'style: bump font size',
    'chore: minor style tweaks',
    'style: adjust border radius',
    'style(theme): tune hover transition',
    'chore: tidy up style file',
    'style: add utility class',
    'style(theme): rework shadow',
  ]);
}

const TS_COMMENT_LEN = 25; // "/* YYYY-MM-DD HH:MM:SS */"

function opModifySCSS(): string {
  const existing = scssFiles.filter(existsSync);
  if (existing.length === 0) return opAppendSCSS();

  const file = pick(existing);
  const content = readFileSync(file, 'utf8');

  // Locate every rule start (timestamp comment)
  const tsRegex = /\/\* \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \*\//g;
  const tsPositions: number[] = [];
  let m: RegExpExecArray | null;
  while ((m = tsRegex.exec(content)) !== null) tsPositions.push(m.index);

  // Restrict edits to the last N rules (N varies 3~7 per run)
  const recentN = rand(3, 7);
  const windowStart =
    tsPositions.length === 0
      ? 0
      : tsPositions[Math.max(0, tsPositions.length - recentN)];
  const region = content.slice(windowStart);

  const matches = [...region.matchAll(/(\d+)px/g)];
  if (matches.length === 0) return opAppendSCSS();

  const target = pick(matches);
  const oldVal = parseInt(target[1], 10);
  let newVal = oldVal;
  while (newVal === oldVal) {
    newVal = Math.min(50, Math.max(1, oldVal + pick([-3, -2, -1, 1, 2, 3])));
  }

  const absIdx = windowStart + target.index!;
  // Which rule owns this px? Latest timestamp at or before absIdx.
  const ruleStart = tsPositions.filter((p) => p <= absIdx).pop();

  // px sits after the timestamp, so replace px first then bump the comment.
  let next =
    content.slice(0, absIdx) +
    `${newVal}px` +
    content.slice(absIdx + target[0].length);

  if (ruleStart !== undefined) {
    next =
      next.slice(0, ruleStart) +
      `/* ${human} */` +
      next.slice(ruleStart + TS_COMMENT_LEN);
  }

  writeFileSync(file, next);

  return pick([
    'style: adjust spacing',
    'style: tighten padding',
    'style: nudge dimensions',
    'refactor(style): minor tweak',
    'style: tune sizing',
    'style: tidy up values',
  ]);
}

function opBumpVersion(): string {
  const pkgPath = 'package.json';
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const [major, minor, patch] = pkg.version.split('.').map(Number);
  pkg.version = `${major}.${minor}.${patch + 1}`;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  return pick([
    'chore: bump patch version',
    'chore(release): patch bump',
    `chore: ${pkg.version}`,
    'chore: version bump',
  ]);
}

function opChangelog(): string {
  const path = 'CHANGELOG.md';
  const entry = `- ${dateOnly}: ${pick([
    'minor style updates',
    'theme refresh',
    'utility class tweaks',
    'tokens adjustment',
    'spacing refinements',
  ])}\n`;
  if (!existsSync(path)) {
    writeFileSync(path, `# Changelog\n\n${entry}`);
  } else {
    appendFileSync(path, entry);
  }
  return pick([
    'docs: update changelog',
    'docs(changelog): record changes',
    'chore: log changes',
    'docs: changelog entry',
  ]);
}

const roll = Math.random() * 100;
let msg: string;
if (roll < 60) {
  msg = opAppendSCSS();
} else if (roll < 80) {
  msg = opModifySCSS();
} else if (roll < 95) {
  msg = opBumpVersion();
} else {
  msg = opChangelog();
}

process.stdout.write(msg);
