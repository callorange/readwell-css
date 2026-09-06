# Readwell & Sumi 모노레포 통합 및 정식화 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `readwell-css` 저장소를 npm workspaces 기반 대칭 모노레포 구조로 전환하고, `sumi-css`를 완전 독립형(Zero-dependency Standalone) 순수 CSS 프레임워크로 정식 승격 및 패키지화한다.

**Architecture:** 저장소 루트 아래 `packages/readwell-css`와 `packages/sumi-css`를 동등한 위계로 배치한다. 각 패키지는 자체 `package.json`, 순수 Node.js Zero-Dependency 빌더, 테스트 스크립트, 예제를 소유하며, `sumi-css`는 `.sumi-*` 및 `--sumi-*` 독자 네임스페이스와 64종 그래픽 에셋을 패키지 내부에 독립적으로 번들링한다. 루트는 워크스페이스 조율, 통합 개발 서버(`localhost:3000`), GitHub Pages 포털 빌드, 루트 CHANGELOG(Keep a Changelog)를 총괄한다.

**Tech Stack:** Node.js (v18+ ESM), CSS3 (@layer, custom properties, border-image-slice), HTML5 Semantic elements, npm workspaces

**Spec:** `docs/superpowers/specs/2026-09-06-monorepo-readwell-sumi-integration-design.md`

## Global Constraints
- 패키징 모델: npm Workspaces 대칭 모노레포 (`packages/*`)
- 독립성: `sumi-css`는 `readwell-css`에 의존하지 않는 완전 독립형(Standalone) 순수 CSS 프레임워크
- 네임스페이스: `sumi-css`의 모든 클래스는 `.sumi-*`, CSS 변수는 `--sumi-*`를 적용
- 빌드 엔진: 외부 번들러 라이브러리(Rollup, Vite, PostCSS 등) 도입 없이 순수 Node.js 내장 모듈(`fs`, `path`)만 사용하는 Zero-Dependency 빌더 유지
- 문서 위치: `docs/readwell/`, `docs/sumi/`로 도메인별 분리. `guides/`는 기존 위치 보존. `shared/`는 생성하지 않음
- 버전 관리: 루트 `package.json`은 `0.3.0` (`private: true`), `readwell-css`는 `0.2.1`, `sumi-css`는 `0.1.0`
- 인코딩: UTF-8 및 LF 줄바꿈 보존

---

### Task 1: 모노레포 루트 워크스페이스 스캐폴딩

**Files:**
- Modify: `package.json` (Root)
- Create: `packages/` directory

**Interfaces:**
- Consumes: 기존 루트 `package.json`
- Produces: npm workspaces가 활성화된 루트 `package.json` 및 `packages/` 디렉터리

- [ ] **Step 1: 루트 `package.json`을 모노레포 워크스페이스 사양으로 수정**

```json
{
  "name": "readwell-monorepo",
  "version": "0.3.0",
  "private": true,
  "type": "module",
  "description": "저자극·자연주의 웹 타이포그래피 및 순수 CSS 프레임워크 모노레포 (readwell-css & sumi-css)",
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "npm run build --workspaces && node scripts/build-portal.js",
    "build:readwell": "npm run build --workspace=readwell-css",
    "build:sumi": "npm run build --workspace=sumi-css",
    "build:portal": "node scripts/build-portal.js",
    "test": "npm run test --workspaces",
    "dev": "node scripts/dev-server.js"
  },
  "keywords": [
    "css",
    "monorepo",
    "readwell",
    "sumi",
    "typography",
    "e-ink",
    "calligraphy"
  ],
  "author": "Readwell Team",
  "license": "MIT"
}
```

- [ ] **Step 2: `packages/` 디렉터리 생성**

Run: `node -e "fs.mkdirSync('packages', { recursive: true })"`

- [ ] **Step 3: 워크스페이스 인식 여부 검증**

Run: `npm query` 또는 `npm ls`
Expected: 워크스페이스 오류 없이 정상 종료

---

### Task 2: `readwell-css` 패키지 이관 및 독립화

**Files:**
- Create: `packages/readwell-css/package.json`
- Move: `src/` → `packages/readwell-css/src/`
- Move: `dist/` → `packages/readwell-css/dist/`
- Create: `packages/readwell-css/scripts/build.js`
- Create: `packages/readwell-css/scripts/test.js`
- Move: `examples/` (readwell 관련) → `packages/readwell-css/examples/`
- Create: `packages/readwell-css/README.md`

**Interfaces:**
- Consumes: 기존 `src/`, `dist/`, `scripts/build.js`
- Produces: `packages/readwell-css` 독립 실행 단위 (`npm run build --workspace=readwell-css`)

- [ ] **Step 1: `packages/readwell-css/` 디렉터리 구조 생성 및 파일 이동**

