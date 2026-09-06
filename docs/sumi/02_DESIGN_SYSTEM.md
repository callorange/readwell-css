# Sumi CSS - 디자인 시스템 명세서 (02_DESIGN_SYSTEM)

> **"전통 서예의 필세(筆勢)와 흑백농담을 모던 웹 표준 컴포넌트로 규격화하다."**  
> 본 문서는 Sumi CSS의 색상 계조 토큰, 5종 콜아웃 프레임, 전각 직인 도장, 갈필 프로그레스, 슬라이더, 스피너 등 핵심 컴포넌트의 조형 규격과 웹 표준 API 명세서입니다.

---

## 1. 수묵 계조 체계 (Sumi-e Color Palette)

동양화의 육채(六彩) 원칙(흑·백·농·담·건·습)을 기반으로, 모니터 상에서 육안으로 명확히 구별되는 뚜렷한 대비와 가독성을 확립했습니다.

| 계조 명칭 | CSS 변수 | 색상값 (Hex) | 용도 및 가독성 특징 |
| :--- | :--- | :---: | :--- |
| **농묵 (濃墨)** | `--sumi-ink` | `#121316` | 대제목(H1~H3), `<strong>` 볼드체, 핵심 키워드 강조를 위한 칠흑 |
| **중묵 (中墨)** | `--sumi-charcoal` | `#424754` | 장시간 독서 시 눈의 피로를 최소화하는 부드럽고 차분한 본문 먹빛 |
| **담묵 (淡墨)** | `--sumi-wash` | `#787f90` | 메타데이터, 날짜, 작성자, 보조 설명을 위한 맑고 은은한 안개 수묵 |
| **연묵 (煙墨)** | `--sumi-dilute` | `#a5abb8` | 엷은 보조 정보, 비활성 텍스트 |
| **지선 (紙線)** | `--sumi-line` | `#dfd8cb` | 한지 위에 그은 엷은 테두리 및 구분선 |
| **주사 (朱砂)** | `--sumi-seal` | `#b8281d` | 전통 낙관 인장, 전각 직인, 승인 뱃지용 붉은 인주 색상 |
| **화선지 (紙色)** | `--sumi-paper` | `#fcfbf7` | 천연 닥나무 섬유결 한지 본체 바탕색 (단색 전환 시 `#f8f5ee`) |

---

## 2. 수묵 콜아웃 프레임 시스템 (Callout Frames 5종)

콜아웃 박스는 인위적인 흰색 카드 배경을 완전히 제거하여, **화선지의 닥나무 결이 박스 내부를 자연스럽게 관통**하도록 투명 처리했습니다.  
모든 프레임은 `border-image-slice` 기법을 적용하여 박스의 가로·세로 길이가 늘어나도 네 모서리의 붓터치와 농담이 왜곡되지 않습니다.

```text
                    border-image-slice: 17px
             [Top-Left]       [Top-Edge (Stretch)]      [Top-Right]
           +-------------+----------------------------+-------------+
           | 17px x 17px |                            | 17px x 17px |
           +-------------+----------------------------+-------------+
           | [Left-Edge] |    투명 한지 관통 내부      | [Right-Edge]|
           |             |                            |             |
           +-------------+----------------------------+-------------+
           | 17px x 17px |                            | 17px x 17px |
           +-------------+----------------------------+-------------+
            [Bottom-Left]    [Bottom-Edge (Stretch)]   [Bottom-Right]
```

### 1) 5종 프레임 명세표

