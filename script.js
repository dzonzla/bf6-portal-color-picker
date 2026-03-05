import { screen } from "https://esm.sh/color-blend@4.0.0";

const colorInput = document.getElementById("colorInput");
const swatch = document.getElementById("swatch");
const rgbText = document.getElementById("rgbText");
const normalizedText = document.getElementById("normalizedText");
const iconsGrid = document.getElementById("iconsGrid");
const mapSelect = document.getElementById("mapSelect");
const mapStage = document.getElementById("mapStage");
const mapImage = document.getElementById("mapImage");
const overlayIcon = document.getElementById("overlayIcon");

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
  if (overlayIcon) {
    overlayIcon.style.setProperty("--icon-url", `url('${file}')`);
  }
};

const setOverlayPosition = (x, y) => {
  if (!overlayIcon) {
    return;
  }
  overlayIcon.style.left = `${x}px`;
  overlayIcon.style.top = `${y}px`;
  overlayIcon.dataset.x = `${x}`;
  overlayIcon.dataset.y = `${y}`;
};

const getOverlayPosition = () => {
  const x = Number.parseFloat(overlayIcon?.dataset.x || "0");
  const y = Number.parseFloat(overlayIcon?.dataset.y || "0");
  return { x, y };
};

const updateOverlayColor = () => {
  if (!mapContext || !mapImage || !overlayIcon || !mapImage.complete) {
    return;
  }
  const rect = mapImage.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    return;
  }

  const { x, y } = getOverlayPosition();
  const imageX = Math.max(
    0,
    Math.min(mapImage.naturalWidth - 1, (x / rect.width) * mapImage.naturalWidth)
  );
  const imageY = Math.max(
    0,
    Math.min(mapImage.naturalHeight - 1, (y / rect.height) * mapImage.naturalHeight)
  );

  const pixel = mapContext.getImageData(Math.round(imageX), Math.round(imageY), 1, 1).data;
  const background = { r: pixel[0], g: pixel[1], b: pixel[2] };
  const { color: finalRgb, alpha: finalAlpha } = approximateOverlayColor(
    background,
    currentRgb,
    currentAlpha
  );
  overlayIcon.style.setProperty(
    "--overlay-color",
    `rgba(${finalRgb.r}, ${finalRgb.g}, ${finalRgb.b}, ${finalAlpha.toFixed(4)})`
  );
};

const approximateOverlayColor = (background, foreground, baseAlpha) => {
  const alpha = Math.max(0, Math.min(1, baseAlpha * overlayStrength));
  const add = (bg, fg) => Math.min(255, Math.round(bg + fg));

  return {
    color: {
      r: add(background.r, foreground.r),
      g: add(background.g, foreground.g),
      b: add(background.b, foreground.b),
    },
    alpha,
  };
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
  if (!overlayIcon || !mapStage) {
    return;
  }

  overlayIcon.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    overlayIcon.setPointerCapture(event.pointerId);
    overlayIcon.classList.add("is-dragging");
    isDragging = true;
  });

  overlayIcon.addEventListener("pointerup", () => {
    overlayIcon.classList.remove("is-dragging");
    isDragging = false;
  });

  overlayIcon.addEventListener("pointercancel", () => {
    overlayIcon.classList.remove("is-dragging");
    isDragging = false;
  });

  mapStage.addEventListener("pointermove", handlePointerMove);
  mapStage.addEventListener("pointerdown", (event) => {
    if (event.target === overlayIcon) {
      return;
    }
    const rect = mapStage.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
    setOverlayPosition(x, y);
    updateOverlayColor();
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

    if (overlayIcon && (!overlayIcon.dataset.x || !overlayIcon.dataset.y)) {
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
