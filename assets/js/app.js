"use strict";

const STIMULUS_TYPES = {
  COLOR: "color",
  NUMBER: "number",
};

const ENGINES = {
  RANDOM: "random",
  PASS_COUNT: "pass-count",
  CONFLICT: "conflict",
  SEQUENCE: "sequence",
};

const RESPONSE_RULES = {
  INK: "ink",
  WORD: "word",
};

const COLORS = [
  { id: "red", label: "Rojo", word: "ROJO", hex: "#e3322a", isLight: false },
  { id: "blue", label: "Azul", word: "AZUL", hex: "#1f5eff", isLight: false },
  { id: "green", label: "Verde", word: "VERDE", hex: "#14a85b", isLight: false },
  { id: "yellow", label: "Amarillo", word: "AMARILLO", hex: "#f4d43d", isLight: true },
  { id: "white", label: "Blanco", word: "BLANCO", hex: "#f8f7f1", isLight: true },
  { id: "orange", label: "Naranja", word: "NARANJA", hex: "#f27a1f", isLight: false },
];

const COLOR_IDS = COLORS.map((color) => color.id);
const CONFLICT_COLOR_IDS = ["red", "blue", "green", "yellow", "orange"];

const INTERVAL_OPTIONS = [1, 2, 3, 4, 5];
const DURATION_OPTIONS = [
  { label: "30s", value: 30 },
  { label: "1min", value: 60 },
  { label: "2min", value: 120 },
  { label: "3min", value: 180 },
  { label: "5min", value: 300 },
];
const CHALLENGE_TIME_OPTIONS = [5, 7, 10, 15];
const SEQUENCE_LENGTH_OPTIONS = [
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
];
const STIMULUS_SPEED_OPTIONS = [
  { label: "1s", value: 1 },
  { label: "1.5s", value: 1.5 },
  { label: "2s", value: 2 },
  { label: "3s", value: 3 },
];
const RECALL_TIME_OPTIONS = [5, 10, 15];
const ROUND_OPTIONS = [
  { label: "3", value: 3 },
  { label: "5", value: 5 },
  { label: "8", value: 8 },
  { label: "10", value: 10 },
];
const NORMAL_NUMBER_LIMITS = { min: 0, max: 99 };
const PASS_NUMBER_LIMITS = { min: 1, max: 10 };
const SOLUTION_VISIBLE_MS = 3500;

