# Live Interactive Mode Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Readwell CSS 예제 및 카탈로그 페이지에서 방문자가 Surface, Density, E-Ink 모드를 브라우저 상에서 실시간으로 전환할 수 있는 제로-의존성 플로팅 스위처 위젯 구현

**Architecture:** 바닐라 JavaScript(`examples/switcher.js`)가 DOM 마운트 시 플로팅 위젯을 렌더링하고, 사용자 입력에 따라 `document.body.dataset` 속성을 동적으로 갱신하며 `localStorage`에 상태를 동기화. 스타일(`examples/switcher.css`)은 Readwell 토큰만을 활용.

**Tech Stack:** Vanilla JavaScript (ES6+), Pure CSS3 (Readwell Tokens), HTML5

**Spec:** [docs/superpowers/specs/2026-09-02-live-mode-switcher-design.md](file:///d:/Projects/Private/readwell-css/docs/superpowers/specs/2026-09-02-live-mode-switcher-design.md)

## Global Constraints

- 코어 CSS 라이브러리(`src/`)는 절대 수정하지 않으며 모든 코드는 `examples/` 내에 격리
- 외부 JS 라이브러리나 폰트/아이콘 에셋 의존성 0 (Zero runtime dependency)
- 모든 파일 I/O는 UTF-8 인코딩 및 POSIX LF 줄바꿈 적용
- 선택한 설정은 `localStorage`(`readwell_preview_settings`)에 자동 보존

---

### Task 1: 플로팅 스위처 스타일 및 스크립트 작성 (`examples/switcher.css`, `examples/switcher.js`)

**Files:**
- Create: `examples/switcher.css`
- Create: `examples/switcher.js`

**Interfaces:**
- Produces: `initReadwellSwitcher()` 자동 실행, `document.body.dataset.rwSurface`, `document.body.dataset.rwDensity`, `document.body.dataset.rwEink` 실시간 조작 UI

- [x] **Step 1: Write `examples/switcher.css`**
  - 플로팅 트리거 버튼(`.rw-switcher-toggle`) 및 팝오버 컨테이너(`.rw-switcher-panel`) 스타일링
  - Readwell 토큰(`--rw-paper-2`, `--rw-line`, `--rw-line-strong`, `--rw-primary`, `--rw-radius`, `--rw-space-*`) 활용
  - 모바일 반응형 뷰포트 고려

- [x] **Step 2: Write `examples/switcher.js`**
  - 현재 `document.body`의 `data-rw-surface`, `data-rw-density`, `data-rw-eink` 감지
  - UI 렌더링 함수 작성 (Trigger Button, Panel, Surface Chips, Density Buttons, E-Ink Switch, Reset)
  - 속성 변경 시 `document.body.dataset` 갱신 및 `localStorage` 저장/로드
  - 이벤트 리스너 바인딩 (Toggle 열기/닫기, 외부 클릭 시 닫기, Esc 키 감지)

- [x] **Step 3: Commit**
```bash
git add examples/switcher.css examples/switcher.js
git commit -m "feat(examples): add live mode switcher widget script and styles"
```

---

### Task 2: 모든 예제 및 쇼케이스 페이지 연동 (`examples/*.html`)

**Files:**
- Modify: `examples/index.html`
- Modify: `examples/components.html`
- Modify: `examples/article.html`
- Modify: `examples/workspace.html`
- Modify: `examples/community.html`
- Modify: `examples/dashboard.html`
- Modify: `examples/issues.html`

**Interfaces:**
- Consumes: `examples/switcher.css`, `examples/switcher.js`

- [x] **Step 1: Add `<link rel="stylesheet" href="switcher.css">` and `<script src="switcher.js" defer></script>` to all 7 HTML files in `examples/`**
- [x] **Step 2: Verify all 7 pages load cleanly with no console errors**
- [x] **Step 3: Commit**
```bash
git add examples/*.html
git commit -m "feat(examples): integrate live mode switcher into all example pages"
```

---

### Task 3: 빌드 및 자동화 검증, GitHub Actions 연동 확인

**Files:**
- Test: `scripts/test-build.js`
- Verify: `.github/workflows/deploy-pages.yml`

- [x] **Step 1: Run `npm run build` and `npm test` to ensure core CSS build is unaffected**
- [x] **Step 2: Verify `_site` assembly step copies `examples/switcher.js` and `examples/switcher.css`**
- [x] **Step 3: Commit & Push to `feature/live-mode-switcher`**
```bash
git push -u origin feature/live-mode-switcher
```
