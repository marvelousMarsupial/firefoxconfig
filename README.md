Firefox ESR config for Debian: hidden UI, keyboard driven, dark everywhere.

It ships as a .deb that drops everything into /usr/lib/firefox-esr, so no
profile files are needed and every profile gets the same setup.

Build and install, with Firefox closed:

```
make install
```

That builds build/firefoxconfig_<version>_all.deb, installs it with dpkg,
and clears the profile startup cache so the scripts load. `make deb` only
builds. `make reload` only clears the cache, needed after any upgrade that
changes a script or the loader.

What goes where:

| repo | installed as |
|---|---|
| betterfox.js + overrides.js | config.js, as autoconfig pref() calls, applied as user prefs on every start like user.js was |
| policies.json | distribution/policies.json |
| chrome/userChrome.css | firefoxconfig/chrome/userChrome.css, registered as a user sheet from config.js |
| chrome/JS/*.uc.js | firefoxconfig/chrome/JS/, loaded by fx-autoconfig |
| vendor/fx-autoconfig | firefoxconfig/chrome/utils/ and defaults/pref/config-prefs.js |
| surfingkeys.js | /usr/share/doc/firefoxconfig/, paste by hand |

fx-autoconfig is vendored. `make update-fxac` pulls the latest from upstream
and records the commit in vendor/fx-autoconfig/COMMIT. Its config.js is not
used; pkg/config.js.tail does the same job but points at the install dir.

Moving from the old profile based setup: remove user.js and chrome/ from the
profile, they would be loaded twice otherwise.

```
rm -rf ~/.config/mozilla/firefox/*/user.js ~/.config/mozilla/firefox/*/chrome
```

Manual tasks after the first start:

1. Paste surfingkeys.js into Surfingkeys' settings
2. Harper: set the hotkey, turn on Enable on New Sites by Default and Ignore Non-English Text
3. Read Aloud: pick the Piper voice and let it download
4. KeePassXC: turn on browser integration in the app and connect the extension
5. Unhook and SponsorBlock: set your toggles