`src/`, `dist/`를 `packages/readwell-css/`로 이동.
기존 `examples/` 중 `sumi/`를 제외한 파일들을 `packages/readwell-css/examples/`로 이동.

- [ ] **Step 2: `packages/readwell-css/package.json` 생성**

```json
{
  "name": "readwell-css",
  "version": "0.2.1",
  "type": "module",
  "description": "E-Ink 디스플레이에서 영감을 얻은 긴 글 가독성과 제품 UI를 위한 저자극 순수 CSS 프레임워크",
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
    "LICENSE"
  ],
  "scripts": {
    "build": "node scripts/build.js",
    "test": "node scripts/test.js"
  },
  "keywords": [
    "css",
    "css-framework",
    "e-ink",
    "reading",
    "typography",
    "minimal-ui",
    "zero-dependency",
    "classless-css"
  ],
  "homepage": "https://callorange.github.io/readwell-css/readwell/",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/callorange/readwell-css.git",
    "directory": "packages/readwell-css"
  },
  "license": "MIT"
}
```

- [ ] **Step 3: `packages/readwell-css/scripts/build.js` 및 `scripts/test.js` 구현**

경로 기준을 `packages/readwell-css`로 정렬하고, `npm run build` 및 `npm test`가 정상 작동하도록 설정.

- [ ] **Step 4: 빌드 및 테스트 검증**

Run: `npm run build --workspace=readwell-css`
Run: `npm run test --workspace=readwell-css`
Expected: `packages/readwell-css/dist/readwell.css`와 `readwell.min.css`가 정상 생성되고 테스트 통과

---

### Task 3: `sumi-css` 패키지 스캐폴딩 및 소스 모듈화

**Files:**
- Create: `packages/sumi-css/package.json`
- Create: `packages/sumi-css/src/index.css`
- Create: `packages/sumi-css/src/tokens.css`
- Create: `packages/sumi-css/src/reset.css`
- Create: `packages/sumi-css/src/base.css`
- Create: `packages/sumi-css/src/typography.css`
- Create: `packages/sumi-css/src/layout.css`
- Create: `packages/sumi-css/src/components/callout.css`
- Create: `packages/sumi-css/src/components/chop.css`
- Create: `packages/sumi-css/src/components/progress.css`
- Create: `packages/sumi-css/src/components/slider.css`
- Create: `packages/sumi-css/src/components/spinner.css`
- Create: `packages/sumi-css/src/components/colophon.css`
- Create: `packages/sumi-css/src/components/code.css`
- Create: `packages/sumi-css/src/utilities.css`
- Move: `examples/sumi/assets/*` → `packages/sumi-css/assets/`
- Move: `examples/sumi/index.html` → `packages/sumi-css/examples/index.html`

**Interfaces:**
- Consumes: 기존 `examples/sumi/sumi.css` (3,964라인) 및 `examples/sumi/assets/`
- Produces: 모듈화되고 `.sumi-*`/`--sumi-*`로 리네이밍된 소스 CSS 파일들 및 에셋 디렉터리

- [ ] **Step 1: `packages/sumi-css/package.json` 생성**

```json
{
  "name": "sumi-css",
  "version": "0.1.0",
  "type": "module",
  "description": "동양 전통 서예와 수묵화 미학을 계승한 장문 독서 및 기술 문서 특화 순수 CSS 프레임워크",
  "main": "dist/sumi.css",
  "style": "dist/sumi.css",
  "exports": {
    ".": "./dist/sumi.css",
    "./min": "./dist/sumi.min.css",
    "./assets/*": "./dist/assets/*",
    "./src/*": "./src/*"
  },
  "files": [
    "dist",
    "src",
    "assets",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "build": "node scripts/build.js",
    "test": "node scripts/test.js"
  },
  "keywords": [
    "css",
    "css-framework",
    "sumi",
    "calligraphy",
    "typography",
    "ink-wash",
    "hanji",
    "zero-dependency"
  ],
  "homepage": "https://callorange.github.io/readwell-css/sumi/",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/callorange/readwell-css.git",
    "directory": "packages/sumi-css"
  },
  "license": "MIT"
}
```

- [ ] **Step 2: 64개 에셋을 `packages/sumi-css/assets/`로 이동**

`examples/sumi/assets/*` 전체를 `packages/sumi-css/assets/`로 이동.

- [ ] **Step 3: `sumi.css`를 모듈별로 분할하고 `.sumi-*` 및 `--sumi-*`로 전면 변환**

