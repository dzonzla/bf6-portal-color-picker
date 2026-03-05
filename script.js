const colorInput = document.getElementById("colorInput");
const swatch = document.getElementById("swatch");
const rgbText = document.getElementById("rgbText");
const normalizedText = document.getElementById("normalizedText");
const iconsGrid = document.getElementById("iconsGrid");
const mapSelect = document.getElementById("mapSelect");
const mapStage = document.getElementById("mapStage");
const mapImage = document.getElementById("mapImage");
const overlayCanvas = document.getElementById("overlayCanvas");
const overlayContext = overlayCanvas?.getContext("2d", { willReadFrequently: true });

const iconFiles = [
  "assets/Alert.svg",
  "assets/Assist.svg",
  "assets/Bomb.svg",
  "assets/BombArmed.svg",
  "assets/Cross.svg",
  "assets/DangerPing.svg",
  "assets/Diffuse.svg",
  "assets/EMP.svg",
  "assets/Explosion.svg",
  "assets/Eye.svg",
  "assets/FilledPing.svg",
  "assets/Flag.svg",
  "assets/Hazard.svg",
  "assets/Skull.svg",
  "assets/SquadPing.svg",
  "assets/Triangle.svg",
];

const mapFiles = [
  {
    label: "Blackwell Fields - 1",
    path: "assets/maps/blackwell_fields/2807960_20260305022653_1.png",
  },
  {
    label: "Blackwell Fields - 2",
    path: "assets/maps/blackwell_fields/2807960_20260305022714_1.png",
  },
  {
    label: "Blackwell Fields - 3",
    path: "assets/maps/blackwell_fields/2807960_20260305022744_1.png",
  },
  {
    label: "Contaminated - 1",
    path: "assets/maps/contaminated/2807960_20260305023347_1.png",
  },
  {
    label: "Contaminated - 2",
    path: "assets/maps/contaminated/2807960_20260305023419_1.png",
  },
  {
    label: "Contaminated - 3",
    path: "assets/maps/contaminated/2807960_20260305023539_1.png",
  },
  {
    label: "Eastwood - 1",
    path: "assets/maps/eastwood/2807960_20260305024156_1.png",
  },
  {
    label: "Eastwood - 2",
    path: "assets/maps/eastwood/2807960_20260305024251_1.png",
  },
  {
    label: "Eastwood - 3",
    path: "assets/maps/eastwood/2807960_20260305024318_1.png",
  },
  {
    label: "Empire State - 1",
    path: "assets/maps/empire_state/2807960_20260305022415_1.png",
  },
  {
    label: "Empire State - 2",
    path: "assets/maps/empire_state/2807960_20260305022444_1.png",
  },
  {
    label: "Empire State - 3",
    path: "assets/maps/empire_state/2807960_20260305022508_1.png",
  },
  {
    label: "Iberian Offensive - 1",
    path: "assets/maps/iberian_offensive/2807960_20260305022855_1.png",
  },
  {
    label: "Iberian Offensive - 2",
    path: "assets/maps/iberian_offensive/2807960_20260305022915_1.png",
  },
  {
    label: "Iberian Offensive - 3",
    path: "assets/maps/iberian_offensive/2807960_20260305022940_1.png",
  },
  {
    label: "Liberation Peak - 1",
    path: "assets/maps/liberation_peak/2807960_20260305023051_1.png",
  },
  {
    label: "Liberation Peak - 2",
    path: "assets/maps/liberation_peak/2807960_20260305023119_1.png",
  },
  {
    label: "Liberation Peak - 3",
    path: "assets/maps/liberation_peak/2807960_20260305023146_1.png",
  },
  {
    label: "Manhattan Bridge - 1",
    path: "assets/maps/manhattan_bridge/2807960_20260305023713_1.png",
  },
  {
    label: "Manhattan Bridge - 2",
    path: "assets/maps/manhattan_bridge/2807960_20260305023810_1.png",
  },
  {
    label: "Manhattan Bridge - 3",
    path: "assets/maps/manhattan_bridge/2807960_20260305023923_1.png",
  },
  {
    label: "Mirak Valley - 1",
    path: "assets/maps/mirak_valley/2807960_20260305025108_1.png",
  },
  {
    label: "Mirak Valley - 2",
    path: "assets/maps/mirak_valley/2807960_20260305025131_1.png",
  },
  {
    label: "Mirak Valley - 3",
    path: "assets/maps/mirak_valley/2807960_20260305025157_1.png",
  },
  {
    label: "New Sobek City - 1",
    path: "assets/maps/new_sobek_city/2807960_20260305024807_1.png",
  },
  {
    label: "New Sobek City - 2",
    path: "assets/maps/new_sobek_city/2807960_20260305024830_1.png",
  },
  {
    label: "New Sobek City - 3",
    path: "assets/maps/new_sobek_city/2807960_20260305024914_1.png",
  },
  {
    label: "Operation Firestorm - 1",
    path: "assets/maps/operation_firestorm/2807960_20260305024446_1.png",
  },
  {
    label: "Operation Firestorm - 2",
    path: "assets/maps/operation_firestorm/2807960_20260305024458_1.png",
  },
  {
    label: "Operation Firestorm - 3",
    path: "assets/maps/operation_firestorm/2807960_20260305024554_1.png",
  },
  {
    label: "Siege of Cairo - 1",
    path: "assets/maps/siege_of_cairo/2807960_20260305022207_1.png",
  },
  {
    label: "Siege of Cairo - 2",
    path: "assets/maps/siege_of_cairo/2807960_20260305022228_1.png",
  },
  {
    label: "Siege of Cairo - 3",
    path: "assets/maps/siege_of_cairo/2807960_20260305022259_1.png",
  },
];

