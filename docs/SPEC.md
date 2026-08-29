# ScanPlay V1 minima - Especificacion funcional y tecnica

Esta especificacion sustituye la V1 anterior.

## 1. Objetivo

ScanPlay es una aplicacion web movil extremadamente sencilla para entrenar el escaneo visual en futbol.

La mecanica de la V1 es unica: el movil muestra un color a pantalla completa y cambia automaticamente a otro color seleccionado cada cierto numero fijo de segundos.

La prioridad de esta version es validar si la mecanica basica de entrenamiento funciona en uso real, especialmente en iPhone.

## 2. Alcance V1

### Incluido

- Menu de configuracion.
- Pantalla de entrenamiento.
- Seleccion visual de colores activos.
- Seleccion de intervalo fijo en segundos.
- Seleccion de duracion total del entrenamiento.
- Boton grande `▶ PLAY`.
- Cambio automatico de color durante la sesion.
- Boton discreto `← Volver` durante la sesion.
- Cancelacion de timers al volver o finalizar.
- Retorno automatico al menu cuando termina el tiempo total.
- Diseno mobile-first optimizado para iPhone.

### No incluido

- React u otros frameworks.
- Backend.
- Base de datos.
- `localStorage`.
- PWA.
- Manifest.
- Service worker.
- Wake Lock.
- Presets.
- Estadisticas.
- Numeros.
- Sonidos.
- Vibracion.
- Camara.
- Intervalos aleatorios.
- Cuenta atras.
- Cuentas de usuario.
- Modos adicionales.
- Tiempo restante visible durante la sesion.
- Controles de pausa, reanudar, finalizar o reiniciar.

## 3. Vistas

Solo existen dos vistas:

1. `menu`: configuracion de la sesion.
2. `training`: pantalla de entrenamiento a color completo.

No hay vista de finalizacion. Cuando termina la sesion, la app vuelve automaticamente al menu.

## 4. Menu

El menu debe ser limpio, visual, moderno y rapido de usar durante un entrenamiento.

Debe evitar el aspecto de formulario web tradicional. Los controles principales deben ser botones grandes, tarjetas o circulos.

### 4.1 Colores

Colores iniciales:

- rojo;
- azul;
- verde;
- amarillo;
- blanco;
- naranja.

Cada color puede activarse o desactivarse.

La seleccion debe ser visual, usando superficies del propio color.

Regla:

- debe haber al menos 2 colores seleccionados para poder iniciar.

Si hay menos de 2 colores seleccionados:

- el boton `▶ PLAY` queda desactivado;
- se muestra un mensaje breve en el menu.

### 4.2 Segundos

Configura cada cuantos segundos cambia el color.

Opciones:

- 1 segundo;
- 2 segundos;
- 3 segundos;
- 4 segundos;
- 5 segundos.

El intervalo es fijo durante toda la sesion.

### 4.3 Tiempo

Configura la duracion total del entrenamiento.

Opciones:

- 30 segundos;
- 1 minuto;
- 2 minutos;
- 3 minutos;
- 5 minutos.

### 4.4 Play

En la parte inferior del menu debe existir un boton grande y claramente visible:

```text
▶ PLAY
```

Al pulsarlo:

- valida que existan al menos 2 colores activos;
- inicia la sesion inmediatamente;
- no muestra cuenta atras.

## 5. Pantalla de entrenamiento

Durante el entrenamiento:

- toda la pantalla adopta el color actual;
- el color ocupa practicamente todo el viewport;
- no hay numeros;
- no hay texto central;
- no hay estadisticas;
- no hay tiempo restante;
- no hay controles innecesarios.

Solo debe existir un boton discreto:

```text
← Volver
```

Al pulsar `← Volver`:

1. se detiene inmediatamente la sesion;
2. se cancelan todos los timers activos;
3. se vuelve al menu.

Cuando termina el tiempo total:

