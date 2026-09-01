# ScanPlay - Especificacion funcional y tecnica

## Objetivo

ScanPlay es una aplicacion web movil para complementar entrenamientos individuales de futbol.

La app muestra estimulos visuales simples mientras el jugador trabaja con balon. El objetivo es entrenar el ciclo:

```text
BALON -> ESCANEAR -> IDENTIFICAR -> DECIDIR -> EJECUTAR CON BALON
```

El telefono se coloca detras o lateralmente respecto al jugador para obligarle a apartar brevemente la mirada del balon.

## Enfoque actual

ScanPlay queda centrado en tres modos basicos:

- Colores.
- Numeros.
- Direcciones.

No hay biblioteca de ejercicios, categorias de drills ni modos avanzados. La prioridad es una experiencia minima, seria y rapida de usar desde el movil.

## Incluido

- Home con tres opciones principales.
- Configuracion especifica por modo.
- Pantalla de entrenamiento a pantalla completa.
- Generacion aleatoria de estimulos.
- Evitar repetir consecutivamente el mismo estimulo cuando hay alternativas.
- Intervalo fijo configurable.
- Tiempo total configurable.
- Cancelacion segura de timers al volver o finalizar.
- Diseno mobile-first optimizado para iPhone.
- Instalacion como PWA desde Safari.
- Cache offline del shell de la aplicacion tras la primera carga online.

## No incluido

- Biblioteca de ejercicios.
- Escaneo libre como categoria separada.
- Conos reactivos.
- Control orientado.
- Pases por numero.
- Conflicto palabra/color.
- Secuencia.
- React u otros frameworks.
- Dependencias externas.
- npm o build step.
- Backend.
- Base de datos.
- `localStorage`.
- Wake Lock.
- Presets.
- Estadisticas.
- Sonidos o voz.
- Vibracion.
- Camara o head tracking.
- Intervalos aleatorios.
- Puntuacion automatica.

## Navegacion

La app tiene tres niveles:

```text
HOME
  -> MODE CONFIGURATION
    -> TRAINING SESSION
```

### Home

Home es la primera pantalla.

Muestra:

- `ScanPlay`;
- una frase breve de contexto;
- tres tarjetas grandes:
  - Colores;
  - Numeros;
  - Direcciones.

### Configuracion de modo

Al abrir un modo se muestra:

- `← Modos`;
- nombre del modo;
- descripcion breve;
- ajustes relevantes;
- `▶ PLAY`.

No se muestran instrucciones largas ni contenido de ejercicios fisicos.

### Sesion de entrenamiento

Durante la sesion solo se muestra:

- el estimulo actual;
- `← Volver`.

No se muestran estadisticas, explicaciones, tarjetas ni configuracion.

Al pulsar `← Volver`, se cancelan los timers activos y se vuelve a la configuracion del modo actual.

Al terminar el tiempo total, se cancelan timers y se vuelve automaticamente a la configuracion del modo actual.

## Modos

### Colores

Configuracion:

- colores disponibles:
  - rojo;
  - azul;
  - verde;
  - amarillo;
  - blanco;
  - naranja;
- minimo dos colores seleccionados;
- segundos entre cambios: `1s`, `2s`, `3s`, `4s`, `5s`;
- tiempo total: `30s`, `1min`, `2min`, `3min`, `5min`.

Sesion:

- toda la pantalla adopta el color actual;
- no se muestra texto central;
- no se repite el mismo color consecutivamente si hay alternativas.

### Numeros

Configuracion:

- rango inclusivo `Desde/Hasta`;
- valores permitidos de `0` a `99`;
- default `1` a `10`;
- `Desde` debe ser menor que `Hasta`;
- segundos entre cambios;
- tiempo total.

Sesion:

- fondo negro o practicamente negro;
- numero blanco grande centrado;
- no se repite el mismo numero consecutivamente si hay alternativas.

### Direcciones

Configuracion:

- direcciones disponibles:
  - arriba;
  - derecha;
  - abajo;
  - izquierda;
- minimo dos direcciones seleccionadas;
- segundos entre cambios;
- tiempo total.

Sesion:

- fondo negro o practicamente negro;
- flecha blanca grande centrada;
- no se repite la misma direccion consecutivamente si hay alternativas.

## Arquitectura

### Mode

Un modo describe:

- id;
- nombre;
- descripcion;
- tipo de renderizado;
- valores disponibles;
- configuracion por defecto.

### Stimulus Engine

La version actual usa un unico motor cronometrado aleatorio para colores, numeros y direcciones.

El motor recibe:

```text
SessionConfig
  modeId
  renderType
  values[]
  intervalMs
  totalDurationMs
```

El renderizador decide como mostrar el estimulo segun `renderType`.

## Validacion

- Colores: minimo dos colores seleccionados.
- Numeros: enteros entre `0` y `99`, con `Desde` menor que `Hasta`.
- Direcciones: minimo dos direcciones seleccionadas.
- Intervalo y tiempo total deben pertenecer a las opciones disponibles.

`▶ PLAY` queda desactivado si la configuracion del modo actual no es valida.

## Timers

La gestion de timers es critica.

Reglas:

- todos los timers de sesion se registran en una lista comun;
- al volver, cambiar de modo o terminar sesion, se cancelan todos los timers pendientes;
- cada timer captura un token de sesion;
- si el token ya no coincide, el callback no hace nada;
- ningun estimulo de una sesion anterior debe aparecer despues de volver.

## PWA y offline

La app incluye:

- `manifest.webmanifest` en la raiz;
- iconos PNG para instalacion en pantalla de inicio;
- `service-worker.js` en la raiz;
- registro del service worker desde `assets/js/app.js`.

El service worker cachea el shell estatico de la aplicacion:

- `./`;
- `index.html`;
- `manifest.webmanifest`;
- `assets/css/styles.css`;
- `assets/js/app.js`;
- iconos de `assets/icons/`.

El registro no se intenta desde `file://` para evitar errores al abrir el HTML directamente. Para probar PWA/offline se debe usar GitHub Pages o `localhost`.

## Tecnologia

- HTML.
- CSS.
- JavaScript vanilla.
- Sin frameworks.
- Sin dependencias.
- Sin npm.
- Sin backend.
- PWA mediante manifest y service worker.
- GitHub Pages sirve `index.html` desde la raiz del repositorio.

## Responsive y accesibilidad movil

- Objetivo principal: iPhone.
- Validacion visual en viewport `390x844`.
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
    icons/
      icon-180.png
      icon-192.png
      icon-512.png
      maskable-512.png
    js/
      app.js
  docs/
    SPEC.md
    ROADMAP.md
    TASKS.md
  index.html
  README.md
  CHANGELOG.md
  manifest.webmanifest
  service-worker.js
  .gitignore
```
