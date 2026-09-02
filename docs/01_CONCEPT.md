# Readwell CSS 컨셉 문서

## 1. 한 문장 정의

**Readwell CSS는 긴 글에 강한 가독성과 실제 제품 UI에 필요한 구조적 명확성을 함께 제공하는 저자극 CSS 프레임워크입니다.**

슬로건:

> 읽는 시간이 길수록 조용한 화면이 좋아진다.

보조 정의:

> 조용하지만 흐리지 않고, 차분하지만 실무 화면에도 충분히 쓸 수 있어야 한다.

## 2. 문제 정의

현대 웹 UI는 색상, 카드, 그림자, 애니메이션, dense component layout을 통해 정보를 빠르게 전달하는 데 최적화되어 있습니다. 하지만 뉴스, 블로그, 문서, 커뮤니티, 연구 노트, 지식관리 도구처럼 오래 읽는 서비스에서는 이런 요소가 오히려 피로를 만들 수 있습니다.

반대로, 너무 조용한 미니멀 UI는 대시보드, 이슈 트래커, 설정 화면, 백오피스처럼 정보 밀도가 높은 제품 UI에서 다음 문제가 생길 수 있습니다.

- 텍스트가 많은 화면에서 장식이 과도해 내용 집중도가 떨어짐
- 본문 폭이 너무 넓어 한 줄을 따라 읽기 어려움
- 색상과 그림자에만 의존하면 흑백·저채도 환경에서 상태 구분이 어려움
- 반대로 색상을 지나치게 억제하면 성공/경고/오류/진행 상태와 주요 액션의 우선순위를 빠르게 파악하기 어려움
- 구획이 너무 약하면 dense list, table, filter bar, metric card에서 스캔 속도가 떨어짐
- 기존 CSS 프레임워크는 일반 UI에는 좋지만 장문 독서 경험에 특화되어 있지 않음
- 반대로 일부 문서형 CSS는 실제 서비스 개발에 필요한 card, navigation, panel, dashboard, data table 수준의 구조감을 충분히 제공하지 못함
- 실제 E-Ink 기기나 저주사율 환경에서 animation, shadow, gradient가 불편할 수 있음

## 3. 핵심 철학

Readwell은 E-Ink의 외형을 복제하지 않습니다. 대신 E-Ink가 편하게 느껴지는 이유를 일반 웹 UI 규칙으로 옮깁니다.

| E-Ink에서 얻은 제약 | 웹 UI 규칙 |
|---|---|
| 낮은 색 표현력 | 장식용 색상 최소화, 저채도 semantic color로 의미와 상태를 구분 |
| 느린 화면 갱신 | animation/transition 최소화 |
| 강한 흑백 대비 | 명확한 텍스트 대비, 선 중심 구조 |
| 장시간 독서 환경 | 제한된 본문 폭, 넉넉한 행간 |
| 정적인 화면 | content-first, quiet surface |

다만 최근 방향에서 Readwell의 철학은 다음처럼 더 명확하게 정리합니다.

> **조용함은 무구조를 뜻하지 않는다.**
>
> 장문 화면에서는 읽기 편해야 하고, 제품 화면에서는 구조와 상태가 빠르게 판독되어야 한다.

## 4. 포지셔닝

Readwell CSS는 다음 사이의 빈 공간을 목표로 합니다.

- Pico CSS처럼 semantic HTML을 존중한다.
- Tufte CSS처럼 긴 글의 가독성을 중요하게 본다.
- Notion류의 워크스페이스처럼 문서형 제품 UI를 깔끔하게 표현한다.
- 백오피스/dashboard UI처럼 구획과 상태가 많은 화면에서도 실용적이어야 한다.
- Tailwind처럼 모든 것을 utility로 만들지는 않는다.
- Bootstrap처럼 많은 JavaScript 동작을 내장하지 않는다.
- 전자책 리더 전용 UI가 아니라 일반 웹서비스에도 적용한다.

## 5. 제품 형태

Readwell은 두 가지 형태로 발전할 수 있습니다.

### 5.1 Readwell CSS

개발자가 자기 웹사이트나 제품 UI에 직접 적용하는 CSS 프레임워크입니다.

