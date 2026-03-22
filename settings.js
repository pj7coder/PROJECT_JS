const _DB_CONFIG = { name: 'JobSarthiDB', store: 'backgrounds', key: 'custom_bg' };

async function _getDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(_DB_CONFIG.name, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(_DB_CONFIG.store);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function _saveBG(blob) {
    const db = await _getDB();
    const tx = db.transaction(_DB_CONFIG.store, 'readwrite');
    tx.objectStore(_DB_CONFIG.store).put(blob, _DB_CONFIG.key);
    return new Promise(r => tx.oncomplete = r);
}

async function _loadBG() {
    try {
        const db = await _getDB();
        const tx = db.transaction(_DB_CONFIG.store, 'readonly');
        return new Promise(r => {
            const req = tx.objectStore(_DB_CONFIG.store).get(_DB_CONFIG.key);
            req.onsuccess = () => r(req.result);
            req.onerror = () => r(null);
        });
    } catch { return null; }
}

async function _clearBG() {
    try {
        const db = await _getDB();
        const tx = db.transaction(_DB_CONFIG.store, 'readwrite');
        tx.objectStore(_DB_CONFIG.store).delete(_DB_CONFIG.key);
    } catch (e) { }
}

const _SETTINGS_HTML = `
<div id="settingsOverlay" aria-modal="true" role="dialog">
    <div class="settings-sidebar">
        <h3 style="margin-bottom:1.5rem;padding-left:1.2rem;opacity:0.9;letter-spacing:1px">SETTINGS</h3>
        <div class="sett-tab active" data-tab="general">General</div>
        <div class="sett-tab" data-tab="themes">Themes</div>
        <div class="sett-tab" data-tab="languages">Languages</div>
        <div class="sett-tab" data-tab="personalization">Personalization</div>
        <div class="sett-tab" data-tab="account">Account</div>
        <div class="sett-tab" data-tab="help">Help</div>
    </div>
    <div class="settings-main">
        <button id="settingsClose" aria-label="Close settings">
            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
        <div id="pane-general" class="sett-pane active">
            <h2>General Settings</h2>
            <p>Manage your core application preferences here.</p>
        </div>
        <div id="pane-themes" class="sett-pane">
            <h2>Themes</h2>
            <div class="sett-section">
                <h4>UI Mode</h4>
                <div class="themes-grid core-themes">
                    <button type="button" class="theme-tile core-tile" data-theme="light">
                        <div class="color-preview" style="background:#fff;border:1px solid #ccc"></div><span>Light</span>
                    </button>
                    <button type="button" class="theme-tile core-tile active" data-theme="dark">
                        <div class="color-preview" style="background:#0f172a;border:1px solid #334155"></div><span>Dark</span>
                    </button>
                </div>
            </div>
            <div class="sett-section" style="margin-top:2rem">
                <h4>Background</h4>
                <div class="themes-grid bg-themes">
                    <button type="button" class="theme-tile bg-tile active" data-bg="ocean"><div class="color-preview" style="background-image:url('preview_images/ocean.webp')"></div><span>Ocean</span></button>
                    <button type="button" class="theme-tile bg-tile" data-bg="aurora"><div class="color-preview" style="background-image:url('preview_images/aurora.webp')"></div><span>Aurora</span></button>
                    <button type="button" class="theme-tile bg-tile" data-bg="mountain"><div class="color-preview" style="background-image:url('preview_images/mountain.webp')"></div><span>Mountain</span></button>
                    <button type="button" class="theme-tile bg-tile" data-bg="snowmountain"><div class="color-preview" style="background-image:url('preview_images/snowmountain.webp')"></div><span>Snow Mountain</span></button>
                    <button type="button" class="theme-tile bg-tile" data-bg="grassland"><div class="color-preview" style="background-image:url('preview_images/grassland.webp')"></div><span>Grassland</span></button>
                    <button type="button" class="theme-tile bg-tile" data-bg="desert"><div class="color-preview" style="background-image:url('preview_images/desert.webp')"></div><span>Desert</span></button>
                    <button type="button" class="theme-tile bg-tile" data-bg="forest"><div class="color-preview" style="background-image:url('preview_images/forest.webp')"></div><span>Forest</span></button>
                    <button type="button" class="theme-tile bg-tile" data-bg="citynight"><div class="color-preview" style="background-image:url('preview_images/citynight.webp')"></div><span>City Night</span></button>
                    <button type="button" class="theme-tile bg-tile" data-bg="sunset"><div class="color-preview" style="background-image:url('preview_images/sunset.webp')"></div><span>Sunset</span></button>
                    <button type="button" class="theme-tile bg-tile" data-bg="galaxy"><div class="color-preview" style="background-image:url('preview_images/galaxy.webp')"></div><span>Galaxy</span></button>
                    <button type="button" class="theme-tile bg-tile" data-bg="none"><div class="color-preview" style="background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;border:1px dashed rgba(255,255,255,0.2)"><svg viewBox="0 0 24 24" width="20" height="20" style="opacity:0.5"><path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.56 1.69-4.9L16.9 18.31C15.56 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.44 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.56-1.69 4.9z"/></svg></div><span>None</span></button>
                    <button type="button" class="theme-tile bg-tile" data-bg="custom" id="customBgBtn">
                        <div class="color-preview" style="background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.15);background-size:cover;background-position:center" id="customBgPreview">
                            <svg viewBox="0 0 24 24" width="22" height="22" style="opacity:0.7"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                        </div>
                        <span>Custom</span>
                    </button>
                    <input type="file" id="customBgInput" accept="image/*" style="display:none">
                </div>
            </div>
        </div>
        <div id="pane-languages" class="sett-pane">
            <h2>Languages</h2>
            <div class="lang-grid">
                <button class="lang-tile active" data-lang="en"><span>English</span></button>
                <button class="lang-tile" data-lang="hi"><span>हिन्दी (Hindi)</span></button>
                <button class="lang-tile" data-lang="ta"><span>தமிழ் (Tamil)</span></button>
                <button class="lang-tile" data-lang="te"><span>తెలుగు (Telugu)</span></button>
                <button class="lang-tile" data-lang="mr"><span>मराठी (Marathi)</span></button>
                <button class="lang-tile" data-lang="bn"><span>বাংলা (Bengali)</span></button>
            </div>
        </div>
        <div id="pane-personalization" class="sett-pane"><h2>Personalization</h2><p>Tailor the AI recommendations to your career goals.</p></div>
        <div id="pane-account" class="sett-pane"><h2>Account</h2><p>Update your profile and security settings.</p></div>
        <div id="pane-help" class="sett-pane"><h2>Help &amp; Support</h2><p>Contact our team or read the documentation.</p></div>
    </div>
</div>`;

async function loadSettingsHTML() {
    const container = document.getElementById('settingsContainer');
    if (!container) return;

    // Try fetch first (works on http/https), fall back to inline
    try {
        const res = await fetch('settings.html');
        if (!res.ok) throw new Error(res.status);
        container.innerHTML = await res.text();
    } catch (_) {
        container.innerHTML = _SETTINGS_HTML;
    }
}

function initSettings(triggerBtn) {
    const overlay = document.getElementById('settingsOverlay');
    const closeBtn = document.getElementById('settingsClose');
    if (!overlay || !triggerBtn) return;

    let isOpen = false;

    // Sync active states with localStorage
    const savedTheme = localStorage.getItem('website_theme') || 'dark';
    const savedBg = localStorage.getItem('website_bg') || 'ocean';
    const savedLang = localStorage.getItem('website_lang') || 'en';

    overlay.querySelectorAll('.core-tile').forEach(t =>
        t.classList.toggle('active', t.dataset.theme === savedTheme));
    overlay.querySelectorAll('.bg-tile').forEach(t =>
        t.classList.toggle('active', t.dataset.bg === savedBg));
    overlay.querySelectorAll('.lang-tile').forEach(t =>
        t.classList.toggle('active', t.dataset.lang === savedLang));

    // Initial background application (critical for Custom BG)
    (async () => {
        await updateBgVisuals(savedBg, false);
    })();

    // Morph open / close
    function syncSettings(open) {
        if (open === isOpen) return;
        isOpen = open;
        gsap.killTweensOf(overlay);

        if (open) {
            document.body.classList.add('body-lock');
            const r = triggerBtn.getBoundingClientRect();
            gsap.set(overlay, {
                top: r.top, left: r.left, width: r.width, height: r.height,
                opacity: 0, borderRadius: '20px', pointerEvents: 'none'
            });
            gsap.to(overlay, {
                opacity: 1, display: 'flex',
                top: '50%', left: '50%',
                xPercent: -50, yPercent: -50,
                width: '85vw', height: '75vh',
                maxWidth: '1000px', maxHeight: '700px',
                borderRadius: '32px',
                duration: 0.3, ease: 'expo.out',
                onComplete: () => { overlay.style.pointerEvents = 'auto'; }
            });
        } else {
            document.body.classList.remove('body-lock');
            overlay.style.pointerEvents = 'none';
            const r = triggerBtn.getBoundingClientRect();
            gsap.to(overlay, {
                opacity: 0, top: r.top, left: r.left,
                xPercent: 0, yPercent: 0,
                width: r.width, height: r.height, borderRadius: '20px',
                duration: 0.25, ease: 'power2.inOut',
                onComplete: () => { gsap.set(overlay, { display: 'none' }); }
            });
        }
    }

    triggerBtn.addEventListener('click', e => { e.stopPropagation(); syncSettings(!isOpen); });
    if (closeBtn) closeBtn.addEventListener('click', () => syncSettings(false));

    window.addEventListener('click', e => {
        if (isOpen && !overlay.contains(e.target) && !triggerBtn.contains(e.target)) {
            syncSettings(false);
        }
    });

    // Tab navigation
    overlay.querySelectorAll('.sett-tab').forEach(tab => {
        tab.addEventListener('click', e => {
            e.stopPropagation();
            overlay.querySelectorAll('.sett-tab, .sett-pane').forEach(el => el.classList.remove('active'));
            tab.classList.add('active');
            const pane = document.getElementById('pane-' + tab.dataset.tab);
            if (pane) pane.classList.add('active');
        });
    });

    // Theme switching
    overlay.querySelectorAll('.core-tile').forEach(tile => {
        tile.addEventListener('click', () => {
            const theme = tile.dataset.theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('website_theme', theme);
            overlay.querySelectorAll('.core-tile').forEach(t => t.classList.toggle('active', t === tile));
        });
    });

    // Background switching
    const customBgInput = document.getElementById('customBgInput');
    const customBgBtn = document.getElementById('customBgBtn');
    const customBgPreview = document.getElementById('customBgPreview');

    let _OBJECT_URL = null;
    let _CACHED_BLOB = null;

    async function updateBgVisuals(bgName, isPreview) {
        document.documentElement.setAttribute('data-bg', bgName);
        if (isPreview) {
            document.documentElement.setAttribute('data-view', 'preview');
        } else {
            document.documentElement.removeAttribute('data-view');
        }

        // Optimization: Only handle custom BG logic if actually needed
        const currentActiveBg = localStorage.getItem('website_bg');
        if (bgName === 'custom' || currentActiveBg === 'custom') {
            if (!_CACHED_BLOB) {
                _CACHED_BLOB = await _loadBG();
            }

            if (_CACHED_BLOB && !_OBJECT_URL) {
                _OBJECT_URL = URL.createObjectURL(_CACHED_BLOB);
                document.documentElement.style.setProperty('--custom-bg-image', `url('${_OBJECT_URL}')`);
            }
        }
    }

    // Initial background application
    (async () => {
        _CACHED_BLOB = await _loadBG();
        await updateBgVisuals(savedBg, false);
    })();

    // Sync custom preview if exists
    (async () => {
        const blob = _CACHED_BLOB || await _loadBG();
        if (blob && customBgPreview) {
            const tempUrl = URL.createObjectURL(blob);
            customBgPreview.style.backgroundImage = `url('${tempUrl}')`;
            customBgPreview.innerHTML = '';
        }
    })();

    overlay.querySelectorAll('.bg-tile').forEach(tile => {
        tile.addEventListener('click', (e) => {
            const bg = tile.dataset.bg;
            if (bg === 'custom' && (e.target.closest('#customBgBtn') || e.target === tile)) {
                // Trigger file input
                customBgInput.click();
                return; // file input logic handles the rest
            }

            // Logic: If user clicks "None", we clear the custom background data
            if (bg === 'none') {
                _clearBG();
                _CACHED_BLOB = null;
                if (_OBJECT_URL) URL.revokeObjectURL(_OBJECT_URL);
                _OBJECT_URL = null;
                document.documentElement.style.removeProperty('--custom-bg-image');
                if (customBgPreview) {
                    customBgPreview.style.backgroundImage = 'none';
                    customBgPreview.innerHTML = `
                        <svg viewBox="0 0 24 24" width="22" height="22" style="opacity: 0.7;">
                            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>`;
                }
            }

            updateBgVisuals(bg, false);
            localStorage.setItem('website_bg', bg);
            overlay.querySelectorAll('.bg-tile').forEach(t => t.classList.toggle('active', t === tile));
        });
        tile.addEventListener('mouseenter', () => updateBgVisuals(tile.dataset.bg, true));
        tile.addEventListener('mouseleave', () => updateBgVisuals(localStorage.getItem('website_bg') || 'ocean', false));
    });

    if (customBgInput) {
        customBgInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                // 1. Check size limit (50MB) - Increased for better compatibility
                const maxSize = 50 * 1024 * 1024;
                if (file.size > maxSize) {
                    alert('Image is too large! Please select an image smaller than 50MB.');
                    customBgInput.value = '';
                    return;
                }

                try {
                    _CACHED_BLOB = file;
                    await _saveBG(file);

                    if (_OBJECT_URL) URL.revokeObjectURL(_OBJECT_URL);
                    _OBJECT_URL = URL.createObjectURL(file);

                    localStorage.setItem('website_bg', 'custom');

                    document.documentElement.setAttribute('data-bg', 'custom');
                    document.documentElement.style.setProperty('--custom-bg-image', `url('${_OBJECT_URL}')`);

                    if (customBgPreview) {
                        customBgPreview.style.backgroundImage = `url('${_OBJECT_URL}')`;
                        customBgPreview.innerHTML = '';
                    }
                    overlay.querySelectorAll('.bg-tile').forEach(t => t.classList.toggle('active', t === customBgBtn));
                } catch (err) {
                    console.error("Storage Error:", err);
                    alert("Could not set the background. Try another image.");
                }
            }
        });
    }

    // Language switching
    overlay.querySelectorAll('.lang-tile').forEach(tile => {
        tile.addEventListener('click', () => {
            const lang = tile.dataset.lang;
            localStorage.setItem('website_lang', lang);
            overlay.querySelectorAll('.lang-tile').forEach(t => t.classList.toggle('active', t === tile));
        });
    });

    // expose for external use
    window._toggleSettings = () => syncSettings(!isOpen);
}
