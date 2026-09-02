# Readwell CSS 초기 설정 및 기반 구축 구현 계획 (Implementation Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Readwell CSS 프레임워크의 개발/빌드/테스트를 위한 Git/패키지 설정, Zero-Dependency 번들러 및 개발 서버, 12개 CSS 모듈 스켈레톤, 5종 예제 템플릿 환경 구축.

**Architecture:** 순수 Node.js 내장 모듈(`fs`, `path`, `http`)을 사용한 빌드/개발 툴체인 구축, `@layer` 기반 모듈형 CSS 구조(`src/`), 빌드 산출물(`dist/`), 검증용 예제(`examples/`).

**Tech Stack:** Node.js (v24.12+), CSS3 (@layer, CSS Custom Properties), HTML5 Semantics.

**Spec:** `docs/superpowers/specs/2026-09-02-initial-setup-design.md`

## Global Constraints

- 외부 npm 런타임 의존성 없이 순수 Node.js 표준 라이브러리(`node:fs`, `node:path`, `node:http`)로만 빌드/서버 구현.
- 모든 파일은 UTF-8 인코딩 및 LF 줄바꿈 적용.
- CSS 변수 및 클래스 네이밍은 `--rw-*`, `.rw-*`, `[data-rw-*]` 접두사 엄수.

---

### Task 1: Git 초기화 및 프로젝트 루트 기본 설정

**Files:**
- Create: `.gitignore`
- Create: `.editorconfig`
- Create: `package.json`
- Create: `README.md`
- Create: `CHANGELOG.md`

**Interfaces:**
- Consumes: None
- Produces: Project root configuration files, Git repository initialization

- [ ] **Step 1: Git 저장소 초기화 (`git init`)**

Run: `git init`

- [ ] **Step 2: `.gitignore` 생성**

```gitignore
# Dependencies
node_modules/

# Build outputs
dist/

# OS & Editor
.DS_Store
Thumbs.db
.vscode/
.idea/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Scratch & Temporary
scratch/
```

- [ ] **Step 3: `.editorconfig` 생성**

```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

- [ ] **Step 4: `package.json` 생성**

```json
{
  "name": "readwell-css",
  "version": "0.1.0",
  "description": "E-Ink inspired quiet and readable CSS framework for modern web and product UIs",
  "main": "dist/readwell.css",
  "style": "dist/readwell.css",
  "exports": {
    ".": "./dist/readwell.css",
    "./min": "./dist/readwell.min.css",
    "./src/*": "./src/*"
  },
  "files": [
    "dist",
    "src",
    "README.md",
    "CHANGELOG.md"
  ],
  "scripts": {
    "build": "node scripts/build.js",
    "dev": "node scripts/dev.js",
    "start": "node scripts/dev.js",
    "test": "node scripts/test-build.js"
  },
  "keywords": [
    "css",
    "css-framework",
    "e-ink",
    "reading",
    "typography",
    "minimal-ui",
    "design-tokens"
  ],
  "author": "Readwell Team",
  "license": "MIT"
}
```

- [ ] **Step 5: `README.md` 생성**

```markdown
# Readwell CSS

> 읽는 시간이 길수록 조용한 화면이 좋아진다.

Readwell CSS는 긴 글의 뛰어난 가독성과 실제 제품 UI에 필요한 구조적 명확성을 함께 제공하는 저자극 순수 CSS 프레임워크입니다.

## 핵심 특징

- **E-Ink에서 영감을 얻은 절제된 디자인**: 불필요한 장식 색상, 화려한 그림자, 과한 애니메이션을 억제합니다.
- **저채도 Semantic Color**: 주요 액션 및 상태(success, warning, danger, info)를 명확한 의미 기반 저채도 컬러로 표현합니다.
- **Surface Family & Density System**: Reading, Workspace, Dashboard, Dense UI 환경에 최적화된 표면과 밀도를 제공합니다.
- **Zero Runtime JavaScript**: 모든 핵심 기능은 순수 HTML5 시맨틱 및 CSS3 `@layer`로 동작합니다.

## 빠른 시작 (Quick Start)

### 빌드 및 개발
```bash
# 단일 CSS 빌드 (dist/readwell.css, dist/readwell.min.css)
npm run build

# 예제 프리뷰 및 핫 리빌드 개발 서버 실행 (http://localhost:3000)
npm run dev
```

