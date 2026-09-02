# Documentation Showcase, Button Sizes, Grids, Typography & Minifier Fix Design Spec

## 1. 개요 및 목적 (Overview & Goals)
사용자가 피드백한 9대 개선 및 버그 이슈를 해결하여, 공식 문서 포털과 프레임워크 전반의 시각적 완성도와 인터랙션 신뢰도를 최상으로 끌어올립니다:
1. **CSS Minifier SVG 손상 치명적 버그 수정**: `scripts/build.js`의 잘못된 `//` 정규식이 `http://` SVG URL을 잘라먹어 `readwell.min.css`의 폼/스위치/검증 스타일이 통째로 무효화되던 문제 영구 해결.
2. **한국어 줄바꿈 최적화 (Word Break Keep-All)**: `word-break: keep-all;` 및 테이블 코드 토큰 `white-space: nowrap;` 적용으로 어색한 한글/코드 음절 분할 방지.
3. **퓨어 페이퍼 테마 듀오 (Pure Paper Duo) 시각 카드 개선**: 단순 텍스트 박스가 아닌 실제 테마 배경색, 폰트, 스와치, 배지, 버튼이 포함된 실물 표본 카드 제공.
4. **그리드 체계 확장 (Grid System 1~4열)**: `.rw-grid` (자동 맞춤), `.rw-grid-1`, `.rw-grid-2`, `.rw-grid-3`, `.rw-grid-4` 지원 및 문서화.
5. **타이포그래피 전 체계 (h1~h6 & 인라인 텍스트)**: h1~h6의 폰트 크기(rem) 명세 및 `kbd`, `mark`, `del`, `ins`, `samp`, `sub`, `sup` 인라인 텍스트 쇼케이스 완비.
6. **Custom Checkbox & Radio 인터랙션 정상화**: CSS 로딩 복원 및 고유 ID/Label 연결로 완벽한 클릭 토글 동작 보장.
7. **Toggle Switch (`role="switch"`) 렌더링 정상화**: `input[type="checkbox"][role="switch"]` 고유 슬라이더 스타일 복원 및 크기/애니메이션 정돈.
8. **Valid & Invalid 유효성 검증 상태 시각 강화**: 초록색/빨간색 보더, 포커스 링 및 전용 도움말 메시지 스타일링 강화.
9. **버튼 크기 체계 (Button Sizes & Variants)**: `.rw-button--sm` (Small), Medium (Default), `.rw-button--lg` (Large), `.rw-button--block` (전체 폭), `.rw-button--outline` 추가 및 쇼케이스.
10. **GitHub Pages 배포 스크립트 수정**: `_site/docs` 디렉터리 동기화 추가.

---

## 2. 세부 설계 (Detailed Design)

### 2.1 한국어 타이포그래피 줄바꿈 (`src/typography.css`, `src/base.css`)
- `body, p, h1, h2, h3, h4, h5, h6, table, .rw-card, .rw-panel`: `word-break: keep-all; overflow-wrap: break-word;` 적용.
- 테이블 내 파라미터/코드 태그: `white-space: nowrap;` 적용.

### 2.2 버튼 사이즈 및 스타일 확장 (`src/elements.css`)
- `.rw-button--sm`: `font-size: 0.8rem; padding: 0.25em 0.65em;`
- `.rw-button--lg`: `font-size: 1.12rem; padding: 0.6em 1.35em; font-weight: 600;`
- `.rw-button--block`: `width: 100%; display: flex; justify-content: center;`
- `.rw-button--outline`: `background: transparent; border-color: var(--rw-line-strong);`

### 2.3 그리드 시스템 확장 (`src/layout.css`)
- `.rw-grid-4`: `grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));`
- `.rw-grid-1`: `grid-template-columns: 1fr;`

### 2.4 GitHub Pages 배포 워크플로 (`.github/workflows/deploy-pages.yml`)
- `mkdir -p _site/dist _site/examples _site/docs`
- `cp -r docs/* _site/docs/` 추가.
