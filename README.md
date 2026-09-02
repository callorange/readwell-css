# Readwell CSS

> **E-Ink 디스플레이에서 영감을 얻은 긴 글 가독성과 제품 UI를 위한 저자극 순수 CSS 프레임워크**

🌐 **[Live Demo 보러가기 (https://callorange.github.io/readwell-css/)](https://callorange.github.io/readwell-css/)**

Readwell CSS는 장시간 화면을 보아도 눈이 피로하지 않은 차분한 가독성과 실제 상용 제품 UI(Workspace, Dashboard, Backoffice)에 필요한 구조적 명확성을 함께 제공하는 제로 런타임 CSS 프레임워크입니다.

---

## ✨ 핵심 특징 (Key Highlights)

- **E-Ink 영감의 절제된 페이퍼 미학**: 불필요한 장식 색상, 과한 그림자, 시각적 소음이 되는 애니메이션을 억제하고 단정한 선과 여백으로 정보를 전달합니다.
- **퓨어 페이퍼 테마 듀오 (Pure Paper Duo)**: 맑고 정갈한 내추럴 백상지(`Light 📄`)와 장시간 독서 시 눈이 가장 편안한 단행본 크림지(`Warm Paper 📖`) 2가지 엄선된 종이 질감을 지원합니다.
- **저채도 Semantic Color Matrix**: 6종의 의미 기반 상태 컬러(`primary`, `secondary`, `success`, `warning`, `danger`, `info`)를 종이의 색온도에 맞추어 저채도로 정밀하게 지원합니다.
- **Surface Family & Density System**: Reading(독서/블로그), Workspace(문서 협업), Dashboard(운영 콘솔), Dense Data(고밀도 테이블) 환경에 최적화된 표면과 밀도(`cozy`, `comfortable`, `compact`)를 제공합니다.
- **Zero Runtime JavaScript & Zero Dependencies**: 100% 순수 HTML5 시맨틱 태그(`dialog`, `details`, `progress` 등)와 CSS3 `@layer`만으로 빌드 및 동작합니다.

---

## 🎛️ 4대 제어 속성 가이드 (`data-rw-*`)

Readwell CSS는 별도의 JavaScript 없이, HTML 태그(`<html>` 또는 `<body>`)의 `data-rw-*` 속성 선언만으로 테마, 화면 용도, 여백 밀도, 전자종이 정적 모드를 직관적으로 제어합니다.

### 제어 속성 명세표

| 제어 축 (Attribute) | 사용 가능한 옵션 값 (Values) | 기본값 | 시각적 특징 및 권장 사용처 |
| :--- | :--- | :--- | :--- |
| **`data-rw-theme`** | `light`, `warm` | `light` | **테마 색온도**: `light`(맑고 정갈한 내추럴 백상지) vs `warm`(장시간 독서에 눈이 편안한 단행본 크림지) |
| **`data-rw-surface`** | `reading`, `workspace`, `dashboard`, `dense` | `reading` | **화면 용도별 표면**: `reading`(아티클/에세이/블로그), `workspace`(문서 협업/노션형), `dashboard`(운영 콘솔/지표), `dense`(데이터 테이블/백오피스) |
| **`data-rw-density`** | `cozy`, `comfortable`, `compact` | `comfortable` | **여백 및 컴포넌트 밀도**: `cozy`(터치 친화 여유 여백), `comfortable`(표준 균형 여백), `compact`(밀집된 데이터 뷰) |
| **`data-rw-eink`** | `true`, `false` | `false` | **전자종이 정적 모드**: 모든 전환 효과 및 애니메이션(`transition: none`)을 차단하여 눈 피로 최소화 |

### 마크업 적용 예시

```html
<!-- 1. 기술 블로그 / 장문 아티클 (미색 크림지 + 장문 독서 표면 + 여유로운 밀도) -->
<body data-rw-theme="warm" data-rw-surface="reading" data-rw-density="cozy">

<!-- 2. 문서형 협업 도구 / 노션형 위키 (백상지 + 협업 문서 표면 + 표준 밀도) -->
<body data-rw-surface="workspace" data-rw-density="comfortable">

<!-- 3. 고밀도 백오피스 / 이슈 트래커 (고밀도 표 표면 + 압축 밀도) -->
<body data-rw-surface="dense" data-rw-density="compact">

<!-- 4. 전자종이(E-Ink) 기기 최적화 무모션 모드 -->
<body data-rw-eink="true">
```

---

## 🚀 빠른 시작 (Quick Start)

### 빌드 및 개발
```bash
# 단일 CSS 빌드 (dist/readwell.css, dist/readwell.min.css)
npm run build

# 예제 프리뷰 및 핫 리빌드 개발 서버 실행 (http://localhost:3000)
npm run dev

# 빌드 자동화 테스트
npm test
```

## 📖 공식 문서 및 쇼케이스

- 🌐 **[공식 문서 포털 (Documentation Portal)](https://callorange.github.io/readwell-css/docs/)**: Pico CSS 스타일의 스티키 사이드바, 카테고리별 설명, 라이브 렌더링 프리뷰 및 원클릭 복사 코드가 제공되는 공식 문서 웹사이트
- 🎨 **[예제 템플릿 허브 (Examples Hub)](https://callorange.github.io/readwell-css/examples/index.html)**: 5종의 표준 실사용 템플릿 및 키친싱크 카탈로그

---

## 📂 예제 템플릿 및 쇼케이스 (`examples/`)

- [**공식 문서 포털 (Docs Portal)**](examples/docs.html): 카테고리별 라이브 프리뷰 및 복사 가능한 코드 블록
- [**종합 컴포넌트 카탈로그 (Kitchen Sink)**](examples/components.html): 모든 타이포그래피, 폼 유효성 검사, 아코디언, 모달, 탭, 드롭다운, 엠프티 스테이트 쇼케이스
- [**Article / Long-form Page**](examples/article.html): Reading Surface (장문 독서/기술 블로그)
- [**Workspace / Documentation**](examples/workspace.html): Workspace Surface (문서형 협업 도구)
- [**News & Community Feed**](examples/community.html): Community Surface (뉴스 및 스레드 피드)
- [**Dashboard & Backoffice**](examples/dashboard.html): Dashboard Surface (운영 콘솔 및 지표)
- [**Issue Tracker & Dense Table**](examples/issues.html): Dense Data Surface (고밀도 이슈 관리)

---

## 📚 상세 설계 문서

- [컨셉 문서 (Concept)](docs/01_CONCEPT.md)
- [제품 요구사항 정의서 (PRD)](docs/02_PRD.md)
- [디자인 시스템 명세 (Design System)](docs/03_DESIGN_SYSTEM.md)
- [CSS 아키텍처 가이드 (CSS Architecture)](docs/04_CSS_ARCHITECTURE.md)
- [컴포넌트 스코프 명세 (Component Scope)](docs/08_COMPONENT_SCOPE.md)

---

## 📄 라이선스 (License)

본 프로젝트는 [MIT License](LICENSE)에 따라 자유롭게 사용, 수정, 배포할 수 있습니다.
