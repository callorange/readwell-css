/**
 * Readwell CSS Live Interactive Mode Switcher
 * Zero-dependency demo controller for previewing Theme, Surface, Density & E-Ink modes.
 */
(function () {
  const STORAGE_KEY = 'readwell_live_preview_settings';

  const THEMES = [
    { id: 'light', label: 'Light 📄', sub: '백상지', desc: 'Light 테마: 맑고 정갈한 기본 백색 종이 질감' },
    { id: 'warm', label: 'Warm 📖', sub: '미색지', desc: 'Warm 테마: 눈이 편안한 단행본 크림톤 미색 종이 질감' }
  ];

  const SURFACES = [
    { id: 'reading', label: 'Reading', sub: '장문 독서', desc: 'Reading 표면: 아티클·블로그에 최적화된 좁은 본문 폭과 편안한 행간' },
    { id: 'workspace', label: 'Workspace', sub: '문서 협업', desc: 'Workspace 표면: 사이드바와 본문 카드가 조화된 지식 문서·노션형 뷰' },
    { id: 'dashboard', label: 'Dashboard', sub: '운영 콘솔', desc: 'Dashboard 표면: 카드 그리드와 지표 중심의 관리자 대시보드 뷰' },
    { id: 'dense', label: 'Dense', sub: '고밀도 표', desc: 'Dense 표면: 데이터 테이블과 백오피스용 밀집 정보 뷰' }
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

  // Capture original page defaults
  const originalTheme = (document.documentElement.dataset.rwTheme || document.body.dataset.rwTheme) === 'warm' ? 'warm' : 'light';
  const originalSurface = document.body.dataset.rwSurface || 'reading';
  const originalDensity = document.body.dataset.rwDensity || 'comfortable';
  const originalEink = document.body.dataset.rwEink === 'true';

  // Load saved or current
  let savedSettings = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) savedSettings = JSON.parse(raw);
  } catch (e) {}

  let currentTheme = (savedSettings?.theme === 'warm' || savedSettings?.theme === 'light') ? savedSettings.theme : originalTheme;
  let currentSurface = savedSettings?.surface || originalSurface;
  let currentDensity = savedSettings?.density || originalDensity;
  let currentEink = savedSettings?.eink !== undefined ? savedSettings.eink : originalEink;

  function getActiveSummary() {
    const t = THEMES.find(item => item.id === currentTheme)?.sub || currentTheme;
    const s = SURFACES.find(item => item.id === currentSurface)?.sub || currentSurface;
    const d = DENSITIES.find(item => item.id === currentDensity)?.sub || currentDensity;
    const e = currentEink ? ' · E-Ink 정적' : '';
    return `현재: ${t} · ${s} · ${d}${e}`;
  }

  // Apply immediately
  function applyModes() {
    if (currentTheme === 'warm') {
      document.documentElement.dataset.rwTheme = 'warm';
      document.body.dataset.rwTheme = 'warm';
    } else {
      delete document.documentElement.dataset.rwTheme;
      delete document.body.dataset.rwTheme;
    }
    if (currentSurface) {
      document.body.dataset.rwSurface = currentSurface;
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

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        theme: currentTheme,
        surface: currentSurface,
        density: currentDensity,
        eink: currentEink
      }));
    } catch (e) {}
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
          <div class="rw-switcher-grid" style="grid-template-columns: 1fr 1fr;" id="rw-theme-btns">
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
            <label class="rw-switcher-label">Surface Family</label>
            <span class="rw-switcher-info-badge" data-tooltip="화면 용도별 레이아웃 및 스타일 프리셋" tabindex="0">ⓘ</span>
          </div>
          <div class="rw-switcher-grid" id="rw-surface-btns">
            ${SURFACES.map(s => `
              <button type="button" class="rw-switcher-btn ${s.id === currentSurface ? 'is-active' : ''}" data-surface="${s.id}" title="${s.desc}" aria-label="${s.label} - ${s.sub}">
                <span class="rw-btn-title">${s.label}</span>
                <span class="rw-btn-desc">${s.sub}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="rw-switcher-section">
          <div class="rw-switcher-section-head">
            <label class="rw-switcher-label">Density System</label>
            <span class="rw-switcher-info-badge" data-tooltip="행간 및 컴포넌트 여백 밀도" tabindex="0">ⓘ</span>
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
    const surfaceBtns = wrap.querySelectorAll('#rw-surface-btns button');
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
        saveSettings();
        resetHint();
      });
    });

    // Surface buttons
    surfaceBtns.forEach(btn => {
      const item = SURFACES.find(s => s.id === btn.dataset.surface);
      if (item) {
        btn.addEventListener('mouseenter', () => updateHint(item.desc));
        btn.addEventListener('focus', () => updateHint(item.desc));
        btn.addEventListener('mouseleave', resetHint);
        btn.addEventListener('blur', resetHint);
      }
      btn.addEventListener('click', () => {
        surfaceBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentSurface = btn.dataset.surface;
        applyModes();
        saveSettings();
        resetHint();
      });
    });

    // Density buttons
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
        saveSettings();
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
      saveSettings();
      resetHint();
    });

    // Reset button
    resetBtn.addEventListener('click', () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      currentTheme = originalTheme;
      currentSurface = originalSurface;
      currentDensity = originalDensity;
      currentEink = originalEink;

      themeBtns.forEach(b => b.classList.toggle('is-active', b.dataset.theme === currentTheme));
      surfaceBtns.forEach(b => b.classList.toggle('is-active', b.dataset.surface === currentSurface));
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
})();

