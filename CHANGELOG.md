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
- 저자극 E-Ink 인버스 다크 모드(`[data-rw-theme="dark"]`, `@media (prefers-color-scheme: dark)`) 및 테마 제어기 추가
- 웜 세피아 나이트(Warm Sepia Night) 팔레트 리마스터 (눈부심 방지 및 아늑한 야간 가독성 톤앤매너 개선)
