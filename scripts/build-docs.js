import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const partialsDir = path.join(rootDir, 'docs', 'partials');
const docsIndexPath = path.join(rootDir, 'docs', 'index.html');
const examplesDocsPath = path.join(rootDir, 'examples', 'docs.html');

const PARTIAL_ORDER = [
  'head.html',
  'header.html',
  'sidebar.html',
  'hero.html',
  'section-intro.html',
  'section-layout.html',
  'section-typography.html',
  'section-forms.html',
  'section-components.html',
  'section-patterns.html',
  'section-modes.html',
  'footer.html'
];

export function buildDocs() {
  const startTime = Date.now();
  console.log('Assembling documentation portal from partials...');

  const chunks = [];
  for (const filename of PARTIAL_ORDER) {
    const filePath = path.join(partialsDir, filename);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Required partial not found: ${filename}`);
    }
    chunks.push(fs.readFileSync(filePath, 'utf-8'));
  }

  const assembledHTML = chunks.join('\n');
  fs.writeFileSync(docsIndexPath, assembledHTML, 'utf-8');

  // Create examples/docs.html with adjusted relative asset links
  const examplesHTML = assembledHTML
    .replace(/href="\.\.\/examples\/index\.html"/g, 'href="./index.html"')
    .replace(/href="\.\.\/examples\/components\.html"/g, 'href="./components.html"')
    .replace(/src="\.\.\/examples\/switcher\.js"/g, 'src="./switcher.js"')
    .replace(/href="\.\.\/examples\/switcher\.css"/g, 'href="./switcher.css"');

  fs.writeFileSync(examplesDocsPath, examplesHTML, 'utf-8');

  const duration = Date.now() - startTime;
  const docsSize = (fs.statSync(docsIndexPath).size / 1024).toFixed(2);
  const examplesSize = (fs.statSync(examplesDocsPath).size / 1024).toFixed(2);

  console.log(`\x1b[32m✔ Docs assembled in ${duration}ms\x1b[0m`);
  console.log(`  - docs/index.html (${docsSize} KB)`);
  console.log(`  - examples/docs.html (${examplesSize} KB)`);

  return { docsIndexPath, examplesDocsPath };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    buildDocs();
  } catch (err) {
    console.error('\x1b[31m✖ Docs build failed:\x1b[0m', err.message);
    process.exit(1);
  }
}
