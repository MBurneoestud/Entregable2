# Entregable 2

## Descripción
 Repositorio para el Entregable 2: API REST de Micro-Mundos Creativos, desarrollada con Node.js, Express y TypeScript.

## Implementación actual

El proyecto funciona actualmente como una API REST ejecutada desde Node.js. La API administra listas de ejército, unidades y armas mediante operaciones CRUD en memoria. Las solicitudes se realizan mediante HTTP, usando herramientas como `curl`, Postman o cualquier cliente REST; no requiere una base de datos.

Los endpoints principales son:

- `/api/armylists`: listas de ejército
- `/api/units`: unidades
- `/api/weapons`: armas
- `/api/salud`: comprobación del estado de la API

La arquitectura está organizada en rutas, controladores, servicios, modelos y middlewares. La guía de pruebas manuales al final de este documento contiene ejemplos de solicitudes y respuestas para cada ruta.

## Intención Inicial
- Programa para crear listas (ejercitos) para el juego de mesa Warhammer 40,000.
- Las listas en el juego son creadas en base a un sistema de puntos. Cada unidad (soldado, vehiculo, etc.) tiene un valor de puntos, y las listas tienen un valor mínimo y maximo de puntos dependiendo del formato de juego

## Intencion Auditable
- El programa se compone de 3 partes: 
    + Lista o ejercito: formato mas grande, tiene un nombre asignado por el usuario. Contiene las unidades individuales. Existe un valor minimo y maximo de puntos que debe tener la lista para ser valida.
    + Unidad: Los soldados, vehiculos, etc. que componen una lista. Cada uno tiene una o mas armas que contribuyen a su valor de puntos. Las unidades tienen tipos: "linea de batalla", "infanteria", "montado" "vehiculo" y "personaje". Las unidades tambien tienen un valor de puntos inicial antes de asignarles sus armas. Ciertas armas solo son compatibles con ciertas unidades
    + Arma: Tiene valor de puntos que se suma junto con el valor de otras armas y el valor base de la unidad para calcular el valor total de la unidad. Hay armas de combate cercano y combate lejano, armas que funcionan mejor para combatir con grupos y armas que funcionan mejor para combate con enemigos individuales (por ejemplo, un lanzallamas es bueno para lidear con grupos en combate cercano, un francotirador es bueno para enemigos individuales en combate lejano).
- Se generan errores si no se cumplen ciertas condiciones. Por ejemplo, si no se nombra la lista, si el valor total de puntos no llega al minimo o se pasa del maximo, si no se asignan armas compatibles a las unidades, etc.

## Restricciones 
- La API se limita a respuestas y solicitudes JSON
- La API puede probarse desde la terminal mediante `curl` o desde cualquier cliente HTTP
- El programa se limitara a una sola faccion, Space Marines, para evitar complejidad excesiva
- El programa incluira 3-4 unidades de cada tipo, para evitar complejidad excesiva
- El programa incluira 6-8 armas por tipo de unidad, para evitar complejidad excesiva
- La lista tiene un valor maximo de 1,000 puntos y un valor minimo de 500 puntos, caso contrario se retorna un error
- La lista debe tener un nombre asignado por el usuario, , caso contrario se retorna un error
- La lista debera incluir una unidad de tipo personaje por defecto, , caso contrario se retorna un error
- Armas asignadas a unidades no compatibles generaran un error en el programa

## Criterios de Aceptacion
- El programa funciona inicialmente en Javascript, luego migrado a TypeScript
- La API acepta solicitudes HTTP con payloads JSON

## Explicacion de Tipos Usados

### Tipos Primitivos
- **`string`**: Utilizado para nombres, palabras clave, mensajes y datos de texto
- **`number`**: Utilizado para valores de puntos, contadores, índices y límites
- **`boolean`**: Utilizado para resultados de validación y verificaciones condicionales
- **`void`**: Utilizado para métodos que no retornan valores

