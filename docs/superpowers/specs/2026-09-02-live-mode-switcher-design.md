# Live Interactive Mode Switcher Design Spec

## 1. 개요 (Overview)
Readwell CSS 데모 허브 및 예제 페이지(`examples/*.html`)에서 방문자가 별도의 CSS 수정이나 개발자 도구 조작 없이, 화면에 노출된 플로팅 제어기를 통해 **Surface (`reading`, `workspace`, `dashboard`, `dense`)**, **Density (`cozy`, `comfortable`, `compact`)**, **E-Ink 모드 (`true` / `false`)**를 실시간으로 즉시 전환하고 체감할 수 있는 인터랙티브 위젯을 구축합니다.

---

## 2. 요구사항 및 핵심 원칙 (Requirements & Core Principles)

### 2.1 제로 코어 오염 (Zero Core Pollution)
- 본 기능은 라이브러리 코어(`src/`)를 수정하지 않고, `examples/` 영역 내의 데모 전용 스크립트(`examples/switcher.js`) 및 스타일(`examples/switcher.css`)로 100% 격리 구현합니다.

### 2.2 순수 Readwell 디자인 토큰 스타일링 (Token-based UI)
- 외부 CSS 프레임워크나 외부 폰트/아이콘 라이브러리 없이, Readwell CSS의 CSS Custom Properties (`--rw-paper`, `--rw-paper-2`, `--rw-paper-3`, `--rw-line`, `--rw-primary`, `--rw-radius`, `--rw-font-sans` 등)만을 사용하여 프레임워크 고유의 단정한 룩앤필을 유지합니다.

### 2.3 제어 대상 속성 (Target Attributes)
1. **Surface Family (`document.body.dataset.rwSurface`)**:
   - `reading` (장문 독서/아티클)
   - `workspace` (문서 협업/도큐멘테이션)
   - `dashboard` (대시보드/운영 콘솔)
   - `dense` (고밀도 데이터 테이블)
2. **Density System (`document.body.dataset.rwDensity`)**:
   - `cozy` (넉넉한 행간 및 여백)
   - `comfortable` (균형 잡힌 표준 밀도)
   - `compact` (밀집된 데이터 뷰)
3. **E-Ink Mode (`document.body.dataset.rwEink`)**:
   - `true` (애니메이션/트랜지션 완전 차단 및 고대비 정적 모드)
   - `false` (기본값)
4. **Font Serif Toggle (Reading 표면용)**:
   - 본문 폰트를 명조/세리프(`--rw-font-serif`)와 산세리프(`--rw-font-sans`)로 전환.

### 2.4 상태 지속성 (State Persistence)
- `localStorage` 키 `readwell_preview_settings`를 통해 사용자가 변경한 설정을 저장하고 페이지 이동(`examples/*.html`) 시에도 자동 동기화.
- "초기화 (Reset to Default)" 버튼을 제공하여 페이지 원본 상태로 즉시 복원 가능.

---

## 3. UI/UX 레이아웃 설계

- **기본 상태 (Collapsed)**:
  - 화면 우측 하단(`position: fixed; bottom: 1.25rem; right: 1.25rem; z-index: 9999;`)에 단정한 플로팅 배지 버튼 (`⚙️ Mode Switcher` 또는 `✦ Controls`) 노출.
- **펼침 상태 (Expanded)**:
  - 부드러운 팝오버 패널 (`max-width: 320px`, `--rw-paper-2` 배경, `1px solid var(--rw-line)` 보더, 은은한 그림자 없는 단정함).
  - 헤더: `Readwell Live Controls` 타이틀 + 닫기(`✕`) 버튼.
  - 섹션 1: Surface 선택 (4개 버튼 칩 또는 라디오 그룹).
  - 섹션 2: Density 선택 (3개 세그먼트 버튼).
  - 섹션 3: E-Ink 토글 스위치 (`input[role="switch"]`).
  - 푸터: 초기화 버튼.

---

## 4. 파일 구성 및 연동 계획

1. `examples/switcher.css`: 플로팅 위젯의 레이아웃 및 팝오버 스타일.
2. `examples/switcher.js`: DOM 동적 생성, 이벤트 핸들러, `dataset` 조작 및 `localStorage` 관리.
3. `examples/index.html`, `components.html`, `article.html`, `workspace.html`, `community.html`, `dashboard.html`, `issues.html`:
   - `<link rel="stylesheet" href="switcher.css">` 및 `<script src="switcher.js" defer></script>` 추가.
