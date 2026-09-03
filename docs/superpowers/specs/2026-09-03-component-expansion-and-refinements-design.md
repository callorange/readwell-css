# Component Expansion & Refinements Design Spec

**Date:** 2026-09-03  
**Status:** Approved  
**Author:** Antigravity & User  
**Target:** Readwell CSS v0.2.0 (Component Library Expansion & Refinements)

---

## 1. 목적 및 개요 (Goals & Overview)

타 최신 모던 CSS 프레임워크(Pico CSS, Tailwind CSS, Bootstrap)의 장점을 벤치마킹하여, Readwell CSS 고유의 **Paper & Ink 미학(저자극 웜톤 E-Ink 감성)**과 **순수 CSS(Zero-JS, Classless + BEM hybrid)** 철학을 계승하면서 실무 웹 애플리케이션 구축에 필수적인 6가지 신규 컴포넌트 추가 및 5가지 기존 컴포넌트 정밀 개선을 완수합니다.

### 1.1 핵심 가치 및 제약조건
- **Zero JavaScript**: 모든 인터랙션(스피너 회전, 툴팁 표시, 아코디언 쉐브론 회전, 다이얼로그 레이아웃 등)은 순수 CSS만으로 구동.
- **Web Accessibility First**: `aria-busy`, `aria-disabled`, `aria-invalid`, `.rw-sr-only` 등 W3C WAI-ARIA 접근성 표준 준수.
- **E-Ink Paper & Ink Aesthetics**: 기존 디자인 토큰(`--rw-paper`, `--rw-primary`, `--rw-line` 등)과 자연스러운 일관성 유지.
- **Cascade Layer Modularity**: `@layer elements`, `@layer components`, `@layer navigation`, `@layer utilities` 계층 규칙 엄수.

---

## 2. 신규 필수 기본 기능 명세 (New Must-Have Features)

### 2.1 로딩 인디케이터 & 비지 상태 (`[aria-busy="true"]` & `.rw-spinner`)
- **위치**: `src/elements.css`, `src/components.css`
- **목적**: 비동기 데이터 로딩, 폼 제출, 버튼 클릭 대기 상태를 시각적·보조공학적으로 전달.
- **동작 및 스타일**:
  - `button[aria-busy="true"]`, `[role="button"][aria-busy="true"]`:
    - 포인터 상호작용 차단(`pointer-events: none;`, `cursor: progress;`), 불투명도 조절(`opacity: 0.8;`).
    - `::before` 가상 요소를 통해 텍스트 좌측에 0.75s 회전 스피너 렌더링 (`margin-right: 0.5em; width: 0.9em; height: 0.9em; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: rw-spin 0.75s linear infinite;`).
  - 독립 스피너 클래스 `.rw-spinner`:
    - `display: inline-block; width: 1.25em; height: 1.25em; border: 2px solid var(--rw-line-strong); border-top-color: var(--rw-primary); border-radius: 50%; animation: rw-spin 0.75s linear infinite; vertical-align: middle;`
    - 크기 변형: `.rw-spinner--sm` (0.85em), `.rw-spinner--lg` (1.75em).
  - 키프레임 애니메이션: `@keyframes rw-spin { to { transform: rotate(360deg); } }`

### 2.2 순수 CSS 전역 툴팁 (`[data-tooltip]`)
- **위치**: `src/components.css`
- **목적**: 텍스트나 아이콘에 부가 설명을 제공하는 가벼운 툴팁.
- **동작 및 스타일**:
  - `[data-tooltip]` 속성이 있는 모든 요소에 적용:
    - 기본 위치 `position: relative;`.
  - 말풍선 본체(`::before`):
    - `content: attr(data-tooltip); position: absolute; bottom: 100%; left: 50%; transform: translate(-50%, -4px);`
    - `background-color: var(--rw-text); color: var(--rw-paper); padding: 0.25em 0.6em; border-radius: var(--rw-radius); font-size: 0.75rem; font-weight: 400; line-height: 1.4; white-space: nowrap; pointer-events: none; z-index: 100; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);`
    - 기본 상태: `opacity: 0; visibility: hidden; transition: opacity 0.15s ease, transform 0.15s ease;`
  - 말풍선 화살표(`::after`):
    - `content: ""; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); border: 4px solid transparent; border-top-color: var(--rw-text); margin-bottom: -4px; z-index: 100; pointer-events: none;`
    - 기본 상태: `opacity: 0; visibility: hidden; transition: opacity 0.15s ease;`
  - 트리거:
    - `:hover::before`, `:hover::after`, `:focus-visible::before`, `:focus-visible::after` 시 `opacity: 1; visibility: visible; transform: translate(-50%, -8px);`
  - 예외 처리: `[data-tooltip=""]` (빈 문자열)은 툴팁을 표시하지 않음 (`display: none;`).

