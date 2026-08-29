"use strict";

const COLORS = [
  { id: "red", label: "Rojo", hex: "#e3322a", isLight: false },
  { id: "blue", label: "Azul", hex: "#1f5eff", isLight: false },
  { id: "green", label: "Verde", hex: "#14a85b", isLight: false },
  { id: "yellow", label: "Amarillo", hex: "#f4d43d", isLight: true },
  { id: "white", label: "Blanco", hex: "#f8f7f1", isLight: true },
  { id: "orange", label: "Naranja", hex: "#f27a1f", isLight: false },
];

const INTERVAL_OPTIONS = [1, 2, 3, 4, 5];
const DURATION_OPTIONS = [
  { label: "30s", value: 30 },
  { label: "1min", value: 60 },
  { label: "2min", value: 120 },
  { label: "3min", value: 180 },
  { label: "5min", value: 300 },
];

const state = {
  selectedColorIds: COLORS.map((color) => color.id),
  intervalSec: 3,
  totalDurationSec: 60,
  isTraining: false,
  currentColorId: null,
  sessionColorIds: [],
  sessionEndsAt: 0,
  changeTimerId: null,
  endTimerId: null,
};

let elements = null;

function chooseNextColor(colorIds, previousColorId, random = Math.random) {
  if (!Array.isArray(colorIds) || colorIds.length === 0) {
    return null;
  }

  const candidates =
    colorIds.length > 1
      ? colorIds.filter((colorId) => colorId !== previousColorId)
      : colorIds.slice();

  const safeCandidates = candidates.length > 0 ? candidates : colorIds;
  const index = Math.floor(random() * safeCandidates.length);

  return safeCandidates[Math.min(index, safeCandidates.length - 1)];
}

function getColor(colorId) {
  return COLORS.find((color) => color.id === colorId);
}

function getSelectedColorIds() {
  return COLORS.map((color) => color.id).filter((colorId) =>
    state.selectedColorIds.includes(colorId)
  );
}

