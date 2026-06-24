
console.log("--------------------------------------------------")
console.log("SECCION 1: Calentamiento Numérico (Nivel Basico)");
console.log("--------------------------------------------------")

/**
 * 
 * Ejercicio 1.1: Suma de digitos de un Número.
 */

function sumaDigitos(n) {
  // CASO BASE: Si el número es menor a 10 (un solo dígito), 
  // ya no se puede descomponer más; se retorna el mismo número.
  if (n < 10) {
    return n;
  }

  // CASO RECURSIVO: Extraemos el último dígito con n % 10
  // y lo sumamos al resultado de procesar el resto del número (Math.floor(n / 10)).
  const ultimoDigito = n % 10;
  const numeroRestante = Math.floor(n / 10);

  return ultimoDigito + sumaDigitos(numeroRestante);
}

// Casos de prueba para validación
console.assert(sumaDigitos(1243) === 10, "Error en sumaDigitos(1243)");
console.assert(sumaDigitos(0) === 0, "Error en sumaDigitos(0)");
console.assert(sumaDigitos(9) === 9, "Error en sumaDigitos(9)");
console.log("--------------------------------------------------");
console.log("Ejercicio 1.1 superado.");
console.log("--------------------------------------------------");

/**
 * 
 * Ejercicio 1.2: Potencia Recursiva.
 */

function potencia(base, exponente) {
  // CASO BASE: Cualquier número elevado a la 0 es 1 (según la fórmula: si n = 0)
  if (exponente === 0) {
    return 1;
  }

  // CASO RECURSIVO: Calculamos la potencia de la mitad del exponente (n/2 o (n-1)/2)
  // Se usa Math.floor para que funcione correctamente con números impares.
  const mitad = potencia(base, Math.floor(exponente / 2));

  // Si el exponente es PAR: (base^(n/2))^2
  if (exponente % 2 === 0) {
    return mitad * mitad;
  } 
  // Si el exponente es IMPAR: base * (base^((n-1)/2))^2
  else {
    return base * mitad * mitad;
  }
}

// Casos de prueba para validación
let miLista = [10, 20, 30, 40, 50];
invertirArreglo(miLista, 0, miLista.length - 1);
console.assert(JSON.stringify(miLista) === JSON.stringify([50, 40, 30, 20, 10]));
console.log("--------------------------------------------------");
console.log("Ejercicio 1.2 superado.");
console.log("--------------------------------------------------");

console.log("--------------------------------------------------");
console.log("SECCION 2: Recursividad en Estructuras Lineales (Nivel Intermedio)");
console.log("--------------------------------------------------");

/**
 * 
 * Ejercicio 2.1: Inversión de un Arreglo (In-PLace)
 */

function invertirArreglo(arr, inicio, fin) {
  // CASO BASE: Si el índice de inicio alcanza o supera al de fin, 
  // ya hemos invertido todos los extremos posibles. Detenemos la recursión.
  if (inicio >= fin) {
    return;
  }

  // CASO RECURSIVO: Intercambio de elementos (In-Place) usando asignación por desestructuración
  const temporal = arr[inicio];
  arr[inicio] = arr[fin];
  arr[fin] = temporal;

  // Invocación recursiva: Movemos los punteros hacia el centro
  invertirArreglo(arr, inicio + 1, fin - 1);
}

// Casos de prueba para validación
let miLista2 = [10, 20, 30, 40, 50];
invertirArreglo(miLista2, 0, miLista2.length - 1);
console.assert(JSON.stringify(miLista2) === JSON.stringify([50, 40, 30, 20, 10]));
console.log("--------------------------------------------------");
console.log("Ejercicio 2.1 superado.");
console.log("--------------------------------------------------");

/**
 * 
 * Ejercicio 2.2: Búsqueda Binaria Recursiva.
 */

function busquedaBinariaRecursiva(arr, objetivo, bajo, alto) {
  // CASO BASE 1: El rango de búsqueda es inválido (los punteros se cruzaron).
  // Significa que el elemento no existe en el arreglo.
  if (bajo > alto) {
    return -1;
  }

  // Calcular el punto medio truncando a entero con Math.floor()
  const medio = Math.floor((bajo + alto) / 2);

  // CASO BASE 2: El elemento en el medio es el objetivo. ¡Lo encontramos!
  if (arr[medio] === objetivo) {
    return medio;
  }

  // CASOS RECURSIVOS: Reducir el espacio de búsqueda a la mitad
  // Si el objetivo es menor que el valor del medio, buscamos en la mitad izquierda
  if (objetivo < arr[medio]) {
    return busquedaBinariaRecursiva(arr, objetivo, bajo, medio - 1);
  } 
  // Si el objetivo es mayor, buscamos en la mitad derecha
  else {
    return busquedaBinariaRecursiva(arr, objetivo, medio + 1, alto);
  }
}
// Casos de prueba para validación
const datosOrdenados = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.assert(busquedaBinariaRecursiva(datosOrdenados, 23, 0, 9) === 5);
console.assert(busquedaBinariaRecursiva(datosOrdenados, 100, 0, 9) === -1);
console.log("--------------------------------------------------");
console.log("Ejercicio 2.2 superado.");
console.log("--------------------------------------------------");

