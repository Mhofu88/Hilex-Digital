document.addEventListener("DOMContentLoaded",()=>{
  const menu=document.getElementById("menuToggle"),nav=document.getElementById("mainNav"),select=document.getElementById("language");
  if(menu&&nav)menu.addEventListener("click",()=>nav.classList.toggle("open"));
  if(nav)nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
  const originals={};
  document.querySelectorAll("[data-i18n]").forEach(el=>originals[el.dataset.i18n]=el.textContent);
  const supported=["en","fr","pt","sw","sn","zu","bem","ny","nd","tn","st","ss","ts","ve"];
  const apply=(dict,code)=>{
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const k=el.dataset.i18n; el.textContent=(dict&&dict[k])||originals[k]||el.textContent;
    });
    document.documentElement.lang=code;
    if(select)select.value=code;
  };
  const load=(code)=>{
    if(!supported.includes(code))code="en";
    localStorage.setItem("hilex-language",code);
    if(code==="en"){window.HILEX_LANG={};apply({},code);return;}
    const old=document.getElementById("hilex-language-script");if(old)old.remove();
    const s=document.createElement("script");s.id="hilex-language-script";s.src=`languages/${code}.js?v=sadc14`;
    s.onload=()=>apply(window.HILEX_LANG||{},code);
    s.onerror=()=>{localStorage.setItem("hilex-language","en");apply({},"en");};
    document.head.appendChild(s);
  };
  if(select)select.addEventListener("change",e=>load(e.target.value));
  load(localStorage.getItem("hilex-language")||"en");
});