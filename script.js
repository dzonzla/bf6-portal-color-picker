const colorInput = document.getElementById("colorInput");
const swatch = document.getElementById("swatch");
const rgbText = document.getElementById("rgbText");
const normalizedText = document.getElementById("normalizedText");
const iconsGrid = document.getElementById("iconsGrid");

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
  rgbText.textContent = `${r}, ${g}, ${b}`;
  const rn = (r / 255).toFixed(4);
  const gn = (g / 255).toFixed(4);
  const bn = (b / 255).toFixed(4);
  normalizedText.textContent = `${rn}, ${gn}, ${bn}`;
  swatch.style.background = colorInput.value;
  if (iconsGrid) {
    iconsGrid.style.setProperty("--icon-color", colorInput.value);
  }
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
  });
};

colorInput.addEventListener("input", update);
update();
loadIcons();