const EXERCISES = [
  {
    id: "freeScan",
    name: "Escaneo libre",
    icon: "SCAN",
    cardDescription: "Identifica colores o números mientras trabajas con el balón.",
    description: "Identifica colores o números mientras trabajas con el balón.",
    setup:
      "Coloca el móvil detrás o a un lado para obligarte a apartar brevemente la mirada del balón.",
    instructions:
      "Automatiza el hábito de escanear, obtener información y volver a ejecutar con balón.",
    engine: ENGINES.RANDOM,
    stimulusModes: [STIMULUS_TYPES.COLOR, STIMULUS_TYPES.NUMBER],
    colorIds: COLOR_IDS,
    numberLimits: NORMAL_NUMBER_LIMITS,
    defaults: {
      stimulusType: STIMULUS_TYPES.COLOR,
      selectedColorIds: COLOR_IDS,
      numberFrom: "1",
      numberTo: "10",
      intervalSec: 3,
      totalDurationSec: 60,
    },
  },
  {
    id: "reactiveCones",
    name: "Conos reactivos",
    icon: "CONO",
    cardDescription: "Asocia cada estímulo a un cono y conduce hacia el objetivo indicado.",
    description: "Asocia cada estímulo a un cono y conduce hacia el objetivo indicado.",
    setup:
      "Coloca 3-6 conos alrededor de la zona de trabajo y asigna cada color o número a un cono.",
    instructions:
      "La asociación es física: ScanPlay solo muestra la información que debes convertir en acción.",
    engine: ENGINES.RANDOM,
    stimulusModes: [STIMULUS_TYPES.COLOR, STIMULUS_TYPES.NUMBER],
    colorIds: COLOR_IDS,
    numberLimits: NORMAL_NUMBER_LIMITS,
    defaults: {
      stimulusType: STIMULUS_TYPES.COLOR,
      selectedColorIds: COLOR_IDS,
      numberFrom: "1",
      numberTo: "10",
      intervalSec: 3,
      totalDurationSec: 60,
    },
  },
  {
    id: "orientedTouch",
    name: "Control orientado",
    icon: "CTRL",
    cardDescription: "Escanea antes de recibir y orienta el primer control hacia el objetivo.",
    description: "Escanea antes de recibir y orienta el primer control hacia el objetivo.",
    setup:
      "Coloca el móvil detrás de ti y varios conos o puertas a tu alrededor. Pasa contra la pared, escanea mientras viaja el balón y orienta el siguiente control hacia el estímulo indicado.",
    instructions:
      "El estímulo marca hacia dónde orientar el control. La app no evalúa la ejecución.",
    engine: ENGINES.RANDOM,
    stimulusModes: [STIMULUS_TYPES.COLOR, STIMULUS_TYPES.NUMBER],
    colorIds: COLOR_IDS,
    numberLimits: NORMAL_NUMBER_LIMITS,
    defaults: {
      stimulusType: STIMULUS_TYPES.COLOR,
      selectedColorIds: COLOR_IDS,
      numberFrom: "1",
      numberTo: "10",
      intervalSec: 3,
      totalDurationSec: 60,
    },
  },
  {
    id: "passCount",
    name: "Pases por número",
    icon: "123",
    cardDescription: "Memoriza el número y completa esa cantidad de pases antes de volver a mirar.",
    description:
      "Memoriza el número y completa esa cantidad de pases antes de volver a buscar información.",
    setup:
      "Trabaja con una pared o compañero. El número indica cuántos pases debes completar durante cada reto.",
    instructions:
      "ScanPlay no detecta los pases: muestra el reto y tú cuentas la ejecución físicamente.",
    engine: ENGINES.PASS_COUNT,
    numberLimits: PASS_NUMBER_LIMITS,
    defaults: {
      numberFrom: "1",
      numberTo: "5",
      challengeSec: 7,
      totalDurationSec: 60,
    },
  },
  {
    id: "conflict",
    name: "Conflicto",
    icon: "COLOR",
    cardDescription: "Resuelve el conflicto entre palabra y color mientras controlas el balón.",
    description:
      "Resuelve el conflicto entre palabra y color mientras mantienes el control del balón.",
    setup:
      "Coloca el móvil en una posición que te obligue a escanear sin perder el control técnico.",
    instructions:
      "Sigue la regla seleccionada. Si la palabra AZUL aparece escrita en rojo, la respuesta depende de si atiendes a palabra o a color de letra.",
    engine: ENGINES.CONFLICT,
    colorIds: CONFLICT_COLOR_IDS,
    defaults: {
      selectedColorIds: CONFLICT_COLOR_IDS,
      responseRule: RESPONSE_RULES.INK,
      intervalSec: 2,
      totalDurationSec: 60,
    },
  },
  {
    id: "sequence",
    name: "Secuencia",
    icon: "SEQ",
    cardDescription: "Memoriza estímulos mientras trabajas con balón y repite la secuencia.",
    description:
      "Memoriza estímulos mientras trabajas con balón y repite la secuencia al terminar.",
    setup:
      "Asigna colores a conos. Mientras aparece la secuencia, conduce o pasa; cuando veas REPITE, reproduce físicamente el orden.",
    instructions:
      "No hay puntuación automática. La app muestra la solución para que puedas comprobar la secuencia.",
    engine: ENGINES.SEQUENCE,
    colorIds: COLOR_IDS,
    defaults: {
      selectedColorIds: COLOR_IDS,
      sequenceLength: 3,
      stimulusSpeedSec: 2,
      recallSec: 10,
      rounds: 5,
    },
  },
];

const state = {
  currentView: "home",
  currentExerciseId: null,
  exerciseConfigs: createInitialConfigs(),
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

  EXERCISES.forEach((exercise) => {
    configs[exercise.id] = cloneConfig(exercise.defaults);
  });

  return configs;
}

function getExercise(exerciseId) {
  return EXERCISES.find((exercise) => exercise.id === exerciseId);
}

function getCurrentExercise() {
  return getExercise(state.currentExerciseId);
}

function getCurrentConfig() {
  return state.exerciseConfigs[state.currentExerciseId];
}

function getColor(colorId) {
  return COLORS.find((color) => color.id === colorId);
}

