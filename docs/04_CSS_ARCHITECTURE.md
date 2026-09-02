# Readwell CSS 아키텍처

## 1. 기본 방향

Readwell CSS는 완전한 classless CSS가 아니라 **semantic-first + class-friendly CSS framework**로 설계합니다.

- 기본 HTML 요소는 class 없이도 보기 좋게 만든다.
- 레이아웃과 컴포넌트는 명시적 class를 제공한다.
- 기존 프로젝트와의 충돌을 줄이기 위해 `rw-` prefix를 사용한다.
- JavaScript behavior는 core에 포함하지 않는다.
- HTML native element로 가능한 컴포넌트는 native element를 우선한다.
- Reading UI와 Product UI를 하나의 토큰 체계 안에서 다룰 수 있어야 한다.

## 2. Layer 구조

```css
@layer tokens, reset, base, layout, elements, components, patterns, utilities, modes;
```

| Layer | 목적 |
|---|---|
| tokens | CSS custom properties |
| reset | box sizing, margin reset 등 |
| base | HTML element 기본 스타일 |
| layout | container, reading, grid, stack |
| elements | button, input, table, details, dialog, progress 등 |
| components | card, panel, badge, nav, breadcrumb, pagination, tabs 등 |
| patterns | toolbar, filter bar, stat card, status list, activity list |
| utilities | muted, serif, inverse 등 소수 utility |
| modes | eink, reduced-motion, density, theme, surface mode |

## 3. Prefix 규칙

- CSS variable: `--rw-*`
- class: `.rw-*`
- data attribute: `[data-rw-*]`

예시:

```css
--rw-paper
--rw-paper-2
--rw-text
--rw-primary
--rw-success-soft
--rw-danger-strong
--rw-reading-width
--rw-density-gap

.rw-container
.rw-reading
.rw-card
.rw-panel
.rw-stat

[data-rw-eink="true"]
[data-rw-surface="dashboard"]
[data-rw-density="compact"]
```

## 4. Token 구조

### 4.1 Neutral token

```css
--rw-paper
--rw-paper-2
--rw-paper-3
--rw-text
--rw-text-muted
--rw-line
--rw-line-strong
--rw-focus
```

`paper` 계열은 surface depth를 구분하기 위한 용도입니다. 그림자 없이도 문서 배경, 패널 배경, 보조 패널 배경을 나눌 수 있어야 합니다.

### 4.2 Semantic color token 규칙

semantic color는 component 내부에 임의 HEX를 넣지 않고 `tokens` layer의 공통 custom property를 사용합니다.

```css
--rw-{semantic}
--rw-{semantic}-soft
--rw-{semantic}-strong
```

`{semantic}`은 `primary`, `secondary`, `success`, `warning`, `danger`, `info`를 지원합니다.

- base: 기본 accent / border / progress 등 semantic 표현
- soft: 연한 background / selected surface
- strong: soft surface 위 text / 강조 text / 높은 대비 border / 필요 시 filled state

컴포넌트 variant는 의미 이름을 공유합니다. 예를 들어 badge, alert, validation이 각각 서로 다른 green/red를 정의하지 않습니다.

```css
.rw-badge--success {
  background: var(--rw-success-soft);
  color: var(--rw-success-strong);
  border-color: var(--rw-success);
}

.rw-callout--warning {
  background: var(--rw-warning-soft);
  color: var(--rw-warning-strong);
  border-left-color: var(--rw-warning);
}

[aria-invalid="true"] {
  border-color: var(--rw-danger);
}
```

전역 `.rw-green`, `.rw-red` 같은 색 이름 utility는 만들지 않습니다. 색의 물리적 이름보다 의미를 API로 노출합니다.

### 4.3 Density token

```css
--rw-space-1
--rw-space-2
--rw-space-3
--rw-space-4
--rw-space-5
--rw-density-gap
--rw-density-row
--rw-density-panel-padding
```

`cozy / comfortable / compact`는 위 토큰 묶음을 바꾸는 방식으로 구현합니다.

### 4.3 Density tokens

```css
--rw-density-gap: 1rem;
--rw-density-row: 2.5rem;
--rw-density-panel-padding: 1.25rem;
--rw-density-btn-padding: 0.45em 0.9em;
--rw-density-input-padding: 0.45em 0.7em;
--rw-density-table-padding: 0.55em 0.8em;
```

밀도(`cozy` / `comfortable` / `compact`) 모드에 따라 위 토큰들이 유기적으로 변경되어, 테이블 셀 패딩, 버튼/인풋 여백, 그리드 간격이 일괄 조정됩니다.

## 5. 4대 HTML 제어 속성 명세 (`data-rw-*` API)

