/**
 * colaCircular.js
 * Implementación de una Cola Circular (Circular Queue) para gestionar
 * las solicitudes de préstamo de libros en la biblioteca.
 * 
 * Estructura de cada solicitud:
 * {
 *   idLector: number,
 *   nombreLector: string,
 *   idLibro: number,
 *   fechaSolicitud: Date
 * }
 */

class ColaCircular {

    constructor(capacidad) {
        this.capacidad = capacidad + 1;
        this.arreglo = new Array(this.capacidad);
        this.frente = 0;
        this.final = 0;
        this.tamano = 0;
    }
    estaVacia() {
        return this.frente === this.final;
    }
    estaLlena() {
        return (this.final + 1) % this.capacidad === this.frente;
    }
    
    /**
     * Agrega un elemento al final de la cola.
     * Operación también conocida como "enqueue".
     */
    encolar(solicitud) {
        if (this.estaLlena()) {
            return false;
        }
        this.arreglo[this.final] = solicitud;
        this.final = (this.final + 1) % this.capacidad;
        this.tamano++;
        
        return true;
    }
    
    /**
     * Elimina y retorna el primer elemento de la cola.
     * Operación también conocida como "dequeue".
     */
    desencolar() {
        if (this.estaVacia()) {
            return null;
        }
        const solicitud = this.arreglo[this.frente];
        this.arreglo[this.frente] = undefined;
        this.frente = (this.frente + 1) % this.capacidad;
        this.tamano--;
        
        return solicitud;
    }
    
    /**
     * Obtiene el primer elemento sin eliminarlo.
     * Operación también conocida como "peek" o "front".
     */
    verFrente() {
        if (this.estaVacia()) {
            return null;
        }
        return this.arreglo[this.frente];
    }
    
    obtenerTamano() {
        return this.tamano;
    }
    
    /**
     * Obtiene todos los elementos de la cola en orden (del frente al final).
     */
    obtenerElementos() {
        const elementos = [];
        let indice = this.frente;
        
        while (indice !== this.final) {
            elementos.push(this.arreglo[indice]);
            indice = (indice + 1) % this.capacidad;
        }
        
        return elementos;
    }
    
    /**
     * Representación en string de la cola para debugging.\
     */
    toString() {
        if (this.estaVacia()) {
            return "Cola vacía";
        }
        const elementos = this.obtenerElementos();
        return `[${elementos.map(s => `${s.nombreLector}(Libro:${s.idLibro})`).join(", ")}]`;
    }
}

module.exports = ColaCircular;
