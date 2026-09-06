# Readwell CSS 디자인 시스템

## 1. 디자인 원칙

### 1.1 Restrained Color

Readwell은 색상을 없애는 것이 아니라 **장식용 색상을 최소화하고 정보의 의미와 상태를 전달하는 색상은 적극적으로 사용합니다.** 기본 정보 위계는 여전히 다음 요소를 중심으로 만듭니다.

- font size
- font weight
- line
- spacing
- underline
- inverse state

성공, 경고, 오류, 진행 상태, 주요 액션처럼 빠른 인지가 필요한 곳에는 저채도 semantic color를 사용합니다. 색상이 콘텐츠와 타이포그래피보다 먼저 보이지 않도록 화면 전체 착색보다 작은 accent와 soft surface를 우선합니다.

### 1.2 Structured Quietness

표면은 조용해야 하지만, 구조는 분명해야 합니다.

- box-shadow 최소화
- gradient 최소화
- 과한 radius 지양
- 카드 UI 남발 지양
- background texture 지양
- dense UI에서는 panel, row, section 경계를 더 분명하게 허용

Card를 지원하지 않는다는 뜻은 아닙니다. Readwell의 card는 독립 콘텐츠 단위를 표현하되, shadow나 강한 radius가 아니라 border와 spacing으로 구분합니다.

### 1.3 Reading First, Product Ready

Readwell은 본문을 오래 읽는 환경을 우선하면서도 실제 제품 UI에 필요한 구조적 명확성을 제공합니다.

- 너무 넓은 본문 폭을 피함
- line-height를 넉넉하게 설정
- 문단 간격은 과하지 않게 유지
- 제목과 본문의 차이를 명확하게 유지
- dashboard/list/table에서는 스캔 속도와 판독성을 보장

### 1.4 State Without Color

semantic color를 사용하더라도 색상만으로 의미를 전달해서는 안 됩니다.

예시:

- 현재 메뉴: primary accent + underline/border + bold
- primary action: primary fill/border + 명확한 label
- disabled: opacity만 쓰지 말고 border/text 변화도 고려
- error/success: semantic color + icon 또는 상태 텍스트
- selected tab: accent + underline/border + font weight
- checked switch: semantic color + 위치/텍스트/형태 변화

### 1.5 Low Motion

기본 UI는 정적이어야 합니다.

- transition은 선택 사항
- animation은 기본 컴포넌트에 넣지 않음
- `@media (update: slow)`에서는 움직임 제거
- `@media (prefers-reduced-motion: reduce)`를 지원
- accordion, dialog, dropdown, switch는 기본적으로 즉시 상태가 바뀌어도 됨

### 1.6 Native First

가능하면 HTML native element를 우선 사용합니다.

- accordion: `details` / `summary`
- modal/dialog: `dialog`
- progress: `progress`
- switch: `input type="checkbox" role="switch"`

Readwell은 동작 로직보다 시각 표현을 담당합니다.

## 2. HTML 제어 속성 명세 (`data-rw-*` API)

Readwell CSS는 HTML5 `data-*` 속성을 통해 전체 레이아웃과 종이 테마를 유연하게 제어합니다:

| HTML 속성 | 속성 값 (Values) | 기본값 | 적용 레이어 및 역할 |
| :--- | :--- | :--- | :--- |
| `data-rw-theme` | `light`, `warm`, `dark` | `light` | **테마 색온도**: 내추럴 백상지 vs 단행본 크림지 vs 흑연 야간지 질감 |
| `data-rw-layout`<br>*(구 surface 호환)* | `reading`, `docs`, `workspace`, `fluid` | `reading` | **레이아웃 아키타입 & 스마트 프리셋**: 용도별 최적 폭 및 기본 밀도 자동 연동 |
| `data-rw-density` | `cozy`, `comfortable`, `compact` | 프리셋 연동 | **밀도 미세 조절 (오버라이드)**: 행간, 패딩, 간격(spacing)의 개별 수동 조절 |
| `data-rw-eink` | `true`, `false` | `false` | **전자종이 정적 모드**: 애니메이션/트랜지션을 차단하여 눈 피로 최소화 |

## 3. Layout Archetypes (레이아웃 아키타입)

### 3.1 Reading Layout (`data-rw-layout="reading"`)

용도:
- article, blog, 장문 에세이, 가독성 최우선 콘텐츠

특징:
- 본문 폭 48rem(768px) 제한 및 1.75 행간
- 기본 `cozy` 밀도 자동 연동
- 카드/패널보다 텍스트 콘텐츠 흐름 우선

### 3.2 Docs Layout (`data-rw-layout="docs"`)

용도:
- 공식 기술 문서, API 레퍼런스, 2패널 가이드 문서

특징:
- 컨테이너 폭 80rem(1280px) 안정적인 문서 작업 폭
- 기본 `comfortable` 밀도 자동 연동
- 좌측 목차(TOC) 사이드바 + 중앙 본문 가이드의 2패널 표준

### 3.3 Workspace & Dashboard Layout (`data-rw-layout="workspace"`)

용도:
- 노션형 협업 도구, 팀 지식베이스, 어드민 관제 대시보드

특징:
- 컨테이너 폭 90rem(1440px) 와이드 스크린 최적화
- 기본 `comfortable` 밀도 자동 연동
- 좌측 사이드바 + 중앙 작업창 + 우측 속성 패널의 3패널 앱 셸(`.rw-app-shell--seamless`)
- 4열 스탯 카드 및 지표 차트 그리드와 완벽한 조화

### 3.4 Fluid Layout (`data-rw-layout="fluid"`, records/dense 호환)

