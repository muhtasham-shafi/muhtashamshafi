/**
 * Runs before paint (inlined in <head>) so the page never flashes the wrong
 * theme. The site is light by default; dark only if the visitor chose it.
 */
export const themeScript = `(function(){try{document.documentElement.dataset.theme=localStorage.getItem('theme')==='dark'?'dark':'light';}catch(e){}})();`;
