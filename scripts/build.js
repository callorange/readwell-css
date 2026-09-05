import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');
const entryFile = path.join(srcDir, 'index.css');

const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

const BANNER = `/*!
 * Readwell CSS v${pkg.version}
 * https://github.com/callorange/readwell-css
 * (c) 2026 Readwell Team
 * Released under the MIT License.
 */\n`;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Base64 VLQ Encoder for Zero-Dependency Source Maps
const VLQ_BASE64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function encodeVLQ(value) {
  let vlq = value < 0 ? ((-value) << 1) | 1 : value << 1;
  let encoded = '';
  do {
    let digit = vlq & 31;
    vlq >>>= 5;
    if (vlq > 0) digit |= 32;
    encoded += VLQ_BASE64[digit];
  } while (vlq > 0);
  return encoded;
}

function resolveImportsWithSources(filePath, seen = new Set(), fileList = []) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const realPath = fs.realpathSync(filePath);
  if (seen.has(realPath)) {
    return { css: '', fileList };
  }
  seen.add(realPath);

  const content = fs.readFileSync(filePath, 'utf-8');
  const dir = path.dirname(filePath);
  const relSource = path.relative(distDir, filePath).replace(/\\/g, '/');

  // Match @import "./foo.css"; or @import "foo.css";
  const importRegex = /@import\s+['"]([^'"]+)['"]\s*;\r?\n?/g;
  let currentFileCSS = '';
  let lastIndex = 0;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const chunkBefore = content.slice(lastIndex, match.index);
    if (chunkBefore.trim()) {
      currentFileCSS += chunkBefore;
      fileList.push({ file: relSource, code: chunkBefore });
    }

    const resolvedPath = path.resolve(dir, match[1]);
    const subResult = resolveImportsWithSources(resolvedPath, seen, fileList);
    currentFileCSS += subResult.css;

    lastIndex = importRegex.lastIndex;
  }

  const remaining = content.slice(lastIndex);
  if (remaining.trim()) {
    currentFileCSS += remaining;
    fileList.push({ file: relSource, code: remaining });
  }

  return { css: currentFileCSS, fileList };
}

function safeMinifyCSS(css) {
  const tokens = [];

  // 1. Mask strings and url() to protect their exact content
  let masked = css.replace(/(url\([^)]+\)|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/g, (match) => {
    const key = `___RW_TOKEN_${tokens.length}___`;
    tokens.push(match);
    return key;
  });

  // 2. Remove CSS comments
  masked = masked.replace(/\/\*[\s\S]*?\*\//g, '');

  // 3. Collapse multiple whitespace into a single space
  masked = masked.replace(/\s+/g, ' ');

  // 4. Remove unnecessary whitespace around operators (protecting spaces around + for calc)
  masked = masked
    .replace(/\s*([{};,>~])\s*/g, '$1')
    .replace(/:\s+/g, ':')
    .replace(/\s+!important/g, '!important')
    .replace(/;}/g, '}')
    .trim();

  // 5. Restore masked tokens
  for (let i = 0; i < tokens.length; i++) {
    masked = masked.replace(`___RW_TOKEN_${i}___`, tokens[i]);
  }

  return masked;
}

function generateSourceMap(outputFilename, fileList) {
  const sources = [];
  const sourcesContent = [];
  const sourceIndexMap = new Map();

  for (const item of fileList) {
    if (!sourceIndexMap.has(item.file)) {
      sourceIndexMap.set(item.file, sources.length);
      sources.push(item.file);
      const absPath = path.resolve(distDir, item.file);
      if (fs.existsSync(absPath)) {
        sourcesContent.push(fs.readFileSync(absPath, 'utf-8'));
      } else {
        sourcesContent.push(item.code);
      }
    }
  }

  let mappings = '';
  const bannerLines = BANNER.split('\n').length - 1;

  for (let i = 0; i < bannerLines; i++) {
    mappings += ';';
  }

  let prevSrcIndex = 0;
  let prevSrcLine = 0;

  for (const item of fileList) {
    const srcIndex = sourceIndexMap.get(item.file);
    const lines = item.code.split('\n');

    for (let l = 0; l < lines.length; l++) {
      if (l > 0) mappings += ';';
      const lineText = lines[l];
      if (lineText.trim().length > 0) {
        const colDiff = 0;
        const srcIdxDiff = srcIndex - prevSrcIndex;
        const srcLineDiff = l - prevSrcLine;
        const srcColDiff = 0;

        mappings += encodeVLQ(colDiff) + encodeVLQ(srcIdxDiff) + encodeVLQ(srcLineDiff) + encodeVLQ(srcColDiff);

        prevSrcIndex = srcIndex;
        prevSrcLine = l;
      }
    }
  }

  return JSON.stringify({
    version: 3,
    file: outputFilename,
    sources,
    sourcesContent,
    mappings,
    names: []
  }, null, 2);
}

export function build() {
  const startTime = Date.now();
  ensureDir(distDir);

  if (!fs.existsSync(entryFile)) {
    throw new Error(`Entry file not found: ${entryFile}`);
  }

  const { css: bundledCSS, fileList } = resolveImportsWithSources(entryFile);

  const fullCSS = BANNER + bundledCSS + '\n/*# sourceMappingURL=readwell.css.map */\n';
  const minifiedCSS = BANNER + safeMinifyCSS(bundledCSS) + '\n/*# sourceMappingURL=readwell.min.css.map */\n';

  const fullPath = path.join(distDir, 'readwell.css');
  const fullMapPath = path.join(distDir, 'readwell.css.map');
  const minPath = path.join(distDir, 'readwell.min.css');
  const minMapPath = path.join(distDir, 'readwell.min.css.map');

  fs.writeFileSync(fullPath, fullCSS, 'utf-8');
  fs.writeFileSync(minPath, minifiedCSS, 'utf-8');

  const fullMap = generateSourceMap('readwell.css', fileList);
  const minMap = generateSourceMap('readwell.min.css', fileList);

  fs.writeFileSync(fullMapPath, fullMap, 'utf-8');
  fs.writeFileSync(minMapPath, minMap, 'utf-8');

  const fullSize = (fs.statSync(fullPath).size / 1024).toFixed(2);
  const minSize = (fs.statSync(minPath).size / 1024).toFixed(2);
  const duration = Date.now() - startTime;

  console.log(`\x1b[32m✔ Build complete in ${duration}ms\x1b[0m`);
  console.log(`  - dist/readwell.css (${fullSize} KB) + readwell.css.map`);
  console.log(`  - dist/readwell.min.css (${minSize} KB) + readwell.min.css.map`);

  return { fullPath, minPath, fullSize, minSize };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    build();
  } catch (err) {
    console.error('\x1b[31m✖ Build failed:\x1b[0m', err.message);
    process.exit(1);
  }
}
