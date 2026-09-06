# Sumi CSS - 64종 그래픽 에셋 인벤토리 (03_ASSET_INVENTORY)

> **"무손실 호환성 원칙(Lossless Compatibility)과 차세대 점진적 향상(Progressive Enhancement)"**  
> 본 문서는 `packages/sumi-css/assets/` 및 배포 번들(`dist/assets/`)에 수록된 64종 그래픽 에셋의 상세 규격, 포맷, 용량 및 최적화 정책 명세서입니다.

---

## 1. 에셋 관리 원칙 및 아키텍처

### 1) 무손실 호환성 원칙 (Lossless Compatibility)
* 기존 원본 에셋(PNG 62종, JPG 1종)은 1바이트의 손실 없이 100% 온전하게 보존합니다.
* 레거시 브라우저나 WebP를 지원하지 않는 렌더러에서도 결함 없이 폴백 작동합니다.

### 2) 3-Tier 점진적 향상 (Progressive Enhancement)
* 최신 모던 브라우저를 위해 고압축 무손실/시각무손실 WebP 에셋을 함께 번들링합니다.
* CSS `image-set()`을 통해 WebP를 우선 요청하고 실패 시 원본 포맷으로 자동 폴백합니다.

### 3) 단일 알파 마스크 최적화
* 스피너 색상별(농묵, 주사, 담묵) 12종의 이미지를 개별 전송하는 대신, 단 2종의 알파 마스크(`*-mask.webp`)와 CSS `currentColor`를 결합하여 전송량을 극적으로 절감합니다.

---

## 2. 64종 그래픽 에셋 전체 인벤토리 명세

### 1) 천연 화선지 배경 (2종)

| 파일명 | 해상도 | 포맷 | 용량 | 용도 및 설명 |
| :--- | :---: | :---: | :---: | :--- |
| **`hanji-bg.webp`** | 2064×1152 | WebP | **72.7 KB** | 천연 닥나무 섬유결 고정 화선지 배경 (83.1% 절감, `image-set()` 우선 로딩) |
| **`hanji-bg.jpg`** | 2064×1152 | JPG | 431.0 KB | 천연 닥나무 섬유결 원본 배경 (구형 브라우저 폴백) |

### 2) 스피너 단일 알파 마스크 (4종)

| 파일명 | 해상도 | 포맷 | 용량 | 용도 및 설명 |
| :--- | :---: | :---: | :---: | :--- |
| **`sumi-spinner-brush-mask.webp`** | 256×256 | WebP | 63.0 KB | 비백호(飛白弧) 스피너 알파 마스크 (CSS 동적 안료 합성용) |
| **`sumi-spinner-brush-mask.png`** | 256×256 | PNG | 95.7 KB | 비백호 스피너 원본 알파 마스크 |
| **`sumi-spinner-enso-mask.webp`** | 256×256 | WebP | 38.8 KB | 원상(圓相, Enso) 스피너 알파 마스크 (CSS 동적 안료 합성용) |
| **`sumi-spinner-enso-mask.png`** | 256×256 | PNG | 66.3 KB | 원상 스피너 원본 알파 마스크 |

### 3) 수묵 콜아웃 프레임 5종 (10종)

| 파일명 | 해상도 | 포맷 | 용량 (WebP / PNG) | 용도 및 필세 특징 |
| :--- | :---: | :---: | :---: | :--- |
| `callout-frame-clean.webp` / `.png` | 380×133 | WebP / PNG | 20.3 KB / 43.8 KB | 기본 방필(方筆) 중필형 각진 사각 프레임 |
| `callout-frame-brush.webp` / `.png` | 380×133 | WebP / PNG | 22.8 KB / 49.3 KB | 미세 붓 떨림 & 한지 먹 번짐 손맛 프레임 |
| `callout-frame-fine.webp` / `.png` | 380×133 | WebP / PNG | 17.5 KB / 38.6 KB | 정갈한 세필(細筆) 날렵형 사각 프레임 |
| `callout-frame-variant.webp` / `.png` | 380×133 | WebP / PNG | 21.0 KB / 45.1 KB | 대각선 대칭 보완형(음양 균형) 프레임 |
| `callout-frame-round.webp` / `.png` | 360×130 | WebP / PNG | 19.4 KB / 41.2 KB | 모서리가 둥글게 굽어도는 원필(圓筆) 곡선 개방형 프레임 |

