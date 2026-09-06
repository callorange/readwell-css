/**
 * Readwell CSS Live Interactive Mode Switcher
 * Zero-dependency demo controller for previewing Theme, Surface, Density & E-Ink modes.
 */
(function () {
  // Clean up any legacy localStorage cache to guarantee fresh page defaults
  try {
    localStorage.removeItem('readwell_live_preview_settings');
  } catch (e) {}

  const THEMES = [
    { id: 'light', label: 'Light 📄', sub: '백상지', desc: 'Light 테마: 맑고 정갈한 기본 백색 종이 질감' },
    { id: 'warm', label: 'Warm 📖', sub: '미색지', desc: 'Warm 테마: 눈이 편안한 단행본 크림톤 미색 종이 질감' },
    { id: 'dark', label: 'Dark 🌙', sub: '먹지/야간', desc: 'Dark 테마: 눈부심 없는 흑연 먹빛 저자극 야간 종이 질감' }
  ];

  const LAYOUTS = [
    { id: 'reading', label: 'Reading', sub: '1컬럼 독서', desc: 'Reading 레이아웃: 48rem(768px) 폭 + 기본 Cozy(여유) 밀도 (장문 독서/에세이)', defaultDensity: 'cozy' },
    { id: 'docs', label: 'Docs', sub: '2컬럼 기술문서', desc: 'Docs 레이아웃: 80rem(1280px) 폭 + 기본 Comfortable(표준) 밀도 (목차 TOC + 본문 가이드)', defaultDensity: 'comfortable' },
    { id: 'workspace', alias: 'dashboard', label: 'Workspace', sub: '3패널/대시보드', desc: 'Workspace 레이아웃: 90rem(1440px) 폭 + 기본 Comfortable(표준) 밀도 (3패널 노션형 위키 & 대시보드 콘솔)', defaultDensity: 'comfortable' },
    { id: 'fluid', alias: 'records', label: 'Fluid', sub: '전폭 백오피스', desc: 'Fluid/Records 레이아웃: 100% 전폭 + 기본 Compact(밀집) 밀도 (ERP/대용량 테이블)', defaultDensity: 'compact' }
  ];

  const DENSITIES = [
    { id: 'cozy', label: 'Cozy', sub: '여유', desc: 'Cozy 밀도: 넉넉한 여백과 패딩 (터치 및 여유로운 독서)' },
    { id: 'comfortable', label: 'Comfortable', sub: '표준', desc: 'Comfortable 밀도: 균형 잡힌 표준 여백 및 컴포넌트 간격' },
    { id: 'compact', label: 'Compact', sub: '밀집', desc: 'Compact 밀도: 여백을 줄여 한 화면에 많은 정보를 표시' }
  ];

  const EINK_INFO = {
    title: 'E-Ink Mode',
    desc: 'E-Ink 모드: 모든 전환 효과 및 애니메이션을 차단하여 눈 피로 최소화'
  };

  // Capture original page defaults - Each page always starts with its own designed defaults
  const currentAttrTheme = document.documentElement.dataset.rwTheme || document.body.dataset.rwTheme;
  const originalTheme = currentAttrTheme === 'warm' ? 'warm' : (currentAttrTheme === 'dark' ? 'dark' : 'light');
  const rawLayout = document.body.dataset.rwLayout || document.body.dataset.rwSurface || 'reading';
  let originalLayout = rawLayout;
  if (originalLayout === 'dense' || originalLayout === 'records') originalLayout = 'fluid';
  if (originalLayout === 'dashboard') originalLayout = 'workspace';
  const matchedLayoutObj = LAYOUTS.find(l => l.id === originalLayout || l.alias === originalLayout);
  const originalDensity = document.body.dataset.rwDensity || matchedLayoutObj?.defaultDensity || 'comfortable';
  const originalEink = document.body.dataset.rwEink === 'true';

  // State is purely ephemeral for testing the current page (no cross-page persistence)
  let currentTheme = originalTheme;
  let currentLayout = originalLayout;
  let currentDensity = originalDensity;
  let currentEink = originalEink;

  function getActiveSummary() {
    const t = THEMES.find(item => item.id === currentTheme)?.sub || currentTheme;
    const lObj = LAYOUTS.find(item => item.id === currentLayout || item.alias === currentLayout) || LAYOUTS[0];
    const l = lObj.sub;
    const dObj = DENSITIES.find(item => item.id === currentDensity) || DENSITIES[1];
    const isPreset = lObj.defaultDensity === currentDensity;
    const dText = isPreset ? `기본 ${dObj.sub} 연동` : `${dObj.sub} 오버라이드`;
    const e = currentEink ? ' · E-Ink 정적' : '';
    return `현재: ${t} · ${l} (${dText})${e}`;
  }

  // Apply immediately
  function applyModes() {
    if (currentTheme) {
      document.documentElement.dataset.rwTheme = currentTheme;
      document.body.dataset.rwTheme = currentTheme;
    }
    if (currentLayout) {
      document.body.dataset.rwLayout = currentLayout;
      // Backward compatibility alias for [data-rw-surface]
      document.body.dataset.rwSurface = currentLayout === 'records' ? 'dense' : currentLayout;
    }
    if (currentDensity) {
      document.body.dataset.rwDensity = currentDensity;
    }
    if (currentEink) {
      document.body.dataset.rwEink = 'true';
    } else {
      delete document.body.dataset.rwEink;
    }
  }

  applyModes();

  // Create and inject Switcher DOM
  function createSwitcherDOM() {
    if (document.querySelector('.rw-switcher-wrap')) return;

    const wrap = document.createElement('aside');
    wrap.className = 'rw-switcher-wrap';
    wrap.setAttribute('aria-label', 'Readwell Controls');

    wrap.innerHTML = `
      <div class="rw-switcher-panel" id="rw-switcher-panel" role="region" aria-label="Mode Controls">
        <div class="rw-switcher-header">
          <span class="rw-switcher-title">⚙️ Live Controls</span>
          <button type="button" class="rw-switcher-close" id="rw-switcher-close" aria-label="Close Controls">✕</button>
        </div>

        <div class="rw-switcher-section">
          <div class="rw-switcher-section-head">
            <label class="rw-switcher-label">Theme Mode</label>
            <span class="rw-switcher-info-badge" data-tooltip="종이 질감 색온도 선택" tabindex="0">ⓘ</span>
          </div>
          <div class="rw-switcher-grid" style="grid-template-columns: repeat(3, 1fr);" id="rw-theme-btns">
            ${THEMES.map(t => `
              <button type="button" class="rw-switcher-btn ${t.id === currentTheme ? 'is-active' : ''}" data-theme="${t.id}" title="${t.desc}" aria-label="${t.label} - ${t.sub}">
                <span class="rw-btn-title">${t.label}</span>
                <span class="rw-btn-desc">${t.sub}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="rw-switcher-section">
          <div class="rw-switcher-section-head">
            <label class="rw-switcher-label">Layout Archetype</label>
            <span class="rw-switcher-info-badge" data-tooltip="화면 용도별 최적 레이아웃 및 스마트 기본 밀도 자동 연동" tabindex="0">ⓘ</span>
          </div>
          <div class="rw-switcher-grid" style="grid-template-columns: repeat(2, 1fr);" id="rw-layout-btns">
            ${LAYOUTS.map(l => `
              <button type="button" class="rw-switcher-btn ${l.id === currentLayout || l.alias === currentLayout ? 'is-active' : ''}" data-layout="${l.id}" title="${l.desc}" aria-label="${l.label} - ${l.sub}">
                <span class="rw-btn-title">${l.label}</span>
                <span class="rw-btn-desc">${l.sub}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="rw-switcher-section">
          <div class="rw-switcher-section-head">
            <label class="rw-switcher-label">Density Fine-tuning</label>
            <span class="rw-switcher-info-badge" data-tooltip="행간 및 컴포넌트 여백 밀도 (수동 오버라이드 가능)" tabindex="0">ⓘ</span>
          </div>
          <div class="rw-switcher-grid" style="grid-template-columns: 1fr 1fr 1fr;" id="rw-density-btns">
            ${DENSITIES.map(d => `
              <button type="button" class="rw-switcher-btn ${d.id === currentDensity ? 'is-active' : ''}" data-density="${d.id}" title="${d.desc}" aria-label="${d.label} - ${d.sub}">
                <span class="rw-btn-title">${d.label}</span>
                <span class="rw-btn-desc">${d.sub}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="rw-switcher-section">
          <div class="rw-switcher-row">
            <div class="rw-switcher-section-head">
              <span class="rw-switcher-label" style="margin: 0;">E-Ink Mode</span>
              <span class="rw-switcher-info-badge" data-tooltip="전자종이 디스플레이를 위한 무모션/정적 렌더링 모드" tabindex="0">ⓘ</span>
            </div>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; font-size: 0.85rem;" title="모든 애니메이션 및 전환 효과 제거">
              <input type="checkbox" role="switch" id="rw-eink-switch" ${currentEink ? 'checked' : ''}>
              <span>정적 모션</span>
            </label>
          </div>
        </div>

        <div class="rw-switcher-hint" id="rw-switcher-hint" role="status" aria-live="polite">
          <span class="rw-switcher-hint-icon">💡</span>
          <span class="rw-switcher-hint-text" id="rw-switcher-hint-text">${getActiveSummary()}</span>
        </div>

        <button type="button" class="rw-switcher-reset" id="rw-switcher-reset">↺ 기본값으로 초기화</button>
      </div>

      <button type="button" class="rw-switcher-toggle" id="rw-switcher-toggle" aria-expanded="false" aria-controls="rw-switcher-panel">
        <span>⚙️</span>
        <span>Mode Switcher</span>
      </button>
    `;

    document.body.appendChild(wrap);

    // Event Bindings
    const panel = wrap.querySelector('#rw-switcher-panel');
    const toggleBtn = wrap.querySelector('#rw-switcher-toggle');
    const closeBtn = wrap.querySelector('#rw-switcher-close');
    const themeBtns = wrap.querySelectorAll('#rw-theme-btns button');
    const layoutBtns = wrap.querySelectorAll('#rw-layout-btns button');
    const densityBtns = wrap.querySelectorAll('#rw-density-btns button');
    const einkSwitch = wrap.querySelector('#rw-eink-switch');
    const resetBtn = wrap.querySelector('#rw-switcher-reset');
    const hintText = wrap.querySelector('#rw-switcher-hint-text');

    function updateHint(text) {
      if (hintText) hintText.textContent = text || getActiveSummary();
    }

    function resetHint() {
      updateHint(getActiveSummary());
    }

    function togglePanel(open) {
      const isOpen = open !== undefined ? open : !panel.classList.contains('is-open');
      panel.classList.toggle('is-open', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) resetHint();
    }

    toggleBtn.addEventListener('click', () => togglePanel());
    closeBtn.addEventListener('click', () => togglePanel(false));

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target) && panel.classList.contains('is-open')) {
        togglePanel(false);
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) {
        togglePanel(false);
      }
    });

    // Theme buttons
    themeBtns.forEach(btn => {
      const item = THEMES.find(t => t.id === btn.dataset.theme);
      if (item) {
        btn.addEventListener('mouseenter', () => updateHint(item.desc));
        btn.addEventListener('focus', () => updateHint(item.desc));
        btn.addEventListener('mouseleave', resetHint);
        btn.addEventListener('blur', resetHint);
      }
      btn.addEventListener('click', () => {
        themeBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentTheme = btn.dataset.theme;
        applyModes();
        resetHint();
      });
    });

    // Layout buttons (with Smart Preset density auto-sync)
    layoutBtns.forEach(btn => {
      const item = LAYOUTS.find(l => l.id === btn.dataset.layout);
      if (item) {
        btn.addEventListener('mouseenter', () => updateHint(item.desc));
        btn.addEventListener('focus', () => updateHint(item.desc));
        btn.addEventListener('mouseleave', resetHint);
        btn.addEventListener('blur', resetHint);
      }
      btn.addEventListener('click', () => {
        layoutBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentLayout = btn.dataset.layout;

        // 스마트 프리셋: 레이아웃에 최적화된 기본 밀도로 자동 연동
        if (item && item.defaultDensity) {
          currentDensity = item.defaultDensity;
          densityBtns.forEach(b => b.classList.toggle('is-active', b.dataset.density === currentDensity));
        }

        applyModes();
        resetHint();
      });
    });

    // Density buttons (Explicit fine-tuning override)
    densityBtns.forEach(btn => {
      const item = DENSITIES.find(d => d.id === btn.dataset.density);
      if (item) {
        btn.addEventListener('mouseenter', () => updateHint(item.desc));
        btn.addEventListener('focus', () => updateHint(item.desc));
        btn.addEventListener('mouseleave', resetHint);
        btn.addEventListener('blur', resetHint);
      }
      btn.addEventListener('click', () => {
        densityBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentDensity = btn.dataset.density;
        applyModes();
        resetHint();
      });
    });

    // E-Ink switch
    const einkLabel = wrap.querySelector('#rw-eink-switch').closest('label');
    if (einkLabel) {
      einkLabel.addEventListener('mouseenter', () => updateHint(EINK_INFO.desc));
      einkLabel.addEventListener('focusin', () => updateHint(EINK_INFO.desc));
      einkLabel.addEventListener('mouseleave', resetHint);
      einkLabel.addEventListener('focusout', resetHint);
    }
    einkSwitch.addEventListener('change', () => {
      currentEink = einkSwitch.checked;
      applyModes();
      resetHint();
    });

    // Reset button
    resetBtn.addEventListener('click', () => {
      try {
        localStorage.removeItem('readwell_live_preview_settings');
      } catch (e) {}
      currentTheme = originalTheme;
      currentLayout = originalLayout;
      currentDensity = originalDensity;
      currentEink = originalEink;

      themeBtns.forEach(b => b.classList.toggle('is-active', b.dataset.theme === currentTheme));
      layoutBtns.forEach(b => b.classList.toggle('is-active', b.dataset.layout === currentLayout));
      densityBtns.forEach(b => b.classList.toggle('is-active', b.dataset.density === currentDensity));
      einkSwitch.checked = currentEink;

      applyModes();
      resetHint();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSwitcherDOM);
  } else {
    createSwitcherDOM();
  }

  // Global Light-Dismiss for details.rw-dropdown across all examples & docs
  document.addEventListener('click', (e) => {
    const openDropdowns = document.querySelectorAll('details.rw-dropdown[open]');
    openDropdowns.forEach(d => {
      if (!d.contains(e.target) || e.target.closest('.rw-dropdown-item')) {
        d.removeAttribute('open');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('details.rw-dropdown[open]').forEach(d => d.removeAttribute('open'));
    }
  });
})();

