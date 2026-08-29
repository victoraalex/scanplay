# ScanPlay V1 minima - Tareas

Estado actual: V1 minima implementada como prueba de colores a pantalla completa.

## Fase 1 - Documentacion

- [x] Reemplazar `SPEC.md` con la V1 minima.
- [x] Eliminar de la V1 PWA, localStorage, Wake Lock, presets, numeros, estadisticas, cuenta atras e intervalos aleatorios.
- [x] Definir los unicos archivos de la V1: `index.html`, `styles.css`, `app.js`, `SPEC.md`, `TASKS.md`.

## Fase 2 - Estructura HTML

- [x] Crear `index.html`.
- [x] Crear solo dos vistas: menu y entrenamiento.
- [x] Anadir selector visual de colores.
- [x] Anadir selector de segundos.
- [x] Anadir selector de tiempo total.
- [x] Anadir boton grande `▶ PLAY`.
- [x] Anadir boton discreto `← Volver` en entrenamiento.

## Fase 3 - Estilos mobile-first

- [x] Crear `styles.css`.
- [x] Disenar menu limpio, visual y tactil.
- [x] Evitar aspecto de formulario tradicional.
- [x] Optimizar layout para iPhone.
- [x] Respetar safe areas.
- [x] Hacer que la pantalla de entrenamiento sea color a pantalla completa.
- [x] Evitar scroll accidental durante entrenamiento.

## Fase 4 - Logica JavaScript

- [x] Crear `app.js`.
- [x] Definir catalogo de colores.
- [x] Gestionar activacion/desactivacion de colores.
- [x] Exigir minimo 2 colores para iniciar.
- [x] Gestionar seleccion de intervalo fijo.
- [x] Gestionar seleccion de tiempo total.
- [x] Iniciar sesion sin cuenta atras.
- [x] Mostrar primer color inmediatamente.
- [x] Cambiar color cada X segundos.
- [x] Evitar repeticion consecutiva de color.
- [x] Cancelar timers con `← Volver`.
- [x] Cancelar timers al terminar por tiempo.
- [x] Volver automaticamente al menu al finalizar.

## Fase 5 - Verificacion

- [x] Revisar sintaxis JavaScript.
- [x] Comprobar gestion de timers.
- [x] Comprobar que no se repiten colores consecutivos cuando hay alternativas.
- [x] Comprobar comportamiento responsive movil.
- [x] Confirmar que no se han anadido funcionalidades fuera de especificacion.
