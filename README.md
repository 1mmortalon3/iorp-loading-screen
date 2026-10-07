# Imperial Order Roleplay — redesigned loading screen

A clean Imperial interface built around the animated Vader background.

## Design

- A compact logo and server brand header with an elapsed-time display.
- A bold welcome title and rotating Imperial roleplay tips.
- Matching loading and music panels along the bottom, with consistent spacing,
  readable typography, red accents, and proper play/pause/track icons.
- Real server status, reported content-file counts, map, gamemode, and slots.
- A waiting indicator until the game reports download counts. Download
  percentages represent the reported content files, not an estimated total
  connection time.
- Layout adjustments for smaller windows and short landscape screens.
- A still image fallback while the animated video starts or if video cannot play.
- No external fonts, scripts, or services are required.

## Audio fixes retained

All four supplied songs are in the playlist. A random song starts each
connection; the playlist then cycles through all four while the page is open.

Loading music starts at 10%. Garry's Mod's `snd_musicvolume` scales that level
instead of replacing it. A game music setting of 50% gives an initial playback
volume of 5%; zero keeps it muted. The music level is set before playback.

The slider shows the loading-screen music level, and changing it preserves
pause. Missing or unsupported tracks are skipped; playback stops if all four
fail. In a regular browser, an autoplay restriction may require pressing Play.

To change the default, edit `var musicVolume = 0.10;` in `index.html`.
The range is 0 to 1; the slider synchronizes during initialization.

## Install

1. Extract the ZIP.
2. Upload the contents of `iorp-loading-screen-main` into your existing
   loading-screen web folder. Replace the existing files.
3. Include the new `screen.css` and `loading-poster.jpg` files. Keep them beside
   `index.html`, the four `.ogg` files, `dark-lords-army.webm`, and `iorp-crest.png`.
4. Keep your existing `sv_loadingurl`. If the old page is cached, use a new query
   such as `?v=design2` (or `&v=design2` when the URL already has a query).

`design-preview.png` is an optional static illustration with example server
and download values. It is not an in-game capture and is not used by the page.

## Verification

The loading callbacks were checked for early callback ordering, preserving
server metadata and status, real counts, clamped percentages, and unknown
progress display. Audio controls, four-track rotation, volume continuity,
early game mute, rotating tips, timer cleanup, and all local asset references
were checked. The original audio, video, and crest files are unchanged.

Static layout illustrations were reviewed at 1920x1080, 1366x768, 1024x768,
800x600, 390x844, and 640x360. Live browser rendering and in-game playback could
not be verified in this environment.
