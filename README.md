# ScanPlay

ScanPlay es una aplicacion web mobile-first para entrenar el escaneo visual aplicado al futbol.

La version actual se centra en una mecanica sencilla: elegir un tipo de estimulo, iniciar una sesion y reaccionar mientras la pantalla cambia automaticamente.

Version publicada: [https://victoraalex.github.io/scanplay/](https://victoraalex.github.io/scanplay/)

## Objetivo

Validar una mecanica ligera de entrenamiento visual sin cuentas, backend, persistencia ni distribucion en tiendas de aplicaciones.

## Funcionalidades actuales

- Modo de estimulos por color con cambios a pantalla completa.
- Modo de estimulos por numero con rango inclusivo configurable.
- Intervalos fijos de 1 a 5 segundos.
- Duracion total de sesion entre 30 segundos y 5 minutos.
- Evita repetir consecutivamente el mismo estimulo cuando hay alternativas.
- Interfaz mobile-first pensada para uso rapido en pantallas tipo iPhone.
- Control discreto `← Volver` durante el entrenamiento.

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
- Actual: `v1.1.0` con modo numeros y estructura profesional del repositorio.
- Ideas futuras: PWA/offline, guardado de configuracion, intervalos variables, estimulos combinados, modos especificos de futbol, presets y estadisticas.

## Version

Version actual: `v1.1.0` en progreso en `feature/number-mode`.

## Estado del proyecto

Prototipo temprano. La app se mantiene intencionadamente pequena para validar la interaccion principal de entrenamiento.
