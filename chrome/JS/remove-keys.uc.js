// ==UserScript==
// @name           Remove unused keys
// @description    Removes Firefox shortcuts that are useless with the hidden UI or easy to hit by accident
// ==/UserScript==

(function () {
  // Each entry: the key, and its modifiers ("accel" means Ctrl on Linux)
  const REMOVE = [
    { key: "Q", mods: "accel" },        // quit
    { key: "B", mods: "accel" },        // bookmarks sidebar
    { key: "H", mods: "accel" },        // history sidebar
    { key: "B", mods: "accel,shift" },  // bookmarks toolbar
    { key: "D", mods: "accel" },        // bookmark this page
    { key: "S", mods: "accel" },        // save page as
    { key: "P", mods: "accel" },        // print
    { key: "O", mods: "accel" },        // open file, so Read Aloud can own Ctrl+O
    { keycode: "VK_F1", mods: "" },     // help
  ];

  // Firefox writes modifiers a few ways; normalize to a sorted list
  const norm = (m) =>
    (m || "")
      .toLowerCase()
      .split(/[,\s]+/)
      .filter(Boolean)
      .map((x) => (x === "control" ? "accel" : x))
      .sort()
      .join(",");

  for (const el of document.querySelectorAll("key")) {
    const key = (el.getAttribute("key") || "").toUpperCase();
    const keycode = el.getAttribute("keycode") || "";
    const mods = norm(el.getAttribute("modifiers"));
    const match = REMOVE.some(
      (r) =>
        norm(r.mods) === mods &&
        (r.key ? r.key === key : r.keycode === keycode)
    );
    if (match) el.remove();
  }
})();