1. `src/tokens.css`: `--sumi-paper`, `--sumi-ink`, `--sumi-charcoal`, `--sumi-wash`, `--sumi-seal` 등 토큰 및 다크모드.
2. `src/reset.css`: 독립 실행을 위한 기본 리셋(`box-sizing`, `margin: 0` 등).
3. `src/base.css`: `.sumi-hanji-canvas` 및 기본 바디/뷰포트 스타일.
4. `src/typography.css`: `.sumi-dropcap`, 명조/고딕 폰트 스케일, 인용구, 본문 스타일.
5. `src/layout.css`: `.sumi-layout`, `.sumi-sidebar`, `.sumi-content`, `.sumi-aside`.
6. `src/components/callout.css`: `.sumi-callout` 5종 프레임.
7. `src/components/chop.css`: `.sumi-seal-chop` 전각 직인 도장 컴포넌트.
8. `src/components/progress.css`: `.sumi-progress` 갈필 프로그레스.
9. `src/components/slider.css`: `.sumi-slider` 3종 문방사우 슬라이더.
10. `src/components/spinner.css`: `.sumi-spinner` 및 7종 동세.
11. `src/components/colophon.css`: `.sumi-colophon` 발문 서명란.
12. `src/components/code.css`: 문방사우 코드 신택스.
13. `src/utilities.css`: 여백, 정렬 보조 유틸리티.
14. `src/index.css`:
```css
@layer reset, tokens, base, typography, layout, components, utilities;

@import "./reset.css";
@import "./tokens.css";
@import "./base.css";
@import "./typography.css";
@import "./layout.css";
@import "./components/callout.css";
@import "./components/chop.css";
@import "./components/progress.css";
@import "./components/slider.css";
@import "./components/spinner.css";
@import "./components/colophon.css";
@import "./components/code.css";
@import "./utilities.css";
```

- [ ] **Step 4: 예제 HTML(`packages/sumi-css/examples/index.html`) 클래스명/변수명 동기화**

기존 `rw-sumi-*`, `rw-seal-*` 클래스를 정식 `.sumi-*`, `.sumi-seal-*`로 치환하고 CSS 링크를 `../dist/sumi.css`로 연결.

---

### Task 4: `sumi-css` 독립 빌더 및 무결성 테스트 구현

**Files:**
- Create: `packages/sumi-css/scripts/build.js`
- Create: `packages/sumi-css/scripts/test.js`

**Interfaces:**
- Consumes: `packages/sumi-css/src/` 및 `packages/sumi-css/assets/`
- Produces: `packages/sumi-css/dist/sumi.css`, `sumi.min.css`, `.map`, `dist/assets/*`

- [ ] **Step 1: `packages/sumi-css/scripts/build.js` 작성**

- `@import` 순회 결합
- `safeMinifyCSS` 압축
- VLQ 인코딩 Source Map 생성
- `assets/` 내 64개 파일을 `dist/assets/`로 무손실 복사 (`fs.cpSync`)
- 빌드 소요 시간 및 산출물 크기 출력

- [ ] **Step 2: `packages/sumi-css/scripts/test.js` 작성**

- `dist/sumi.css`, `dist/sumi.min.css` 존재 및 크기 검증
- `dist/assets/` 내 핵심 에셋(hanji-bg, spinner, divider 등) 존재 검증
- `dist/sumi.css` 내의 모든 `url(...)` 경로가 `dist/assets/`의 실제 파일과 매칭되는지 정적 검증

- [ ] **Step 3: 빌드 및 테스트 실행 검증**

Run: `npm run build --workspace=sumi-css`
Run: `npm run test --workspace=sumi-css`
Expected: 빌드 완료 및 모든 무결성 테스트 통과

---

### Task 5: 기획 문서(`docs/`) 도메인별 네임스페이스 재배치

**Files:**
- Move: `docs/01_CONCEPT.md` ~ `08_COMPONENT_SCOPE.md`, `Readwell_CSS_Concept_Deck_v2.pptx` → `docs/readwell/`
- Create: `docs/sumi/01_CONCEPT.md` (기존 sumi README 기반 정리)
- Create: `docs/sumi/02_DESIGN_SYSTEM.md`
- Create: `docs/sumi/03_ASSET_INVENTORY.md`
- Create: `docs/sumi/04_DUAL_ENGINE.md`

**Interfaces:**
- Consumes: 기존 `docs/` 내 readwell 기획서 및 `examples/sumi/README.md`
- Produces: 도메인별로 완벽히 분리된 `docs/readwell/` 및 `docs/sumi/`

- [ ] **Step 1: `docs/readwell/` 디렉터리 생성 및 파일 이동**

`docs/` 내의 01~08 번호 파일 및 PPTX를 `docs/readwell/`로 이동.

- [ ] **Step 2: `docs/sumi/` 디렉터리 생성 및 Sumi 기획 문서 정돈**

`examples/sumi/README.md`의 내용을 주제별(컨셉, 디자인시스템, 에셋, 듀얼엔진)로 깔끔하게 분할하여 `docs/sumi/`에 배치.

