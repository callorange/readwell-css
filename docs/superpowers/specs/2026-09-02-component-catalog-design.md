# Readwell CSS 컴포넌트 카탈로그 및 미구현 컴포넌트 보강 디자인 스펙

- **작성일**: 2026-09-02
- **작성자**: AI Pair Programmer
- **상태**: 승인됨 (Approved)

---

## 1. 개요 및 목적 (Overview & Purpose)

Readwell CSS의 5개 페이지 예제 분석을 토대로, 프레임워크의 완성도를 상용 수준으로 끌어올리기 위해 미구현 컴포넌트(Modal Dialog, Accordion 정밀화, Tabs, Dropdown, Empty State, Summary Row, Form Validation, Table Container)를 CSS 모듈에 추가하고, 모든 컴포넌트와 6종 시맨틱 변형을 한 화면에서 체계적으로 탐색/검증할 수 있는 종합 컴포넌트 카탈로그(`examples/components.html`)를 구축합니다.

---

## 2. 컴포넌트 추가 및 스타일 확장 스펙

### 2.1 Native Interactive (`src/elements.css`)
- **Modal Dialog (`dialog`, `.rw-dialog`)**:
  - `dialog::backdrop`: `background-color: rgba(35, 39, 34, 0.45);` (저자극 반투명 어두운 오버레이)
  - `dialog`: 중앙 배치, `max-width: 36rem`, `border: 1px solid var(--rw-line-strong)`, `border-radius: var(--rw-radius)`, `box-shadow: none` (E-Ink 저자극 원칙 준수), `background-color: var(--rw-paper)`
- **Accordion (`details.rw-accordion`, `summary`)**:
  - `summary`: 기본 화살표 마커 정돈, hover 시 텍스트 밑줄/배경 전환
  - `details[open]`: 하단 내용과의 경계선(`border-top: 1px solid var(--rw-line)`) 및 패딩 추가
- **Table Responsive Wrapper (`.rw-table-container`)**:
  - `overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%;`

### 2.2 Styled-only Components (`src/components.css`)
- **Tabs (`.rw-tabs`, `.rw-tab`, `[role="tab"]`, `[aria-selected="true"]`)**:
  - `.rw-tabs`: `display: flex; gap: var(--rw-space-2); border-bottom: 1px solid var(--rw-line);`
  - `.rw-tab`: 기본 버튼/링크 스타일 해제, `padding: 0.5em 1em; border-bottom: 2px solid transparent; text-decoration: none; color: var(--rw-text-muted);`
  - `.rw-tab[aria-selected="true"]`, `.rw-tab.is-active`: `border-bottom-color: var(--rw-primary); color: var(--rw-primary-strong); font-weight: 600;`
- **Dropdown Visual (`.rw-dropdown`, `.rw-dropdown-menu`, `.rw-dropdown-item`)**:
  - `.rw-dropdown`: `position: relative; display: inline-block;`
  - `.rw-dropdown-menu`: `border: 1px solid var(--rw-line-strong); background-color: var(--rw-paper-2); border-radius: var(--rw-radius); padding: var(--rw-space-1) 0; min-width: 160px;`
  - `.rw-dropdown-item`: `display: block; padding: 0.4em 1em; color: var(--rw-text); text-decoration: none;` (hover 시 `var(--rw-paper-3)`)

### 2.3 Form Enhancements (`src/forms.css`)
- **유효성 검사 (Form Validation)**:
  - `[aria-invalid="true"]`, `.is-invalid`: `border-color: var(--rw-danger); outline-color: var(--rw-danger);`
  - `.rw-form-error`: `font-size: 0.85em; color: var(--rw-danger-strong); margin-top: 0.25rem; font-weight: 500;`
  - `.rw-form-help`: `font-size: 0.85em; color: var(--rw-text-muted); margin-top: 0.25rem;`
- **Fieldset & Legend (`fieldset`, `legend`)**:
  - `fieldset`: `border: 1px solid var(--rw-line); border-radius: var(--rw-radius); padding: var(--rw-space-3); margin-bottom: var(--rw-space-3);`
  - `legend`: `font-weight: 600; padding: 0 var(--rw-space-2); color: var(--rw-text);`

### 2.4 Product Patterns (`src/patterns.css`)
- **Empty State (`.rw-empty`)**:
  - `text-align: center; padding: var(--rw-space-5) var(--rw-space-3); border: 1px dashed var(--rw-line-strong); border-radius: var(--rw-radius); background-color: var(--rw-paper-2);`
  - `.rw-empty__title`: `font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;`
  - `.rw-empty__description`: `color: var(--rw-text-muted); margin-bottom: 1.2rem;`
- **Summary Row (`.rw-summary-row`)**:
  - `display: flex; gap: var(--rw-space-4); align-items: center; padding: var(--rw-space-2) var(--rw-space-3); background-color: var(--rw-paper-3); border-radius: var(--rw-radius);`

---

## 3. 종합 컴포넌트 카탈로그 (`examples/components.html`)

전체 컴포넌트 쇼케이스 및 복사 가능한 코드 가이드를 제공하는 키친싱크 허브:
1. **Typography & Layout**: 제목 H1~H6, 본문, 인용구, 코드블록, Stack, Cluster, Grid 2/3.
2. **Color Matrix & Badges**: 6종 Semantic Badge (`primary`, `secondary`, `success`, `warning`, `danger`, `info`).
3. **Buttons & Groups**: Primary, Secondary, Danger, Disabled, Button Group.
4. **Form Controls**: Text input, Email, Search, Textarea, Select, Checkbox, Radio, Switch, Fieldset, Error state.
5. **Display & Feedback**: Card, Panel, 4종 Semantic Callout (`info`, `success`, `warning`, `danger`).
6. **Navigation & Wayfinding**: Nav, Breadcrumb, Pagination, Tabs, Dropdown Visual, TOC.
7. **Native Interactive**: Accordion (`details`), Modal Dialog (`<dialog>` 열기/닫기 데모 스크립트 포함), Progress bar.
8. **Product Patterns**: Toolbar, Filterbar, Stat card, Status list, Activity list, Empty state, Summary row.

---

## 4. 검증 계획 (Verification Plan)

1. `npm run build` 및 `npm test` 자동화 테스트 통과 (번들 및 미니파이 정상 갱신).
2. `examples/components.html`에서 모든 컴포넌트가 디자인 시스템 원칙(저자극, WCAG 대비, 정돈된 선/여백)에 맞게 렌더링되는지 확인.
3. `examples/index.html`에 컴포넌트 카탈로그 링크 추가 및 탐색 연결.
