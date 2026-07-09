
const NodoTrie = require('./NodoTrie');

class MotorAutocompletado {
    constructor() {
        this.raiz = new NodoTrie();
    }

    // Inserción eficiente: solo se crean nodos para caracteres presentes
    insertarTermino(termino) {
        let actual = this.raiz;
        const palabra = termino.toLowerCase();
        for (const char of palabra) {
            if (!actual.hijos.has(char)) {
                actual.hijos.set(char, new NodoTrie());
            }
            actual = actual.hijos.get(char);
        }
        actual.esFinDePalabra = true;
    }

    buscarNodoPrefijo(prefijo) {
        let actual = this.raiz;
        const p = prefijo.toLowerCase();

        for (const char of p) {
            if (!actual.hijos.has(char)) return null;
            actual = actual.hijos.get(char);
        }
        return actual;
    }

    obtenerSugerencias(prefijo) {
        const resultados = [];
        const nodoInicial = this.buscarNodoPrefijo(prefijo);
        if (nodoInicial) {
            this.dfsExtraerPalabras(nodoInicial, prefijo.toLowerCase(), resultados);
        }
        return resultados;
    }

    // DFS Optimizado para evitar desbordamiento de pila y fugas de memoria
    dfsExtraerPalabras(nodo, palabraActual, resultados) {
        if (nodo.esFinDePalabra) resultados.push(palabraActual);

        for (const [char, hijo] of nodo.hijos) {
            this.dfsExtraerPalabras(hijo, palabraActual + char, resultados);
        }
    }
}

module.exports = MotorAutocompletado;