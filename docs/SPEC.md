# ScanPlay v1.2.0 - Especificacion funcional y tecnica

## Objetivo

ScanPlay es una aplicacion movil para complementar ejercicios individuales de tecnificacion de futbol.

La app proporciona informacion visual mientras el jugador trabaja con balon, pared, conos, conduccion, controles o pases. Su objetivo no es ser solo un juego cognitivo, sino provocar este ciclo:

```text
BALON -> ESCANEAR -> IDENTIFICAR -> RECORDAR -> DECIDIR -> EJECUTAR CON BALON
```

Normalmente el telefono se coloca detras o lateralmente respecto al jugador para obligarle a apartar temporalmente la mirada del balon.

## Alcance v1.2.0

### Incluido

- Home como biblioteca de ejercicios.
- Pantalla de configuracion por ejercicio.
- Pantalla de entrenamiento con minima interfaz.
- Separacion conceptual entre `Exercise` y `Stimulus Engine`.
- Ejercicios:
  - Escaneo libre.
  - Conos reactivos.
  - Control orientado.
  - Pases por numero.
  - Conflicto.
  - Secuencia.
- Reutilizacion del motor aleatorio para ejercicios compatibles.
- Flujo especial de memoria para Secuencia.
- Validacion de configuraciones.
- Cancelacion segura de timers al volver, cambiar de ejercicio o finalizar.
- Diseno mobile-first optimizado para iPhone.

### No incluido

- React u otros frameworks.
- Dependencias externas.
- npm o build step.
- Backend.
- Base de datos.
- `localStorage`.
- PWA/offline.
- Service worker.
- Wake Lock.
- Presets.
- Estadisticas.
- Sonidos o voz.
- Vibracion.
- Camara o head tracking.
- Flechas direccionales.
- Comandos de accion.
- Intervalos aleatorios.
- Puntuacion automatica.

## Navegacion

La app tiene tres niveles:

```text
HOME / EXERCISES
  -> EXERCISE CONFIGURATION
    -> TRAINING SESSION
```

### Home

Home es la primera pantalla.

Muestra:

- `ScanPlay`;
- la frase `Entrena para mirar antes de actuar.`;
- tarjetas grandes de ejercicios.

Cada tarjeta incluye:

- nombre;
- icono textual sencillo;
- descripcion breve de una o dos lineas.

### Configuracion de ejercicio

Al abrir un ejercicio se muestra:

- `← Ejercicios`;
- nombre del ejercicio;
- descripcion;
- como montarlo;
- instrucciones breves;
- configuracion relevante;
- `▶ EMPEZAR`.

No se muestran parametros que no pertenezcan al ejercicio.

### Sesion de entrenamiento

Durante la sesion solo se muestra:

- el estimulo;
- `← Volver`.

No se muestran estadisticas, navegacion completa, tarjetas, explicaciones ni configuracion.

Al pulsar `← Volver`, se cancelan los timers activos y se vuelve a la configuracion del ejercicio actual.

Al terminar una sesion cronometrada o la ultima ronda de Secuencia, se vuelve automaticamente a la configuracion del ejercicio actual.

## Arquitectura

### Exercise

Un ejercicio describe:

- id;
- nombre;
- descripcion;
- instrucciones;
- material o montaje;
- motor de estimulos que utiliza;
- parametros disponibles;
- configuracion por defecto.

### Stimulus Engine

El motor genera lo que se muestra durante la sesion.

Motores en v1.2.0:

- `random`: reutilizado por Escaneo libre, Conos reactivos y Control orientado.
- `pass-count`: variante numerica para Pases por numero.
- `conflict`: genera palabra y color de letra incongruentes.
- `sequence`: gestiona fases de secuencia, recall y solucion.

La logica de sesion no se duplica por ejercicio. Los ejercicios compatibles comparten configuracion generica:

```text
SessionConfig
  kind
  exerciseId
  renderType
  values[]
  intervalMs
  totalDurationMs
```

Secuencia usa un flujo propio porque no es una sesion cronometrada simple:

```text
SequenceSession
  colorIds[]
  sequenceLength
  stimulusSpeedMs
  recallMs
  rounds
  roundIndex
  currentSequence[]
```

## Ejercicios

### Escaneo libre

Descripcion:

```text
Identifica colores o numeros mientras trabajas con el balon.
```

Objetivo:

- automatizar el habito de apartar brevemente la mirada del balon para obtener informacion.

Configuracion:

- tipo de estimulo: colores o numeros;
- colores disponibles, si usa colores;
- rango `Desde/Hasta`, si usa numeros;
- intervalo;
- tiempo total.

Sesion:

- color a pantalla completa o numero blanco sobre fondo oscuro;
- no repite consecutivamente el mismo estimulo si hay alternativas.

### Conos reactivos

Descripcion:

```text
Asocia cada estimulo a un cono y conduce hacia el objetivo indicado.
```

Como montarlo:

