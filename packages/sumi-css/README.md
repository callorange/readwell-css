# Sumi CSS (수묵 CSS)

> **동양 전통 서예와 수묵화 미학을 계승한 장문 독서 및 기술 문서 특화 순수 CSS 프레임워크**

[![npm version](https://img.shields.io/npm/v/sumi-css.svg)](https://www.npmjs.com/package/sumi-css)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](package.json)

🌐 **[Sumi CSS Live Showcase 보러가기](https://callorange.github.io/readwell-css/sumi/)**

Sumi CSS는 천연 닥나무 화선지(宣紙)의 따스한 온기와 송연묵(松煙墨)의 깊은 농담(濃淡) 계조, 그리고 붉은 주사(朱砂) 낙관 인장의 서예 미학을 현대 웹 기술로 완벽하게 재해석한 독립 제로 런타임 CSS 프레임워크입니다.

---

## ✨ 핵심 특징 (Key Highlights)

- **화선지(宣紙) & 송연묵(松煙墨) 수묵 계조**: 농묵(濃墨, 대제목), 중묵(中墨, 본문), 담묵(淡墨, 메타/주석), 주사(朱砂, 낙관 인장)로 이어지는 자연주의 흑백 대비
- **5종 서예 필세 콜아웃 프레임 (`.sumi-callout`)**: 인위적인 흰색 박스를 완전히 제거하고, `border-image-slice: 17` 기반으로 한지 결이 박스 내부를 자연스럽게 관통하는 5가지 서예 붓선 프레임
- **2x2 CSS Grid 전각 직인 도장 (`.sumi-seal-chop`)**: 압착 번짐, 전각 칼맛 필터, 4글자 포치(布置) 여백 최적화 및 웹 접근성(`role="img"`)이 완비된 순수 CSS 직인 컴포넌트
- **12px 수묵 갈필 프로그레스 & 3종 슬라이더 (`.sumi-progress`, `.sumi-slider`)**: 서예 점획, 모필(毛筆) 브러시, 서첩 척(尺) 눈금 가늠자 손잡이를 탑재한 인터랙티브 수묵 컨트롤
- **비백호(飛白弧) & 원상(圓相, Ensō) 스피너 (`.sumi-spinner`)**: 전통 서예의 열린 원형 붓터치와 선종의 일원상(一圓相) 모티프 순수 CSS 로딩 인디케이터
- **비트맵 & 차세대 벡터 SVG 듀얼 렌더링 엔진**: 64종 무손실 에셋(WebP 우선 + PNG/JPG 폴백)과 100% 무손실 벡터 SVG 렌더링 엔진 완비
- **Zero Runtime JavaScript & Zero Dependencies**: 외부 자바스크립트나 폰트 의존 없이 브라우저 네이티브 CSS3 `@layer` 아키텍처로 구동

---

## 📦 설치 (Installation)

### npm 패키지 설치
```bash
npm install sumi-css
```

---

## 🚀 불러오기 및 사용법 (Usage)

### 1. 모던 자바스크립트 번들러 (Vite, Next.js, Webpack, Nuxt 등)
```javascript
// 표준 CSS (전체 소스 및 @layer 포함)
import 'sumi-css';

// 또는 프로덕션 최적화 압축 버전
import 'sumi-css/min';
```

### 2. HTML 직접 링크 (CDN 또는 로컬)
```html
<!-- jsDelivr CDN 링크 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sumi-css@0.1.0/dist/sumi.min.css">

<!-- 로컬 dist 파일 링크 -->
<link rel="stylesheet" href="dist/sumi.css">
```

---

## 🎨 수묵 계조 팔레트 CSS 토큰 (Design Tokens)

Sumi CSS는 CSS 커스텀 프로퍼티(`--sumi-*`)로 정밀하게 제어되며, 라이트(화선지) 및 다크(야간 흑지) 모드를 완벽 지원합니다.

| 토큰명 | 라이트 기본값 (화선지) | 다크 모드 (야간 흑지) | 조형적 의미 및 권장 용도 |
| :--- | :--- | :--- | :--- |
| **`--sumi-paper`** | `#f8f5ee` | `#121316` | **화선지 바탕색**: 맑고 따뜻한 미색(米色) 닥나무 한지 vs 칠흑 농묵 흑지 |
| **`--sumi-paper-surface`** | `#fcfbf7` | `#1a1c22` | **정갈한 표면**: 패널, 카드 및 콜아웃 표면 |
| **`--sumi-ink`** | `#121316` | `#f4efe6` | **농묵(濃墨)**: 대제목, 핵심 강조 활자, 강렬한 필세 |
| **`--sumi-charcoal`** | `#424754` | `#d6dadf` | **중묵(中墨)**: 장시간 독서 시 눈이 가장 편안한 본문 먹빛 |
| **`--sumi-wash`** | `#787f90` | `#8a92a2` | **담묵(淡墨)**: 작성자, 날짜, 메타데이터, 보조 캡션 |
| **`--sumi-dilute`** | `#a5abb8` | `#5e6473` | **연한 먹색**: 미세 구분선 및 옅은 붓 번짐 효과 |
| **`--sumi-line`** | `#dfd8cb` | `#2d303b` | **지선(紙線)**: 한지 위에 은은하게 그어진 구조 테두리선 |
| **`--sumi-seal`** | `#b8281d` | `#e84c3d` | **주사(朱砂)**: 서예의 화룡점정 정통 붉은 낙관 인장 |
| **`--sumi-gold`** | `#d4af37` | `#d4af37` | **금묵(金墨)**: 고서 사경(寫經) 포인트 하이라이트 |

> **야간 모드 전환**: `<html data-sumi-theme="dark">` 또는 `<body data-theme="dark">`를 선언하거나, OS 다크 모드(`prefers-color-scheme: dark`)에서 자동으로 전환됩니다.

---

## 🧩 핵심 컴포넌트 마크업 예시 (Core Components)

### 1. 뷰포트 고정 천연 화선지 캔버스 (`.sumi-hanji-canvas`)
무한 스크롤과 동적 콘텐츠 길이에도 배경이 찢어지거나 왜곡되지 않도록 독립 고정 캔버스를 제공합니다.

```html
<body class="sumi-body hanji-texture-active">
  <!-- 뷰포트 고정 캔버스 (z-index 충돌 없음) -->
  <div class="sumi-hanji-canvas" aria-hidden="true"></div>

  <main class="sumi-content">
    <h1 class="sumi-doc-title">서예와 자연의 조화</h1>
    <p>본문 내용이 여기에 들어갑니다...</p>
  </main>
</body>
```

### 2. 5종 수묵 콜아웃 프레임 (`.sumi-callout`)
불필요한 흰색 박스 없이 한지 질감을 관통하며, `border-image-slice: 17`로 원본 서예 붓선의 필압을 완벽하게 재현합니다.

```html
<!-- 1. 기본 방필 중필형 -->
<aside class="sumi-callout">
  <p>기본 방필(方筆)의 단정하고 묵직한 중필 서예선 프레임입니다.</p>
</aside>

<!-- 2. 대각선 상호보완 필세형 -->
<aside class="sumi-callout sumi-callout--variant">
  <p>좌상단 기필 농묵과 우하단 맺음, 대각선 여백의 균형을 이룬 프레임입니다.</p>
</aside>

<!-- 3. 정갈한 세필(細筆) 서예선 -->
<aside class="sumi-callout sumi-callout--fine">
  <p>맑고 날렵한 필세의 세필 프레임입니다.</p>
</aside>

<!-- 4. 먹 번짐 & 미세 붓 떨림 손맛형 -->
<aside class="sumi-callout sumi-callout--brush">
  <p>수작업 먹 번짐과 자연스러운 붓 떨림 손맛이 살아있는 프레임입니다.</p>
</aside>

<!-- 5. 원필(圓筆) 곡선형 -->
<aside class="sumi-callout sumi-callout--round">
  <p>유려하고 부드러운 원필 곡선의 프레임입니다.</p>
</aside>
```

### 3. 2x2 CSS Grid 전각 직인 도장 (`.sumi-seal-chop`)
압착 번짐, 전각 칼맛 마모 테두리, 웹 접근성(`role="img"`, `aria-label`)을 완비한 순수 CSS 낙관 직인입니다.

```html
<!-- 4글자 양각(주문 朱文) 사각 직인 -->
<span class="sumi-seal-chop" role="img" aria-label="정본 지인">
  <span>정</span><span>본</span>
  <span>지</span><span>인</span>
</span>

<!-- 4글자 음각(백문 白文) 사각 직인 -->
<span class="sumi-seal-chop sumi-seal-chop--solid" role="img" aria-label="필의 묵향">
  <span>필</span><span>의</span>
  <span>묵</span><span>향</span>
</span>

<!-- 2글자 세로 직인 -->
<span class="sumi-seal-chop sumi-seal-chop--2" role="img" aria-label="수인">
  <span>수</span>
  <span>인</span>
</span>

<!-- 두인 (頭印): 표주박형 호로인 & 자연인 -->
<span class="sumi-seal-badge sumi-seal-badge--gourd" role="img" aria-label="호로인">壺蘆</span>
<span class="sumi-seal-badge sumi-seal-badge--natural" role="img" aria-label="자연인">自然</span>
```

### 4. 12px 갈필 프로그레스 및 3종 슬라이더 (`.sumi-progress`, `.sumi-slider`)

#### 수묵 갈필 프로그레스 바
```html
<div class="sumi-progress" style="--sumi-progress: 68%;">
  <div class="sumi-progress__track"></div>
  <div class="sumi-progress__fill"></div>
  <!-- 서예 점획 마커 (옵션: --seal 또는 --ink) -->
  <div class="sumi-progress__marker sumi-progress__marker--seal"></div>
</div>
```

#### 3종 수묵 인터랙티브 슬라이더
```html
<!-- 스타일 1: 주사(朱砂) 붉은 인주 서예 점획 손잡이 -->
<div class="sumi-slider-box">
  <div class="sumi-slider-box__track"></div>
  <div class="sumi-slider-box__fill" style="width: 50%;"></div>
  <input type="range" class="sumi-slider-input sumi-slider-input--dot" min="0" max="100" value="50">
</div>

<!-- 스타일 2: 서예 모필(毛筆) 브러시 손잡이 (붓대 + 붓촉) -->
<div class="sumi-slider-box">
  <div class="sumi-slider-box__track"></div>
  <div class="sumi-slider-box__fill" style="width: 75%;"></div>
  <input type="range" class="sumi-slider-input sumi-slider-input--brush" min="0" max="100" value="75">
</div>

<!-- 스타일 3: 서첩 척(尺) 눈금 + 인주 가늠자 손잡이 -->
<div class="sumi-slider-box">
  <div class="sumi-slider-box__track"></div>
  <div class="sumi-slider-box__fill" style="width: 30%;"></div>
  <input type="range" class="sumi-slider-input sumi-slider-input--tick" min="0" max="100" value="30">
</div>
```

### 5. 비백호(飛白弧) & 원상(圓相) 수묵 스피너 (`.sumi-spinner`)
기필에서 갈필 꼬리로 이어지는 비백 붓터치와 선종의 일원상 원형 스피너입니다.

```html
<!-- 비백호 오픈 링 스피너 (농묵 / 주사 / 담묵) -->
<span class="sumi-spinner sumi-spinner--brush-ink" role="status" aria-label="로딩 중"></span>
<span class="sumi-spinner sumi-spinner--brush-seal" role="status" aria-label="로딩 중"></span>
<span class="sumi-spinner sumi-spinner--brush-wash" role="status" aria-label="로딩 중"></span>

<!-- 원상(圓相, Ensō) 완결형 스피너 -->
<span class="sumi-spinner sumi-spinner--enso-ink" role="status" aria-label="로딩 중"></span>
<span class="sumi-spinner sumi-spinner--enso-seal" role="status" aria-label="로딩 중"></span>

<!-- 크기 배리에이션: 기본(36px), 소형(--sm, 20px), 대형(--lg, 54px), 초대형(--xl, 72px) -->
<span class="sumi-spinner sumi-spinner--brush-ink sumi-spinner--sm" role="status" aria-label="로딩 중"></span>
<span class="sumi-spinner sumi-spinner--brush-ink sumi-spinner--lg" role="status" aria-label="로딩 중"></span>
```

---

## 🖌️ 듀얼 렌더링 엔진 & 64종 그래픽 에셋 (Dual Engine & Assets)

Sumi CSS는 웹 환경에 따라 최고의 표현력과 성능을 제공하기 위해 **비트맵 래스터**와 **차세대 벡터 SVG** 듀얼 렌더링 체계를 채택하고 있습니다.

1. **비트맵 래스터 엔진 (`dist/assets/`)**:
   - WebP 우선 로드 + PNG/JPG 폴백 (`image-set()`)을 적용하여 100% 브라우저 호환성을 보장합니다.
   - 고해상도 천연 닥나무 화선지 질감(`hanji-bg`), 5종 콜아웃 프레임, 3종 브러시 디바이더, 스피너 에셋이 번들링되어 있습니다.
2. **차세대 초경량 벡터 SVG 엔진**:
   - 레티나(HiDPI) 및 4K 울트라와이드 디스플레이에서도 계단 현상 없이 깨끗한 서예 붓선을 렌더링합니다.
   - SVG 필터(`<filter id="seal-carve-filter">`)를 통해 인쇄소에서 갓 찍어낸 듯한 전각 인장의 입체적 칼맛을 순수 브라우저 연산으로 표현합니다.
3. **에셋 거버넌스**:
   - 패키지 내 `assets/` 디렉터리에 포함된 모든 에셋은 빌드 시 `dist/assets/`로 자동 동기화되며, 상대 경로 및 번들러 URL 해석을 지원합니다.

---

## 🛠️ 개발 및 빌드 (Development)

```bash
# Sumi CSS 독립 빌드 (dist/sumi.css, dist/sumi.min.css, 소스맵 및 에셋 동기화)
npm run build

# 무결성 검증 테스트 (데드링크, CSS 구문 밸런스, 에셋 무결성 등)
npm test
```

---

## 📄 라이선스 (License)

본 패키지는 [MIT License](LICENSE)에 따라 자유롭게 사용, 수정, 배포할 수 있습니다.
