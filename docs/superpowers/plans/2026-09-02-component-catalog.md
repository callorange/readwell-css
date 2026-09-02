# Readwell CSS 컴포넌트 카탈로그 및 미구현 컴포넌트 보강 구현 계획 (Implementation Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modal Dialog, Accordion 정밀화, Tabs, Dropdown, Empty State, Form Validation 등 미구현 컴포넌트를 CSS 모듈에 추가하고, 전체 컴포넌트를 한눈에 볼 수 있는 종합 키친싱크 카탈로그(`examples/components.html`) 구축.

**Architecture:** 기존 12개 CSS 모듈 확장(`elements.css`, `forms.css`, `components.css`, `patterns.css`), 번들러 자동 갱신(`dist/`), 신규 예제 카탈로그(`examples/components.html`).

**Tech Stack:** CSS3, HTML5 Semantics, Node.js zero-dependency build script.

**Spec:** `docs/superpowers/specs/2026-09-02-component-catalog-design.md`

## Global Constraints

- 외부 JS 패키지 의존성 없이 순수 CSS3 및 HTML5 네이티브 요소 중심으로 스타일링.
- 모든 클래스는 `.rw-*`, 변수는 `--rw-*`, 데이터 속성은 `[data-rw-*]` 접두사 유지.
- 과도한 그림자/애니메이션을 배제하고 E-Ink 저자극 및 선/여백 위주의 디자인 철학 준수.

---

### Task 1: Native Interactive, Table Container 및 Form Enhancement CSS 구현

**Files:**
- Modify: `src/elements.css`
- Modify: `src/forms.css`

- [ ] **Step 1: `src/elements.css`에 Dialog, Accordion 정밀 스타일, Table Container 추가**

```css
/* Update src/elements.css */
@layer elements {
  /* Dialog & Modal */
  dialog, .rw-dialog {
    border: 1px solid var(--rw-line-strong);
    border-radius: var(--rw-radius);
    background-color: var(--rw-paper);
    color: var(--rw-text);
    padding: var(--rw-space-4);
    max-width: 36rem;
    width: 90%;
    margin: auto;
  }

  dialog::backdrop {
    background-color: rgba(35, 39, 34, 0.45);
  }

  /* Accordion details/summary */
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
    user-select: none;
  }

  summary:hover {
    color: var(--rw-primary-strong);
  }

  details[open] > summary {
    margin-bottom: var(--rw-space-2);
    border-bottom: 1px solid var(--rw-line);
    padding-bottom: var(--rw-space-1);
  }

  /* Responsive Table Container */
  .rw-table-container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: var(--rw-space-3) 0;
  }
}
```

- [ ] **Step 2: `src/forms.css`에 Form Validation 및 Fieldset 추가**

```css
/* Update src/forms.css */
@layer elements {
  /* Validation States */
  input[aria-invalid="true"],
  select[aria-invalid="true"],
  textarea[aria-invalid="true"],
  .is-invalid {
    border-color: var(--rw-danger) !important;
    outline-color: var(--rw-danger) !important;
  }

  .rw-form-error {
    font-size: 0.85em;
    color: var(--rw-danger-strong);
    margin-top: 0.25rem;
    font-weight: 500;
    display: block;
  }

  .rw-form-help {
    font-size: 0.85em;
    color: var(--rw-text-muted);
    margin-top: 0.25rem;
    display: block;
  }

  /* Fieldset & Legend */
  fieldset {
    border: 1px solid var(--rw-line);
    border-radius: var(--rw-radius);
    padding: var(--rw-space-3);
    margin: 0 0 var(--rw-space-3) 0;
    background-color: var(--rw-paper-2);
  }

  legend {
    font-weight: 600;
    padding: 0 var(--rw-space-2);
    color: var(--rw-text);
  }
}
```

- [ ] **Step 3: 빌드 및 테스트 확인**

Run: `node scripts/build.js`

---

### Task 2: Styled-only Components (Tabs, Dropdown) 및 Product Patterns (Empty State, Summary Row) 구현

