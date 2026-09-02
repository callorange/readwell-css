# Readwell CSS MVP 체크리스트

## 1. CSS 기본 동작

- [x] `dist/readwell.css` 단일 파일로 사용할 수 있다.
- [x] 기본 HTML 문서가 class 없이도 읽기 좋게 보인다.
- [x] `.rw-container`가 페이지 폭을 제한한다.
- [x] `.rw-reading`이 본문 폭을 제한한다.
- [x] 버튼, 링크, input, select, textarea가 일관된 스타일을 가진다.
- [x] checkbox/radio/switch가 Paper&Ink 커스텀 스타일로 조화롭게 동작한다.
- [x] table이 선과 여백 중심으로 읽기 좋게 보인다.
- [x] blockquote와 code block이 명확히 구분된다.

## 2. 디자인 품질

- [x] 배경색이 지나치게 노랗거나 세피아스럽지 않다 (Pure Paper Duo: Light & Warm Paper).
- [x] 본문 대비가 충분하다.
- [x] 보조 텍스트가 너무 흐리지 않다.
- [x] shadow 없이도 영역 구분이 가능하다.
- [x] primary action이 semantic color로 명확히 드러나며 색상만으로 의미를 전달하지 않는다.
- [x] active/current 상태가 primary accent + border/underline/weight 등 복수 신호로 표현된다.
- [x] success/warning/danger/info 상태를 빠르게 구분할 수 있다.
- [x] semantic color를 제거하거나 구분하기 어려운 환경에서도 상태 이름/형태가 남는다.
- [x] card와 panel의 역할이 구분된다.
- [x] callout/alert가 색상만으로 의미를 전달하지 않는다.
- [x] 문서형 화면은 조용하고, 제품형 화면은 구조감이 충분하다.

## 3. Semantic color system

- [x] `primary`, `secondary`, `success`, `warning`, `danger`, `info` token이 있다.
- [x] 각 semantic color에 base / soft / strong 역할이 있다.
- [x] Button, Badge, Alert/Callout, Navigation, Form validation, Card/Panel accent, Table status, Progress, Stat card가 공통 semantic token을 사용한다.
- [x] 컴포넌트 내부에 별도의 임의 상태색을 하드코딩하지 않는다.
- [x] Card/Panel 전체를 강한 상태색으로 칠하기보다 accent border/badge/soft background를 우선한다.
- [x] semantic text/background 조합의 contrast를 점검한다.

## 4. 장문 가독성

- [x] 본문 폭이 너무 넓지 않다 (44~48rem).
- [x] line-height가 1.65~1.75 수준이다.
- [x] 문단 간격이 과하게 벌어지지 않는다.
- [x] 모바일에서도 한 줄이 너무 짧거나 길지 않다.
- [x] 제목과 본문 간 위계가 명확하다.
- [x] TOC, breadcrumb, pagination이 긴 글 탐색을 방해하지 않는다.

## 5. Surface / Density 시스템

- [x] `reading`, `workspace`, `dashboard`, `dense` surface 개념이 구현 및 문서화되어 있다.
- [x] `cozy`, `comfortable`, `compact` density가 구현 및 문서화되어 있다.
- [x] surface별로 panel, border, spacing의 강약 차이가 있다.
- [x] dense surface에서 row/table/filter 구분이 충분하다.
- [x] reading surface에서 과도한 panelization이 나타나지 않는다.

## 6. 컴포넌트 범위

- [x] `.rw-card`가 있다.
- [x] `.rw-panel`이 있다.
- [x] `.rw-callout` 또는 alert 스타일이 있다.
- [x] `.rw-badge`가 있다.
- [x] `.rw-meta`가 있다.
- [x] `.rw-list` 또는 list group 스타일이 있다.
- [x] `.rw-nav`가 있다.
- [x] `.rw-breadcrumb`가 있다.
- [x] `.rw-pagination`이 있다.
- [x] `.rw-toc`가 있다.
- [x] `.rw-toolbar`가 있다.
- [x] `.rw-filterbar`가 있다.
- [x] `.rw-stat`가 있다.
- [x] `.rw-status-list` 또는 `.rw-activity-list`가 있다.
- [x] `details/summary` 기반 accordion 스타일이 있다.
- [x] `dialog` 기본 스타일이 있다.
- [x] `progress` 기본 스타일이 있다.
- [x] tabs/dropdown(Zero-JS native 및 styled)이 제공된다.
- [x] 종합 키친싱크 카탈로그(`examples/components.html`)가 완비되어 있다.

## 7. 예제 페이지

- [x] article 예제가 있다 (`examples/article.html`).
- [x] workspace/docs 예제가 있다 (`examples/workspace.html`).
- [x] news/community 예제가 있다 (`examples/community.html`).
- [x] dashboard/backoffice 예제가 있다 (`examples/dashboard.html`).
- [x] issue list/dense data 예제가 있다 (`examples/issues.html`).
- [x] 종합 키친싱크 카탈로그가 있다 (`examples/components.html`).
- [x] 각 예제가 같은 디자인 언어를 공유한다.
- [x] 예제에서 CSS variable override를 보여준다.
- [x] 예제에서 card, accordion, callout, switch, pagination을 확인할 수 있다.
- [x] 백오피스/상태 UI 예제에서 semantic color가 작은 accent, badge, soft surface 중심으로 사용되는지 확인할 수 있다.
- [x] dense data 예제에서 구조감이 부족하지 않은지 확인할 수 있다.
- [x] 실시간 Live Controls 위젯으로 전 모드를 실시간 프리뷰할 수 있다.

## 8. E-Ink/Low-motion 대응

- [x] `@media (update: slow)` 규칙이 있다.
- [x] `@media (prefers-reduced-motion: reduce)` 규칙이 있다.
- [x] `.rw-eink` 또는 `[data-rw-eink="true"]`가 동작한다.
- [x] E-Ink mode에서 animation이 제거된다.
- [x] E-Ink mode에서 shadow가 제거된다.
- [x] 색상 없이도 UI 상태가 구분된다.
- [x] accordion/switch/dialog/dropdown이 motion 없이도 어색하지 않다.

## 9. 문서화

- [x] README에 빠른 시작과 4대 제어 속성 명세가 있다.
- [x] 디자인 철학이 설명되어 있다 (`01_CONCEPT.md`, `03_DESIGN_SYSTEM.md`).
- [x] token override 방법이 있다 (`04_CSS_ARCHITECTURE.md`).
- [x] class API 표가 있다.
- [x] 컴포넌트 범위와 제외 범위가 문서화되어 있다 (`08_COMPONENT_SCOPE.md`).
- [x] JavaScript behavior를 제공하지 않는다는 경계가 설명되어 있다.
- [x] surface / density 개념이 설명되어 있다.
- [x] 예제 HTML 및 허브가 완비되어 있다.

## 10. 배포 및 저장소

- [x] Zero-dependency 단일 빌드 파이프라인(`scripts/build.js`) 구축
- [x] GitHub Actions를 통한 GitHub Pages 자동 배포 파이프라인 구축
- [x] automated build test(`scripts/test-build.js`) 통과

