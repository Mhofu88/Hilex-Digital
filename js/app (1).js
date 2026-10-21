document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  const select = document.getElementById("language");

  if (menu && nav) menu.addEventListener("click", () => nav.classList.toggle("open"));
  if (nav) nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  const supported = ["en","fr","pt","sw","sn","zu","bem","ny","nd","tn","st","ss","ts","ve"];
  const originalText = {};
  const originalHtml = {};

  document.querySelectorAll("[data-i18n]").forEach(el => {
    originalText[el.dataset.i18n] = el.textContent;
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    originalHtml[el.dataset.i18nHtml] = el.innerHTML;
  });

  function applyTranslations(dict, code) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = (dict && dict[key] != null) ? dict[key] : (originalText[key] ?? el.textContent);
    });

    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const key = el.dataset.i18nHtml;
      el.innerHTML = (dict && dict[key] != null) ? dict[key] : (originalHtml[key] ?? el.innerHTML);
    });

    document.documentElement.lang = code;
    if (select) select.value = code;
  }

  function loadLanguage(requested) {
    const code = supported.includes(requested) ? requested : "en";
    localStorage.setItem("hilex-language", code);

    const old = document.getElementById("hilex-language-script");
    if (old) old.remove();

    if (code === "en") {
      window.HILEX_LANG = {};
      applyTranslations({}, "en");
      return;
    }

    const script = document.createElement("script");
    script.id = "hilex-language-script";
    script.src = `languages/${code}.js?v=sadc14-2`;
    script.onload = () => applyTranslations(window.HILEX_LANG || {}, code);
    script.onerror = () => {
      console.warn(`Could not load language file for ${code}; falling back to English.`);
      localStorage.setItem("hilex-language", "en");
      applyTranslations({}, "en");
    };
    document.head.appendChild(script);
  }

  if (select) select.addEventListener("change", e => loadLanguage(e.target.value));
  loadLanguage(localStorage.getItem("hilex-language") || "en");
});