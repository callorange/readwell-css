# Sumi (수묵 水墨) 테마 기획 & 디자인 시스템 명세서

> **"종이와 먹의 본질적인 대비, 그리고 살아 숨 쉬는 여백(余白)"**  
> Readwell CSS의 Sumi 테마는 전통 서예(書藝)와 수묵화(水墨畫)의 미학을 현대 웹 표준 기술(HTML5, CSS3, SVG Filters)로 승화시킨 **장문 독서 및 기술 문서 특화 디자인 시스템**입니다.

---

## 1. 컨셉 개요 및 네이밍 배경 (Why 'Sumi'?)

### 1) 'Sumi' 명칭의 유래
* **글로벌 예술계의 공용어 (Sumi-e / Sumi Ink)**:  
  '수미(Sumi)'는 동양 전통 **'먹(墨, 먹 묵)'**의 어원에서 유래하며, 전 세계 예술/디자인계에서 동양의 먹물 회화와 캘리그래피를 일컫는 보편적 명칭인 **'Sumi-e(수묵화, 墨絵)'** 및 **'Sumi Ink(전통 송연묵·유연묵)'**에서 착안되었습니다.
* **수미상응 (首尾相應)과 수미 (秀美)**:  
  한국어 전통 맥락에서도 **"글의 머리와 꼬리가 긴밀하게 호응하여 조화를 이룬다"**는 **수미상응(首尾相應)**과, **"빼어나게 아름답다"**는 **수미(秀美)**의 철학적 의미를 함께 담고 있습니다. 장문의 기술 문서나 학술 아티클을 처음부터 끝까지 읽는 독자에게 흐트러짐 없는 시각적 편안함을 제공하겠다는 의지입니다.

### 2) 기획 의도
* **인위적인 기하학적 박스와 네온 컬러의 배제**:  
  현대 웹 UI는 지나치게 쨍한 원색과 차가운 직각 테두리로 가득 차 있어, 10분 이상 집중해서 읽어야 하는 기술 문서에서 심각한 시각적 피로를 유발합니다.
* **자연의 질감과 부드러운 대비**:  
  천연 닥나무를 뜬 미색(米色) 화선지 바탕과 먹물의 자연스러운 농담(濃淡), 그리고 붉은 주사(朱砂) 낙관 도장으로 시선을 부드럽게 이끌어 **"눈이 편안하고 지적 몰입감이 극대화되는 독서 경험"**을 완성합니다.

---

## 2. 핵심 디자인 철학 (Design Philosophy)

1. **여백지미 (余白之美)**:  
   선을 긋지 않고 남겨둔 빈 공간도 디자인의 유기적인 일부입니다. 과도한 구분선과 박스를 덜어내고, 여백의 호흡으로 문맥의 전환을 표현합니다.
2. **흑백농담 (黑白濃淡)**:  
   폰트 굵기뿐만 아니라 **먹의 농도(계조)**로 위계를 설정합니다. 가장 중요한 대제목은 칠흑 같은 농묵(濃墨)으로, 장시간 읽는 본문은 부드러운 중묵(中墨)으로, 부가 메타데이터는 안개 같은 담묵(淡墨)으로 정돈합니다.
3. **갈필(渴筆)과 훈염(暈染)**:  
   서예의 메마른 붓질(갈필)로 정갈한 구분선을 만들고, 닥나무 결에 먹물이 번져 들어가는 부드러운 번짐(훈염)으로 콜아웃의 깊이를 표현합니다.
4. **화룡점정 주사(朱砂) 낙관**:  
   차분한 무채색 수묵 톤 속에서 문서의 정본 인증, 승인, 핵심 주의사항을 전통 붉은 인주(朱砂) 인장 컴포넌트로 강렬하게 강조합니다.

---

## 3. 레이아웃 아키텍처 (Layout Architecture)

`
+---------------------------------------------------------------------------------------+
|  [Fixed Viewport Layer] 천연 닥나무 화선지 고정 캔버스 (.rw-sumi-hanji-canvas)        |
+---------------------------------------------------------------------------------------+
|  .rw-sumi-layout (최대폭 1440px 중앙 정렬)                                             |
|                                                                                       |
|  +--------------------+  +----------------------------------+  +-------------------+  |
|  |  좌측 사이드바      |  |  중앙 본문 아티클                |  |  우측 메타 레일   |  |
|  |  (.rw-sumi-sidebar)|  |  (.rw-sumi-content, 최대 820px)  |  |  (.rw-sumi-aside) |  |
|  |  - 폭: 240px       |  |  - 대제목 (H1)                   |  |  - 폭: 340px      |  |
|  |  - sticky 고정     |  |  - 메타 (아바타, 날짜, 인장)     |  |  - sticky 고정    |  |
|  |  - 3단 목차 메뉴   |  |  - 본문 서예 콜아웃 3종          |  |  - Approved by    |  |
|  |  - 수묵 갈필 먹선  |  |  - 수묵 계조 매트릭스 표         |  |  - 원필 콜아웃    |  |
|  |                    |  |  - 전각 직인 도장 쇼케이스       |  |  - 전각 직인 컴포 |  |
|  +--------------------+  +----------------------------------+  +-------------------+  |
+---------------------------------------------------------------------------------------+
`