### Interfaces
- **`IWeapon`**: Define la estructura de objetos de arma (nombre, puntos, tipos de unidades compatibles)
- **`IUnit`**: Define la estructura de objetos de unidad (nombre, puntos base, palabras clave, armas disponibles/equipadas)
- **`IKeywordLimits`**: Define los límites para cada tipo de palabra clave (Infantería, Batallón, Montado, Vehículo, Personaje)
- **`IPointLimit`**: Define el rango válido de puntos para listas de ejército (500-1000)
- **`IArmyList`**: Define la estructura de la lista de ejército con cinco campos tipados: `name`, `faction`, `units`, `pointLimit` y `keywordLimits`

### Tipos de Arreglo
- **`Weapon[]`**: Arreglo de objetos Weapon
- **`Unit[]`**: Arreglo de objetos Unit
- **`string[]`**: Arreglo de strings (palabras clave, tipos compatibles)

### Tipos de Unión
- **`Keyword`**: Unión literal que limita los tipos de unidad válidos a `Infantry`, `Battleline`, `Mounted`, `Vehicle` o `Character`
- Las propiedades opcionales de las actualizaciones se representan mediante `Partial<T>`, por ejemplo `UpdateArmyList`, `UpdateUnit` y `UpdateWeapon`

### Tipos Promise
- La API actual usa servicios síncronos porque los datos se almacenan en memoria y no se consulta una base de datos.

### Características Especiales de TypeScript
- **Aserción no-null (`!`)**: Indica a TypeScript que un valor no será null
- **Aserciones de tipo**: Utilizadas para acceder a propiedades de objetos dinámicamente
- **Implementación de interfaces**: Las clases implementan interfaces usando la palabra clave `implements`

### Beneficios de Seguridad de Tipos
- **Verificación en tiempo de compilación**: Detecta errores de tipo antes de la ejecución
- **Soporte IntelliSense**: Mejor autocompletado y documentación
- **Seguridad en refactorización**: Los cambios en tipos se propagan a través del código
- **Código autodocumentado**: Los tipos sirven como documentación en línea

## Comandos de Instalacion y Ejecucion

### Instalación de Dependencias
```bash
npm install
```
Este comando instala las dependencias necesarias del proyecto, incluyendo TypeScript y los tipos de Node.js.

### Compilación del Proyecto
```bash
npm run build
```
Este comando compila el código TypeScript a JavaScript y genera la carpeta `dist/` con los archivos compilados.

### Modo de Desarrollo
```bash
npm run dev
```
Este comando ejecuta la API directamente desde TypeScript y reinicia el servidor cuando detecta cambios. Es el modo recomendado para las pruebas manuales.

### Ejecución compilada
El script `npm start` está configurado para ejecutar `dist/index.js`. Antes de usarlo, el proyecto debe mantener consistente el formato de módulos de `package.json` y `tsconfig.json` (`type: module` frente a `module: CommonJS`).

## Funcionamiento de la API REST

Al iniciar el servidor, Express registra las rutas de la API y los middlewares de identificación de solicitudes, logging y manejo centralizado de errores. Cada respuesta incluye un `requestId` para facilitar el seguimiento de la solicitud.

La información se guarda en colecciones `Map` dentro de los servicios, por lo que se pierde al reiniciar el servidor. Los IDs se generan incrementalmente desde `1` para cada recurso.

### Operaciones disponibles

### Funciones Principales

#### 1. Crear y administrar unidades
- El usuario puede seleccionar unidades disponibles de la facción Space Marines
- El programa verifica si la unidad puede agregarse según los límites de palabras clave
- Cada unidad tiene un valor de puntos base y puede equiparse con armas
- Las unidades disponibles incluyen: Intercessor Squad, Terminator Squad, Captain, Dreadnought, entre otras

#### 2. Crear y administrar armas
- El usuario selecciona una unidad de su lista actual
- El programa muestra las armas disponibles compatibles con esa unidad
- Solo se pueden agregar armas que sean compatibles con el tipo de unidad (por ejemplo, ciertas armas solo funcionan con vehículos o infantería)
- Cada arma tiene un valor de puntos que se suma al total de la unidad

#### 3. Administrar listas de ejército
- `GET /api/armylists` lista todas las listas
- `GET /api/armylists/:id` obtiene una lista por ID
- `POST /api/armylists` crea una lista
- `PUT /api/armylists/:id` actualiza una lista
- `DELETE /api/armylists/:id` elimina una lista

