# Readwell CSS

> 읽는 시간이 길수록 조용한 화면이 좋아진다.

Readwell CSS는 E-Ink 디스플레이에서 얻은 절제된 디자인 원칙을 일반 웹 UI에 적용하는 CSS 프레임워크입니다. 목적은 전자책 리더를 흉내 내는 것이 아니라, **텍스트 중심 화면은 더 오래 편하게 읽게 만들고, 제품형 화면은 더 차분하지만 더 명확하게 보이게 만드는 것**입니다.

## 핵심 방향

- 불필요한 장식용 색상은 억제하고, 구조는 주로 여백·선·글자 위계로 표현합니다.
- 주요 액션과 성공/경고/오류/진행 상태에는 저채도 semantic color를 적극적으로 사용합니다.
- 화려한 그림자, 과한 radius, 불필요한 animation을 피합니다.
- 본문 너비와 행간을 제한해 긴 글의 가독성을 높입니다.
- 동시에 dashboard, issue tracker, backoffice에서도 구조와 상태가 잘 보이도록 panel과 data pattern을 제공합니다.
- 기본 HTML 요소는 보기 좋게 만들되, 실제 서비스 커스터마이징을 위해 명시적 class API를 제공합니다.
- CSS 프레임워크와 Chrome 확장 기능이 같은 디자인 토큰을 공유할 수 있게 설계합니다.
- Pico CSS 수준의 semantic component coverage를 기준선으로 삼고, 문서형 workspace와 제품형 UI에 필요한 컴포넌트를 추가합니다.
- JavaScript behavior는 core에서 담당하지 않습니다.

## Surface family

Readwell은 하나의 고정된 외형보다, 용도에 따라 강약이 조절되는 surface family를 지향합니다.

| Surface | 용도 |
|---|---|
| Reading | article, blog, docs, long-form community |
| Workspace | 노트/문서형 협업 도구, 위키, 가이드 화면 |
| Dashboard | 운영 콘솔, admin, analytics |
| Dense | issue tracker, list/table 중심 화면 |

이 구조 덕분에 Readwell은 문서형 UI의 장점을 유지하면서도 실제 제품 화면으로 확장될 수 있습니다.

## Density system

| Density | 용도 |
|---|---|
| cozy | 장문 읽기 중심 |
| comfortable | 기본 제품 UI |
| compact | dense list/table |

## 컬러 시스템

Readwell의 컬러 철학은 “색상을 최대한 사용하지 않는다”가 아니라 다음과 같습니다.

> 불필요한 장식용 색상을 최소화하고, 정보의 의미와 상태를 전달하는 색상은 적극적으로 사용한다.

기본 semantic color는 `primary`, `secondary`, `success`, `warning`, `danger`, `info`이며 각각 base / soft / strong 역할을 가집니다. Button, Badge, Alert, Navigation, Form validation, Card/Panel accent, Table status, Progress, Stat card가 이 공통 token을 사용합니다.

기본 테마는 muted blue, gray-green, muted green, ochre/amber, muted red, blue-gray 계열의 낮거나 중간 채도를 사용하며, 전체 surface 착색보다 작은 accent와 soft background를 우선합니다.

## 컴포넌트 범위

Readwell은 다음 컴포넌트를 우선 지원합니다.

| 구분 | 컴포넌트 |
|---|---|
| Layout | container, reading, stack, cluster, grid, sidebar layout, app shell |
| Content | typography, blockquote, code, figure, table |
| Form | button, button group, input, select, textarea, checkbox, radio, switch |
| Navigation | nav, breadcrumb, pagination, toc |
| Display | panel, card, badge, meta, list group, callout/alert |
| Product patterns | toolbar, filter bar, stat card, status list, activity list, summary row |
| Native interactive | details/accordion, dialog, progress |
| Styled-only | tabs, dropdown |

다음은 core에서 제외하거나 후순위로 둡니다.

- carousel
- toast
- offcanvas
- command palette
- combobox/autocomplete
- 복잡한 animated widget

## 테마 시스템 (Pure Paper Trio)

Readwell은 E-Ink 및 종이 매체의 자연스러운 질감을 살린 **Pure Paper Trio** 테마를 제공합니다:

- **Light (`data-rw-theme="light"`)**: 맑고 정갈한 내추럴 백상지(Natural White Paper) 기본 테마.
- **Warm Paper (`data-rw-theme="warm"`)**: 은은하고 부드러운 단행본 미색 크림지(Cream/Book Paper) 테마.
- **Dark (`data-rw-theme="dark"`)**: 눈부심 없는 먹빛 흑연 야간지(Charcoal/Night Paper) 테마. (OS 다크모드 자동 연동)

## 🎛️ 4대 HTML 제어 속성 (`data-rw-*` API)

