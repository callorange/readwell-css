# Readwell CSS 구현 계획

## 작업 번호 규칙

- `RW-C` : 컨셉/문서
- `RW-D` : 디자인 시스템
- `RW-CSS` : CSS 구현
- `RW-EX` : 예제 페이지
- `RW-EXT` : Chrome 확장 기능
- `RW-QA` : 검수/배포

## 마일스톤 요약

| 마일스톤 | 목표 |
|---|---|
| M1 | 문서와 디자인 토큰 확정 |
| M2 | 단일 CSS MVP 구현 |
| M3 | 기본 컴포넌트 + 제품 패턴 확장 |
| M4 | 예제 페이지 5종 제작 |
| M5 | Chrome 확장 기능 프로토타입 |
| M6 | 문서 사이트와 배포 준비 |

## 작업 목록

| ID | 작업 | 의존성 | 결과물 |
|---|---|---|---|
| RW-C-001 | 컨셉 문서 정리 | 없음 | `01_CONCEPT.md` |
| RW-C-002 | PRD 작성 | RW-C-001 | `02_PRD.md` |
| RW-C-003 | 컴포넌트 범위 정리 | RW-C-002 | PRD/Architecture 업데이트 |
| RW-C-004 | surface family 및 density 규칙 정리 | RW-C-001 | Concept/Design System 업데이트 |
| RW-D-001 | neutral + semantic 컬러 토큰 정의 | RW-C-001 | primary/secondary/success/warning/danger/info base/soft/strong 변수 |
| RW-D-002 | typography scale 정의 | RW-C-001 | 폰트/행간/본문폭 변수 |
| RW-D-003 | component style 원칙 정리 | RW-D-001, RW-D-002, RW-D-004, RW-C-003, RW-C-004 | `03_DESIGN_SYSTEM.md` |
| RW-D-004 | semantic color 사용 규칙/contrast 검증 | RW-D-001 | component color usage matrix, a11y 기준 |
| RW-D-005 | surface token / density token 정의 | RW-C-004 | paper depth, spacing density token |
| RW-CSS-001 | 프로젝트 구조 생성 | RW-C-002 | repo skeleton |
| RW-CSS-002 | reset/base CSS 작성 | RW-D-001 | `readwell.css` 초기 |
| RW-CSS-003 | typography CSS 작성 | RW-D-002 | heading/body/blockquote/code |
| RW-CSS-004 | layout class 작성 | RW-CSS-002 | container/reading/stack/grid/sidebar/app shell |
| RW-CSS-005 | form/button/table 작성 | RW-CSS-002 | elements CSS |
| RW-CSS-006 | checkbox/radio/switch 작성 | RW-CSS-005 | form state CSS |
| RW-CSS-007 | card/panel/badge/meta/toc 작성 | RW-CSS-004 | core components CSS |
| RW-CSS-008 | callout/list/breadcrumb/pagination 작성 | RW-CSS-007 | content/navigation components |
| RW-CSS-009 | details/dialog/progress 작성 | RW-CSS-005 | native interactive style |
| RW-CSS-010 | tabs/dropdown visual style 작성 | RW-CSS-008 | styled-only components |
| RW-CSS-011 | eink/reduced-motion mode 작성 | RW-CSS-002 | mode CSS |
| RW-CSS-012 | semantic component variant 연결 | RW-D-004, RW-CSS-005, RW-CSS-007, RW-CSS-008, RW-CSS-009 | button/badge/alert/nav/validation/panel/table/progress variants |
| RW-CSS-013 | surface modifier 작성 | RW-D-005, RW-CSS-004, RW-CSS-007 | reading/workspace/dashboard/dense mode |
| RW-CSS-014 | density modifier 작성 | RW-D-005, RW-CSS-004, RW-CSS-005, RW-CSS-007 | cozy/comfortable/compact spacing |
| RW-CSS-015 | product pattern 작성 | RW-CSS-007, RW-CSS-012, RW-CSS-013 | toolbar/filterbar/stat/status/activity/summary |
| RW-EX-001 | article 예제 작성 | RW-CSS-003 | `examples/article.html` |
| RW-EX-002 | workspace/docs 예제 작성 | RW-CSS-007, RW-CSS-013 | `examples/workspace.html` |
| RW-EX-003 | news/community 예제 작성 | RW-CSS-007, RW-CSS-008 | `examples/community.html` |
| RW-EX-004 | dashboard/backoffice 예제 작성 | RW-CSS-012, RW-CSS-013, RW-CSS-015 | `examples/dashboard.html` |
| RW-EX-005 | issue list/dense data 예제 작성 | RW-CSS-012, RW-CSS-014, RW-CSS-015 | `examples/issues.html` |
| RW-QA-001 | 모바일 레이아웃 확인 | RW-EX-001~005 | responsive fix |
| RW-QA-002 | neutral/semantic contrast 점검 | RW-D-004, RW-CSS-012 | WCAG 기준 색상 보정 |
| RW-QA-003 | class API 정리 | RW-CSS-004~015 | README 업데이트 |
| RW-QA-004 | native component 접근성 점검 | RW-CSS-006, RW-CSS-009, RW-CSS-010 | a11y notes |
| RW-QA-005 | dense UI 스캔 품질 검수 | RW-EX-004, RW-EX-005 | 구분감/판독성 보정 |
| RW-EXT-001 | 확장 기능 요구사항 확정 | RW-C-002 | `06_CHROME_EXTENSION_PLAN.md` |
| RW-EXT-002 | manifest 작성 | RW-EXT-001 | `manifest.json` |
| RW-EXT-003 | CSS injection 구현 | RW-EXT-002 | content script |
| RW-EXT-004 | 사이트별 on/off 저장 | RW-EXT-003 | storage logic |
| RW-EXT-005 | mode 3단계 구현 | RW-EXT-003 | Color/Calm/Reading |
| RW-QA-006 | MVP 체크리스트 검수 | 전체 | `07_MVP_CHECKLIST.md` |

