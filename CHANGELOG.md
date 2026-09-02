# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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

### Changed
- 체크박스(`input[type="checkbox"]`) 및 라디오 버튼(`input[type="radio"]`)을 Paper & Ink 철학에 부합하는 순수 CSS 커스텀 스타일로 개선
- 카드(`.rw-card`, 개별 콘텐츠 단위)와 패널(`.rw-panel`, 워크스페이스 구조 구획)의 디자인 및 구조적 역할 명확화
- 버튼 그룹(`.rw-button-group`) 활성 버튼(`.is-active`, `[aria-pressed="true"]`) 스타일 및 `z-index` 계층 정돈
- 드롭다운 메뉴(`.rw-dropdown-menu`) 이중 간격 제거 및 트리거 버튼과의 4px 위치 밀착 연결 개선
- 모드 스위처 힌트 바(`rw-switcher-hint`) 고정 높이 적용으로 마우스오버 시 레이아웃 시프트(덜컹거림) 방지
- Density System(`cozy`, `comfortable`, `compact`) 및 Surface Family 토큰을 테이블 셀, 버튼, 인풋 패딩에 실질 연동하여 시각 체감 강화

### Fixed
- `pre code` 중첩 셀렉터 스타일 상속으로 인한 코드 블록 배경 깨짐 및 폰트 이중 축소 현상 수정
- 예제 허브(`examples/index.html`), `scripts/build.js`, `package.json` 내 GitHub 리포지토리 링크 깨짐 수정(`https://github.com/callorange/readwell-css`)
