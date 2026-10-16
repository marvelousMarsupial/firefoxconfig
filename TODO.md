# Todo

- [ ] Apt repo: push a Packages index and the .deb to gh-pages, unsigned first (releases already build on tag)
- [ ] Copy extension-settings.json out of the profile and commit it
- [ ] Test a camera or mic permission prompt with the identity box hidden
- [ ] Check Alt+O (Read Aloud play/stop) and Alt+P (pause) work with the hidden UI
- [ ] Permission prompts anchor to `#trust-icon-container`, which the hidden bar leaves visible when focused; decide whether to hide it too (then prompts need another anchor) or keep it as the anchor
- [ ] Extension popups (uBlock per-site, KeePassXC-Browser, Dark Reader) have no button and no default shortcut; assign shortcuts in about:addons → Manage Extension Shortcuts and note them in the README
- [ ] Hotkeys from container-windows and toggle-tracking-protection are defined once per window; use `attachToWindow` or an `@onlyonce` script so windows stop accumulating duplicate `<key>` elements
- [ ] newtab.uc.js focuses the page on a fixed 300 ms timer after Ctrl+T; use the tab's first `pageshow` and skip when the URL bar already has text
- [ ] Pin `actions/checkout` by commit SHA in release.yml and protect `v*` tags; builds are reproducible now (SOURCE_DATE_EPOCH), so a release can be verified by rebuilding the tag
- [ ] Decide on the Betterfox defaults that trade security for privacy (`security.OCSP.enabled=0`, `expert_bad_cert`, download reputation off) and state the reason in overrides.js or override them
- [ ] `sidebar.revamp=true` while the sidebar is collapsed only changes Ctrl+B/H; drop it or document it