## 문서
- [컨셉 문서](docs/01_CONCEPT.md)
- [PRD](docs/02_PRD.md)
- [디자인 시스템](docs/03_DESIGN_SYSTEM.md)
- [CSS 아키텍처](docs/04_CSS_ARCHITECTURE.md)
- [컴포넌트 스코프](docs/08_COMPONENT_SCOPE.md)
```

- [ ] **Step 6: `CHANGELOG.md` 생성**

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- 프로젝트 초기 설정 및 디렉터리 구조 구축
- Zero-dependency 빌드 스크립트(`scripts/build.js`) 및 개발 서버(`scripts/dev.js`) 추가
- 12개 CSS 모듈 스켈레톤 및 토큰 체계(`src/`) 정의
- 5종 예제 템플릿 및 허브 페이지(`examples/`) 구성
```

- [ ] **Step 7: 검증 및 커밋**

Run: `git status`
Expected: 모든 파일 정상 untracked 상태 확인.

---

### Task 2: 빌드 및 개발 툴체인 구현 (`scripts/build.js`, `scripts/dev.js`, `scripts/test-build.js`)

**Files:**
- Create: `scripts/build.js`
- Create: `scripts/dev.js`
- Create: `scripts/test-build.js`

**Interfaces:**
- Consumes: `src/index.css` and `src/*.css`
- Produces: `dist/readwell.css`, `dist/readwell.min.css`, automated build test runner

- [ ] **Step 1: `scripts/build.js` 작성**

