# ScanPlay - Tareas

## Reenfoque de producto

- [x] Revisar el estado actual del repositorio.
- [x] Eliminar la biblioteca de ejercicios como concepto principal.
- [x] Reducir la aplicacion a tres modos: Colores, Numeros y Direcciones.
- [x] Mantener HTML, CSS y JavaScript vanilla.
- [x] Mantener compatibilidad con GitHub Pages desde `index.html`.

## Navegacion

- [x] Mantener Home como primera pantalla.
- [x] Mostrar solo tres opciones principales.
- [x] Navegar de Home a configuracion de modo.
- [x] Navegar de configuracion a Home con `← Modos`.
- [x] Navegar de entrenamiento a configuracion con `← Volver`.

## Modos

- [x] Mantener modo Colores con seleccion visual.
- [x] Mantener modo Numeros con rango `Desde/Hasta`.
- [x] Anadir modo Direcciones.
- [x] Validar minimo dos colores.
- [x] Validar minimo dos direcciones.
- [x] Validar numeros enteros de `0` a `99`.
- [x] Mantener intervalo fijo configurable.
- [x] Mantener tiempo total configurable.

## Motor y timers

- [x] Usar un unico flujo cronometrado compartido.
- [x] Centralizar seleccion aleatoria sin repeticion consecutiva.
- [x] Cancelar timers al volver.
- [x] Cancelar timers al finalizar automaticamente.
- [x] Evitar que aparezcan estimulos de sesiones anteriores.

## Diseno

- [x] Aplicar una interfaz mobile-first mas sobria.
- [x] Reducir ruido visual y aspecto infantil.
- [x] Mantener controles grandes para uso rapido entrenando.
- [x] Mantener pantalla de entrenamiento dominada por el estimulo.
- [x] Revisar viewport movil `390x844`.

## PWA/offline

- [x] Crear `manifest.webmanifest`.
- [x] Crear iconos para pantalla de inicio.
- [x] Crear `service-worker.js`.
- [x] Cachear el shell estatico de la aplicacion.
- [x] Registrar el service worker desde JavaScript.
- [x] Evitar el registro del service worker desde `file://`.
- [x] Documentar instalacion en iPhone.

## Documentacion

- [x] Actualizar `README.md`.
- [x] Actualizar `CHANGELOG.md`.
- [x] Actualizar `docs/SPEC.md`.
- [x] Actualizar `docs/ROADMAP.md`.
- [x] Actualizar `docs/TASKS.md`.

## Validacion pendiente antes de publicar

- [ ] Probar manualmente en iPhone real.
- [ ] Revisar legibilidad con el telefono colocado a distancia de entrenamiento.
- [ ] Probar instalacion desde Safari.
- [ ] Probar apertura offline desde el icono instalado.
