# Readwell CSS PRD

## 1. 제품명

Readwell CSS

## 2. 목표 사용자

### 2.1 웹 개발자

- 블로그, 문서 사이트, 뉴스레터, 커뮤니티, 지식관리 서비스, 내부 업무 도구를 만드는 개발자
- Bootstrap/Tailwind/Pico보다 더 차분한 UI를 원하지만 실제 제품 화면에서도 충분한 구조감을 원하는 개발자
- 장문 읽기 화면과 백오피스형 화면을 하나의 디자인 언어로 통일하고 싶은 개발자
- 별도 JS 프레임워크 없이 CSS만으로 기본 UI 품질을 확보하고 싶은 개발자
- card, form, navigation, pagination, accordion 같은 기본 UI와 dashboard/panel/table 수준의 실용적인 컴포넌트가 필요한 개발자

### 2.2 일반 사용자

- 텍스트가 많은 사이트를 오래 읽는 사용자
- 흰 화면, 강한 색상, 움직이는 UI에 피로를 느끼는 사용자
- 기존 사이트의 색감을 더 편하게 바꾸고 싶은 사용자

## 3. MVP 범위

### 포함

- 단일 CSS 파일 `readwell.css`
- neutral + semantic color 디자인 토큰
- primary / secondary / success / warning / danger / info 상태 체계
- 기본 HTML 요소 스타일
- class 기반 layout API
- 주요 UI 컴포넌트
- surface family 규칙
  - Reading Surface
  - Workspace Surface
  - Dashboard Surface
  - Dense Data Surface
- density 규칙
  - cozy
  - comfortable
  - compact
- semantic native component 스타일
  - `details` / `summary`
  - `dialog`
  - `progress`
  - `input[type="checkbox"]`, `input[type="radio"]`, `input[role="switch"]`
- 예제 HTML 5종
  - article page
  - workspace / docs page
  - news/community page
  - dashboard / backoffice page
  - issue list / dense data page
- 기본 문서 사이트
- Chrome 확장 기능 기획 문서

### 제외

- JS 컴포넌트 라이브러리
- React/Vue/Svelte 전용 패키지
- 완전한 design tool kit
- 종이 질감/잔상 시뮬레이션
- 모든 사이트에 완벽하게 대응하는 universal extension
- carousel, toast, offcanvas, command palette 같은 앱 중심 위젯

## 4. 핵심 기능 요구사항

### F-001 Design tokens

Readwell은 CSS custom properties를 통해 색상, 폭, 행간, radius, spacing, density를 조정할 수 있어야 합니다.

색상 토큰은 neutral palette와 semantic palette를 분리합니다. semantic palette는 `primary`, `secondary`, `success`, `warning`, `danger`, `info`를 제공하고 각 의미 색상은 최소한 다음 역할을 표현할 수 있어야 합니다.

- base: 기본 accent / border / progress 등 semantic 표현
- soft: 연한 background / selected surface
- strong: 텍스트 / 높은 대비 accent / 강조 border / 필요한 경우 filled state

### F-002 Base styles

기본 HTML 요소는 class 없이도 읽기 좋은 기본 스타일을 가져야 합니다.

대상:

- body
- h1~h6
- p
- a
- blockquote
- pre/code
- hr
- table
- form elements
- button
- details/summary
- dialog
- progress

### F-003 Class API

실제 서비스 개발을 위해 명시적인 class API를 제공합니다.

예시:

- `.rw-container`
- `.rw-reading`
- `.rw-stack`
- `.rw-cluster`
- `.rw-grid`
- `.rw-card`
- `.rw-panel`
- `.rw-callout`
- `.rw-button`
- `.rw-button--primary`
- `.rw-badge--success`
- `.rw-callout--warning`
- `.rw-toolbar`
- `.rw-filterbar`
- `.rw-stat`
- `.rw-status-list`
- `.rw-muted`
- `.rw-inverse`

### F-004 Reading layout

긴 글을 위한 본문 폭과 행간 기본값을 제공합니다.

- 기본 본문 폭: 약 42~46rem
- 기본 line-height: 1.65~1.75
- 문단 간격: 과하지 않게 설정

### F-005 Surface family

Readwell은 화면 유형에 따라 구조감을 다르게 적용할 수 있어야 합니다.

- Reading Surface: 본문 가독성 우선
- Workspace Surface: 문서 + 사이드 패널 공존
- Dashboard Surface: metric/panel/status/table 판독성 우선
- Dense Data Surface: filter/list/table 구분감 우선

### F-006 Density system

Readwell은 화면 밀도에 따라 spacing, row height, panel padding을 조정할 수 있어야 합니다.

- cozy: 읽기 중심
- comfortable: 기본 제품 UI
- compact: dense list/table

### F-007 Low-motion mode

`@media (update: slow)`, `@media (prefers-reduced-motion: reduce)`, `.rw-eink` 또는 `[data-rw-eink="true"]`를 통해 animation, transition, shadow를 제거합니다.

### F-008 Theme mode

초기 MVP에서는 warm light theme을 기본으로 합니다.

추후 후보:

- warm
- neutral
- mono
- dark
- eink-pure

### F-009 Component coverage

Readwell CSS는 다음 범위의 컴포넌트를 MVP~1.0 사이에 제공해야 합니다.