### 1) 뷰포트 고정형 한지 캔버스 (Fixed Viewport Canvas)
* 본문 길이가 수천~수만 픽셀로 길어질 때 배경 이미지를 강제로 늘리거나 타일링하면 한지 섬유결이 늘어지고 깨집니다.
* \position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: -1;\ 구조로 뷰포트에 캔버스를 고정하고, 그 위로 본문 콘텐츠가 부드럽게 스크롤되도록 설계하여 **동적 길이 및 무한 스크롤에 100% 무결점 대응**합니다.
* 플로팅 컨트롤러를 통해 한지 닥나무 결 텍스처를 켜거나(ON), 정갈한 단색 화선지(OFF)로 실시간 전환할 수 있습니다.

### 2) 독립 3컬럼 반응형 그리드
* **데스크톱 (> 1180px)**: \240px minmax(0, 1fr) 340px\의 3컬럼으로 시선 분산 없이 안정된 독서 폭 형성.
* **태블릿 (769px ~ 1180px)**: 우측 메타 레일이 본문 하단으로 자연스럽게 흐르는 2컬럼 레이아웃.
* **모바일 (<= 768px)**: 1컬럼 단일 읽기 모드로 전환되며 패딩이 최적화됨.

---

## 4. 수묵 계조 체계 (Sumi-e Color Palette)

동양화의 육채(六彩) 원칙(흑·백·농·담·건·습)을 기반으로, 모니터 상에서 육안으로 명확히 구별되는 뚜렷한 대비를 확립했습니다.

| 계조 명칭 | CSS 변수 | 색상값 (Hex) | 용도 및 가독성 특징 |
| :--- | :--- | :---: | :--- |
| **농묵 (濃墨)** | `--rw-sumi-ink` | `#121316` | 대제목(H1~H3), `<strong>` 볼드체, 핵심 키워드 강조를 위한 칠흑 |
| **중묵 (中墨)** | `--rw-sumi-charcoal` | `#424754` | 장시간 독서 시 눈의 피로를 최소화하는 부드럽고 차분한 본문 먹빛 |
| **담묵 (淡墨)** | `--rw-sumi-wash` | `#787f90` | 메타데이터, 날짜, 작성자, 보조 설명을 위한 맑고 은은한 안개 수묵 |
| **연묵 (煙墨)** | `--rw-sumi-dilute` | `#a5abb8` | 엷은 보조 정보, 비활성 텍스트 |
| **지선 (紙線)** | `--rw-sumi-line` | `#dfd8cb` | 한지 위에 그은 엷은 테두리 및 구분선 |
| **주사 (朱砂)** | `--rw-sumi-seal` | `#b8281d` | 전통 낙관 인장, 전각 직인, 승인 뱃지용 붉은 인주 색상 |

---

## 5. 수묵 콜아웃 프레임 시스템 (Callout Frames 5종)

콜아웃 박스는 인위적인 흰색 카드 배경을 완전히 제거하여, **화선지의 닥나무 결이 박스 내부를 자연스럽게 관통**하도록 처리했습니다.  
모든 프레임은 \order-image-slice\ 기법을 적용하여 박스의 가로·세로 길이가 늘어나도 네 모서리의 붓터치와 농담이 왜곡되지 않습니다.

`
                    border-image-slice: 17px
             [Top-Left]       [Top-Edge (Stretch)]      [Top-Right]
           +-------------+----------------------------+-------------+
           | 17px x 17px |                            | 17px x 17px |
           +-------------+----------------------------+-------------+
           |             |                            |             |
           | [Left-Edge] |    투명 한지 관통 내부      | [Right-Edge]|
           |             |                            |             |
           +-------------+----------------------------+-------------+
           | 17px x 17px |                            | 17px x 17px |
           +-------------+----------------------------+-------------+
            [Bottom-Left]    [Bottom-Edge (Stretch)]   [Bottom-Right]
`

### 1) 5종 프레임 명세표

