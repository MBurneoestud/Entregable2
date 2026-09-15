# Entregable 1

## Descripción
 Repositorio para el Entregable 1: Laboratorio de Intenciones Tipadas

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
- El programa se limita a texto
- El programa se limita a ejecucion desde la terminal 
- El programa se limitara a una sola faccion, Space Marines, para evitar complejidad excesiva
- El programa incluira 4 o 5 unidades de cada tipo, para evitar complejidad excesiva
- El programa incluira 4 o 5 armas por tipo de unidad, para evitar complejidad excesiva
- La lista tiene un valor maximo de 1,000 puntos y un valor minimo de 500 puntos, caso contrario se retorna un error
- La lista debe tener un nombre asignado por el usuario, , caso contrario se retorna un error
- La lista debera incluir una unidad de tipo personaje por defecto, , caso contrario se retorna un error
- Armas asignadas a unidades no compatibles generaran un error en el programa

## Criterios de Aceptacion
- El programa funciona inicialmente en Javascript, luego migrado a TypeScript
- El programa acepta inputs del usuario en la terminal

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
- **`IArmyList`**: Define la estructura completa de la lista de ejército, compuesta por otras interfaces

### Tipos de Arreglo
- **`Weapon[]`**: Arreglo de objetos Weapon
- **`Unit[]`**: Arreglo de objetos Unit
- **`string[]`**: Arreglo de strings (palabras clave, tipos compatibles)

### Tipos de Unión
- **`ArmyList | null`**: Utilizado para propiedades que pueden ser null antes de inicialización

### Tipos Promise
- **`Promise<string>`**: Métodos asíncronos que retornan strings
- **`Promise<void>`**: Métodos asíncronos que no retornan valores
- **`Promise<number>`**: Métodos asíncronos que retornan números

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
Este comando compila el código TypeScript a JavaScript, generando la carpeta `dist/` con los archivos compilados, mapas de fuente y declaraciones de tipos.

### Ejecución del Programa
```bash
npm start
```
Este comando ejecuta el programa compilado desde la carpeta `dist/`.

### Modo de Desarrollo
```bash
npm run dev
```
Este comando compila el proyecto y lo ejecuta inmediatamente. Útil para realizar cambios y probarlos rápidamente.

## Funcionamiento del Programa

### Inicio del Programa
Al ejecutar el programa, se muestra un menú principal con las siguientes opciones:
- Crear una lista de ejército con un nombre asignado por el usuario
- Visualizar información sobre la facción (Space Marines), límites de puntos (500-1,000), y palabras clave disponibles

### Funciones Principales

#### 1. Agregar Unidad
- El usuario puede seleccionar unidades disponibles de la facción Space Marines
- El programa verifica si la unidad puede agregarse según los límites de palabras clave
- Cada unidad tiene un valor de puntos base y puede equiparse con armas
- Las unidades disponibles incluyen: Intercessor Squad, Terminator Squad, Captain, Dreadnought, entre otras

#### 2. Agregar Arma a Unidad
- El usuario selecciona una unidad de su lista actual
- El programa muestra las armas disponibles compatibles con esa unidad
- Solo se pueden agregar armas que sean compatibles con el tipo de unidad (por ejemplo, ciertas armas solo funcionan con vehículos o infantería)
- Cada arma tiene un valor de puntos que se suma al total de la unidad

#### 3. Eliminar Unidad
- El usuario puede eliminar una unidad de su lista de ejército
- Esto reduce el total de puntos y libera los límites de palabras clave

#### 4. Eliminar Arma de Unidad
- El usuario puede eliminar armas equipadas de una unidad específica
- Esto reduce el valor total de puntos de la unidad

#### 5. Filtrar Unidades por Palabra Clave
- Permite buscar unidades por tipo: Infantería, Batallón, Montado, Vehículo, Personaje
- Muestra todas las unidades disponibles con esa palabra clave específica

#### 6. Ordenar Unidades por Puntos
- Ordena las unidades disponibles de menor a mayor valor de puntos
- También permite ordenar de mayor a menor valor de puntos

#### 7. Validar Lista
- Verifica si la lista cumple con los criterios de aceptación:
  - **Nombre asignado**: La lista debe tener un nombre
  - **Rango de puntos**: Total entre 500 y 1,000 puntos
  - **Unidad de personaje**: Debe incluir al menos 1 unidad tipo Character
- Muestra mensajes de error si la lista no es válida

### Reglas de Validación
- El valor total de puntos debe estar entre 500 y 1,000
- La lista debe contener al menos una unidad de tipo Character (personaje)
- Las armas solo pueden asignarse a unidades compatibles
- Existen límites máximos por palabra clave (por ejemplo, máximo 2 vehículos, 1 personaje)

### Salida del Programa
- La opción "Exit" cierra el programa y termina la ejecución

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
- **Chainsword**: Compatible con Battleline, Character, Mounted
- **Power Sword**: Compatible con Battleline, Character, Infantry
- **Lightning Claws**: Compatible con Infantry, Character

#### Armas de Combate Lejano
- **Plasma Pistol**: Compatible con Infantry, Battleline, Character
- **Meltagun**: Compatible con Infantry, Character
- **Plasma Gun**: Compatible con Infantry
- **Flamer**: Compatible con Infantry, Battleline

#### Armas Pesadas
- **Heavy Bolter**: Compatible con Infantry, Battleline, Mounted
- **Autocannon**: Compatible con Infantry

#### Armas de Vehículo
- **Twin Heavy Bolter**: Compatible con Vehicle
- **Multi-Melta**: Compatible con Vehicle, Mounted
- **Heavy Plasma Cannon**: Compatible con Vehicle
- **Assault Cannon**: Compatible con Vehicle
- **Twin Lascannon**: Compatible con Vehicle

#### Armas de Unidades Montadas
- **Onslaught Gattling Cannon**: Compatible con Mounted
- **Twin Bolt Rifle**: Compatible con Mounted

### Ejemplos Prácticos
- Un **Intercessor Squad** (Battleline) puede equipar Boltgun, Chainsword, Power Sword
- Un **Terminator Squad** (Infantry) puede equipar Plasma Gun, Meltagun, Lightning Claws
- Un **Captain** (Character) puede equipar Boltgun, Power Sword, Meltagun
- Un **Dreadnought** (Vehicle) solo puede equipar armas de vehículo (Twin Heavy Bolter, Assault Cannon, etc.)
- Un **Outrider Squad** (Mounted) puede equipar Bolt Pistol, Chainsword, Heavy Bolter, Onslaught Gattling Cannon

### Validación en el Programa
El programa automáticamente:
1. Muestra solo las armas compatibles cuando se selecciona una unidad
2. Bloquea intentos de equipar armas incompatibles
3. Muestra un mensaje de error si se intenta una equipación inválida

