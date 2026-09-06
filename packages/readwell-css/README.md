# Readwell CSS

> **E-Ink 디스플레이에서 영감을 얻은 긴 글 가독성과 제품 UI를 위한 저자극 순수 CSS 프레임워크**

[![npm version](https://img.shields.io/npm/v/readwell-css.svg)](https://www.npmjs.com/package/readwell-css)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](package.json)

🌐 **[Readwell CSS Live Demo 보러가기](https://callorange.github.io/readwell-css/readwell/)** | 📚 **[공식 문서 포털](https://callorange.github.io/readwell-css/readwell/docs.html)**

Readwell CSS는 장시간 화면을 보아도 눈이 피로하지 않은 차분한 가독성과 실제 상용 제품 UI(Workspace, Dashboard, Backoffice)에 필요한 구조적 명확성을 함께 제공하는 제로 런타임 순수 CSS 프레임워크입니다. 동양 전통 서예 및 수묵화 프리미엄 테마가 필요하시다면 자매 패키지인 [sumi-css](../sumi-css/)를 확인하세요.

---

## ✨ 핵심 특징 (Key Highlights)

- **E-Ink 영감의 절제된 페이퍼 미학**: 불필요한 장식 색상, 과한 그림자, 시각적 소음이 되는 애니메이션을 억제하고 단정한 선과 여백으로 정보를 전달합니다.
- **퓨어 페이퍼 테마 트리오 (Pure Paper Trio)**: 맑고 정갈한 내추럴 백상지(`Light 📄`), 장시간 독서 시 눈이 가장 편안한 단행본 크림지(`Warm Paper 📖`), 눈부심 없는 먹빛 흑연 야간지(`Dark 🌙`) 3가지 엄선된 종이 질감을 지원합니다.
- **저채도 Semantic Color Matrix**: 6종의 의미 기반 상태 컬러(`primary`, `secondary`, `success`, `warning`, `danger`, `info`)를 종이의 색온도에 맞추어 저채도로 정밀하게 지원합니다.
- **4대 정예 레이아웃 아키타입 & 스마트 프리셋 (`data-rw-layout`)**: Reading(48rem 1컬럼 독서), Docs(80rem 2컬럼 기술문서), Workspace(90rem 3패널 지식베이스 & 4열 대시보드), Fluid(100% 전폭 고밀도 데이터 백오피스)에 최적화된 화면 골격과 기본 밀도(Cozy, Comfortable, Compact) 자동 연동을 제공합니다.
- **Zero Runtime JavaScript & Zero Dependencies**: 100% 순수 HTML5 시맨틱 태그(`dialog`, `details`, `progress` 등)와 CSS3 `@layer`만으로 빌드 및 동작합니다.

---

## 📦 설치 및 사용법 (Installation & Usage)

### 1. npm 패키지 설치
```bash
npm install readwell-css
```

### 2. 프로젝트에서 불러오기
```javascript
// 번들러 (Vite, Webpack, Next.js 등)
import 'readwell-css';
// 또는 압축 버전
import 'readwell-css/min';
```

### 3. HTML 직접 링크 (또는 CDN)
```html
<!-- CDN 링크 (jsDelivr / unpkg) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/readwell-css@0.2.1/dist/readwell.min.css">
```

---

## 🎛️ 4대 제어 속성 가이드 (`data-rw-*`)

Readwell CSS는 별도의 JavaScript 없이, HTML 태그(`<html>` 또는 `<body>`)의 `data-rw-*` 속성 선언만으로 테마, 화면 용도, 여백 밀도, 전자종이 정적 모드를 직관적으로 제어합니다.

### 제어 속성 명세표

| 제어 축 (Attribute) | 사용 가능한 옵션 값 (Values) | 기본값 | 시각적 특징 및 권장 사용처 |
| :--- | :--- | :--- | :--- |
| **`data-rw-theme`** | `light`, `warm`, `dark` | `light` | **테마 색온도**: `light`(맑고 정갈한 내추럴 백상지) vs `warm`(단행본 크림지) vs `dark`(먹빛 흑연 야간지) |
| **`data-rw-layout`** | `reading`, `docs`, `workspace`, `fluid` | `reading` | **레이아웃 아키타입 & 스마트 프리셋**: 화면 목적별 최적 폭 및 기본 밀도 자동 연동 (`reading[48rem]`➔cozy, `docs[80rem]`➔comfortable, `workspace[90rem]`➔comfortable, `fluid[100%]`➔compact) |
| **`data-rw-density`** | `cozy`, `comfortable`, `compact` | 프리셋 연동 | **밀도 미세 조절 (오버라이드)**: 스마트 프리셋을 덮어쓰고 개별 패딩·여백을 수동 미세 조정 (`cozy`, `comfortable`, `compact`) |
| **`data-rw-eink`** | `true`, `false` | `false` | **전자종이 정적 모드**: 모든 전환 효과 및 애니메이션(`transition: none`)을 차단하여 눈 피로 최소화 |

### 마크업 적용 예시

```html
<!-- 1. 기술 블로그 / 장문 아티클 (미색 크림지 + 1컬럼 독서 레이아웃 -> cozy 밀도 자동 연동) -->
<body data-rw-theme="warm" data-rw-layout="reading">

<!-- 2. 문서형 협업 도구 / 노션형 위키 / 대시보드 (백상지 + 3패널 작업 레이아웃 -> comfortable 밀도 자동 연동) -->
<body data-rw-layout="workspace">

<!-- 3. 고밀도 백오피스 / 대량 데이터 테이블 (먹빛 야간지 + 전폭 백오피스 레이아웃 -> compact 밀도 자동 연동) -->
<body data-rw-theme="dark" data-rw-layout="fluid">

<!-- 4. 전자종이(E-Ink) 기기 최적화 무모션 모드 -->
<body data-rw-eink="true">
```

---

## 🛠️ 개발 및 빌드 (Development)

```bash
# 독립 패키지 빌드 (dist/readwell.css, dist/readwell.min.css)
npm run build

# 빌드 및 무결성 테스트 실행
npm test
```

---

## 📂 예제 템플릿 (`examples/`)

패키지 내 `examples/` 디렉터리에서 실사용 예제 템플릿을 확인하실 수 있습니다:
- `index.html`: 예제 쇼케이스 허브
- `reading.html`: 48rem 장문 독서 / 아티클 템플릿
- `docs.html`: 80rem 2컬럼 기술 문서 템플릿
- `workspace.html`: 90rem 3패널 지식베이스 템플릿
- `dashboard.html`: 4열 운영 지표 및 대시보드 템플릿
- `community.html`: 커뮤니티 피드 템플릿
- `fluid.html`: 전폭 고밀도 데이터 백오피스 템플릿
- `components.html`: 키친싱크 전 컴포넌트 카탈로그

---

## 📚 상세 설계 문서 (`docs/readwell/`)

- [컨셉 문서 (Concept)](../../docs/readwell/01_CONCEPT.md)
- [제품 요구사항 정의서 (PRD)](../../docs/readwell/02_PRD.md)
- [디자인 시스템 명세 (Design System)](../../docs/readwell/03_DESIGN_SYSTEM.md)
- [CSS 아키텍처 가이드 (CSS Architecture)](../../docs/readwell/04_CSS_ARCHITECTURE.md)
- [컴포넌트 스코프 명세 (Component Scope)](../../docs/readwell/08_COMPONENT_SCOPE.md)

---

## 📄 라이선스 (License)

본 패키지는 [MIT License](LICENSE)에 따라 자유롭게 사용, 수정, 배포할 수 있습니다.
