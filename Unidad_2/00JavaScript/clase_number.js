/**
 * JavaScript no es muy fuerte a nivel numerico
 * @author bluebul
 */

//-----Tipos de datos numericos-----

// enteros y decimal:

const entero =42;
const decimal = 3.14;
console.log(typeof entero, typeof decimal)

//Notacion científica:
const científico = 5e3;

//Representación de otros contextos:
const infinito = Infinity;
const noEsUnNUmero = NaN;

//Operaciones Aritmeticas:

//Sumas Restas Division:

const suma = 3 + 4;
const resta = 4 - 4;
const division = 10 / 2;

//Modulos de exponenciación:
const modulo = 15 % 8;

//Resultado de presicion:
const exponenciación = 0.1 + 0.2;
console.log(exponenciación);
console.log(exponenciación.toFixed(1));

/**
 * Math tiene funciones de raiz, abs, numeros random
 */
const raizcuadrada = Math.sqrt(16);
const valorAbsoluto = Math.abs(-7);
const aleatorio = Math.random();

console.log(raizcuadrada);
console.log(valorAbsoluto);
console.log(aleatorio);