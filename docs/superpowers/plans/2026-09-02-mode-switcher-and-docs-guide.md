# Mode Switcher UI 및 4대 제어 속성(`data-rw-*`) 종합 가이드 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mode Switcher 플로팅 위젯에 2줄 마이크로카피 및 실시간 설명(Live Hint Bar)을 적용하고, README·예제 허브·컴포넌트 카탈로그·디자인 시스템 문서에 4대 제어 축(`data-rw-theme`, `data-rw-surface`, `data-rw-density`, `data-rw-eink`)의 개념과 사용법을 완벽히 동기화합니다.

**Recent Commit Context Consideration (최근 커밋 맥락 반영):**
- **Theme Curation (`commit e6a36e2`)**: 테마가 `Light 📄`(내추럴 백상지)와 `Warm Paper 📖`(단행본 크림지)의 듀오 페이퍼 시스템으로 정돈되었으므로, 이를 기준으로 정확한 설명과 힌트 문구를 제공합니다.
- **Component Showcase Enhancement (`commit d55801c`)**: `components.html`에 새로 추가된 커스텀 체크박스/라디오, 탭, 드롭다운, 버튼 그룹 활성 상태 등이 Surface/Density/E-Ink 모드 전환에 즉각 반응하도록 위젯과 문서 가이드를 연계합니다.

**Architecture:**
1. **위젯 계층 (`examples/switcher.js`, `examples/switcher.css`)**: 메타데이터 확장, 2줄 버튼 구조(`rw-btn-title` + `rw-btn-desc`), 마우스 호버/포커스 연동 실시간 안내 바(`rw-switcher-hint`) 및 웹 접근성(`title`, `aria-description`) 구축.
2. **문서 및 데모 계층 (`README.md`, `examples/index.html`, `examples/components.html`, `docs/03_DESIGN_SYSTEM.md`)**: 라이브러리 사용자를 위한 4대 제어 속성 표, 예제 허브 가이드 카드 및 컴포넌트 카탈로그 안내 추가.
3. **거버넌스 계층 (`CHANGELOG.md`)**: 기존 커밋 내역을 보존하며 `[Unreleased]`에 신규 변경 사항 기록.

**Tech Stack:** Vanilla JavaScript (ES Modules / IIFE), Pure CSS (Readwell Design Tokens), Markdown (GFM), Semantic HTML5.

---

## Global Constraints

- **Zero Core Pollution**: `src/` 라이브러리 코어를 건드리지 않고 `examples/` 및 `docs/`, `README.md`에서 완결.
- **Pure Readwell Token Styling**: 외부 라이브러리/아이콘/폰트 없이 Readwell CSS 변수(`--rw-paper`, `--rw-line`, `--rw-text-muted` 등)만 사용.
- **Accessibility (a11y)**: 키보드 포커스, 스크린 리더(`aria-label`, `aria-description`), 브라우저 네이티브 `title` 툴팁 지원.
- **UTF-8 인코딩**: 모든 파일 입출력 시 UTF-8 인코딩 적용.

---

## Tasks

### Task 1: Mode Switcher JS 메타데이터 확장 및 실시간 안내 바 구현

**Files:**
- Modify: `examples/switcher.js`

**Interfaces:**
- Consumes: Readwell dataset attributes (`data-rw-theme`, `data-rw-surface`, `data-rw-density`, `data-rw-eink`)
- Produces: Enhanced widget DOM with descriptive buttons and dynamic live hint update handlers.

- [ ] **Step 1: 메타데이터 배열 확장**
  `THEMES` (Light/Warm Duo 반영), `SURFACES`, `DENSITIES`, `EINK` 객체에 한글 서브 타이틀(`sub`)과 상세 설명(`desc`) 추가.
  ```javascript
  const THEMES = [
    { id: 'light', label: 'Light 📄', sub: '백상지', desc: '맑고 정갈한 기본 백색 종이 질감 테마' },
    { id: 'warm', label: 'Warm 📖', sub: '미색지', desc: '눈이 편안하고 따뜻한 장시간 독서용 크림톤 테마' }
  ];
  const SURFACES = [
    { id: 'reading', label: 'Reading', sub: '장문 독서', desc: '아티클·에세이에 최적화된 좁은 본문 폭과 편안한 행간' },
    { id: 'workspace', label: 'Workspace', sub: '문서 협업', desc: '사이드바와 본문 카드가 조화된 지식 문서·노션형 레이아웃' },
    { id: 'dashboard', label: 'Dashboard', sub: '운영 콘솔', desc: '지표 카드와 그리드 중심의 관리자 대시보드 레이아웃' },
    { id: 'dense', label: 'Dense', sub: '고밀도 표', desc: '데이터 테이블과 백오피스용 밀집 정보 뷰' }
  ];
  const DENSITIES = [
    { id: 'cozy', label: 'Cozy', sub: '여유', desc: '넉넉한 여백과 패딩으로 터치 및 편안한 읽기에 적합' },
    { id: 'comfortable', label: 'Comfortable', sub: '표준', desc: '균형 잡힌 기본 여백 및 컴포넌트 밀도' },
    { id: 'compact', label: 'Compact', sub: '밀집', desc: '여백을 줄여 한 화면에 많은 정보를 압축 표시' }
  ];
  ```