### 2.3 슬라이더 레인지 컨트롤 (`<input type="range">`)
- **위치**: `src/forms.css`
- **목적**: 독서 글자 크기, 줄 간격, 밝기, 화면 밀도 조절용 슬라이더.
- **동작 및 스타일**:
  - `input[type="range"]`: `appearance: none; -webkit-appearance: none; width: 100%; height: 1.5rem; background: transparent; cursor: pointer; vertical-align: middle;`
  - 트랙 (WebKit & Firefox 공통 규격):
    - 높이 `6px`, 배경 `var(--rw-paper-3)`, 테두리 `1px solid var(--rw-line)`, 둥글기 `3px`.
  - 조절 핸들(Thumb):
    - 크기 `18px * 18px`, 원형(`border-radius: 50%`), 배경 `var(--rw-paper)`, 테두리 `2px solid var(--rw-primary)`.
    - 음영: `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15); transition: transform 0.1s ease, background-color 0.1s ease;`
    - WebKit 트랙 수직 중앙 정렬: `margin-top: -6px;`
  - 상태:
    - Hover: 핸들 배경 `var(--rw-primary-soft)`, 확대 `transform: scale(1.15);`
    - Active: 핸들 배경 `var(--rw-primary);`
    - Focus: `outline: 2px solid var(--rw-focus); outline-offset: 2px;`
    - Disabled: `opacity: 0.45; cursor: not-allowed;`

### 2.4 웹 접근성 숨김 유틸리티 (`.rw-sr-only`, `.rw-visually-hidden`)
- **위치**: `src/utilities.css`
- **목적**: 스크린 리더 등 보조공학기기에는 읽히되 일반 시각적 렌더링에서는 완전히 숨김.
- **코드**:
  ```css
  .rw-sr-only,
  .rw-visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  .rw-sr-only--focusable:focus,
  .rw-sr-only--focusable:focus-visible,
  .rw-visually-hidden--focusable:focus,
  .rw-visually-hidden--focusable:focus-visible {
    position: static !important;
    width: auto !important;
    height: auto !important;
    margin: 0 !important;
    overflow: visible !important;
    clip: auto !important;
    white-space: normal !important;
  }
  ```

