/****************************************************************************
 * MY OVERRIDES                                                             *
****************************************************************************/

// ===== UI setup =====
user_pref("extensions.activeThemeID", "firefox-compact-dark@mozilla.org");
// The downloads button is hidden, so do not pop its panel; Ctrl+Shift+Y opens the Library
user_pref("browser.download.alwaysOpenPanel", false);
// Ctrl+Q never quits (remove-keys.uc.js also disables the key)
user_pref("browser.quitShortcut.disabled", true);
// userChrome.css comes from the install dir; a leftover profile copy must not load too
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", false);
user_pref("sidebar.revamp", true);
user_pref("browser.ctrlTab.sortByRecentlyUsed", true);
// Flip to true only when using the Browser Toolbox
user_pref("devtools.chrome.enabled", false);
user_pref("devtools.debugger.remote-enabled", false);

// ===== Containers, needed by container-windows.uc.js =====
user_pref("privacy.userContext.enabled", true);
user_pref("privacy.userContext.ui.enabled", true);

// ===== URL bar: own history, bookmarks, tabs, top sites, quick actions only =====
user_pref("browser.urlbar.suggest.searches", false);
user_pref("browser.urlbar.suggest.trending", false);
user_pref("browser.urlbar.suggest.recentsearches", false);
user_pref("browser.urlbar.recentsearches.featureGate", false);
user_pref("browser.urlbar.suggest.engines", false);
user_pref("browser.urlbar.suggest.weather", false);
user_pref("browser.urlbar.suggest.yelp", false);
user_pref("browser.urlbar.suggest.topsites", true);
user_pref("browser.urlbar.suggest.quickactions", true);

// ===== New tab and home =====
user_pref("browser.newtabpage.enabled", false);
user_pref("browser.startup.homepage", "https://html.duckduckgo.com/html/");

// ===== Misc =====
user_pref("browser.ipProtection.enabled", false);
user_pref("browser.startup.page", 3);
user_pref("browser.sessionstore.interval", 15000);
// Remember up to 10 closed windows, so container windows can be reopened
user_pref("browser.sessionstore.max_windows_undo", 10);

// ===== Dark mode everywhere =====
// Tell Firefox the system is dark, so the default theme goes dark
user_pref("ui.systemUsesDarkTheme", 1);
// Websites that support dark mode get dark mode
user_pref("layout.css.prefers-color-scheme.content-override", 0);

// ===== Betterfox tradeoffs: uncomment to undo =====
// Keep cache on disk, faster after restarts, less private
// user_pref("browser.cache.disk.enable", true);
// Standard tracking protection instead of strict, fewer broken sites
// user_pref("browser.contentblocking.category", "standard");


