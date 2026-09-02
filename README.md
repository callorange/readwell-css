# Readwell CSS

> **E-Ink 디스플레이에서 영감을 얻은 긴 글 가독성과 제품 UI를 위한 저자극 순수 CSS 프레임워크**

🌐 **[Live Demo 보러가기 (https://callorange.github.io/readwell-css/)](https://callorange.github.io/readwell-css/)**

Readwell CSS는 장시간 화면을 보아도 눈이 피로하지 않은 차분한 가독성과 실제 상용 제품 UI(Workspace, Dashboard, Backoffice)에 필요한 구조적 명확성을 함께 제공하는 제로 런타임 CSS 프레임워크입니다.

---

## ✨ 핵심 특징 (Key Highlights)

- **E-Ink 영감의 절제된 페이퍼 미학**: 불필요한 장식 색상, 과한 그림자, 시각적 소음이 되는 애니메이션을 억제하고 단정한 선과 여백으로 정보를 전달합니다.
- **저채도 Semantic Color Matrix**: 6종의 의미 기반 상태 컬러(`primary`, `secondary`, `success`, `warning`, `danger`, `info`)를 저채도로 정밀하게 지원합니다.
- **저자극 다크 모드 (E-Ink Inverted Theme)**: 순수 블랙의 눈부심을 배제한 차분한 다크 차콜 페이퍼 테마(`[data-rw-theme="dark"]` 및 OS 자동 감지)를 완벽 지원합니다.
- **Surface Family & Density System**: Reading(독서/블로그), Workspace(문서 협업), Dashboard(운영 콘솔), Dense Data(고밀도 테이블) 환경에 최적화된 표면과 밀도(`cozy`, `comfortable`, `compact`)를 제공합니다.
- **Zero Runtime JavaScript & Zero Dependencies**: 100% 순수 HTML5 시맨틱 태그(`dialog`, `details`, `progress` 등)와 CSS3 `@layer`만으로 빌드 및 동작합니다.

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

---

## 📂 예제 템플릿 및 쇼케이스 (`examples/`)

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
