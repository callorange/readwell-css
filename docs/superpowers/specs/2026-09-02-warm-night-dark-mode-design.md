# Warm Sepia Night Dark Mode Design Spec

## 1. 문제 인식 및 리마스터 목적 (Problem & Goal)
기존 다크 모드가 탁한 올리브 톤(`#191c18`)과 과도하게 밝은 텍스트(`#e8e4da`)로 인해 **라이트 모드가 주던 아늑한 종이의 편안함(Paper Comfort)을 잃고 눈이 피로해지는 문제**를 해결합니다.

킨들 나이트 모드, iA Writer Night, Apple Books 웜 다크의 정수를 담아 **"밤에 스탠드 불빛 아래서 책을 읽는 듯한 따뜻한 웜 세피아 나이트 페이퍼(Warm Sepia Night)"**로 전면 리마스터합니다.

---

## 2. 리마스터된 토큰 매트릭스 (Remastered Token Matrix)

### 2.1 웜 세피아 중립 표면 및 타이포그래피 (Neutral Surface & Typography)

| 토큰 | 기존 다크 (As-Is) | 웜 나이트 리마스터 (To-Be) | 시각적 의도 / 개선 효과 |
|---|---|---|---|
| `--rw-paper` | `#191c18` (탁한 올리브) | `#201e1b` (웜 에스프레소 차콜) | 아늑하고 따뜻한 야간 캔버스 배경 |
| `--rw-paper-2` | `#222621` | `#272421` (소프트 웜 카드 서피스) | 배경과 이질감 없이 얹히는 자연스러운 패널 |
| `--rw-paper-3` | `#2d332c` | `#322e2a` (웜 인셋/호버) | 칩, 버튼, 컨트롤의 부드러운 구분감 |
| `--rw-text` | `#e8e4da` (과도한 들뜸) | `#dcd6cb` (부드러운 한지 아이보리) | 눈부심(Halation) 제거, 편안한 가독성 (9.8:1) |
| `--rw-text-muted` | `#9da39b` | `#938d82` (웜 펜슬 스케치 캡션) | 차분한 메타데이터 가독성 (4.8:1, WCAG AA) |
| `--rw-line` | `#373d35` | `#3d3832` (은은한 웜 보더) | 두드러지지 않고 구조만 정돈하는 1px 선 |
| `--rw-line-strong` | `#525a4f` | `#5a534b` (강조 웜 보더) | 포커스 및 액션 경계 |
| `--rw-focus` | `#5c8fd6` | `#6b8eae` (차분한 뮤트 블루) | 과하지 않은 포커스 링 |

### 2.2 저자극 수채화 시맨틱 컬러 (Low-Stimulus Semantic Matrix)

| Semantic | Base | Soft (Background Wash) | Strong (Foreground Text) |
|---|---|---|---|
| **Primary** | `#7ba0c0` | `#28323c` | `#a2c2df` |
| **Secondary** | `#969e90` | `#2c332b` | `#bcc4b7` |
| **Success** | `#86a87d` | `#283325` | `#a8caa0` |
| **Warning** | `#cfa462` | `#3a3020` | `#e6c48e` |
| **Danger** | `#c77874` | `#3a2423` | `#e29b97` |
| **Info** | `#869db3` | `#28313a` | `#abc1d4` |

---

## 3. 구현 및 검증 원칙

1. **`src/modes.css` 수술적 교체**:
   - `:root[data-rw-theme="dark"]`, `[data-rw-theme="dark"]` 및 `@media (prefers-color-scheme: dark)` 토큰을 웜 나이트 팔레트로 교체.
2. **명도 대비 및 가독성 정량 검증**:
   - `npm test` 및 `scripts/build.js` 빌드 검증.
3. **사용자 인터랙션 확인**:
   - `examples/switcher.js`로 라이브 데모에서 다크 모드 전환 시 따뜻하고 아늑한 톤앤매너 확인.
