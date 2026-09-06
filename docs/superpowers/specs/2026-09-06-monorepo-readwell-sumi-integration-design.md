# Readwell & Sumi 모노레포 통합 아키텍처 및 정식화 설계 명세서 (Design Spec)

- **문서 버전**: 1.0.0
- **작성일**: 2026-09-06
- **상태**: 승인됨 (Approved)
- **대상 저장소**: `readwell-css`

---

## 1. 배경 및 목적 (Background & Goals)

### 1.1 배경
`readwell-css`는 E-Ink 디스플레이에서 영감을 얻은 저자극·자연주의 클래스리스 및 시맨틱 순수 CSS 프레임워크로 출발했습니다.
이후 동양 전통 서예와 수묵화 미학을 현대 웹 기술로 승화시킨 `sumi` 테마가 `examples/sumi`에 구현되었으며, 3,964라인의 완성도 높은 CSS와 64종의 고유 그래픽 에셋(화선지 배경, 브러시 디바이더, 전각 직인, 수묵 스피너 등)을 갖추어 단순 예제를 넘어 독자적인 디자인 시스템이자 제품으로 성장했습니다.

### 1.2 핵심 목적
1. **`sumi-css`의 정식 제품 승격**: `examples/` 내 프로토타입 상태에서 정식 독립 CSS 프레임워크(`sumi-css`)로 분리 및 패키지화.
2. **동일 저장소 내 공존 관리**: 두 프레임워크를 단일 Git 저장소에서 효율적으로 함께 개발·유지보수할 수 있는 **대칭형 npm workspaces 모노레포** 구축.
3. **독자적 브랜드 및 무의존성 확립**: `sumi-css`가 `readwell-css`에 종속되지 않고 단독으로 완벽히 동작하는 Zero-dependency Standalone 프레임워크로 자립.
4. **거버넌스 및 자산 정돈**: 기획 문서(`docs/`), README, GitHub Pages 예제 허브를 체계적으로 정리하여 사용자 및 기여자의 혼선을 방지.

---

## 2. 핵심 설계 원칙 및 결정 사항 (Key Decisions)

| 항목 | 확정 결정 내용 | 배경 및 근거 |
| :--- | :--- | :--- |
| **패키징 구조** | **npm Workspaces 대칭 모노레포 (`packages/*`)** | 두 프레임워크의 컨셉이 완전히 상이하므로 동등한 위계의 독립 패키지로 관리 |
| **독립성 모델** | **완전 독립형 (Standalone)** | `sumi-css` 설치 시 `readwell-css` 없이 단독으로 Reset, 타이포그래피, 수묵 컴포넌트 전체 동작 |
| **클래스 네임스페이스** | **`.sumi-*` 및 `--sumi-*` 독자 체계 전면 개편** | 기존 프로토타입 접두사(`.rw-sumi-*`)를 탈피하여 완전한 독자 정체성 확립 |
| **빌드 파이프라인** | **패키지별 독립 Zero-Dependency 빌더** | 외부 무거운 번들러 없이 순수 Node.js 내장 모듈만으로 초고속 빌드 및 에셋 동기화 |
| **기획 문서 관리** | **`docs/readwell/`, `docs/sumi/` 네임스페이스 분리** | 공통 폴더(`shared/`) 선제 생성 없이 도메인별 기획 아카이브 분리. `guides/`는 기존 위치 유지 |
| **GitHub Pages** | **통합 포털 허브 + 서브패스 호스팅** | 루트(`/`)에서 두 프레임워크 선택 랜딩 제공, `/readwell/` 및 `/sumi/`로 데모 서빙 |
| **버전 및 CHANGELOG** | **루트 통합 SemVer + 패키지별 하위 섹션** | 기존 19KB의 풍부한 이력을 SSOT로 유지하면서 Keep a Changelog 표준 하위 섹션으로 패키지별 기록 |

---

## 3. 저장소 디렉터리 레이아웃 (Repository Layout)