| 프레임 파일명 | CSS 클래스 | 필세 특징 및 형태적 차별점 | CSS 설정 (slice / width) |
| :--- | :--- | :--- | :--- |
| **`callout-frame-clean.png`** | `.sumi-callout--clean` *(기본)* | **방필(方筆) 중필형**: 정제된 각진 코너(`┐`), 좌하단 묵직한 농묵(`└`). 가장 단정하고 안정적인 클래식 서예 프레임. | `slice: 17;`<br>`width: 17px;` |
| **`callout-frame-brush.png`** | `.sumi-callout--brush` *(대표)* | **먹 번짐 & 붓 떨림형**: 기본형과 전체 사각 구조는 같으나, **서예가가 숨을 고르며 그을 때 생기는 미세한 붓 떨림(tremor, 진폭 ~0.7px)과 닥나무 섬유결 먹물 번짐(ink wash)**의 유기적 손맛을 재현. | `slice: 17;`<br>`width: 17px;` |
| **`callout-frame-fine.png`** | `.sumi-callout--fine` | **세필(細筆) 날렵형**: 기본형과 **동일한 직각 사각형 외곽선**을 유지하면서, 가늘고 맑은 세필의 필압으로 그어낸 정갈한 붓선. | `slice: 17;`<br>`width: 17px;` |
| **`callout-frame-variant.png`** | `.sumi-callout--variant` | **대각선 대칭 보완형**: 좌상단 기필 농묵(`┌`), 우상단 갈필 여백(`┐`), 우하단 맺음(`┘`). 기본형과 대각선 음양(陰陽) 균형 형성. | `slice: 17;`<br>`width: 17px;` |
| **`callout-frame-round.png`** | `.sumi-callout--round` | **원필(圓筆) 곡선 개방형**: 직각을 벗어나 **4모서리가 둥글게 굽어 돌며 여백으로 열려 있는 유기적 형태**. 우측 여백 최적화 반영. | `slice: 28 30;`<br>`width: 18px;` |

### 2) 사용 마크업 예시
```html
<!-- 붓 떨림 손맛형 콜아웃 -->
<aside class="sumi-callout sumi-callout--brush">
  <div class="sumi-callout__title">
    <span class="sumi-callout__icon"></span>
    심층 고찰 (深層 考察)
  </div>
  <p>화선지 위에 스며드는 먹물의 농담은 인위적인 경계선을 허물고 사유의 깊이를 더합니다.</p>
</aside>
```

---

## 3. 전통 사각 전각 직인(Chop) 컴포넌트 (`.sumi-seal-chop`)

별도의 이미지 파일 제작 없이, **원하는 임의의 텍스트(한글/한자 4글자, 2글자, 1글자)를 실제 도장 형태로 렌더링**하는 순수 웹 컴포넌트 시스템입니다.

### 1) 기술 아키텍처
* **2x2 CSS Grid 구조**: 4글자를 빈틈없이 배치하고 `line-height: 1`, `font-size: 13px`(33px 기준) 설정.
* **전각 포치(布置) 여백 원칙**:
  글자가 작아 중앙에 십자 형태의 휑한 공백이 생기던 문제를 해결하기 위해, 4분면 글자 각각을 중앙 쪽으로 미세하게 모아(`translate ±0.4px`) 전통 전각 도장 특유의 조화롭고 빽빽한 밀도감을 구현했습니다.
* **수작업 돌도장 마모 테두리**:
  단순한 기계적 사각형을 탈피하여 모서리가 부드럽게 닳아 있는 비대칭 마모 테두리(`border-radius: 3.5px 2px 4px 2.5px / 2.5px 4px 2px 3.5px`, `border: 2px solid var(--sumi-seal)`)를 적용했습니다.
* **인주 압착 번짐 (Ink Bleed)**:
  도장을 한지 위에 꾹 눌렀을 때 테두리와 글자 주변으로 은은하게 배어나는 압착 섀도우(`box-shadow`, `text-shadow`)와 압력 차이로 인한 중앙-외곽 인주 농담 바탕(`radial-gradient`)을 결합했습니다.
* **SVG 스탬프 압착 필터 (`#sumi-seal-carve-filter`)**:
  인라인 SVG 필터를 통해 글자의 가독성을 100% 보존하면서 테두리의 불규칙한 돌칼 요철과 종이 흡수 번짐을 사실적으로 합성합니다.
* **웹 접근성 보장 (WCAG 2.1 분절 낭독 차단)**:
  2x2 그리드로 배치된 글자(`<span>讀</span><span>書</span>...`)는 스크린 리더가 개별 글자로 끊어 읽을 경우 소음이 됩니다. 직인 요소에 반드시 `role="img"`와 대체 텍스트 `aria-label="독서정본 직인"`을 부여하여 보조공학기기가 단일 완성 인장으로 명확히 인식하도록 보장합니다.

