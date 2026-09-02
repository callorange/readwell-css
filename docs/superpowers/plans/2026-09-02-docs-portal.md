# Readwell CSS 공식 문서 포털 (Docs Portal) 구현 계획서 (Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pico CSS 스타일의 Zero-Dependency 공식 인터랙티브 문서 포털 웹사이트(`docs/index.html` 및 `examples/docs.html`)를 구축하고, 라이브 프리뷰, 원클릭 코드 복사, 스티키 사이드바, 실시간 모드 스위처를 연동합니다.

**Spec:** `docs/superpowers/specs/2026-09-02-docs-portal-design.md`

**Architecture:**
- **Zero-Dependency Static HTML5/CSS3**: Readwell CSS 자체의 `.rw-sidebar-layout` 및 토큰 활용.
- **Interactive Features**: 원클릭 코드 복사 스크립트, 스티키 사이드바 스크롤 스파이, 플로팅 Live Controls 스위처 연동.
- **Demo & Pages Sync**: `examples/index.html`, `README.md`, `CHANGELOG.md` 동기화.

---

## Global Constraints
- **Zero Build Dependencies**: 별도의 외부 프레임워크 없이 순수 HTML/CSS/JS로 구현.
- **Pure Readwell Styling**: 문서 사이트 자체가 Readwell CSS의 가독성과 레이아웃 능력을 증명하는 쇼케이스.
- **UTF-8 인코딩**: 모든 입출력에 UTF-8 적용.

---

## Tasks

### Task 1: 공식 문서 포털 페이지 (`docs/index.html` 및 `examples/docs.html`) 작성

**Files:**
- Create: `docs/index.html`
- Create: `examples/docs.html`

- [ ] **Step 1: `docs/index.html` 생성**
  - 헤더: 브랜드, 버전 배지, GitHub 링크, 예제 허브 링크
  - 스티키 사이드바: 7대 카테고리 앵커 링크 목록
  - 본문 섹션:
    1. **Getting Started**: 개요, CDN/NPM 빠른 시작, 4대 제어 속성(`data-rw-*`), 테마 듀오(`Light` vs `Warm Paper`)
    2. **Layout**: Container, Reading, Grid(2, 3), Stack, Cluster, Sidebar Layout, App Shell
    3. **Typography & Content**: Headings, Paragraphs, Blockquote, Code Blocks, Tables, Badges, Meta
    4. **Forms & Validation**: Input, Textarea, Select, Checkbox, Radio, Switch, Valid(`aria-invalid="false"`)/Invalid(`aria-invalid="true"`)
    5. **Components**: Buttons, Button Groups, Card, Panel, Callout(4종), Accordion, Dialog/Modal, Tabs, Dropdown, Progress
    6. **Product Patterns**: Stat Card, Summary Row, Empty State
    7. **Modes & Customization**: Surface Family, Density System, E-Ink Mode
  - 각 컴포넌트마다 [설명 + 라이브 데모 박스 + 원클릭 복사 코드 블록] 탑재
  - 원클릭 코드 복사 JavaScript 내장
  - 실시간 Live Controls (`examples/switcher.js` / `examples/switcher.css`) 연동

- [ ] **Step 2: `examples/docs.html` 생성 (예제 디렉터리 경로 동기화)**

---

### Task 2: 내비게이션 및 링크 동기화

**Files:**
- Modify: `examples/index.html`
- Modify: `README.md`
- Modify: `docs/README.md`

- [ ] **Step 1: `examples/index.html` 상단 및 카드 목록에 공식 문서(Docs) 링크 추가**
- [ ] **Step 2: `README.md` 및 `docs/README.md`에 공식 문서 포털 링크 추가**

---

### Task 3: 정량 검증 및 CHANGELOG 동기화

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: `npm test` 및 `npm run build` 실행**
- [ ] **Step 2: `CHANGELOG.md` 갱신**
