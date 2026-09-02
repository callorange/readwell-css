# Documentation Showcase Overhaul & CSS System Expansion Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** CSS Minifier SVG 손상 버그 수정, 한국어 줄바꿈(keep-all) 최적화, 버튼 사이즈 체계(`.rw-button--sm/lg/block/outline`) 추가, 그리드 1~4열 확장, 타이포그래피 h1~h6 및 인라인 텍스트 쇼케이스, 폼/체크박스/스위치/유효성 인터랙션 전면 개편, GitHub Pages 배포 동기화를 일괄 적용합니다.

**Spec:** `docs/superpowers/specs/2026-09-02-docs-showcase-fixes-design.md`

---

## Tasks

### Task 1: CSS 엔진 및 레이아웃 확장
- Modify: `scripts/build.js` (CSS Minifier 버그 수정 - 이미 수정 완료)
- Modify: `src/base.css` & `src/typography.css` (`word-break: keep-all;`)
- Modify: `src/elements.css` (버튼 사이즈: `--sm`, `--lg`, `--block`, `--outline`)
- Modify: `src/layout.css` (`.rw-grid-4`, `.rw-grid-1`)
- Modify: `.github/workflows/deploy-pages.yml` (`_site/docs` 배포 포함)

- [ ] **Step 1: `src/base.css` 및 `src/typography.css`에 `word-break: keep-all;` 적용**
- [ ] **Step 2: `src/elements.css`에 버튼 크기(`.rw-button--sm`, `.rw-button--lg`, `.rw-button--block`, `.rw-button--outline`) 추가**
- [ ] **Step 3: `src/layout.css`에 `.rw-grid-4`, `.rw-grid-1` 추가**
- [ ] **Step 4: `.github/workflows/deploy-pages.yml`에 `_site/docs` 디렉터리 복사 추가**

---

### Task 2: 공식 문서 웹사이트 (`docs/index.html`, `examples/docs.html`) 전면 개편
- Modify: `docs/index.html`
- Modify: `examples/docs.html`

- [ ] **Step 1: 4대 제어 속성 테이블에 `white-space: nowrap;` 및 고정 열 너비 적용**
- [ ] **Step 2: '퓨어 페이퍼 테마 듀오'를 실제 테마 배경과 UI 요소가 담긴 실물 카드 형태로 전면 개편**
- [ ] **Step 3: 그리드 섹션에 1열, 2열, 3열, 4열, Auto-fit 그리드 라이브 데모 및 코드 추가**
- [ ] **Step 4: 타이포그래피 섹션에 h1~h6 (rem 표기) 및 인라인 텍스트(`kbd`, `mark`, `del`, `ins`, `samp`) 쇼케이스 추가**
- [ ] **Step 5: 버튼 섹션에 크기(Small, Default, Large, Block, Outline) 라이브 데모 및 코드 추가**
- [ ] **Step 6: 체크박스, 라디오, 토글 스위치, Valid/Invalid 폼 데모 인터랙션 및 스타일링 점검**

---

### Task 3: 정량 검증, 리빌드 및 커밋/푸시
- [ ] **Step 1: `npm run build` 및 `npm test` 실행**
- [ ] **Step 2: `CHANGELOG.md` 갱신**
- [ ] **Step 3: 커밋 및 `origin/main` 푸시**
