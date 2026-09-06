# Readwell CSS 컴포넌트 범위

## 1. 기본 판단

Readwell CSS는 현대 CSS 프레임워크처럼 실제 웹서비스 제작에 필요한 기본 컴포넌트를 제공해야 합니다. 다만 Bootstrap처럼 JavaScript behavior를 포함하는 UI 라이브러리가 되지는 않습니다.

정리하면 다음 방향입니다.

> Pico CSS 정도의 기본 UI 커버리지를 확보하고, 문서형 workspace와 dashboard/backoffice에 필요한 구조 컴포넌트를 추가하되, 복잡한 JavaScript 기반 위젯과 과도한 애니메이션은 제공하지 않는다.

## 2. 지원 기준

컴포넌트 포함 여부는 다음 기준으로 판단합니다.

| 기준 | 포함 가능성 |
|---|---:|
| 장문, 문서, 뉴스, 커뮤니티, 지식관리 서비스에서 자주 쓰임 | 높음 |
| dashboard, admin, issue tracker에서 반복적으로 쓰임 | 높음 |
| HTML native element만으로 동작 가능 | 높음 |
| CSS만으로 의미 있는 visual style 제공 가능 | 높음 |
| 애니메이션이 없어도 어색하지 않음 | 높음 |
| JavaScript 상태 관리가 핵심 | 낮음 |
| 앱 UI 또는 마케팅 UI에 가까움 | 낮음 |
| 움직임과 시각 효과가 핵심 | 낮음 |

## 3. 지원 범위

### 3.1 Core

반드시 지원합니다.

| 구분 | 컴포넌트 |
|---|---|
| Layout | container, reading, stack, cluster, grid, sidebar layout, app shell |
| Content | typography, blockquote, code, figure, table |
| Form | button, button group, input, select, textarea, checkbox, radio, switch |
| Navigation | nav, breadcrumb, pagination, toc |
| Display | panel, card, badge, meta, list group, callout/alert |
| Product patterns | toolbar, filter bar, stat card, status list, activity list, summary row, empty state |

### 3.2 Native interactive

HTML 기본 기능을 사용하고 Readwell은 스타일만 제공합니다.

| 컴포넌트 | 구현 방식 |
|---|---|
| Accordion / Disclosure | `details.rw-accordion` / `summary` |
| Dropdown (Zero-JS) | `details.rw-dropdown` / `summary` / `.rw-dropdown-menu` |
| Dialog / Modal | `dialog` |
| Progress | `progress` |
| Checkbox & Radio | `input[type="checkbox"]`, `input[type="radio"]` (Pure CSS Paper&Ink) |
| Switch | `input type="checkbox" role="switch"` |
| Form Validation | `[aria-invalid="false"]` / `[aria-invalid="true"]` / `.is-valid` / `.is-invalid` |

### 3.3 Styled-only & Widgets

외형은 제공하며 동작은 가벼운 CSS 상태 또는 데모 위젯으로 지원합니다.

| 컴포넌트 | Readwell 담당 | 구현 상태 |
|---|---|---|
| Tabs | active/selected style | `.rw-tabs button.is-active` 지원 |
| Dropdown Menu | menu/panel style, 4px 밀착 | `.rw-dropdown-menu`, `.rw-dropdown-item` 지원 |
| Live Mode Switcher | 테마/표면/밀도/E-Ink 실시간 제어 위젯 | `examples/switcher.js` 제공 |
| Instant CSS Tooltip | `data-tooltip` 기반 딜레이 없는 툴팁 | `.rw-switcher-info-badge` 등 제공 |

### 3.4 Deferred & Optional

향후 확장 고려 항목입니다.

- print style 최적화
- 추가 서체(Monospace 등) 패키징

### 3.5 Excluded

core에서 제외합니다.

- carousel
- toast
- offcanvas
- command palette
- combobox/autocomplete
- complex popover
- spinner 중심 loading UI
- 복잡한 animated widget

## 4. Surface별 중요 컴포넌트

| Surface | 중요한 컴포넌트 |
|---|---|
| Reading | reading, meta, callout, toc, pagination |
| Workspace | panel, card, callout, property row, toc, sidebar layout |
| Dashboard | stat card, panel, status list, activity list, quick action row, progress |
| Dense | filter bar, summary row, badge, data table, compact list row |

## 5. Semantic color와 컴포넌트 연결

컴포넌트는 상태별 색상을 독립적으로 정의하지 않고 공통 `primary`, `secondary`, `success`, `warning`, `danger`, `info` token을 사용합니다.

| 컴포넌트 | semantic color 사용 방식 |
|---|---|
| Button | primary/secondary, 필요한 경우 danger action |
| Badge / Status | soft background + strong text + base border |
| Alert / Callout | soft background + accent border + 상태 텍스트/icon |
| Navigation | primary soft/line + underline/bold 등 active 보조 신호 |
| Form validation | success/danger border/text + 설명 문구/icon |
| Card / Panel | 전체 착색보다 얇은 accent border 또는 매우 연한 soft surface |
| Table status | status badge 또는 작은 accent |
| Progress | 의미가 있는 진행/상태에 semantic base 사용 |
| Metrics / Stat card | 숫자 일부, delta text, 상단/좌측 accent line에 제한적으로 사용 |
| Status list / Activity | semantic icon + 상태 텍스트 + 보조 메타 |

색은 장식이 아니라 정보 우선순위와 상태를 빠르게 전달하기 위한 수단입니다. 색상만으로 의미를 전달하지 않고 텍스트, icon, border, font weight 등의 신호를 함께 사용합니다.

## 6. Card와 Panel의 차이

Readwell은 card UI 남발을 지양하지만 card 자체를 배제하지 않습니다.

| 컴포넌트 | 의미 | 예시 |
|---|---|---|
| Card | 독립적인 반복 콘텐츠 단위 | 글 목록, 뉴스 항목, 프로젝트 카드 |
| Panel | 화면 내부의 구획 | aside, 설정 영역, form section, widget container |
| Callout | 본문 흐름 안의 안내/경고 | 문서 안내, 오류, 주의 사항 |
| Stat card | 요약 지표 | 매출, 사용자 수, 전환율 |

Readwell card는 shadow와 강한 radius가 아니라 border, spacing, typography로 구분합니다. dense UI에서는 row와 panel의 구분감이 부족하지 않도록 border contrast와 spacing step을 조절합니다.

## 7. Motion 정책

Readwell의 기본 컴포넌트는 animation을 필요로 하지 않아야 합니다.

- Accordion은 즉시 열리고 닫혀도 된다.
- Switch는 knob animation이 없어도 된다.
- Dialog는 fade/scale 없이 열려도 된다.
- Dropdown은 slide/fade 없이 표시되어도 된다.
- Hover 효과는 배경색, border, underline 변화 정도로 제한한다.

`@media (update: slow)`와 `@media (prefers-reduced-motion: reduce)`에서는 animation, transition, shadow, text-shadow를 제거합니다.

## 8. 1.0 목표

Readwell CSS 1.0은 다음 정도의 컴포넌트 범위를 목표로 합니다.

```text
Foundation / Layout
  container, reading, stack, cluster, grid, sidebar, app-shell

Content
  typography, code, blockquote, figure, table, list

Form
  button, button-group, input, textarea, select, checkbox, radio, switch, fieldset

Navigation
  nav, breadcrumb, pagination, toc

Display
  panel, card, badge, meta, list-group, callout

Product patterns
  toolbar, filter-bar, stat-card, status-list, activity-list, summary-row, empty-state

Native interactive
  details/accordion, dialog, progress

Styled-only
  tabs, dropdown
```
