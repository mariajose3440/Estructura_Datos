/**
 * @author bluebul (María José Rodríguez Saraguro)
 */

/**
 * Write a code that will create variables and initialize them with values of Boolean, Number, BigInt, String, and undefined types using 
 * (when possible) literals and constructor functions.
 * 
 * Escribe código que cree variables y las inicialice con valores de los tipos Boolean, Number, BigInt, String y undefined, 
 * utilizando (cuando sea posible) literales y funciones constructoras.
*/

// ------ Boolean =====
let boolLiteral = true;              
let boolConstructor = new Boolean(false); 

// ===== Number =====
let numLiteral = 42;                 
let numConstructor = new Number(3.14); 

// ===== BigInt =====
let bigIntLiteral = 123456789012345678901234567890n; 
let bigIntConstructor = BigInt(999999999999999999);  

// ===== String =====
let strLiteral = "Hola mundo";       
let strConstructor = new String("Adiós mundo"); 

// ===== undefined =====
let undefinedVar;                    
let undefinedExplicit = undefined;   

/**
 * Imprime todos los valores y sus tipos utilizando `console.log`. Intenta usar interpolación de cadenas para mostrar el valor y el tipo 
 * simultáneamente en una sola llamada a `console.log`, por ejemplo, con el siguiente formato: `1000 [number]`.
 */
// ===== Verificación de tipos =====
console.log(`${boolLiteral} [${typeof boolLiteral}]`);
console.log(`${boolConstructor} [${typeof boolConstructor}]`);

console.log(`${numLiteral} [${typeof numLiteral}]`);
console.log(`${numConstructor} [${typeof numConstructor}]`);

console.log(`${bigIntLiteral} [${typeof bigIntLiteral}]`);
console.log(`${bigIntConstructor} [${typeof bigIntConstructor}]`);

console.log(`${strLiteral} [${typeof strLiteral}]`);
console.log(`${strConstructor} [${typeof strConstructor}]`);

console.log(`${undefinedVar} [${typeof undefinedVar}]`);
console.log(`${undefinedExplicit} [${typeof undefinedExplicit}]`);

/**
 * Carry out a chain of conversions: create a Boolean from a BigInt created from a Number that was created from a String. 
 * Start with the value "1234". Is it possible?
 */
const cadena = "1234";
const numero = Number(cadena);   // 1234 (Number)
const bigInt = BigInt(numero);   // 1234n (BigInt)
const booleano = Boolean(bigInt); // true (Boolean)

console.log(booleano); // true


// ===== Boolean + Boolean =====
let bool1 = true;
let bool2 = false;
let boolSum = bool1 + bool2; // el operador + convierte los booleanos a número
console.log(`${bool1} + ${bool2} = ${boolSum} [${typeof boolSum}]`);

// ===== Number + Number =====
let num1 = 10;
let num2 = 32;
let numSum = num1 + num2;
console.log(`${num1} + ${num2} = ${numSum} [${typeof numSum}]`);

// ===== BigInt + BigInt =====
let big1 = 100n;
let big2 = 200n;
let bigSum = big1 + big2;
console.log(`${big1} + ${big2} = ${bigSum} [${typeof bigSum}]`);

// ===== String + String =====
let str1 = "Hola";
let str2 = " mundo";
let strSum = str1 + str2; // concatenación
console.log(`${str1} + ${str2} = ${strSum} [${typeof strSum}]`);

// ===== undefined + undefined =====
let undef1 = undefined;
let undef2 = undefined;
let undefSum = undef1 + undef2; // NaN, porque undefined se convierte a NaN en operaciones aritméticas
console.log(`${undef1} + ${undef2} = ${undefSum} [${typeof undefSum}]`);


/**
 * Prueba a sumar dos valores de tipos diferentes y comprueba los resultados.
 */
// ===== Boolean + Number =====
let r1 = true + 10;
console.log(`true + 10 = ${r1} [${typeof r1}]`);

// ===== Boolean + String =====
let r2 = true + "hola";
console.log(`true + "hola" = ${r2} [${typeof r2}]`);

// ===== Number + String =====
let r3 = 42 + "42";
console.log(`42 + "42" = ${r3} [${typeof r3}]`);

// ===== String + Boolean =====
let r4 = "resultado: " + false;
console.log(`"resultado: " + false = ${r4} [${typeof r4}]`);

// ===== Number + undefined =====
let r5 = 10 + undefined;
console.log(`10 + undefined = ${r5} [${typeof r5}]`);

// ===== String + undefined =====
let r6 = "valor: " + undefined;
console.log(`"valor: " + undefined = ${r6} [${typeof r6}]`);

// ===== Boolean + undefined =====
let r7 = true + undefined;
console.log(`true + undefined = ${r7} [${typeof r7}]`);

// ===== String + BigInt =====
let r8 = "número grande: " + 100n;
console.log(`"número grande: " + 100n = ${r8} [${typeof r8}]`);

// ===== Number + BigInt (lanza error) =====
try {
  let r9 = 10 + 100n;
  console.log(`10 + 100n = ${r9} [${typeof r9}]`);
} catch (error) {
  console.log(`10 + 100n → Error: ${error.message}`);
}

// ===== Boolean + BigInt (lanza error) =====
try {
  let r10 = true + 100n;
  console.log(`true + 100n = ${r10} [${typeof r10}]`);
} catch (error) {
  console.log(`true + 100n → Error: ${error.message}`);
}

// ===== BigInt + undefined (lanza error) =====
try {
  let r11 = 100n + undefined;
  console.log(`100n + undefined = ${r11} [${typeof r11}]`);
} catch (error) {
  console.log(`100n + undefined → Error: ${error.message}`);
}

/**
 * Try to modify the line const str1 = 42 + "1"; to get the result 43 (without removing the quotes around 1).
 */

// Opción 1: operador unario +
const str1 = 42 + +"1";
console.log(`${str1} [${typeof str1}]`);

// Opción 2: función Number()
const str2 = 42 + Number("1");
console.log(`${str2} [${typeof str2}]`);

// Opción 3: parseInt()
const str3 = 42 + parseInt("1");
console.log(`${str3} [${typeof str3}]`);