### 2) 직인 변형 종류 및 사용법

```html
<!-- 1. 기본 4글자 전각 직인 (접근성 role="img" 및 aria-label 필수) -->
<div style="display: flex; align-items: center; gap: 0.5rem;">
  <span>Approved by</span>
  <span class="sumi-seal-chop" role="img" aria-label="독서정본 직인" title="讀書正本">
    <span>讀</span><span>書</span>
    <span>正</span><span>本</span>
  </span>
</div>

<!-- 2. 대형 전각 직인 (--lg: 38px) -->
<span class="sumi-seal-chop sumi-seal-chop--lg" role="img" aria-label="인정승인 직인">
  <span>인</span><span>정</span>
  <span>승</span><span>인</span>
</span>

<!-- 3. 음각 백문(白文) 직인 (--solid) -->
<span class="sumi-seal-chop sumi-seal-chop--solid sumi-seal-chop--lg" role="img" aria-label="공식인증 직인">
  <span>공</span><span>식</span>
  <span>인</span><span>증</span>
</span>

<!-- 4. 정본 이중 테두리 쌍선인 (--double) -->
<span class="sumi-seal-chop sumi-seal-chop--double sumi-seal-chop--lg" role="img" aria-label="천하명필 직인">
  <span>천</span><span>하</span>
  <span>명</span><span>필</span>
</span>

<!-- 5. 2글자 세로 직인 (--2) -->
<span class="sumi-seal-chop sumi-seal-chop--2" role="img" aria-label="낙관 직인">
  <span>낙</span>
  <span>관</span>
</span>

<!-- 6. 1글자 방인 (--1) -->
<span class="sumi-seal-chop sumi-seal-chop--1 sumi-seal-chop--lg" role="img" aria-label="인 직인">
  印
</span>
```

---

## 4. 첫 글자 기필(起筆) 드롭캡 (`.sumi-dropcap`)

* **개념**: 서예가가 붓에 먹을 듬뿍 머금고 첫 획을 굳세게 내리긋듯(起筆), 장문 문서의 도입부를 묵직하고 단단하게 열어주는 대형 첫 글자 컴포넌트입니다.
* **특징**: `3.4rem` 농묵(濃墨) 폰트와 은은한 먹 번짐 그림자, 정밀한 좌우 여백 조판으로 한글과 한자 모두 우아하게 문단 흐름에 안착합니다.

```html
<p>
  <span class="sumi-dropcap">우</span>리의 목표는 단순한 장식적 과시가 아닌...
</p>
```

---

## 5. 수묵 갈필(渴筆) 프로그레스 게이지 (`.sumi-progress`)

* **개념**: 기계적인 직사각형 막대(Pill Bar) 형태를 탈피하여, 섬세한 필선(높이 12px, 중앙 획 두께 6~8px)을 구현한 프로그레스 바입니다.
* **조형적 특징**:
  - **둥근 기필(起筆) 머리**: 서예 붓이 종이에 처음 닿았을 때의 **도톰하고 부드러운 유선형 둥근 붓머리**로 시작.
  - **테이퍼링(Tapering) 꼬리**: 우측 끝으로 갈수록 필압이 자연스럽게 빠지며 가늘게 흩어지는 서예 소멸 기법.
  - **1:1 완벽 실루엣 합치**: 담묵(트랙)과 농묵(채움)이 동일한 수묵 획 마스크를 공유하여 진행률 어느 지점에서도 단차 없이 포개어짐.
