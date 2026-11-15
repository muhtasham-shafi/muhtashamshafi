/**
 * Runs before paint (inlined in <head>) so the page never flashes the wrong
 * theme. Uses the visitor's saved choice, otherwise their system setting.
 */
export const themeScript = `(function(){try{var s=localStorage.getItem('theme');var d=document.documentElement;var m=window.matchMedia('(prefers-color-scheme: dark)');d.dataset.theme=s||(m.matches?'dark':'light');if(!s){m.addEventListener('change',function(e){if(!localStorage.getItem('theme'))d.dataset.theme=e.matches?'dark':'light';});}}catch(e){}})();`;
