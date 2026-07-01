class NodoBusqueda{
    constructor (keyword, urlCache){
        this.keyword = keyword;
        this.urlCache = urlCache;
        this.visitas = 1;
        this.izquierdo = null;
        this.derecho = null;

    }
}

class MotorIndexacionBST {

    constructor(){
        this.raiz = null;
    }

    //Indezar nueva consulta en el historial

    indexar(keyword,urlCache){
        const nuevoNodo = new NodoBusqueda(keyword, urlCache);
        if(this.raiz == null){
            this.raiz = nuevoNodo;
            return;
        }

        let actual = this.raiz;
        while(true){
            if (keyword === actual.keyword){
                actual.visitas++;
                return;
            }else if (keyword < actual.keyword){
                if(actual.izquierdo ===null){
                    actual.izquierdo = nuevoNodo;
                    return;
                }
                actual = actual.izquierdo;
            }else{
                if(actual.derecho === null){
                    actual.derecho = nuevoNodo;
                    return;
                }
            }
        }
    }

    insertarNodo(nodoActual, nuevoNodo) {
        const comparacion = nuevoNodo.keyword.localeCompare(nodoActual.keyword);
        
        if (comparacion === 0) {
            // La palabra clave ya existe: solo incrementamos el contador de visitas
            nodoActual.visitas += 1;
            return nodoActual;
        } else if (comparacion < 0) {
            // nuevoNodo va alfabéticamente antes -> subárbol izquierdo
            if (nodoActual.izquierda === null) {
                nodoActual.izquierda = nuevoNodo;
            } else {
                this.insertarNodo(nodoActual.izquierda, nuevoNodo);
            }
        } else {
            // nuevoNodo va alfabéticamente después -> subárbol derecho
            if (nodoActual.derecha === null) {
                nodoActual.derecha = nuevoNodo;
            } else {
                this.insertarNodo(nodoActual.derecha, nuevoNodo);
            }
        }

        return nodoActual;
    }
}