```
readwell-css/ (Git Repository Root)
├── package.json                   # 루트 워크스페이스 정의 ("private": true, "version": "0.3.0")
├── README.md                      # 모노레포 통합 소개 및 두 패키지 선택 가이드
├── CHANGELOG.md                   # 루트 통합 변경 이력 (Keep a Changelog)
├── LICENSE                        # MIT License
├── AGENTS.md                      # 에이전트 거버넌스 및 규칙
│
├── docs/                          # 기획 및 명세 아카이브
│   ├── readwell/                  # Readwell 코어 기획 문서 (01_CONCEPT ~ 08_COMPONENT_SCOPE, PPTX)
│   │   ├── 01_CONCEPT.md
│   │   ├── 02_PRD.md
│   │   ├── 03_DESIGN_SYSTEM.md
│   │   ├── 04_CSS_ARCHITECTURE.md
│   │   ├── 05_IMPLEMENTATION_PLAN.md
│   │   ├── 06_CHROME_EXTENSION_PLAN.md
│   │   ├── 07_MVP_CHECKLIST.md
│   │   ├── 08_COMPONENT_SCOPE.md
│   │   └── Readwell_CSS_Concept_Deck_v2.pptx
│   ├── sumi/                      # Sumi 기획 및 디자인 시스템 명세
│   │   ├── 01_CONCEPT.md          # 네이밍 배경, 여백지미, 흑백농담 철학
│   │   ├── 02_DESIGN_SYSTEM.md    # 수묵 계조표, 콜아웃 슬라이스, 전각 도장, 스피너
│   │   ├── 03_ASSET_INVENTORY.md  # 64종 그래픽 에셋 규격 및 용량
│   │   └── 04_DUAL_ENGINE.md      # 비트맵 vs SVG 듀얼 렌더링 엔진 명세
│   └── superpowers/               # superpowers 스펙 및 계획 아카이브
│
├── guides/                        # 가이드 문서 (기존 위치 유지)
│   ├── README.md
│   └── prompt-context-engineering.md
│
├── packages/
│   ├── readwell-css/              # Readwell 코어 패키지
│   │   ├── package.json           # name: "readwell-css", version: "0.2.1"
│   │   ├── README.md              # E-Ink 클래스리스/시맨틱 CSS 공식 설명서
│   │   ├── src/                   # index.css, tokens.css, base.css, components.css, ...
│   │   ├── dist/                  # readwell.css, readwell.min.css, .map
│   │   ├── scripts/               # build.js, test.js
│   │   └── examples/              # Readwell 전용 쇼케이스 (reading, docs, workspace 등)
│   │
│   └── sumi-css/                  # 신규 정식 승격 Sumi 패키지
│       ├── package.json           # name: "sumi-css", version: "0.1.0"
│       ├── README.md              # 수묵 미학 디자인 시스템 공식 설명서
│       ├── assets/                # 64종 원본 그래픽 에셋 (WebP 우선 + PNG 폴백)
│       ├── src/                   # 모듈화된 sumi 소스 CSS
│       │   ├── index.css          # 엔트리포인트 (@import, @layer 선언)
│       │   ├── tokens.css         # 수묵 계조 팔레트 (농·중·담·연묵, 주사, 금묵) & 다크모드
│       │   ├── reset.css          # 독립 실행을 위한 경량 CSS 리셋
│       │   ├── base.css           # 화선지 캔버스 고정 배경 및 기본 타이포 기반
│       │   ├── typography.css     # 서예 명조/고딕, 기필 드롭캡 (.sumi-dropcap)
│       │   ├── layout.css         # 3단 반응형 수묵 레이아웃 (.sumi-layout)
│       │   ├── components/        # 수묵 전용 시각 컴포넌트
│       │   │   ├── callout.css    # 5종 콜아웃 프레임 (border-image-slice)
│       │   │   ├── chop.css       # 전각 직인 도장 (.sumi-seal-chop, 6종 변형)
│       │   │   ├── progress.css   # 12px 슬림 갈필 프로그레스 바
│       │   │   ├── slider.css     # 문방사우 인터랙티브 슬라이더 3종
│       │   │   ├── spinner.css    # 비백호 & 원상 수묵 스피너 (7종 동세)
│       │   │   ├── colophon.css   # 전통 서첩 발문 저자 서명란
│       │   │   └── code.css       # 문방사우 코드 신택스 하이라이팅
│       │   └── utilities.css      # 여백 및 헬퍼 유틸리티
│       ├── dist/                  # sumi.css, sumi.min.css, .map, dist/assets/*
│       ├── scripts/               # build.js (CSS 번들링 + 에셋 무손실 복사)
│       └── examples/              # Sumi 전용 데모 및 인터랙티브 쇼케이스
│
└── scripts/                       # 모노레포 오케스트레이션 도구
    ├── dev-server.js              # 통합 로컬 개발 서버 (포털 + 패키지별 핫 리빌드)
    ├── build-portal.js            # GitHub Pages 통합 웹사이트 조립 스크립트
    └── test-all.js                # 전체 워크스페이스 무결성 검증
```

