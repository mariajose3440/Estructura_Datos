/**
 * mergeSort.js
 * Implementación del algoritmo MergeSort recursivo para ordenamiento de libros.
 * 
 * Complejidad temporal: O(n log n) en todos los casos
 * Complejidad espacial: O(n) para el arreglo auxiliar
 */

/**
 * Combina dos subarreglos ordenados en uno solo ordenado.
 * Esta función es el núcleo del algoritmo MergeSort.
 */
function mezclar(libros, indices, inicio, medio, fin, arregloAuxiliar) {
    let indiceIzquierdo = inicio;
    let indiceDerecho = medio + 1;
    let indiceAuxiliar = inicio;
    
    for (let i = inicio; i <= fin; i++) {
        arregloAuxiliar[i] = indices[i];
    }
    
    while (indiceIzquierdo <= medio && indiceDerecho <= fin) {
        const tituloIzquierdo = libros[arregloAuxiliar[indiceIzquierdo]].titulo;
        const tituloDerecho = libros[arregloAuxiliar[indiceDerecho]].titulo;
        

        if (tituloIzquierdo.localeCompare(tituloDerecho, 'es') <= 0) {
            indices[indiceAuxiliar] = arregloAuxiliar[indiceIzquierdo];
            indiceIzquierdo++;
        } else {
            indices[indiceAuxiliar] = arregloAuxiliar[indiceDerecho];
            indiceDerecho++;
        }
        indiceAuxiliar++;
    }
    
    // Copiar elementos restantes del subarreglo izquierdo (si quedan)
    while (indiceIzquierdo <= medio) {
        indices[indiceAuxiliar] = arregloAuxiliar[indiceIzquierdo];
        indiceIzquierdo++;
        indiceAuxiliar++;
    }
    
}

/**
 * Función recursiva principal de MergeSort.
 * 
 * Funcionamiento recursivo:
 * 1. Si inicio < fin (hay más de un elemento):
 *    a. Calcular el punto medio
 *    b. Llamar recursivamente para la mitad izquierda
 *    c. Llamar recursivamente para la mitad derecha
 *    d. Mezclar ambas mitades ordenadas
 */
function mergeSortRecursivo(libros, indices, inicio, fin, arregloAuxiliar) {

    if (inicio < fin) {
        const medio = Math.floor(inicio + (fin - inicio) / 2);
        
        mergeSortRecursivo(libros, indices, inicio, medio, arregloAuxiliar);
        
        mergeSortRecursivo(libros, indices, medio + 1, fin, arregloAuxiliar);
        
        mezclar(libros, indices, inicio, medio, fin, arregloAuxiliar);
    }
}

/**
 * Función pública que inicia el proceso de ordenamiento.
 * Crea un arreglo de índices y lo ordena en lugar de modificar el arreglo original.
 */
function ordenarLibros(libros) {
    const indices = Array.from({ length: libros.length }, (_, i) => i);
    
    const arregloAuxiliar = new Array(libros.length);
    
    mergeSortRecursivo(libros, indices, 0, libros.length - 1, arregloAuxiliar);
    
    return indices;
}

module.exports = { ordenarLibros, mergeSortRecursivo };