| 구분 | 컴포넌트 | 우선순위 |
|---|---|---:|
| Layout | container, reading, stack, cluster, grid, sidebar | 필수 |
| Content | typography, blockquote, code, figure, table | 필수 |
| Form | button, button group, input, select, textarea, checkbox, radio, switch | 필수 |
| Navigation | nav, breadcrumb, pagination, toc | 필수 |
| Display | panel, card, badge, meta, list group, callout/alert | 필수 |
| Product patterns | toolbar, filter bar, stat card, status list, activity list | 필수 |
| Native interactive | details/accordion, dialog, progress | 권장 |
| Styled-only | tabs, dropdown | 권장 |
| Deferred | tooltip | 후순위 |
| Excluded | carousel, toast, offcanvas, command palette | 제외 |

### F-010 Behavior boundary

Readwell CSS는 UI의 표현을 담당하지만 애플리케이션 상태와 동작을 관리하지 않습니다.

- Accordion은 `details/summary` 스타일을 제공한다.
- Dialog는 `<dialog>` 스타일을 제공하되 여닫기 로직은 앱이 담당한다.
- Tabs와 Dropdown은 외형과 상태 class/attribute 스타일만 제공한다.
- Toast lifecycle, modal orchestration, keyboard navigation helper는 core 범위에서 제외한다.

### F-011 Semantic color system

Readwell은 범용 서비스 UI에서 상태를 빠르게 구분할 수 있도록 의미 기반 컬러 시스템을 제공합니다.

| Semantic color | 주요 용도 |
|---|---|
| primary | 주요 액션, 활성 메뉴, 중요한 링크/선택 상태 |
| secondary | 보조 액션, 낮은 우선순위 UI |
| success | 성공, 정상, 완료 |
| warning | 주의, 확인 필요, 처리 대기 |
| danger | 오류, 실패, 삭제, 환불 등 부정적 상태 |
| info | 안내, 진행 중, 중립적 정보 상태 |

컴포넌트는 별도의 임의 색상을 만들지 않고 공통 semantic token을 공유해야 합니다. Card/Panel 전체를 강한 상태색으로 채우기보다 얇은 accent border, badge, 일부 텍스트, 매우 연한 semantic background를 우선합니다.

### F-012 Dense UI 구조감

Readwell은 문서형 화면뿐 아니라 dashboard, issue tracker, admin 화면에서도 항목 구분과 정보 위계가 충분히 드러나야 합니다.

- list row 구분이 명확해야 함
- summary/stat 영역과 detail 영역의 위계가 보여야 함
- table/filter/action 영역이 서로 섞여 보이지 않아야 함
- 색이 없어도 border, spacing, typography만으로 1차 구조가 유지되어야 함

## 5. 비기능 요구사항

- CSS 단일 파일로 사용 가능해야 함
- JS 없이 기본 스타일이 동작해야 함
- HTML semantic을 해치지 않아야 함
- 기존 프로젝트에 넣어도 class prefix 충돌을 최소화해야 함
- 접근성 대비를 우선해야 함
- semantic color는 색상만으로 의미를 전달하지 않고 텍스트, 아이콘, border/style, 상태 이름 등과 함께 사용해야 함
- semantic color의 텍스트와 UI contrast는 WCAG 기준을 고려해야 함
- 작은 화면에서도 본문 가독성이 유지되어야 함
- dense list/table에서도 스캔 속도가 떨어지지 않아야 함
- motion은 기본값이 아니라 선택값이어야 함
- checkbox/radio/switch처럼 input type별 기본 형태가 깨지지 않아야 함

## 6. 성공 기준

MVP 성공 기준:

- article/workspace/community/dashboard/dense-data 예제가 일관된 디자인 언어로 보임
- 장문 페이지에서 기본 브라우저 스타일보다 읽기 편함
- workspace/doc 툴 화면에서 문서와 패널이 자연스럽게 공존함
- dashboard와 issue list 화면에서 구획, 상태, 우선순위가 빠르게 파악됨
- 저채도 semantic color를 사용해 버튼, 링크, 활성 상태, 성공/경고/오류/진행 상태가 빠르게 구분됨
- semantic color를 제거하거나 구분하기 어려운 환경에서도 텍스트, border, weight 등으로 의미가 유지됨
- card, panel, callout, accordion, pagination, stat card, status list가 shadow와 animation 없이도 구분됨
- extension으로 발전 가능한 디자인 토큰 구조가 잡힘
- 사용자가 `:root` 변수만 바꿔도 쉽게 커스터마이징 가능함

## 7. 리스크

| 리스크 | 대응 |
|---|---|
| 너무 밋밋해 보이거나 상태 파악이 느릴 수 있음 | typography/border hierarchy에 저채도 semantic color를 제한적으로 결합 |
| 반대로 제품 UI를 의식하다가 문서형 정체성이 흐려질 수 있음 | Reading Surface와 Dashboard Surface의 규칙을 명확히 분리 |
| classless와 class API 경계가 애매할 수 있음 | base는 최소, layout/component는 class 명시 |
| E-Ink 전용으로 오해될 수 있음 | “E-Ink inspired”이지 “E-Ink only”가 아님을 문서화 |
| semantic color가 과도하게 사용되어 Readwell 특유의 조용함이 사라질 수 있음 | 색을 장식이 아닌 상태/우선순위 전달에만 사용하고 soft/accent 표현을 기본으로 함 |
| 컴포넌트 범위가 Bootstrap처럼 비대해질 수 있음 | JS behavior를 제외하고 문서형/업무형 핵심 컴포넌트에 집중 |
| extension이 사이트를 깨뜨릴 수 있음 | 강도 단계와 사이트별 설정 제공 |