---

## 4. `sumi-css` 패키지 상세 명세

### 4.1 네임스페이스 및 API 전환 (Migration Mapping)
독립 패키지화에 따라 기존 임시 클래스명을 정식 `.sumi-*` 네임스페이스로 개편합니다.

| 기존 프로토타입 명칭 | 신규 정식 명칭 | 설명 |
| :--- | :--- | :--- |
| `.rw-sumi-layout` | `.sumi-layout` | 3단 반응형 레이아웃 컨테이너 |
| `.rw-sumi-hanji-canvas` | `.sumi-hanji-canvas` | 뷰포트 고정형 천연 닥나무 화선지 배경 |
| `.rw-sumi-sidebar` / `.rw-sumi-content` | `.sumi-sidebar` / `.sumi-content` | 사이드바 및 본문 아티클 영역 |
| `.rw-callout-ink-box` | `.sumi-callout` | 수묵 브러시 프레임 콜아웃 |
| `.rw-seal-chop` | `.sumi-seal-chop` | 순수 CSS 전각 직인 도장 컴포넌트 |
| `.rw-sumi-progress` | `.sumi-progress` | 12px 수묵 갈필 진행률 표시줄 |
| `.rw-sumi-slider-box` | `.sumi-slider` | 문방사우 슬라이더 컨테이너 |
| `.rw-sumi-spinner` | `.sumi-spinner` | 비백호/원상 원형 붓터치 스피너 |
| `.rw-sumi-colophon` | `.sumi-colophon` | 서첩 발문 저자 서명란 |
| `--rw-sumi-*` | `--sumi-*` | 수묵 팔레트 CSS 토큰 (`--sumi-ink`, `--sumi-paper` 등) |

### 4.2 에셋 관리 및 번들링
- `packages/sumi-css/assets/`에 포함된 64개 그래픽 에셋(화선지 WebP/JPG, 브러시 디바이더, 전각 직인, 스피너 마스크 등)을 빌드 시 `dist/assets/`로 무손실 복사.
- `dist/sumi.css` 내부의 모든 이미지 참조는 `url("./assets/...")` 상대 경로를 유지하여 번들러 및 정적 환경에서 원활히 탐색되도록 보장.
- 브라우저 호환성을 위한 WebP 1순위, PNG/JPG 2순위 `image-set()` 폴백 구조 유지.

---

## 5. 빌드 및 개발 파이프라인 (Build & Dev Pipeline)

### 5.1 루트 `package.json` 명세
```json
{
  "name": "readwell-monorepo",
  "version": "0.3.0",
  "private": true,
  "type": "module",
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "npm run build --workspaces && node scripts/build-portal.js",
    "build:readwell": "npm run build --workspace=readwell-css",
    "build:sumi": "npm run build --workspace=sumi-css",
    "build:portal": "node scripts/build-portal.js",
    "test": "npm run test --workspaces",
    "dev": "node scripts/dev-server.js"
  }
}
```

