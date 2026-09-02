# Readwell CSS 공식 문서 포털 (Docs Portal) 설계 명세서 (Spec)

## 1. 개요 및 목적 (Overview & Goals)
Pico CSS(`https://picocss.com/docs`) 스타일의 **공식 인터랙티브 문서 웹사이트(`docs/index.html` 및 `examples/docs.html`)**를 구축합니다.
Readwell CSS 자체의 시맨틱 토큰과 레이아웃 시스템을 100% 활용(Dogfooding)하며, 외부 프레임워크나 런타임 의존성 없이 순수 HTML/CSS/JS로 제작합니다.

### 성공 기준 (Success Criteria)
1. **반응형 2열 사이드바 레이아웃**: 좌측 스티키 목차 내비게이션 + 우측 본문 콘텐츠 영역.
2. **카테고리별 체계적 문서화**:
   - **시작하기 (Getting Started)**: 철학, 빠른 시작(CDN/NPM), 4대 제어 속성(`data-rw-*`), 테마 듀오(`Light` vs `Warm Paper`).
   - **레이아웃 (Layout)**: Container, Reading, Grid, Stack, Cluster, Sidebar Layout, App Shell.
   - **타이포그래피 & 콘텐츠 (Typography)**: Headings, Body, Blockquote, Code block, Table, Badge, Meta.
   - **폼 & 입력 (Forms & Inputs)**: Input, Textarea, Select, Custom Checkbox/Radio, Switch, Valid/Invalid 상태.
   - **컴포넌트 (Components)**: Button/Button Group, Card, Panel, Callout, Accordion, Modal, Tabs, Dropdown, Progress.
   - **제품 패턴 (Product Patterns)**: Stat Card, Summary Row, Empty State.
   - **모드 & 커스터마이징 (Modes)**: Surface Family, Density System, E-Ink Mode.
3. **각 컴포넌트별 3단 구성**:
   - [1] 설명 및 시맨틱 HTML 표준 가이드
   - [2] **라이브 인터랙티브 프리뷰 카드** (실제 렌더링 결과)
   - [3] **원클릭 복사 기능이 포함된 HTML 코드 블록 (`<pre><code>`)**
4. **Live Controls 연동**: 플로팅 모드 스위처(`examples/switcher.js`)가 활성화되어 실시간 테마/밀도/표면 전환 지원.
5. **Zero-Dependency 배포**: GitHub Pages(`https://callorange.github.io/readwell-css/docs/` 및 `https://callorange.github.io/readwell-css/examples/docs.html`)에서 즉시 서빙.

---

## 2. 정보 구조 (Information Architecture)

```text
Docs Portal (docs/index.html & examples/docs.html)
├── Header (Top Navigation: Brand, Version v0.1.0, Examples Hub link, GitHub link)
├── Layout (.rw-container.rw-sidebar-layout)
│   ├── Aside (Sticky Left Sidebar Navigation with category groups & smooth scroll links)
│   │   ├── 1. Getting Started (Overview, Quick Start, 4 Control Attributes, Theme Duo)
│   │   ├── 2. Layout (Container, Reading, Grid, Stack, Cluster, Sidebar)
│   │   ├── 3. Typography & Content (Headings, Paragraphs, Blockquote, Code, Tables, Badges)
│   │   ├── 4. Forms & Validation (Inputs, Custom Checkbox/Radio, Switch, Valid/Invalid)
│   │   ├── 5. Components (Buttons, Cards, Panels, Callouts, Accordion, Modal, Tabs, Dropdown)
│   │   ├── 6. Product Patterns (Stat Cards, Summary Row, Empty State)
│   │   └── 7. Modes & Customization (Surface, Density, E-Ink)
│   └── Main (Content Area with Sections, Live Demos, Code Blocks & Copy Buttons)
└── Footer (License, Copyright, Back to Top)
```

---

## 3. UI/UX 세부 사양 (Detailed UI/UX Specifications)

### 3.1 스티키 사이드바 (Sticky Sidebar)
- `position: sticky; top: 1.5rem; max-height: calc(100vh - 3rem); overflow-y: auto;`
- Readwell `.rw-nav` 및 `.rw-stack`을 활용한 깔끔한 카테고리 링크 구성.
- 현재 보고 있는 섹션으로 부드럽게 이동하는 스크롤 앵커 연동.

### 3.2 컴포넌트 카드 구조 (Component Showcase Card)
각 컴포넌트는 다음과 같은 표준 카드로 제공됩니다:
```html
<section id="components-button" class="rw-card rw-stack">
  <div class="rw-cluster" style="justify-content: space-between;">
    <h3>Button (버튼)</h3>
    <span class="rw-badge rw-badge--primary">Element</span>
  </div>
  <p class="rw-meta">기본 버튼 및 Semantic Action 버튼입니다.</p>

  <!-- 1. Live Preview Card -->
  <div class="rw-panel rw-stack" style="background-color: var(--rw-paper-2);">
    <div class="rw-cluster" style="gap: 0.75rem;">
      <button type="button">Default</button>
      <button type="button" class="rw-button--primary">Primary</button>
      <button type="button" class="rw-button--secondary">Secondary</button>
      <button type="button" class="rw-button--danger">Danger</button>
    </div>
  </div>

  <!-- 2. Code Block with Copy Button -->
  <div class="docs-code-wrap" style="position: relative;">
    <button class="docs-copy-btn" onclick="copyCode(this)" aria-label="Copy Code">복사</button>
    <pre><code>&lt;button type="button"&gt;Default&lt;/button&gt;
&lt;button type="button" class="rw-button--primary"&gt;Primary&lt;/button&gt;</code></pre>
  </div>
</section>
```

### 3.3 원클릭 복사 스크립트 (Copy Code Script)
- 가벼운 인라인 자바스크립트(`navigator.clipboard.writeText`)를 통해 코드 블록의 내용을 클립보드에 복사하고, 버튼 텍스트를 1.5초간 `✓ 복사됨`으로 전환.

---

## 4. 파일 생성 및 수정 계획 (File Changes)

1. **신규 생성**:
   - `docs/index.html`: 공식 문서 메인 포털 페이지 (루트 접근 및 GitHub Pages 서빙용)
   - `examples/docs.html`: 예제 허브와 동일한 경로에서 바로 접근할 수 있는 동기화 문서 포털
2. **연동 수정**:
   - `examples/index.html`: 상단 내비게이션 및 카드 링크에 '📖 공식 문서 포털(Docs)' 배너/버튼 추가.
   - `README.md`: 문서 링크 목록 최상단에 공식 문서 포털(`https://callorange.github.io/readwell-css/docs/`) 링크 강조.
   - `CHANGELOG.md`: 공식 문서 포털 신설 기록 추가.

---

## 5. 검증 계획 (Verification Plan)
- `npm test` 및 `npm run build` 정량 검증 통과.
- 로컬 개발 서버(`npm run dev`)에서 스티키 사이드바 동작, 실시간 모드 스위처 연동, 원클릭 코드 복사 기능 수동 점검.
