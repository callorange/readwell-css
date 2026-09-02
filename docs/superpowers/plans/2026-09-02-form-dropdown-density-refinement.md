# Form Validation, Dropdown, Mode Switcher Tooltip/Jitter Fix & Density System Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Form Validation 성공(`valid`) 상태 추가, Dropdown 연결 간격 버그 수정, Mode Switcher 툴팁 및 힌트 바 덜컹거림(Jitter) 해결, Surface/Density 시스템 실질 체감 연동, GitHub 리포지토리 링크 수정을 일괄 적용합니다.

**Spec:** `docs/superpowers/specs/2026-09-02-form-dropdown-density-refinement-design.md`

**Architecture:**
- **CSS Core (`src/forms.css`, `src/components.css`, `src/tables.css`, `src/elements.css`, `src/modes.css`, `src/tokens.css`)**: 토큰 확장 및 컴포넌트 실질 연동.
- **Widget Layer (`examples/switcher.js`, `examples/switcher.css`)**: Pure CSS 툴팁 및 힌트 바 고정 높이 적용.
- **Demo & Docs (`examples/components.html`, `examples/index.html`, `scripts/build.js`, `package.json`, `CHANGELOG.md`)**: 쇼케이스 갱신 및 링크 수정.

---

## Global Constraints
- **Zero Core Pollution**: CSS 변수 및 시맨틱 HTML5 표준 준수.
- **Pure Readwell Token Styling**: 외부 라이브러리 없이 순수 CSS 토큰 기반.
- **UTF-8 인코딩**: 모든 입출력에 UTF-8 적용.

---

## Tasks

### Task 1: Form Validation 성공(`valid`) 상태 스타일 추가

**Files:**
- Modify: `src/forms.css`
- Modify: `examples/components.html`

- [ ] **Step 1: `src/forms.css`에 유효 상태 및 `.rw-form-success` 추가**
  ```css
  /* Validation States - Success / Valid */
  input[aria-invalid="false"],
  select[aria-invalid="false"],
  textarea[aria-invalid="false"],
  .is-valid {
    border-color: var(--rw-success) !important;
  }

  .rw-form-success {
    font-size: 0.85em;
    color: var(--rw-success-strong);
    margin-top: 0.25rem;
    font-weight: 500;
    display: block;
  }
  ```

- [ ] **Step 2: `examples/components.html` 폼 쇼케이스에 Valid 상태 데모 필드 추가**

---

### Task 2: Dropdown 연결 간격 및 열림 스타일 개선

**Files:**
- Modify: `src/components.css`

- [ ] **Step 1: 이중 간격 제거 및 4px 위치 밀착**
  ```css
  details.rw-dropdown .rw-dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    margin: 0;
    z-index: 50;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  details.rw-dropdown[open] > summary.rw-button {
    border-color: var(--rw-primary);
  }
  ```

---

### Task 3: Mode Switcher `ⓘ` 툴팁 및 힌트 바 레이아웃 시프트(Jitter) 수정

**Files:**
- Modify: `examples/switcher.js`
- Modify: `examples/switcher.css`

- [ ] **Step 1: `examples/switcher.js`에 `data-tooltip` 및 `tabindex="0"` 추가**
- [ ] **Step 2: `examples/switcher.css`에 Pure CSS `::after` 툴팁 스타일 추가**
  ```css
  .rw-switcher-info-badge {
    position: relative;
    cursor: help;
  }
  .rw-switcher-info-badge::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background-color: var(--rw-paper-2);
    color: var(--rw-text);
    border: 1px solid var(--rw-line-strong);
    padding: 0.3rem 0.5rem;
    font-size: 0.72rem;
    border-radius: var(--rw-radius);
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.12s ease, transform 0.12s ease, visibility 0.12s;
    z-index: 1000;
  }
  .rw-switcher-info-badge:hover::after,
  .rw-switcher-info-badge:focus::after {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
  ```
- [ ] **Step 3: `examples/switcher.css`의 `.rw-switcher-hint`에 고정 높이 부여하여 Jitter 제거**
  ```css
  .rw-switcher-hint {
    height: 3.2rem;
    min-height: 3.2rem;
    max-height: 3.2rem;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
  }
  ```

---

### Task 4: Surface Family & Density System 실질 시각 체감 강화

**Files:**
- Modify: `src/tokens.css`
- Modify: `src/modes.css`
- Modify: `src/tables.css`
- Modify: `src/elements.css`

- [ ] **Step 1: `src/tokens.css` 및 `src/modes.css`에 Density별 테이블/버튼 패딩 토큰 정의**
  - `--rw-density-table-pad`: `0.85rem 1rem` (cozy) / `0.55rem 0.85rem` (comfortable) / `0.35rem 0.55rem` (compact)
  - `--rw-density-btn-pad`: `0.65em 1.25em` (cozy) / `0.5em 1em` (comfortable) / `0.32em 0.7em` (compact)
- [ ] **Step 2: `src/tables.css`의 `th, td` 및 `src/elements.css`의 `.rw-button`에 density 토큰 연결**

---

### Task 5: GitHub 리포지토리 링크 수정

**Files:**
- Modify: `examples/index.html`
- Modify: `scripts/build.js`
- Modify: `package.json`

- [ ] **Step 1: `https://github.com/callorange/readwell-css`로 링크 교체**

---

### Task 6: 정량 검증 및 CHANGELOG 동기화

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: `npm test` 및 `npm run build` 실행**
- [ ] **Step 2: `CHANGELOG.md` 갱신**
