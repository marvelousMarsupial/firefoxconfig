// ==UserScript==
// @name           Esc leaves URL bar
// @description    One Esc press closes the URL bar and focuses the page
// @ignorecache
// ==/UserScript==

(function () {
  const urlbar = window.gURLBar;
  if (!urlbar) return;

  urlbar.inputField.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || e.isComposing) return;
    e.preventDefault();
    e.stopPropagation();
    urlbar.view.close();
    urlbar.handleRevert();
    gBrowser.selectedBrowser.focus();
  }, true);
})();
