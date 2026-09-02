/**
 * Readwell CSS Live Interactive Mode Switcher
 * Zero-dependency demo controller for previewing Surface, Density & E-Ink modes.
 */
(function () {
  const STORAGE_KEY = 'readwell_live_preview_settings';

  const THEMES = [
    { id: 'light', label: 'Light 📄' },
    { id: 'warm', label: 'Warm 📖' },
    { id: 'sepia', label: 'Sepia 📜' },
    { id: 'dark', label: 'Dark 🌙' },
    { id: 'auto', label: 'Auto 💻' }
  ];

  const SURFACES = [
    { id: 'reading', label: 'Reading' },
    { id: 'workspace', label: 'Workspace' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'dense', label: 'Dense' }
  ];

  const DENSITIES = [
    { id: 'cozy', label: 'Cozy' },
    { id: 'comfortable', label: 'Comfortable' },
    { id: 'compact', label: 'Compact' }
  ];

  // Capture original page defaults
  const originalTheme = document.documentElement.dataset.rwTheme || document.body.dataset.rwTheme || 'auto';
  const originalSurface = document.body.dataset.rwSurface || 'reading';
  const originalDensity = document.body.dataset.rwDensity || 'comfortable';
  const originalEink = document.body.dataset.rwEink === 'true';

  // Load saved or current
  let savedSettings = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) savedSettings = JSON.parse(raw);
  } catch (e) {}

  let currentTheme = savedSettings?.theme || originalTheme;
  let currentSurface = savedSettings?.surface || originalSurface;
  let currentDensity = savedSettings?.density || originalDensity;
  let currentEink = savedSettings?.eink !== undefined ? savedSettings.eink : originalEink;

  // Apply immediately
  function applyModes() {
    if (currentTheme && currentTheme !== 'auto') {
      document.documentElement.dataset.rwTheme = currentTheme;
      document.body.dataset.rwTheme = currentTheme;
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
          <label class="rw-switcher-label">Theme Mode</label>
          <div class="rw-switcher-grid" style="grid-template-columns: 1fr 1fr 1fr;" id="rw-theme-btns">
            ${THEMES.map(t => `
              <button type="button" class="rw-switcher-btn ${t.id === currentTheme ? 'is-active' : ''}" data-theme="${t.id}">
                ${t.label}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="rw-switcher-section">
          <label class="rw-switcher-label">Surface Family</label>
          <div class="rw-switcher-grid" id="rw-surface-btns">
            ${SURFACES.map(s => `
              <button type="button" class="rw-switcher-btn ${s.id === currentSurface ? 'is-active' : ''}" data-surface="${s.id}">
                ${s.label}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="rw-switcher-section">
          <label class="rw-switcher-label">Density System</label>
          <div class="rw-switcher-grid" style="grid-template-columns: 1fr 1fr 1fr;" id="rw-density-btns">
            ${DENSITIES.map(d => `
              <button type="button" class="rw-switcher-btn ${d.id === currentDensity ? 'is-active' : ''}" data-density="${d.id}">
                ${d.label}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="rw-switcher-section">
          <div class="rw-switcher-row">
            <span class="rw-switcher-label" style="margin: 0;">E-Ink Mode</span>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; font-size: 0.85rem;">
              <input type="checkbox" role="switch" id="rw-eink-switch" ${currentEink ? 'checked' : ''}>
              <span>정적 모션</span>
            </label>
          </div>
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

    function togglePanel(open) {
      const isOpen = open !== undefined ? open : !panel.classList.contains('is-open');
      panel.classList.toggle('is-open', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
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
      btn.addEventListener('click', () => {
        themeBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentTheme = btn.dataset.theme;
        applyModes();
        saveSettings();
      });
    });

    // Surface buttons
    surfaceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        surfaceBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentSurface = btn.dataset.surface;
        applyModes();
        saveSettings();
      });
    });

    // Density buttons
    densityBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        densityBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentDensity = btn.dataset.density;
        applyModes();
        saveSettings();
      });
    });

    // E-Ink switch
    einkSwitch.addEventListener('change', () => {
      currentEink = einkSwitch.checked;
      applyModes();
      saveSettings();
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
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSwitcherDOM);
  } else {
    createSwitcherDOM();
  }
})();