## 우선순위

### 1순위

- 문서 정리
- neutral + semantic CSS 토큰
- surface family / density 설계
- semantic color usage/contrast 규칙
- base/typography/layout
- form/button/table
- card/panel/callout
- toolbar/stat/status/product pattern
- article/workspace/dashboard 예제

### 2순위

- checkbox/radio/switch
- breadcrumb/pagination/toc
- details/accordion
- dialog/progress
- issue list/dense data 예제
- E-Ink/reduced-motion mode
- 문서 사이트
- npm 배포 준비

### 3순위

- tabs/dropdown visual style
- Chrome Extension 프로토타입
- theme preset
- dark/mono mode
- tooltip

### 제외 또는 별도 패키지 후보

- carousel
- toast
- offcanvas
- command palette
- combobox
- 복잡한 animated widget

## 구현 순서

```text
컨셉 확정
  ↓
컴포넌트 범위 확정
  ↓
surface family / density 규칙 확정
  ↓
neutral / semantic 디자인 토큰 확정
  ↓
semantic color 사용 규칙 / contrast 확정
  ↓
readwell.css 단일 파일 작성
  ↓
base / typography / layout 구현
  ↓
form / table / button 구현
  ↓
card / panel / callout 구현
  ↓
surface / density modifier 구현
  ↓
semantic button / badge / alert / validation / status variant 연결
  ↓
toolbar / stat / status list / activity list 구현
  ↓
nav / breadcrumb / pagination / toc 구현
  ↓
details / dialog / progress 구현
  ↓
article 예제 제작
  ↓
workspace/docs 예제 제작
  ↓
community 예제 제작
  ↓
dashboard/backoffice 예제 제작
  ↓
issue list/dense data 예제 제작
  ↓
CSS API 조정
  ↓
문서화
  ↓
확장 기능 프로토타입
```

## MVP 완료 기준

MVP는 다음 조건을 만족하면 완료로 봅니다.

- `readwell.css` 하나만 link해도 기본 페이지가 Readwell 스타일로 보임
- `.rw-container`, `.rw-reading`, `.rw-card`, `.rw-panel`, `.rw-button`, `.rw-button--primary`, `.rw-callout`, `.rw-stat`, `.rw-toolbar` 등 최소 class API가 동작함
- `data-rw-surface`와 `data-rw-density`로 화면 분위기와 밀도를 조절할 수 있음
- checkbox/radio/switch가 text input 스타일과 충돌하지 않음
- 5개 예제 페이지가 같은 디자인 언어를 공유함
- workspace 예제는 문서형 제품 UI로 자연스럽게 읽히고, dashboard/issue 예제는 구조와 상태가 잘 보임
- 사용자 CSS variable override 예제가 문서화됨
- primary/secondary/success/warning/danger/info가 공통 token으로 button/badge/alert/nav/validation/table/progress/stat 등에 연결됨
- semantic state가 색상만으로 의미를 전달하지 않으며 contrast가 검수됨
- dense UI에서도 row/panel/filter 구조가 충분히 구분됨
- 실제 프로젝트에 복사해도 class 충돌 가능성이 낮음
- animation 없이도 accordion/dialog/dropdown/tabs의 상태 표현이 어색하지 않음