console.log("--------------------------------------------------");
console.log("SECCION 3: Estructuras No Lineales y Algoritmos Avanzados (Nivel Avanzado)");
console.log("--------------------------------------------------");

/**
 * 
 * Ejercicio 3.1: Recorridos de Árboles Binarios.
 */

class NodoArbol {
  constructor(valor) {
    this.valor = valor;
    this.izquierdo = null;
    this.derecho = null;
  }
}

// 1. INORDEN: Izquierdo -> Raíz -> Derecho
function recorridoInorden(raiz) {
  // CASO BASE: Si el nodo es nulo, retornamos un arreglo vacío
  if (raiz === null) {
    return [];
  }

  // CASO RECURSIVO: Concatenamos el recorrido izquierdo, la raíz y el derecho
  return [
    ...recorridoInorden(raiz.izquierdo),
    raiz.valor,
    ...recorridoInorden(raiz.derecho)
  ];
}

// 2. PREORDEN: Raíz -> Izquierdo -> Derecho
function recorridoPreorden(raiz) {
  // CASO BASE: Si el nodo es nulo, retornamos un arreglo vacío
  if (raiz === null) {
    return [];
  }

  // CASO RECURSIVO: La raíz va primero, luego el subárbol izquierdo y el derecho
  return [
    raiz.valor,
    ...recorridoPreorden(raiz.izquierdo),
    ...recorridoPreorden(raiz.derecho)
  ];
}

// 3. POSTORDEN: Izquierdo -> Derecho -> Raíz
function recorridoPostorden(raiz) {
  // CASO BASE: Si el nodo es nulo, retornamos un arreglo vacío
  if (raiz === null) {
    return [];
  }

  // CASO RECURSIVO: Procesamos los subárboles por completo y la raíz queda al final
  return [
    ...recorridoPostorden(raiz.izquierdo),
    ...recorridoPostorden(raiz.derecho),
    raiz.valor
  ];
}

// Construcción de un árbol de prueba:
//       3
//      / \
//     4   5
const miArbol = new NodoArbol(3);
miArbol.izquierdo = new NodoArbol(4);
miArbol.derecho = new NodoArbol(5);

// Pruebas en consola
console.log("Preorden:", recorridoPreorden(miArbol));   // Salida: [1, 2, 3]
console.log("Inorden:", recorridoInorden(miArbol));     // Salida: [2, 1, 3]
console.log("Postorden:", recorridoPostorden(miArbol)); // Salida: [2, 3, 1]

console.log("--------------------------------------------------");
console.log("SECCION 4: Depuración Mental (La Pila de Llamadas)");
console.log("--------------------------------------------------");

// ─────────────────────────────────────────────────────────────
//  PREGUNTA 4.1 – Árbol de llamadas de fibonacci(4)
// ─────────────────────────────────────────────────────────────

/**
 * Construye el árbol de llamadas de fibonacci de forma recursiva
 * y lo representa como un objeto de árbol para graficarlo.
 *
 * Caso Base  : n <= 1  → retorna n directamente, sin más llamadas.
 * Caso Recursivo: n > 1 → genera dos ramas: fib(n-1) y fib(n-2).
 */
function construirArbolLlamadas(n) {
  // Caso Base
  if (n <= 1) {
    return { etiqueta: `fib(${n})=${n}`, hijos: [] };
  }
  // Caso Recursivo
  const izquierdo = construirArbolLlamadas(n - 1);
  const derecho   = construirArbolLlamadas(n - 2);
  const valor     = izquierdo.valor + derecho.valor; // se calcula para mostrar el resultado
  return {
    etiqueta: `fib(${n})`,
    hijos: [izquierdo, derecho],
    valor,
  };
}

// Corregimos para que los nodos base también exporten su valor
function construirArbolLlamadasCorregido(n) {
  if (n <= 1) {
    return { etiqueta: `fib(${n})`, resultado: n, hijos: [] };
  }
  const izquierdo = construirArbolLlamadasCorregido(n - 1);
  const derecho   = construirArbolLlamadasCorregido(n - 2);
  const resultado = izquierdo.resultado + derecho.resultado;
  return { etiqueta: `fib(${n})`, resultado, hijos: [izquierdo, derecho] };
}

