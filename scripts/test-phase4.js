import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const sumiCssPath = path.join(repoRoot, 'examples', 'sumi', 'sumi.css');
const indexHtmlPath = path.join(repoRoot, 'examples', 'sumi', 'index.html');

console.log('🧪 Starting Phase 4 Automated Verification Test...\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✔ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
  }
}

// 1. 파일 존재 여부 확인
const sumiCss = fs.readFileSync(sumiCssPath, 'utf-8');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

console.log('--- 1. Phase 4-1: 기술 문서 조판 컴포넌트 (.rw-sumi-table) 검증 ---');
assert(sumiCss.includes('.rw-sumi-table-wrap'), 'sumi.css에 .rw-sumi-table-wrap 래퍼 정의 확인');
assert(sumiCss.includes('.rw-sumi-table {'), 'sumi.css에 .rw-sumi-table 기본 스타일 정의 확인');
assert(sumiCss.includes('border-top: 2px solid var(--rw-sumi-ink)'), 'sumi.css에 상단 농묵 굵은 획(2px) 정의 확인');
assert(sumiCss.includes('border-bottom: 1.5px solid var(--rw-sumi-ink)'), 'sumi.css에 하단 수필 획(1.5px) 정의 확인');
assert(sumiCss.includes('.rw-sumi-table caption'), 'sumi.css에 표 캡션 스타일 정의 확인');
assert(sumiCss.includes('.rw-sumi-table tbody tr:hover'), 'sumi.css에 담묵 행 호버 먹물 번짐 효과 확인');
assert(indexHtml.includes('class="rw-sumi-table-wrap"'), 'index.html에 .rw-sumi-table-wrap 마크업 존재 확인');
assert(indexHtml.includes('class="rw-sumi-table"'), 'index.html에 .rw-sumi-table 마크업 존재 확인');

console.log('\n--- 2. Phase 4-1: 문방사우(文房四友) 코드 신택스 하이라이팅 검증 ---');
assert(sumiCss.includes('--rw-code-keyword:'), ':root에 주사(키워드) 토큰 정의 확인');
assert(sumiCss.includes('--rw-code-string:'), ':root에 송화(문자열) 토큰 정의 확인');
assert(sumiCss.includes('--rw-code-function:'), ':root에 농묵(함수) 토큰 정의 확인');
assert(sumiCss.includes('--rw-code-comment:'), ':root에 담묵(주석) 토큰 정의 확인');
assert(sumiCss.includes('.rw-code-sumi .token-kw'), 'sumi.css에 .token-kw 클래스 정의 확인');
assert(sumiCss.includes('.rw-code-sumi .token-str'), 'sumi.css에 .token-str 클래스 정의 확인');
assert(sumiCss.includes('.rw-code-sumi .token-fn'), 'sumi.css에 .token-fn 클래스 정의 확인');
assert(sumiCss.includes('.rw-code-sumi .token-cm'), 'sumi.css에 .token-cm 클래스 정의 확인');
assert(indexHtml.includes('class="token-kw"'), 'index.html에 문방사우 키워드 토큰 적용 확인');
assert(indexHtml.includes('class="token-fn"'), 'index.html에 문방사우 함수 토큰 적용 확인');
assert(indexHtml.includes('class="token-str"'), 'index.html에 문방사우 문자열 토큰 적용 확인');
assert(indexHtml.includes('class="token-cm"'), 'index.html에 문방사우 주석 토큰 적용 확인');

console.log('\n--- 3. Phase 4-1: 동양 고서 난외 배주 (Marginalia) 주석 시스템 검증 ---');
assert(sumiCss.includes('.rw-marginalia-ref'), 'sumi.css에 본문 배주 참조 번호 스타일 정의 확인');
assert(sumiCss.includes('.rw-aside-marginalia'), 'sumi.css에 우측 사이드바 배주 구획 정의 확인');
assert(sumiCss.includes('.rw-aside-note'), 'sumi.css에 우측 사이드바 배주 카드 정의 확인');
assert(sumiCss.includes('@keyframes rw-marginalia-ref-pulse'), 'sumi.css에 본문 참조 펄스 애니메이션 정의 확인');
assert(sumiCss.includes('@keyframes rw-aside-note-pulse'), 'sumi.css에 우측 배주 펄스 애니메이션 정의 확인');
assert(indexHtml.includes('id="note-ref-1"'), 'index.html에 본문 배주 참조 1(#note-ref-1) 존재 확인');
assert(indexHtml.includes('id="note-ref-2"'), 'index.html에 본문 배주 참조 2(#note-ref-2) 존재 확인');
assert(indexHtml.includes('id="note-ref-3"'), 'index.html에 본문 배주 참조 3(#note-ref-3) 존재 확인');
assert(indexHtml.includes('id="sumi-note-1"'), 'index.html에 우측 배주 카드 1(#sumi-note-1) 존재 확인');
assert(indexHtml.includes('id="sumi-note-2"'), 'index.html에 우측 배주 카드 2(#sumi-note-2) 존재 확인');
assert(indexHtml.includes('id="sumi-note-3"'), 'index.html에 우측 배주 카드 3(#sumi-note-3) 존재 확인');
assert(indexHtml.includes('function initMarginalia()'), 'index.html에 배주 상호작용 JS 로직 확인');

