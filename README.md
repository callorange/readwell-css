# Readwell CSS

> 읽는 시간이 길수록 조용한 화면이 좋아진다.

Readwell CSS는 긴 글의 뛰어난 가독성과 실제 제품 UI에 필요한 구조적 명확성을 함께 제공하는 저자극 순수 CSS 프레임워크입니다.

## 핵심 특징

- **E-Ink에서 영감을 얻은 절제된 디자인**: 불필요한 장식 색상, 화려한 그림자, 과한 애니메이션을 억제합니다.
- **저채도 Semantic Color**: 주요 액션 및 상태(success, warning, danger, info)를 명확한 의미 기반 저채도 컬러로 표현합니다.
- **Surface Family & Density System**: Reading, Workspace, Dashboard, Dense UI 환경에 최적화된 표면과 밀도를 제공합니다.
- **Zero Runtime JavaScript**: 모든 핵심 기능은 순수 HTML5 시맨틱 및 CSS3 `@layer`로 동작합니다.

## 빠른 시작 (Quick Start)

### 빌드 및 개발
```bash
# 단일 CSS 빌드 (dist/readwell.css, dist/readwell.min.css)
npm run build

# 예제 프리뷰 및 핫 리빌드 개발 서버 실행 (http://localhost:3000)
npm run dev
```

## 문서
- [컨셉 문서](docs/01_CONCEPT.md)
- [PRD](docs/02_PRD.md)
- [디자인 시스템](docs/03_DESIGN_SYSTEM.md)
- [CSS 아키텍처](docs/04_CSS_ARCHITECTURE.md)
- [컴포넌트 스코프](docs/08_COMPONENT_SCOPE.md)
