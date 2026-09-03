# Component Expansion & Refinements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Readwell CSS v0.2.0을 목표로 6대 신규 필수 컴포넌트(`[aria-busy]`, `[data-tooltip]`, `range`, `.rw-sr-only`, `.rw-input-group`, `.rw-avatar`) 추가 및 5대 기존 컴포넌트(`details.rw-accordion`, `table` 수식어, `dropdown--right`, `dialog article`, `pagination [aria-disabled]`) 고도화, 빌드 테스트 강화, 공식 문서 및 예제 포털 전면 동기화를 완수합니다.

**Architecture:** 순수 CSS(Zero JavaScript) 및 W3C ARIA 시맨틱 속성 기반 설계를 유지하며, `@layer` 계층 분리 원칙에 따라 `forms.css`, `elements.css`, `components.css`, `utilities.css`, `navigation.css`에 수술적으로 모듈을 추가합니다.

**Tech Stack:** CSS3 (@layer, CSS Custom Properties, pseudo-elements, CSS animations, flexbox, CSS containment), Node.js build runner (`node:fs`, `node:path`), Vanilla HTML5.

**Spec:** `docs/superpowers/specs/2026-09-03-component-expansion-and-refinements-design.md`

## Global Constraints
- Zero JavaScript for styles and core interactions (No external JS libraries).
- Pure CSS with `@layer` order: tokens, reset, base, layout, elements, components, patterns, navigation, utilities, modes.
- Color and spacing variables must come from `tokens.css` (`--rw-paper*`, `--rw-primary*`, `--rw-line*`, etc.).
- Responsive and accessible (`aria-*`, keyboard focusable, contrast ratio).
- UTF-8 encoding for all files.

---

## Tasks

### Task 1: Forms & Input Enhancements (`src/forms.css`)

**Files:**
- Modify: `src/forms.css`
- Test: `npm test`

**Interfaces:**
- Produces: `<input type="range">`, `.rw-input-group`, `.rw-input-group-addon`, `.rw-input-group-text`

- [x] **Step 1: `src/forms.css`에 `<input type="range">` 미니멀 Paper & Ink 트랙 및 썸 스타일링 추가**
- [x] **Step 2: `src/forms.css`에 `.rw-input-group` 플렉스 래퍼 및 애드온 스타일링 추가**
- [x] **Step 3: `npm run build`를 실행하여 컴파일 및 번들링 오류 없는지 확인**

---

### Task 2: Elements & Interactive Refinements (`src/elements.css`)

**Files:**
- Modify: `src/elements.css`
- Test: `npm test`

**Interfaces:**
- Produces: `button[aria-busy="true"]`, `@keyframes rw-spin`, `details.rw-accordion > summary::after` (smooth chevron), `table.rw-table--striped`, `table.rw-table--hoverable`, `table.rw-table--sticky-header`, `dialog:has(> article)`, `dialog header`, `dialog footer`

- [x] **Step 1: `button[aria-busy="true"]` 및 `@keyframes rw-spin` 회전 스피너 추가**
- [x] **Step 2: `details.rw-accordion`의 기본 삼각형 제거 및 부드러운 쉐브론 화살표(`::after`) 회전 인터랙션 구현**
- [x] **Step 3: 데이터 테이블 수식어(`.rw-table--striped`, `.rw-table--hoverable`, `.rw-table--sticky-header`) 추가**
- [x] **Step 4: `<dialog>` 내부 `<article>`(헤더/본문/푸터) 구조화 스타일 추가 및 하위 호환성 유지**
- [x] **Step 5: `npm run build`로 빌드 확인**

---

### Task 3: Components & Feedback Expansion (`src/components.css`)

**Files:**
- Modify: `src/components.css`
- Test: `npm test`

**Interfaces:**
- Produces: `.rw-spinner` (및 `--sm`, `--lg`), `[data-tooltip]`, `.rw-avatar` (및 `--sm`, `--lg`, `--rounded`), `details.rw-dropdown.rw-dropdown--right`

- [x] **Step 1: 독립 스피너 클래스 `.rw-spinner` 및 사이즈 수식어(`.rw-spinner--sm`, `.rw-spinner--lg`) 추가**
- [x] **Step 2: 순수 CSS 전역 툴팁 `[data-tooltip]` (풍선 도움말 + 아래 화살표 + 부드러운 전환) 추가**
- [x] **Step 3: 아바타 컴포넌트 `.rw-avatar` (이니셜 텍스트/이미지, `--sm`, `--lg`, `--rounded`) 추가**
- [x] **Step 4: 드롭다운 우측 정렬 수식어 `details.rw-dropdown.rw-dropdown--right` 추가**
- [x] **Step 5: `npm run build`로 빌드 확인**

---

### Task 4: Utilities & Navigation Refinements (`src/utilities.css`, `src/navigation.css`)

**Files:**
- Modify: `src/utilities.css`
- Modify: `src/navigation.css`
- Test: `npm test`

**Interfaces:**
- Produces: `.rw-sr-only`, `.rw-visually-hidden`, `.rw-sr-only--focusable`, `.rw-pagination [aria-disabled="true"]`

- [x] **Step 1: `src/utilities.css`에 표준 a11y 숨김 유틸리티 `.rw-sr-only`, `.rw-visually-hidden` 및 포커스 가능 변형 추가**
- [x] **Step 2: `src/navigation.css`의 `.rw-pagination`에 `[aria-disabled="true"]` 비활성화 및 hover 상태 추가**
- [x] **Step 3: `npm run build`로 빌드 확인**

---

### Task 5: Automated Test Suite Updates (`scripts/test-build.js`)

**Files:**
- Modify: `scripts/test-build.js`
- Test: `npm test`

- [x] **Step 1: `scripts/test-build.js`에 신규 추가된 선택자(`aria-busy`, `data-tooltip`, `type="range"`, `rw-input-group`, `rw-avatar`, `rw-sr-only`, `rw-table--striped`) 검증 단언(assertion) 추가**
- [x] **Step 2: `npm test`를 실행하여 모든 정량 테스트 통과 확인**

---

### Task 6: Documentation & Showcase Synchronization

**Files:**
- Modify: `docs/index.html`
- Modify: `examples/components.html`
- Modify: `examples/docs.html` (via `scripts/sync-docs.js`)

- [x] **Step 1: `docs/index.html`에 신규 6종 및 개선 5종 컴포넌트의 쇼케이스 카드, 실물 라이브 프리뷰, 복사 가능한 코드 블록(`pre > code`), 사이드바 내비게이션 링크 추가**
- [x] **Step 2: `examples/components.html` (카탈로그)에 신규 컴포넌트 및 개선 인터랙션 실물 데모 추가**
- [x] **Step 3: `node scripts/sync-docs.js` 실행하여 `examples/docs.html` 자동 동기화**

---

### Task 7: Final Verification, CHANGELOG & Commit/Push

**Files:**
- Modify: `CHANGELOG.md`

- [x] **Step 1: `npm test` 및 `npm run build` 정량 검증**
- [x] **Step 2: `CHANGELOG.md`의 `[Unreleased]`에 신규 기능(Added) 및 개선 사항(Changed) 기록**
- [ ] **Step 3: Git 상태 확인 및 커밋/푸시 완료**
