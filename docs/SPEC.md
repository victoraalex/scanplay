# ScanPlay v1.1.0 - Especificacion funcional y tecnica

## Objetivo

ScanPlay es una aplicacion web movil sencilla para entrenar el escaneo visual en futbol mediante estimulos visuales a pantalla casi completa.

La version `v1.1.0` conserva el modo de colores de `v1.0.0` y agrega un modo de numeros. La prioridad sigue siendo validar la mecanica basica de entrenamiento sin framework, backend ni persistencia.

## Alcance

### Incluido

- Menu de configuracion.
- Pantalla de entrenamiento.
- Selector de tipo de estimulo:
  - colores;
  - numeros.
- Seleccion visual de colores activos.
- Configuracion de rango de numeros.
- Seleccion de intervalo fijo en segundos.
- Seleccion de duracion total del entrenamiento.
- Boton grande `▶ PLAY`.
- Cambio automatico de estimulo durante la sesion.
- Boton discreto `← Volver` durante la sesion.
- Cancelacion de timers al volver o finalizar.
- Retorno automatico al menu cuando termina el tiempo total.
- Diseno mobile-first optimizado para iPhone.
- Estructura profesional de repositorio.

### No incluido

- React u otros frameworks.
- Backend.
- Base de datos.
- `localStorage`.
- PWA/offline.
- Manifest.
- Service worker.
- Wake Lock.
- Presets.
- Estadisticas.
- Sonidos.
- Vibracion.
- Camara.
- Intervalos aleatorios.
- Cuenta atras.
- Cuentas de usuario.
- Estimulos combinados.
- Modos especificos de futbol.

## Vistas

Solo existen dos vistas:

1. `menu`: configuracion de la sesion.
2. `training`: pantalla de entrenamiento.

No hay vista de finalizacion. Cuando termina la sesion, la app vuelve automaticamente al menu.

## Menu

El menu debe ser limpio, visual, moderno y rapido de usar durante un entrenamiento.

### Tipo de estimulo

El usuario puede elegir un unico modo activo:

- `COLORES`;
- `NUMEROS`.

Al cambiar de modo durante la configuracion:

- se oculta la configuracion del modo inactivo;
- se mantiene la configuracion previamente elegida en el otro modo;
- no se inicia ni se modifica una sesion activa.

### Modo colores

Colores disponibles:

- rojo;
- azul;
- verde;
- amarillo;
- blanco;
- naranja.

Cada color puede activarse o desactivarse.

Regla:

- debe haber al menos 2 colores seleccionados para poder iniciar.

Durante la sesion:

- toda la pantalla adopta el color actual;
- el color se selecciona aleatoriamente;
- no se repite el mismo color dos veces consecutivas cuando hay alternativas.

### Modo numeros

El usuario configura un rango inclusivo:

```text
Desde: [numero]
Hasta: [numero]
```

Valores iniciales:

- Desde: `1`;
- Hasta: `10`.

Valores permitidos:

- enteros entre `0` y `99`.

Validaciones:

- ambos valores deben ser enteros;
- ambos valores deben estar entre `0` y `99`;
- `Desde` debe ser menor que `Hasta`;
- deben existir al menos dos numeros posibles.

Ejemplo:

```text
Desde 3
Hasta 7

Estimulos posibles: 3, 4, 5, 6, 7
```

Si la configuracion es invalida, `▶ PLAY` queda desactivado.

Durante la sesion:

- el fondo es negro o casi negro;
- aparece un unico numero centrado;
- el numero es blanco, grande y legible a distancia;
- no se repite el mismo numero dos veces consecutivas cuando hay alternativas.

### Segundos

Configura cada cuantos segundos cambia el estimulo.

Opciones:

- 1 segundo;
- 2 segundos;
- 3 segundos;
- 4 segundos;
- 5 segundos.

El intervalo es fijo durante toda la sesion.

### Tiempo

Configura la duracion total del entrenamiento.

Opciones:

- 30 segundos;
- 1 minuto;
- 2 minutos;
- 3 minutos;
- 5 minutos.

### Play

El menu contiene un boton grande:

```text
▶ PLAY
```

Al pulsarlo:

- valida la configuracion del modo activo;
- crea un snapshot simple de sesion;
- inicia la sesion inmediatamente;
- no muestra cuenta atras.

## Pantalla de entrenamiento

Durante el entrenamiento solo debe existir un boton discreto:

```text
← Volver
```

Comportamiento:

- en modo colores, la pantalla completa muestra el color actual;
- en modo numeros, la pantalla completa usa fondo negro y un numero blanco centrado;
- no se muestran estadisticas ni tiempo restante;
- no se muestran controles de pausa, reanudar, finalizar o reiniciar.

Al pulsar `← Volver`:

1. se detiene inmediatamente la sesion;
2. se cancelan todos los timers activos;
3. se vuelve al menu.

Cuando termina el tiempo total:

1. se cancelan todos los timers activos;
2. se finaliza la sesion;
3. se vuelve automaticamente al menu.

## Arquitectura

La V1.1 mantiene una arquitectura sencilla en JavaScript vanilla.

Separaciones conceptuales:

- configuracion de sesion;
- validacion del menu;
- generacion del siguiente estimulo;
- renderizado del estimulo;
- timers de sesion;
- navegacion entre menu y entrenamiento.

El motor de sesion usa una configuracion generica:

```text
SessionConfig
  mode
  values[]
  intervalMs
  totalDurationMs
```

El generador de estimulos recibe una lista de valores y el valor anterior. Si existen alternativas, excluye el valor anterior antes de elegir aleatoriamente.

Este modelo permite agregar otros tipos de estimulo mas adelante sin duplicar toda la logica de timers.

## Gestion de timers

La sesion usa dos timers:

- `changeTimerId`: programa el siguiente cambio de estimulo.
- `endTimerId`: termina la sesion al cumplirse la duracion total.

Reglas:

- al iniciar sesion, primero se cancelan timers previos;
- el primer estimulo se muestra inmediatamente;
- cada callback comprueba que la sesion siga activa;
- `← Volver` cancela timers y limpia el estado de entrenamiento;
- el fin automatico cancela timers y limpia el estado de entrenamiento;
- al volver al menu no queda estimulo activo.

## Tecnologia

- HTML.
- CSS.
- JavaScript vanilla.
- Sin dependencias externas.
- Sin build step.
- GitHub Pages sirve `index.html` desde la raiz.

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

## Criterios de aceptacion

- GitHub Pages puede servir la app desde `index.html` en la raiz.
- Solo existen dos vistas: menu y entrenamiento.
- El selector de modo permite `COLORES` o `NUMEROS`, solo uno activo.
- Cambiar de modo mantiene la configuracion del modo inactivo.
- El modo colores conserva el comportamiento de `v1.0.0`.
- En modo colores, `▶ PLAY` queda desactivado si hay menos de 2 colores activos.
- En modo colores, no se repite color consecutivo cuando hay alternativas.
- En modo numeros, el rango inicial es `1` a `10`.
- En modo numeros, solo se aceptan enteros entre `0` y `99`.
- En modo numeros, `Desde` debe ser menor que `Hasta`.
- En modo numeros, `▶ PLAY` queda desactivado si el rango es invalido.
- En modo numeros, los estimulos respetan el rango inclusivo.
- En modo numeros, no se repite numero consecutivo cuando hay alternativas.
- La duracion total se comparte entre ambos modos.
- `← Volver` cancela timers y regresa al menu.
- El fin automatico cancela timers y regresa al menu.
- No hay errores JavaScript conocidos.
- La UI funciona correctamente en viewport movil `390x844`.