function createButton(className, text, onClick) {
  const button = document.createElement("button");
  button.className = className;
  button.type = "button";
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

function renderColorOptions() {
  elements.colorOptions.innerHTML = "";

  COLORS.forEach((color) => {
    const button = createButton("color-card", "", () => toggleColor(color.id));
    const name = document.createElement("span");

    name.className = "color-name";
    name.textContent = color.label;

    button.dataset.colorId = color.id;
    button.dataset.light = String(color.isLight);
    button.style.setProperty("--color", color.hex);
    button.style.setProperty("--color-text", color.isLight ? "#191c16" : "#ffffff");
    button.appendChild(name);

    elements.colorOptions.appendChild(button);
  });
}

function renderOptionButtons() {
  elements.intervalOptions.innerHTML = "";
  elements.durationOptions.innerHTML = "";

  INTERVAL_OPTIONS.forEach((seconds) => {
    const button = createButton("option-button", `${seconds}s`, () => {
      state.intervalSec = seconds;
      updateMenu();
    });

    button.dataset.interval = String(seconds);
    elements.intervalOptions.appendChild(button);
  });

  DURATION_OPTIONS.forEach((option) => {
    const button = createButton("option-button", option.label, () => {
      state.totalDurationSec = option.value;
      updateMenu();
    });

    button.dataset.duration = String(option.value);
    elements.durationOptions.appendChild(button);
  });
}

function toggleColor(colorId) {
  if (state.isTraining) {
    return;
  }

  if (state.selectedColorIds.includes(colorId)) {
    state.selectedColorIds = state.selectedColorIds.filter((id) => id !== colorId);
  } else {
    state.selectedColorIds = [...state.selectedColorIds, colorId];
  }

  updateMenu();
}

function updateMenu() {
  const selectedColorIds = getSelectedColorIds();
  const canPlay = selectedColorIds.length >= 2;

  elements.colorCount.textContent = `${selectedColorIds.length}/6`;
  elements.validationMessage.textContent = canPlay
    ? ""
    : "Selecciona al menos 2 colores.";
  elements.playButton.disabled = !canPlay;

  elements.colorOptions.querySelectorAll(".color-card").forEach((button) => {
    const isSelected = state.selectedColorIds.includes(button.dataset.colorId);

    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    button.setAttribute(
      "aria-label",
      `${button.textContent}, ${isSelected ? "activo" : "inactivo"}`
    );
  });

  elements.intervalOptions.querySelectorAll(".option-button").forEach((button) => {
    const isSelected = Number(button.dataset.interval) === state.intervalSec;

    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  elements.durationOptions.querySelectorAll(".option-button").forEach((button) => {
    const isSelected = Number(button.dataset.duration) === state.totalDurationSec;

    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function clearSessionTimers() {
  if (state.changeTimerId !== null) {
    window.clearTimeout(state.changeTimerId);
    state.changeTimerId = null;
  }

  if (state.endTimerId !== null) {
    window.clearTimeout(state.endTimerId);
    state.endTimerId = null;
  }
}

function showTrainingView() {
  elements.menuView.hidden = true;
  elements.trainingView.hidden = false;
  document.body.classList.add("training-active");
}

function showMenuView() {
  elements.trainingView.hidden = true;
  elements.menuView.hidden = false;
  elements.trainingView.style.backgroundColor = "";
  elements.trainingView.style.removeProperty("--training-color");
  document.body.classList.remove("training-active");
}

function applyTrainingColor(colorId) {
  const color = getColor(colorId);

  if (!color) {
    return;
  }

  elements.trainingView.style.setProperty("--training-color", color.hex);
  elements.trainingView.style.backgroundColor = color.hex;
  elements.trainingView.style.setProperty(
    "--training-control-bg",
    color.isLight ? "rgba(25, 28, 22, 0.16)" : "rgba(0, 0, 0, 0.22)"
  );
  elements.trainingView.style.setProperty(
    "--training-control-fg",
    color.isLight ? "#191c16" : "#ffffff"
  );
}

function showNextColor() {
  if (!state.isTraining) {
    return;
  }

  const nextColorId = chooseNextColor(state.sessionColorIds, state.currentColorId);

  state.currentColorId = nextColorId;
  applyTrainingColor(nextColorId);
  scheduleNextColorChange();
}

function scheduleNextColorChange() {
  if (!state.isTraining) {
    return;
  }

  const intervalMs = state.intervalSec * 1000;
  const remainingMs = state.sessionEndsAt - performance.now();

  if (remainingMs <= intervalMs + 50) {
    return;
  }

  state.changeTimerId = window.setTimeout(() => {
    state.changeTimerId = null;

    if (!state.isTraining) {
      return;
    }

    showNextColor();
  }, intervalMs);
}

function startTraining() {
  const colorIds = getSelectedColorIds();

  if (colorIds.length < 2) {
    updateMenu();
    return;
  }

  clearSessionTimers();

  state.isTraining = true;
  state.currentColorId = null;
  state.sessionColorIds = colorIds.slice();
  state.sessionEndsAt = performance.now() + state.totalDurationSec * 1000;

  showTrainingView();
  showNextColor();

  state.endTimerId = window.setTimeout(() => {
    stopTraining();
  }, state.totalDurationSec * 1000);
}

function stopTraining() {
  clearSessionTimers();

  state.isTraining = false;
  state.currentColorId = null;
  state.sessionColorIds = [];
  state.sessionEndsAt = 0;

  showMenuView();
}

function init() {
  elements = {
    menuView: document.getElementById("menuView"),
    trainingView: document.getElementById("trainingView"),
    colorOptions: document.getElementById("colorOptions"),
    intervalOptions: document.getElementById("intervalOptions"),
    durationOptions: document.getElementById("durationOptions"),
    colorCount: document.getElementById("colorCount"),
    validationMessage: document.getElementById("validationMessage"),
    playButton: document.getElementById("playButton"),
    backButton: document.getElementById("backButton"),
  };

  renderColorOptions();
  renderOptionButtons();

  elements.playButton.addEventListener("click", startTraining);
  elements.backButton.addEventListener("click", stopTraining);

  updateMenu();
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", init);
}