- [ ] **Step 3: 문서 링크 정합성 확인**

각 문서 간 상호 참조 링크 검증.

---

### Task 6: 모노레포 오케스트레이션 도구 및 포털 구축

**Files:**
- Create: `scripts/build-portal.js`
- Create: `scripts/dev-server.js`
- Create: `scripts/test-all.js`
- Create: `site/index.html` (통합 포털 대문)

**Interfaces:**
- Consumes: `packages/readwell-css/dist`, `packages/sumi-css/dist`
- Produces: 로컬 통합 개발 서버 및 GitHub Pages 배포용 정적 사이트

- [ ] **Step 1: `site/index.html` 통합 포털 대문 페이지 작성**

두 프레임워크의 성격을 직관적으로 보여주는 듀얼 카드 레이아웃:
- 📖 Readwell CSS: E-Ink 클래스리스 프레임워크 소개 및 문서/예제 링크
- 🖌️ Sumi CSS: 동양 서예/수묵 디자인 시스템 소개 및 쇼케이스 링크

- [ ] **Step 2: `scripts/build-portal.js` 구현**

- `packages/readwell-css/dist`, `examples`를 `docs/readwell/` (또는 배포 디렉터리)로 복사
- `packages/sumi-css/dist`, `examples`를 `docs/sumi/`로 복사
- 포털 `index.html` 배치 및 GitHub Pages 호스팅을 위한 상대 경로 검증

- [ ] **Step 3: `scripts/dev-server.js` 구현**

- Node.js 내장 `http` 모듈 기반 초경량 개발 서버
- 포트 3000에서 `/`, `/readwell/`, `/sumi/` 서빙
- 소스 파일 변경 감지 시 해당 패키지만 선택적 핫 리빌드

- [ ] **Step 4: 전체 빌드 및 통합 테스트 검증**

Run: `npm run build`
Run: `npm test`
Expected: 두 패키지 빌드 성공 및 포털 조립 완료

---

### Task 7: README 개편 및 루트 CHANGELOG 동기화

**Files:**
- Modify: `README.md` (루트)
- Create: `packages/readwell-css/README.md`
- Create: `packages/sumi-css/README.md`
- Modify: `CHANGELOG.md` (루트)

**Interfaces:**
- Consumes: 확정된 모노레포 아키텍처 및 각 패키지 명세
- Produces: 완성된 공식 문서 세트 및 Keep a Changelog 표준 릴리즈 노트

- [ ] **Step 1: 루트 `README.md` 작성**

- 모노레포 소개: 저자극·자연주의 웹 타이포그래피 생태계
- 패키지 선택 가이드 (Readwell vs Sumi)
- 빠른 링크: Live Demo, npm 패키지, 문서
- 모노레포 개발/기여 명령어

- [ ] **Step 2: `packages/readwell-css/README.md` 작성**

- Readwell 전용 설치 가이드 (`npm i readwell-css`)
- 4대 제어 속성(`data-rw-*`) 및 시맨틱 컴포넌트 명세

- [ ] **Step 3: `packages/sumi-css/README.md` 작성**

- Sumi 전용 설치 가이드 (`npm i sumi-css`)
- 수묵 계조 체계, 콜아웃 5종, 전각 도장, 스피너 등 API 명세

- [ ] **Step 4: 루트 `CHANGELOG.md`에 `[0.3.0]` 기록**

```markdown
## [0.3.0] - 2026-09-07

### Monorepo
- npm workspaces 기반 대칭 모노레포로 프로젝트 구조 전환 (`packages/*`)
- `docs/` 기획 문서를 `docs/readwell/`, `docs/sumi/`로 도메인별 분리 (`guides/` 유지)
- GitHub Pages 통합 포털 허브 및 멀티 패키지 서빙 파이프라인 구축 (`scripts/build-portal.js`)
- 패키지별 핫 리빌드를 지원하는 통합 로컬 개발 서버 구축 (`scripts/dev-server.js`)

### readwell-css (v0.2.1)
- `packages/readwell-css/`로 독립 패키지 디렉터리 이관
- 패키지 전용 Zero-dependency 빌드 및 테스트 파이프라인 정비

### sumi-css (v0.1.0)
- `sumi-css` 정식 독립 패키지 승격 (Zero-dependency Standalone)
- 클래스 네임스페이스 `.sumi-*` 및 CSS 토큰 `--sumi-*` 전면 개편
- 64종 수묵 그래픽 에셋(화선지 배경, 브러시 디바이더, 전각 도장, 스피너 등) 무손실 패키지 번들링
- 비트맵 및 초경량 차세대 SVG 듀얼 렌더링 엔진 지원
```

- [ ] **Step 5: 최종 검증**

Run: `npm run build`
Run: `npm test`
Expected: 모든 검증 스크립트 성공 및 무결성 확인