#### 4. Validar una lista
- Verifica si la lista cumple con los criterios de aceptación:
  - **Nombre asignado**: La lista debe tener un nombre
  - **Rango de puntos**: Total entre 500 y 1,000 puntos
  - **Unidad de personaje**: Debe incluir al menos 1 unidad tipo Character
- Las reglas de dominio están implementadas en el modelo `ArmyList`; las rutas CRUD permiten administrar sus datos en memoria.

### Reglas de Validación
- El valor total de puntos debe estar entre 500 y 1,000
- La lista debe contener al menos una unidad de tipo Character (personaje)
- Las armas solo pueden asignarse a unidades compatibles
- Existen límites máximos por palabra clave: Infantry (5), Battleline (10), Mounted (4), Vehicle (2), Character (1)

### Respuestas y errores
- Las operaciones exitosas devuelven `200 OK`, excepto las creaciones (`201 Created`) y eliminaciones (`204 No Content`)
- Los errores se devuelven como JSON con `error` y `requestId`
- Las rutas inexistentes devuelven `404 Not Found`

## Compatibilidad entre Unidades y Armas

### Sistema de Palabras Clave
Cada unidad tiene una o más palabras clave que determinan su tipo:
- **Battleline**: Unidades de línea de batalla básicas
- **Infantry**: Unidades de infantería
- **Mounted**: Unidades montadas (bicicletas, ATVs)
- **Vehicle**: Vehículos de combate
- **Character**: Personajes líderes y especialistas

### Reglas de Compatibilidad
- Cada arma tiene una lista de tipos de unidades compatibles (`compatibleUnitTypes`)
- Una unidad solo puede equipar armas que incluyan al menos una de sus palabras clave
- El sistema verifica la compatibilidad antes de permitir la equipación
- Si se intenta equipar un arma incompatible, el programa muestra un error

### Ejemplos de Compatibilidad

#### Armas de Combate Cercano
- **Boltgun**: Compatible con Battleline, Character
- **Bolt Pistol**: Compatible con Battleline, Character, Mounted
- **Chainsword**: Compatible con Battleline, Character, Mounted
- **Power Sword**: Compatible con Battleline, Character, Infantry
- **Power Fist**: Compatible con Battleline, Infantry, Character
- **Lightning Claws**: Compatible con Infantry, Character

#### Armas de Combate Lejano
- **Plasma Pistol**: Compatible con Infantry, Battleline, Character
- **Meltagun**: Compatible con Infantry, Character
- **Plasma Gun**: Compatible con Infantry
- **Flamer**: Compatible con Infantry, Battleline
- **Autocannon**: Compatible con Infantry

#### Armas Pesadas
- **Heavy Bolter**: Compatible con Infantry, Battleline, Mounted

#### Armas de Vehículo
- **Twin Heavy Bolter**: Compatible con Vehicle
- **Multi-Melta**: Compatible con Vehicle, Mounted
- **Heavy Plasma Cannon**: Compatible con Vehicle
- **Assault Cannon**: Compatible con Vehicle
- **Hunter/Killer Missile Launcher**: Compatible con Vehicle
- **Heavy Flamer**: Compatible con Vehicle
- **Ironhail Heavy Stubber**: Compatible con Vehicle
- **Twin Lascannon**: Compatible con Vehicle

#### Armas de Unidades Montadas
- **Onslaught Gattling Cannon**: Compatible con Mounted
- **Twin Bolt Rifle**: Compatible con Mounted

### Ejemplos Prácticos
- Un **Intercessor Squad** (Battleline) puede equipar Boltgun, Bolt Pistol, Chainsword, Power Sword, Power Fist, Plasma Pistol, Flamer, Heavy Bolter
- Un **Terminator Squad** (Infantry) puede equipar Plasma Pistol, Meltagun, Plasma Gun, Flamer, Heavy Bolter, Lightning Claws, Autocannon
- Un **Captain** (Character) puede equipar Boltgun, Bolt Pistol, Chainsword, Power Sword, Power Fist, Plasma Pistol, Meltagun, Lightning Claws
- Un **Dreadnought** (Vehicle) solo puede equipar armas de vehículo (Twin Heavy Bolter, Multi-Melta, Heavy Plasma Cannon, Assault Cannon, Hunter/Killer Missile Launcher, Heavy Flamer, Ironhail Heavy Stubber, Twin Lascannon)
- Un **Outrider Squad** (Mounted) puede equipar Bolt Pistol, Chainsword, Heavy Bolter, Multi-Melta, Onslaught Gattling Cannon, Twin Bolt Rifle