```text
Coloca 3-6 conos alrededor de la zona de trabajo y asigna cada color o numero a un cono.
```

Configuracion:

- tipo de estimulo: colores o numeros;
- colores o rango numerico;
- intervalo;
- tiempo total.

Usa el motor `random`.

### Control orientado

Descripcion:

```text
Escanea antes de recibir y orienta el primer control hacia el objetivo.
```

Como montarlo:

```text
Coloca el movil detras de ti y varios conos o puertas a tu alrededor. Pasa contra la pared, escanea mientras viaja el balon y orienta el siguiente control hacia el estimulo indicado.
```

Configuracion:

- tipo de estimulo: colores o numeros;
- colores o rango numerico;
- intervalo;
- tiempo total.

Usa el motor `random`.

### Pases por numero

Descripcion:

```text
Memoriza el numero y completa esa cantidad de pases antes de volver a buscar informacion.
```

Configuracion:

- rango numerico inclusivo;
- valores permitidos de `1` a `10`;
- rango por defecto `1` a `5`;
- tiempo por reto: `5s`, `7s`, `10s`, `15s`;
- tiempo total: `30s`, `1min`, `2min`, `3min`, `5min`.

Sesion:

- solo numeros;
- numero blanco enorme sobre fondo oscuro;
- el numero permanece visible durante la ventana del reto;
- no repite consecutivamente el mismo numero si hay alternativas;
- la app no detecta automaticamente cuantos pases realiza el jugador.

### Conflicto

Descripcion visible:

```text
Resuelve el conflicto entre palabra y color mientras mantienes el control del balon.
```

Configuracion:

- colores disponibles: rojo, azul, verde, amarillo, naranja;
- regla:
  - color de la letra;
  - palabra;
- intervalo;
- tiempo total.

Defaults:

- intervalo `2s`;
- tiempo total `60s`.

Sesion:

- fondo negro o neutro;
- palabra grande centrada;
- color visual de la palabra puede ser distinto de la palabra;
- se generan preferentemente estimulos incongruentes;
- en v1.2.0 se generan solo pares incongruentes cuando hay al menos dos colores;
- no se repite exactamente el mismo estimulo consecutivo.

No hay puntuacion automatica.

### Secuencia

Descripcion:

```text
Memoriza estimulos mientras trabajas con balon y repite la secuencia al terminar.
```

Fases:

1. `SECUENCIA`: muestra colores uno detras de otro a pantalla completa.
2. `RECALL`: muestra una pantalla neutra con `REPITE`.
3. `SOLUCION`: muestra `SOLUCION` y la secuencia correcta representada con puntos de color en orden.

Configuracion:

- colores disponibles;
- longitud de secuencia: `3`, `4`, `5`, `6`;
- default: `3`;
- velocidad de estimulo: `1s`, `1.5s`, `2s`, `3s`;
- default: `2s`;
- tiempo para repetir: `5s`, `10s`, `15s`;
- default: `10s`;
- rondas: `3`, `5`, `8`, `10`;
- default: `5`.

No hay puntuacion, deteccion automatica de acierto, secuencia inversa ni otros modos.

## Validacion

- Colores: minimo dos colores seleccionados.
- Numeros generales: enteros entre `0` y `99`, con `Desde` menor que `Hasta`.
- Pases por numero: enteros entre `1` y `10`, con `Desde` menor que `Hasta`.
- Conflicto: minimo dos colores y regla valida.
- Secuencia: minimo dos colores y opciones validas para longitud, velocidad, recall y rondas.

`▶ EMPEZAR` queda desactivado si la configuracion del ejercicio actual no es valida.

## Timers

La gestion de timers es critica.

Reglas:

- todos los timers de sesion se registran en una lista comun;
- al volver, cambiar ejercicio o terminar sesion, se cancelan todos los timers pendientes;
- cada timer captura un token de sesion;
- si el token ya no coincide, el callback no hace nada;
- ningun estimulo de una sesion anterior debe aparecer despues de volver.

## Tecnologia

- HTML.
- CSS.
- JavaScript vanilla.
- Sin frameworks.
- Sin dependencias.
- Sin npm.
- Sin backend.
- GitHub Pages sirve `index.html` desde la raiz del repositorio.

## Responsive y accesibilidad movil

- Objetivo principal: iPhone.
- Validado para viewport `390x844`.
- Touch targets grandes.
- Inputs numericos con fuente mayor o igual a `16px`.
- Uso de `env(safe-area-inset-*)`.
- Sin scroll horizontal.
- Pantalla de entrenamiento con minima interfaz.

## Estructura

```text
scanplay/
  .github/
    ISSUE_TEMPLATE/
      bug_report.md
      feature_request.md
  assets/
    css/
      styles.css
    js/
      app.js
  docs/
    SPEC.md
    ROADMAP.md
    TASKS.md
  index.html
  README.md
  CHANGELOG.md
  .gitignore
```