| 프레임 파일명 | CSS 클래스 | 필세 특징 및 형태적 차별점 | CSS 설정 (slice / width) |
| :--- | :--- | :--- | :--- |
| **\callout-frame-clean.png\** | \.rw-callout-ink-box\ *(기본)* | **방필(方筆) 중필형**: 정제된 각진 코너(\┐\), 좌하단 묵직한 농묵(\└\). 가장 단정하고 안정적인 클래식 서예 프레임. | \slice: 17;\<br>\width: 17px;\ |
| **\callout-frame-brush.png\** | \.rw-callout-ink-box--brush\ *(⭐)* | **먹 번짐 & 붓 떨림형**: 기본형과 전체 사각 구조는 같으나, **서예가가 숨을 고르며 그을 때 생기는 미세한 붓 떨림(tremor, 진폭 ~0.7px)과 닥나무 섬유결 먹물 번짐(ink wash)**의 유기적 손맛을 재현. 복사한 듯한 느낌 없는 자연스러운 변화 부여. | \slice: 17;\<br>\width: 17px;\ |
| **\callout-frame-fine.png\** | \.rw-callout-ink-box--fine\ | **세필(細筆) 날렵형**: 기본형과 **동일한 직각 사각형 외곽선**을 유지하면서, 가늘고 맑은 세필의 필압으로 그어낸 정갈한 붓선. | \slice: 17;\<br>\width: 17px;\ |
| **\callout-frame-variant.png\** | \.rw-callout-ink-box--variant\ | **대각선 대칭 보완형**: 좌상단 기필 농묵(\┌\), 우상단 갈필 여백(\┐\), 우하단 맺음(\┘\). 기본형과 대각선 음양(陰陽) 균형 형성. | \slice: 17;\<br>\width: 17px;\ |
| **\callout-frame-round.png\** | \.rw-callout-ink-box--round\ | **원필(圓筆) 곡선 개방형**: 직각을 벗어나 **4모서리가 둥글게 굽어 돌며 여백으로 열려 있는 유기적 형태**. 우측 여백 최적화 반영. | \slice: 28 30;\<br>\width: 18px;\ |

---

## 6. 전통 사각 전각 직인(Chop) 컴포넌트 (\.rw-seal-chop\)

별도의 이미지 파일 제작 없이, **원하는 임의의 텍스트(한글/한자 4글자, 2글자, 1글자)를 실제 도장 형태로 렌더링**하는 순수 웹 컴포넌트 시스템입니다.

### 1) 기술 아키텍처
* **2x2 CSS Grid 구조**: 4글자를 빈틈없이 배치하고 \line-height: 1\, \ont-size: 13px\(33px 기준) 설정.
* **전각 포치(布置) 여백 원칙**:
  글자가 작아 중앙에 십자 형태의 휑한 공백이 생기던 문제를 해결하기 위해, 4분면 글자 각각을 중앙 쪽으로 미세하게 모아(\	ranslate ±0.4px\) 전통 전각 도장 특유의 조화롭고 빽빽한 밀도감을 구현했습니다.
* **수작업 돌도장 마모 테두리**:
  단순한 기계적 사각형을 탈피하여 모서리가 부드럽게 닳아 있는 비대칭 마모 테두리(\order-radius: 3.5px 2px 4px 2.5px / 2.5px 4px 2px 3.5px\, \order: 2px solid var(--rw-sumi-seal)\)를 적용했습니다.
* **인주 압착 번짐 (Ink Bleed)**:
  도장을 한지 위에 꾹 눌렀을 때 테두리와 글자 주변으로 은은하게 배어나는 압착 섀도우(\ox-shadow\, \	ext-shadow\)와 압력 차이로 인한 중앙-외곽 인주 농담 바탕(\adial-gradient\)을 결합했습니다.
