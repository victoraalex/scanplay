"use strict";

const STIMULUS_TYPES = {
  COLOR: "color",
  NUMBER: "number",
  DIRECTION: "direction",
};

const MODE_IDS = {
  COLORS: "colors",
  NUMBERS: "numbers",
  DIRECTIONS: "directions",
};

const COLORS = [
  { id: "red", label: "Rojo", hex: "#ef2d2d", isLight: false },
  { id: "blue", label: "Azul", hex: "#2463ff", isLight: false },
  { id: "green", label: "Verde", hex: "#00d45a", isLight: false },
  { id: "yellow", label: "Amarillo", hex: "#f5d925", isLight: true },
  { id: "white", label: "Blanco", hex: "#f0efe8", isLight: true },
  { id: "orange", label: "Naranja", hex: "#f57a18", isLight: false },
];

const DIRECTIONS = [
  { id: "up", label: "Arriba", symbol: "↑" },
  { id: "right", label: "Derecha", symbol: "→" },
  { id: "down", label: "Abajo", symbol: "↓" },
  { id: "left", label: "Izquierda", symbol: "←" },
];

const COLOR_IDS = COLORS.map((color) => color.id);
const DIRECTION_IDS = DIRECTIONS.map((direction) => direction.id);
const NUMBER_LIMITS = { min: 0, max: 99 };
const INTERVAL_OPTIONS = [1, 2, 3, 4, 5];
const DURATION_OPTIONS = [
  { label: "30s", value: 30 },
  { label: "1min", value: 60 },
  { label: "2min", value: 120 },
  { label: "3min", value: 180 },
  { label: "5min", value: 300 },
];

const MODES = [
  {
    id: MODE_IDS.COLORS,
    name: "Colores",
    icon: "COL",
    cardDescription: "Identifica el color, reacciona y ejecuta.",
    description: "La pantalla cambia de color. Levanta la cabeza, identifica y vuelve al balón.",
    renderType: STIMULUS_TYPES.COLOR,
    colorIds: COLOR_IDS,
    defaults: {
      selectedColorIds: COLOR_IDS,
      intervalSec: 3,
      totalDurationSec: 60,
    },
  },
  {
    id: MODE_IDS.NUMBERS,
    name: "Números",
    icon: "NUM",
    cardDescription: "Memoriza el número y úsalo como consigna.",
    description: "Cada número puede representar una zona, un pase o una acción técnica.",
    renderType: STIMULUS_TYPES.NUMBER,
    numberLimits: NUMBER_LIMITS,
    defaults: {
      numberFrom: "1",
      numberTo: "10",
      intervalSec: 3,
      totalDurationSec: 60,
    },
  },
  {
    id: MODE_IDS.DIRECTIONS,
    name: "Direcciones",
    icon: "DIR",
    cardDescription: "Reacciona a la dirección mientras trabajas con balón.",
    description: "Responde a la flecha con un control, conducción o pase orientado.",
    renderType: STIMULUS_TYPES.DIRECTION,
    directionIds: DIRECTION_IDS,
    defaults: {
      selectedDirectionIds: DIRECTION_IDS,
      intervalSec: 3,
      totalDurationSec: 60,
    },
  },
];

const state = {
  currentView: "home",
  currentModeId: null,
  modeConfigs: createInitialConfigs(),
  activeSession: null,
  sessionToken: 0,
  sessionTimers: [],
};

let elements = null;

function cloneConfig(config) {
  const copy = {};

  Object.entries(config).forEach(([key, value]) => {
    copy[key] = Array.isArray(value) ? value.slice() : value;
  });

  return copy;
}

function createInitialConfigs() {
  const configs = {};

  MODES.forEach((mode) => {
    configs[mode.id] = cloneConfig(mode.defaults);
  });

  return configs;
}

function getMode(modeId) {
  return MODES.find((mode) => mode.id === modeId);
}

function getCurrentMode() {
  return getMode(state.currentModeId);
}

function getCurrentConfig() {
  return state.modeConfigs[state.currentModeId];
}

function getColor(colorId) {
  return COLORS.find((color) => color.id === colorId);
}

