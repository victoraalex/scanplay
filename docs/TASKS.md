# ScanPlay v1.2.0 - Tareas

## Inspeccion y workflow

- [x] Inspeccionar el repositorio actual antes de modificar codigo.
- [x] Leer `README.md`.
- [x] Leer `docs/SPEC.md`.
- [x] Leer `docs/ROADMAP.md`.
- [x] Leer `docs/TASKS.md`.
- [x] Revisar `index.html`.
- [x] Revisar `assets/js/app.js`.
- [x] Revisar `assets/css/styles.css`.
- [x] Crear y trabajar en `feature/exercise-library`.
- [x] No modificar `main` directamente.
- [x] No hacer merge.
- [x] No crear tag.

## Navegacion y biblioteca

- [x] Convertir Home en primera pantalla.
- [x] Mostrar `ScanPlay`.
- [x] Mostrar `Entrena para mirar antes de actuar.`.
- [x] Crear tarjetas grandes de ejercicios.
- [x] Navegar de Home a configuracion de ejercicio.
- [x] Navegar de configuracion a Home con `← Ejercicios`.
- [x] Navegar de entrenamiento a configuracion con `← Volver`.

## Arquitectura

- [x] Separar conceptualmente `Exercise` y `Stimulus Engine`.
- [x] Definir datos de ejercicios con nombre, descripcion, montaje, instrucciones, motor y defaults.
- [x] Mantener un motor aleatorio reutilizable.
- [x] Compartir logica de sesion y timers para ejercicios cronometrados.
- [x] Crear flujo especifico para Secuencia.
- [x] Centralizar seleccion aleatoria sin repeticion consecutiva.
- [x] Centralizar cancelacion de timers.

## Ejercicios implementados

- [x] Escaneo libre.
- [x] Conos reactivos.
- [x] Control orientado.
- [x] Pases por numero.
- [x] Conflicto.
- [x] Secuencia.

## Escaneo libre

- [x] Mantener modo colores.
- [x] Mantener modo numeros.
- [x] Mantener intervalo configurable.
- [x] Mantener tiempo total configurable.
- [x] Evitar repeticion consecutiva.

## Conos reactivos

- [x] Anadir descripcion y montaje.
- [x] Reutilizar selector colores/numeros.
- [x] Reutilizar intervalo y tiempo total.
- [x] Reutilizar random stimulus engine.

## Control orientado

- [x] Anadir descripcion y montaje.
- [x] Reutilizar selector colores/numeros.
- [x] Reutilizar intervalo y tiempo total.
- [x] Reutilizar random stimulus engine.

## Pases por numero

- [x] Usar solo numeros.
- [x] Definir rango default `1` a `5`.
- [x] Validar valores `1` a `10`.
- [x] Anadir `Tiempo por reto`: `5s`, `7s`, `10s`, `15s`.
- [x] Mantener tiempo total.
- [x] Evitar repetir numero consecutivo.
- [x] No implementar deteccion automatica de pases.

## Conflicto

- [x] Mostrar palabra grande sobre fondo oscuro.
- [x] Usar colores rojo, azul, verde, amarillo y naranja.
- [x] Anadir regla `Color de la letra`.
- [x] Anadir regla `Palabra`.
- [x] Generar pares incongruentes.
- [x] Evitar repetir exactamente el mismo estimulo consecutivo.
- [x] No implementar puntuacion automatica.

## Secuencia

- [x] Seleccionar colores.
- [x] Configurar longitud `3`, `4`, `5`, `6`.
- [x] Configurar velocidad `1s`, `1.5s`, `2s`, `3s`.
- [x] Configurar tiempo para repetir `5s`, `10s`, `15s`.
- [x] Configurar rondas `3`, `5`, `8`, `10`.
- [x] Implementar fase de colores.
- [x] Implementar fase `REPITE`.
- [x] Implementar fase `SOLUCION`.
- [x] Avanzar a la siguiente ronda.
- [x] Finalizar tras el numero de rondas.
- [x] Cancelar toda la cadena de timers al volver.

## Documentacion

- [x] Actualizar `README.md`.
- [x] Actualizar `CHANGELOG.md`.
- [x] Actualizar `docs/SPEC.md`.
- [x] Actualizar `docs/ROADMAP.md`.
- [x] Actualizar `docs/TASKS.md`.

## Validacion

- [x] Probar regresion de Escaneo libre.
- [x] Probar Conos reactivos.
- [x] Probar Control orientado.
- [x] Probar Pases por numero.
- [x] Probar Conflicto.
- [x] Probar Secuencia.
- [x] Probar que `PLAY/EMPEZAR` se desactiva con configuracion invalida.
- [x] Probar que `← Volver` cancela timers.
- [x] Probar fin automatico de sesiones cronometradas.
- [x] Probar fin tras rondas de Secuencia.
- [x] Probar que no hay errores JavaScript conocidos.
- [x] Probar viewport movil `390x844`.
- [x] Probar que GitHub Pages puede servir desde root.