* **SVG 스탬프 압착 필터 (\#seal-carve-filter\)**:
  \\\xml
  <filter id="seal-carve-filter" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.2" numOctaves="3" result="pressNoise" />
    <feDisplacementMap in="SourceGraphic" in2="pressNoise" scale="1.35" xChannelSelector="R" yChannelSelector="G" result="disp" />
    <feGaussianBlur in="disp" stdDeviation="0.25" result="glow" />
    <feMerge>
      <feMergeNode in="glow" opacity="0.65" />
      <feMergeNode in="disp" />
    </feMerge>
  </filter>
  \\\
  글자의 형태와 가독성을 100% 보존하면서, 테두리의 불규칙한 돌칼 요철과 종이 흡수 번짐을 사실적으로 합성합니다.

### 2) 직인 변형 종류 및 사용법

\\\html
<!-- 1. 기본 4글자 전각 직인 (한자 / 한글) -->
<div style="display: flex; align-items: center; gap: 0.5rem;">
  <span>Approved by</span>
  <span class="rw-seal-chop" title="讀書正本">
    <span>讀</span><span>書</span>
    <span>正</span><span>本</span>
  </span>
</div>

<!-- 2. 대형 전각 직인 (--lg: 38px) -->
<span class="rw-seal-chop rw-seal-chop--lg">
  <span>인</span><span>정</span>
  <span>승</span><span>인</span>
</span>

<!-- 3. 음각 백문(白文) 직인 (--solid) -->
<span class="rw-seal-chop rw-seal-chop--solid rw-seal-chop--lg">
  <span>공</span><span>식</span>
  <span>인</span><span>증</span>
</span>

<!-- 4. 정본 이중 테두리 쌍선인 (--double) -->
<span class="rw-seal-chop rw-seal-chop--double rw-seal-chop--lg">
  <span>천</span><span>하</span>
  <span>명</span><span>필</span>
</span>

<!-- 5. 2글자 세로 직인 (--2) -->
<span class="rw-seal-chop rw-seal-chop--2">
  <span>낙</span>
  <span>관</span>
</span>

<!-- 6. 1글자 방인 (--1) -->
<span class="rw-seal-chop rw-seal-chop--1 rw-seal-chop--lg">
  印
</span>
```

---

## 7. 수묵 확장 컴포넌트 (Extended Sumi Components)

### 1) 첫 글자 기필(起筆) 드롭캡 (`.rw-sumi-dropcap`)
* **개념**: 서예가가 붓에 먹을 듬뿍 머금고 첫 획을 굳세게 내리긋듯(起筆), 장문 문서의 도입부를 묵직하고 단단하게 열어주는 대형 첫 글자 컴포넌트입니다.
* **특징**: `3.4rem` 농묵(濃墨) 폰트와 은은한 먹 번짐 그림자, 정밀한 좌우 여백 조판으로 한글과 한자 모두 우아하게 문단 흐름에 안착합니다.
```html
<p>
  <span class="rw-sumi-dropcap">우</span>리의 목표는 단순한 장식적 과시가 아닌...
</p>
```

### 2) 수묵 갈필(渴筆) 프로그레스 게이지 (`.rw-sumi-progress`)
* **개념**: 기계적인 직사각형 막대(Pill Bar) 형태를 완전히 벗어나, 컨셉아트 원본의 섬세한 필선(높이 12px, 중앙 획 두께 6~8px)을 100% 온전하게 구현한 프로그레스 바입니다.
* **조형적 특징**:
  - **둥근 기필(起筆) 머리**: 사각형으로 잘린 인위적 시작점이 아니라, 서예 붓에 먹을 머금고 종이에 처음 닿았을 때의 **도톰하고 부드러운 유선형 둥근 붓머리**로 시작합니다.
  - **테이퍼링(Tapering) 꼬리**: 우측 끝으로 갈수록 필압이 자연스럽게 빠지며 날렵하고 가늘게 흩어지는 서예 소멸 기법을 구현했습니다.
  - **1:1 완벽 실루엣 합치**: 담묵(트랙)과 농묵(채움)이 동일한 수묵 획 마스크를 공유하여, 진행률(0%~100%) 어느 지점에서도 획의 외곽선 단차나 어긋남 없이 서브픽셀 단위로 정확하게 포개어집니다.
* **구조**:
  - **트랙 (`sumi-stroke-track.png`)**: 은은하고 맑은 담묵(淡墨, 투명도 ~28%) 수묵 워시로 전체 진행 궤적 표시
  - **채움 (`sumi-stroke-fill.png`)**: 깊고 짙은 칠흑 농묵(濃墨) 붓질이 실시간 진행률에 맞춰 차오름 (`clip-path: inset(...)`)
  - **규격**: 높이 `12px` (중앙 획 두께 6~8px, 세필 옵션 `.rw-sumi-progress--fine` 적용 시 `10px`)
  - **마커 (선택형 2종, 18px × 18px)**: 서예 영자팔법의 **측(側, 점획)**을 본뜬 붓점으로 먹선 정중앙 축에 정확히 안착
    - `.rw-sumi-progress__marker--seal`: 주사(朱砂) 붉은 인주 붓점 마커
    - `.rw-sumi-progress__marker--ink`: 흑묵(濃墨) 서예 점획 마커 (순수 흑백 수묵조)
```html
<!-- 1. 주사(朱砂) 붉은 인주 붓점 마커 (78%) -->
<div class="rw-sumi-progress" style="--rw-progress: 78%;">
  <div class="rw-sumi-progress__track"></div>
  <div class="rw-sumi-progress__fill"></div>
  <div class="rw-sumi-progress__marker rw-sumi-progress__marker--seal"></div>
</div>

<!-- 2. 흑묵(濃墨) 서예 점획 마커 (45%) -->
<div class="rw-sumi-progress" style="--rw-progress: 45%;">
  <div class="rw-sumi-progress__track"></div>
  <div class="rw-sumi-progress__fill"></div>
  <div class="rw-sumi-progress__marker rw-sumi-progress__marker--ink"></div>
</div>
```

### 3) 수묵 인터랙티브 슬라이더 (`.rw-sumi-slider-box`, `input[type="range"]`)
* **개념**: 네이티브 브라우저의 직사각형 테두리를 **100% 완전 투명화**하고, 프로그레스 바와 동일한 **12px 슬림 수묵 스트로크** 위에서 사용자가 직접 조작할 수 있는 **문방사우 모티프의 3대 정예 스타일** 컴포넌트입니다.
* **3대 정예 스타일 라인업**:
  1. **스타일 1. 서예 붓점 (미니멀 붉은 인주)**: 화선지 수묵선 위에 주사(朱砂) 붉은 인주 붓점이 얹힌 미니멀 스타일 (`.rw-sumi-slider-input--dot`).
     - 손잡이 규격: `20px x 20px`, `margin-top: -4px`로 12px 먹선 정중앙 축에 정확히 안착
  2. **스타일 2. 서예 모필(毛筆) 브러시 (도구 vs 궤적의 맞물림)**: 사용자가 붓대와 붓촉을 쥐고 화선지 위에 먹선을 직접 긋는 듯한 손맛과 조작 어포던스를 제공하는 스타일 (`.rw-sumi-slider-input--brush`).
     - 손잡이 규격: `20px x 36px`, `margin-top: -27px`. 대나무 붓대(상단)는 위로 솟고, 날카로운 먹물 머금은 모필 붓촉 끝(하단)이 12px 먹선 중심 궤적에 정확히 맞물림
  3. **스타일 3. 전통 서첩 척(尺) 눈금자 + 인주 가늠자 (단위 계측형)**: 시맨틱 `<datalist>` 틱마크 눈금과 붉은 인주 가늠자 손잡이로 수치 조절 컨트롤의 정밀성과 기능성을 극대화한 스타일 (`.rw-sumi-slider-input--tick`).
     - 손잡이 규격: `20px x 24px`, `margin-top: -7px`. 둥근 인주 몸통은 먹선 중앙에 위치하고, 하단 뾰족한 침 끝은 눈금선 바로 위를 정밀하게 지시
* **핵심 특징**:
  - **네이티브 외곽선 100% 완전 투명화**: `appearance: none`, `background: transparent !important`, `border: 0`, `outline: none`, `box-shadow: none`으로 브라우저 기본 테두리와 포커스 링 완전 제거.
  - **실시간 붓터치 연동**: 드래그 시 `--rw-val` CSS 변수가 갱신되어 뒤편의 농묵(濃墨) 붓선 채움(`sumi-stroke-fill.png`)이 손잡이와 서브픽셀 단위로 정확히 동기화되어 차오름.
  - **브라우저 네이티브 핸들 가동축(10px) 1:1 정밀 정렬**: 네이티브 `<input type="range">` 핸들(폭 20px)이 박스 내에서 움직이는 물리적 중심축(`10px` ~ `calc(100% - 10px)`)에 맞춰, 트랙과 채움 바(`left: 10px; right: 10px;`) 및 시맨틱 눈금(`padding: 0 10px;`)을 동기화했습니다. 0%일 때 기필 시작점과 0 눈금, 100%일 때 테이퍼링 소멸점과 100 눈금이 핸들의 지시침과 1px의 오차도 없이 일치합니다.
  - **HTML5 시맨틱 `<datalist>` 완벽 지원**: 별도의 복잡한 div 난립 없이 웹 표준 `<datalist id="...">`와 `<option>` 태그를 사용하여 스크린 리더 접근성과 마크업 순수성 보장.
```html
<!-- 스타일 1. 서예 붓점 슬라이더 예시 -->
<div class="rw-sumi-slider-box" style="--rw-val: 72%;">
  <div class="rw-sumi-slider-box__track"></div>
  <div class="rw-sumi-slider-box__fill"></div>
  <input type="range" class="rw-sumi-slider-input rw-sumi-slider-input--dot" min="0" max="100" value="72"
         oninput="this.parentElement.style.setProperty('--rw-val', this.value + '%')">
</div>

<!-- 스타일 2. 모필 브러시 슬라이더 예시 -->
<div class="rw-sumi-slider-box" style="--rw-val: 65%;">
  <div class="rw-sumi-slider-box__track"></div>
  <div class="rw-sumi-slider-box__fill"></div>
  <input type="range" class="rw-sumi-slider-input rw-sumi-slider-input--brush" min="0" max="100" value="65"
         oninput="this.parentElement.style.setProperty('--rw-val', this.value + '%')">
</div>

<!-- 스타일 3. 서첩 척(尺) 눈금자 (<datalist> 표준 시맨틱 태그 사용) -->
<div class="rw-sumi-slider-tick-wrap">
  <div class="rw-sumi-slider-box" style="--rw-val: 50%;">
    <div class="rw-sumi-slider-box__track"></div>
    <div class="rw-sumi-slider-box__fill"></div>
    <input type="range" list="my-ticks" class="rw-sumi-slider-input rw-sumi-slider-input--tick" min="0" max="100" value="50"
           oninput="this.parentElement.style.setProperty('--rw-val', this.value + '%')">
  </div>
  <datalist id="my-ticks" class="rw-sumi-slider-ticks">
    <option value="0" label="0">0</option>
    <option value="25" label="25">25</option>
    <option value="50" label="50">50</option>
    <option value="75" label="75">75</option>
    <option value="100" label="100">100</option>
  </datalist>
</div>
```

### 4) 전통 서첩 발문(跋文) / 저자 서명란 (`.rw-sumi-colophon`)
* **개념**: 옛 선비들이 고서나 서화의 마지막 장에 집필 경위와 감회를 적고 직인을 찍던 전통 발문(跋文) 양식입니다.
* **구성**:
  - 상단: 실제 붓글씨 수묵 갈필 디바이더 (`assets/brush-divider-1.png`)
  - 좌측: 고서 간행 연호 및 판본 메타 정보 (讀書正本 第參卷 · 歲次 丙午年 秋九月 完本)
  - 우측: 저자 호(號) 및 영문 서명 + 전각 직인 도장(`[讀書正本]`) + `검증필` 인장 뱃지
```html
<footer class="rw-sumi-colophon">
  <div class="rw-colophon-divider"></div>
  <div class="rw-colophon-body">
    <div class="rw-colophon-meta">
      <div><strong>讀書正本 第參卷</strong> · Readwell Architecture v0.2.0</div>
      <div style="font-size: 0.82rem; color: var(--rw-sumi-dilute);">歲次 丙午年 秋九月 完本</div>
      <div style="font-style: italic; margin-top: 0.25rem;">"본 문서는 수묵(水墨)과 화선지의 전통 조판 규격에 따라 정식 검증을 필하였음."</div>
    </div>
    <div class="rw-colophon-signature">
      <div class="rw-colophon-sign-text">
        <div style="font-size: 0.78rem; color: var(--rw-sumi-dilute);">草堂 筆者 識</div>
        <div class="rw-colophon-author">Anon None</div>
      </div>
      <span class="rw-seal-chop rw-seal-chop--lg" title="讀書正本">
        <span>讀</span><span>書</span><span>正</span><span>本</span>
      </span>
      <span class="rw-seal-badge rw-seal-badge--solid">검증필</span>
    </div>
  </div>
</footer>
```

### 5) 수묵 원형 붓터치 스피너 (`.rw-sumi-spinner`)
* **개념**: 인위적이고 차가운 기하학적 원형 링(Pill Ring)을 탈피하여, 화선지 위에 서예 붓으로 일필휘지 휘돌려 친 **'비백호(飛白弧)' 갈필 궤적**과 **'원상(圓相, Enso)' 일필휘지 붓터치**를 웹 로딩 스피너로 구현한 컴포넌트입니다.
* **조형적 특징 & 2대 스타일 라인업**:
  1. **스타일 1. 비백호(飛白弧) 오픈 링 (Open Arc)**:
     - 굵고 묵직한 기필(起筆)에서 시작하여 회전하면서 여러 갈래의 모필 붓털로 자연스럽게 흩어지는 갈필(渴筆, dry brush) 테이퍼링 꼬리를 지닌 C자형 오픈 링.
     - 획의 굵기와 농담 변화 덕분에 회전 시 유체역학적이고 역동적인 방향성과 속도감을 제공합니다.
     - 클래스: `.rw-sumi-spinner--brush-ink`(농묵), `.rw-sumi-spinner--brush-seal`(주사), `.rw-sumi-spinner--brush-wash`(담묵)
  2. **스타일 2. 원상(圓相, Enso) 서클 (Circle Enso)**:
     - 붓을 멈추지 않고 한 번에 휘돌려 닫히기 직전의 완결미를 지닌 도넛형 원상 붓터치. 외곽을 스쳐 지나가는 섬세한 비백(飛白) 선율이 회전 궤적을 강조합니다.
     - 클래스: `.rw-sumi-spinner--enso-ink`(농묵), `.rw-sumi-spinner--enso-seal`(주사), `.rw-sumi-spinner--enso-wash`(담묵)
* **애니메이션 모드**:
  - **유장한 순환 (기본, `1.1s linear`)**: 붓터치 자체의 굵기 차이로 인해 일정한 회전에서도 스스로 자연스러운 속도감이 표현됨.
  - **기운생동 완급 펄스 (`.rw-sumi-spinner--pulse`, `1.5s cubic-bezier(0.4, 0.0, 0.2, 1)`)**: 서예가가 붓을 종이에 대어 힘을 주었다가 거두는 호흡과 율동감을 구현한 서예 특화 애니메이션.
* **크기 규격**: `--sm`(20px, 인라인/배지용), 기본(36px), `--lg`(52px, 섹션 로더), `--xl`(72px, 전체 페이지 로더).
* **접근성**: `prefers-reduced-motion: reduce` 지원 (회전 대신 은은한 수묵 호흡 펄스로 자동 전환).

```html
<!-- 1. 기본 비백호 농묵 스피너 -->
<div class="rw-sumi-spinner rw-sumi-spinner--brush-ink" role="status" aria-label="로딩 중"></div>

<!-- 2. 주사(朱砂) 붉은 인주 스피너 + 기운생동 완급 펄스 -->
<div class="rw-sumi-spinner rw-sumi-spinner--brush-seal rw-sumi-spinner--pulse" role="status" aria-label="처리 중"></div>

<!-- 3. 원상(Enso) 대형 스피너 -->
<div class="rw-sumi-spinner rw-sumi-spinner--enso-ink rw-sumi-spinner--lg" role="status" aria-label="불러오는 중"></div>

<!-- 4. 텍스트 결합 로딩 레이아웃 -->
<div class="rw-sumi-loading-box">
  <div class="rw-sumi-spinner rw-sumi-spinner--brush-seal rw-sumi-spinner--pulse" aria-hidden="true"></div>
  <div>
    <div class="rw-sumi-loading-text">墨痕 寫入中... (문서 로딩 중)</div>
    <div class="rw-sumi-loading-subtext">화선지 조판 규격을 초기화하고 있습니다</div>
  </div>
</div>
```

---

## 8. 에셋 인벤토리 (Asset Inventory)

`examples/sumi/assets/`에 포함된 그래픽 에셋의 상세 규격입니다. 모든 에셋은 알파 채널(투명 배경) 처리되어 천연 화선지 바탕에 자연스럽게 합성됩니다.

| 파일명 | 해상도 | 포맷 | 용도 및 설명 |
| :--- | :---: | :---: | :--- |
| `hanji-bg.jpg` | 1920x1080 | JPG | 천연 닥나무 섬유결이 살아있는 고해상도 화선지 배경 |
| `callout-frame-clean.png` | 380x133 | PNG (Alpha) | 기본 방필 중필형 콜아웃 프레임 |
| `callout-frame-brush.png` | 380x133 | PNG (Alpha) | 미세 붓 떨림 & 한지 먹 번짐 손맛 프레임 |
| `callout-frame-fine.png` | 380x133 | PNG (Alpha) | 정갈한 세필 날렵형 콜아웃 프레임 |
| `callout-frame-variant.png` | 380x133 | PNG (Alpha) | 대각선 대칭 보완형 콜아웃 프레임 |
| `callout-frame-round.png` | 360x130 | PNG (Alpha) | 모서리가 둥글게 굽어도는 원필 곡선 프레임 |
| `brush-divider-1.png` | 183x14 | PNG (Alpha) | 대필/중필 수묵 갈필 횡획 (실측 규격 보존, 사이드바 목차 구분용 슬림 먹선) |
| `brush-divider-2.png` | 183x14 | PNG (Alpha) | 중필 수묵 갈필·비백 횡획 (실측 규격 보존, 본문 섹션 구분용 슬림 먹선) |
| `brush-divider-3.png` | 183x14 | PNG (Alpha) | 정갈한 세필 수묵 횡획 (실측 규격 보존, 소제목 구분용 슬림 먹선) |
| `brush-divider-vertical.png` | 12x200 | PNG (Alpha) | 우측 메타 레일 세로 수묵선 (실측 규격 보존, 세로 구분용 슬림 먹선) |
| `sumi-stroke-track.png` | 846x36 (1x 282x12) | PNG (Alpha) | 컨셉아트 원본 1:1 추출 담묵(淡墨, 투명도 ~28%) 붓선 트랙 (둥근 기필 머리 ~ 테이퍼링 꼬리) |
| `sumi-stroke-fill.png` | 846x36 (1x 282x12) | PNG (Alpha) | 트랙과 1:1 완벽 일치 실루엣의 칠흑 농묵(濃墨) 채움 에셋 |
| `sumi-spinner-brush-ink.png` | 256x256 | PNG (Alpha) | 비백호(飛白弧) 오픈 링 칠흑 농묵(濃墨) 붓터치 스피너 에셋 |
| `sumi-spinner-brush-seal.png` | 256x256 | PNG (Alpha) | 비백호(飛白弧) 오픈 링 전통 주사(朱砂) 붉은 인주 붓터치 스피너 에셋 |
| `sumi-spinner-brush-wash.png` | 256x256 | PNG (Alpha) | 비백호(飛白弧) 오픈 링 은은한 담묵(淡墨) 붓터치 스피너 에셋 |
| `sumi-spinner-enso-ink.png` | 256x256 | PNG (Alpha) | 원상(圓相, Enso) 일필휘지 농묵(濃墨) 서클 붓터치 스피너 에셋 |
| `sumi-spinner-enso-seal.png` | 256x256 | PNG (Alpha) | 원상(圓相, Enso) 일필휘지 주사(朱砂) 인주 서클 붓터치 스피너 에셋 |
| `sumi-spinner-enso-wash.png` | 256x256 | PNG (Alpha) | 원상(圓相, Enso) 일필휘지 담묵(淡墨) 서클 붓터치 스피너 에셋 |
| `ink-drop.png` | 24x24 | PNG (Alpha) | 콜아웃 제목 앞 수묵 묵적(먹방울) 불릿 |
| `avatar.png` | 48x48 | PNG (Alpha) | 서예가 프로필 원형 아바타 |
| `seal-author.png` | 32x32 | PNG (Alpha) | 작성자 옆 주사 낙관 인장 |
| `seal-approved-1.png` | 32x32 | PNG (Alpha) | 우측 상단 1번 승인 낙관 인장 |
| `seal-approved-2.png` | 32x32 | PNG (Alpha) | 우측 상단 2번 승인 낙관 인장 |
| `seal-bottom.png` | 42x42 | PNG (Alpha) | 우측 하단 대형 전통 전각 낙관 비트맵 |

---

## 9. 실행 및 확인 방법

1. **로컬 브라우저로 열기**:
   ```bash
   d:/Projects/Private/readwell-css/examples/sumi/index.html
   ```
2. **인터랙티브 기능 확인**:
   - 우측 하단 플로팅 버튼: **한지 닥나무 결 On/Off** 실시간 전환 (텍스처 켜기/끄기)
   - 본문:
     - 첫 단락 **기필(起筆) 드롭캡** 조판
     - 콜아웃 5종 필세 비교
     - 수묵 색상 계조표
     - 전각 직인 도장 쇼케이스
     - **수묵 갈필 프로그레스 게이지 (인주 붓점 / 서예 점획 마커)**
     - **수묵 인터랙티브 슬라이더 3종 (서예 붓점, 모필 브러시, 척 눈금자)**
     - **수묵 원형 붓터치 스피너 (비백호 오픈 링 & 원상 Enso 2대 스타일, 기운생동 완급 펄스)**
     - **전통 서첩 발문(跋文) 서명란**
   - 우측 사이드바: `Approved by [讀書正本]` 컴포넌트 직인 도장과 실제 비트맵 1:1 비교

---

## 10. 조형 무결성 거버넌스 (Design Integrity Governance)

Sumi 테마의 핵심 매력은 **서예 특유의 긴장감 있는 날렵한 선율(6~8px)과 맑은 여백**에 있습니다. 에셋이나 스타일을 유지보수할 때 다음 원칙을 절대 훼손하지 않아야 합니다:

1. **과도한 두께 확장 금지 (Anti-Bulking)**:
   - 프로그레스 바와 슬라이더의 컨테이너 높이는 `12px`(획 두께 6~8px)를 절대 기준으로 유지합니다.
   - 임의로 서예 대자 글씨를 키워 20px 이상의 몽둥이 같은 둔탁한 획으로 교체하지 않습니다.
2. **기필(起筆)과 수필(收筆)의 보존**:
   - 시작점은 둥글고 도톰한 유선형 기필 머리를 유지하고, 사각형으로 칼같이 잘린 획을 쓰지 않습니다.
   - 끝단은 오른쪽으로 갈수록 자연스럽게 가늘어지는 테이퍼링(tapering) 소멸 궤적을 보존합니다.
3. **트랙과 채움의 1:1 실루엣 합치**:
   - `sumi-stroke-track.png`(담묵)와 `sumi-stroke-fill.png`(농묵)는 완전히 동일한 윤곽 마스크를 공유해야 하며, 서로 다른 형태의 에셋을 조합하지 않습니다.
4. **신축 대응 디바이더의 슬림함 유지**:
   - 가로형 디바이더(`brush-divider-1~3.png`)와 세로형 디바이더(`brush-divider-vertical.png`)는 레이아웃 폭이 늘어나더라도 두께 6~10px의 맑고 우아한 선을 유지해야 합니다.

