// ==UserScript==
// @name           New tab page
// @description    New tabs open DuckDuckGo with focus on the page
// @ignorecache
// ==/UserScript==

(function () {
  const NEWTAB = "https://html.duckduckgo.com/html/";

  // Point new tabs at our URL
  try {
    const { AboutNewTab } = ChromeUtils.importESModule(
      "resource:///modules/AboutNewTab.sys.mjs"
    );
    AboutNewTab.newTabURL = NEWTAB;
  } catch (e) {
    console.error("newtab.uc.js: could not set new tab URL", e);
  }

  // When a new tab opens, close the URL bar dropdown and focus the page
  gBrowser.tabContainer.addEventListener("TabOpen", (e) => {
    const tab = e.target;
    setTimeout(() => {
      if (gBrowser.selectedTab !== tab) return;
      gURLBar.view.close();
      gBrowser.selectedBrowser.focus();
    }, 300);
  });
})();
