# Warm Sepia Night Dark Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 다크 모드의 색상 토큰을 탁한 올리브/머드 톤에서 눈이 편안하고 아늑한 웜 에스프레소 차콜 & 한지 아이보리 톤(Warm Sepia Night)으로 전면 리마스터

**Architecture:** `src/modes.css`의 다크 모드 토큰 정의를 수술적으로 교체하고, `scripts/build.js`로 단일 CSS 번들을 재생성하여 빌드 무결성 및 명도 대비 검증

**Tech Stack:** Pure CSS3 (`@layer modes`, CSS Custom Properties)

**Spec:** [docs/superpowers/specs/2026-09-02-warm-night-dark-mode-design.md](file:///d:/Projects/Private/readwell-css/docs/superpowers/specs/2026-09-02-warm-night-dark-mode-design.md)

## Global Constraints

- 코어 CSS 라이브러리의 무결성 유지 및 `@layer` 순서 준수
- 다크 모드 배경은 순수 블랙이나 칙칙한 녹색이 아닌 따뜻한 웜 차콜(#201e1b) 기반
- 텍스트는 눈부심을 억제한 부드러운 한지 아이보리(#dcd6cb) 기반
- 모든 Semantic Color는 WCAG AA 대비 기준 충족

---

### Task 1: 웜 나이트 토큰 리마스터 및 CSS 빌드 (`src/modes.css`)

**Files:**
- Modify: `src/modes.css`
- Test: `scripts/test-build.js`

**Interfaces:**
- Produces: 리마스터된 웜 세피아 다크 테마 토큰

- [x] **Step 1: Replace dark mode tokens in `src/modes.css` with Warm Sepia Night palette**
  - `--rw-paper: #201e1b;`, `--rw-paper-2: #272421;`, `--rw-paper-3: #322e2a;`
  - `--rw-text: #dcd6cb;`, `--rw-text-muted: #938d82;`
  - `--rw-line: #3d3832;`, `--rw-line-strong: #5a534b;`, `--rw-focus: #6b8eae;`
  - 6종 Semantic Color Matrix (Primary, Secondary, Success, Warning, Danger, Info base/soft/strong) 교체

- [x] **Step 2: Run `npm run build` and `npm test`**
- [x] **Step 3: Commit**
```bash
git add src/modes.css
git commit -m "feat(css): remaster dark mode with warm sepia night palette"
```

---

### Task 2: 문서 갱신, 기술 감사 및 원격 푸시

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `docs/superpowers/plans/2026-09-02-warm-night-dark-mode.md`

- [x] **Step 1: Update `CHANGELOG.md`**
- [x] **Step 2: Dispatch Auditor subagent for technical audit**
- [x] **Step 3: Push to `feature/warm-night-dark-mode`**
```bash
git push -u origin feature/warm-night-dark-mode
```