const mapCanvas = document.createElement("canvas");
const mapContext = mapCanvas.getContext("2d", { willReadFrequently: true });

let currentRgb = { r: 79, g: 70, b: 229 };
let currentAlpha = 0.4941;
let selectedIcon = iconFiles[0];
let isDragging = false;
const overlayStrength = 2;
const overlaySize = 48;
const iconCanvas = document.createElement("canvas");
const iconContext = iconCanvas.getContext("2d", { willReadFrequently: true });
let iconImage = null;
let iconReady = false;

const hexToRgb = (hex) => {
  const cleaned = hex.replace("#", "");
  const bigint = parseInt(cleaned, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

const update = () => {
  const { r, g, b } = hexToRgb(colorInput.value);
  currentRgb = { r, g, b };
  rgbText.textContent = `${r}, ${g}, ${b}`;
  const rn = (r / 255).toFixed(4);
  const gn = (g / 255).toFixed(4);
  const bn = (b / 255).toFixed(4);
  normalizedText.textContent = `${rn}, ${gn}, ${bn}`;
  currentAlpha = (r + g + b) / 3 / 255;
  const alpha = currentAlpha.toFixed(4);
  swatch.style.background = colorInput.value;
  if (iconsGrid) {
    iconsGrid.style.setProperty(
      "--icon-color",
      `rgb(${r}, ${g}, ${b})`
    );
  }
  updateOverlayColor();
};

const setOverlayIcon = (file) => {
  selectedIcon = file;
  iconImage = new Image();
  iconReady = false;
  iconImage.onload = () => {
    iconReady = true;
    updateOverlayColor();
  };
  iconImage.src = file;
};

const setOverlayPosition = (x, y) => {
  if (!overlayCanvas) {
    return;
  }
  overlayCanvas.dataset.x = `${x}`;
  overlayCanvas.dataset.y = `${y}`;
};

const getOverlayPosition = () => {
  const x = Number.parseFloat(overlayCanvas?.dataset.x || "0");
  const y = Number.parseFloat(overlayCanvas?.dataset.y || "0");
  return { x, y };
};

const updateOverlayColor = () => {
  if (!mapContext || !mapImage || !overlayContext || !mapImage.complete || !iconReady) {
    return;
  }
  const rect = mapImage.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    return;
  }

  const { x, y } = getOverlayPosition();

  overlayCanvas.width = Math.round(rect.width);
  overlayCanvas.height = Math.round(rect.height);
  overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

  iconCanvas.width = overlaySize;
  iconCanvas.height = overlaySize;
  if (iconContext) {
    iconContext.clearRect(0, 0, overlaySize, overlaySize);
    iconContext.drawImage(iconImage, 0, 0, overlaySize, overlaySize);
  }

  const left = x - overlaySize / 2;
  const top = y - overlaySize / 2;
  const scaleX = mapImage.naturalWidth / rect.width;
  const scaleY = mapImage.naturalHeight / rect.height;
  const bgLeft = Math.max(0, Math.floor(left * scaleX));
  const bgTop = Math.max(0, Math.floor(top * scaleY));
  const bgRight = Math.min(
    mapImage.naturalWidth,
    Math.ceil((left + overlaySize) * scaleX)
  );
  const bgBottom = Math.min(
    mapImage.naturalHeight,
    Math.ceil((top + overlaySize) * scaleY)
  );
  const bgWidth = Math.max(1, bgRight - bgLeft);
  const bgHeight = Math.max(1, bgBottom - bgTop);
  const bgData = mapContext.getImageData(bgLeft, bgTop, bgWidth, bgHeight).data;

  const iconData = iconContext?.getImageData(0, 0, overlaySize, overlaySize).data;
  if (!iconData) {
    return;
  }

  const output = overlayContext.createImageData(overlaySize, overlaySize);
  for (let iy = 0; iy < overlaySize; iy += 1) {
    for (let ix = 0; ix < overlaySize; ix += 1) {
      const screenX = left + ix;
      const screenY = top + iy;
      if (screenX < 0 || screenY < 0 || screenX >= rect.width || screenY >= rect.height) {
        continue;
      }

      const maskIndex = (iy * overlaySize + ix) * 4;
      const maskAlpha = iconData[maskIndex + 3] / 255;
      if (maskAlpha <= 0) {
        continue;
      }

      const bgX = Math.min(
        bgWidth - 1,
        Math.max(0, Math.round(screenX * scaleX) - bgLeft)
      );
      const bgY = Math.min(
        bgHeight - 1,
        Math.max(0, Math.round(screenY * scaleY) - bgTop)
      );
      const bgIndex = (bgY * bgWidth + bgX) * 4;
      const bgR = bgData[bgIndex];
      const bgG = bgData[bgIndex + 1];
      const bgB = bgData[bgIndex + 2];

      const addR = Math.min(255, bgR + currentRgb.r * currentAlpha * overlayStrength);
      const addG = Math.min(255, bgG + currentRgb.g * currentAlpha * overlayStrength);
      const addB = Math.min(255, bgB + currentRgb.b * currentAlpha * overlayStrength);
      const alpha = Math.max(0, Math.min(1, currentAlpha * overlayStrength * maskAlpha));

      const outR = alpha > 0 ? (addR - bgR * (1 - alpha)) / alpha : 0;
      const outG = alpha > 0 ? (addG - bgG * (1 - alpha)) / alpha : 0;
      const outB = alpha > 0 ? (addB - bgB * (1 - alpha)) / alpha : 0;

      output.data[maskIndex] = Math.max(0, Math.min(255, Math.round(outR)));
      output.data[maskIndex + 1] = Math.max(0, Math.min(255, Math.round(outG)));
      output.data[maskIndex + 2] = Math.max(0, Math.min(255, Math.round(outB)));
      output.data[maskIndex + 3] = Math.round(alpha * 255);
    }
  }

  overlayContext.putImageData(output, Math.round(left), Math.round(top));

  const label = "ABC";
  const fontSize = 16;
  const textX = x;
  const textY = Math.max(fontSize, top - 18);

  overlayContext.save();
  overlayContext.font = `700 ${fontSize}px "Segoe UI", system-ui, sans-serif`;
  overlayContext.textAlign = "center";
  overlayContext.textBaseline = "middle";
  overlayContext.shadowColor = `rgba(${currentRgb.r}, ${currentRgb.g}, ${currentRgb.b}, 0.9)`;
  overlayContext.shadowBlur = 22;
  overlayContext.fillStyle = `rgb(${currentRgb.r}, ${currentRgb.g}, ${currentRgb.b})`;
  overlayContext.fillText(label, textX, textY);
  overlayContext.shadowBlur = 40;
  overlayContext.fillText(label, textX, textY);
  overlayContext.restore();
};

const loadMap = (path) => {
  if (!mapImage) {
    return;
  }
  mapImage.src = path;
};

const loadIcons = () => {
  if (!iconsGrid) {
    return;
  }

  iconFiles.forEach((file) => {
    const wrapper = document.createElement("div");
    wrapper.className = "icon";

    const glyph = document.createElement("div");
    glyph.className = "icon-glyph";
    glyph.style.setProperty("--icon-url", `url('${file}')`);

    const label = document.createElement("span");
    const fileName = file.split("/").pop() || "";
    label.textContent = fileName.replace(/\.svg$/i, "");
    label.className = "icon-label";

    wrapper.appendChild(glyph);
    wrapper.appendChild(label);
    iconsGrid.appendChild(wrapper);

    wrapper.addEventListener("click", () => {
      document.querySelectorAll(".icon").forEach((item) => item.classList.remove("is-selected"));
      wrapper.classList.add("is-selected");
      setOverlayIcon(file);
      updateOverlayColor();
    });
  });

  const firstIcon = iconsGrid.querySelector(".icon");
  if (firstIcon) {
    firstIcon.classList.add("is-selected");
    setOverlayIcon(iconFiles[0]);
  }
};

const setupMaps = () => {
  if (!mapSelect) {
    return;
  }

  mapFiles.forEach((map) => {
    const option = document.createElement("option");
    option.value = map.path;
    option.textContent = map.label;
    mapSelect.appendChild(option);
  });

  mapSelect.addEventListener("change", (event) => {
    loadMap(event.target.value);
  });

  if (mapFiles[0]) {
    mapSelect.value = mapFiles[0].path;
    loadMap(mapFiles[0].path);
  }
};

const handlePointerMove = (event) => {
  if (!isDragging || !mapStage) {
    return;
  }
  const rect = mapStage.getBoundingClientRect();
  const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
  const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
  setOverlayPosition(x, y);
  updateOverlayColor();
};

const setupDragging = () => {
  if (!mapStage) {
    return;
  }

  mapStage.addEventListener("pointermove", handlePointerMove);
  mapStage.addEventListener("pointerdown", (event) => {
    const rect = mapStage.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
    setOverlayPosition(x, y);
    updateOverlayColor();
    isDragging = true;
  });

  mapStage.addEventListener("pointerup", () => {
    isDragging = false;
  });

  mapStage.addEventListener("pointerleave", () => {
    isDragging = false;
  });
};

if (mapImage) {
  mapImage.addEventListener("load", () => {
    if (!mapContext) {
      return;
    }
    mapCanvas.width = mapImage.naturalWidth;
    mapCanvas.height = mapImage.naturalHeight;
    mapContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
    mapContext.drawImage(mapImage, 0, 0);

    if (overlayCanvas && (!overlayCanvas.dataset.x || !overlayCanvas.dataset.y)) {
      const rect = mapStage?.getBoundingClientRect();
      if (rect) {
        setOverlayPosition(rect.width / 2, rect.height / 2);
      }
    }
    updateOverlayColor();
  });
}

colorInput.addEventListener("input", update);
update();
loadIcons();
setupMaps();
setupDragging();
