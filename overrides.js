/****************************************************************************
 * MY OVERRIDES                                                             *
****************************************************************************/

// ===== UI setup =====
user_pref("extensions.activeThemeID", "firefox-compact-dark@mozilla.org");
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

// ===== Betterfox tradeoffs: uncomment to undo =====
// Keep cache on disk, faster after restarts, less private
// user_pref("browser.cache.disk.enable", true);
// Save session every 15s instead of 60s, lose less on a crash
// user_pref("browser.sessionstore.interval", 15000);
// Standard tracking protection instead of strict, fewer broken sites
// user_pref("browser.contentblocking.category", "standard");
