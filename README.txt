IMPERIAL ORDER ROLEPLAY — ANIMATED GMOD LOADING SCREEN
(fixed for GMod's old HTML renderer)

FILES
- index.html
- style.css
- loading.js
- assets/imperial_transmission_loading_screen.png

INSTALLATION
1. Upload the entire folder to a public web host.
2. Keep the file names and assets folder exactly as packaged.
3. Add this to server.cfg:

   sv_loadingurl "https://your-domain.example/imperial-loading/index.html"

4. Restart the server or change map.

GMOD HOOKS
- GameDetails
- SetFilesTotal
- SetFilesNeeded
- DownloadingFile
- SetStatusChanged

ANIMATIONS
- Background breathing/zoom
- Red pulse rings around the Imperial crest
- Moving scanline sweep
- Animated progress spark
- Live GMod download progress and status text

-------------------------------------------------------------------------------
WHAT WAS FIXED
-------------------------------------------------------------------------------
On the default (non-x86-64) GMod branch, sv_loadingurl is rendered by
"Awesomium" — a WebKit engine frozen around Chrome 18 (2012). The original
style.css leaned on CSS features from 2016-2020 (CSS variables, Grid, the
inset/aspect-ratio/clamp()/min() shorthands, unprefixed gradients and
animations), none of which that old engine understands. Because several of
those properties are load-bearing for layout (inset:0, display:grid,
aspect-ratio), the whole background/rings/meta-row layout would collapse or
disappear rather than just look slightly off.

style.css has been rewritten so the baseline (the part every engine can read)
uses only techniques that have worked since ~2012: hard-coded colors, explicit
top/right/bottom/left instead of inset, a CSS table instead of Grid for the
three-column rows, fixed pixel sizing with a few @media breakpoints instead of
clamp()/min()/vw, an inset box-shadow instead of a radial-gradient vignette,
and -webkit- prefixed gradients/animations/transforms/transitions alongside
the standard ones. A separate @supports block at the very end of the file adds
back fluid clamp()/vw sizing and true Grid for anyone on a modern engine (the
x86-64 beta branch, or you previewing the file in a normal browser) — the old
engine can't parse @supports at all, so it never sees that block and just
keeps the safe baseline.

loading.js was already written in plain ES5 (var/function, no arrow functions,
template literals, let/const, or fetch), so it needed no changes — that part
was already old-engine safe.

-------------------------------------------------------------------------------
IMPORTANT: HOSTING / HTTPS
-------------------------------------------------------------------------------
This is the #1 real-world reason a loading screen shows as a blank/black page
even when the code itself is correct: Awesomium only speaks TLS 1.0, and most
modern hosts (GitHub Pages, Netlify, Cloudflare, etc.) enforce TLS 1.2+ and
will refuse the connection outright — no error shown in-game, it just never
loads. If your loading screen is blank in-game but opens fine in a normal
browser, this is almost always why.

Workarounds:
- Host it somewhere you can force an older/broader TLS policy, or
- Use a plain "http://" URL instead of "https://" if your host allows it
  (Awesomium doesn't care about the missing padlock), or
- Put players on the x86-64 beta branch (server + client), which uses a
  modern Chromium Embedded Framework and doesn't have this limitation at all.
