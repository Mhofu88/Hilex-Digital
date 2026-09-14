(() => {
  const supported = ["en","fr","pt","sw","sn","zu","bem","ny","nd","tn","st","ss","ts","ve"];
  const saved = localStorage.getItem("hilex-language") || "en";
  document.documentElement.lang = supported.includes(saved) ? saved : "en";
})();