### Validación en el Programa
El programa automáticamente:
1. Muestra solo las armas compatibles cuando se selecciona una unidad
2. Bloquea intentos de equipar armas incompatibles
3. Muestra un mensaje de error si se intenta una equipación inválida

## Pruebas Manuales de la API REST

Inicia el servidor en otra terminal:

```bash
npm run build
npm start
```

La API queda disponible en `http://localhost:3000`.
Los valores `<request-id>` representan el UUID generado por el middleware `requestId`.

### 1. Comprobar salud de la API

```bash
curl http://localhost:3000/api/salud
```

Respuesta `200 OK`:

```json
{
  "estado": "ok",
  "requestId": "<request-id>"
}
```

### 2. Crear una lista de ejército

```bash
curl -X POST http://localhost:3000/api/armylists \
  -H "Content-Type: application/json" \
  -d '{"name":"Ultramarines 1000","faction":"Space Marines"}'
```

Respuesta `201 Created`:

```json
{
  "armyList": {
    "name": "Ultramarines 1000",
    "faction": "Space Marines",
    "units": [],
    "pointLimit": { "min": 500, "max": 1000 },
    "keywordLimits": {
      "Infantry": 5,
      "Battleline": 10,
      "Mounted": 4,
      "Vehicle": 2,
      "Character": 1
    }
  },
  "requestId": "<request-id>"
}
```

### 3. Listar y obtener listas de ejército

```bash
curl http://localhost:3000/api/armylists
curl http://localhost:3000/api/armylists/1
```

La lista responde `200 OK` con el formato:

```json
{
  "total": 1,
  "armyLists": [
    { "id": 1, "armyList": { "name": "Ultramarines 1000", "faction": "Space Marines", "units": [] } }
  ],
  "requestId": "<request-id>"
}
```

La consulta por ID responde `200 OK` con `{ "armyList": { ... }, "requestId": "<request-id>" }`.

### 4. Actualizar una lista de ejército

```bash
curl -X PUT http://localhost:3000/api/armylists/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Ultramarines Tournament","faction":"Space Marines"}'
```

Respuesta `200 OK`:

```json
{
  "armyList": {
    "name": "Ultramarines Tournament",
    "faction": "Space Marines",
    "units": [],
    "pointLimit": { "min": 500, "max": 1000 },
    "keywordLimits": {
      "Infantry": 5,
      "Battleline": 10,
      "Mounted": 4,
      "Vehicle": 2,
      "Character": 1
    }
  },
  "requestId": "<request-id>"
}
```

### 5. Eliminar una lista de ejército

```bash
curl -i -X DELETE http://localhost:3000/api/armylists/1
```

Respuesta `204 No Content` sin cuerpo.

### 9. Matriz de rutas probadas

Las siguientes rutas fueron probadas contra `http://localhost:3000` con el servidor de desarrollo activo. Los IDs se generan desde `1` al iniciar una instancia nueva del servidor.

| Método | Ruta | Resultado verificado |
|---|---|---|
| `GET` | `/api/salud` | `200 OK` con `estado` y `requestId` |
| `GET` | `/api/armylists` | `200 OK` con `total` y `armyLists` |
| `GET` | `/api/armylists/1` | `200 OK` con `armyList` |
| `POST` | `/api/armylists` | `201 Created` con la lista creada |
| `PUT` | `/api/armylists/1` | `200 OK` con la lista actualizada |
| `DELETE` | `/api/armylists/1` | `204 No Content` |
| `GET` | `/api/units` | `200 OK` con `total` y `units` |
| `GET` | `/api/units/1` | `200 OK` con `unit` |
| `POST` | `/api/units` | `201 Created` con la unidad creada |
| `PUT` | `/api/units/1` | `200 OK` con la unidad actualizada |
| `DELETE` | `/api/units/1` | `204 No Content` |
| `GET` | `/api/weapons` | `200 OK` con `total` y `weapons` |
| `GET` | `/api/weapons/1` | `200 OK` con `weapon` |
| `POST` | `/api/weapons` | `201 Created` con el arma creada |
| `PUT` | `/api/weapons/1` | `200 OK` con el arma actualizada |
| `DELETE` | `/api/weapons/1` | `204 No Content` |