function getAllowedSelectedColorIds(exercise, config) {
  return exercise.colorIds.filter((colorId) => config.selectedColorIds.includes(colorId));
}

function getStimulusKey(value) {
  if (value && typeof value === "object") {
    return value.key;
  }

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

function validateExerciseConfig(exercise, config) {
  if (exercise.engine === ENGINES.RANDOM) {
    if (config.stimulusType === STIMULUS_TYPES.COLOR) {
      const selectedColorIds = getAllowedSelectedColorIds(exercise, config);

      if (selectedColorIds.length < 2) {
        return { isValid: false, message: "Selecciona al menos 2 colores." };
      }
    } else {
      const range = validateNumberRange(config.numberFrom, config.numberTo, exercise.numberLimits);

      if (!range.isValid) {
        return { isValid: false, message: range.message };
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

  if (exercise.engine === ENGINES.PASS_COUNT) {
    const range = validateNumberRange(config.numberFrom, config.numberTo, exercise.numberLimits);

    if (!range.isValid) {
      return { isValid: false, message: range.message };
    }

    if (!isAllowedOption(CHALLENGE_TIME_OPTIONS, config.challengeSec)) {
      return { isValid: false, message: "Elige un tiempo por reto válido." };
    }

    if (!isAllowedOption(DURATION_OPTIONS, config.totalDurationSec)) {
      return { isValid: false, message: "Elige un tiempo total válido." };
    }

    return { isValid: true, message: "" };
  }

  if (exercise.engine === ENGINES.CONFLICT) {
    const selectedColorIds = getAllowedSelectedColorIds(exercise, config);

    if (selectedColorIds.length < 2) {
      return { isValid: false, message: "Selecciona al menos 2 colores." };
    }

    if (![RESPONSE_RULES.INK, RESPONSE_RULES.WORD].includes(config.responseRule)) {
      return { isValid: false, message: "Elige una regla válida." };
    }

    if (!isAllowedOption(INTERVAL_OPTIONS, config.intervalSec)) {
      return { isValid: false, message: "Elige un intervalo válido." };
    }

    if (!isAllowedOption(DURATION_OPTIONS, config.totalDurationSec)) {
      return { isValid: false, message: "Elige un tiempo total válido." };
    }

    return { isValid: true, message: "" };
  }

  if (exercise.engine === ENGINES.SEQUENCE) {
    const selectedColorIds = getAllowedSelectedColorIds(exercise, config);

    if (selectedColorIds.length < 2) {
      return { isValid: false, message: "Selecciona al menos 2 colores." };
    }

    if (!isAllowedOption(SEQUENCE_LENGTH_OPTIONS, config.sequenceLength)) {
      return { isValid: false, message: "Elige una longitud válida." };
    }

    if (!isAllowedOption(STIMULUS_SPEED_OPTIONS, config.stimulusSpeedSec)) {
      return { isValid: false, message: "Elige una velocidad válida." };
    }

    if (!isAllowedOption(RECALL_TIME_OPTIONS, config.recallSec)) {
      return { isValid: false, message: "Elige un tiempo para repetir válido." };
    }

    if (!isAllowedOption(ROUND_OPTIONS, config.rounds)) {
      return { isValid: false, message: "Elige un número de rondas válido." };
    }

    return { isValid: true, message: "" };
  }

  return { isValid: false, message: "Ejercicio no disponible." };
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
  elements.exerciseCards.innerHTML = "";

  EXERCISES.forEach((exercise) => {
    const card = createButton("exercise-card", "", () => openExercise(exercise.id));
    const icon = createElement("span", "exercise-icon", exercise.icon);
    const copy = createElement("span", "exercise-copy");
    const title = createElement("h3", "", exercise.name);
    const description = createElement("p", "", exercise.cardDescription);

    copy.append(title, description);
    card.append(icon, copy);
    card.setAttribute("aria-label", `${exercise.name}. ${exercise.cardDescription}`);

    elements.exerciseCards.appendChild(card);
  });
}

function renderExerciseConfig() {
  const exercise = getCurrentExercise();
  const config = getCurrentConfig();

  if (!exercise || !config) {
    showHome();
    return;
  }

  elements.exerciseTitle.textContent = exercise.name;
  elements.exerciseDescription.textContent = exercise.description;
  elements.setupText.textContent = exercise.setup || "";
  elements.setupSection.hidden = !exercise.setup;
  elements.instructionsText.textContent = exercise.instructions || "";
  elements.instructionsSection.hidden = !exercise.instructions;
  elements.configControls.innerHTML = "";

  if (exercise.stimulusModes && exercise.stimulusModes.length > 1) {
    renderStimulusTypeControl(exercise, config);
  }

  if (shouldShowColorSelector(exercise, config)) {
    renderColorSelector(exercise, config);
  }

  if (shouldShowNumberRange(exercise, config)) {
    renderNumberRange(exercise, config);
  }

  if (exercise.engine === ENGINES.CONFLICT) {
    renderResponseRuleControl(config);
  }

  if (exercise.engine === ENGINES.RANDOM || exercise.engine === ENGINES.CONFLICT) {
    renderOptionGroup("Segundos", INTERVAL_OPTIONS, config.intervalSec, (value) => {
      config.intervalSec = value;
      renderExerciseConfig();
    });
    renderDurationControl(config);
  }

  if (exercise.engine === ENGINES.PASS_COUNT) {
    renderOptionGroup("Tiempo por reto", CHALLENGE_TIME_OPTIONS, config.challengeSec, (value) => {
      config.challengeSec = value;
      renderExerciseConfig();
    }, "compact-options");
    renderDurationControl(config);
  }

  if (exercise.engine === ENGINES.SEQUENCE) {
    renderOptionGroup("Longitud de secuencia", SEQUENCE_LENGTH_OPTIONS, config.sequenceLength, (value) => {
      config.sequenceLength = value;
      renderExerciseConfig();
    }, "compact-options");
    renderOptionGroup("Velocidad de estímulo", STIMULUS_SPEED_OPTIONS, config.stimulusSpeedSec, (value) => {
      config.stimulusSpeedSec = value;
      renderExerciseConfig();
    }, "compact-options");
    renderOptionGroup("Tiempo para repetir", RECALL_TIME_OPTIONS, config.recallSec, (value) => {
      config.recallSec = value;
      renderExerciseConfig();
    }, "compact-options");
    renderOptionGroup("Rondas", ROUND_OPTIONS, config.rounds, (value) => {
      config.rounds = value;
      renderExerciseConfig();
    }, "compact-options");
  }

  updateStartButton();
}

function shouldShowColorSelector(exercise, config) {
  return (
    exercise.engine === ENGINES.CONFLICT ||
    exercise.engine === ENGINES.SEQUENCE ||
    (exercise.engine === ENGINES.RANDOM && config.stimulusType === STIMULUS_TYPES.COLOR)
  );
}

function shouldShowNumberRange(exercise, config) {
  return (
    exercise.engine === ENGINES.PASS_COUNT ||
    (exercise.engine === ENGINES.RANDOM && config.stimulusType === STIMULUS_TYPES.NUMBER)
  );
}

function renderControlGroup(titleText) {
  const group = createElement("div", "control-group");
  const title = createElement("h3", "", titleText);

  group.appendChild(title);
  elements.configControls.appendChild(group);

  return group;
}

function renderStimulusTypeControl(exercise, config) {
  const group = renderControlGroup("Tipo de estímulo");
  const switcher = createElement("div", "mode-switch");

  switcher.setAttribute("role", "group");
  switcher.setAttribute("aria-label", "Tipo de estímulo");

  exercise.stimulusModes.forEach((mode) => {
    const label = mode === STIMULUS_TYPES.COLOR ? "Colores" : "Números";
    const button = createButton("mode-button", label, () => {
      config.stimulusType = mode;
      renderExerciseConfig();
    });
    const isSelected = config.stimulusType === mode;

    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    switcher.appendChild(button);
  });

  group.appendChild(switcher);
}

function renderColorSelector(exercise, config) {
  const group = createElement("div", "control-group");
  const line = createElement("div", "section-line");
  const title = createElement("h3", "", "Colores");
  const selectedColorIds = getAllowedSelectedColorIds(exercise, config);
  const count = createElement("span", "selection-count", `${selectedColorIds.length}/${exercise.colorIds.length}`);
  const grid = createElement("div", "color-grid");

  line.append(title, count);
  group.append(line, grid);

  exercise.colorIds.forEach((colorId) => {
    const color = getColor(colorId);
    const isSelected = config.selectedColorIds.includes(colorId);
    const button = createButton("color-card", "", () => {
      toggleConfigColor(exercise, config, colorId);
      renderExerciseConfig();
    });
    const name = createElement("span", "color-name", color.label);

    button.dataset.light = String(color.isLight);
    button.style.setProperty("--color", color.hex);
    button.style.setProperty("--color-text", color.isLight ? "#151815" : "#ffffff");
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    button.setAttribute("aria-label", `${color.label}, ${isSelected ? "activo" : "inactivo"}`);
    button.appendChild(name);
    grid.appendChild(button);
  });

  elements.configControls.appendChild(group);
}

function toggleConfigColor(exercise, config, colorId) {
  if (!exercise.colorIds.includes(colorId)) {
    return;
  }

  if (config.selectedColorIds.includes(colorId)) {
    config.selectedColorIds = config.selectedColorIds.filter((id) => id !== colorId);
  } else {
    config.selectedColorIds = [...config.selectedColorIds, colorId];
  }
}

function renderNumberRange(exercise, config) {
  const group = renderControlGroup("Rango");
  const range = createElement("div", "number-range");
  const fromField = createNumberField("Desde", config.numberFrom, exercise.numberLimits, (value) => {
    config.numberFrom = value;
    updateStartButton();
  });
  const toField = createNumberField("Hasta", config.numberTo, exercise.numberLimits, (value) => {
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

function renderResponseRuleControl(config) {
  const group = renderControlGroup("Responde a");
  const switcher = createElement("div", "mode-switch");
  const options = [
    { label: "Color de la letra", value: RESPONSE_RULES.INK },
    { label: "Palabra", value: RESPONSE_RULES.WORD },
  ];

  switcher.setAttribute("role", "group");
  switcher.setAttribute("aria-label", "Regla de respuesta");

  options.forEach((option) => {
    const button = createButton("mode-button", option.label, () => {
      config.responseRule = option.value;
      renderExerciseConfig();
    });
    const isSelected = config.responseRule === option.value;

    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    switcher.appendChild(button);
  });

  group.appendChild(switcher);
}

function renderOptionGroup(titleText, options, selectedValue, onSelect, extraClassName = "") {
  const group = renderControlGroup(titleText);
  const grid = createElement("div", `option-grid ${extraClassName}`.trim());

  options.forEach((option) => {
    const value = typeof option === "object" ? option.value : option;
    const label = typeof option === "object" ? option.label : `${option}s`;
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
  renderOptionGroup("Tiempo total", DURATION_OPTIONS, config.totalDurationSec, (value) => {
    config.totalDurationSec = value;
    renderExerciseConfig();
  });
}

function updateStartButton() {
  const exercise = getCurrentExercise();
  const config = getCurrentConfig();
  const validation = exercise && config
    ? validateExerciseConfig(exercise, config)
    : { isValid: false, message: "" };

  elements.validationMessage.textContent = validation.message;
  elements.startButton.disabled = !validation.isValid;
}

function buildNumberValues(config, limits) {
  return validateNumberRange(config.numberFrom, config.numberTo, limits).values;
}

function buildConflictStimuli(colorIds) {
  const stimuli = [];

  colorIds.forEach((wordColorId) => {
    colorIds.forEach((inkColorId) => {
      if (wordColorId === inkColorId) {
        return;
      }

      stimuli.push({
        key: `${wordColorId}:${inkColorId}`,
        wordColorId,
        inkColorId,
      });
    });
  });

  return stimuli;
}

function buildSessionConfig(exercise, config) {
  if (exercise.engine === ENGINES.RANDOM) {
    const values =
      config.stimulusType === STIMULUS_TYPES.COLOR
        ? getAllowedSelectedColorIds(exercise, config)
        : buildNumberValues(config, exercise.numberLimits);

    return {
      kind: "timed",
      exerciseId: exercise.id,
      renderType: config.stimulusType,
      values,
      intervalMs: config.intervalSec * 1000,
      totalDurationMs: config.totalDurationSec * 1000,
    };
  }

  if (exercise.engine === ENGINES.PASS_COUNT) {
    return {
      kind: "timed",
      exerciseId: exercise.id,
      renderType: STIMULUS_TYPES.NUMBER,
      values: buildNumberValues(config, exercise.numberLimits),
      intervalMs: config.challengeSec * 1000,
      totalDurationMs: config.totalDurationSec * 1000,
    };
  }

  if (exercise.engine === ENGINES.CONFLICT) {
    const selectedColorIds = getAllowedSelectedColorIds(exercise, config);

    return {
      kind: "timed",
      exerciseId: exercise.id,
      renderType: ENGINES.CONFLICT,
      values: buildConflictStimuli(selectedColorIds),
      intervalMs: config.intervalSec * 1000,
      totalDurationMs: config.totalDurationSec * 1000,
      responseRule: config.responseRule,
    };
  }

  return {
    kind: "sequence",
    exerciseId: exercise.id,
    colorIds: getAllowedSelectedColorIds(exercise, config),
    sequenceLength: config.sequenceLength,
    stimulusSpeedMs: config.stimulusSpeedSec * 1000,
    recallMs: config.recallSec * 1000,
    rounds: config.rounds,
    solutionVisibleMs: SOLUTION_VISIBLE_MS,
    roundIndex: 0,
    currentSequence: [],
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
  state.currentExerciseId = null;
  state.currentView = "home";
  elements.homeView.hidden = false;
  elements.configView.hidden = true;
  elements.trainingView.hidden = true;
  resetTrainingSurface();
}

function openExercise(exerciseId) {
  clearSessionTimers();
  state.sessionToken += 1;
  state.activeSession = null;
  state.currentExerciseId = exerciseId;
  state.currentView = "config";
  elements.homeView.hidden = true;
  elements.configView.hidden = false;
  elements.trainingView.hidden = true;
  resetTrainingSurface();
  renderExerciseConfig();
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

  if (targetView === "config" && state.currentExerciseId) {
    state.currentView = "config";
    elements.homeView.hidden = true;
    elements.configView.hidden = false;
    elements.trainingView.hidden = true;
    renderExerciseConfig();
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
    isLight ? "rgba(21, 24, 21, 0.16)" : "rgba(0, 0, 0, 0.24)"
  );
  elements.trainingView.style.setProperty(
    "--training-control-fg",
    isLight ? "#151815" : "#ffffff"
  );
}

function startExerciseSession() {
  const exercise = getCurrentExercise();
  const config = getCurrentConfig();

  if (!exercise || !config) {
    return;
  }

  const validation = validateExerciseConfig(exercise, config);

  if (!validation.isValid) {
    updateStartButton();
    return;
  }

  const sessionConfig = buildSessionConfig(exercise, config);

  clearSessionTimers();
  state.sessionToken += 1;
  state.activeSession = {
    ...sessionConfig,
    previousStimulus: null,
    endsAt: performance.now() + (sessionConfig.totalDurationMs || 0),
  };

  showTrainingView();

  if (sessionConfig.kind === "sequence") {
    startSequenceFlow();
    return;
  }

  showNextTimedStimulus();
  scheduleSessionTimer(() => stopSession("config"), sessionConfig.totalDurationMs);
}

function showNextTimedStimulus() {
  const session = state.activeSession;

  if (!session || session.kind !== "timed") {
    return;
  }

  const stimulus = chooseNextValue(session.values, session.previousStimulus);

  session.previousStimulus = stimulus;
  renderStimulus(session.renderType, stimulus, session);
  scheduleNextTimedStimulus();
}

function scheduleNextTimedStimulus() {
  const session = state.activeSession;

  if (!session || session.kind !== "timed") {
    return;
  }

  const remainingMs = session.endsAt - performance.now();

  if (remainingMs <= session.intervalMs + 50) {
    return;
  }

  scheduleSessionTimer(() => showNextTimedStimulus(), session.intervalMs);
}

function renderStimulus(renderType, stimulus, session) {
  elements.stimulusRoot.textContent = "";

  if (renderType === STIMULUS_TYPES.COLOR) {
    renderColorStimulus(stimulus);
    return;
  }

  if (renderType === STIMULUS_TYPES.NUMBER) {
    renderNumberStimulus(stimulus);
    return;
  }

  if (renderType === ENGINES.CONFLICT) {
    renderConflictStimulus(stimulus, session);
  }
}

function renderColorStimulus(colorId) {
  const color = getColor(colorId);

  if (!color) {
    return;
  }

  elements.stimulusRoot.textContent = "";
  setTrainingSurface(color.hex, color.isLight);
}

function renderNumberStimulus(number) {
  setTrainingSurface("#050505");
  const numberElement = createElement("div", "number-stimulus", String(number));

  elements.stimulusRoot.appendChild(numberElement);
}

function renderConflictStimulus(stimulus) {
  const wordColor = getColor(stimulus.wordColorId);
  const inkColor = getColor(stimulus.inkColorId);

  if (!wordColor || !inkColor) {
    return;
  }

  setTrainingSurface("#050505");
  const wordElement = createElement("div", "conflict-word", wordColor.word);

  wordElement.style.color = inkColor.hex;
  elements.stimulusRoot.appendChild(wordElement);
}

function startSequenceFlow() {
  const session = state.activeSession;

  if (!session || session.kind !== "sequence") {
    return;
  }

  session.roundIndex = 0;
  runNextSequenceRound();
}

function runNextSequenceRound() {
  const session = state.activeSession;

  if (!session || session.kind !== "sequence") {
    return;
  }

  if (session.roundIndex >= session.rounds) {
    stopSession("config");
    return;
  }

  session.roundIndex += 1;
  session.currentSequence = buildColorSequence(session.colorIds, session.sequenceLength);
  renderSequenceItem(0);
}

function buildColorSequence(colorIds, length) {
  const sequence = [];
  let previousColorId = null;

  for (let index = 0; index < length; index += 1) {
    const colorId = chooseNextValue(colorIds, previousColorId);

    sequence.push(colorId);
    previousColorId = colorId;
  }

  return sequence;
}

function renderSequenceItem(index) {
  const session = state.activeSession;

  if (!session || session.kind !== "sequence") {
    return;
  }

  if (index >= session.currentSequence.length) {
    renderRecallPhase();
    scheduleSessionTimer(() => renderSolutionPhase(), session.recallMs);
    return;
  }

  renderColorStimulus(session.currentSequence[index]);
  scheduleSessionTimer(() => renderSequenceItem(index + 1), session.stimulusSpeedMs);
}

function renderRecallPhase() {
  setTrainingSurface("#050505");
  elements.stimulusRoot.textContent = "";
  elements.stimulusRoot.appendChild(createElement("div", "phase-title", "REPITE"));
}

function renderSolutionPhase() {
  const session = state.activeSession;

  if (!session || session.kind !== "sequence") {
    return;
  }

  setTrainingSurface("#050505");
  elements.stimulusRoot.textContent = "";

  const panel = createElement("div", "solution-panel");
  const title = createElement("div", "phase-title", "SOLUCIÓN");
  const row = createElement("div", "solution-row");

  session.currentSequence.forEach((colorId, index) => {
    const color = getColor(colorId);
    const dot = createElement("span", "solution-dot");

    dot.style.setProperty("--dot-color", color ? color.hex : "#ffffff");
    row.appendChild(dot);

    if (index < session.currentSequence.length - 1) {
      row.appendChild(createElement("span", "solution-arrow", "→"));
    }
  });

  panel.append(title, row);
  elements.stimulusRoot.appendChild(panel);
  scheduleSessionTimer(() => runNextSequenceRound(), session.solutionVisibleMs);
}

function init() {
  elements = {
    homeView: document.getElementById("homeView"),
    configView: document.getElementById("configView"),
    trainingView: document.getElementById("trainingView"),
    exerciseCards: document.getElementById("exerciseCards"),
    backToExercisesButton: document.getElementById("backToExercisesButton"),
    exerciseTitle: document.getElementById("exerciseTitle"),
    exerciseDescription: document.getElementById("exerciseDescription"),
    setupSection: document.getElementById("setupSection"),
    setupText: document.getElementById("setupText"),
    instructionsSection: document.getElementById("instructionsSection"),
    instructionsText: document.getElementById("instructionsText"),
    configControls: document.getElementById("configControls"),
    validationMessage: document.getElementById("validationMessage"),
    startButton: document.getElementById("startButton"),
    backButton: document.getElementById("backButton"),
    stimulusRoot: document.getElementById("stimulusRoot"),
  };

  renderHome();

  elements.backToExercisesButton.addEventListener("click", () => showHome());
  elements.startButton.addEventListener("click", startExerciseSession);
  elements.backButton.addEventListener("click", () => stopSession("config"));
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", init);
}
