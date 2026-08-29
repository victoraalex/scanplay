"use strict";

const MODES = {
  COLOR: "color",
  NUMBER: "number",
};

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

const NUMBER_LIMITS = {
  min: 0,
  max: 99,
};

const state = {
  mode: MODES.COLOR,
  selectedColorIds: COLORS.map((color) => color.id),
  numberFrom: "1",
  numberTo: "10",
  intervalSec: 3,
  totalDurationSec: 60,
  isTraining: false,
  session: null,
  currentStimulus: null,
  changeTimerId: null,
  endTimerId: null,
};

let elements = null;

function chooseNextValue(values, previousValue, random = Math.random) {
  if (!Array.isArray(values) || values.length === 0) {
    return null;
  }

  const candidates =
    values.length > 1
      ? values.filter((value) => value !== previousValue)
      : values.slice();

  const safeCandidates = candidates.length > 0 ? candidates : values;
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

function parseIntegerInput(value) {
  const trimmedValue = String(value).trim();

  if (!/^-?\d+$/.test(trimmedValue)) {
    return null;
  }

  const parsedValue = Number(trimmedValue);

  return Number.isInteger(parsedValue) ? parsedValue : null;
}

function getNumberRange() {
  const from = parseIntegerInput(state.numberFrom);
  const to = parseIntegerInput(state.numberTo);

  if (from === null || to === null) {
    return { isValid: false, values: [], message: "Usa numeros enteros." };
  }

  if (
    from < NUMBER_LIMITS.min ||
    from > NUMBER_LIMITS.max ||
    to < NUMBER_LIMITS.min ||
    to > NUMBER_LIMITS.max
  ) {
    return { isValid: false, values: [], message: "El rango debe estar entre 0 y 99." };
  }

  if (from >= to) {
    return { isValid: false, values: [], message: "Desde debe ser menor que Hasta." };
  }

  const values = [];

  for (let value = from; value <= to; value += 1) {
    values.push(value);
  }

  return { isValid: values.length >= 2, values, message: "" };
}

function getMenuValidation() {
  if (state.mode === MODES.COLOR) {
    const colorIds = getSelectedColorIds();

    return {
      isValid: colorIds.length >= 2,
      message: colorIds.length >= 2 ? "" : "Selecciona al menos 2 colores.",
    };
  }

  const range = getNumberRange();

  return {
    isValid: range.isValid,
    message: range.message,
  };
}

function getSessionConfig() {
  if (state.mode === MODES.COLOR) {
    return {
      mode: MODES.COLOR,
      values: getSelectedColorIds(),
      intervalMs: state.intervalSec * 1000,
      totalDurationMs: state.totalDurationSec * 1000,
    };
  }

  return {
    mode: MODES.NUMBER,
    values: getNumberRange().values,
    intervalMs: state.intervalSec * 1000,
    totalDurationMs: state.totalDurationSec * 1000,
  };
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

function setMode(mode) {
  if (state.isTraining || state.mode === mode) {
    return;
  }

  state.mode = mode;
  updateMenu();
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

function updateModeControls() {
  elements.modeOptions.querySelectorAll(".mode-button").forEach((button) => {
    const isSelected = button.dataset.mode === state.mode;

    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  const isColorMode = state.mode === MODES.COLOR;

  elements.colorSection.hidden = !isColorMode;
  elements.numberSection.hidden = isColorMode;
}

function updateColorControls() {
  const selectedColorIds = getSelectedColorIds();

  elements.colorCount.textContent = `${selectedColorIds.length}/6`;

  elements.colorOptions.querySelectorAll(".color-card").forEach((button) => {
    const isSelected = state.selectedColorIds.includes(button.dataset.colorId);

    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    button.setAttribute(
      "aria-label",
      `${button.textContent}, ${isSelected ? "activo" : "inactivo"}`
    );
  });
}

function updateOptionControls() {
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

function updateMenu() {
  const validation = getMenuValidation();

  updateModeControls();
  updateColorControls();
  updateOptionControls();

  elements.numberFrom.value = state.numberFrom;
  elements.numberTo.value = state.numberTo;
  elements.validationMessage.textContent = validation.message;
  elements.playButton.disabled = !validation.isValid;
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
  elements.numberStimulus.hidden = true;
  elements.numberStimulus.textContent = "";
  document.body.classList.remove("training-active");
}

function generateNextStimulus() {
  if (!state.session) {
    return null;
  }

  return chooseNextValue(state.session.values, state.currentStimulus);
}

function renderColorStimulus(colorId) {
  const color = getColor(colorId);

  if (!color) {
    return;
  }

  elements.numberStimulus.hidden = true;
  elements.numberStimulus.textContent = "";
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

function renderNumberStimulus(number) {
  elements.trainingView.style.setProperty("--training-color", "#050505");
  elements.trainingView.style.backgroundColor = "#050505";
  elements.trainingView.style.setProperty("--training-control-bg", "rgba(255, 255, 255, 0.12)");
  elements.trainingView.style.setProperty("--training-control-fg", "#ffffff");
  elements.numberStimulus.textContent = String(number);
  elements.numberStimulus.hidden = false;
}

function renderStimulus(stimulus) {
  if (!state.session) {
    return;
  }

  if (state.session.mode === MODES.COLOR) {
    renderColorStimulus(stimulus);
    return;
  }

  renderNumberStimulus(stimulus);
}

function showNextStimulus() {
  if (!state.isTraining) {
    return;
  }

  const stimulus = generateNextStimulus();

  state.currentStimulus = stimulus;
  renderStimulus(stimulus);
  scheduleNextStimulusChange();
}

function scheduleNextStimulusChange() {
  if (!state.isTraining || !state.session) {
    return;
  }

  const remainingMs = state.session.endsAt - performance.now();

  if (remainingMs <= state.session.intervalMs + 50) {
    return;
  }

  state.changeTimerId = window.setTimeout(() => {
    state.changeTimerId = null;

    if (!state.isTraining) {
      return;
    }

    showNextStimulus();
  }, state.session.intervalMs);
}

function startTraining() {
  const validation = getMenuValidation();

  if (!validation.isValid) {
    updateMenu();
    return;
  }

  const sessionConfig = getSessionConfig();

  clearSessionTimers();

  state.isTraining = true;
  state.currentStimulus = null;
  state.session = {
    ...sessionConfig,
    endsAt: performance.now() + sessionConfig.totalDurationMs,
  };

  showTrainingView();
  showNextStimulus();

  state.endTimerId = window.setTimeout(() => {
    if (!state.isTraining) {
      return;
    }

    stopTraining();
  }, sessionConfig.totalDurationMs);
}

function stopTraining() {
  clearSessionTimers();

  state.isTraining = false;
  state.session = null;
  state.currentStimulus = null;

  showMenuView();
}

function init() {
  elements = {
    menuView: document.getElementById("menuView"),
    trainingView: document.getElementById("trainingView"),
    modeOptions: document.getElementById("modeOptions"),
    colorSection: document.getElementById("colorSection"),
    numberSection: document.getElementById("numberSection"),
    colorOptions: document.getElementById("colorOptions"),
    intervalOptions: document.getElementById("intervalOptions"),
    durationOptions: document.getElementById("durationOptions"),
    colorCount: document.getElementById("colorCount"),
    numberFrom: document.getElementById("numberFrom"),
    numberTo: document.getElementById("numberTo"),
    validationMessage: document.getElementById("validationMessage"),
    playButton: document.getElementById("playButton"),
    backButton: document.getElementById("backButton"),
    numberStimulus: document.getElementById("numberStimulus"),
  };

  renderColorOptions();
  renderOptionButtons();

  elements.modeOptions.querySelectorAll(".mode-button").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });

  elements.numberFrom.addEventListener("input", (event) => {
    state.numberFrom = event.target.value;
    updateMenu();
  });

  elements.numberTo.addEventListener("input", (event) => {
    state.numberTo = event.target.value;
    updateMenu();
  });

  elements.playButton.addEventListener("click", startTraining);
  elements.backButton.addEventListener("click", stopTraining);

  updateMenu();
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", init);
}
