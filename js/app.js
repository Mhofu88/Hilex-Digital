document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  const select = document.getElementById("language");
  const SUPPORTED = ["en","fr","pt","sw","sn","zu","bem","ny"];

  if (menu && nav) menu.addEventListener("click", () => nav.classList.toggle("open"));
  if (nav) nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  const normalise = code => SUPPORTED.includes(code) ? code : "en";
  const saved = normalise(localStorage.getItem("hilex-language") || "en");

  const apply = code => {
    const dict = window.HILEX_LANG || {};
    document.documentElement.lang = code;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const value = dict[el.dataset.i18n];
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const value = dict[el.dataset.i18nHtml];
      if (typeof value === "string") el.innerHTML = value;
    });

    if (select) select.value = code;
    localStorage.setItem("hilex-language", code);
  };

  const load = code => {
    code = normalise(code);
    const old = document.getElementById("hilex-language-script");
    if (old) old.remove();

    window.HILEX_LANG = {};
    const s = document.createElement("script");
    s.id = "hilex-language-script";
    s.src = `languages/${code}.js`;
    s.onload = () => apply(code);
    s.onerror = () => {
      if (code !== "en") load("en");
    };
    document.head.appendChild(s);
  };

  if (select) {
    select.value = saved;
    select.addEventListener("change", e => load(e.target.value));
  }
  load(saved);
});
