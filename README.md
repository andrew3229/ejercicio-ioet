# Coincidencia de Horario entre trabajadores --- Ejercicio Ioet

_Ejercicio para obtener las coincidencias entre pares de trabajadores que han estado en la oficina dentro del mismo horario_

## Ejercicio 
El ejercicio fue desarrollado en el lenguaje de programación de TypeScript y se utilizó Jest para la realización de pruebas unitarias, se solicitó que a partir de un archivo .txt obtener una tabla que contenga los pares de empleados y la frecuencia con la que han coincidido en la oficina a partir de los siguientes datos de entrada.

```
RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00- 21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
```

La información que se debe obtener como resultado es la siguiente

```
ASTRID-RENE: 2
ASTRID-ANDRES: 3
RENE-ANDRES: 2
```

## Visión general del ejercicio
Para el desarrollo del ejercicio se utilizó el patrón de arquitectura modelo vista controlador, la estructura del proyecto se realizó dentro de la carpeta "src" donde encontramos la carpeta "components" en la que se encuentra tres archivos principales:
```
* lectorArchivoTxt -----> raliza la lectura del archivo .txt y retornar su información.
* validadorArchivo -----> realiza las validaciones de formato de horas y minutos, 
la estructura de información del trabajador,los días del trabajador,
los saltos de línea y espacios vacíos, retornando un arreglo con información validada. 
* comprobamosCoincidenciaHorario -----> es el archivo principal donde se realiza la comprobación de 
coincidencias entre dos trabajadores y sus coincidencias de días y horas en la oficina.
```
En "src" también encontramos las carpetas de
```
* dist -----> es la ubicación del archivo .txt
* test -----> las pruebas unitarias del archivo "validadorArchivo"
* utils -----> información general que podemos utilizar en diferentes archivos
```
El archivo de ejecución se encuentra en la carpeta "src" con el nombre de "index.ts" el cual conecta todos los archivos para la ejecución.

## Requisitos
Tener instalado previamente node.js y TypeScript, en caso de no tener instalado TypeScript, ejecutar los siguientes comandos desde consola en su carpeta del archivo 
```
npi i typescript
npm i -g ts-node
```
## Ejecutar el programa
Debemos ingresar a la carpeta "src" y ejecutamos el archivo index.ts con el siguiente comando 
```
ts-node index.ts
```
En caso de querer modificar la estructura de entrada del archivo .txt, debemos ingresar a la carpeta "dist" y modificar el contenido forma directa.
## Ejecutar las pruebas
Podemos ejecutar las pruebas desde la carpeta raiz del programa o ingresando desde la carpeta "src", se puede ejecutar de forma general, con el siguiente comando
```
npm run test
```

## Autor
👨 Andrés Camacho`

