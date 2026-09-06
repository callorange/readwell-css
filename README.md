# Readwell Monorepo (리드웰 생태계)

> **E-Ink의 절제미와 동양 수묵화의 농담(濃淡) 미학을 아우르는 저자극 순수 CSS 프레임워크 생태계**

[![readwell-css](https://img.shields.io/npm/v/readwell-css.svg?label=readwell-css)](https://www.npmjs.com/package/readwell-css)
[![sumi-css](https://img.shields.io/npm/v/sumi-css.svg?label=sumi-css)](https://www.npmjs.com/package/sumi-css)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](package.json)

---

## 🌐 Live Demo & Documentation Portal

GitHub Pages에 배포된 통합 포털과 각 패키지의 라이브 데모를 직접 체험하실 수 있습니다:

- 🏛️ **[통합 포털 허브 (Ecosystem Portal)](https://callorange.github.io/readwell-css/)**: Readwell CSS와 Sumi CSS의 철학과 프리뷰를 한눈에 볼 수 있는 공식 대문
- 📖 **[Readwell CSS 데모 & 문서 포털](https://callorange.github.io/readwell-css/readwell/)**: 4대 레이아웃 아키타입, E-Ink 모드, 컴포넌트 키친싱크 및 인터랙티브 문서
- 🖌️ **[Sumi CSS 쇼케이스 & 플레이그라운드](https://callorange.github.io/readwell-css/sumi/)**: 화선지 캔버스 질감, 5종 서예 콜아웃, 2x2 전각 직인, 수묵 슬라이더/스피너 라이브 무대

---

## ⚖️ 2대 독립 패키지 선택 가이드 (Package Matrix)

Readwell 모노레포는 목적과 미학이 명확히 구별되는 **2개의 독립 Zero-dependency 순수 CSS 패키지**로 구성되어 있습니다.

| 구분 | 📖 `readwell-css` (v0.2.1) | 🖌️ `sumi-css` (v0.1.0) |
| :--- | :--- | :--- |
| **조형 철학** | **E-Ink 디스플레이 & 절제된 페이퍼 미학** | **동양 전통 서예 & 수묵화(水墨畵) 미학** |
| **핵심 용도** | 클래스리스 & 시맨틱 CSS, 장문 기술 문서, 워크스페이스, 백오피스 | 동양 미학 테마 디자인 시스템, 서예 조판, 문화·학술·프리미엄 쇼케이스 |
| **종이 및 테마** | 백상지(`Light 📄`), 단행본 크림지(`Warm 📖`), 먹빛 흑연(`Dark 🌙`) | 닥나무 화선지(宣紙) 텍스처, 야간 사경(寫經) 흑지(`Dark`) |
| **시그니처 컴포넌트** | 4대 레이아웃(`reading`, `docs`, `workspace`, `fluid`), Tufte 사이드노트, 모달, 아코디언, 탭, 스위처 | 뷰포트 고정 화선지 캔버스, 5종 서예 콜아웃 프레임, 2x2 전각 직인(Chop), 갈필 프로그레스, 3종 슬라이더, 비백호·원상 스피너 |
| **렌더링 엔진** | 100% 순수 CSS3 (@layer, CSS 커스텀 프로퍼티) | 비트맵(WebP/PNG) & 차세대 벡터 SVG 듀얼 렌더링 엔진 |
| **접근성 (A11y)** | 시맨틱 HTML5 태그 중심, 고대비 모드, 전자종이 정적 모드(`data-rw-eink`) | CJK 엄격 줄바꿈(`line-break: strict`), 전각 직인 `role="img"`, 고대비 링 |
| **독자 네임스페이스** | `data-rw-*`, `.rw-*` | `data-sumi-*`, `.sumi-*`, `--sumi-*` |
| **npm 패키지** | [`npm install readwell-css`](https://www.npmjs.com/package/readwell-css) | [`npm install sumi-css`](https://www.npmjs.com/package/sumi-css) |
| **소스 디렉터리** | [`packages/readwell-css`](packages/readwell-css) | [`packages/sumi-css`](packages/sumi-css) |

---

## 🚀 빠른 시작 (Quick Start)

### 1. 패키지 설치

프로젝트 용도에 맞는 패키지를 선택하여 설치합니다:

```bash
# E-Ink 영감의 가독성 & 프로덕트 UI
npm install readwell-css

# 동양 전통 서예 & 수묵화 디자인 시스템
npm install sumi-css
```

### 2. 프로젝트에서 불러오기

#### 번들러 환경 (Vite, Next.js, Webpack, Nuxt 등)
```javascript
// Readwell CSS
import 'readwell-css';
// import 'readwell-css/min';

// Sumi CSS
import 'sumi-css';
// import 'sumi-css/min';
```

#### HTML 직접 링크 (CDN)
```html
<!-- Readwell CSS CDN 링크 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/readwell-css@0.2.1/dist/readwell.min.css">

<!-- Sumi CSS CDN 링크 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sumi-css@0.1.0/dist/sumi.min.css">
```

---

## 📂 리포지토리 및 모노레포 구조 (Repository Structure)

본 프로젝트는 npm workspaces 기반의 대칭 모노레포로 구성되어 있습니다.

```
readwell-css/
├── packages/
│   ├── readwell-css/            # 📖 E-Ink 클래스리스 & 시맨틱 CSS 프레임워크 (v0.2.1)
│   │   ├── dist/                # 빌드 아티팩트 (readwell.css, readwell.min.css, 소스맵)
│   │   ├── src/                 # 12개 모듈별 CSS 소스 (@layer 기반)
│   │   ├── examples/            # 8종 실사용 예제 템플릿 및 문서 포털
│   │   └── README.md            # 패키지 공식 설명서
│   │
│   └── sumi-css/                # 🖌️ 동양 서예 & 수묵화 디자인 시스템 (v0.1.0)
│       ├── dist/                # 빌드 아티팩트 (sumi.css, sumi.min.css, 에셋, 소스맵)
│       ├── src/                 # 13개 모듈별 CSS 소스 (@layer 기반)
│       ├── assets/              # 64종 수묵 그래픽 원본 에셋 (WebP/PNG/JPG/SVG)
│       ├── examples/            # 수묵 테마 쇼케이스 & 인터랙티브 플레이그라운드
│       └── README.md            # 패키지 공식 설명서
│
├── docs/                        # 📚 도메인별 분리된 상세 설계 및 기획 문서
│   ├── readwell/                # Readwell 설계 문서 (PRD, 아키텍처, 디자인시스템 등)
│   └── sumi/                    # Sumi 기획 문서 (서예 철학, 에셋 인벤토리, 듀얼 엔진 등)
│
├── site/                        # 🌐 GitHub Pages 배포용 통합 포털 정적 웹사이트
└── scripts/                     # 🛠️ Zero-dependency 모노레포 빌드, 개발서버, 테스트 러너
    ├── build-portal.js          # 통합 포털 조립 및 site/ 배포 동기화
    ├── dev-server.js            # 핫 리빌드를 지원하는 로컬 개발 서버
    └── test-all.js              # 전체 워크스페이스 무결성 E2E 테스트 러너
```

---

## 🛠️ 모노레포 개발 명령어 (Development Commands)

외부 도구(Lerna, Nx, Turborepo 등) 없이 순수 Node.js 네이티브 스크립트로 동작합니다.

```bash
# 1. 전체 워크스페이스 빌드 및 포털 동기화
npm run build

# 개별 패키지만 빌드
npm run build:readwell
npm run build:sumi
npm run build:portal

# 2. 통합 로컬 개발 서버 실행 (http://localhost:3000)
# 변경 감지 및 자동 핫 리빌드 지원
npm run dev

# 3. 전체 E2E 무결성 검증 테스트
npm test

# 개별 패키지 단위 테스트
npm run test:workspaces
```

---

## 📚 상세 설계 문서 (Architecture & Design Docs)

### 📖 Readwell CSS 설계 문서
- [01. 컨셉 문서 (Concept)](docs/readwell/01_CONCEPT.md)
- [02. 제품 요구사항 정의서 (PRD)](docs/readwell/02_PRD.md)
- [03. 디자인 시스템 명세 (Design System)](docs/readwell/03_DESIGN_SYSTEM.md)
- [04. CSS 아키텍처 가이드 (CSS Architecture)](docs/readwell/04_CSS_ARCHITECTURE.md)
- [08. 컴포넌트 스코프 명세 (Component Scope)](docs/readwell/08_COMPONENT_SCOPE.md)

### 🖌️ Sumi CSS 기획 문서
- [01. 서예 미학 철학 및 컨셉 (Concept)](docs/sumi/01_CONCEPT.md)
- [02. 수묵 디자인 시스템 명세 (Design System)](docs/sumi/02_DESIGN_SYSTEM.md)
- [03. 64종 그래픽 에셋 인벤토리 (Asset Inventory)](docs/sumi/03_ASSET_INVENTORY.md)
- [04. 듀얼 렌더링 엔진 및 조형 무결성 거버넌스 (Dual Engine)](docs/sumi/04_DUAL_ENGINE.md)

---

## 📄 라이선스 (License)

본 프로젝트는 [MIT License](LICENSE)에 따라 자유롭게 사용, 수정, 배포할 수 있습니다.
