# Mode Switcher UX 가이드 및 4대 제어 속성(`data-rw-*`) 문서화 Design Spec

## 1. 개요 (Overview)
Readwell CSS의 플로팅 인터랙티브 제어기(`Live Controls / Mode Switcher`)에 **한글 마이크로카피 및 실시간 설명 힌트(Live Hint Bar)**를 적용하고, **`README.md`·예제 허브(`examples/index.html`)·컴포넌트 카탈로그(`examples/components.html`)·디자인 시스템(`docs/03_DESIGN_SYSTEM.md`)**에 4대 제어 축(`data-rw-theme`, `data-rw-surface`, `data-rw-density`, `data-rw-eink`)의 개념과 사용법을 완벽히 동기화합니다.

---

## 2. 최근 커밋 반영 (Recent Commit Context)
1. **Light & Warm Paper 듀오 큐레이션 (`commit e6a36e2`)**:
   - 테마 모드는 `Light 📄` (내추럴 백상지)와 `Warm Paper 📖` (단행본 크림지) 2종으로 구성.
2. **컴포넌트 쇼케이스 인터랙션 (`commit d55801c`)**:
   - `components.html`에 추가된 커스텀 폼, 탭, 드롭다운, 버튼 그룹 활성 상태 등이 Mode Switcher 변경 시 즉각 반영되는 점을 안내.

---

## 3. 세부 설계 (Detailed Design)

### 3.1 Mode Switcher 위젯 UI/UX (`examples/switcher.js`, `examples/switcher.css`)
- **버튼 2줄 레이아웃 (영문 + 한글 서브타이틀)**:
  - `Light 📄` (백상지) / `Warm 📖` (미색지)
  - `Reading` (장문 독서) / `Workspace` (문서 협업) / `Dashboard` (운영 콘솔) / `Dense` (고밀도 표)
  - `Cozy` (여유) / `Comfortable` (표준) / `Compact` (밀집)
- **섹션 헤더 툴팁 (`title`)**:
  - `THEME MODE` (종이 질감 색온도)
  - `SURFACE FAMILY` (화면 용도별 레이아웃)
  - `DENSITY SYSTEM` (여백 및 컴포넌트 밀도)
  - `E-INK MODE` (전자종이 정적 렌더링)
- **실시간 설명 바 (`div.rw-switcher-hint`)**:
  - 마우스 호버(`mouseenter`) / 키보드 포커스(`focus`) 시 해당 항목의 역할과 효과 실시간 안내.
  - 포커스 해제(`mouseleave`/`blur`) 시 현재 활성화된 옵션 요약 안내로 복귀.

### 3.2 공식 문서화 (`README.md`)
- 4대 제어 속성(`data-rw-theme`, `data-rw-surface`, `data-rw-density`, `data-rw-eink`) 명세 표 및 실사용 HTML 마크업 예제 추가.

### 3.3 예제 및 카탈로그 안내 (`examples/index.html`, `examples/components.html`)
- 예제 허브 상단에 "💡 실시간 모드 제어 가이드" 안내 배너 카드 추가.
- 컴포넌트 카탈로그에 모드 연동 안내 추가.

### 3.4 디자인 시스템 및 CHANGELOG 동기화 (`docs/03_DESIGN_SYSTEM.md`, `CHANGELOG.md`)
- `docs/03_DESIGN_SYSTEM.md`에 `data-rw-*` 매핑 규칙 공식 반영.
- `CHANGELOG.md` `[Unreleased]`에 신규 기능 및 문서화 기록.