function getDirection(directionId) {
  return DIRECTIONS.find((direction) => direction.id === directionId);
}

function getSelectedColorIds(mode, config) {
  return mode.colorIds.filter((colorId) => config.selectedColorIds.includes(colorId));
}

function getSelectedDirectionIds(mode, config) {
  return mode.directionIds.filter((directionId) =>
    config.selectedDirectionIds.includes(directionId)
  );
}

function getStimulusKey(value) {
  return String(value);
}

function chooseNextValue(values, previousValue, random = Math.random) {
  if (!Array.isArray(values) || values.length === 0) {
    return null;
  }

  const previousKey = previousValue === null ? null : getStimulusKey(previousValue);
  const candidates =
    values.length > 1
      ? values.filter((value) => getStimulusKey(value) !== previousKey)
      : values.slice();
  const safeCandidates = candidates.length > 0 ? candidates : values;
  const index = Math.floor(random() * safeCandidates.length);

  return safeCandidates[Math.min(index, safeCandidates.length - 1)];
}

function parseIntegerInput(value) {
  const trimmedValue = String(value).trim();

  if (!/^-?\d+$/.test(trimmedValue)) {
    return null;
  }

  const parsedValue = Number(trimmedValue);

  return Number.isInteger(parsedValue) ? parsedValue : null;
}

