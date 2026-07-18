(function () {
  "use strict";

  function get(id) { return document.getElementById(id); }

  var ui = {
    status: get("statusText"),
    download: get("downloadText"),
    fill: get("progressFill"),
    percent: get("percentText"),
    server: get("serverName"),
    gameMode: get("gameMode"),
    map: get("mapName"),
    slots: get("slots"),
    elapsed: get("elapsed")
  };

  var state = {
    totalFiles: 0,
    filesNeeded: 0,
    connected: false,
    startedAt: Date.now ? Date.now() : new Date().getTime(),
    demoTimer: null
  };

  function clean(value, fallback) {
    if (value === null || typeof value === "undefined") return fallback || "---";
    var text = String(value).replace(/[<>]/g, "").replace(/^\s+|\s+$/g, "");
    return text || fallback || "---";
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function pad2(value) {
    value = String(value);
    return value.length < 2 ? "0" + value : value;
  }

  function setProgress(value) {
    var percent = clamp(Number(value) || 0, 0, 100);
    var rounded = Math.round(percent);
    ui.fill.style.width = percent + "%";
    ui.percent.textContent = rounded + "%";

    if (rounded >= 100) {
      ui.status.textContent = "Imperial asset transfer complete. Finalizing deployment...";
      ui.download.textContent = "Deployment authorization pending...";
    }
  }

  function connect() {
    if (state.connected) return;
    state.connected = true;
    if (state.demoTimer) clearInterval(state.demoTimer);
  }

  function updateFromCounts() {
    if (state.totalFiles > 0) {
      setProgress(((state.totalFiles - state.filesNeeded) / state.totalFiles) * 100);
    }
  }

  window.GameDetails = function (serverName, serverUrl, mapName, maxPlayers, steamId, gameMode) {
    connect();
    ui.server.textContent = clean(serverName, "IMPERIAL ORDER ROLEPLAY").toUpperCase();
    ui.gameMode.textContent = clean(gameMode, "HELIX").toUpperCase();
    ui.map.textContent = clean(mapName, "AWAITING").toUpperCase();
    ui.slots.textContent = "-- / " + clean(maxPlayers, "--");
    ui.status.textContent = "Secure uplink established with Imperial command.";
    ui.download.textContent = "Requesting workshop manifest...";
  };

  window.SetFilesTotal = function (total) {
    connect();
    state.totalFiles = Math.max(0, Number(total) || 0);
    updateFromCounts();
  };

  window.SetFilesNeeded = function (needed) {
    connect();
    state.filesNeeded = Math.max(0, Number(needed) || 0);
    updateFromCounts();
  };

  window.DownloadingFile = function (fileName) {
    connect();
    ui.download.textContent = "TRANSFERRING // " + clean(fileName, "Imperial asset package");
  };

  window.SetStatusChanged = function (status) {
    connect();
    ui.status.textContent = clean(status, "Synchronizing Imperial systems...");
  };

  function updateClock() {
    var now = Date.now ? Date.now() : new Date().getTime();
    var seconds = Math.floor((now - state.startedAt) / 1000);
    ui.elapsed.textContent = pad2(Math.floor(seconds / 3600)) + ":" +
      pad2(Math.floor((seconds % 3600) / 60)) + ":" +
      pad2(seconds % 60);
  }

  setInterval(updateClock, 250);
  updateClock();

  setTimeout(function () {
    if (state.connected) return;

    var demo = 0;
    var files = [
      "materials/imperial/ui_terminal.vtf",
      "models/imperial/trooper.mdl",
      "sound/imperial/uplink.wav",
      "maps/rp_imperial_research_v2.bsp"
    ];
    var index = 0;

    ui.map.textContent = "RP_IMPERIAL_RESEARCH_V2";
    ui.slots.textContent = "-- / 64";

    state.demoTimer = setInterval(function () {
      if (state.connected) return;
      demo = Math.min(96, demo + Math.random() * 2.2 + .4);
      setProgress(demo);
      ui.download.textContent = "TRANSFERRING // " + files[index % files.length];
      index += 1;
    }, 700);
  }, 1000);
}());
