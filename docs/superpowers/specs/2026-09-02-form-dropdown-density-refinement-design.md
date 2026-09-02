# Form Validation, Dropdown, Mode Switcher Tooltip/Jitter Fix & Density System Refinement Design Spec

## 1. 개요 (Overview)
사용자 피드백을 반영하여 다음 6가지 핵심 영역을 개선합니다:
1. **Form Valid State**: `aria-invalid="false"`, `:user-valid:not(:placeholder-shown)`, `.is-valid`, `.rw-form-success` 스타일 추가.
2. **Dropdown Visual Connection**: 드롭다운 메뉴와 트리거 버튼 사이의 이중 간격을 제거하고 4px로 밀착 연결.
3. **Mode Switcher `ⓘ` Pure CSS 툴팁**: 브라우저 딜레이 없는 즉시 반응형 `data-tooltip` 말풍선 구현.
4. **Mode Switcher Layout Shift (Jitter) 제거**: 실시간 힌트 바를 고정 높이 박스로 안정화하여 패널 덜컹거림 완벽 차단.
5. **Surface Family & Density System 체감 강화**: Density(`cozy`/`comfortable`/`compact`)를 테이블 셀(`th, td`), 버튼, 인풋, 패널, 그리드에 실질적으로 연동.
6. **GitHub 리포지토리 링크 수정**: `https://github.com/callorange/readwell-css`로 정상화.

---

## 2. 세부 설계 (Detailed Design)

### 2.1 Form Valid State (`src/forms.css`)
- `input[aria-invalid="false"]`, `select[aria-invalid="false"]`, `textarea[aria-invalid="false"]`, `.is-valid`: `border-color: var(--rw-success) !important;`
- `:user-valid:not(:placeholder-shown):not([aria-invalid="true"])`: `border-color: var(--rw-success);`
- `.rw-form-success`: `font-size: 0.85em; color: var(--rw-success-strong); margin-top: 0.25rem; font-weight: 500; display: block;`

### 2.2 Dropdown Visual Connection (`src/components.css`)
- `details.rw-dropdown .rw-dropdown-menu`:
  - `margin: 0;` (이중 여백 버그 제거)
  - `top: calc(100% + 4px);`
  - `min-width: 100%;` (최소 트리거 버튼 너비와 동기화)
  - `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);`
- `details.rw-dropdown[open] > summary.rw-button`:
  - `border-color: var(--rw-primary);`

### 2.3 Mode Switcher `ⓘ` CSS Tooltip (`examples/switcher.css`, `examples/switcher.js`)
- `span.rw-switcher-info-badge[data-tooltip]` 구조.
- CSS `::after`로 호버 및 포커스 즉시 상단에 말풍선 표시 (`position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%);`).

### 2.4 Mode Switcher Hint Box Layout Shift Fix (`examples/switcher.css`)
- `.rw-switcher-hint`:
  - `height: 3.2rem; min-height: 3.2rem; max-height: 3.2rem;` 고정.
  - `display: flex; align-items: flex-start;`로 상단 정렬.
  - 1줄~3줄 텍스트 변화 시에도 패널 전체 및 하단 초기화 버튼의 위치가 1px도 흔들리지 않음.

### 2.5 Surface Family & Density System 실질 연동 (`src/tables.css`, `src/elements.css`, `src/modes.css`, `src/tokens.css`)
- **Density System**:
  - `cozy`: `--rw-density-table-pad: 0.85rem 1rem; --rw-density-btn-pad: 0.65em 1.25em; --rw-density-gap: 1.5rem;`
  - `comfortable`: `--rw-density-table-pad: 0.55rem 0.85rem; --rw-density-btn-pad: 0.5em 1em; --rw-density-gap: 1rem;`
  - `compact`: `--rw-density-table-pad: 0.35rem 0.55rem; --rw-density-btn-pad: 0.3em 0.65em; --rw-density-gap: 0.5rem;`
  - `th, td`: `padding: var(--rw-density-table-pad, 0.55rem 0.85rem);` 적용.
  - `.rw-button`, `button`, `input[type="button"]`: `padding: var(--rw-density-btn-pad, 0.5em 1em);` 적용.
- **Surface Family**:
  - `reading`: `max-width: 46rem; margin-inline: auto; line-height: 1.75;`
  - `dense`: 컴팩트 테이블 및 폼 압축 기본 적용.

### 2.6 GitHub Link Correction (`examples/index.html`, `scripts/build.js`, `package.json`)
- `https://github.com/callorange/readwell-css`로 일괄 갱신.