### 2.5 인풋 그룹 (`.rw-input-group`)
- **위치**: `src/forms.css`
- **목적**: 입력창 양옆에 단위 기호($, ₩), 고정 프로토콜(https://), 검색 버튼 등을 깔끔하게 결합.
- **동작 및 스타일**:
  - 컨테이너 `.rw-input-group`: `display: flex; align-items: stretch; width: 100%; position: relative;`
  - 자식 요소들의 모서리 라운딩 및 테두리 겹침 처리:
    - 기본: `border-radius: 0; margin-left: -1px;`
    - 첫 번째 자식: `border-top-left-radius: var(--rw-radius); border-bottom-left-radius: var(--rw-radius); margin-left: 0;`
    - 마지막 자식: `border-top-right-radius: var(--rw-radius); border-bottom-right-radius: var(--rw-radius);`
    - 포커스 시: `z-index: 2;` (포커스 링이 인접 테두리에 가려지지 않음).
  - 텍스트/라벨 애드온 `.rw-input-group-addon`, `.rw-input-group-text`:
    - `display: flex; align-items: center; padding: var(--rw-density-input-padding, 0.45em 0.7em); background-color: var(--rw-paper-3); border: 1px solid var(--rw-line); color: var(--rw-text-muted); font-size: 0.9em; white-space: nowrap;`

### 2.6 아바타 컴포넌트 (`.rw-avatar`)
- **위치**: `src/components.css`
- **목적**: 사용자 프로필 이미지, 독서자 이니셜 표기.
- **동작 및 스타일**:
  - 기본 `.rw-avatar`: `display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background-color: var(--rw-paper-3); color: var(--rw-text); font-weight: 600; font-size: 0.95rem; border: 1px solid var(--rw-line); overflow: hidden; vertical-align: middle; flex-shrink: 0; user-select: none;`
  - 이미지 처리: `.rw-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }`
  - 크기 변형:
    - `.rw-avatar--sm`: 크기 `1.85rem`, 폰트 `0.75rem`.
    - `.rw-avatar--lg`: 크기 `3.5rem`, 폰트 `1.25rem`.
  - 모양 변형:
    - `.rw-avatar--rounded`: 라운드 사각 (`border-radius: var(--rw-radius);`).

---

## 3. 기존 컴포넌트 정밀 개선 명세 (Component Refinements)

### 3.1 아코디언 (`details.rw-accordion`) 인터랙션 고도화
- **위치**: `src/elements.css`
- **개선 내용**:
  - 브라우저 기본 투박한 검정 삼각형 마커 제거 (`summary::-webkit-details-marker { display: none; }`, `summary { list-style: none; }`).
  - `details.rw-accordion > summary`: `display: flex; align-items: center; justify-content: space-between;`
  - Paper & Ink 감성의 미니멀 쉐브론 화살표(`::after`) 생성:
    - `content: ""; width: 0.45em; height: 0.45em; border-right: 2px solid var(--rw-text-muted); border-bottom: 2px solid var(--rw-text-muted); transform: rotate(45deg); transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1); margin-left: 0.5em;`
  - `[open]` 상태: `details.rw-accordion[open] > summary::after { transform: rotate(-135deg); border-color: var(--rw-primary); }`

### 3.2 데이터 테이블 (`<table>`) 수식어 확장
- **위치**: `src/elements.css`
- **개선 내용**:
  - 줄무늬 행 (`table.rw-table--striped`):
    - `table.rw-table--striped tbody tr:nth-child(even) { background-color: var(--rw-paper-2); }`
  - 마우스 호버 강조 (`table.rw-table--hoverable`):
    - `table.rw-table--hoverable tbody tr:hover { background-color: var(--rw-paper-3); }`
  - 고정 헤더 (`.rw-table-container.rw-table--sticky-header`, `table.rw-table--sticky-header`):
    - `max-height: 20rem; overflow-y: auto;`
    - `th { position: sticky; top: 0; background-color: var(--rw-paper); z-index: 2; box-shadow: 0 1px 0 var(--rw-line-strong); }`

### 3.3 드롭다운 우측 정렬 (`.rw-dropdown--right`)
- **위치**: `src/components.css`
- **개선 내용**:
  - 화면 우측 끝 버튼이나 내비게이션 바 우측에 배치 시 뷰포트 밖으로 잘리지 않도록 우측 기준 정렬:
  - `details.rw-dropdown.rw-dropdown--right .rw-dropdown-menu { left: auto; right: 0; }`

### 3.4 모달 다이얼로그 (`<dialog>`) 내부 구조화
- **위치**: `src/elements.css`
- **개선 내용**:
  - `<dialog>` 내부에 `<article>`(헤더/본문/푸터) 구조를 배치했을 때 자연스러운 카드형 모달 레이아웃 지원:
  - `dialog:has(> article), .rw-dialog:has(> article) { padding: 0; overflow: hidden; }`
  - `dialog > article, .rw-dialog > article { padding: var(--rw-space-4); margin: 0; border: none; background: transparent; }`
  - `dialog header, .rw-dialog header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--rw-line); padding-bottom: var(--rw-space-2); margin-bottom: var(--rw-space-3); }`
  - `dialog footer, .rw-dialog footer { display: flex; align-items: center; justify-content: flex-end; gap: var(--rw-space-2); border-top: 1px solid var(--rw-line); padding-top: var(--rw-space-3); margin-top: var(--rw-space-3); }`
  - 단일 텍스트 다이얼로그의 하위 호환성 완벽 유지 (`dialog:not(:has(> article)) { padding: var(--rw-space-4); }`).

### 3.5 페이지네이션 (`.rw-pagination`) 상태 및 버튼 지원
- **위치**: `src/navigation.css`
- **개선 내용**:
  - `[aria-disabled="true"]` 및 `.is-disabled`:
    - `opacity: 0.45; pointer-events: none; cursor: not-allowed; background-color: var(--rw-paper-3);`
  - 비활성화가 아닌 링크 호버:
    - `.rw-pagination a:hover:not([aria-disabled="true"]) { background-color: var(--rw-paper-3); border-color: var(--rw-line-strong); }`
  - `.rw-pagination-prev`, `.rw-pagination-next` 가독성 강화.

---

## 4. 문서 및 예제 포털 반영 계획

1. **`docs/index.html` (공식 문서 포털)**:
   - 신규 기능 섹션 및 개별 카드 추가:
     - `components`: Loading Indicator & Spinner (`[aria-busy="true"]`, `.rw-spinner`), Tooltip (`[data-tooltip]`), Avatar (`.rw-avatar`).
     - `forms`: Slider / Range (`<input type="range">`), Input Group (`.rw-input-group`).
     - `content` / `elements`: Table Modifiers (`.rw-table--striped`, `.rw-table--hoverable`, `.rw-table--sticky-header`), Accordion with Chevron (`details.rw-accordion`).
     - `utilities`: Visually Hidden / Screen Reader Only (`.rw-sr-only`).
     - `navigation`: Pagination Disabled State (`[aria-disabled="true"]`).
   - 복사 가능한 실물 코드 블록(`pre > code`)과 라이브 프리뷰 연동.
2. **`examples/docs.html`**:
   - `node scripts/sync-docs.js`를 통해 `docs/index.html`과 완벽 동기화.
3. **`examples/components.html` (컴포넌트 카탈로그 쇼케이스)**:
   - 신규 및 개선된 모든 컴포넌트의 실물 인터랙티브 데모 추가.

---

## 5. 정량적 검증 계획 (Validation Plan)

1. **빌드 무결성 검증**:
   - `npm run build` 실행: `dist/readwell.css` 및 `dist/readwell.min.css` 정상 빌드 여부.
2. **자동화 테스트 검증**:
   - `npm test` 실행: 번들 및 미니파이드 CSS에 신규 토큰 및 선택자 포함 여부 검증.
   - `scripts/test-build.js`에 신규 주요 선택자(`aria-busy`, `data-tooltip`, `rw-input-group`, `rw-avatar`) 포함 여부 정량 테스트 추가.
3. **문서 동기화 검증**:
   - `node scripts/sync-docs.js` 실행 및 정합성 검사.
4. **시각 및 브라우저 인터랙션 검증**:
   - Chrome 등 브라우저 환경에서 툴팁 표시, 쉐브론 회전, 스피너 회전, 슬라이더 드래그 등 동작 확인.
