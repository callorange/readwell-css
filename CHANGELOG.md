# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-09-05

### Added
- **예제 폴더 파일명 직관화 및 4대 레이아웃 1:1 매핑**:
  - `examples/article.html` ➔ `examples/reading.html` (Reading 48rem 1컬럼 장문 독서)
  - `examples/issues.html` ➔ `examples/fluid.html` (Fluid 100% 전폭 백오피스/ERP 대용량 테이블)
  - 4대 정예 레이아웃 아키타입(`reading.html`, `docs.html`, `workspace.html`, `fluid.html`)과 예제 파일명의 1:1 직관적 연계 완성
  - `examples/index.html`, `README.md`, `docs/README.md`, `scripts/dev.js` 등 전체 프로젝트 링크 동기화
- **Mode Switcher 일시적(Ephemeral) 프리뷰 전환**:
  - `localStorage` 지속성 저장을 전면 제거하여 다른 페이지 이동 시 이전 페이지의 레이아웃이 잔존하거나 강제 덮어쓰여지지 않도록 개선
  - 모든 예제 페이지 진입 시 각 페이지 HTML에 선언된 고유 기본 레이아웃/테마(`originalLayout`, `originalTheme`)로 항상 깨끗하게 로드
  - 스위처의 조작은 현재 페이지의 일시적 프리뷰 테스트용으로만 휘발성 동작
- **스마트 프리셋 (Convention over Configuration) 체계 및 `data-rw-layout` 승격**:
  - 모호했던 `data-rw-surface`를 화면 골격과 목적을 명확히 대변하는 **`data-rw-layout`**으로 표준화하고, 기존 코드 보호를 위한 CSS 선택자 별칭(`:where([data-rw-layout], [data-rw-surface])`) 완비
  - `data-rw-layout` 선언 하나만으로 최적의 여백 밀도가 자동 부여되는 4대 정예 레이아웃 아키타입 완비:
    - `reading`: 48rem(768px) 폭 + 1.75 행간 + **기본 Cozy 밀도 자동 연동** (1컬럼 장문 독서/에세이)
    - `docs`: 80rem(1280px) 폭 + **기본 Comfortable 밀도 자동 연동** (2컬럼 기술 문서 및 가이드)
    - `workspace`: 90rem(1440px) 폭 + **기본 Comfortable 밀도 자동 연동** (3패널 노션형 지식베이스 & 어드민 대시보드)
    - `fluid`: 100% 전폭 + **기본 Compact 초소형 밀도 자동 연동** (백오피스, ERP, 대용량 테이블, 구 records/dense 호환)
  - 3패널 앱 셸(`.rw-app-shell--seamless`)에서 중앙 본문이 고립되고 좌우 사이드바가 양끝으로 찢어지던 와이드 스크린 공백 결함 완전 해소
  - `data-rw-density`는 스마트 프리셋을 덮어쓰는 **미세 조절(Override) 속성**으로 역할 경계를 명확히 분리
  - Live Mode Switcher(`switcher.js`) 컨트롤러에 4대 정예 레이아웃 및 2x2 정밀 그리드 동기화 적용
- **야간 종이 테마 (Dark / Charcoal Paper Theme)**:
  - 칠흑 블랙이 아닌 눈부심 없는 흑연 먹빛 톤의 저자극 다크 테마(`:root[data-rw-theme="dark"]`, `[data-rw-theme="dark"]`) 및 전용 Semantic Color Matrix 추가
  - 사용자가 테마를 명시하지 않은 기본 상태에서 OS 다크 모드(`@media (prefers-color-scheme: dark)`) 자동 연동
  - 퓨어 페이퍼 테마 트리오(Pure Paper Trio: `Light 📄` 내추럴 백상지, `Warm Paper 📖` 단행본 크림지, `Dark 🌙` 먹빛 흑연 야간지) 확장 및 Live Controls 스위처 연동
