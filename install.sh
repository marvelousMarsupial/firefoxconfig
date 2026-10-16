#!/usr/bin/env bash
# Install firefoxconfig into Firefox ESR on Debian.
# Run from anywhere; Firefox must be closed.
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALL=/usr/lib/firefox-esr
FXAC="$HOME/src/fx-autoconfig"
FFDIR="$HOME/.config/mozilla/firefox"
CACHEDIR="$HOME/.cache/mozilla/firefox"

# Aliases are not expanded in scripts, but be explicit anyway:
# the interactive shell aliases cp to cp -i, which skips overwrites.
cp()  { command cp "$@"; }
scp_() { sudo command cp "$@"; }

die()  { echo "error: $*" >&2; exit 1; }
info() { echo "==> $*"; }

# 1. Firefox closed, policies valid
if pgrep -x firefox-esr >/dev/null || pgrep -x firefox >/dev/null; then
  die "Firefox is running. Close it first."
fi
jq empty "$REPO/policies.json" || die "policies.json is not valid JSON"
[ -d "$INSTALL" ] || die "$INSTALL not found. Is firefox-esr installed?"

# 2. Policies, before first launch so first-run screens are skipped
info "Installing policies.json"
sudo mkdir -p "$INSTALL/distribution"
scp_ "$REPO/policies.json" "$INSTALL/distribution/policies.json"

# 3. fx-autoconfig loader
if [ -d "$FXAC/.git" ]; then
  info "Updating fx-autoconfig"
  git -C "$FXAC" pull --ff-only
else
  info "Cloning fx-autoconfig"
  mkdir -p "$(dirname "$FXAC")"
  git clone https://github.com/MrOtherGuy/fx-autoconfig "$FXAC"
fi
scp_ "$FXAC/program/config.js" "$INSTALL/config.js"
sudo mkdir -p "$INSTALL/defaults/pref"
scp_ "$FXAC/program/defaults/pref/config-prefs.js" "$INSTALL/defaults/pref/config-prefs.js"

# 4. Find the default profile, creating one if needed
find_profile() {
  [ -f "$FFDIR/profiles.ini" ] || return 1
  awk -F= '/^\[Install/{f=1;next} /^\[/{f=0} f && $1=="Default"{print $2; exit}' \
    "$FFDIR/profiles.ini"
}

PROFILE_REL="$(find_profile || true)"
if [ -z "$PROFILE_REL" ]; then
  info "No profile yet, launching Firefox once to create it"
  timeout 20 firefox-esr --headless >/dev/null 2>&1 || true
  PROFILE_REL="$(find_profile || true)"
  [ -n "$PROFILE_REL" ] || die "Could not find a default profile in $FFDIR/profiles.ini"
fi
PROFILE="$FFDIR/$PROFILE_REL"
CACHE="$CACHEDIR/$(basename "$PROFILE_REL")"
[ -d "$PROFILE" ] || die "Profile dir $PROFILE does not exist"
info "Profile: $PROFILE"

# 5. Profile files
info "Writing user.js (betterfox + overrides)"
cat "$REPO/betterfox.js" "$REPO/overrides.js" > "$PROFILE/user.js"

info "Installing chrome/"
mkdir -p "$PROFILE/chrome/JS" "$PROFILE/chrome/utils"
cp "$REPO/chrome/userChrome.css" "$PROFILE/chrome/userChrome.css"
cp "$REPO"/chrome/JS/*.uc.js "$PROFILE/chrome/JS/"
cp -r "$FXAC/profile/chrome/utils/." "$PROFILE/chrome/utils/"

if [ -f "$REPO/extension-settings.json" ]; then
  info "Installing extension-settings.json"
  cp "$REPO/extension-settings.json" "$PROFILE/extension-settings.json"
else
  echo "note: no extension-settings.json in repo, extension shortcuts not restored"
fi

# 6. Clear startup cache so the scripts reload
if [ -n "$CACHE" ] && [ -d "$CACHE/startupCache" ]; then
  info "Clearing $CACHE/startupCache"
  rm -rf "$CACHE/startupCache"
fi

# 7. Manual steps
if command -v wl-copy >/dev/null; then
  wl-copy < "$REPO/surfingkeys.js"
  SK="surfingkeys.js is on the clipboard, paste it into Surfingkeys settings"
else
  SK="Paste surfingkeys.js into Surfingkeys settings (wl-copy < surfingkeys.js)"
fi

cat <<MSG

Done. Start Firefox, then finish by hand:

1. $SK
2. Harper: set the hotkey, turn on Enable on New Sites by Default and Ignore Non-English Text
3. Read Aloud: pick the Piper voice and let it download
4. KeePassXC: turn on browser integration in the app and connect the extension
5. Unhook and SponsorBlock: set your toggles
MSG
