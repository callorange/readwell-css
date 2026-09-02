# Readwell CSS 초기 설정 및 기반 아키텍처 디자인 스펙

- **작성일**: 2026-09-02
- **작성자**: AI Pair Programmer
- **상태**: 승인됨 (Approved)

---

## 1. 개요 및 목적 (Overview & Purpose)

Readwell CSS는 긴 글의 가독성과 제품 UI에 필요한 구조적 명확성을 함께 제공하는 저자극 순수 CSS 프레임워크입니다.
본 스펙 문서는 프로젝트의 최초 설정 단계로서, 외부 npm 패키지 의존성 없이(Zero Dependency) 신속하고 안정적으로 프레임워크를 개발/빌드/테스트할 수 있는 디렉터리 구조, 빌드 툴체인, 패키지 설정 및 기본 CSS 모듈 스켈레톤을 정의합니다.

---

## 2. 디렉터리 및 파일 구조 (Directory Structure)

```text
readwell-css/
├── .editorconfig              # 코딩 컨벤션 (UTF-8, 2 spaces, lf)
├── .gitignore                 # node_modules, dist, 캐시 파일 제외
├── package.json               # 패키지 메타데이터 및 zero-dependency npm scripts
├── README.md                  # 프로젝트 소개, 빠른 시작, 설계 링크
├── CHANGELOG.md               # Keep a Changelog v1.1.0 기반 이력 관리
├── scripts/
│   ├── build.js               # CSS 모듈 병합 및 경량 압축 빌드 스크립트
│   └── dev.js                 # 변경 감지(watch) 및 정적 프리뷰 HTTP 서버
├── src/                       # 12개 모듈형 CSS 소스
│   ├── index.css              # @layer 정의 및 전체 모듈 import 엔트리
│   ├── tokens.css             # 중립/시맨틱/간격 CSS 변수 (--rw-*)
│   ├── reset.css              # 박스 사이징 및 기본 마진 리셋
│   ├── base.css               # 기본 HTML 요소 스타일
│   ├── typography.css         # 타이포그래피 스케일, 본문 폭, 행간
│   ├── layout.css             # .rw-container, .rw-reading, .rw-grid 등
│   ├── elements.css           # 버튼, 폼 기본, 테이블, native 태그
│   ├── forms.css              # checkbox, radio, switch 등
│   ├── components.css         # card, panel, badge, meta, callout 등
│   ├── patterns.css           # toolbar, stat card, status list 등
│   ├── navigation.css         # nav, breadcrumb, pagination, toc
│   ├── utilities.css          # .rw-muted, .rw-serif, .rw-inverse 등
│   └── modes.css              # eink, reduced-motion, surface/density modes
├── dist/                      # 빌드 산출물 (gitignore 등록)
│   ├── readwell.css           # 개발/디버깅용 단일 번들 CSS
│   └── readwell.min.css       # 배포/프로덕션용 압축 CSS
├── examples/                  # 5종 실사용 예제 템플릿
│   ├── index.html             # 예제 탐색 메인 허브
│   ├── article.html           # 1. Reading Surface
│   ├── workspace.html         # 2. Workspace Surface
│   ├── community.html         # 3. Community / News Surface
│   ├── dashboard.html         # 4. Dashboard Surface
│   └── issues.html            # 5. Dense Data Surface
└── docs/                      # 기존 설계 및 기획 문서
```

---

## 3. 설정 및 도구 사양 (Configuration & Tooling)

### 3.1 Git 및 저장소 설정
- `git init` 명령으로 Git 저장소 초기화.
- `.gitignore`: `node_modules/`, `dist/`, `.DS_Store`, `Thumbs.db`, `.vscode/`, `.idea/`, `npm-debug.log*` 등 정의.
- `.editorconfig`: `indent_style = space`, `indent_size = 2`, `charset = utf-8`, `end_of_line = lf`, `insert_final_newline = true`.

### 3.2 `package.json`
- `"name": "readwell-css"` (또는 `@readwell/css`), `"version": "0.1.0"`
- `"main": "dist/readwell.css"`, `"style": "dist/readwell.css"`
- `"exports": { ".": "./dist/readwell.css", "./min": "./dist/readwell.min.css" }`
- Scripts:
  - `"build": "node scripts/build.js"`
  - `"dev": "node scripts/dev.js"`
  - `"start": "node scripts/dev.js"`

