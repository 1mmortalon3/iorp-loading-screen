IMPERIAL ORDER ROLEPLAY — ANIMATED GMOD LOADING SCREEN

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