Readwell CSS는 4종의 `data-rw-*` 속성을 통해 테마 색온도, 화면 표면, 밀도, 전자종이 무모션 모드를 선언적으로 제어합니다:

| 제어 속성 (Attribute) | 옵션 값 (Values) | 기본값 | 시각적 특징 및 역할 |
| :--- | :--- | :--- | :--- |
| **`data-rw-theme`** | `light`, `warm` | `light` | **테마 색온도**: 맑고 정갈한 내추럴 백상지 vs 눈이 편안한 단행본 미색 크림지 |
| **`data-rw-surface`** | `reading`, `workspace`, `dashboard`, `dense` | `reading` | **화면 표면**: 장문 독서 / 문서 협업 / 운영 콘솔 / 고밀도 데이터 테이블 |
| **`data-rw-density`** | `cozy`, `comfortable`, `compact` | `comfortable` | **여백 밀도**: 터치 친화 여유 여백 / 표준 균형 / 압축 데이터 뷰 |
| **`data-rw-eink`** | `true`, `false` | `false` | **전자종이 정적 모드**: 모든 애니메이션 및 전환 효과(`transition: none`) 차단 |

### 마크업 적용 예시

```html
<!-- 블로그 / 기술 문서 (미색지 + 장문 독서 + 여유 밀도) -->
<body data-rw-theme="warm" data-rw-surface="reading" data-rw-density="cozy">

<!-- 고밀도 백오피스 (백상지 + 고밀도 표 + 압축 밀도) -->
<body data-rw-surface="dense" data-rw-density="compact">
```

## 6. Class API 명세

### Layout

| Class | 목적 |
|---|---|
| `.rw-container` | 페이지 기본 폭 |
| `.rw-reading` | 긴 본문 폭 제한 (44rem) |
| `.rw-reading-centered` | 가운데 정렬된 긴 본문 |
| `.rw-stack` | 수직 간격 layout |
| `.rw-cluster` | nav/button group 같은 수평 묶음 |
| `.rw-grid` | 기본 responsive grid |
| `.rw-grid-2` | 2열 grid |
| `.rw-grid-3` | 3열 grid |
| `.rw-sidebar-layout` | 본문 + aside layout |
| `.rw-app-shell` | sidebar + main + aside 제품 레이아웃 |

### Elements & Forms

| Selector / Class | 목적 |
|---|---|
| `button`, `.rw-button` | 기본 버튼 |
| `.rw-button--primary` | 주요 액션 버튼 (Primary soft/strong) |
| `.rw-button--secondary` | 보조 액션 버튼 |
| `.rw-button--danger` | 파괴적 액션 버튼 |
| `.rw-button-group` | 버튼 그룹 (선택 상태 `.is-active`, `aria-pressed="true"`) |
| `input`, `select`, `textarea` | 폼 컨트롤 (밀도 토큰 연동) |
| `[aria-invalid="false"]`, `.is-valid` | 폼 유효(Valid) 성공 상태 (초록색 보더) |
| `[aria-invalid="true"]`, `.is-invalid` | 폼 유효성 오류 상태 (빨간색 보더) |
| `.rw-form-success` | 폼 성공 안내 메시지 |
| `.rw-form-error` | 폼 오류 메시지 |
| `.rw-form-help` | 폼 보조 도움말 |
| `input[type="checkbox"]` | Paper & Ink 커스텀 체크박스 |
| `input[type="radio"]` | 원형 인디케이터 라디오 버튼 |
| `input[role="switch"]` | 토글 스위치 |
| `details.rw-accordion`, `details` | 아코디언 / 디스클로저 |
| `dialog`, `.rw-dialog` | 네이티브 모달 다이얼로그 |
| `table`, `th`, `td` | 선과 여백 중심 데이터 테이블 (밀도 연동) |
| `progress` | 프로그레스 바 |

### Components & Patterns

| Class | 목적 |
|---|---|
| `.rw-card` | 반복 가능한 독립 콘텐츠 단위 (기사, 상품 등) |
| `.rw-panel` | 화면의 구조적 구획 (사이드바, 설정 박스 등) |
| `.rw-callout` | 안내/주의/오류 메시지 박스 |
| `.rw-callout--info/success/warning/danger` | semantic callout variant |
| `.rw-badge` | 태그/상태 라벨 |
| `.rw-badge--primary/secondary/success/warning/danger/info` | 6종 저채도 semantic badge variant |
| `.rw-meta` | 날짜/작성자/읽기 시간 보조 텍스트 |
| `.rw-nav` | 내비게이션 바 |
| `.rw-breadcrumb` | 위치 경로 탐색 |
| `.rw-pagination` | 페이지네이션 |
| `.rw-toc` | 문서 목차 |
| `.rw-tabs` | 탭 인터페이스 (.is-active / aria-selected) |
| `details.rw-dropdown` | Zero-JS 네이티브 드롭다운 |
| `.rw-dropdown-menu`, `.rw-dropdown-item` | 드롭다운 메뉴 및 항목 |
| `.rw-stat` | 통계/지표 카드 |
| `.rw-summary-row` | 요약 바 |
| `.rw-empty` | 엠프티 스테이트 (데이터 없음 안내) |

