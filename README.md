# ScanPlay

ScanPlay es una aplicacion web mobile-first para entrenar escaneo visual aplicado al futbol.

Version publicada: [https://victoraalex.github.io/scanplay/](https://victoraalex.github.io/scanplay/)

## Objetivo

Mostrar estimulos visuales simples mientras el jugador trabaja con balon, para entrenar mirar, identificar y ejecutar sin convertir la app en un juego cognitivo complejo.

## Funcionalidades actuales

- Tres modos principales: colores, numeros y direcciones.
- Configuracion especifica por modo.
- Intervalo fijo configurable: `1s`, `2s`, `3s`, `4s`, `5s`.
- Duracion total configurable: `30s`, `1min`, `2min`, `3min`, `5min`.
- Seleccion visual de colores.
- Rango numerico configurable de `0` a `99`.
- Seleccion de direcciones.
- Pantalla de entrenamiento a pantalla completa.
- Evita repetir consecutivamente el mismo estimulo cuando hay alternativas.
- Control discreto `← Volver` durante el entrenamiento.

## Modos

- Colores: la pantalla completa cambia de color.
- Numeros: muestra un numero grande sobre fondo oscuro.
- Direcciones: muestra una flecha grande sobre fondo oscuro.

## Ejecucion local

Abre `index.html` directamente en un navegador, o sirve la carpeta localmente:

```bash
python3 -m http.server 8000
```

Despues abre [http://localhost:8000](http://localhost:8000).

## Stack tecnologico

- HTML.
- CSS.
- JavaScript vanilla.
- Sin build step.
- Sin dependencias.
- Sin backend.

## Estructura del repositorio

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

## Roadmap resumido

- Completado: `v1.0.0` con estimulos de colores.
- Completado: `v1.1.0` con modo numeros y estructura profesional del repositorio.
- Actual: enfoque minimalista con tres modos base.
- Ideas futuras: PWA/offline, guardar configuracion, intervalos variables, presets y estadisticas.

## Version

Version actual: `v1.2.0` en progreso.

## Estado del proyecto

Prototipo temprano. La app se mantiene intencionadamente pequena para validar la mecanica principal desde un movil.
