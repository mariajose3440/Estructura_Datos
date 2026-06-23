// Definición de la clase Pila (corregida)
class Pila {
    constructor() {
        this.Pila = [];
    }

    push(elemento) {
        this.Pila.push(elemento);
        return this.Pila;
    }

    pop() {
        return this.Pila.pop();  // Corregido: antes usaba this.stack
    }

    peek() {
        return this.Pila[this.Pila.length - 1];
    }

    size() {
        return this.Pila.length; // Corregido: antes usaba this.stack
    }

    print() {
        console.log(this.Pila);
    }
}

/**
 * Pila de platos en un restaurante:
 * cuando un cliente pide un plato de comida.
 * el chef coje el ulitmo plato que se lavo.
 */
function simularRestaurante() {
    const pilaPlatos = new Pila();

    console.log("El chef lava 3 platos...");
    pilaPlatos.push("Plato 1");
    pilaPlatos.push("Plato 2");
    pilaPlatos.push("Plato 3");
    console.log("Pila actual:");
    pilaPlatos.print();

    console.log("\nCliente 1 pide un plato.");
    const platoCliente1 = pilaPlatos.pop();
    console.log(`El chef toma: ${platoCliente1}`);
    console.log("Pila restante:");
    pilaPlatos.print();

    console.log("\nEl chef lava un plato más.");
    pilaPlatos.push("Plato 4");
    console.log("Pila actual:");
    pilaPlatos.print();

    console.log("\nCliente 2 pide un plato.");
    const platoCliente2 = pilaPlatos.pop();
    console.log(`El chef toma: ${platoCliente2}`);
    console.log("Pila restante:");
    pilaPlatos.print();

    console.log("\nEl siguiente plato disponible es:", pilaPlatos.peek());
    console.log("Tamaño de la pila:", pilaPlatos.size());
}

// Ejecutar la simulación
simularRestaurante();