**Files:**
- Modify: `src/components.css`
- Modify: `src/patterns.css`

- [ ] **Step 1: `src/components.css`에 Tabs 및 Dropdown 스타일 추가**

```css
/* Update src/components.css */
@layer components {
  /* Tabs */
  .rw-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--rw-space-2);
    border-bottom: 1px solid var(--rw-line);
    padding: 0;
    margin: 0 0 var(--rw-space-3) 0;
    list-style: none;
  }

  .rw-tab, [role="tab"] {
    display: inline-flex;
    align-items: center;
    padding: 0.5em 1em;
    border: none;
    background: transparent;
    color: var(--rw-text-muted);
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
  }

  .rw-tab:hover, [role="tab"]:hover {
    color: var(--rw-text);
  }

  .rw-tab[aria-selected="true"],
  .rw-tab.is-active,
  [role="tab"][aria-selected="true"] {
    color: var(--rw-primary-strong);
    border-bottom-color: var(--rw-primary);
    font-weight: 600;
  }

  /* Dropdown Visual */
  .rw-dropdown {
    position: relative;
    display: inline-block;
  }

  .rw-dropdown-menu {
    border: 1px solid var(--rw-line-strong);
    background-color: var(--rw-paper-2);
    border-radius: var(--rw-radius);
    padding: var(--rw-space-1) 0;
    min-width: 180px;
    list-style: none;
    margin: var(--rw-space-1) 0 0 0;
  }

  .rw-dropdown-item {
    display: block;
    padding: 0.45em 1em;
    color: var(--rw-text);
    text-decoration: none;
    font-size: 0.9em;
  }

  .rw-dropdown-item:hover {
    background-color: var(--rw-paper-3);
    color: var(--rw-primary-strong);
  }

  .rw-dropdown-divider {
    height: 1px;
    background-color: var(--rw-line);
    margin: var(--rw-space-1) 0;
  }
}
```

- [ ] **Step 2: `src/patterns.css`에 Empty State 및 Summary Row 추가**

```css
/* Update src/patterns.css */
@layer patterns {
  /* Empty State */
  .rw-empty {
    text-align: center;
    padding: var(--rw-space-5) var(--rw-space-3);
    border: 1px dashed var(--rw-line-strong);
    border-radius: var(--rw-radius);
    background-color: var(--rw-paper-2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: var(--rw-space-3) 0;
  }

  .rw-empty__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
    color: var(--rw-text);
  }

  .rw-empty__description {
    color: var(--rw-text-muted);
    font-size: 0.9em;
    max-width: 32rem;
    margin-bottom: 1.2rem;
  }

  /* Summary Row */
  .rw-summary-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--rw-space-4);
    align-items: center;
    padding: var(--rw-space-2) var(--rw-space-3);
    background-color: var(--rw-paper-3);
    border-radius: var(--rw-radius);
    border: 1px solid var(--rw-line);
    font-size: 0.9em;
  }

  .rw-summary-row strong {
    color: var(--rw-text);
  }
}
```

- [ ] **Step 3: 빌드 및 테스트 확인**

Run: `node scripts/build.js`

---

### Task 3: 종합 컴포넌트 카탈로그 구축 및 허브 연동

**Files:**
- Create: `examples/components.html`
- Modify: `examples/index.html`

- [ ] **Step 1: `examples/components.html` 작성**

모든 컴포넌트와 6종 시맨틱 변형, 네이티브 다이얼로그 인터랙션 데모가 포함된 종합 쇼케이스 페이지 작성.

- [ ] **Step 2: `examples/index.html`에 컴포넌트 카탈로그 링크 카드 추가**

- [ ] **Step 3: 전체 빌드 및 테스트 실행**

Run: `npm test`

---

### Task 4: 최종 빌드 및 검증 (Rebuild & Automated Verification)

**Files:**
- Output: `dist/readwell.css`, `dist/readwell.min.css`

- [ ] **Step 1: 전체 빌드 및 테스트**

Run: `npm run build; npm test`
Expected: PASS with 0 errors.