1. se cancelan todos los timers activos;
2. se finaliza la sesion;
3. se vuelve automaticamente al menu.

## 6. Reglas de cambio de color

La sesion muestra un color inmediatamente al empezar.

Cada X segundos, segun la configuracion, cambia a otro color seleccionado aleatoriamente.

Si hay varios colores disponibles, no se puede mostrar el mismo color dos veces consecutivas.

Ejemplos validos:

```text
ROJO -> AZUL -> ROJO -> VERDE
```

Ejemplo invalido:

```text
ROJO -> ROJO
```

Como el menu exige al menos 2 colores seleccionados, la sesion siempre debe tener alternativa para evitar repeticion consecutiva.

## 7. Tecnologia

La V1 usa exclusivamente:

- HTML;
- CSS;
- JavaScript vanilla.

No hay proceso de build.

No hay dependencias externas.

No hay almacenamiento persistente.

## 8. Archivos

La V1 debe contener solo estos archivos de aplicacion y documentacion:

```text
scanplay/
  index.html
  styles.css
  app.js
  SPEC.md
  TASKS.md
```

## 9. Modelo simple

### Color

```text
Color
  id
  label
  hex
  isLight
```

### Estado de aplicacion

```text
AppState
  view
  selectedColorIds[]
  intervalSec
  totalDurationSec
  isTraining
  currentColorId
  changeTimerId
  endTimerId
```

### Configuracion de sesion

La configuracion se lee desde el estado del menu al pulsar `▶ PLAY`:

```text
SessionConfig
  colorIds[]
  intervalMs
  totalDurationMs
```

La sesion no modifica la configuracion del menu mientras esta activa.

## 10. Gestion de timers

La V1 necesita dos timers:

- `changeTimerId`: programa el siguiente cambio de color.
- `endTimerId`: termina la sesion al cumplirse la duracion total.

Reglas:

- Al iniciar sesion, primero se cancelan timers previos por seguridad.
- Al iniciar sesion, se muestra el primer color inmediatamente.
- Despues de mostrar un color, se programa el siguiente cambio con `setTimeout`.
- Antes de programar un nuevo cambio, se comprueba si queda tiempo suficiente.
- Al pulsar `← Volver`, se cancelan ambos timers.
- Al terminar automaticamente, se cancelan ambos timers.
- Al volver al menu, `currentColorId` queda limpio.
- Todo callback de timer debe comprobar que la sesion sigue activa antes de actuar.

## 11. Responsive/iPhone

El diseno debe:

- ser mobile-first;
- funcionar bien en anchuras tipo iPhone;
- usar controles tactiles grandes;
- respetar las safe areas con `env(safe-area-inset-*)`;
- evitar que el boton `← Volver` quede debajo de zonas del sistema;
- usar alturas de viewport estables con `100dvh` y fallback;
- evitar scroll accidental durante la sesion;
- permitir que el color domine casi toda la pantalla.

## 12. Criterios de aceptacion

- Solo existen dos vistas: menu y entrenamiento.
- El menu permite activar/desactivar rojo, azul, verde, amarillo, blanco y naranja.
- El menu permite elegir 1, 2, 3, 4 o 5 segundos.
- El menu permite elegir 30 segundos, 1 minuto, 2 minutos, 3 minutos o 5 minutos.
- `▶ PLAY` esta desactivado si hay menos de 2 colores activos.
- Al pulsar `▶ PLAY`, la pantalla pasa inmediatamente al primer color.
- El color cambia cada X segundos.
- Nunca aparece el mismo color dos veces consecutivas.
- Durante la sesion no se muestran numeros, texto central, estadisticas ni tiempo restante.
- Durante la sesion solo aparece `← Volver`.
- `← Volver` cancela timers y regresa al menu.
- Al terminar la duracion total, la app cancela timers y vuelve al menu.
- La app funciona abriendo `index.html` en un navegador moderno.