function validateNumberRange(fromValue, toValue, limits) {
  const from = parseIntegerInput(fromValue);
  const to = parseIntegerInput(toValue);

  if (from === null || to === null) {
    return { isValid: false, values: [], message: "Usa números enteros." };
  }

  if (from < limits.min || from > limits.max || to < limits.min || to > limits.max) {
    return {
      isValid: false,
      values: [],
      message: `El rango debe estar entre ${limits.min} y ${limits.max}.`,
    };
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

function isAllowedOption(options, value) {
  return options.some((option) => {
    const optionValue = typeof option === "object" ? option.value : option;

    return optionValue === value;
  });
}

function validateModeConfig(mode, config) {
  if (mode.id === MODE_IDS.COLORS) {
    if (getSelectedColorIds(mode, config).length < 2) {
      return { isValid: false, message: "Selecciona al menos 2 colores." };
    }
  }

  if (mode.id === MODE_IDS.NUMBERS) {
    const range = validateNumberRange(config.numberFrom, config.numberTo, mode.numberLimits);

    if (!range.isValid) {
      return { isValid: false, message: range.message };
    }
  }

  if (mode.id === MODE_IDS.DIRECTIONS) {
    if (getSelectedDirectionIds(mode, config).length < 2) {
      return { isValid: false, message: "Selecciona al menos 2 direcciones." };
    }
  }

  if (!isAllowedOption(INTERVAL_OPTIONS, config.intervalSec)) {
    return { isValid: false, message: "Elige un intervalo válido." };
  }

  if (!isAllowedOption(DURATION_OPTIONS, config.totalDurationSec)) {
    return { isValid: false, message: "Elige un tiempo total válido." };
  }

  return { isValid: true, message: "" };
}

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

function createButton(className, text, onClick) {
  const button = createElement("button", className, text);

  button.type = "button";
  button.addEventListener("click", onClick);

  return button;
}

function renderHome() {
  elements.modeCards.innerHTML = "";

  MODES.forEach((mode) => {
    const card = createButton("mode-card", "", () => openMode(mode.id));
    const icon = createElement("span", "mode-icon", mode.icon);
    const copy = createElement("span", "mode-copy");
    const title = createElement("h3", "", mode.name);
    const description = createElement("p", "", mode.cardDescription);

    copy.append(title, description);
    card.append(icon, copy);
    card.setAttribute("aria-label", `${mode.name}. ${mode.cardDescription}`);

    elements.modeCards.appendChild(card);
  });
}

function renderModeConfig() {
  const mode = getCurrentMode();
  const config = getCurrentConfig();

  if (!mode || !config) {
    showHome();
    return;
  }

  elements.modeTitle.textContent = mode.name;
  elements.modeDescription.textContent = mode.description;
  elements.configControls.innerHTML = "";

  if (mode.id === MODE_IDS.COLORS) {
    renderColorSelector(mode, config);
  }

  if (mode.id === MODE_IDS.NUMBERS) {
    renderNumberRange(mode, config);
  }

  if (mode.id === MODE_IDS.DIRECTIONS) {
    renderDirectionSelector(mode, config);
  }

  renderOptionGroup("Intervalo", INTERVAL_OPTIONS, config.intervalSec, (value) => {
    config.intervalSec = value;
    renderModeConfig();
  });
  renderDurationControl(config);
  updateStartButton();
}

function renderControlGroup(titleText) {
  const group = createElement("div", "control-group");
  const title = createElement("h3", "", titleText);

  group.appendChild(title);
  elements.configControls.appendChild(group);

  return group;
}

function renderColorSelector(mode, config) {
  const group = createElement("div", "control-group");
  const line = createElement("div", "section-line");
  const title = createElement("h3", "", "Colores");
  const selectedColorIds = getSelectedColorIds(mode, config);
  const count = createElement("span", "selection-count", `${selectedColorIds.length}/${mode.colorIds.length}`);
  const grid = createElement("div", "color-grid");

  line.append(title, count);
  group.append(line, grid);

  mode.colorIds.forEach((colorId) => {
    const color = getColor(colorId);
    const isSelected = config.selectedColorIds.includes(colorId);
    const button = createButton("color-card", "", () => {
      config.selectedColorIds = toggleArrayItem(config.selectedColorIds, colorId);
      renderModeConfig();
    });
    const swatch = createElement("span", "color-swatch");
    const name = createElement("span", "color-name", color.label);

    button.dataset.light = String(color.isLight);
    button.style.setProperty("--color", color.hex);
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    button.setAttribute("aria-label", `${color.label}, ${isSelected ? "activo" : "inactivo"}`);
    button.append(swatch, name);
    grid.appendChild(button);
  });

  elements.configControls.appendChild(group);
}

function renderDirectionSelector(mode, config) {
  const group = createElement("div", "control-group");
  const line = createElement("div", "section-line");
  const title = createElement("h3", "", "Direcciones");
  const selectedDirectionIds = getSelectedDirectionIds(mode, config);
  const count = createElement(
    "span",
    "selection-count",
    `${selectedDirectionIds.length}/${mode.directionIds.length}`
  );
  const grid = createElement("div", "direction-grid");

  line.append(title, count);
  group.append(line, grid);

  mode.directionIds.forEach((directionId) => {
    const direction = getDirection(directionId);
    const isSelected = config.selectedDirectionIds.includes(directionId);
    const button = createButton("direction-card", "", () => {
      config.selectedDirectionIds = toggleArrayItem(config.selectedDirectionIds, directionId);
      renderModeConfig();
    });
    const symbol = createElement("span", "direction-symbol", direction.symbol);
    const name = createElement("span", "direction-name", direction.label);

    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    button.setAttribute("aria-label", `${direction.label}, ${isSelected ? "activa" : "inactiva"}`);
    button.append(symbol, name);
    grid.appendChild(button);
  });

  elements.configControls.appendChild(group);
}

function toggleArrayItem(items, item) {
  return items.includes(item) ? items.filter((value) => value !== item) : [...items, item];
}

function renderNumberRange(mode, config) {
  const group = renderControlGroup("Rango");
  const range = createElement("div", "number-range");
  const fromField = createNumberField("Desde", config.numberFrom, mode.numberLimits, (value) => {
    config.numberFrom = value;
    updateStartButton();
  });
  const toField = createNumberField("Hasta", config.numberTo, mode.numberLimits, (value) => {
    config.numberTo = value;
    updateStartButton();
  });

  range.append(fromField, toField);
  group.appendChild(range);
}

function createNumberField(labelText, value, limits, onInput) {
  const label = createElement("label", "number-field");
  const labelSpan = createElement("span", "", labelText);
  const input = createElement("input");

  input.type = "number";
  input.inputMode = "numeric";
  input.min = String(limits.min);
  input.max = String(limits.max);
  input.step = "1";
  input.value = value;
  input.addEventListener("input", (event) => {
    onInput(event.target.value);
  });

  label.append(labelSpan, input);

  return label;
}

function renderOptionGroup(titleText, options, selectedValue, onSelect) {
  const group = renderControlGroup(titleText);
  const grid = createElement("div", "option-grid");

  options.forEach((option) => {
    const value = typeof option === "object" ? option.value : option;
    const label = typeof option === "object" ? option.label : `${option}"`;
    const button = createButton("option-button", label, () => {
      onSelect(value);
    });
    const isSelected = selectedValue === value;

    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    grid.appendChild(button);
  });

  group.appendChild(grid);
}

function renderDurationControl(config) {
  renderOptionGroup("Duración", DURATION_OPTIONS, config.totalDurationSec, (value) => {
    config.totalDurationSec = value;
    renderModeConfig();
  });
}

function updateStartButton() {
  const mode = getCurrentMode();
  const config = getCurrentConfig();
  const validation = mode && config
    ? validateModeConfig(mode, config)
    : { isValid: false, message: "" };

  elements.validationMessage.textContent = validation.message;
  elements.startButton.disabled = !validation.isValid;
}

function buildNumberValues(config, limits) {
  return validateNumberRange(config.numberFrom, config.numberTo, limits).values;
}

function buildSessionConfig(mode, config) {
  let values = [];

  if (mode.id === MODE_IDS.COLORS) {
    values = getSelectedColorIds(mode, config);
  }

  if (mode.id === MODE_IDS.NUMBERS) {
    values = buildNumberValues(config, mode.numberLimits);
  }

  if (mode.id === MODE_IDS.DIRECTIONS) {
    values = getSelectedDirectionIds(mode, config);
  }

  return {
    kind: "timed",
    modeId: mode.id,
    renderType: mode.renderType,
    values,
    intervalMs: config.intervalSec * 1000,
    totalDurationMs: config.totalDurationSec * 1000,
  };
}

function scheduleSessionTimer(callback, delayMs) {
  const token = state.sessionToken;
  const timerId = window.setTimeout(() => {
    state.sessionTimers = state.sessionTimers.filter((id) => id !== timerId);

    if (!state.activeSession || state.sessionToken !== token) {
      return;
    }

    callback();
  }, Math.max(0, delayMs));

  state.sessionTimers.push(timerId);

  return timerId;
}

function clearSessionTimers() {
  state.sessionTimers.forEach((timerId) => {
    window.clearTimeout(timerId);
  });
  state.sessionTimers = [];
}

function showHome() {
  clearSessionTimers();
  state.sessionToken += 1;
  state.activeSession = null;
  state.currentModeId = null;
  state.currentView = "home";
  elements.homeView.hidden = false;
  elements.configView.hidden = true;
  elements.trainingView.hidden = true;
  resetTrainingSurface();
}

function openMode(modeId) {
  clearSessionTimers();
  state.sessionToken += 1;
  state.activeSession = null;
  state.currentModeId = modeId;
  state.currentView = "config";
  elements.homeView.hidden = true;
  elements.configView.hidden = false;
  elements.trainingView.hidden = true;
  resetTrainingSurface();
  renderModeConfig();
}

function showTrainingView() {
  state.currentView = "training";
  elements.homeView.hidden = true;
  elements.configView.hidden = true;
  elements.trainingView.hidden = false;
  document.body.classList.add("training-active");
}

function stopSession(targetView = "config") {
  clearSessionTimers();
  state.sessionToken += 1;
  state.activeSession = null;
  resetTrainingSurface();

  if (targetView === "config" && state.currentModeId) {
    state.currentView = "config";
    elements.homeView.hidden = true;
    elements.configView.hidden = false;
    elements.trainingView.hidden = true;
    renderModeConfig();
    return;
  }

  showHome();
}

function resetTrainingSurface() {
  elements.trainingView.style.backgroundColor = "";
  elements.trainingView.style.removeProperty("--training-color");
  elements.trainingView.style.removeProperty("--training-control-bg");
  elements.trainingView.style.removeProperty("--training-control-fg");
  elements.stimulusRoot.className = "stimulus-root";
  elements.stimulusRoot.textContent = "";
  document.body.classList.remove("training-active");
}

function setTrainingSurface(backgroundColor, isLight = false) {
  elements.trainingView.style.setProperty("--training-color", backgroundColor);
  elements.trainingView.style.backgroundColor = backgroundColor;
  elements.trainingView.style.setProperty(
    "--training-control-bg",
    isLight ? "rgba(15, 19, 17, 0.14)" : "rgba(255, 255, 255, 0.12)"
  );
  elements.trainingView.style.setProperty(
    "--training-control-fg",
    isLight ? "#111411" : "#ffffff"
  );
}

function startSession() {
  const mode = getCurrentMode();
  const config = getCurrentConfig();

  if (!mode || !config) {
    return;
  }

  const validation = validateModeConfig(mode, config);

  if (!validation.isValid) {
    updateStartButton();
    return;
  }

  const sessionConfig = buildSessionConfig(mode, config);

  clearSessionTimers();
  state.sessionToken += 1;
  state.activeSession = {
    ...sessionConfig,
    previousStimulus: null,
    endsAt: performance.now() + sessionConfig.totalDurationMs,
  };

  showTrainingView();
  showNextStimulus();
  scheduleSessionTimer(() => stopSession("config"), sessionConfig.totalDurationMs);
}

function showNextStimulus() {
  const session = state.activeSession;

  if (!session || session.kind !== "timed") {
    return;
  }

  const stimulus = chooseNextValue(session.values, session.previousStimulus);

  session.previousStimulus = stimulus;
  renderStimulus(session.renderType, stimulus);
  scheduleNextStimulus();
}

function scheduleNextStimulus() {
  const session = state.activeSession;

  if (!session || session.kind !== "timed") {
    return;
  }

  const remainingMs = session.endsAt - performance.now();

  if (remainingMs <= session.intervalMs + 50) {
    return;
  }

  scheduleSessionTimer(() => showNextStimulus(), session.intervalMs);
}

function renderStimulus(renderType, stimulus) {
  elements.stimulusRoot.textContent = "";

  if (renderType === STIMULUS_TYPES.COLOR) {
    renderColorStimulus(stimulus);
    return;
  }

  if (renderType === STIMULUS_TYPES.NUMBER) {
    renderNumberStimulus(stimulus);
    return;
  }

  if (renderType === STIMULUS_TYPES.DIRECTION) {
    renderDirectionStimulus(stimulus);
  }
}

function renderColorStimulus(colorId) {
  const color = getColor(colorId);

  if (!color) {
    return;
  }

  setTrainingSurface(color.hex, color.isLight);
}

function renderNumberStimulus(number) {
  setTrainingSurface("#000000");
  elements.stimulusRoot.appendChild(createElement("div", "number-stimulus", String(number)));
}

function renderDirectionStimulus(directionId) {
  const direction = getDirection(directionId);

  if (!direction) {
    return;
  }

  const directionElement = createElement("div", "direction-stimulus", direction.symbol);

  setTrainingSurface("#000000");
  directionElement.setAttribute("aria-label", direction.label);
  elements.stimulusRoot.appendChild(directionElement);
}

function init() {
  elements = {
    homeView: document.getElementById("homeView"),
    configView: document.getElementById("configView"),
    trainingView: document.getElementById("trainingView"),
    modeCards: document.getElementById("modeCards"),
    backToHomeButton: document.getElementById("backToHomeButton"),
    modeTitle: document.getElementById("modeTitle"),
    modeDescription: document.getElementById("modeDescription"),
    configControls: document.getElementById("configControls"),
    validationMessage: document.getElementById("validationMessage"),
    startButton: document.getElementById("startButton"),
    backButton: document.getElementById("backButton"),
    stimulusRoot: document.getElementById("stimulusRoot"),
  };

  renderHome();

  elements.backToHomeButton.addEventListener("click", () => showHome());
  elements.startButton.addEventListener("click", startSession);
  elements.backButton.addEventListener("click", () => stopSession("config"));
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", init);
}
