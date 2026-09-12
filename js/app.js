document.addEventListener("DOMContentLoaded",()=>{
  const menu=document.getElementById("menuToggle"),nav=document.getElementById("mainNav");
  if(menu&&nav)menu.addEventListener("click",()=>nav.classList.toggle("open"));
  if(nav)nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
  const select=document.getElementById("language");
  const saved=localStorage.getItem("hilex-language")||"en";
  const apply=()=>{
    const dict=window.HILEX_LANG||{};
    nav&&nav.querySelectorAll("[data-i18n]").forEach(el=>{
      const value=dict[el.dataset.i18n]; if(value)el.textContent=value;
    });
    if(select)select.value=window.HILEX_LANG?select.value:"en";
  };
  const load=(code)=>{
    if(code==="en"){window.HILEX_LANG={};apply();localStorage.setItem("hilex-language","en");return;}
    const old=document.getElementById("hilex-language-script"); if(old)old.remove();
    window.HILEX_LANG={};
    const s=document.createElement("script");s.id="hilex-language-script";s.src=`languages/${code}.js`;
    s.onload=()=>{apply();localStorage.setItem("hilex-language",code);};
    s.onerror=()=>{if(select)select.value="en";};
    document.head.appendChild(s);
  };
  if(select){select.value=saved;select.addEventListener("change",e=>load(e.target.value));}
  load(saved);
});
