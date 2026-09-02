# Readwell CSS Dark Mode Design Spec

## 1. 개요 (Overview)
Readwell CSS의 핵심 철학인 **"E-Ink에서 영감을 얻은 저자극·고가독성"**을 야간 및 저조도 환경에 맞게 확장한 **다크 모드 (`[data-rw-theme="dark"]`)**를 설계하고 구현합니다.

눈부심을 유발하는 순수 블랙(#000000)과 과도하게 밝은 흰색(#FFFFFF) 텍스트를 지양하고, **차분한 다크 차콜/흑연 페이퍼 질감과 저채도 시맨틱 컬러 매트릭스**를 제공합니다.

---

## 2. 디자인 토큰 매트릭스 (Dark Mode Token Matrix)

### 2.1 중립 표면 및 텍스트 (Neutral Surface & Text)

| 토큰 | 라이트 모드 (Default) | 다크 모드 (`dark`) | 설명 / 역할 |
|---|---|---|---|
| `--rw-paper` | `#faf8f3` (소프트 페이퍼) | `#191c18` (다크 차콜 페이퍼) | 최하단 캔버스 배경 |
| `--rw-paper-2` | `#fcfbf8` (카드/패널) | `#222621` (엘리베이티드 서피스) | 카드, 사이드바, 패널, 모달 |
| `--rw-paper-3` | `#efece4` (인셋/호버) | `#2d332c` (인셋 컨트롤) | 버튼, 배지, 입력창, 호버 |
| `--rw-text` | `#1f1f1f` (딥 차콜) | `#e8e4da` (소프트 웜 아이보리) | 본문 메인 텍스트 (WCAG AAA) |
| `--rw-text-muted` | `#6b6b6b` (미디엄 그레이) | `#9da39b` (세컨더리 그레이) | 캡션, 메타, 보조 텍스트 |
| `--rw-line` | `#e2ddd2` (연필선) | `#373d35` (소프트 다크 보더) | 1px 구조 구분선 |
| `--rw-line-strong` | `#b8b2a4` (강한 보더) | `#525a4f` (강조 보더) | 버튼 외곽선, 강조 구분선 |
| `--rw-focus` | `#2e6ad2` | `#5c8fd6` | 포커스 링 |

### 2.2 저채도 시맨틱 컬러 매트릭스 (Dark Semantic Color Matrix)

| Semantic | Base (`--rw-*-dark`) | Soft (`--rw-*-soft`) | Strong (`--rw-*-strong`) |
|---|---|---|---|
| **Primary** | `#7ba2c7` (Muted Blue) | `#21303f` (Dark Navy Soft) | `#a5c8ea` (Bright Accent) |
| **Secondary** | `#9aa89c` (Sage Gray) | `#263028` (Dark Olive Soft) | `#b8c5ba` (Light Sage) |
| **Success** | `#88b380` (Muted Green) | `#223320` (Dark Forest Soft) | `#a8d4a0` (Bright Green) |
| **Warning** | `#d4a759` (Warm Amber) | `#362a14` (Dark Amber Soft) | `#edd08a` (Bright Amber) |
| **Danger** | `#cf7c78` (Terracotta) | `#381e1e` (Dark Terracotta) | `#e89f9c` (Bright Red) |
| **Info** | `#8ca3b8` (Blue Gray) | `#24303b` (Dark Slate Soft) | `#b0c7db` (Bright Info) |

---

## 3. 활성화 및 셀렉터 규칙 (Activation Rules)

1. **명시적 다크 테마 속성**:
   ```css
   :root[data-rw-theme="dark"],
   [data-rw-theme="dark"] {
     /* Dark tokens overrides */
   }
   ```
2. **OS 시스템 다크 모드 자동 감지**:
   ```css
   @media (prefers-color-scheme: dark) {
     :root:not([data-rw-theme="light"]) {
       /* Dark tokens overrides */
     }
   }
   ```
3. **명시적 라이트 고정**:
   - `[data-rw-theme="light"]`가 지정된 경우 OS가 다크 모드여도 라이트 테마 유지.

---

## 4. 모드 스위처(`examples/switcher.js`) 연동

- 스위처 패널에 **Theme System (Auto / Light / Dark)** 3단 세그먼트 버튼 추가.
- `document.documentElement.dataset.rwTheme` 조작 및 `localStorage` 동기화.
