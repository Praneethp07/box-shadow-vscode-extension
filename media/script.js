let element = document.getElementById("element");
let code = document.getElementById("code");
let inputs = document.querySelectorAll(".sliders input");
let copyBtn = document.getElementById("copyBtn");

inputs.forEach((inp) => inp.addEventListener("input", generateBoxShadow));

function generateBoxShadow() {
  copyBtn.textContent = "Copy";
  copyBtn.style.backgroundColor = "rgb(115, 255, 35)";
  let h_shadow = document.getElementById("h-shadow").value;
  let v_shadow = document.getElementById("v-shadow").value;
  let blur_radius = document.getElementById("blur-radius").value;
  let spread_radius = document.getElementById("spread-radius").value;
  let shadow_color = document.getElementById("shadow-color").value;
  let shadow_color_opacity = document.getElementById(
    "shadow-color-opacity"
  ).value;
  let inset_shadow = document.getElementById("shadow-inset").checked;

  let boxShadow = inset_shadow
    ? `inset ${h_shadow}px ${v_shadow}px ${blur_radius}px ${spread_radius}px ${hexToRGBA(
        shadow_color,
        shadow_color_opacity
      )}`
    : `${h_shadow}px ${v_shadow}px ${blur_radius}px ${spread_radius}px ${hexToRGBA(
        shadow_color,
        shadow_color_opacity
      )}`;

  element.style.boxShadow = boxShadow;
  code.textContent = `box-shadow: ${boxShadow};`;
}

function hexToRGBA(shadow_color, shadow_color_opacity) {
  let r = parseInt(shadow_color.substr(1, 2), 16);
  let g = parseInt(shadow_color.substr(3, 2), 16);
  let b = parseInt(shadow_color.substr(5, 2), 16);
  return `rgba(${r},${g},${b},${shadow_color_opacity})`;
}

copyBtn.addEventListener("click", copyCode);
function copyCode() {
  code.setAttribute("spellcheck", "false");
  copyBtn.textContent = "Copied";
  copyBtn.style.backgroundColor = "rgb(41,194,20)";
  code.select();
  document.execCommand("copy");
}

window.onload = generateBoxShadow();