### 4) 수묵 붓터치 디바이더 (8종)

| 파일명 | 해상도 | 포맷 | 용량 (WebP / PNG) | 용도 및 필세 특징 |
| :--- | :---: | :---: | :---: | :--- |
| `brush-divider-1.webp` / `.png` | 183×14 | WebP / PNG | 1.8 KB / 3.4 KB | 대필/중필 수묵 갈필 횡획 (사이드바 목차 구분선) |
| `brush-divider-2.webp` / `.png` | 183×14 | WebP / PNG | 1.9 KB / 3.6 KB | 중필 수묵 갈필·비백 횡획 (본문 섹션 구분선) |
| `brush-divider-3.webp` / `.png` | 183×14 | WebP / PNG | 1.5 KB / 2.9 KB | 정갈한 세필 수묵 횡획 (소제목 구분선) |
| `brush-divider-vertical.webp` / `.png` | 12×200 | WebP / PNG | 1.2 KB / 2.2 KB | 우측 메타 레일 세로 수묵선 |

### 5) 프로그레스 & 슬라이더 스트로크 (4종)

| 파일명 | 해상도 | 포맷 | 용량 (WebP / PNG) | 용도 및 필세 특징 |
| :--- | :---: | :---: | :---: | :--- |
| `sumi-stroke-track.webp` / `.png` | 846×36 | WebP / PNG | 8.9 KB / 18.4 KB | 12px 담묵(淡墨) 붓선 트랙 (둥근 기필 ~ 테이퍼링) |
| `sumi-stroke-fill.webp` / `.png` | 846×36 | WebP / PNG | 9.4 KB / 19.8 KB | 12px 칠흑 농묵(濃墨) 붓선 채움 에셋 |

### 6) 비백호(飛白弧) 스피너 컬러 에셋 (12종)

| 파일명 | 해상도 | 포맷 | 용량 (WebP / PNG) | 용도 및 설명 |
| :--- | :---: | :---: | :---: | :--- |
| `sumi-spinner-brush-ink.webp` / `.png` | 256×256 | WebP / PNG | 33.2 KB / 62.4 KB | 비백호 농묵(濃墨) 스피너 |
| `sumi-spinner-brush-seal.webp` / `.png` | 256×256 | WebP / PNG | 34.0 KB / 63.8 KB | 비백호 주사(朱砂) 붉은 인주 스피너 |
| `sumi-spinner-brush-wash.webp` / `.png` | 256×256 | WebP / PNG | 31.8 KB / 59.7 KB | 비백호 담묵(淡墨) 스피너 |
| `sumi-spinner-brush-ink-rev.webp` / `.png` | 256×256 | WebP / PNG | 33.1 KB / 62.1 KB | 비백호 농묵 좌우반전 (역회전용) |
| `sumi-spinner-brush-seal-rev.webp` / `.png` | 256×256 | WebP / PNG | 33.9 KB / 63.5 KB | 비백호 주사 좌우반전 (역회전용) |
| `sumi-spinner-brush-wash-rev.webp` / `.png` | 256×256 | WebP / PNG | 31.7 KB / 59.4 KB | 비백호 담묵 좌우반전 (역회전용) |

### 7) 원상(圓相, Enso) 스피너 컬러 에셋 (12종)