```javascript
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');
const entryFile = path.join(srcDir, 'index.css');

const BANNER = `/*!
 * Readwell CSS v0.1.0
 * https://github.com/readwell-css
 * (c) 2026 Readwell Team
 * Released under the MIT License.
 */\n`;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function resolveImports(filePath, seen = new Set()) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const realPath = fs.realpathSync(filePath);
  if (seen.has(realPath)) {
    return '';
  }
  seen.add(realPath);

  const content = fs.readFileSync(filePath, 'utf-8');
  const dir = path.dirname(filePath);

  // Match @import "./foo.css"; or @import "foo.css";
  const importRegex = /@import\s+['"]([^'"]+)['"]\s*;/g;

  return content.replace(importRegex, (match, importPath) => {
    const resolvedPath = path.resolve(dir, importPath);
    return resolveImports(resolvedPath, seen);
  });
}

function minifyCSS(css) {
  return css
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove single-line comments
    .replace(/\/\/.*/g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around symbols
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    // Remove trailing semicolons before closing brace
    .replace(/;}/g, '}')
    .trim();
}

export function build() {
  const startTime = Date.now();
  ensureDir(distDir);

  if (!fs.existsSync(entryFile)) {
    throw new Error(`Entry file not found: ${entryFile}`);
  }

  const bundledCSS = resolveImports(entryFile);
  const fullCSS = BANNER + bundledCSS;
  const minifiedCSS = BANNER + minifyCSS(bundledCSS);

  const fullPath = path.join(distDir, 'readwell.css');
  const minPath = path.join(distDir, 'readwell.min.css');

  fs.writeFileSync(fullPath, fullCSS, 'utf-8');
  fs.writeFileSync(minPath, minifiedCSS, 'utf-8');

  const fullSize = (fs.statSync(fullPath).size / 1024).toFixed(2);
  const minSize = (fs.statSync(minPath).size / 1024).toFixed(2);
  const duration = Date.now() - startTime;

  console.log(`\x1b[32m✔ Build complete in ${duration}ms\x1b[0m`);
  console.log(`  - dist/readwell.css (${fullSize} KB)`);
  console.log(`  - dist/readwell.min.css (${minSize} KB)`);

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
```

- [ ] **Step 2: `scripts/dev.js` 작성**

```javascript
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// 1. Initial build
try {
  build();
} catch (e) {
  console.error('Initial build failed:', e.message);
}

// 2. Watch src/ directory
let debounceTimer;
fs.watch(srcDir, { recursive: true }, (eventType, filename) => {
  if (filename && filename.endsWith('.css')) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log(`\n\x1b[36m[watch]\x1b[0m File changed: ${filename}, rebuilding...`);
      try {
        build();
      } catch (err) {
        console.error('\x1b[31mRebuild error:\x1b[0m', err.message);
      }
    }, 100);
  }
});

// 3. Static server
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') {
    reqPath = '/examples/index.html';
  }

  const filePath = path.join(rootDir, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`404 Not Found: ${reqPath}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n\x1b[32m🚀 Readwell Dev Server running at http://localhost:${PORT}\x1b[0m`);
  console.log(`  - Examples: http://localhost:${PORT}/examples/`);
  console.log(`  - Watching for changes in src/...\n`);
});
```

- [ ] **Step 3: `scripts/test-build.js` 작성 (자동화 검증 스크립트)**

```javascript
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('Running automated build test...');
const { fullPath, minPath } = build();

if (!fs.existsSync(fullPath)) {
  throw new Error(`dist/readwell.css was not created!`);
}
if (!fs.existsSync(minPath)) {
  throw new Error(`dist/readwell.min.css was not created!`);
}

const fullContent = fs.readFileSync(fullPath, 'utf-8');
const minContent = fs.readFileSync(minPath, 'utf-8');

if (!fullContent.includes('@layer tokens, reset, base, layout, elements, components, patterns, utilities, modes;')) {
  throw new Error('Layer declaration missing in bundled CSS');
}

if (!minContent.includes('--rw-paper')) {
  throw new Error('Tokens missing in minified CSS');
}

console.log('\x1b[32m✔ All build tests passed successfully!\x1b[0m');
```

---

### Task 3: 12개 CSS 모듈 및 토큰 스켈레톤 구현 (`src/`)

**Files:**
- Create: `src/index.css`
- Create: `src/tokens.css`
- Create: `src/reset.css`
- Create: `src/base.css`
- Create: `src/typography.css`
- Create: `src/layout.css`
- Create: `src/elements.css`
- Create: `src/forms.css`
- Create: `src/components.css`
- Create: `src/patterns.css`
- Create: `src/navigation.css`
- Create: `src/utilities.css`
- Create: `src/modes.css`

**Interfaces:**
- Consumes: Design System and CSS Architecture specifications
- Produces: Layered modular CSS framework sources in `src/`

- [ ] **Step 1: `src/index.css` 작성**

```css
@layer tokens, reset, base, layout, elements, components, patterns, utilities, modes;

@import "./tokens.css";
@import "./reset.css";
@import "./base.css";
@import "./typography.css";
@import "./layout.css";
@import "./elements.css";
@import "./forms.css";
@import "./components.css";
@import "./patterns.css";
@import "./navigation.css";
@import "./utilities.css";
@import "./modes.css";
```

- [ ] **Step 2: `src/tokens.css` 작성**

```css
@layer tokens {
  :root {
    /* Neutral Surface & Depth */
    --rw-paper: #f5f2ea;
    --rw-paper-2: #fbfaf6;
    --rw-paper-3: #eeeae0;
    --rw-text: #232722;
    --rw-text-muted: #666b65;
    --rw-line: #c8c4ba;
    --rw-line-strong: #969185;
    --rw-focus: #496a8b;

    /* Semantic Matrix (base / soft / strong) */
    --rw-primary: #496a8b;
    --rw-primary-soft: #dfe8f0;
    --rw-primary-strong: #334f6b;

    --rw-secondary: #68736a;
    --rw-secondary-soft: #e3e7e2;
    --rw-secondary-strong: #4d574f;

    --rw-success: #62835b;
    --rw-success-soft: #e4efe0;
    --rw-success-strong: #446340;

    --rw-warning: #b2853f;
    --rw-warning-soft: #f6eddc;
    --rw-warning-strong: #866327;

    --rw-danger: #a36460;
    --rw-danger-soft: #f4e5e4;
    --rw-danger-strong: #7f4a47;

    --rw-info: #61788a;
    --rw-info-soft: #e4ebf0;
    --rw-info-strong: #445968;

    /* Typography & Sizing */
    --rw-font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --rw-font-serif: "Iowan Old Style", "Apple Garamond", "Baskerville", "Times New Roman", "Nanum Myeongjo", serif;
    --rw-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
    --rw-reading-width: 44rem;
    --rw-container-width: 72rem;
    --rw-line-height-body: 1.7;
    --rw-line-height-heading: 1.25;
    --rw-radius: 4px;

    /* Spacing Steps */
    --rw-space-1: 0.25rem;
    --rw-space-2: 0.5rem;
    --rw-space-3: 1rem;
    --rw-space-4: 1.5rem;
    --rw-space-5: 2.5rem;

    /* Density Defaults (comfortable) */
    --rw-density-gap: 1rem;
    --rw-density-row: 2.5rem;
    --rw-density-panel-padding: 1.25rem;
  }
}
```

- [ ] **Step 3: `src/reset.css` 및 `src/base.css` 작성**

```css
/* src/reset.css */
@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body, h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd {
    margin: 0;
  }

  ul[role='list'], ol[role='list'] {
    list-style: none;
  }

  input, button, textarea, select {
    font: inherit;
  }
}

/* src/base.css */
@layer base {
  html {
    background-color: var(--rw-paper);
    color: var(--rw-text);
    font-family: var(--rw-font-sans);
    line-height: var(--rw-line-height-body);
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  body {
    min-height: 100vh;
    padding: 0;
  }

  a {
    color: var(--rw-primary-strong);
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  a:hover {
    color: var(--rw-primary);
  }

  hr {
    border: none;
    border-top: 1px solid var(--rw-line);
    margin: var(--rw-space-4) 0;
  }
}
```

- [ ] **Step 4: `src/typography.css`, `src/layout.css`, `src/elements.css`, `src/forms.css` 작성**

```css
/* src/typography.css */
@layer base {
  h1, h2, h3, h4, h5, h6 {
    color: var(--rw-text);
    font-weight: 700;
    line-height: var(--rw-line-height-heading);
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }

  h1 { font-size: 2.25rem; margin-top: 0; }
  h2 { font-size: 1.75rem; border-bottom: 1px solid var(--rw-line); padding-bottom: 0.3em; }
  h3 { font-size: 1.35rem; }
  h4 { font-size: 1.15rem; }
  p { margin-bottom: 1.2em; }

  blockquote {
    border-left: 3px solid var(--rw-line-strong);
    padding-left: var(--rw-space-3);
    color: var(--rw-text-muted);
    margin: var(--rw-space-4) 0;
    font-style: italic;
  }

  code, pre {
    font-family: var(--rw-font-mono);
    font-size: 0.9em;
  }

  code {
    background-color: var(--rw-paper-2);
    border: 1px solid var(--rw-line);
    padding: 0.15em 0.35em;
    border-radius: var(--rw-radius);
  }

  pre {
    background-color: var(--rw-paper-2);
    border: 1px solid var(--rw-line);
    padding: var(--rw-space-3);
    overflow-x: auto;
    border-radius: var(--rw-radius);
    margin: var(--rw-space-4) 0;
  }
}

/* src/layout.css */
@layer layout {
  .rw-container {
    width: 100%;
    max-width: var(--rw-container-width);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--rw-space-3);
    padding-right: var(--rw-space-3);
  }

  .rw-reading {
    max-width: var(--rw-reading-width);
    line-height: var(--rw-line-height-body);
  }

  .rw-reading-centered {
    max-width: var(--rw-reading-width);
    margin-left: auto;
    margin-right: auto;
  }

  .rw-stack {
    display: flex;
    flex-direction: column;
    gap: var(--rw-density-gap);
  }

  .rw-cluster {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--rw-space-2);
  }

  .rw-grid {
    display: grid;
    gap: var(--rw-density-gap);
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  .rw-grid-2 {
    display: grid;
    gap: var(--rw-density-gap);
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .rw-grid-3 {
    display: grid;
    gap: var(--rw-density-gap);
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .rw-sidebar-layout {
    display: grid;
    gap: var(--rw-space-4);
    grid-template-columns: 1fr 260px;
  }

  .rw-app-shell {
    display: grid;
    gap: var(--rw-space-4);
    grid-template-columns: 240px 1fr 260px;
  }

  @media (max-width: 860px) {
    .rw-sidebar-layout, .rw-app-shell {
      grid-template-columns: 1fr;
    }
  }
}

/* src/elements.css */
@layer elements {
  button, .rw-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    padding: 0.45em 0.9em;
    border-radius: var(--rw-radius);
    border: 1px solid var(--rw-line-strong);
    background-color: var(--rw-paper-2);
    color: var(--rw-text);
    cursor: pointer;
    text-decoration: none;
  }

  button:hover, .rw-button:hover {
    background-color: var(--rw-paper-3);
  }

  .rw-button--primary {
    background-color: var(--rw-primary-soft);
    border-color: var(--rw-primary);
    color: var(--rw-primary-strong);
    font-weight: 600;
  }

  .rw-button--secondary {
    background-color: var(--rw-secondary-soft);
    border-color: var(--rw-secondary);
    color: var(--rw-secondary-strong);
  }

  .rw-button--danger {
    background-color: var(--rw-danger-soft);
    border-color: var(--rw-danger);
    color: var(--rw-danger-strong);
  }

  .rw-button-group {
    display: inline-flex;
  }

  .rw-button-group > button,
  .rw-button-group > .rw-button {
    border-radius: 0;
    margin-left: -1px;
  }

  .rw-button-group > :first-child {
    border-top-left-radius: var(--rw-radius);
    border-bottom-left-radius: var(--rw-radius);
    margin-left: 0;
  }

  .rw-button-group > :last-child {
    border-top-right-radius: var(--rw-radius);
    border-bottom-right-radius: var(--rw-radius);
  }

  input[type="text"], input[type="search"], input[type="email"], select, textarea {
    width: 100%;
    padding: 0.45em 0.7em;
    border: 1px solid var(--rw-line);
    background-color: var(--rw-paper-2);
    color: var(--rw-text);
    border-radius: var(--rw-radius);
  }

  input:focus, select:focus, textarea:focus {
    outline: 2px solid var(--rw-focus);
    outline-offset: 1px;
    border-color: var(--rw-focus);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: var(--rw-space-3) 0;
  }

  th, td {
    padding: 0.55em 0.8em;
    border-bottom: 1px solid var(--rw-line);
    text-align: left;
  }

  th {
    font-weight: 600;
    border-bottom: 2px solid var(--rw-line-strong);
  }

  details.rw-accordion, details {
    border: 1px solid var(--rw-line);
    border-radius: var(--rw-radius);
    padding: var(--rw-space-2) var(--rw-space-3);
    margin-bottom: var(--rw-space-2);
    background-color: var(--rw-paper-2);
  }

  summary {
    font-weight: 600;
    cursor: pointer;
  }

  dialog {
    border: 1px solid var(--rw-line-strong);
    border-radius: var(--rw-radius);
    background-color: var(--rw-paper);
    color: var(--rw-text);
    padding: var(--rw-space-4);
  }
}

/* src/forms.css */
@layer elements {
  input[type="checkbox"], input[type="radio"] {
    accent-color: var(--rw-primary);
    width: 1.1em;
    height: 1.1em;
    vertical-align: middle;
  }

  input[role="switch"] {
    appearance: none;
    width: 2.2em;
    height: 1.2em;
    border: 1px solid var(--rw-line-strong);
    border-radius: 1em;
    background-color: var(--rw-paper-3);
    cursor: pointer;
    position: relative;
    vertical-align: middle;
  }

  input[role="switch"]::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(1.2em - 6px);
    height: calc(1.2em - 6px);
    border-radius: 50%;
    background-color: var(--rw-text-muted);
  }

  input[role="switch"]:checked {
    background-color: var(--rw-primary-soft);
    border-color: var(--rw-primary);
  }

  input[role="switch"]:checked::before {
    left: calc(100% - 1.2em + 4px);
    background-color: var(--rw-primary-strong);
  }
}
```

- [ ] **Step 5: `src/components.css`, `src/patterns.css`, `src/navigation.css`, `src/utilities.css`, `src/modes.css` 작성**

```css
/* src/components.css */
@layer components {
  .rw-card {
    border: 1px solid var(--rw-line);
    border-radius: var(--rw-radius);
    padding: var(--rw-space-3);
    background-color: var(--rw-paper-2);
  }

  .rw-panel {
    border: 1px solid var(--rw-line);
    border-radius: var(--rw-radius);
    padding: var(--rw-density-panel-padding);
    background-color: var(--rw-paper-2);
  }

  .rw-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.15em 0.5em;
    font-size: 0.8em;
    font-weight: 600;
    border-radius: var(--rw-radius);
    border: 1px solid var(--rw-line);
    background-color: var(--rw-paper-3);
    color: var(--rw-text);
  }

  .rw-badge--primary { background: var(--rw-primary-soft); color: var(--rw-primary-strong); border-color: var(--rw-primary); }
  .rw-badge--secondary { background: var(--rw-secondary-soft); color: var(--rw-secondary-strong); border-color: var(--rw-secondary); }
  .rw-badge--success { background: var(--rw-success-soft); color: var(--rw-success-strong); border-color: var(--rw-success); }
  .rw-badge--warning { background: var(--rw-warning-soft); color: var(--rw-warning-strong); border-color: var(--rw-warning); }
  .rw-badge--danger { background: var(--rw-danger-soft); color: var(--rw-danger-strong); border-color: var(--rw-danger); }
  .rw-badge--info { background: var(--rw-info-soft); color: var(--rw-info-strong); border-color: var(--rw-info); }

  .rw-meta {
    font-size: 0.85em;
    color: var(--rw-text-muted);
  }

  .rw-callout {
    border-left: 4px solid var(--rw-line-strong);
    padding: var(--rw-space-3);
    background-color: var(--rw-paper-2);
    border-radius: 0 var(--rw-radius) var(--rw-radius) 0;
    margin: var(--rw-space-3) 0;
  }

  .rw-callout--info { border-left-color: var(--rw-info); background-color: var(--rw-info-soft); color: var(--rw-info-strong); }
  .rw-callout--success { border-left-color: var(--rw-success); background-color: var(--rw-success-soft); color: var(--rw-success-strong); }
  .rw-callout--warning { border-left-color: var(--rw-warning); background-color: var(--rw-warning-soft); color: var(--rw-warning-strong); }
  .rw-callout--danger { border-left-color: var(--rw-danger); background-color: var(--rw-danger-soft); color: var(--rw-danger-strong); }
}

/* src/patterns.css */
@layer patterns {
  .rw-toolbar, .rw-filterbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--rw-space-2);
    padding: var(--rw-space-2) var(--rw-space-3);
    border: 1px solid var(--rw-line);
    border-radius: var(--rw-radius);
    background-color: var(--rw-paper-2);
  }

  .rw-stat {
    border: 1px solid var(--rw-line);
    border-radius: var(--rw-radius);
    padding: var(--rw-space-3);
    background-color: var(--rw-paper-2);
    display: flex;
    flex-direction: column;
    gap: var(--rw-space-1);
  }

  .rw-stat strong {
    font-size: 1.8rem;
    font-weight: 700;
  }

  .rw-status-list, .rw-activity-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .rw-status-list li, .rw-activity-list li {
    padding: 0.5em 0;
    border-bottom: 1px solid var(--rw-line);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rw-status-list li:last-child, .rw-activity-list li:last-child {
    border-bottom: none;
  }
}

/* src/navigation.css */
@layer components {
  .rw-nav {
    display: flex;
    align-items: center;
    gap: var(--rw-space-3);
    padding: var(--rw-space-2) 0;
  }

  .rw-breadcrumb {
    display: flex;
    list-style: none;
    padding: 0;
    margin: var(--rw-space-2) 0;
    font-size: 0.9em;
    gap: 0.5em;
  }

  .rw-breadcrumb li + li::before {
    content: "/";
    color: var(--rw-text-muted);
    margin-right: 0.5em;
  }

  .rw-pagination {
    display: inline-flex;
    gap: 0.25em;
  }

  .rw-pagination a, .rw-pagination span {
    padding: 0.3em 0.6em;
    border: 1px solid var(--rw-line);
    border-radius: var(--rw-radius);
    text-decoration: none;
  }

  .rw-pagination span[aria-current="page"] {
    background-color: var(--rw-primary-soft);
    border-color: var(--rw-primary);
    color: var(--rw-primary-strong);
    font-weight: 600;
  }
}

/* src/utilities.css */
@layer utilities {
  .rw-muted { color: var(--rw-text-muted); }
  .rw-serif { font-family: var(--rw-font-serif); }
  .rw-mono { font-family: var(--rw-font-mono); }
  .rw-border-top { border-top: 1px solid var(--rw-line); }
  .rw-border-bottom { border-bottom: 1px solid var(--rw-line); }
  .rw-inverse {
    background-color: var(--rw-text);
    color: var(--rw-paper);
  }
}

/* src/modes.css */
@layer modes {
  /* Surface modifiers */
  [data-rw-surface="reading"] {
    --rw-line-height-body: 1.75;
  }

  [data-rw-surface="workspace"] {
    --rw-container-width: 80rem;
  }

  [data-rw-surface="dashboard"] {
    --rw-container-width: 84rem;
  }

  [data-rw-surface="dense"] {
    --rw-density-gap: 0.5rem;
    --rw-density-row: 2rem;
    --rw-density-panel-padding: 0.75rem;
  }

  /* Density modifiers */
  [data-rw-density="cozy"] {
    --rw-density-gap: 1.5rem;
    --rw-density-row: 3rem;
    --rw-density-panel-padding: 1.5rem;
  }

  [data-rw-density="compact"] {
    --rw-density-gap: 0.5rem;
    --rw-density-row: 2rem;
    --rw-density-panel-padding: 0.75rem;
  }

  /* E-Ink & Reduced Motion */
  @media (update: slow), (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
  }

  [data-rw-eink="true"], .rw-eink {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
  }
}
```

---

### Task 4: 5종 예제 템플릿 및 허브 페이지 구축 (`examples/`)

**Files:**
- Create: `examples/index.html`
- Create: `examples/article.html`
- Create: `examples/workspace.html`
- Create: `examples/community.html`
- Create: `examples/dashboard.html`
- Create: `examples/issues.html`

**Interfaces:**
- Consumes: `dist/readwell.css`
- Produces: 5 test and demo example pages with navigation hub

- [ ] **Step 1: `examples/index.html` 작성**

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Readwell CSS Examples Hub</title>
  <link rel="stylesheet" href="../dist/readwell.css">
</head>
<body data-rw-surface="workspace">
  <header class="rw-container rw-border-bottom" style="padding-block: 1rem;">
    <nav class="rw-nav">
      <strong>Readwell CSS</strong>
      <span class="rw-meta">v0.1.0 Example Hub</span>
    </nav>
  </header>

  <main class="rw-container rw-stack" style="padding-block: 2rem;">
    <section class="rw-reading">
      <h1>Readwell CSS 예제 허브</h1>
      <p>다양한 사용 목적(Surface)에 맞춘 5종의 표준 예제 템플릿입니다.</p>
    </section>

    <div class="rw-grid-2">
      <div class="rw-card rw-stack">
        <span class="rw-badge rw-badge--primary">Reading Surface</span>
        <h3><a href="article.html">1. Article / Long-form Page</a></h3>
        <p class="rw-meta">긴 글 읽기, 블로그, 지식 공유 아티클을 위한 최적의 가독성 레이아웃.</p>
      </div>

      <div class="rw-card rw-stack">
        <span class="rw-badge rw-badge--info">Workspace Surface</span>
        <h3><a href="workspace.html">2. Workspace / Documentation</a></h3>
        <p class="rw-meta">사이드바, 목차(TOC), 본문 콜아웃이 조화된 협업/문서 도구 레이아웃.</p>
      </div>

      <div class="rw-card rw-stack">
        <span class="rw-badge rw-badge--secondary">Community Surface</span>
        <h3><a href="community.html">3. News & Community</a></h3>
        <p class="rw-meta">뉴스 피드, 토론 스레드, 메타 정보가 정돈된 커뮤니티 레이아웃.</p>
      </div>

      <div class="rw-card rw-stack">
        <span class="rw-badge rw-badge--success">Dashboard Surface</span>
        <h3><a href="dashboard.html">4. Dashboard & Backoffice</a></h3>
        <p class="rw-meta">Stat card, 시스템 상태, 활동 목록, 차분한 지표 판독성 화면.</p>
      </div>

      <div class="rw-card rw-stack">
        <span class="rw-badge rw-badge--warning">Dense Data Surface</span>
        <h3><a href="issues.html">5. Issue Tracker & Dense Table</a></h3>
        <p class="rw-meta">필터바, 밀집 데이터 테이블, 상태 뱃지가 중심이 된 고밀도 업무 화면.</p>
      </div>
    </div>
  </main>
</body>
</html>
```

- [ ] **Step 2: 5종 예제 HTML 페이지 작성 (`article.html`, `workspace.html`, `community.html`, `dashboard.html`, `issues.html`)**

각 파일에 적절한 시맨틱 구조 및 `data-rw-surface`, `data-rw-density` 속성 부여.

---

### Task 5: 전체 빌드 및 검증 (End-to-End Build & Automated Test)

**Files:**
- Test: `scripts/test-build.js`
- Output: `dist/readwell.css`, `dist/readwell.min.css`

- [ ] **Step 1: 빌드 및 테스트 실행**

Run: `node scripts/test-build.js`
Expected: `✔ All build tests passed successfully!`

- [ ] **Step 2: 산출물 파일 크기 및 무결성 확인**

Run: `ls -lh dist/` 또는 `dir dist\`
Expected: `dist/readwell.css` 및 `dist/readwell.min.css` 생성 확인.