También se probó una ruta inexistente:

```bash
curl http://localhost:3000/api/unknown
```

Resultado verificado: `404 Not Found` con un objeto de error que incluye `error` y `requestId`.

### 6. Probar validación y errores

Crear una lista sin nombre:

```bash
curl -X POST http://localhost:3000/api/armylists \
  -H "Content-Type: application/json" \
  -d '{"faction":"Space Marines"}'
```

Respuesta `400 Bad Request`:

```json
{
  "error": "name es obligatorio",
  "requestId": "<request-id>"
}
```

Consultar un ID inexistente, por ejemplo `999`:

```bash
curl http://localhost:3000/api/armylists/999
```

Respuesta `404 Not Found`:

```json
{
  "error": "Army list con id 999 no encontrado",
  "requestId": "<request-id>"
}
```

### 7. CRUD de unidades

Crear una unidad:

```bash
curl -X POST http://localhost:3000/api/units \
  -H "Content-Type: application/json" \
  -d '{"name":"Intercessor Squad","basePoints":80,"keywords":["Battleline"],"availableWeapons":[]}'
```

Respuesta `201 Created`:

```json
{
  "unit": {
    "name": "Intercessor Squad",
    "basePoints": 80,
    "keywords": ["Battleline"],
    "availableWeapons": [],
    "equippedWeapons": []
  },
  "requestId": "<request-id>"
}
```

Listar todas las unidades y obtener una unidad por ID:

```bash
curl http://localhost:3000/api/units
curl http://localhost:3000/api/units/1
```

La lista responde `200 OK` con este formato:

```json
{
  "total": 1,
  "units": [
    { "id": 1, "unit": { "name": "Intercessor Squad", "basePoints": 80, "keywords": ["Battleline"] } }
  ],
  "requestId": "<request-id>"
}
```

La consulta por ID responde `200 OK` con `{ "unit": { ... }, "requestId": "<request-id>" }`.

Actualizar una unidad:

```bash
curl -X PUT http://localhost:3000/api/units/1 \
  -H "Content-Type: application/json" \
  -d '{"basePoints":85}'
```

Respuesta `200 OK` con `{ "unit": { ... }, "requestId": "<request-id>" }` y `basePoints` igual a `85`.

Eliminar una unidad:

```bash
curl -i -X DELETE http://localhost:3000/api/units/1
```

Respuesta `204 No Content` sin cuerpo.

### 8. CRUD de armas

Crear un arma:

```bash
curl -X POST http://localhost:3000/api/weapons \
  -H "Content-Type: application/json" \
  -d '{"name":"Boltgun","points":0,"compatibleUnitTypes":["Battleline","Character"]}'
```

Respuesta `201 Created`:

```json
{
  "weapon": {
    "name": "Boltgun",
    "points": 0,
    "compatibleUnitTypes": ["Battleline", "Character"]
  },
  "requestId": "<request-id>"
}
```

Listar todas las armas y obtener un arma por ID:

```bash
curl http://localhost:3000/api/weapons
curl http://localhost:3000/api/weapons/1
```

La lista responde `200 OK` con este formato:

```json
{
  "total": 1,
  "weapons": [
    { "id": 1, "weapon": { "name": "Boltgun", "points": 0, "compatibleUnitTypes": ["Battleline", "Character"] } }
  ],
  "requestId": "<request-id>"
}
```

La consulta por ID responde `200 OK` con `{ "weapon": { ... }, "requestId": "<request-id>" }`.

Actualizar un arma:

```bash
curl -X PUT http://localhost:3000/api/weapons/1 \
  -H "Content-Type: application/json" \
  -d '{"points":5}'
```

Respuesta `200 OK` con `{ "weapon": { ... }, "requestId": "<request-id>" }` y `points` igual a `5`.

Eliminar un arma:

```bash
curl -i -X DELETE http://localhost:3000/api/weapons/1
```

Respuesta `204 No Content` sin cuerpo.

