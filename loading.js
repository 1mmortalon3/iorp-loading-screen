(function () {
  "use strict";

  function get(id) { return document.getElementById(id); }

  var ui = {
    status: get("statusText"),
    download: get("downloadText"),
    fill: get("progressFill"),
    percent: get("percentText"),
    server: get("serverText"),
    gameMode: get("gameModeText"),
    map: null,
    metaRight: get("metaRight")
  };

  var state = {
    totalFiles: 0,
    filesNeeded: 0,
    connected: false,
    startedAt: Date.now ? Date.now() : new Date().getTime(),
    demoTimer: null,
    maxPlayers: "--",
    mapName: "AWAITING"
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

  function updateMetaRight() {
    var now = Date.now ? Date.now() : new Date().getTime();
    var seconds = Math.floor((now - state.startedAt) / 1000);
    var clock = pad2(Math.floor(seconds / 3600)) + ":" +
      pad2(Math.floor((seconds % 3600) / 60)) + ":" +
      pad2(seconds % 60);
    ui.metaRight.textContent = clock + " GST   SLOTS // -- / " + clean(state.maxPlayers, "--");
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
    state.maxPlayers = clean(maxPlayers, "--");
    state.mapName = clean(mapName, "AWAITING").toUpperCase();
    ui.server.textContent = clean(serverName, "IMPERIAL ORDER ROLEPLAY").toUpperCase();
    ui.gameMode.textContent = "GAMEMODE // " + clean(gameMode, "HELIX").toUpperCase();
    ui.status.textContent = "Secure uplink established with Imperial command.";
    ui.download.textContent = "MAP // " + state.mapName + "   |   Requesting workshop manifest...";
    updateMetaRight();
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

  setInterval(updateMetaRight, 250);
  updateMetaRight();

  setTimeout(function () {
    if (state.connected) return;

    var demo = 0;
    var files = [
      "materials/imperial/ui_terminal.vtf",
      "models/imperial/trooper.mdl",
      "sound/imperial/uplink.wav",
      "maps/rp_stardestroyer_v2_7_inf.bsp"
    ];
    var index = 0;
    state.maxPlayers = "64";

    state.demoTimer = setInterval(function () {
      if (state.connected) return;
      demo = Math.min(96, demo + Math.random() * 2.2 + .4);
      setProgress(demo);
      ui.download.textContent = "TRANSFERRING // " + files[index % files.length];
      index += 1;
      updateMetaRight();
    }, 700);
  }, 1000);
})();