| 파일명 | 해상도 | 포맷 | 용량 (WebP / PNG) | 용도 및 설명 |
| :--- | :---: | :---: | :---: | :--- |
| `sumi-spinner-enso-ink.webp` / `.png` | 256×256 | WebP / PNG | 28.4 KB / 53.1 KB | 원상 농묵(濃墨) 붓터치 스피너 |
| `sumi-spinner-enso-seal.webp` / `.png` | 256×256 | WebP / PNG | 29.1 KB / 54.6 KB | 원상 주사(朱砂) 인주 스피너 |
| `sumi-spinner-enso-wash.webp` / `.png` | 256×256 | WebP / PNG | 27.2 KB / 51.0 KB | 원상 담묵(淡墨) 스피너 |
| `sumi-spinner-enso-ink-rev.webp` / `.png` | 256×256 | WebP / PNG | 28.3 KB / 52.8 KB | 원상 농묵 좌우반전 (역회전용) |
| `sumi-spinner-enso-seal-rev.webp` / `.png` | 256×256 | WebP / PNG | 29.0 KB / 54.3 KB | 원상 주사 좌우반전 (역회전용) |
| `sumi-spinner-enso-wash-rev.webp` / `.png` | 256×256 | WebP / PNG | 27.1 KB / 50.7 KB | 원상 담묵 좌우반전 (역회전용) |

### 8) 수묵 점획, 인장 및 아바타 (12종)

| 파일명 | 해상도 | 포맷 | 용량 (WebP / PNG) | 용도 및 설명 |
| :--- | :---: | :---: | :---: | :--- |
| `ink-drop.webp` / `.png` | 24×24 | WebP / PNG | 0.8 KB / 1.5 KB | 콜아웃 제목 앞 수묵 묵적(먹방울) 불릿 |
| `avatar.webp` / `.png` | 48×48 | WebP / PNG | 2.4 KB / 4.8 KB | 서예가 프로필 원형 아바타 |
| `seal-author.webp` / `.png` | 32×32 | WebP / PNG | 1.4 KB / 2.6 KB | 작성자 옆 주사 낙관 인장 |
| `seal-approved-1.webp` / `.png` | 32×32 | WebP / PNG | 1.3 KB / 2.5 KB | 우측 상단 1번 승인 낙관 인장 |
| `seal-approved-2.webp` / `.png` | 32×32 | WebP / PNG | 1.4 KB / 2.7 KB | 우측 상단 2번 승인 낙관 인장 |
| `seal-bottom.webp` / `.png` | 42×42 | WebP / PNG | 2.1 KB / 4.1 KB | 우측 하단 대형 전통 전각 낙관 비트맵 |

---

## 3. 포맷별 용량 통계 및 절감 효과 요약

| 분류 | 에셋 수 | 원본 총용량 (PNG/JPG) | WebP 총용량 | 평균 절감률 |
| :--- | :---: | :---: | :---: | :---: |
| **화선지 배경** | 2종 | 431.0 KB | 72.7 KB | **83.1% 절감** |
| **스피너 알파 마스크** | 4종 | 162.0 KB | 101.8 KB | **37.2% 절감** |
| **콜아웃 프레임 5종** | 10종 | 218.0 KB | 101.0 KB | **53.7% 절감** |
| **디바이더 4종** | 8종 | 12.1 KB | 6.4 KB | **47.1% 절감** |
| **프로그레스/슬라이더** | 4종 | 38.2 KB | 18.3 KB | **52.1% 절감** |
| **스피너 컬러 에셋** | 24종 | 694.7 KB | 370.8 KB | **46.6% 절감** |
| **점획/인장/아바타** | 12종 | 18.2 KB | 9.4 KB | **48.4% 절감** |
| **총계** | **64종** | **1,574.2 KB** | **680.4 KB** | **약 56.8% 절감** |

---

## 4. 빌드 파이프라인 무손실 동기화 명세

* `packages/sumi-css/scripts/build.js` 빌드 스크립트는 `packages/sumi-css/assets/` 내 64종 파일 전체를 `packages/sumi-css/dist/assets/`로 무손실 복사(`fs.cpSync`)합니다.
* `packages/sumi-css/scripts/test.js` 테스트 러너는 다음을 정량 검증합니다:
  1. `dist/assets/` 내 핵심 에셋(화선지 배경, 스피너 마스크, 디바이더 등)의 존재 여부
  2. `dist/sumi.css` 내 모든 `url(...)` 참조 경로가 실제 파일과 1:1로 매칭되는지 여부
