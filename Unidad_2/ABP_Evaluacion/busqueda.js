/**
 * ALGORITMO DE BÚSQUEDA BINARIA:
 * La búsqueda binaria es un algoritmo eficiente para encontrar elementos
 * en un arreglo ordenado. Funciona dividiendo repetidamente el espacio
 * de búsqueda a la mitad.
 * 
 * Funcionamiento paso a paso:
 * 1. Comparar el elemento buscado con el elemento del medio
 * 2. Si son iguales, se encontró el elemento
 * 3. Si el buscado es menor, buscar en la mitad izquierda
 * 4. Si el buscado es mayor, buscar en la mitad derecha
 * 5. Repetir hasta encontrar el elemento o agotar el espacio de búsqueda
 */

/**
 * Busca un libro por su título usando búsqueda binaria.
 * Utiliza un arreglo de índices ordenados en lugar del arreglo original.
 * 
 * @param {Array} libros - Arreglo original de libros
 * @param {Array} indicesOrdenados - Arreglo de índices ordenados por título
 * @param {string} tituloBuscado - Título del libro a buscar
 * @returns {Object|null} El libro encontrado o null si no existe
 */
function buscarPorTitulo(libros, indicesOrdenados, tituloBuscado) {
    let izquierda = 0;
    let derecha = indicesOrdenados.length - 1;
    const tituloNormalizado = tituloBuscado.trim().toLowerCase();
    
    /**
     * Bucle principal de búsqueda binaria:
     * Mientras el espacio de búsqueda tenga elementos (izquierda <= derecha),
     * se calcula el punto medio y se compara con el título buscado.
     */
    while (izquierda <= derecha) {
        const medio = Math.floor(izquierda + (derecha - izquierda) / 2);
        
        const indiceLibro = indicesOrdenados[medio];
        
        const tituloActual = libros[indiceLibro].titulo.trim().toLowerCase();
        
        const comparacion = tituloActual.localeCompare(tituloNormalizado, 'es');
        
        if (comparacion === 0) {
            return libros[indiceLibro];
        } else if (comparacion < 0) {
            izquierda = medio + 1;
        } else {
            derecha = medio - 1;
        }
    }
    return null;
}

/**
 * Busca múltiples libros por sus títulos.
 * Función auxiliar para búsquedas por lotes.
 */
function buscarVariosTitulos(libros, indicesOrdenados, titulos) {
    return titulos.map(titulo => buscarPorTitulo(libros, indicesOrdenados, titulo));
}

module.exports = { buscarPorTitulo, buscarVariosTitulos };
