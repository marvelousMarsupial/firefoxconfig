// ==UserScript==
// @name           Toggle tracking protection
// @description    Ctrl+Shift+X turns tracking protection off or on for the current site and reloads
// ==/UserScript==

(function () {
  function toggle() {
    const h = window.gProtectionsHandler;
    if (!h) return;
    // Both calls reload the page, which is the only feedback since the shield is hidden
    if (h.hasException) {
      h.enableForCurrentPage();
    } else {
      h.disableForCurrentPage();
    }
  }
  window.toggleTrackingProtection = toggle;

  if (!document.getElementById("key_toggle_tracking_protection")) {
    UC_API.Hotkeys.define({
      id: "key_toggle_tracking_protection",
      modifiers: "accel,shift",
      key: "X",
      command: (win) => win.toggleTrackingProtection?.(),
    }).autoAttach({ suppressOriginal: true });
  }
})();