### 5.2 패키지별 독립 빌드
1. **`readwell-css`**:
   - `packages/readwell-css/scripts/build.js`
   - 순수 Node.js 빌더: `@import` 결합 → `safeMinifyCSS` 압축 → Source Map 생성.
2. **`sumi-css`**:
   - `packages/sumi-css/scripts/build.js`
   - 순수 Node.js 빌더: `@import` 결합 → `safeMinifyCSS` 압축 → Source Map 생성 → `assets/` to `dist/assets/` 무손실 복사.

### 5.3 통합 로컬 개발 서버 (`scripts/dev-server.js`)
- `http://localhost:3000` 단일 포트 서빙:
  - `/`: 통합 포털 허브
  - `/readwell/`: Readwell 예제 및 문서
  - `/sumi/`: Sumi 수묵 인터랙티브 쇼케이스
- 파일 감시(Watch) 및 변경 감지 시 해당 패키지만 선택적으로 10ms 단위 핫 리빌드.

---

## 6. 문서화, README 및 GitHub Pages 배포 전략

### 6.1 README 개편 계층
1. **루트 `README.md`**:
   - 모노레포 안내, 두 프레임워크의 컨셉 및 선택 가이드 (E-Ink 미니멀 vs 동양 수묵 미학).
   - 각 패키지 상세 README 및 라이브 데모 바로가기 링크.
   - 로컬 개발 및 빌드 명령어 가이드.
2. **`packages/readwell-css/README.md`**:
   - E-Ink 시맨틱 프레임워크 공식 문서, 4대 제어 속성(`data-rw-*`), 설치법(`npm i readwell-css`).
3. **`packages/sumi-css/README.md`**:
   - 동양 서예/수묵화 디자인 시스템 공식 명세서, 설치법(`npm i sumi-css`), 수묵 계조 체계, 컴포넌트 API.

### 6.2 기획 문서 재배치
- `docs/01_CONCEPT.md` ~ `08_COMPONENT_SCOPE.md` 및 PPTX 파일을 `docs/readwell/`로 이관.
- `examples/sumi/README.md`, `IMPLEMENTATION_PLAN.md`를 정리하여 `docs/sumi/`로 이관.
- `guides/`는 프롬프트 엔지니어링 가이드로서 현재 경로 유지.
- 불필요한 `shared/` 폴더는 생성하지 않음.

### 6.3 GitHub Pages 통합 포털 (`scripts/build-portal.js`)
- 배포 타겟 디렉터리(`dist-site/` 또는 `docs/` 정적 서빙):
  - 루트 `index.html`: 두 프레임워크를 우아하게 소개하는 대문 포털 랜딩 페이지.
  - `/readwell/`: `packages/readwell-css`의 `dist/`, `examples/`가 통합 호스팅됨.
  - `/sumi/`: `packages/sumi-css`의 `dist/`, `assets/`, `examples/`가 통합 호스팅됨.
- 링크 깨짐 제로를 위한 경로 치환 및 정적 검증 자동화.

---

## 7. 검증 및 롤백 계획 (Verification & Safety)

### 7.1 자동화 검증
- **빌드 무결성 검증**: `npm run build` 실행 시 두 패키지의 `dist/` 파일 생성 여부, 용량, Source Map 유효성 체크.
- **에셋 링크 무결성 검증**: `sumi.css` 내의 모든 `url(...)` 참조 경로가 `dist/assets/` 내 실제 파일과 100% 일치하는지 정적 검사.
- **CSS 구문 검증**: 빌드된 minified 및 원본 CSS의 문법 에러 여부 확인.

### 7.2 안전한 단계별 마이그레이션
1. 새 디렉터리 구조 스캐폴딩 (`packages/readwell-css`, `packages/sumi-css`, `docs/readwell`, `docs/sumi`).
2. 파일 이동 시 Git 히스토리 보존을 위해 `git mv` 명령 사용.
3. 빌드 및 테스트 스크립트 구축 후 로컬 검증 완료 전까지 기존 브랜치 상태 보존.