* **구조 & 웹 접근성 (WCAG 2.1)**:
  - **트랙 (`sumi-stroke-track.png`)**: 은은하고 맑은 담묵(淡墨, 투명도 ~28%) 수묵 워시.
  - **채움 (`sumi-stroke-fill.png`)**: 깊고 짙은 칠흑 농묵(濃墨) 붓질 (`clip-path: inset(...)`).
  - **규격**: 높이 `12px` (세필 옵션 `.sumi-progress--fine` 적용 시 `10px`).
  - **마커 2종 (18px × 18px)**: 서예 영자팔법의 **측(側, 점획)**을 본뜬 붓점.
    - `.sumi-progress__marker--seal`: 주사(朱砂) 붉은 인주 붓점 마커
    - `.sumi-progress__marker--ink`: 흑묵(濃墨) 서예 점획 마커
  - **시맨틱 ARIA**: `role="progressbar"`, `aria-valuenow="78"`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label="..."`.

```html
<!-- 주사 붉은 인주 붓점 마커 프로그레스 (78%) -->
<div class="sumi-progress" role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100" aria-label="문서 독서 진행률 78%" style="--sumi-progress: 78%;">
  <div class="sumi-progress__track"></div>
  <div class="sumi-progress__fill"></div>
  <div class="sumi-progress__marker sumi-progress__marker--seal"></div>
</div>
```

---

## 6. 수묵 인터랙티브 슬라이더 (`.sumi-slider-box`)

* **개념**: 네이티브 브라우저의 직사각형 테두리를 **100% 완전 투명화**하고, 12px 슬림 수묵 스트로크 위에서 조작하는 문방사우 모티프의 3대 정예 스타일 컴포넌트입니다.
* **3대 정예 스타일 라인업**:
  1. **스타일 1. 서예 붓점 (미니멀 붉은 인주)**: 화선지 수묵선 위에 주사(朱砂) 붉은 인주 붓점이 얹힌 미니멀 스타일 (`.sumi-slider-input--dot`, 20px × 20px).
  2. **스타일 2. 서예 모필(毛筆) 브러시**: 대나무 붓대(상단)와 날카로운 모필 붓촉 끝(하단)이 12px 먹선 중심 궤적에 정확히 맞물림 (`.sumi-slider-input--brush`, 20px × 36px).
  3. **스타일 3. 전통 서첩 척(尺) 눈금자 + 인주 가늠자**: 시맨틱 `<datalist>` 틱마크 눈금과 붉은 인주 가늠자 손잡이 (`.sumi-slider-input--tick`, 20px × 24px).
* **핵심 특징 & 웹 접근성**:
  - **주사 훈염 키보드 포커스 링 (`:focus-visible`)**: 키보드 Tab 조작 시 전통 붉은 인주(朱砂) 훈염 링(`box-shadow: 0 0 0 3px rgba(184, 51, 42, 0.4)`)을 표출.
  - **44px × 44px 터치 조작 타겟 확보**: 12px 슬림한 조형 기준을 시각적으로 유지하면서 터치 영역만 44px로 확장.
  - **브라우저 네이티브 핸들 가동축(10px) 1:1 정밀 정렬**: 핸들 가동축(`10px` ~ `calc(100% - 10px)`)에 맞춰 트랙과 눈금을 동기화.

```html
<!-- 스타일 1. 서예 붓점 슬라이더 예시 -->
<div class="sumi-slider-box" style="--sumi-val: 72%;">
  <div class="sumi-slider-box__track"></div>
  <div class="sumi-slider-box__fill"></div>
  <input type="range" class="sumi-slider-input sumi-slider-input--dot" min="0" max="100" value="72"
         aria-label="수묵 붓점 조절기" aria-valuenow="72"
         oninput="this.parentElement.style.setProperty('--sumi-val', this.value + '%')">
