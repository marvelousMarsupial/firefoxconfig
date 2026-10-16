// ==UserScript==
// @name           Container windows
// @description    Creates my containers; Ctrl+N picker; tabs stay in their window's container
// ==/UserScript==

(function () {
  if (PrivateBrowsingUtils.isWindowPrivate(window)) return;

  const NEWTAB = "https://html.duckduckgo.com/html/";
  const HTML = "http://www.w3.org/1999/xhtml";

  // ---- My containers, in picker order ----
  // Icons: fingerprint briefcase dollar cart circle gift vacation food fruit pet tree chill fence
  // Colors: blue turquoise green yellow orange red pink purple toolbar
  const MY_CONTAINERS = [
    { name: "School",   icon: "briefcase", color: "blue" },
    { name: "Money",    icon: "dollar",    color: "green" },
    { name: "Shopping", icon: "cart",      color: "pink" },
    { name: "Social",   icon: "chill",     color: "purple" },
  ];
  // Delete any container not in the list above
  const REMOVE_OTHERS = true;

  const label = (c) => ContextualIdentityService.getUserContextLabel(c.userContextId);

  function syncContainers() {
    const existing = ContextualIdentityService.getPublicIdentities();
    for (const want of MY_CONTAINERS) {
      if (!existing.some((c) => label(c) === want.name)) {
        ContextualIdentityService.create(want.name, want.icon, want.color);
      }
    }
    if (REMOVE_OTHERS) {
      const names = MY_CONTAINERS.map((w) => w.name);
      for (const c of ContextualIdentityService.getPublicIdentities()) {
        if (!names.includes(label(c))) {
          ContextualIdentityService.remove(c.userContextId);
        }
      }
    }
  }
  syncContainers();

  // My containers in list order, matched by name
  function myContainers() {
    const all = ContextualIdentityService.getPublicIdentities();
    return MY_CONTAINERS
      .map((w) => all.find((c) => label(c) === w.name))
      .filter(Boolean);
  }

  // ---- Which container this window belongs to ----
  function windowContainer() {
    return Number(gBrowser.tabs[0]?.getAttribute("usercontextid") || 0);
  }

  // ---- New tabs inherit the window's container ----
  const origAddTab = gBrowser.addTab;
  gBrowser.addTab = function (uri, params = {}) {
    const id = windowContainer();
    if (id && !params.userContextId) {
      params = { ...params, userContextId: id };
    }
    return origAddTab.call(this, uri, params);
  };

  // ---- The picker ----
  function showPicker() {
    if (document.getElementById("container-picker")) return;

    const choices = [{ key: "0", label: "Main", id: 0 }].concat(
      myContainers().map((c, i) => ({
        key: String(i + 1),
        label: label(c),
        id: c.userContextId,
      }))
    );

    const box = document.createElementNS(HTML, "div");
    box.id = "container-picker";
    box.tabIndex = 0;
    box.style.cssText = `
      position: fixed; top: 30vh; left: 50%; transform: translateX(-50%);
      z-index: 100; min-width: 240px; padding: 12px;
      background: #2a2725; color: #e6dfd8;
      border: 1px solid #4b4541; border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      font: 10pt "JetBrains Mono", monospace; outline: none;
    `;

    const rows = choices.map((c) => {
      const row = document.createElementNS(HTML, "div");
      row.style.cssText = "padding: 4px 8px; border-radius: 6px;";
      row.textContent = `${c.key}  ${c.label}`;
      box.appendChild(row);
      return row;
    });

    let sel = 0;
    const highlight = () => {
      rows.forEach((r, i) => {
        r.style.background = i === sel ? "#45403b" : "transparent";
      });
    };
    highlight();

    const close = () => box.remove();
    const pick = (id) => {
      close();
      openTrustedLinkIn(NEWTAB, "window", { userContextId: id });
    };

    box.addEventListener("keydown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.key === "ArrowDown" || e.key === "j") {
        sel = (sel + 1) % choices.length;
        highlight();
      } else if (e.key === "ArrowUp" || e.key === "k") {
        sel = (sel - 1 + choices.length) % choices.length;
        highlight();
      } else if (e.key === "Enter") {
        pick(choices[sel].id);
      } else if (e.key === "Escape") {
        close();
      } else {
        const c = choices.find((c) => c.key === e.key);
        if (c) pick(c.id);
      }
    });
    box.addEventListener("blur", close);

    document.body.appendChild(box);
    box.focus();
  }

  window.containerPicker = showPicker;

  // ---- Ctrl+N opens the picker instead of a plain window ----
  if (!document.getElementById("key_container_picker")) {
    UC_API.Hotkeys.define({
      id: "key_container_picker",
      modifiers: "accel",
      key: "N",
      command: (win) => win.containerPicker?.(),
    }).autoAttach({ suppressOriginal: true });
  }
})();
