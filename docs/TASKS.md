# ScanPlay v1.1.0 - Tareas

## Versionado y workflow

- [x] Inspeccionar completamente el proyecto existente antes de modificar.
- [x] Crear y trabajar en la rama `feature/number-mode`.
- [x] No modificar directamente `main`.
- [x] No hacer merge a `main`.
- [x] No crear tag final.

## Profesionalizacion del repositorio

- [x] Crear `.github/ISSUE_TEMPLATE/bug_report.md`.
- [x] Crear `.github/ISSUE_TEMPLATE/feature_request.md`.
- [x] Mover `styles.css` a `assets/css/styles.css`.
- [x] Mover `app.js` a `assets/js/app.js`.
- [x] Mover `SPEC.md` a `docs/SPEC.md`.
- [x] Mover `TASKS.md` a `docs/TASKS.md`.
- [x] Actualizar rutas en `index.html`.
- [x] Crear `.gitignore`.
- [x] No anadir `LICENSE`.

## Documentacion

- [x] Crear `README.md`.
- [x] Crear `CHANGELOG.md`.
- [x] Crear `docs/ROADMAP.md`.
- [x] Actualizar `docs/SPEC.md` para `v1.1.0`.
- [x] Actualizar `docs/TASKS.md` para `v1.1.0`.

## Modo colores

- [x] Mantener seleccion visual de colores.
- [x] Mantener minimo de 2 colores para iniciar.
- [x] Mantener pantalla completa con color actual.
- [x] Mantener seleccion aleatoria de color.
- [x] Evitar repetir color consecutivo cuando hay alternativas.

## Modo numeros

- [x] Anadir selector `COLORES | NUMEROS`.
- [x] Permitir solo un modo activo.
- [x] Mantener configuracion del modo inactivo al cambiar de modo.
- [x] Ocultar colores y mostrar rango en modo numeros.
- [x] Definir rango inicial `1` a `10`.
- [x] Validar enteros entre `0` y `99`.
- [x] Validar `Desde` menor que `Hasta`.
- [x] Desactivar `▶ PLAY` con rango invalido.
- [x] Mostrar fondo negro y numero blanco centrado durante entrenamiento.
- [x] Evitar repetir numero consecutivo cuando hay alternativas.

## Arquitectura

- [x] Separar conceptualmente configuracion de sesion.
- [x] Separar generacion del siguiente estimulo.
- [x] Separar renderizado de estimulo.
- [x] Compartir timers entre colores y numeros.
- [x] Mantener navegacion menu/entrenamiento sencilla.
- [x] Evitar dependencias, frameworks, npm y backend.

## Validacion

- [x] Verificar que el modo colores sigue funcionando.
- [x] Verificar que el modo numeros funciona.
- [x] Verificar que los numeros respetan min/max.
- [x] Verificar que no se repiten numeros consecutivos si hay alternativas.
- [x] Verificar que no se repiten colores consecutivos si hay alternativas.
- [x] Verificar que cambiar de modo no rompe la configuracion.
- [x] Verificar que `▶ PLAY` se desactiva con configuracion invalida.
- [x] Verificar que `← Volver` cancela timers.
- [x] Verificar que el fin automatico cancela timers.
- [x] Verificar que no existen errores JavaScript conocidos.
- [x] Verificar viewport movil `390x844`.
- [x] Verificar que GitHub Pages puede servir `index.html` desde root.
