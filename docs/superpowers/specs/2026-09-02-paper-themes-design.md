# Readwell CSS Paper Themes Spectrum Design Spec

## 1. 개요 (Overview)
Readwell CSS에 전자책 리더(Kindle, Apple Books, Kobo)의 독서 경험을 완벽하게 재현하는 **4대 페이퍼 테마 스펙트럼 (Paper Theme Spectrum)**을 도입합니다:

1. **Light (`light` - 기본)**: 맑고 정갈한 내추럴 백상지/아이보리 페이퍼
2. **Warm Paper (`warm`)**: 단행본 소설책처럼 아늑하고 따뜻한 미색 크림지 페이퍼
3. **Sepia (`sepia`)**: 눈의 피로를 최소화하는 클래식 빈티지 앰버 세피아 페이퍼
4. **Night Dark (`dark`)**: 불 꺼진 방에서 읽는 아늑한 웜 에스프레소 차콜 나이트 페이퍼

---

## 2. 4대 페이퍼 테마 토큰 매트릭스 (Theme Token Matrix)

| 구분 | Light (기본) | Warm Paper (`warm`) | Sepia (`sepia`) | Night Dark (`dark`) |
|---|---|---|---|---|
| **--rw-paper** (배경) | `#faf8f3` | `#f4efe2` | `#eae0cb` | `#201e1b` |
| **--rw-paper-2** (카드/패널) | `#fcfbf8` | `#faf6ec` | `#f2eadc` | `#272421` |
| **--rw-paper-3** (칩/컨트롤) | `#efece4` | `#eae3d2` | `#ddcfb6` | `#322e2a` |
| **--rw-text** (본문) | `#1f1f1f` | `#28231d` | `#34271b` | `#dcd6cb` |
| **--rw-text-muted** (보조) | `#6b6b6b` | `#756c60` | `#7e6e5b` | `#938d82` |
| **--rw-line** (보더) | `#e2ddd2` | `#ded4c0` | `#cfbf9f` | `#3d3832` |
| **--rw-line-strong** | `#b8b2a4` | `#b8ab94` | `#a89673` | `#5a534b` |
| **--rw-focus** | `#2e6ad2` | `#4a6f94` | `#587588` | `#6b8eae` |

---

## 3. 시맨틱 컬러 테마별 조율 (Semantic Matrix)

모든 테마에서 `primary`, `secondary`, `success`, `warning`, `danger`, `info`의 base/soft/strong이 해당 종이의 색온도(Color Temperature)에 맞추어 수채화처럼 부드럽게 스며들도록 구성합니다.

---

## 4. 모드 스위처(`examples/switcher.js`) 연동

- 스위처의 Theme Mode 섹션에 4개 선택지 제공:
  - `Light 📄`
  - `Warm 📖`
  - `Sepia 📜`
  - `Dark 🌙`
- `document.documentElement.dataset.rwTheme = 'light' | 'warm' | 'sepia' | 'dark'`
- `localStorage` 상태 저장 및 모든 예제 페이지 간 실시간 동기화.
