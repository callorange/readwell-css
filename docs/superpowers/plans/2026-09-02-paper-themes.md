# Readwell CSS Paper Themes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Readwell CSS에 4대 페이퍼 테마(Light, Warm Paper, Sepia Vintage, Night Dark)를 구현하고 모드 스위처 및 전체 예제에 연동

**Architecture:** `src/modes.css`에 `[data-rw-theme="warm"]`, `[data-rw-theme="sepia"]`, `[data-rw-theme="dark"]` 규칙을 선언하고 `scripts/build.js`로 단일 CSS 번들로 컴파일. `examples/switcher.js`에 4대 테마 셀렉터를 연동.

**Tech Stack:** Pure CSS3 (`@layer modes`, CSS Custom Properties), Vanilla JavaScript

**Spec:** [docs/superpowers/specs/2026-09-02-paper-themes-design.md](file:///d:/Projects/Private/readwell-css/docs/superpowers/specs/2026-09-02-paper-themes-design.md)

## Global Constraints

- 코어 CSS 라이브러리의 무결성 유지 및 `@layer` 순서 준수
- 외부 의존성 없는 순수 CSS3 및 Vanilla JS 유지
- 모든 테마의 텍스트 대비비는 WCAG AA/AAA 기준 충족
- 모든 파일 I/O는 UTF-8 인코딩 및 POSIX LF 줄바꿈 적용

---

### Task 1: 4대 페이퍼 테마 CSS 토큰 구현 (`src/modes.css`)

**Files:**
- Modify: `src/modes.css`
- Test: `scripts/test-build.js`

**Interfaces:**
- Produces: `[data-rw-theme="warm"]`, `[data-rw-theme="sepia"]`, `[data-rw-theme="dark"]` 셀렉터 토큰

- [x] **Step 1: Update `src/modes.css` with Warm Paper and Sepia tokens alongside Dark mode**
  - `[data-rw-theme="warm"]`: 웜 크림지 페이퍼 토큰 및 시맨틱 매트릭스
  - `[data-rw-theme="sepia"]`: 빈티지 세피아 페이퍼 토큰 및 시맨틱 매트릭스
  - `[data-rw-theme="dark"]`: 웜 세피아 나이트 페이퍼 토큰 및 시맨틱 매트릭스
  - `@media (prefers-color-scheme: dark)`: `auto` 설정 시 OS 다크 모드 연동

- [x] **Step 2: Run `npm run build` and `npm test`**
- [x] **Step 3: Commit**
```bash
git add src/modes.css
git commit -m "feat(css): add warm paper and sepia vintage themes in modes.css"
```

---

### Task 2: 실시간 모드 스위처 4대 테마 제어기 연동 (`examples/switcher.js`, `examples/switcher.css`)

**Files:**
- Modify: `examples/switcher.js`
- Modify: `examples/switcher.css`

**Interfaces:**
- Consumes: `[data-rw-theme="auto|light|warm|sepia|dark"]`

- [x] **Step 1: Update `examples/switcher.js` with 4 paper themes (Light, Warm, Sepia, Dark, Auto)**
  - UI 칩 버튼 그룹 갱신 (`Light 📄`, `Warm 📖`, `Sepia 📜`, `Dark 🌙`, `Auto 💻`)
  - `localStorage` 저장/복원 및 `applyModes()` 연동

- [x] **Step 2: Update `examples/switcher.css` for 4/5-column grid layout**
- [x] **Step 3: Commit**
```bash
git add examples/switcher.js examples/switcher.css
git commit -m "feat(examples): support warm paper and sepia in live mode switcher"
```

---

### Task 3: 문서 갱신, 기술 감사 및 원격 푸시

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `README.md`
- Modify: `docs/superpowers/plans/2026-09-02-paper-themes.md`

- [x] **Step 1: Update `CHANGELOG.md` and `README.md`**
- [x] **Step 2: Dispatch Auditor subagent for technical audit**
- [x] **Step 3: Push to `feature/paper-themes`**
```bash
git push -u origin feature/paper-themes
```
