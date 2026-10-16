// ===== Our setup =====
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("extensions.activeThemeID", "firefox-compact-dark@mozilla.org");
user_pref("sidebar.revamp", true);
user_pref("browser.ctrlTab.sortByRecentlyUsed", true);
// Flip these to true only when using the Browser Toolbox
user_pref("devtools.chrome.enabled", false);
user_pref("devtools.debugger.remote-enabled", false);

// ===== URL bar: no trending, sponsored, or search engine suggestions =====
user_pref("browser.search.suggest.enabled", true);
user_pref("browser.urlbar.suggest.searches", true);
user_pref("browser.urlbar.suggest.trending", true);
user_pref("browser.urlbar.trending.featureGate", true);
user_pref("browser.urlbar.suggest.recentsearches", true);
user_pref("browser.urlbar.suggest.topsites", true);
user_pref("browser.urlbar.suggest.engines", true);
user_pref("browser.urlbar.quicksuggest.enabled", true);
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", true);
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", true);
user_pref("browser.urlbar.suggest.weather", true);
user_pref("browser.urlbar.suggest.yelp", true);
user_pref("browser.urlbar.suggest.quickactions", true);

// ===== New tab and home: blank =====
user_pref("browser.newtabpage.enabled", false);
user_pref("browser.startup.homepage", "https://duckduckgo.com/?kae=d");
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
user_pref("browser.newtabpage.activity-stream.feeds.topsites", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);

// ===== Telemetry and studies off =====
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("datareporting.usage.uploadEnabled", false);
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("app.shield.optoutstudies.enabled", false);
user_pref("app.normandy.enabled", false);
user_pref("browser.discovery.enabled", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);

// ===== AI features off =====
user_pref("browser.ml.enable", false);
user_pref("browser.ml.chat.enabled", false);
user_pref("browser.ml.linkPreview.enabled", false);
user_pref("browser.tabs.groups.smart.enabled", false);

// ===== Nags and recommendations off =====
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);
user_pref("browser.ipProtection.enabled", false);

// ===== Privacy =====
user_pref("browser.contentblocking.category", "strict");
user_pref("dom.security.https_only_mode", true);
user_pref("privacy.globalprivacycontrol.enabled", true);