/**
 * Imprime el árbol en consola con indentación tipo "árbol ASCII".
 * @param {object} nodo   - nodo actual
 * @param {string} prefijo - prefijo acumulado de la rama
 * @param {boolean} esUltimo - indica si es el último hijo de su padre
 */
function imprimirArbol(nodo, prefijo = '', esUltimo = true) {
  const conector = esUltimo ? '└── ' : '├── ';
  const mostrar  = nodo.hijos.length === 0
    ? `${nodo.etiqueta} = ${nodo.resultado}  ← caso base`
    : `${nodo.etiqueta}`;

  console.log(prefijo + (prefijo === '' ? '' : conector) + mostrar);

  const prefijoHijo = prefijo + (prefijo === '' ? '' : esUltimo ? '    ' : '│   ');
  nodo.hijos.forEach((hijo, indice) => {
    const ultimo = indice === nodo.hijos.length - 1;
    imprimirArbol(hijo, prefijoHijo, ultimo);
  });
}

// También contamos cuántas veces se llama cada subproblema
function contarLlamadas(n, contador = {}) {
  const clave = `fib(${n})`;
  contador[clave] = (contador[clave] || 0) + 1;
  if (n <= 1) return contador;
  contarLlamadas(n - 1, contador);
  contarLlamadas(n - 2, contador);
  return contador;
}

console.log('═══════════════════════════════════════════════════════');
console.log('  PREGUNTA 4.1 – Árbol de llamadas de fibonacci(4)');
console.log('═══════════════════════════════════════════════════════\n');

const arbol = construirArbolLlamadasCorregido(4);
imprimirArbol(arbol);

console.log('\n── Frecuencia de llamadas por subproblema ──');
const llamadas = contarLlamadas(4);
Object.entries(llamadas)
  .sort((a, b) => b[1] - a[1])
  .forEach(([clave, valor]) => {
    const redundante = valor > 1 ? '  ← REDUNDANTE' : '';
    console.log(`  ${clave.padEnd(8)} : ${valor} vez/veces${redundante}`);
  });

console.log('\n── Subproblemas redundantes (calculados > 1 vez) ──');
Object.entries(llamadas)
  .filter(([, valor]) => valor > 1)
  .forEach(([clave, valor]) => console.log(`  ${clave} → calculado ${valor} veces`));

// ─────────────────────────────────────────────────────────────
//  PREGUNTA 4.3 – Factorial con Recursividad de Cola
// ─────────────────────────────────────────────────────────────

/**
 * factorialCola(n, acumulador)
 *
 * Implementación con RECURSIVIDAD DE COLA (Tail Recursion).
 * La llamada recursiva es la ÚLTIMA operación de la función;
 * no hay trabajo pendiente tras ella, por lo que el motor
 * puede reutilizar el mismo marco de pila (TCO).
 *
 * Caso Base      : n <= 1 → el acumulador ya contiene el resultado final.
 * Caso Recursivo : n > 1  → multiplica n al acumulador y llama con n-1.
 *                           La multiplicación ocurre ANTES de la llamada,
 *                           no después (eso es lo que la convierte en cola).
 *
 * @param {number} n           - número del que calcular el factorial
 * @param {number} acumulador  - acumula el producto parcial (default 1)
 * @returns {number}           - n!
 */
function factorialCola(n, acumulador = 1) {
  // ── Caso Base ────────────────────────────────────────────────
  // Cuando n llega a 0 o 1 ya no hay más multiplicaciones;
  // el acumulador contiene el resultado completo.
  if (n <= 1) return acumulador;

  // ── Caso Recursivo ───────────────────────────────────────────
  // Multiplicamos ANTES de la llamada (no después).
  // Esto garantiza que sea tail call: la función no necesita
  // conservar ningún estado propio al volver de la recursión.
  return factorialCola(n - 1, n * acumulador);
}

console.log('\n═══════════════════════════════════════════════════════');
console.log('  PREGUNTA 4.3 – Factorial con Recursividad de Cola');
console.log('═══════════════════════════════════════════════════════\n');

[0, 1, 5, 10, 15].forEach(n =>
  console.log(`  factorialCola(${n}) = ${factorialCola(n)}`)
);

console.log('\n  Traza de factorialCola(5):');
function factorialColaTraced(n, acc = 1, depth = 0) {
  const indent = '  ' + '  '.repeat(depth);
  console.log(`${indent}factorialCola(${n}, acc=${acc})`);
  if (n <= 1) {
    console.log(`${indent}→ caso base, retorna ${acc}`);
    return acc;
  }
  return factorialColaTraced(n - 1, n * acc, depth + 1);
}
factorialColaTraced(5);
