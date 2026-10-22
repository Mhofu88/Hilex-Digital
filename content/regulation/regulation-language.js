/* HILEX Stage 4F: persisted preference and accurate translation status. */
(function(){'use strict';
const KEY='hilex-language';
const names={"en": "English", "fr": "Français", "pt": "Português", "sw": "Kiswahili", "sn": "Shona", "zu": "isiZulu", "bem": "Bemba", "ny": "Chichewa / Nyanja", "nd": "isiNdebele", "tn": "Setswana", "st": "Sesotho", "ss": "siSwati", "ts": "itsonga", "ve": "Tshivenda"};
const notices={"en": "English is the source language. Check current legal requirements with official authorities.", "fr": "Traduction éducative partielle en français. Certains passages restent en anglais. Vérifiez les textes officiels.", "pt": "Tradução educativa parcial em português. Alguns trechos permanecem em inglês. Consulte os textos oficiais.", "sn": "Dudziro yedzidzo yeShona iripo pazvikamu. Zvimwe zviri muChirungu. Tarisa magwaro epamutemo.", "st": "Phetolelo ea Sesotho e fumaneha likarolong tse itseng. Likarolo tse ling li ka ba ka Senyesemane. Netefatsa melao mehloling ea semmuso."};
const select=document.getElementById('regLanguage');
const status=document.getElementById('regTranslationStatus');
if(!select)return;
function get(){try{return localStorage.getItem(KEY)||'en'}catch(_){return'en'}}
function save(v){try{localStorage.setItem(KEY,v)}catch(_){}}
function refresh(){const current=get();const c=names[current]?current:'en';select.value=c;
 if(status){status.textContent=notices[c]||(names[c]+': the Regulation Hub currently displays English source content for this selection. Translation is not yet available.');}
 // Individual lesson scripts own their own document language; only the Hub is controlled here.
}
select.addEventListener('change',()=>{save(select.value);refresh();document.dispatchEvent(new CustomEvent('hilex:languagechange',{detail:{language:select.value}}))});
window.addEventListener('storage',()=>{refresh();document.dispatchEvent(new CustomEvent('hilex:languagechange',{detail:{language:select.value}}))});
refresh();
})();