- **출판물 수준 인쇄 및 PDF 최적화 (`@media print`)**:
  - 브라우저 인쇄(`Ctrl+P`) 및 PDF 저장 시 내비게이션, 툴바, 버튼, 스위처 등 인터랙티브 UI 자동 숨김 (`display: none !important`)
  - 100% 흑백 대비 및 잉크 절약을 위한 순백색 배경과 순먹색 텍스트 강제
  - 표, 카드, 인용구, 코드 블록의 중간 페이지 잘림 방지 (`break-inside: avoid; page-break-inside: avoid;`) 및 제목 분리 방지 (`break-after: avoid;`)
  - 본문 독서 영역(`.rw-reading`) 내 외부 링크 URL 자동 각주화 (`a[href^="http"]::after { content: " (" attr(href) ")"; }`)
- **Tufte 스타일 사이드노트 및 본문 각주 (Sidenotes & Footnotes)**:
  - 에드워드 터프티(Edward Tufte) 스타일의 장문 독서용 순수 CSS 사이드노트(`.rw-sidenote`, `.rw-sidenote-number`) 및 마진노트(`.rw-marginnote`, `.rw-marginnote-symbol`) 추가
  - 데스크톱(너비 1080px 이상)에서 본문 독서 영역 우측 마진으로 부유하여 시선 분산 없이 동일 행에서 읽을 수 있는 레이아웃 적용
  - 모바일/태블릿에서 인라인 체크박스 토글(`.rw-sidenote-toggle`) 기반의 접이식 카드로 자동 반응형 전환
  - 학술 및 마크다운 표준 하단 각주 리스트(`.rw-footnotes`) 및 역참조 링크(`.rw-footnote-backref`) 스타일 추가
- **Windows 고대비 모드(`forced-colors`) 및 웹 접근성(A11y) 강화**:
  - 커스텀 체크박스, 라디오, 토글 스위치, 슬라이더 레인지에 `@media (forced-colors: active)` 시스템 색상 키워드(`Canvas`, `CanvasText`, `Highlight`, `HighlightText`) 바인딩
  - 고대비 환경에서 체크/선택 상태 가시성 및 키보드 포커스 링(`:focus-visible`) 가시성 100% 보장
- **실무 UI 패턴 4종 추가**:
  - 인라인 칩/태그 컴포넌트(`.rw-chip`, `.rw-tag`, 인터랙티브 호버, 닫기 버튼 `.rw-chip__remove`, 6종 시맨틱 수식어)
  - 신청서 및 단계별 절차 안내용 순수 CSS 프로세스 스테퍼(`.rw-steps`, `.rw-step`, `.is-active`, `.is-complete`)
  - 코드 블록 타이틀 헤더(`.rw-code-block`, `.rw-code-header`, `.rw-code-title`, `.rw-code-lang`)
  - 모바일 테이블 가로 스크롤 암시 큐(`.rw-table-container--scrollable`)
- **Zero-Dependency v3 CSS 소스맵(`.css.map`) 생성 및 빌드 스크립트 고도화 (`scripts/build.js`)**:
  - 외부 의존성 없이 표준 Base64 VLQ 인코더를 자체 내장하여 `dist/readwell.css.map` 및 `dist/readwell.min.css.map` 자동 생성 (브라우저 DevTools 원본 소스 파일 매핑 완비)
  - 따옴표 문자열 및 `url(...)` 리터럴 임시 토큰 마스킹을 통한 안전한 CSS 압축(`safeMinifyCSS`) 구현 (문법 손상 원천 방지)
- **문서 포털(Docs Portal) 파셜 모듈화 및 자동 조립 빌더 도입 (`docs/partials/`, `scripts/build-docs.js`)**:
  - 12개 HTML 파셜 파일로 분할하여 유지보수성 극대화
  - `docs/index.html` 및 `examples/docs.html` 원클릭 자동 조립 스크립트 구축 및 `npm run build` 통합
- **`scripts/test-build.js` 회귀 테스트 전면 강화**:
  - 신규 8대 핵심 선택자, v3 소스맵 무결성, 371쌍 CSS 중괄호 짝 밸런스, 60KB 번들 크기 예산(Size Budget), 문서 포털 조립 정합성 자동 검증 추가
