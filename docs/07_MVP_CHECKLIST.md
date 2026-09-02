# Readwell CSS MVP 체크리스트

## 1. CSS 기본 동작

- [ ] `readwell.css` 단일 파일로 사용할 수 있다.
- [ ] 기본 HTML 문서가 class 없이도 읽기 좋게 보인다.
- [ ] `.rw-container`가 페이지 폭을 제한한다.
- [ ] `.rw-reading`이 본문 폭을 제한한다.
- [ ] 버튼, 링크, input, select, textarea가 일관된 스타일을 가진다.
- [ ] checkbox/radio/switch가 text input 스타일과 충돌하지 않는다.
- [ ] table이 선과 여백 중심으로 읽기 좋게 보인다.
- [ ] blockquote와 code block이 구분된다.

## 2. 디자인 품질

- [ ] 배경색이 지나치게 노랗거나 세피아스럽지 않다.
- [ ] 본문 대비가 충분하다.
- [ ] 보조 텍스트가 너무 흐리지 않다.
- [ ] shadow 없이도 영역 구분이 가능하다.
- [ ] primary action이 semantic color로 명확히 드러나며 색상만으로 의미를 전달하지 않는다.
- [ ] active/current 상태가 primary accent + border/underline/weight 등 복수 신호로 표현된다.
- [ ] success/warning/danger/info 상태를 빠르게 구분할 수 있다.
- [ ] semantic color를 제거하거나 구분하기 어려운 환경에서도 상태 이름/형태가 남는다.
- [ ] card와 panel의 역할이 구분된다.
- [ ] callout/alert가 색상만으로 의미를 전달하지 않는다.
- [ ] 문서형 화면은 조용하고, 제품형 화면은 구조감이 충분하다.

## 3. Semantic color system

- [ ] `primary`, `secondary`, `success`, `warning`, `danger`, `info` token이 있다.
- [ ] 각 semantic color에 base / soft / strong 역할이 있다.
- [ ] Button, Badge, Alert/Callout, Navigation, Form validation, Card/Panel accent, Table status, Progress, Stat card가 공통 semantic token을 사용한다.
- [ ] 컴포넌트 내부에 별도의 임의 상태색을 하드코딩하지 않는다.
- [ ] Card/Panel 전체를 강한 상태색으로 칠하기보다 accent border/badge/soft background를 우선한다.
- [ ] semantic text/background 조합의 contrast를 점검한다.

## 4. 장문 가독성

- [ ] 본문 폭이 너무 넓지 않다.
- [ ] line-height가 1.65~1.75 수준이다.
- [ ] 문단 간격이 과하게 벌어지지 않는다.
- [ ] 모바일에서도 한 줄이 너무 짧거나 길지 않다.
- [ ] 제목과 본문 간 위계가 명확하다.
- [ ] TOC, breadcrumb, pagination이 긴 글 탐색을 방해하지 않는다.

## 5. Surface / Density 시스템

- [ ] `reading`, `workspace`, `dashboard`, `dense` surface 개념이 문서화되어 있다.
- [ ] `cozy`, `comfortable`, `compact` density가 문서화되어 있다.
- [ ] surface별로 panel, border, spacing의 강약 차이가 있다.
- [ ] dense surface에서 row/table/filter 구분이 충분하다.
- [ ] reading surface에서 과도한 panelization이 나타나지 않는다.

## 6. 컴포넌트 범위

- [ ] `.rw-card`가 있다.
- [ ] `.rw-panel`이 있다.
- [ ] `.rw-callout` 또는 alert 스타일이 있다.
- [ ] `.rw-badge`가 있다.
- [ ] `.rw-meta`가 있다.
- [ ] `.rw-list` 또는 list group 스타일이 있다.
- [ ] `.rw-nav`가 있다.
- [ ] `.rw-breadcrumb`가 있다.
- [ ] `.rw-pagination`이 있다.
- [ ] `.rw-toc`가 있다.
- [ ] `.rw-toolbar`가 있다.
- [ ] `.rw-filterbar`가 있다.
- [ ] `.rw-stat`가 있다.
- [ ] `.rw-status-list` 또는 `.rw-activity-list`가 있다.
- [ ] `details/summary` 기반 accordion 스타일이 있다.
- [ ] `dialog` 기본 스타일이 있다.
- [ ] `progress` 기본 스타일이 있다.
- [ ] tabs/dropdown은 visual style만 제공한다.

## 7. 예제 페이지

- [ ] article 예제가 있다.
- [ ] workspace/docs 예제가 있다.
- [ ] news/community 예제가 있다.
- [ ] dashboard/backoffice 예제가 있다.
- [ ] issue list/dense data 예제가 있다.
- [ ] 각 예제가 같은 디자인 언어를 공유한다.
- [ ] 예제에서 CSS variable override를 보여준다.
- [ ] 예제에서 card, accordion, callout, switch, pagination을 확인할 수 있다.
- [ ] 백오피스/상태 UI 예제에서 semantic color가 작은 accent, badge, soft surface 중심으로 사용되는지 확인할 수 있다.
- [ ] dense data 예제에서 구조감이 부족하지 않은지 확인할 수 있다.

## 8. E-Ink/Low-motion 대응

- [ ] `@media (update: slow)` 규칙이 있다.
- [ ] `@media (prefers-reduced-motion: reduce)` 규칙이 있다.
- [ ] `.rw-eink` 또는 `[data-rw-eink="true"]`가 동작한다.
- [ ] E-Ink mode에서 animation이 제거된다.
- [ ] E-Ink mode에서 shadow가 제거된다.
- [ ] 색상 없이도 UI 상태가 구분된다.
- [ ] accordion/switch/dialog/dropdown이 motion 없이도 어색하지 않다.

## 9. 문서화

- [ ] README에 빠른 시작이 있다.
- [ ] 디자인 철학이 설명되어 있다.
- [ ] token override 방법이 있다.
- [ ] class API 표가 있다.
- [ ] 컴포넌트 범위와 제외 범위가 문서화되어 있다.
- [ ] JavaScript behavior를 제공하지 않는다는 경계가 설명되어 있다.
- [ ] surface / density 개념이 설명되어 있다.
- [ ] 예제 HTML이 있다.

## 10. 배포 전 확인

- [ ] Chrome 최신 버전 확인
- [ ] Firefox 최신 버전 확인
- [ ] Safari 최신 버전 확인
- [ ] 모바일 viewport 확인
- [ ] contrast 수동 점검
- [ ] keyboard focus 확인
- [ ] dense UI 스캔 품질 확인
- [ ] npm package name 후보 확인
- [ ] GitHub repository name 후보 확인
