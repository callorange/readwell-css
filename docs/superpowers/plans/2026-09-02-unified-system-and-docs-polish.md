# Unified System & Docs Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 12칸 그리드 및 컬럼 스팬 유틸리티 추가, 체크박스 hover 버그 수정, 토글 스위치 모션 개선, 타이포그래피 굵기 태그 지원, `.rw-stack` & `.rw-meta` 라이브 데모 추가, 그리고 `examples/` 전 템플릿의 내비게이션/디자인 통일성을 완성합니다.

**Spec:** `docs/superpowers/specs/2026-09-02-unified-system-and-docs-polish.md`

---

## Tasks

### Task 1: CSS 프레임워크 코어 기능 확장 및 버그 수정
- Modify: `src/layout.css` (12열 그리드 `.rw-grid-12`, `.rw-grid-6`, 컬럼 스팬 `.rw-col-span-1`~`12`, `.rw-col-span-full`)
- Modify: `src/forms.css` (체크박스 `:checked:hover` 분리, 토글 스위치 `transform: translateX(1em)`)
- Modify: `src/typography.css` (폰트 굵기 유틸리티 `.rw-bold`, `.rw-semibold`, `.rw-normal`, `.rw-light`, `strong`, `b`, `em`, `i`)
- Modify: `src/utilities.css` (텍스트 강조 및 색상 유틸리티)

- [ ] **Step 1: `src/layout.css`에 12열 그리드 및 컬럼 스팬 유틸리티 추가**
- [ ] **Step 2: `src/forms.css`의 체크박스 hover 버그 수정 및 토글 스위치 transform 개선**
- [ ] **Step 3: `src/typography.css` 및 `src/utilities.css`에 텍스트 굵기 및 인라인 서식 추가**
- [ ] **Step 4: `npm run build`로 CSS 리빌드**

---

### Task 2: 공식 문서(`docs/index.html` 및 `examples/docs.html`) 전면 반영
- Modify: `docs/index.html`
- Modify: `examples/docs.html`

- [ ] **Step 1: 12-Column Grid & Column Spans 라이브 데모 및 코드 블록 추가**
- [ ] **Step 2: `.rw-stack` 전용 수직 흐름 라이브 데모 추가**
- [ ] **Step 3: 진하게(`strong`/`b`/`.rw-bold`), 연하게(`small`/`.rw-muted`), 이탤릭(`em`/`i`) 텍스트 서식 쇼케이스 추가**
- [ ] **Step 4: `.rw-meta` 전용 메타데이터 라이브 데모 추가**
- [ ] **Step 5: `node scripts/sync-docs.js`로 `examples/docs.html` 자동 동기화**

---

### Task 3: 전체 예제 템플릿(`examples/*`) 디자인 및 내비게이션 통일성 정돈
- Modify: `examples/index.html`
- Modify: `examples/components.html`
- Modify: `examples/article.html`
- Modify: `examples/workspace.html`
- Modify: `examples/community.html`
- Modify: `examples/dashboard.html`
- Modify: `examples/issues.html`

- [ ] **Step 1: 모든 예제 페이지의 상단 헤더에 통일된 Nav Bar (Docs / Hub / Kitchen Sink / GitHub) 적용**
- [ ] **Step 2: 모든 예제 페이지의 컴포넌트 렌더링 및 라이브 스위처 연동 확인**

---

### Task 4: 정량 검증 및 배포 커밋/푸시
- [ ] **Step 1: `npm test` 및 `npm run build` 정량 검증**
- [ ] **Step 2: `CHANGELOG.md` 갱신**
- [ ] **Step 3: `origin/main` 커밋 및 푸시**
