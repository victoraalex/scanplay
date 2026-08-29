# ScanPlay

ScanPlay es una aplicacion web mobile-first para complementar ejercicios individuales de tecnificacion de futbol.

La aplicacion proporciona informacion visual mientras el jugador trabaja con balon, pared, conos, conduccion, controles o pases. La idea es entrenar el ciclo mirar, identificar, recordar cuando haga falta, decidir y ejecutar con balon.

Version publicada: [https://victoraalex.github.io/scanplay/](https://victoraalex.github.io/scanplay/)

## Objetivo

Validar ejercicios simples de escaneo visual aplicados a tareas tecnicas reales, sin cuentas, backend, persistencia ni distribucion en tiendas de aplicaciones.

## Funcionalidades actuales

- Biblioteca de ejercicios como pantalla principal.
- Configuracion especifica por ejercicio.
- Estimulos por color o numero en ejercicios compatibles.
- Rango numerico configurable.
- Intervalos o ventanas de reto segun el ejercicio.
- Ejercicio de conflicto palabra/color.
- Ejercicio de memoria de secuencia.
- Evita repetir consecutivamente el mismo estimulo cuando hay alternativas.
- Interfaz mobile-first pensada para uso rapido en pantallas tipo iPhone.
- Control discreto `← Volver` durante el entrenamiento.

## Exercise Library

- Escaneo libre: identifica colores o numeros mientras trabajas con el balon.
- Conos reactivos: asocia cada estimulo a un cono y conduce hacia el objetivo indicado.
- Control orientado: escanea antes de recibir y orienta el primer control hacia el objetivo.
- Pases por numero: memoriza el numero y completa esa cantidad de pases antes de volver a mirar.
- Conflicto: resuelve el conflicto entre palabra y color mientras mantienes el control del balon.
- Secuencia: memoriza estimulos y repite la secuencia fisicamente al terminar.

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
- Actual: `v1.2.0` con biblioteca de ejercicios.
- Ideas futuras: flechas direccionales, comandos de accion, Flash Scan, intervalos aleatorios, PWA/offline, guardado de configuraciones, presets y estadisticas.

## Version

Version actual: `v1.2.0` en progreso en `feature/exercise-library`.

## Estado del proyecto

Prototipo temprano. La app se mantiene intencionadamente pequena para validar la interaccion principal de entrenamiento.
