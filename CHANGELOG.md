# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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
