# Light & Warm Paper Curation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 세피아 및 다크 모드를 제거하고, 프레임워크 핵심인 2대 퓨어 페이퍼 테마(Light & Warm Paper)에 집중하도록 CSS 및 스위처 정리

**Architecture:** `src/modes.css`에서 `sepia`, `dark`, `@media (prefers-color-scheme: dark)`를 삭제하고 `warm` 테마만 유지. `examples/switcher.js` 및 `examples/switcher.css`를 2단 칩 버튼(`Light 📄`, `Warm 📖`)으로 간결화. `scripts/build.js`로 번들 재컴파일.

**Tech Stack:** Pure CSS3 (`@layer modes`), Vanilla JavaScript

**Spec:** [docs/superpowers/specs/2026-09-02-light-warm-only-design.md](file:///d:/Projects/Private/readwell-css/docs/superpowers/specs/2026-09-02-light-warm-only-design.md)

## Global Constraints

- 코어 CSS 라이브러리의 무결성 유지 및 `@layer` 순서 준수
- Light(기본)와 Warm Paper(`[data-rw-theme="warm"]`) 2대 테마만 유지
- 모든 파일 I/O는 UTF-8 인코딩 및 POSIX LF 줄바꿈 적용

---

### Task 1: CSS 모드 정리 (`src/modes.css`)

**Files:**
- Modify: `src/modes.css`
- Test: `scripts/test-build.js`

**Interfaces:**
- Produces: `[data-rw-theme="warm"]` 유지, 불필요한 다크/세피아 규칙 삭제

- [x] **Step 1: Edit `src/modes.css` to keep only `[data-rw-theme="warm"]`**
- [x] **Step 2: Run `npm run build` and `npm test`**
- [x] **Step 3: Commit**
```bash
git add src/modes.css
git commit -m "refactor(css): curate paper themes to Light and Warm Paper only"
```

---

### Task 2: 실시간 모드 스위처 2단 테마 제어기 간결화 (`examples/switcher.js`, `examples/switcher.css`)

**Files:**
- Modify: `examples/switcher.js`
- Modify: `examples/switcher.css`

**Interfaces:**
- Consumes: `[data-rw-theme="light|warm"]`

- [x] **Step 1: Update `examples/switcher.js` THEMES array to `Light 📄` and `Warm 📖`**
- [x] **Step 2: Update `examples/switcher.css` theme grid to 2-columns**
- [x] **Step 3: Commit**
```bash
git add examples/switcher.js examples/switcher.css
git commit -m "refactor(examples): streamline theme switcher to Light and Warm Paper"
```

---

### Task 3: 문서 갱신, 기술 감사 및 원격 푸시

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `README.md`
- Modify: `docs/superpowers/plans/2026-09-02-light-warm-only.md`

- [x] **Step 1: Update `CHANGELOG.md` and `README.md`**
- [x] **Step 2: Dispatch Auditor subagent for technical audit**
- [x] **Step 3: Push to `feature/light-warm-only`**
```bash
git push -u origin feature/light-warm-only
```