### 3.3 빌드 스크립트 (`scripts/build.js`)
- Node.js 표준 모듈(`node:fs`, `node:path`)만 사용.
- `src/index.css`를 파싱하여 `@import "./<module>.css";` 구문을 순서대로 결합.
- `dist/readwell.css` 생성: 가독성이 유지된 주석 및 레이어 포맷.
- `dist/readwell.min.css` 생성: 주석 제거, 공백 압축, 줄바꿈 제거 최적화.
- 출력: 빌드 성공 메시지 및 파일 크기 리포트.

### 3.4 개발 서버 스크립트 (`scripts/dev.js`)
- `node:http`, `node:fs`, `node:path` 기반 가벼운 정적 웹서버 (`http://localhost:3000`).
- `src/` 디렉터리 파일 변경 감지(`fs.watch`) 시 자동 `build.js` 트리거.

---

## 4. CSS 아키텍처 및 토큰 사양 (CSS Architecture)

### 4.1 `@layer` 순서
```css
@layer tokens, reset, base, layout, elements, components, patterns, utilities, modes;
```

### 4.2 기본 토큰 정의 (`src/tokens.css`)
- **중립 토큰 (Neutral)**:
  - `--rw-paper: #f5f2ea;`
  - `--rw-paper-2: #fbfaf6;`
  - `--rw-paper-3: #eeeae0;`
  - `--rw-text: #232722;`
  - `--rw-text-muted: #666b65;`
  - `--rw-line: #c8c4ba;`
  - `--rw-line-strong: #969185;`
  - `--rw-focus: #496a8b;`
  - `--rw-font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;`
  - `--rw-font-serif: "Iowan Old Style", "Apple Garamond", "Baskerville", "Times New Roman", "Nanum Myeongjo", serif;`
  - `--rw-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;`
  - `--rw-reading-width: 44rem;`
  - `--rw-line-height-body: 1.7;`
  - `--rw-radius: 4px;`

- **시맨틱 토큰 (Semantic Color Matrix)**:
  - `primary`: base `#496a8b`, soft `#dfe8f0`, strong `#334f6b`
  - `secondary`: base `#68736a`, soft `#e3e7e2`, strong `#4d574f`
  - `success`: base `#62835b`, soft `#e4efe0`, strong `#446340`
  - `warning`: base `#b2853f`, soft `#f6eddc`, strong `#866327`
  - `danger`: base `#a36460`, soft `#f4e5e4`, strong `#7f4a47`
  - `info`: base `#61788a`, soft `#e4ebf0`, strong `#445968`

- **간격 및 밀도 (Spacing & Density)**:
  - `--rw-space-1: 0.25rem;`, `--rw-space-2: 0.5rem;`, `--rw-space-3: 1rem;`, `--rw-space-4: 1.5rem;`, `--rw-space-5: 2.5rem;`
  - Density 변수: `--rw-density-gap`, `--rw-density-row`, `--rw-density-panel-padding`

### 4.3 모드 및 환경 대응 (`src/modes.css`)
- **Surface**: `[data-rw-surface="reading"]`, `[data-rw-surface="workspace"]`, `[data-rw-surface="dashboard"]`, `[data-rw-surface="dense"]`
- **Density**: `[data-rw-density="cozy"]`, `[data-rw-density="comfortable"]`, `[data-rw-density="compact"]`
- **E-Ink / Low-Motion**: `[data-rw-eink="true"]`, `@media (update: slow)`, `@media (prefers-reduced-motion: reduce)` -> shadow, animation, transition 비활성화.

---

## 5. 검증 및 품질 기준 (Verification & Quality Criteria)

1. `node scripts/build.js` 실행 시 에러 없이 `dist/readwell.css`와 `dist/readwell.min.css`가 생성되는지 검증.
2. `examples/index.html`을 브라우저에서 열었을 때 `dist/readwell.css`가 링크되어 정상 렌더링되는지 검증.
3. 모든 파일이 UTF-8 인코딩 및 LF 줄바꿈을 준수하는지 검증.