</div>
```

---

## 7. 수묵 원형 붓터치 스피너 (`.sumi-spinner`)

* **개념**: 기계적 원형 링을 탈피하여 화선지 위에 서예 붓으로 일필휘지 휘돌려 친 **'비백호(飛白弧)' 갈필 궤적**과 **'원상(圓相, Enso)' 일필휘지 붓터치**를 웹 로딩 스피너로 구현했습니다.
* **2대 스타일 라인업**:
  1. **비백호(飛白弧) 오픈 링 (Open Arc)**: 굵은 기필에서 시작해 모필 붓털로 흩어지는 C자형 오픈 링 (`.sumi-spinner--brush-ink`, `--brush-seal`, `--brush-wash`).
  2. **원상(圓相, Enso) 서클 (Circle Enso)**: 도넛형 원상 붓터치와 비백 선율 (`.sumi-spinner--enso-ink`, `--enso-seal`, `--enso-wash`).
* **단일 알파 마스크 최적화**: 색상별 이미지 중복 없이 단 2종의 알파 마스크와 CSS `currentColor`로 임의의 색상에 동적 대응.
* **서예 동세(動勢) 애니메이션 7종**:
  1. `.sumi-spinner--flow`: 유수(流水) 사인 곡선 가감속
  2. `.sumi-spinner--breathe`: 호흡(呼吸) 미세 수축·팽창 (`scale: 0.93 ~ 1.06`)
  3. `.sumi-spinner--fade`: 훈염(暈染) 농담 번짐 (`opacity: 0.38 ~ 1.0`)
  4. `.sumi-spinner--sweep`: 부채꼴 운필(運筆) 왕복 진자 (`-35deg ~ 235deg`)
  5. `.sumi-spinner--ghost`: 훈염 잔상(殘影) 추적
  6. `.sumi-spinner--dual`: 음양(陰陽) 이중 엇갈림 역회전
  7. `.sumi-spinner--dual-sync`: 동심(同心) 순방향 이중회전
* **속도 & 크기 규격**:
  - 속도: `--slow`(2.2s), 기본(1.1s), `--fast`(0.75s), `--reverse`
  - 크기: `--sm`(20px), 기본(36px), `--lg`(52px), `--xl`(72px)
* **웹 접근성 (WCAG 2.1)**:
  - 비동기 로딩 시: `role="status" aria-label="로딩 중"`
  - 단순 전시 시: `aria-hidden="true"`
  - `prefers-reduced-motion` 대응: 회전 대신 은은한 수묵 호흡 펄스로 자동 전환

```html
<!-- 기본 비백호 농묵 스피너 -->
<div class="sumi-spinner sumi-spinner--brush-ink" role="status" aria-label="로딩 중"></div>

<!-- 호흡 동세 주사 스피너 -->
<div class="sumi-spinner sumi-spinner--brush-seal sumi-spinner--breathe" role="status" aria-label="처리 중"></div>
```

---

## 8. 전통 서첩 발문(跋文) / 저자 서명란 (`.sumi-colophon`)

고서나 서화의 마지막 장에 집필 경위와 감회를 적고 직인을 찍던 전통 발문(跋文) 양식을 웹 컴포넌트화했습니다.

* **구성 요소**:
  - 상단: 실제 붓글씨 수묵 갈필 디바이더 (`brush-divider-1.png`)
  - 좌측: 고서 간행 연호 및 판본 메타 정보 (讀書正本 第參卷 · 歲次 丙午年 秋九月 完本)
  - 우측: 저자 호(號) 및 서명 + 전각 직인 도장(`[讀書正本]`) + `검증필` 인장 뱃지

```html
<footer class="sumi-colophon">
  <div class="sumi-colophon__divider"></div>
  <div class="sumi-colophon__body">
    <div class="sumi-colophon__meta">
      <div><strong>讀書正本 第參卷</strong> · Sumi Architecture v0.1.0</div>
      <div style="font-size: 0.82rem; color: var(--sumi-dilute);">歲次 丙午年 秋九月 完本</div>
      <div style="font-style: italic; margin-top: 0.25rem;">"본 문서는 수묵(水墨)과 화선지의 전통 조판 규격에 따라 정식 검증을 필하였음."</div>
    </div>
    <div class="sumi-colophon__signature">
      <div class="sumi-colophon__sign-text">
        <div style="font-size: 0.78rem; color: var(--sumi-dilute);">草堂 筆者 識</div>
        <div class="sumi-colophon__author">Anon None</div>
      </div>
      <span class="sumi-seal-chop sumi-seal-chop--lg" role="img" aria-label="독서정본 직인" title="讀書正本">
        <span>讀</span><span>書</span><span>正</span><span>本</span>
      </span>
      <span class="sumi-seal-badge sumi-seal-badge--solid">검증필</span>
    </div>
  </div>
</footer>
```