### Patterns

| Class | 목적 |
|---|---|
| `.rw-toolbar` | action/search/filter toolbar |
| `.rw-filterbar` | dense UI filter row |
| `.rw-stat` | 수치 요약 카드 |
| `.rw-status-list` | 시스템 상태 목록 |
| `.rw-activity-list` | 최근 활동 목록 |
| `.rw-summary-row` | top summary block |
| `.rw-empty` | empty state |

### Utilities

| Class | 목적 |
|---|---|
| `.rw-muted` | 보조 텍스트 |
| `.rw-serif` | 명조 계열 적용 |
| `.rw-inverse` | 흑백 반전 |
| `.rw-border-top` | 상단 구분선 |
| `.rw-border-bottom` | 하단 구분선 |

## 7. Behavior boundary

Readwell은 CSS framework이며 JavaScript component framework가 아닙니다.

| 기능 | Readwell 담당 | 사용자/앱 담당 |
|---|---|---|
| Card | visual style | 데이터 렌더링 |
| Stat card | visual style | 데이터 바인딩 |
| Accordion | `details/summary` style | 복잡한 상태 동기화 |
| Dialog | visual style | open/close 로직 |
| Tabs | selected/active style | tab switching |
| Dropdown | menu style | positioning/state |
| Switch | checkbox visual style | 저장/상태 처리 |
| Toolbar | visual grouping | 검색/필터 동작 |
| Toast | 제외 | 별도 라이브러리 |
| Carousel | 제외 | 별도 라이브러리 |

## 8. HTML 사용 예시

### Reading surface

```html
<main class="rw-container" data-rw-surface="reading" data-rw-density="cozy">
  <article class="rw-reading">
    <p class="rw-meta">2026.08.30 · 읽기 7분</p>
    <h1>읽는 시간이 길수록 조용한 화면이 좋아진다.</h1>
    <p>본문</p>
  </article>
</main>
```

### Workspace surface

```html
<main class="rw-app-shell" data-rw-surface="workspace" data-rw-density="comfortable">
  <aside class="rw-panel">탐색</aside>
  <article class="rw-reading">
    <h1>리드웰 CSS 도입 가이드</h1>
    <div class="rw-callout rw-callout--info">안내</div>
  </article>
  <aside class="rw-panel">목차 / 속성</aside>
</main>
```

### Dashboard surface

```html
<section class="rw-grid rw-grid-3" data-rw-surface="dashboard" data-rw-density="comfortable">
  <div class="rw-stat">
    <p class="rw-meta">총 매출</p>
    <strong>₩128,540,000</strong>
    <span class="rw-badge rw-badge--success">+12.4%</span>
  </div>
</section>
```

## 9. CSS 파일 분리 계획

초기:

```text
readwell.css
```

안정화 후:

```text
src/
├─ tokens.css
├─ reset.css
├─ base.css
├─ typography.css
├─ layout.css
├─ elements.css
├─ forms.css
├─ components.css
├─ patterns.css
├─ navigation.css
├─ utilities.css
└─ modes.css
```

빌드 결과:

```text
dist/readwell.css
dist/readwell.min.css
```

## 10. Browser 지원

MVP 기준:

- 최신 Chrome/Edge/Firefox/Safari
- CSS variables 필수
- CSS cascade layers 사용 여부는 초기 검토 필요
- `dialog`, `details`, `progress`는 native element를 우선하되 브라우저별 차이를 문서화

호환성을 넓히려면 cascade layer 없이도 동작하는 빌드 옵션을 둘 수 있습니다.

## 11. 확장 기능과의 토큰 공유

Chrome Extension은 Readwell CSS의 토큰을 그대로 사용할 수 있어야 합니다.

```js
const theme = {
  paper: '#f5f2ea',
  paper2: '#fbfaf6',
  text: '#232722',
  muted: '#666b65',
  line: '#c8c4ba',
  primary: { base: '#496a8b', soft: '#dfe8f0', strong: '#334f6b' },
  secondary: { base: '#68736a', soft: '#e3e7e2', strong: '#4d574f' },
  success: { base: '#62835b', soft: '#e4efe0', strong: '#446340' },
  warning: { base: '#b2853f', soft: '#f6eddc', strong: '#866327' },
  danger: { base: '#a36460', soft: '#f4e5e4', strong: '#7f4a47' },
  info: { base: '#61788a', soft: '#e4ebf0', strong: '#445968' }
}
```