console.log('\n--- 4. Phase 4-2: @media print 고서 목판본 인쇄 조판 검증 ---');
assert(sumiCss.includes('@media print {'), 'sumi.css에 @media print 미디어 쿼리 정의 확인');
assert(sumiCss.includes('@page {'), 'sumi.css에 @page 규격(A4 portrait) 정의 확인');
assert(sumiCss.includes('.rw-sumi-hanji-canvas') && sumiCss.includes('display: none !important;'), '화면 전용 한지 캔버스 인쇄 시 숨김 확인');
assert(sumiCss.includes('.rw-control-panel') && sumiCss.includes('display: none !important;'), '화면 전용 플로팅 컨트롤러 숨김 확인');
assert(sumiCss.includes('.rw-sumi-sidebar') && sumiCss.includes('display: none !important;'), '화면 전용 사이드바 숨김 확인');
assert(sumiCss.includes('break-inside: avoid !important;') || sumiCss.includes('page-break-inside: avoid !important;'), '표/코드/콜아웃 분절 방지(break-inside) 확인');
assert(sumiCss.includes('break-after: avoid !important;') || sumiCss.includes('page-break-after: avoid !important;'), '제목 분절 방지(break-after) 확인');

console.log('\n--- 5. Phase 4-3: 전각 두인(頭印) 형태 2종 (호로인, 자연인) 검증 ---');
assert(sumiCss.includes('.rw-seal-badge--gourd'), 'sumi.css에 표주박형(호로인 葫蘆印) 클래스 정의 확인');
assert(sumiCss.includes('.rw-seal-badge--natural'), 'sumi.css에 자연석형(자연인 自然印) 클래스 정의 확인');
assert(indexHtml.includes('rw-seal-badge--gourd'), 'index.html에 호로인 마크업 존재 확인');
assert(indexHtml.includes('rw-seal-badge--natural'), 'index.html에 자연인 마크업 존재 확인');

console.log('\n--- 6. Phase 4-3: 원클릭 코드 복사 (Copy Snippet) 검증 ---');
assert(indexHtml.includes('function copySnippet('), 'index.html에 copySnippet() 함수 구현 확인');
assert(indexHtml.includes('navigator.clipboard'), 'index.html에 클립보드 API 연동 확인');
assert(sumiCss.includes('.rw-btn-copy-snippet'), 'sumi.css에 .rw-btn-copy-snippet 스타일 정의 확인');
assert(sumiCss.includes('.rw-code-copy-btn.is-copied'), 'sumi.css에 복사 완료 피드백(.is-copied) 상태 정의 확인');

console.log('\n--- 7. Phase 4-3: 수묵 인터랙티브 플레이그라운드 패널 검증 ---');
assert(sumiCss.includes('.rw-playground-panel'), 'sumi.css에 .rw-playground-panel 스타일 정의 확인');
assert(sumiCss.includes('.rw-playground-stage'), 'sumi.css에 .rw-playground-stage 스타일 정의 확인');
assert(sumiCss.includes('.rw-playground-controls'), 'sumi.css에 .rw-playground-controls 스타일 정의 확인');
assert(indexHtml.includes('id="sumi-playground"'), 'index.html에 #sumi-playground 섹션 마크업 확인');
assert(indexHtml.includes('id="pgComponentSelect"'), 'index.html에 컴포넌트 유형 셀렉터 확인');
assert(indexHtml.includes('id="pgColorSelect"'), 'index.html에 먹색 농담 셀렉터 확인');
assert(indexHtml.includes('id="pgSizeSelect"'), 'index.html에 크기 규격 셀렉터 확인');
assert(indexHtml.includes('id="pgMotionSelect"'), 'index.html에 서예 동세 셀렉터 확인');
assert(indexHtml.includes('id="pgPreviewTarget"'), 'index.html에 실시간 렌더링 무대(#pgPreviewTarget) 확인');
assert(indexHtml.includes('id="pgCodeDisplay"'), 'index.html에 실시간 코드 표시기(#pgCodeDisplay) 확인');
assert(indexHtml.includes('function updatePlayground()'), 'index.html에 updatePlayground() 실시간 조작 함수 확인');

console.log('\n========================================');
console.log(`Phase 4 Test Results: ${passedTests}/${totalTests} Passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('========================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