- 드롭업(Dropup) 위쪽 전개 지원 수식어(`.rw-dropdown--up`, `.rw-dropup`) 및 부드러운 상향 슬라이드 애니메이션(`@keyframes rw-dropup-show`) 추가
- 스플릿 버튼 그룹(`.rw-button-group`)과 연동 시 드롭다운 메뉴가 작은 화살표에 국한되지 않고 일반 드롭다운처럼 **버튼 그룹 전체의 아래쪽/좌측 기준(`left: 0`)으로 자연스럽게 펼쳐지도록** 위치 컨텍스트 최적화
- 버튼 그룹(`.rw-button-group`)과 드롭다운(`details.rw-dropdown`)을 결합한 일체형 스플릿 버튼 드롭다운(Split Button Dropdown / Action Split Button) 순수 CSS 지원 및 공식 문서/쇼케이스 데모 추가
- 로딩 인디케이터 및 비지 상태(`[aria-busy="true"]`) 순수 CSS 회전 스피너(`@keyframes rw-spin`) 및 독립 스피너 컴포넌트(`.rw-spinner`, `--sm`, `--lg`) 추가
- 순수 CSS 전역 툴팁(`[data-tooltip]`) 지원 (마우스 호버 및 키보드 Tab 포커스 시 상단 말풍선 슬라이드 노출)
- Paper & Ink 스타일에 맞춘 슬라이더 레인지 컨트롤(`<input type="range">`) 미니멀 트랙 및 조절 핸들(Thumb) 스타일링 추가
- W3C 표준 웹 접근성 화면 숨김 유틸리티(`.rw-sr-only`, `.rw-visually-hidden`) 및 포커스 시 노출 클래스(`--focusable`) 추가
- 입력창과 고정 단위(₩, $, %), 프로토콜(https://), 검색 버튼을 매끄럽게 연결하는 인풋 그룹(`.rw-input-group`, `.rw-input-group-addon`, `.rw-input-group-text`) 추가
- 사용자 프로필 이미지 및 이니셜 텍스트 표기용 원형/라운드 사각 아바타 컴포넌트(`.rw-avatar`, `--sm`, `--lg`, `--rounded`) 추가
- 데이터 테이블 확장 수식어: 줄무늬 행(`.rw-table--striped`), 마우스 호버 강조(`.rw-table--hoverable`), 고정 헤더(`.rw-table--sticky-header`) 추가
- 드롭다운 우측 정렬 클래스(`details.rw-dropdown.rw-dropdown--right`) 추가 (화면 우측 가장자리 메뉴 잘림 방지)
- 페이지네이션 비활성화 상태(`[aria-disabled="true"]`, `.is-disabled`) 및 이전/다음 버튼 스타일 추가
- 공식 문서 포털(`docs/index.html`, `examples/docs.html`) 및 컴포넌트 카탈로그(`examples/components.html`)에 신규 6종 및 개선 5종 실물 라이브 프리뷰 및 원클릭 복사 코드 블록 추가
- `scripts/test-build.js`에 신규 11대 핵심 선택자 정량 검증 테스트 추가
- 프로젝트 초기 설정 및 디렉터리 구조 구축
- Zero-dependency 빌드 스크립트(`scripts/build.js`) 및 개발 서버(`scripts/dev.js`) 추가
- 12개 CSS 모듈 스켈레톤 및 토큰 체계(`src/`) 정의
- 5종 예제 템플릿 및 허브 페이지(`examples/`) 구성
- 네이티브 모달 다이얼로그(`dialog`), 아코디언 정밀화(`details.rw-accordion`), 탭(`.rw-tabs`), 드롭다운(`.rw-dropdown`) 추가
- 폼 유효성 검사 상태(`[aria-invalid="true"]`), 필드셋(`fieldset`), 엠프티 스테이트(`.rw-empty`), 요약 바(`.rw-summary-row`) 추가
- 종합 컴포넌트 카탈로그 & 키친싱크 페이지(`examples/components.html`) 추가
- 실시간 인터랙티브 모드 & 밀도 스위처 위젯(`examples/switcher.js`, `examples/switcher.css`) 추가
- 퓨어 페이퍼 테마 듀오(Pure Paper Duo: `Light 📄` 내추럴 백상지, `Warm Paper 📖` 단행본 크림지) 큐레이션 및 테마 스위처 연동
- 컴포넌트 카탈로그(`examples/components.html`) 내 실시간 탭 전환, 버튼 그룹 선택 토글, HTML5 네이티브 드롭다운 인터랙션 추가
- 모드 스위처 위젯 내 2줄 마이크로카피(한글 서브타이틀), 호버 연동 실시간 안내 바(`rw-switcher-hint`), 섹션 정보 뱃지 및 웹 접근성 툴팁 추가
- `README.md`, `examples/index.html`, `docs/03_DESIGN_SYSTEM.md`에 4대 제어 속성(`data-rw-theme`, `data-rw-surface`, `data-rw-density`, `data-rw-eink`) 종합 사용 가이드 및 명세 추가
- 폼 유효성 성공 상태(`[aria-invalid="false"]`, `.is-valid`, `.rw-form-success`) 스타일 추가
- 모드 스위처 정보 뱃지(`ⓘ`)에 브라우저 딜레이 없는 Pure CSS 툴팁(`data-tooltip`) 추가
- Pico CSS 스타일의 Zero-Dependency 공식 인터랙티브 문서 포털 웹사이트(`docs/index.html`, `examples/docs.html`) 신설 (반응형 스티키 사이드바, 카테고리별 설명, 라이브 렌더링 프리뷰, 원클릭 복사 코드 블록 완비)
- 버튼 크기 체계(`.rw-button--sm`, 기본 Medium, `.rw-button--lg`, `.rw-button--block`, `.rw-button--outline`) 추가
- 그리드 체계 확장(`.rw-grid-1`, `.rw-grid-2`, `.rw-grid-3`, `.rw-grid-4`, `.rw-grid-6`, `.rw-grid-12` 및 `.rw-col-span-1`~`12`, `.rw-col-span-full`) 추가
- 한국어 자연스러운 줄바꿈을 위한 `word-break: keep-all;` 전역 및 타이포그래피 적용
- 텍스트 굵기 유틸리티(`.rw-bold`, `.rw-semibold`, `.rw-normal`, `.rw-light`, `.rw-muted`, `.rw-strong`, `strong`, `b`, `em`, `i`) 및 인라인 서식 태그 스타일링 완비
- `.rw-stack` 및 `.rw-meta` 전용 라이브 프리뷰 쇼케이스 문서화

### Changed
- 아코디언(`details.rw-accordion`) 브라우저 기본 삼각형 마커 제거 및 `[open]` 시 180° 매끄럽게 회전하는 Paper & Ink 쉐브론 화살표(`::after`) 인터랙션 적용
- 모달 다이얼로그(`<dialog>`, `.rw-dialog`) 내부 `<article>`(헤더/본문/푸터 버튼 그룹) 구조화 카드형 레이아웃 지원 및 단일 텍스트 다이얼로그 하위 호환성 유지
- 체크박스(`input[type="checkbox"]`) 및 라디오 버튼(`input[type="radio"]`)을 Paper & Ink 철학에 부합하는 순수 CSS 커스텀 스타일로 개선
- 카드(`.rw-card`, 개별 콘텐츠 단위)와 패널(`.rw-panel`, 워크스페이스 구조 구획)의 디자인 및 구조적 역할 명확화
- 버튼 그룹(`.rw-button-group`) 활성 버튼(`.is-active`, `[aria-pressed="true"]`) 스타일 및 `z-index` 계층 정돈
- 드롭다운 메뉴(`.rw-dropdown-menu`) 이중 간격 제거 및 트리거 버튼과의 4px 위치 밀착 연결 개선
- 모드 스위처 힌트 바(`rw-switcher-hint`) 고정 높이 적용으로 마우스오버 시 레이아웃 시프트(덜컹거림) 방지
- Density System(`cozy`, `comfortable`, `compact`) 및 Surface Family 토큰을 테이블 셀, 버튼, 인풋 패딩에 실질 연동하여 시각 체감 강화
- 공식 문서 포털(`docs/index.html`, `examples/docs.html`)의 4대 속성 표, 퓨어 페이퍼 테마 듀오 표본 카드, 12칸 그리드/스팬, h1~h6 타이포그래피 및 `.rw-stack`/`.rw-meta` 쇼케이스 고도화
- 전체 7종 예제 템플릿(`examples/` 전수)의 상단 내비게이션 바, 헤더 브랜딩 및 컴포넌트 일관성 전면 통일

### Fixed
- CSS 빌드 스크립트(`scripts/build.js`) 압축 정규식에서 `calc()` 내부의 덧셈 연산자(`+`) 공백이 제거되어 `calc(100%+4px)`로 압축되며 브라우저 문법 오류로 `top`/`bottom`이 무시되던 치명적 버그 수정 (드롭업 및 상향/하향 위치가 완벽히 동작하도록 복원)
- 드롭다운 메뉴 너비가 트리거 버튼 너비(`min-width: 100%`)에 강제로 맞춰져 긴 버튼에서 좌/우 정렬 구분이 사라지던 문제를 최소 `10rem` 고정 및 컨텐츠 폭 기반(`width: max-content; max-width: 22rem;`)으로 최적화하여 좌/우 정렬 차이를 명확화
- 스플릿 버튼 그룹(`.rw-button-group`) 내 드롭다운 메뉴가 버튼을 덮어버리던 위치 컨텍스트 오류를 수정하고 항상 4px 상/하단 여백 및 정렬 기준선 유지
- 드롭다운 메뉴가 포커스를 잃어도 닫히지 않고 계속 떠 있어 다른 버튼을 가리던 문제 수정:
  - 전역 Light-Dismiss (외부 클릭, ESC 키 입력, 메뉴 항목 클릭 시 자동 닫힘) 기본 탑재
  - 스플릿 버튼 그룹(`.rw-button-group > .rw-dropdown:last-child`)의 드롭다운 메뉴가 우측 바깥으로 삐져나가지 않도록 우측 기준 자동 정렬(`left: auto; right: 0;`) 적용
  - 최신 브라우저 표준 Popover API(`[popover].rw-dropdown-menu`) 스타일 지원 추가
- 드롭다운 트리거 버튼의 여백/테두리가 누락되어 깨져 보이던 현상 수정 (`summary` 기본 버튼 스타일 및 `.rw-button` 상속 복원) 및 `.rw-input-group` 내부 버튼/인풋 flex 정렬 버그 수정
- 드롭다운 메뉴 열림 시 `details[open] > summary`의 불필요한 하단 여백 및 테두리 오버라이드로 인해 트리거 버튼과 메뉴가 요동치던(움찔거리던) 레이아웃 시프트 버그 수정 및 `.rw-dropdown` 제로 지터(Zero-Jitter) 격리, 부드러운 0.12s 미세 슬라이드 애니메이션(`@keyframes rw-dropdown-show`) 적용
- `pre code` 중첩 셀렉터 스타일 상속으로 인한 코드 블록 배경 깨짐 및 폰트 이중 축소 현상 수정
- 예제 허브(`examples/index.html`), `scripts/build.js`, `package.json` 내 GitHub 리포지토리 링크 깨짐 수정(`https://github.com/callorange/readwell-css`)
- `.rw-sidebar-layout--left`(좌측 고정 사이드바 250px + 우측 본문 1fr) 추가 및 공식 문서 포털 레이아웃 왜곡/스크롤바 분할 버그 수정
- `scripts/build.js`의 잘못된 주석 정규식으로 인해 SVG Data URL이 잘려나가 폼/스위치/검증 스타일이 파싱 에러로 무효화되던 치명적 버그 수정
- 체크박스 `:checked` 상태에서 마우스 오버 시 배경색이 지워지던 가상 클래스 우선순위 충돌 수정 (`:hover:not(:checked)` 및 `:checked:hover` 분리)
- 토글 스위치(`role="switch"`) 노브 이동을 `transform: translateX(1em)` 하드웨어 가속으로 전환하여 모든 브라우저에서 확실한 슬라이딩 모션 보장
- GitHub Pages 배포 워크플로(`.github/workflows/deploy-pages.yml`)에 `_site/docs` 디렉터리 동기화 누락 수정
