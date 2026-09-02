import fs from 'node:fs';

const html = fs.readFileSync('docs/index.html', 'utf-8');
const examplesDocs = html
  .replace(/href="\.\.\/examples\/index\.html"/g, 'href="./index.html"')
  .replace(/href="\.\.\/examples\/components\.html"/g, 'href="./components.html"')
  .replace(/src="\.\.\/examples\/switcher\.js"/g, 'src="./switcher.js"');

fs.writeFileSync('examples/docs.html', examplesDocs, 'utf-8');
console.log('✔ Synced examples/docs.html from docs/index.html');
