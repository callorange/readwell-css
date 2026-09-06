# Readwell Chrome Extension 기획

## 1. 목적

Readwell Extension은 기존 웹사이트의 레이아웃을 크게 바꾸지 않고, 색감과 움직임, 일부 독서 설정을 Readwell 스타일로 조정하는 Chrome 확장 기능입니다.

목표는 “모든 사이트를 완전히 예쁘게 바꾸는 것”이 아니라, 텍스트가 많은 사이트와 정보가 많은 제품 UI를 **더 차분하고 더 명확하게** 만드는 것입니다.

## 2. 핵심 사용 시나리오

### 시나리오 A: 텍스트 사이트 색감 조정

사용자는 특정 뉴스/블로그/문서 사이트에서 Readwell을 켭니다. 확장 기능은 배경색, 글자색, border, 링크색을 Readwell 팔레트로 바꿉니다.

### 시나리오 B: 긴 글 읽기 모드

사용자는 Wikipedia, 기술 문서, 블로그에서 Reading 모드를 켭니다. 확장 기능은 본문 폭과 line-height를 조정합니다.

### 시나리오 C: 제품형 사이트의 조용한 보정

사용자는 GitHub, 커뮤니티, 대시보드형 서비스에서 Color only 또는 Calm 모드를 사용합니다. 이 경우 extension은 전체 구조를 깨뜨리지 않으면서 surface 색감, border, shadow, 상태 강조를 Readwell 톤으로 정돈합니다.

### 시나리오 D: 사이트별 설정

사용자는 사이트마다 다른 강도를 저장합니다.

```text
news.hada.io       → Calm
wikipedia.org      → Reading
github.com         → Color only
notion.so          → Calm
novelpia.com       → Off
```

### 시나리오 E: Readwell CSS 기반 사이트 보정

Readwell CSS를 이미 쓰는 사이트에서는 extension이 과도하게 다시 스타일을 덮지 않고, 사용자 override 값만 적용할 수 있어야 합니다.

## 3. 적용 모드

| 모드 | 설명 | 위험도 |
|---|---|---:|
| Off | 적용 안 함 | 없음 |
| Color only | 색상 토큰 중심으로만 적용 | 낮음 |
| Calm | 색상 + shadow/animation/gradient 제거 | 중간 |
| Reading | Calm + 본문 폭/줄간격/폰트 조정 | 높음 |

제품형 사이트에서는 `Color only`와 `Calm`이 주력이고, 문서형 사이트에서는 `Reading`이 더 유용합니다.

## 4. 기능 요구사항

### EXT-F-001 사이트별 on/off

현재 도메인에 대해 Readwell 적용 여부를 저장합니다.

### EXT-F-002 강도 선택

Off, Color only, Calm, Reading 중 선택할 수 있습니다.

### EXT-F-003 Token override

사용자는 다음 값을 조정할 수 있습니다.

- paper
- paper-2
- text
- muted
- line
- primary / secondary
- success / warning / danger / info
- font size
- line-height
- content width

### EXT-F-004 Exclusion selector

깨지는 영역을 제외할 수 있어야 합니다.

예:

```text
.video-player, canvas, .monaco-editor, [contenteditable="true"]
```

### EXT-F-005 이미지 처리 옵션

- 원본 유지
- grayscale
- contrast 조정

MVP에서는 원본 유지가 기본입니다.

### EXT-F-006 Form/control 보호

웹사이트의 checkbox, radio, switch, select, code editor, rich editor는 extension 적용으로 기능이 깨지기 쉬우므로 Reading 모드에서도 보수적으로 처리합니다.

### EXT-F-007 Motion 제거

Calm 이상에서는 다음 효과를 제거합니다.

- animation
- transition
- text-shadow
- box-shadow
- gradient background

단, 사이트 기능에 영향을 줄 수 있는 transform/layout 속성은 무리하게 제거하지 않습니다.

### EXT-F-008 Surface-aware tuning

extension은 사이트 유형에 따라 다른 보수성 수준을 가져야 합니다.

- article/docs: 본문 폭/행간 조정 적극 적용 가능
- workspace: 패널 배경, 구분선, 메타 정보 정리 위주
- dashboard/dense UI: 구조를 유지하고 색감/구분선/shadow 정리 위주
- video/media 중심 사이트: player를 건드리지 않고 주변 UI만 조정

## 5. 구현 구조

```text
readwell-extension/
├─ manifest.json
├─ src/
│  ├─ content.ts
│  ├─ popup.ts
│  ├─ options.ts
│  ├─ storage.ts
│  └─ themes.ts
├─ public/
│  ├─ popup.html
│  └─ options.html
└─ styles/
   └─ injected.css
```

## 6. CSS injection 방식

content script가 현재 사이트 설정을 읽고, `style` 태그를 주입합니다.

```js
const style = document.createElement('style')
style.dataset.readwell = 'true'
style.textContent = buildReadwellCSS(settings)
document.documentElement.appendChild(style)
```

Readwell CSS와 extension은 neutral token뿐 아니라 `primary`, `secondary`, `success`, `warning`, `danger`, `info` semantic token source도 공유하는 것을 목표로 합니다.

단, 일반 웹사이트에서 임의의 요소가 실제로 success/warning/danger 중 무엇인지 extension이 안전하게 추론할 수 있다고 가정하지 않습니다. semantic token의 정확한 매핑은 Readwell CSS 기반 사이트나 명시적으로 식별 가능한 상태 UI에서 우선 활용합니다.

## 7. 주의사항

- `!important`는 최소화하되 extension에서는 일부 필요할 수 있음
- 입력기, 코드 에디터, 지도, 비디오 플레이어는 제외 대상
- 모든 사이트의 layout을 수정하려고 하지 말 것
- Reading 모드는 opt-in으로만 제공할 것
- 사용자가 쉽게 끌 수 있어야 함
- 기존 사이트의 card, accordion, modal, dropdown 등의 동작을 재구현하려고 하지 말 것
- Extension은 Readwell CSS 컴포넌트 라이브러리가 아니라 기존 사이트를 조용하게 만드는 보정 도구로 유지할 것
- 제품형 사이트에서는 구분감과 구조를 약화시키지 않도록 보수적으로 동작할 것

## 8. MVP 범위

MVP extension은 다음만 구현합니다.

- 도메인별 on/off
- 3단계 모드
- 기본 warm paper + restrained semantic color theme
- animation/shadow 제거
- 간단한 popup UI
- exclusion selector 최소 지원
- 제품형 사이트에 대한 보수적 surface-aware 적용 정책

고급 기능은 후순위입니다.