- 기본 HTML 요소 스타일
- 읽기 중심 layout class
- 문서형 workspace를 위한 layout/panel 구조
- form/table/nav/dialog 등 서비스 UI 컴포넌트
- card, accordion, callout, breadcrumb, pagination 등 콘텐츠 중심 컴포넌트
- backoffice/dashboard에서 쓸 수 있는 stat/panel/status/table 표현 패턴
- neutral + semantic color theme token
- primary / secondary / success / warning / danger / info 상태 표현
- E-Ink/low-motion mode

### 5.2 Readwell Extension

사용자가 기존 웹사이트에 Readwell 색감과 저자극 규칙을 적용하는 Chrome 확장 기능입니다.

- 사이트별 on/off
- Color only / Calm / Reading 모드
- Readwell 팔레트 적용
- shadow/animation 제거
- 본문 폭/줄간격 선택 조정
- 문서형 사이트와 제품형 사이트에 따라 다른 강도로 적용

## 6. Surface 전략

최근 방향을 기준으로 Readwell은 하나의 고정된 외형보다 **surface family**를 갖는 디자인 시스템으로 정의합니다.

### 6.1 Reading Surface

장문 읽기, 문서, 블로그, 아티클, 커뮤니티 본문에 적합합니다.

- 긴 본문 폭 제어
- 넉넉한 line-height
- 조용한 주변부
- typography 우선
- 카드보다 흐름 우선

### 6.2 Workspace Surface

문서형 협업 도구, 노트 앱, 가이드 페이지, 위키형 제품 UI에 적합합니다.

- 문서 가독성을 유지하면서 좌우 패널/속성영역을 함께 사용
- panel/card를 약하게 사용
- section과 callout의 구조감 강화
- 문서와 앱 UI의 중간 지점

### 6.3 Dashboard Surface

백오피스, 운영 콘솔, 분석 화면에 적합합니다.

- metric card / status / table / quick action을 명확히 구분
- semantic color를 더 실용적으로 사용
- panel 경계를 더 분명하게 사용
- 빠른 스캔과 판독 우선

### 6.4 Dense Data Surface

이슈 트래커, 테이블 중심 앱, 리스트/필터가 많은 제품 화면에 적합합니다.

- row 구분감 강화
- filter/action bar 명확화
- badge/status 가독성 강화
- compact density 지원

## 7. 컴포넌트 전략

Readwell은 현대 CSS 프레임워크처럼 실사용에 필요한 기본 컴포넌트를 제공하되, JavaScript 기반 위젯 라이브러리가 되지는 않습니다.

핵심 원칙:

> Pico CSS 수준의 semantic component coverage를 기준선으로 삼되, 문서형 workspace와 dashboard/backoffice에 필요한 구조 컴포넌트를 추가한다.

Readwell이 우선 지원할 컴포넌트는 다음과 같습니다.

- Layout: container, reading, stack, cluster, grid, sidebar layout
- Content: typography, blockquote, code, figure, table
- Form: button, button group, input, select, textarea, checkbox, radio, switch
- Navigation: nav, breadcrumb, pagination, toc
- Display: panel, card, badge, meta, list group, callout/alert
- Product patterns: toolbar, filter bar, stat card, status list, activity list, empty state
- Native interactive: details/accordion, dialog, progress
- Styled-only interactive: tabs, dropdown

제외하거나 후순위로 둘 컴포넌트:

- carousel
- toast
- offcanvas
- popover
- command palette
- combobox
- 복잡한 animated widget

## 8. 디자인 정체성

Readwell의 디자인은 다음 단어로 요약합니다.

- 조용한
- 저자극
- 읽기 중심
- 구조적인
- 판독 가능한
- 회백색 종이
- 먹색 텍스트
- 선과 여백
- 절제된 semantic color
- 과장 없는 UI
- 동작보다 구조를 우선하는 UI

Readwell은 “예쁜 테마”보다 “오래 읽기 편한 기본값”과 “실제 제품에 바로 쓸 수 있는 구조감”을 동시에 추구합니다.

색상을 없애는 것이 목적은 아닙니다. **불필요한 장식용 색상을 최소화하고, 정보의 의미와 상태를 전달하는 색상은 적극적으로 사용합니다.**

semantic color는 화면 전체를 채우기보다 주요 액션, 활성 navigation, badge/status, alert, validation, progress, 지표 accent처럼 빠른 판단이 필요한 지점에 제한적으로 사용합니다. 다만 dashboard나 dense data 화면에서는 문서형 화면보다 구획과 상태 표현을 한 단계 더 분명하게 허용합니다.
