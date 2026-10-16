Firefox ESR config for Debian: hidden UI, keyboard driven, dark everywhere.

Install:

```
./install.sh
```

Firefox must be closed. The script needs sudo for the files under
/usr/lib/firefox-esr. It:

- validates and installs policies.json (extensions, first-run cleanup)
- clones or updates fx-autoconfig and installs its loader
- finds the default profile from profiles.ini, creating one if needed
- writes user.js from betterfox.js plus overrides.js, in that order
- installs chrome/userChrome.css, chrome/JS/*.uc.js and fx-autoconfig's chrome/utils
- clears the profile's startupCache

Manual tasks after the script runs:

1. Paste surfingkeys.js into Surfingkeys' settings (the script puts it on the clipboard if wl-copy exists)
2. Harper: set the hotkey, turn on Enable on New Sites by Default and Ignore Non-English Text
3. Read Aloud: pick the Piper voice and let it download
4. KeePassXC: turn on browser integration in the app and connect the extension
5. Unhook and SponsorBlock: set your toggles
