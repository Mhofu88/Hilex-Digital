/* HILEX Regulation Stage 4B: language preference and honest English fallback.
   No machine-generated legal translations are presented as verified. */
(function(){'use strict';
const KEY='hilex-language';const LABELS={en:'English',fr:'Français',pt:'Português',sw:'Kiswahili',sn:'Shona',zu:'isiZulu',bem:'Bemba',ny:'Chichewa / Nyanja',nd:'isiNdebele',tn:'Setswana',st:'Sesotho',ss:'siSwati',ts:'itsonga',ve:'Tshivenda'};
const select=document.getElementById('regLanguage');const status=document.getElementById('regTranslationStatus');
if(!select)return;
function read(){try{return localStorage.getItem(KEY)||'en'}catch(e){return 'en'}}
function write(v){try{localStorage.setItem(KEY,v)}catch(e){}}
function refresh(){const choice=LABELS[read()]?read():'en';select.value=choice;
const hub=document.body.classList.contains('reg-hub');const available=hub&&(choice==='en'||choice==='st');const portugueseLesson=!hub&&choice==='pt';
if(status){if(choice==='en'){status.textContent='Language: English. All Regulation lessons currently use English as their verified source text.'}
else if(available){status.textContent='Sesotho is available for parts of this hub. Individual lessons remain in English until translated.'}
else if(portugueseLesson){status.textContent='Português: tradução educativa disponível. Consulte também os textos oficiais para confirmar a legislação atual.'}
else{status.textContent=LABELS[choice]+' selected. This lesson is currently available in English only. The language preference is saved for future verified translations.'}}
if(!hub)document.documentElement.lang='en';
}
select.addEventListener('change',function(){write(select.value);setTimeout(refresh,0)});window.addEventListener('storage',refresh);refresh();
})();