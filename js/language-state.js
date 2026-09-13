(() => {
  const supported = ["en","fr","pt","sw","sn","zu","bem","ny"];
  const saved = localStorage.getItem("hilex-language");
  if (supported.includes(saved)) document.documentElement.dataset.hilexLanguage = saved;
})();