- [ ] **Step 2: DOM 렌더링 템플릿 개정**
  - 각 버튼에 `.rw-btn-title` 및 `.rw-btn-desc` 2줄 렌더링.
  - 각 섹션 헤더에 정보 뱃지/툴팁(`title`) 추가.
  - 패널 하단에 실시간 설명 바(`div.rw-switcher-hint#rw-switcher-hint`) 컨테이너 추가.

- [ ] **Step 3: 호버 및 포커스 이벤트 리스너 연동**
  - 마우스 `mouseenter` / `focus` 시 힌트 바에 해당 항목의 `desc` 표시.
  - `mouseleave` / `blur` 시 현재 활성화된 모드들의 종합 요약 텍스트로 복귀.

- [ ] **Step 4: 상태 저장/초기화 시 힌트 텍스트 동기화 검증**

---

### Task 2: Mode Switcher CSS 스타일링 개선

**Files:**
- Modify: `examples/switcher.css`

- [ ] **Step 1: 패널 너비 및 그리드 간격 최적화**
  `.rw-switcher-panel`의 너비를 `310px`로 조정하여 2줄 버튼이 답답하지 않게 표시되도록 수정.
- [ ] **Step 2: 2줄 버튼 내부 타이포그래피 스타일 정의**
  ```css
  .rw-switcher-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    padding: 0.4rem 0.35rem;
  }
  .rw-btn-title {
    font-size: 0.8rem;
    font-weight: 600;
  }
  .rw-btn-desc {
    font-size: 0.68rem;
    color: var(--rw-text-muted);
    font-weight: 400;
  }
  .rw-switcher-btn.is-active .rw-btn-desc {
    color: var(--rw-primary-strong);
    opacity: 0.85;
  }
  ```
- [ ] **Step 3: 실시간 힌트 바 (`.rw-switcher-hint`) 스타일링**
  ```css
  .rw-switcher-hint {
    padding: 0.5rem 0.65rem;
    font-size: 0.75rem;
    line-height: 1.4;
    background-color: var(--rw-paper-3);
    border: 1px solid var(--rw-line);
    border-radius: var(--rw-radius);
    color: var(--rw-text-muted);
    min-height: 2.8rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .rw-switcher-hint-icon {
    font-size: 0.85rem;
    flex-shrink: 0;
  }
  ```

---

### Task 3: `README.md`에 4대 제어 속성(`data-rw-*`) 가이드 추가

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 4대 제어 속성 명세 표 작성**
  - `data-rw-theme`: `light` (기본, 내추럴 백상지), `warm` (단행본 크림지)
  - `data-rw-surface`: `reading`, `workspace`, `dashboard`, `dense`
  - `data-rw-density`: `cozy`, `comfortable` (기본), `compact`
  - `data-rw-eink`: `true`, `false` (기본)
- [ ] **Step 2: 실사용 HTML 마크업 예제 추가**
  ```html
  <!-- 기술 블로그 / 장문 독서 (미색지 + 여유로운 밀도) -->
  <body data-rw-theme="warm" data-rw-surface="reading" data-rw-density="cozy">

  <!-- 백오피스 / 고밀도 데이터 관리 화면 -->
  <body data-rw-surface="dense" data-rw-density="compact">
  ```

---

### Task 4: 예제 허브 및 쇼케이스 안내 보강

**Files:**
- Modify: `examples/index.html`
- Modify: `examples/components.html`

- [ ] **Step 1: 예제 허브(`examples/index.html`)에 '실시간 모드 스위처 가이드' 카드 추가**
  - 허브 상단에 플로팅 모드 스위처(`⚙️ Mode Switcher`)의 존재와 4대 제어 축을 설명하는 안내 배너 카드 추가.
- [ ] **Step 2: 컴포넌트 카탈로그(`examples/components.html`) 안내 보강**
  - 사이드바 또는 상단 소개에 4대 모드 변경 시 컴포넌트들이 즉각적으로 어떻게 스타일 변화를 겪는지 안내 텍스트 보강.

---

### Task 5: 디자인 시스템 문서 및 `CHANGELOG.md` 동기화

**Files:**
- Modify: `docs/03_DESIGN_SYSTEM.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: `docs/03_DESIGN_SYSTEM.md` 속성 매핑 표 갱신**
- [ ] **Step 2: `CHANGELOG.md` `[Unreleased]`에 모드 스위처 UX 개선 및 설명 문서화 기록 (최근 커밋 내역 보존)**

---

### Task 6: 정량 검증 및 회귀 테스트

- [ ] **Step 1: 빌드 및 자동화 테스트 실행**
  ```bash
  npm test
  npm run build
  ```
- [ ] **Step 2: HTML/CSS 문법 및 렌더링 확인**
- [ ] **Step 3: Mode Switcher 브라우저 인터랙션 검증**
