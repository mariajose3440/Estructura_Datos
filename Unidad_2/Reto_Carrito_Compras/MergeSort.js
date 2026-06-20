/**
 * Función mergeSort (independiente y reutilizable)
 * Ordena un arreglo de objetos según una propiedad numérica, de mayor a menor.
 * 
 * @param {Object[]} arr - Arreglo a ordenar
 * @param {string} key - Propiedad numérica por la cual ordenar
 * @returns {Object[]} Nuevo arreglo ordenado descendentemente
 */
function mergeSort(arr, key) {
  // Caso base: si el arreglo tiene 1 o 0 elementos, ya está ordenado
  if (arr.length <= 1) {
    return arr;
  }

  // Dividir en mitades
  const mitad = Math.floor(arr.length / 2);
  const izquierda = arr.slice(0, mitad);
  const derecha = arr.slice(mitad);

  // Ordenar recursivamente cada mitad
  const izqOrdenada = mergeSort(izquierda, key);
  const derOrdenada = mergeSort(derecha, key);

  // Combinar (merge) las mitades ordenadas
  return merge(izqOrdenada, derOrdenada, key);
}

/**
 * Función auxiliar para combinar dos arreglos ordenados descendentemente.
 */
function merge(izquierda, derecha, key) {
  const resultado = [];
  let i = 0; // índice para izquierda
  let j = 0; // índice para derecha

  // Comparar elementos y agregar el mayor primero (descendente)
  while (i < izquierda.length && j < derecha.length) {
    if (izquierda[i][key] >= derecha[j][key]) {
      resultado.push(izquierda[i]);
      i++;
    } else {
      resultado.push(derecha[j]);
      j++;
    }
  }

  // Agregar los elementos restantes
  while (i < izquierda.length) {
    resultado.push(izquierda[i]);
    i++;
  }
  while (j < derecha.length) {
    resultado.push(derecha[j]);
    j++;
  }

  return resultado;
}

// Exportación para Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = mergeSort;
}