용도:
- issue tracker, repository list, data table, ERP, 스프레드시트, 백오피스

특징:
- 폭 100% 전폭(Fluid) 레이아웃
- 기본 `compact` 초소형 밀도 자동 연동
- 셀 패딩 최소화 및 대량 데이터 한눈에 조회
- 필터바 및 대용량 테이블 화면 최적화
- row 구분감 강화 및 compact density 지원
- filter bar / summary row / table body가 섞여 보이지 않도록 구분
- badge/status 가독성 강화

## 4. Density system

Readwell은 화면에 따라 밀도를 조절할 수 있어야 합니다.

| Density | 적합한 화면 | 특징 |
|---|---|---|
| cozy | article, blog, long-form docs | 넉넉한 spacing, 큰 line-height |
| comfortable | workspace, 일반 SaaS 화면 | 기본값, 균형형 |
| compact | dashboard, issue list, admin table | tighter spacing, 빠른 스캔 |

밀도는 component shape를 바꾸기보다 spacing, row height, padding, gap을 조절하는 방향으로 설계합니다.

## 5. Pure Paper Themes & Semantic Colors

### 5.1 Pure Paper Trio (3대 종이 테마)

- **Light 📄 (내추럴 백상지)**: 맑고 정갈한 기본 백색 종이 질감
- **Warm Paper 📖 (단행본 크림지)**: 장시간 독서 시 눈이 가장 편안한 미색 크림톤 종이 질감
- **Dark 🌙 (먹빛 흑연 야간지)**: 칠흑 블랙이 아닌 눈부심 없는 흑연 먹빛 저자극 야간 종이 질감

### 5.2 의미 체계

| Semantic color | 용도 |
|---|---|
| primary | 주요 액션, active, 선택 상태 |
| secondary | 보조 액션, 낮은 우선순위 UI |
| success | 성공, 완료, 정상 |
| warning | 주의, 대기, 확인 필요 |
| danger | 오류, 실패, 삭제 |
| info | 안내, 진행 중, 정보성 상태 |

### 5.3 색상 성격

기본 테마에서 다음 방향을 유지합니다.

- Primary: muted blue
- Secondary: gray / gray-green
- Success: muted green
- Warning: ochre / amber
- Danger: muted red
- Info: blue-gray

### 5.4 사용 단계

모든 semantic color는 최소한 다음 단계가 있어야 합니다.

- base
- soft
- strong

예시 토큰:

```css
--rw-primary
--rw-primary-soft
--rw-primary-strong

--rw-secondary
--rw-secondary-soft
--rw-secondary-strong

--rw-success
--rw-success-soft
--rw-success-strong

--rw-warning
--rw-warning-soft
--rw-warning-strong

--rw-danger
--rw-danger-soft
--rw-danger-strong

--rw-info
--rw-info-soft
--rw-info-strong
```

### 5.5 사용 방식

색상은 주로 다음과 같이 제한적으로 사용합니다.

- 버튼의 주요 액션 구분
- 활성 navigation 상태
- badge / status
- alert
- form validation
- progress / 상태 표시
- 중요 지표 강조
- 작은 border 또는 accent
- 링크와 선택 상태

Card나 Panel 전체 배경을 상태 컬러로 강하게 칠하는 것보다는 다음과 같은 표현을 우선합니다.

- 얇은 컬러 border
- 작은 badge
- 숫자 또는 제목 일부에 accent color
- 매우 연한 semantic background
- 필요한 부분에서만 높은 대비 사용

## 6. Component principles

### 6.1 Panel

- 화면 내부 구획 표현
- workspace/dashboard에서 핵심
- subtle border + quiet background
- dense UI에서는 heading과 body separation 강화

### 6.2 Card

- 독립 콘텐츠 단위
- shadow보다 border, spacing, title hierarchy 우선
- list 반복 구조에서 사용

### 6.3 Stat card

- dashboard 전용 핵심 패턴
- 숫자, 보조 설명, 증감 상태를 명확히 구분
- 상태 강조는 accent line, small icon, delta text 위주

### 6.4 Toolbar / Filter bar

- dense data UI에서 중요
- control row와 content row의 경계가 명확해야 함
- input/select/button이 하나의 cluster로 보이도록 설계

### 6.5 Status list / Activity list

- 작은 상태 정보가 빠르게 읽혀야 함
- 아이콘, semantic text, time/meta를 명확히 분리

### 6.6 Table

- 선과 간격 중심
- dense surface에서는 row separation 강화
- badge/status/align rules로 판독성 확보

## 7. Typography rules

- 본문은 읽기용 line-height 확보
- dense UI에서도 heading, label, helper text의 위계를 분명히 유지
- 큰 제목은 serif 또는 차분한 display tone을 부분적으로 허용할 수 있으나, 제품 전반은 안정적인 가독성 우선
- meta text는 너무 흐리지 않게 유지

## 8. Accessibility

- semantic color는 색상만으로 의미를 전달하지 않음
- contrast는 WCAG 기준을 고려
- focus ring과 keyboard focus는 항상 식별 가능해야 함
- dense data 화면에서도 row focus, selected state, active filter가 분명해야 함

## 9. 결과적으로 지향하는 인상

Readwell이 주는 인상은 다음과 같아야 합니다.

- 문서형 화면: 조용하고 오래 읽기 편하다.
- 워크스페이스 화면: 정돈되어 있고 생각이 흐트러지지 않는다.
- 대시보드 화면: 차분하지만 상태가 잘 보인다.
- dense data 화면: 깔끔하면서도 구분감이 약하지 않다.
