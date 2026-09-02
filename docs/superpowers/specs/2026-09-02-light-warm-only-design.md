# Readwell CSS Light & Warm Paper Curation Design Spec

## 1. 개요 및 큐레이션 철학 (Philosophy)
Readwell CSS는 **"오래 읽을수록 조용하고 편안한 종이 가독성"**이라는 본질적 아이덴티티에 100% 집중하기 위해, 어색한 다크 모드(`dark`)와 불필요한 세피아(`sepia`)를 과감히 걷어내고, 가장 완성도 높은 **2종의 퓨어 페이퍼 테마 (Light & Warm Paper)**만을 엄선하여 정제(Curate)합니다.

---

## 2. 엄선된 2대 페이퍼 테마 (Curated Paper Duo)

### 2.1 Light 📄 (Natural Paper - 기본)
- **성격**: 맑고 정갈한 내추럴 백상지/아이보리 페이퍼
- **적합 대상**: 지식 문서, 워크스페이스, 대시보드, 현대적인 웹 UI
- **토큰**:
  - `--rw-paper: #faf8f3;` (배경)
  - `--rw-paper-2: #fcfbf8;` (카드/패널)
  - `--rw-paper-3: #efece4;` (컨트롤/칩)
  - `--rw-text: #1f1f1f;` (본문 잉크)
  - `--rw-line: #e2ddd2;` (연필선 보더)

### 2.2 Warm Paper 📖 (Cream Book Paper - `[data-rw-theme="warm"]`)
- **성격**: 단행본 소설책 감성의 따뜻하고 눈이 편안한 미색 크림지 페이퍼
- **적합 대상**: 장문 독서, 기술 블로그, 호흡이 긴 아티클, 에세이
- **토큰**:
  - `--rw-paper: #f4efe2;` (크림지 배경)
  - `--rw-paper-2: #faf6ec;` (소프트 웜 패널)
  - `--rw-paper-3: #eae3d2;` (웜 컨트롤/칩)
  - `--rw-text: #28231d;` (에스프레소 잉크)
  - `--rw-line: #ded4c0;` (따뜻한 보더)

---

## 3. 정리 및 제거 대상 (Removed Items)
1. `src/modes.css`:
   - `[data-rw-theme="sepia"]` 제거
   - `[data-rw-theme="dark"]` 및 `@media (prefers-color-scheme: dark)` 제거
   - `[data-rw-theme="warm"]`만 깔끔하게 유지
2. `examples/switcher.js` 및 `examples/switcher.css`:
   - Theme Selector를 **`Light 📄` (기본)**와 **`Warm 📖`** 2단 세그먼트 버튼으로 간결화
   - `Auto`, `Sepia`, `Dark` 버튼 제거

---

## 4. 기대 효과
- 프레임워크 CSS 번들 크기 대폭 경량화 (불필요한 다크/세피아 규칙 삭제)
- E-Ink 페이퍼 프레임워크로서의 순수성과 정체성 극대화
- 사용자에게 가장 확실하고 검증된 2가지 종이 질감 경험만 명확히 전달