Readwell CSS는 4종의 선언적 `data-rw-*` 속성으로 인터페이스의 성격을 즉시 전환합니다:

| 속성 (Attribute) | 옵션 값 (Values) | 기본값 | 특징 및 역할 |
| :--- | :--- | :--- | :--- |
| **`data-rw-theme`** | `light`, `warm`, `dark` | `light` | **테마 색온도**: 내추럴 백상지 vs 단행본 미색 크림지 vs 먹빛 흑연 야간지 |
| **`data-rw-layout`**<br>*(구 surface 호환)* | `reading`, `docs`, `workspace`, `fluid` | `reading` | **레이아웃 아키타입 & 스마트 프리셋**: 화면 폭 + 기본 밀도 자동 연동 (reading[48rem]➔cozy, docs[80rem]➔comfortable, workspace[90rem]➔comfortable, fluid[100%]➔compact) |
| **`data-rw-density`** | `cozy`, `comfortable`, `compact` | 프리셋 연동 | **밀도 미세 조절 (오버라이드)**: 개별 패딩·여백 수동 미세 조정 |
| **`data-rw-eink`** | `true`, `false` | `false` | **전자종이 정적 모드**: 모든 애니메이션 및 전환 효과(`transition: none`) 차단 |

## 빠른 시작

```html
<link rel="stylesheet" href="https://callorange.github.io/readwell-css/dist/readwell.min.css">

<!-- 미색 크림지 + 장문 독서 레이아웃 (cozy 밀도 자동 연동) -->
<main class="rw-container" data-rw-theme="warm" data-rw-layout="reading">
  <article class="rw-reading">
    <p class="rw-meta">2026.09.02 · 읽기 7분</p>
    <h1>읽는 시간이 길수록 조용한 화면이 좋아진다.</h1>
    <p>본문 내용...</p>
  </article>
</main>
```

## 🌐 인터랙티브 라이브 데모 및 공식 문서

- [**📖 공식 문서 포털 (Documentation Portal)**](https://callorange.github.io/readwell-css/docs/)
- [공식 예제 허브 (Live Hub)](https://callorange.github.io/readwell-css/examples/index.html)
- [종합 컴포넌트 키친싱크 (Kitchen Sink)](https://callorange.github.io/readwell-css/examples/components.html)
- [장문 독서 템플릿 (Reading)](https://callorange.github.io/readwell-css/examples/reading.html)
- [문서형 워크스페이스 (Workspace)](https://callorange.github.io/readwell-css/examples/workspace.html)
- [운영 대시보드 (Dashboard)](https://callorange.github.io/readwell-css/examples/dashboard.html)
- [이슈 트래커 (Fluid / Data Table)](https://callorange.github.io/readwell-css/examples/fluid.html)

## 문서 목록

| 문서 | 목적 |
|---|---|
| `docs/index.html` | Pico CSS 스타일 공식 인터랙티브 문서 웹사이트 |
| `01_CONCEPT.md` | 제품 컨셉, 철학, 차별점 |
| `02_PRD.md` | 제품 요구사항과 MVP 범위 |
| `03_DESIGN_SYSTEM.md` | 색상, 타이포그래피, 컴포넌트 디자인 원칙 |
| `04_CSS_ARCHITECTURE.md` | CSS 구조, class API, 토큰 설계 |
| `05_IMPLEMENTATION_PLAN.md` | 작업번호, 의존성, 구현 순서 |
| `06_CHROME_EXTENSION_PLAN.md` | 기존 사이트에 Readwell 테마를 적용하는 확장 기능 기획 |
| `07_MVP_CHECKLIST.md` | MVP 완료 기준과 검수 체크리스트 |
| `08_COMPONENT_SCOPE.md` | 컴포넌트 지원 범위와 제외 범위 |
| `references/figrow_workspace_reference.png` | 문서형 workspace 참고 시안 |
| `references/lynq_dashboard_reference.png` | dashboard/backoffice 참고 시안 |
| `Readwell_CSS_Concept_Deck_v2.pptx` | 기존 컨셉 발표용 PPT |
| `eink_pico_style_demo.html` | 초기 E-Ink + Pico 스타일 탐구용 프로토타입 (Reference) |

## 추천 프로젝트 구조

```text
readwell/
├─ packages/
│  ├─ readwell-css/
│  │  ├─ src/
│  │  ├─ dist/
│  │  └─ examples/
│  └─ readwell-extension/
│     ├─ src/
│     └─ public/
├─ docs/
├─ README.md
└─ package.json
```

초기에는 `readwell.css` 단일 파일과 HTML 예제 몇 개로 시작하고, API가 안정화되면 패키지 구조로 분리하는 것을 권장합니다.
