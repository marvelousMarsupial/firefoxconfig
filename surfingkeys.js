// jj to escape insert mode, omnibar, and the vim editor
// Keep only these default keys. Press ? to see them.
api.unmapAllExcept([
  // Surfingkeys itself
  '<Esc>', '<Alt-s>', '<Alt-i>', 'p', '?', '.', ':', ';e',
  // Links and clicking
  'f', 'af', 'C', 'q', 'gf', 'L', 'O',
  // Text boxes
  'i', 'I', 'gi',
  // Scrolling
  'j', 'k', 'h', 'l', 'e', 'd', 'u', 'U', 'P', 'gg', 'G', '0', '$', ';w',
  // Tabs
  'T', 'E', 'R', 'x', 'X', 'W', '<<', '>>', 'zi', 'zo', 'zr',
  'gt', 'gT', 'gp', 'B', 'F',
  // Page navigation
  'S', 'D', 'r', 'gu', 'gU', 'gs',
  // Search selected text
  'sd', 'se', 'ss', 'sh', 'sy',
  // Clipboard
  'yy', 'yh', 'yl', 'yY', 'ys', 'yv', 'ymv', 'yq', 'yi', 'yc', 'ymc',
  'ya', 'yma', 'yg', 'yG', 'yS', 'yf', 'yp', ';pf', 'cc', ';cq',
  'yj', ';pp', 'yd', 'yQ',
  // Omnibar
  't', 'go', 'b', 'ab', 'oh', 'ox', 'H', 'oi', 'od', 'oe', 'os', 'oy',
  // Marks
  'm', "'", '<Ctrl-\'>', 'om',
  // Visual mode and find
  'v', 'V', 'zv', '/', 'n', 'N', '*',
  // Misc
  ';pm', ';db', ';dh', ';ph', ';yh'
]);
api.imap('jj', '<Esc>');
api.cmap('jj', '<Esc>');
api.aceVimMap('jj', '<Esc>');

// T always uses the centered omnibar tab list
settings.tabsThreshold = 0;

settings.theme = `
.sk_theme {
    font-family: JetBrains Mono, monospace;
    font-size: 10pt;
    background: #2a2725;
    color: #e6dfd8;
}
.sk_theme tbody { color: #e6dfd8; }
.sk_theme input {
    color: #e6dfd8;
    background: #353130;
    border: 1px solid #4b4541;
    border-radius: 8px;
}
.sk_theme .prompt { color: #c8a57a; }
.sk_theme .url,
.sk_theme .annotation { color: #a69a8e; }
.sk_theme .omnibar_highlight { color: #c8a57a; }
.sk_theme .omnibar_timestamp,
.sk_theme .omnibar_visitcount { color: #8a7f75; }

/* Omnibar rows: no stripes, only the selected row highlighted */
.sk_theme #sk_omnibarSearchResult ul li,
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
    background: transparent !important;
    border-radius: 6px;
    margin: 2px 0;
    padding: 4px 8px;
}
.sk_theme #sk_omnibarSearchResult ul li.focused {
    background: #45403b !important;
}

.sk_theme kbd {
    background: #45403b;
    color: #e6dfd8;
    border: none;
    border-radius: 4px;
}
#sk_omnibar {
    background: #2a2725;
    border: 1px solid #4b4541;
    border-radius: 12px;
    padding: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}
#sk_omnibarSearchArea { border-bottom: 1px solid #4b4541; }
#sk_status, #sk_find, #sk_keystroke {
    font-size: 10pt;
    background: #2a2725;
    color: #e6dfd8;
    border: 1px solid #4b4541;
    border-radius: 8px;
}
#sk_banner, #sk_bubble { border-radius: 8px; }
#sk_frame, #sk_usage, #sk_popup { border-radius: 10px; }

/* Bigger vim editor */
#sk_editor {
    border-radius: 10px;
    width: 90% !important;
    height: 80% !important;
    max-height: 80vh !important;
    top: 10% !important;
    left: 5% !important;
}
#sk_editor .ace_editor {
    height: 100% !important;
    min-height: 60vh !important;
}
#sk_editor .ace_content { height: 100% !important; }
`;

api.Hints.style('border: solid 1px #8a6f4e; color: #2a2725; background: #c8a57a; font-family: JetBrains Mono; border-radius: 4px;');
api.Hints.style('border: solid 1px #8a6f4e; padding: 1px; color: #2a2725; background: #c8a57a; font-family: JetBrains Mono; border-radius: 4px;', "text");
