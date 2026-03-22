

document.addEventListener("DOMContentLoaded", () => {

  const authCard = document.getElementById("authCard");
  const switchBtns = document.querySelectorAll(".switch-btn");

  const forgotBtn = document.getElementById("forgotBtn");
  const passwordGroup = document.getElementById("passwordGroup");
  const verifyGroup = document.getElementById("verifyGroup");
  const loginSubmitBtn = document.getElementById("loginSubmitBtn");
  const verifySubmitBtn = document.getElementById("verifySubmitBtn");
  const forgotMessage = document.getElementById("forgotMessage");

  const themesModal = document.getElementById("themesModal");
  const btnThemes = document.querySelectorAll(".btnThemes");
  const closeThemesBtn = document.getElementById("closeThemesBtn");
  const themeTiles = document.querySelectorAll(".theme-tile");

  const langSelects = document.querySelectorAll(".lang-select");
  const forms = document.querySelectorAll(".auth-form");

  let isForgotPasswordMode = false;

  const i18n = {
    en: {
      welcome_header: 'Welcome to JOB SARTHI',
      create_heading: "Create account",
      lbl_name: "Full name",
      lbl_name_recruiter: "Company name",
      lbl_email: "Email",
      lbl_email_phone: "Email or Phone number",
      lbl_create_pass: "Create password",
      lbl_confirm_pass: "Confirm password",
      btn_send_code: "Send Code",
      msg_code_sent: "We sent a code to your contact. Enter it below.",
      lbl_password: "Password",
      btn_create: "Create account",
      or_continue: "Or continue with",
      cta_new: 'New to JOB SARTHI?',
      btn_switch_create: "Create account",
      lbl_themes: "Themes",
      lbl_help: "Help",
      login_heading: "Login",
      lbl_user: "Email or Phone number",
      btn_forgot: "Forgot password?",
      msg_forgot: "We sent a code to your email. Enter it to reset your password.",
      btn_login: "Login",
      lbl_verify_code: "Enter verification code",
      btn_verify: "Verify code",
      cta_existing: "Already have an account?",
      btn_switch_login: "Login",
      title_themes: "Select Theme",
      theme_light: "Light",
      theme_dark: "Dark",
      theme_dark_blue: "Dark Blue",
      theme_grey: "Grey",
      theme_light_glass: "Light Glass",
      theme_dark_glass: "Dark Glass",
      btn_close: "Close",
    },
    hi: {
      welcome_header: 'JOB SARTHI में आपका स्वागत है',
      create_heading: "खाता बनाएं",
      lbl_name: "पूरा नाम",
      lbl_name_recruiter: "कंपनी का नाम",
      lbl_email: "ईमेल",
      lbl_email_phone: "ईमेल या फोन नंबर",
      lbl_create_pass: "पासवर्ड बनाएं",
      lbl_confirm_pass: "पासवर्ड की पुष्टि करें",
      btn_send_code: "कोड भेजें",
      msg_code_sent: "हमने आपके संपर्क पर एक कोड भेजा है। इसे नीचे दर्ज करें।",
      lbl_password: "पासवर्ड",
      btn_create: "खाता बनाएं",
      or_continue: "या इसके साथ जारी रखें",
      cta_new: 'क्या JOB SARTHI पर नए हैं?',
      btn_switch_create: "खाता बनाएं",
      lbl_themes: "थीम",
      lbl_help: "मदद",
      login_heading: "लॉग इन करें",
      lbl_user: "ईमेल या फोन नंबर",
      btn_forgot: "पासवर्ड भूल गए?",
      msg_forgot: "हमने आपके ईमेल पर एक कोड भेजा है। रीसेट करने के लिए इसे दर्ज करें।",
      btn_login: "लॉग इन करें",
      lbl_verify_code: "सत्यापन कोड दर्ज करें",
      btn_verify: "कोड सत्यापित करें",
      cta_existing: "क्या आपके पास पहले से एक खाता है?",
      btn_switch_login: "लॉग इन करें",
      title_themes: "थीम चुनें",
      theme_light: "लाइट",
      theme_dark: "डार्क",
      theme_dark_blue: "डार्क ब्लू",
      theme_grey: "ग्रे",
      theme_light_glass: "लाइट ग्लास",
      theme_dark_glass: "डार्क ग्लास",
      btn_close: "बंद करें",
    },
  };

  function setActivePane(target) {
    if (!authCard) return;
    if (target === "create") {
      authCard.setAttribute("data-active", "create");
      document.getElementById("createPane")?.setAttribute("aria-hidden", "false");
      document.getElementById("loginPane")?.setAttribute("aria-hidden", "true");
      setTimeout(() => document.getElementById("regName")?.focus(), 500);
    } else {
      authCard.setAttribute("data-active", "login");
      document.getElementById("createPane")?.setAttribute("aria-hidden", "true");
      document.getElementById("loginPane")?.setAttribute("aria-hidden", "false");
      setTimeout(() => document.getElementById("loginEmail")?.focus(), 500);
    }

    resetForgotPasswordFlow();
    resetCreateFlow();
  }

  switchBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      setActivePane(btn.getAttribute("data-target"));
    });
  });

  if (window.location.hash === '#create') {
    setTimeout(() => setActivePane("create"), 100);
  }

  function startForgotPasswordFlow() {
    isForgotPasswordMode = true;

    passwordGroup.classList.add("hidden");
    loginSubmitBtn.classList.add("hidden");
    verifyGroup.classList.remove("hidden");
    verifySubmitBtn.classList.remove("hidden");
    forgotMessage.classList.remove("hidden");

    setTimeout(() => document.getElementById("verifyCode")?.focus(), 50);
  }

  function resetForgotPasswordFlow() {
    if (!isForgotPasswordMode) return;
    isForgotPasswordMode = false;

    verifyGroup.classList.add("hidden");
    verifySubmitBtn.classList.add("hidden");
    forgotMessage.classList.add("hidden");
    passwordGroup.classList.remove("hidden");
    loginSubmitBtn.classList.remove("hidden");

    document.getElementById("verifyCode").value = "";
  }

  if (forgotBtn) {
    forgotBtn.addEventListener("click", startForgotPasswordFlow);
  }

  const regStep1Group = document.getElementById("regStep1Group");
  const regStep2Group = document.getElementById("regStep2Group");
  const regStep3Group = document.getElementById("regStep3Group");
  const regStep1Btn = document.getElementById("regStep1Btn");
  const regStep2Btn = document.getElementById("regStep2Btn");
  const regStep3Btn = document.getElementById("regStep3Btn");
  const regVerifyMessage = document.getElementById("regVerifyMessage");
  const regContact = document.getElementById("regContact");

  window.completeSetupTemplateRedirect = function () {
    const activeRoleTab = document.querySelector('.role-tab.active');
    if (activeRoleTab && activeRoleTab.dataset.role === 'recruiter') {
      window.location.href = 'recruiter_requirements.html';
    } else {
      window.location.href = 'qualifications.html';
    }
  };

  function resetCreateFlow() {
    if (!regStep1Group) return;

    regStep1Group.classList.remove("hidden");
    regStep1Btn.classList.remove("hidden");
    regStep2Group.classList.add("hidden");
    regStep2Btn.classList.add("hidden");
    regStep3Group.classList.add("hidden");
    regStep3Btn.classList.add("hidden");

    if (regContact) regContact.value = "";
    const nameInput = document.getElementById("regName");
    if (nameInput) nameInput.value = "";
    const vCode = document.getElementById("regVerifyCode");
    if (vCode) vCode.value = "";
    const cPass = document.getElementById("regCreatePassword");
    if (cPass) cPass.value = "";
    const cConf = document.getElementById("regConfirmPassword");
    if (cConf) cConf.value = "";
  }

  if (regStep1Btn) {
    regStep1Btn.addEventListener("click", () => {
      const contact = regContact.value.trim();

      regStep1Group.classList.add("hidden");
      regStep1Btn.classList.add("hidden");
      regStep2Group.classList.remove("hidden");
      regStep2Btn.classList.remove("hidden");

      const isEmail = contact.includes('@');
      const currentLang = document.documentElement.lang || 'en';
      let msg = "";
      if (currentLang === 'en') {
        msg = isEmail
          ? `We sent a code to your email (${contact}).`
          : `We sent a code to your phone (${contact}).`;
      } else {
        msg = isEmail
          ? `हमने आपके ईमेल (${contact}) पर एक कोड भेजा है।`
          : `हमने आपके फोन (${contact}) पर एक कोड भेजा है।`;
      }
      regVerifyMessage.innerText = msg;

      setTimeout(() => document.getElementById("regVerifyCode")?.focus(), 50);
    });
  }

  if (regStep2Btn) {
    regStep2Btn.addEventListener("click", () => {
      regStep2Group.classList.add("hidden");
      regStep2Btn.classList.add("hidden");
      regStep3Group.classList.remove("hidden");
      regStep3Btn.classList.remove("hidden");

      setTimeout(() => document.getElementById("regCreatePassword")?.focus(), 50);
    });
  }

  // ── IndexedDB Helpers for BG ───────────────────────────────────
  const _DB_CONFIG = { name: 'JobSarthiDB', store: 'backgrounds', key: 'custom_bg' };
  async function _getDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(_DB_CONFIG.name, 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(_DB_CONFIG.store))
          req.result.createObjectStore(_DB_CONFIG.store);
      };
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
        const store = tx.objectStore(_DB_CONFIG.store);
        const req = store.get(_DB_CONFIG.key);
        req.onsuccess = () => r(req.result);
        req.onerror = () => r(null);
      });
    } catch { return null; }
  }

  const bgLayer = document.getElementById("bgLayer");
  let tempCustomBg = null;
  let currentObjectUrl = null;

  const state = {
    theme: document.documentElement.getAttribute("data-theme") || localStorage.getItem("website_theme") || "dark",
    bg: document.documentElement.getAttribute("data-bg") || localStorage.getItem("website_bg") || "ocean",
  };

  async function updateBackgroundVisuals(bgName, isPreview = false) {
    document.documentElement.setAttribute("data-bg", bgName);

    if (isPreview) {
      document.documentElement.setAttribute("data-view", "preview");
    } else {
      document.documentElement.removeAttribute("data-view");
    }

    if (bgName === "custom") {
      let customData = tempCustomBg;
      if (!customData) {
        const blob = await _loadBG();
        if (blob instanceof Blob) {
          if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
          currentObjectUrl = URL.createObjectURL(blob);
          customData = currentObjectUrl;
        }
      }
      if (customData) {
        document.documentElement.style.setProperty("--custom-bg-image", `url('${customData}')`);
        const customPreview = document.getElementById("customPreview");
        if (customPreview) customPreview.style.backgroundImage = `url('${customData}')`;
      }
    }
  }

  const customBgInput = document.getElementById("customBgUpload");
  if (customBgInput) {
    customBgInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
      const blobUrl = URL.createObjectURL(file);
      tempCustomBg = blobUrl;
      currentObjectUrl = blobUrl;

      const preview = document.getElementById("customPreview");
      if (preview) preview.style.backgroundImage = `url('${blobUrl}')`;

      const spanText = document.getElementById("customTileText");
      if (spanText) spanText.innerText = "Remove";

      await applyBackground("custom");

      // Save to IDB
      await _saveBG(file);
    });
  }

  function applyCoreTheme(themeName) {
    state.theme = themeName;
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("website_theme", themeName);

    document.querySelectorAll(".core-tile").forEach((t) => {
      const isMatch = t.getAttribute("data-theme") === themeName;
      t.setAttribute("aria-pressed", isMatch);
      isMatch ? t.classList.add("active") : t.classList.remove("active");
    });
  }

  async function applyBackground(bgName) {
    state.bg = bgName;
    localStorage.setItem("website_bg", bgName);
    await updateBackgroundVisuals(bgName);

    document.querySelectorAll(".bg-tile").forEach((t) => {
      const isMatch = t.getAttribute("data-bg") === bgName;
      t.setAttribute("aria-selected", isMatch);
      isMatch ? t.classList.add("active") : t.classList.remove("active");
    });
  }

  function toggleThemesPanel() {
    const isOpening = themesModal.classList.contains("hidden");
    themesModal.classList.toggle("hidden");

    if (isOpening) {
      document.body.classList.add("body-lock");
      themesModal.focus();
    } else {
      document.body.classList.remove("body-lock");
    }
  }

  applyCoreTheme(state.theme);
  applyBackground(state.bg);

  btnThemes.forEach((b) => b.addEventListener("click", toggleThemesPanel));
  if (closeThemesBtn) closeThemesBtn.addEventListener("click", toggleThemesPanel);

  if (themesModal) {
    themesModal.addEventListener("click", (e) => {
      if (e.target === themesModal) toggleThemesPanel();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !themesModal.classList.contains("hidden")) {
        toggleThemesPanel();
      }
    });
  }

  document.querySelectorAll(".core-tile").forEach((tile) => {
    tile.addEventListener("click", () => {
      applyCoreTheme(tile.getAttribute("data-theme"));
    });
  });

  document.querySelectorAll(".bg-tile").forEach((tile) => {
    tile.addEventListener("click", (e) => {
      const bg = tile.getAttribute("data-bg");

      if (bg === "custom") {
        return;
      }

      if (bg === "none") {
        tempCustomBg = null;
        localStorage.removeItem("website_custom_bg");

        const preview = document.getElementById("customPreview");
        if (preview) preview.style.backgroundImage = "none";

        const fileInput = document.getElementById("customBgUpload");
        if (fileInput) fileInput.value = "";
      }

      applyBackground(bg);
    });

    tile.addEventListener("mouseenter", async () => await updateBackgroundVisuals(tile.getAttribute("data-bg"), true));
    tile.addEventListener("focus", async () => await updateBackgroundVisuals(tile.getAttribute("data-bg"), true));

    tile.addEventListener("mouseleave", async () => await updateBackgroundVisuals(state.bg, false));
    tile.addEventListener("blur", async () => await updateBackgroundVisuals(state.bg, false));
  });

  function applyLanguage(lang) {
    const translation = i18n[lang];
    if (!translation) return;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translation[key]) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.setAttribute("placeholder", translation[key]);
        } else {
          el.textContent = translation[key];
        }
      }
    });

    langSelects.forEach((select) => { select.value = lang; });

    localStorage.setItem("website_lang", lang);
    document.documentElement.lang = lang;
  }

  langSelects.forEach((select) => {
    select.addEventListener("change", (e) => applyLanguage(e.target.value));
  });

  const savedLang = localStorage.getItem("website_lang") || "en";
  applyLanguage(savedLang);

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  });

  const roleTabs = document.querySelectorAll('.role-tab');
  let currentRole = 'jobseeker';

  roleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      roleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentRole = tab.getAttribute('data-role');

      const nameLabel = document.querySelector('label[for="regName"]');
      if (nameLabel) {
        if (currentRole === 'recruiter') {
          nameLabel.setAttribute('data-i18n', 'lbl_name_recruiter');
        } else {
          nameLabel.setAttribute('data-i18n', 'lbl_name');
        }
        const currentLang = document.documentElement.lang || 'en';
        nameLabel.textContent = i18n[currentLang][nameLabel.getAttribute('data-i18n')];
      }

      resetCreateFlow();
    });
  });

  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', function () {
      const item = this.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.accordion-item').forEach(acc => {
        acc.classList.remove('open');
        acc.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        acc.querySelector('.accordion-body').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = (body.scrollHeight + 500) + "px";
      }
    });
  });

  if (accordions.length > 0) {
    accordions[0].click();
  }

  const textareas = document.querySelectorAll('.char-limited-textarea');
  textareas.forEach(ta => {
    ta.addEventListener('input', function () {
      const count = this.value.length;
      const counter = this.nextElementSibling;
      if (counter && counter.classList.contains('char-count')) {
        counter.textContent = `${count} / 300`;
        counter.style.color = count > 300 ? '#ef4444' : 'var(--text-dim)';
      }
    });
  });

  const fileInputs = document.querySelectorAll('.hidden-file-input');
  fileInputs.forEach(input => {
    const dropArea = input.closest('.file-drop-area');
    const preview = dropArea.querySelector('.file-name-preview');
    const text = dropArea.querySelector('.drop-text');

    input.addEventListener('change', function () {
      if (this.files && this.files.length > 0) {
        if (preview) {
          preview.textContent = this.files[0].name;
          preview.style.display = 'block';
          if (text) text.style.display = 'none';
        } else if (text) {
          text.textContent = this.files[0].name;
          text.style.color = 'var(--accent)';
        }
      }
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      input.addEventListener(eventName, () => dropArea.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      input.addEventListener(eventName, () => dropArea.classList.remove('dragover'), false);
    });
  });

  const industryData = [
    { text: "IT & Software", value: "it" },
    { text: "Finance", value: "finance" },
    { text: "Healthcare", value: "healthcare" },
    { text: "Education", value: "education" },
    { text: "Other", value: "other" }
  ];

  const sizeData = [
    { text: "Startup (1-50)", value: "startup" },
    { text: "SME (51-500)", value: "sme" },
    { text: "Enterprise (500+)", value: "enterprise" }
  ];

  const empTypeData = [
    { text: "Full-time", value: "full-time" },
    { text: "Part-time", value: "part-time" },
    { text: "Internship", value: "internship" },
    { text: "Contract", value: "contract" }
  ];

  const expLevelData = [
    { text: "Fresher", value: "fresher" },
    { text: "1-3 yrs", value: "1-3" },
    { text: "3-5 yrs", value: "3-5" },
    { text: "Senior (5+ yrs)", value: "senior" }
  ];

  const workModeData = [
    { text: "Remote", value: "remote" },
    { text: "Hybrid", value: "hybrid" },
    { text: "On-site", value: "onsite" }
  ];

  const appLanguageData = [
    { text: "English", value: "en", isBold: true },
    { text: "हिन्दी (Hindi)", value: "hi" },
    { text: "தமிழ் (Tamil)", value: "ta" },
    { text: "తెలుగు (Telugu)", value: "te" },
    { text: "मराठी (Marathi)", value: "mr" },
    { text: "বাংলা (Bengali)", value: "bn" }
  ];

  const yesNoData = [
    { text: "Yes", value: "yes" },
    { text: "No", value: "no" }
  ];

  function initializeCustomSelect(selectId, dataArray, hiddenInputId) {
    const customSelect = document.getElementById(selectId);
    if (!customSelect) return;

    const selected = customSelect.querySelector(".select-selected");
    let itemsContainer = customSelect.querySelector(".select-items-container");

    if (!itemsContainer) {
      itemsContainer = customSelect.querySelector(".select-items");
      if (itemsContainer) itemsContainer.className = "select-items-container";
    }

    const optionsList = customSelect.querySelector(".select-options-list");
    const searchInput = customSelect.querySelector(".select-search");
    const hiddenInput = document.getElementById(hiddenInputId);
    const selectedText = selected.querySelector(".selected-text");

    if (!itemsContainer || !optionsList) return;

    document.body.appendChild(itemsContainer);

    function renderOptions(filter = "") {
      optionsList.innerHTML = "";
      const lowerFilter = filter.toLowerCase();

      dataArray.forEach(item => {
        if (item.label) {
          const div = document.createElement("div");
          div.className = "optgroup-label";
          div.textContent = item.label;
          optionsList.appendChild(div);
        } else {
          if (item.text.toLowerCase().includes(lowerFilter)) {
            const div = document.createElement("div");

            if (item.isBold) {
              div.style.fontWeight = 'bold';
              div.style.color = 'var(--text-main)';
            } else {
              div.className = "optgroup-option";
            }

            div.textContent = item.text;
            div.dataset.value = item.value;

            div.addEventListener("click", function (e) {
              e.stopPropagation();
              selectedText.textContent = this.textContent;
              selectedText.style.color = "var(--text-main)";

              if (hiddenInput) {
                hiddenInput.value = this.dataset.value;
                hiddenInput.dispatchEvent(new Event('change'));
              }

              optionsList.querySelectorAll(".same-as-selected").forEach(el =>
                el.classList.remove("same-as-selected"));
              this.classList.add("same-as-selected");

              closeSelect(itemsContainer, selected, searchInput, renderOptions);
            });

            optionsList.appendChild(div);
          }
        }
      });
    }

    renderOptions();

    function updateDropdownPosition() {
      if (!itemsContainer.classList.contains("open")) return;
      const rect = selected.getBoundingClientRect();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;

      itemsContainer.style.top = (rect.bottom + scrollY + 8) + "px";
      itemsContainer.style.left = (rect.left + scrollX) + "px";
      itemsContainer.style.width = rect.width + "px";
    }

    selected.addEventListener("click", function (e) {
      e.stopPropagation();

      closeAllCustomSelects(itemsContainer);

      const isOpen = itemsContainer.classList.contains("open");
      if (!isOpen) {
        this.classList.add("select-arrow-active");
        itemsContainer.classList.add("open");
        updateDropdownPosition();
        if (searchInput) searchInput.focus();
      } else {
        closeSelect(itemsContainer, selected, searchInput, renderOptions);
      }
    });

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        renderOptions(this.value);
      });
    }

    window.addEventListener('scroll', updateDropdownPosition, true);
    window.addEventListener('resize', updateDropdownPosition);

    itemsContainer._closeReference = () =>
      closeSelect(itemsContainer, selected, searchInput, renderOptions);
    itemsContainer._isCustomSelect = true;
  }

  function closeSelect(itemsContainer, selected, searchInput, renderOptionsFunc) {
    itemsContainer.classList.remove("open");
    if (selected) selected.classList.remove("select-arrow-active");
    if (searchInput) searchInput.value = "";
    if (renderOptionsFunc) renderOptionsFunc();
  }

  function closeAllCustomSelects(exceptContainer = null) {
    document.querySelectorAll('.select-items-container.open').forEach(container => {
      if (container !== exceptContainer && container._closeReference) {
        container._closeReference();
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest('.select-search-container')) return;
    closeAllCustomSelects();
  });

  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => closeAllCustomSelects());
  });

  initializeCustomSelect("industrySelect", industryData, "hiddenIndustryInput");
  initializeCustomSelect("companySizeSelect", sizeData, "hiddenSizeInput");
  initializeCustomSelect("employmentTypeSelect", empTypeData, "hiddenEmpTypeInput");
  initializeCustomSelect("experienceLevelSelect", expLevelData, "hiddenExpLevelInput");
  initializeCustomSelect("workModeSelect", workModeData, "hiddenWorkModeInput");
  initializeCustomSelect("portfolioSelect", yesNoData, "hiddenPortReqInput");
  initializeCustomSelect("immediateJoinerSelect", yesNoData, "hiddenImedJoinInput");
  initializeCustomSelect("headerLanguageSelectLeft", appLanguageData, "hiddenLangInputLeft");
  initializeCustomSelect("headerLanguageSelectRight", appLanguageData, "hiddenLangInputRight");

  function updateStepIndicator() {
    const panels = document.querySelectorAll('.accordion-item');
    if (panels.length < 4) return;

    const hasValue = (panel) => {
      const inputs = panel.querySelectorAll('input:not([type="file"]), textarea');
      const files = panel.querySelectorAll('input[type="file"]');
      let filled = false;
      inputs.forEach(i => { if (i.value.trim().length > 0) filled = true; });
      files.forEach(f => { if (f.files && f.files.length > 0) filled = true; });
      return filled;
    };

    const s1 = hasValue(panels[0]);
    const s2 = hasValue(panels[1]);
    const s3 = hasValue(panels[2]);
    const s4 = hasValue(panels[3]);

    const line1 = document.getElementById('line1');
    const dot2 = document.getElementById('dot2');
    const line2 = document.getElementById('line2');
    const dot3 = document.getElementById('dot3');
    const line3 = document.getElementById('line3');
    const dot4 = document.getElementById('dot4');
    const line4 = document.getElementById('line4');
    const dot5 = document.getElementById('dot5');

    if (s1) { line1.classList.add('active'); dot2.classList.add('active'); }
    else { line1.classList.remove('active'); dot2.classList.remove('active'); }

    if (s2) { line2.classList.add('active'); dot3.classList.add('active'); }
    else { line2.classList.remove('active'); dot3.classList.remove('active'); }

    if (s3) { line3.classList.add('active'); dot4.classList.add('active'); }
    else { line3.classList.remove('active'); dot4.classList.remove('active'); }

    if (s4) { line4.classList.add('active'); dot5.classList.add('active'); }
    else { line4.classList.remove('active'); dot5.classList.remove('active'); }
  }

  document.querySelectorAll('.qual-card input, .qual-card textarea').forEach(el => {
    el.addEventListener('input', updateStepIndicator);
    el.addEventListener('change', updateStepIndicator);
  });

}); 
