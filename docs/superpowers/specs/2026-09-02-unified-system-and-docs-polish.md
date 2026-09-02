# Unified System & Docs Polish Design Spec (12-Col Grid, Typography, Forms & Consistency)

## 1. 목적 및 개요 (Goals & Overview)
사용자의 피드백을 기반으로 7대 개선 작업을 수행합니다:
1. **12칸 그리드 시스템 & Column Span 지원**: 현대 CSS 프레임워크 표준에 부합하는 12열 그리드(`.rw-grid-12`, `.rw-grid-6`, `.rw-grid-1`~`.rw-grid-12`) 및 `.rw-col-span-1`~`.rw-col-span-12`, `.rw-col-span-full`, `.rw-col-span-6`, `.rw-col-span-4`, `.rw-col-span-3`, `.rw-col-span-8` 유틸리티 추가.
2. **`.rw-stack` 전용 라이브 쇼케이스**: 수직 흐름 및 밀도 연동을 시각적으로 확인할 수 있는 독립 데모 추가.
3. **타이포그래피 굵기 & 텍스트 서식 태그 명세**: `<strong>`, `<b>`, `<em>`, `<i>`, `<small>`, `.rw-bold`, `.rw-semibold`, `.rw-normal`, `.rw-light`, `.rw-muted`, `.rw-strong` 서식 완비.
4. **`.rw-meta` 전용 라이브 프리뷰**: 아티클 메타데이터, 타임스탬프, 작성자, 조회수 등의 조합 예제 추가.
5. **체크박스 Hover 상태 개선**: `:checked` 상태에서 hover 시 배경색이 지워지거나 체크 표시가 사라지던 버그 수정 (`:hover:not(:checked)` 및 `:checked:hover` 분리).
6. **토글 스위치 슬라이딩 모션 안정화**: `transform: translateX(1em)` 기반 하드웨어 가속 전환으로 확실한 스위치 이동 애니메이션 보장.
7. **전체 예제 페이지(`examples/` 전수) 일관성 통일**: 상단 내비게이션 바, 헤더 브랜딩, 테마/밀도 스위처 연동, 컴포넌트 렌더링을 일관된 표준 규격으로 정돈.

---

## 2. 세부 스펙 (Detailed Specifications)

### 2.1 12-Column Grid System (`src/layout.css`)
```css
.rw-grid-12 { display: grid; gap: var(--rw-density-gap); grid-template-columns: repeat(12, minmax(0, 1fr)); }
.rw-grid-6  { display: grid; gap: var(--rw-density-gap); grid-template-columns: repeat(6, minmax(0, 1fr)); }

.rw-col-span-1  { grid-column: span 1 / span 1; }
.rw-col-span-2  { grid-column: span 2 / span 2; }
.rw-col-span-3  { grid-column: span 3 / span 3; }
.rw-col-span-4  { grid-column: span 4 / span 4; }
.rw-col-span-6  { grid-column: span 6 / span 6; }
.rw-col-span-8  { grid-column: span 8 / span 8; }
.rw-col-span-12 { grid-column: span 12 / span 12; }
.rw-col-span-full { grid-column: 1 / -1; }
```

### 2.2 체크박스/라디오 Hover 분리 (`src/forms.css`)
- `:hover:not(:checked)` -> `--rw-paper-3`
- `:checked:hover` -> `--rw-primary-strong`

### 2.3 토글 스위치 모션 개선 (`src/forms.css`)
- `transform: translateX(0)` -> `transform: translateX(1em)` with smooth bezier timing.

### 2.4 타이포그래피 굵기 유틸리티 (`src/typography.css`)
- `.rw-bold` (700), `.rw-semibold` (600), `.rw-normal` (400), `.rw-light` (300)
- `strong`, `b`, `em`, `i`, `small` 태그 서식 지원.

### 2.5 예제 페이지 전수 통일 (`examples/*`)
- 상단 내비게이션에 `[공식 문서 (Docs)]`, `[템플릿 허브]`, `[컴포넌트 카탈로그]`, `[GitHub]` 링크 통일.
