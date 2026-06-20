/**
 * Clase Carrito
 * Representa el carrito de compras de un cliente.
 * Responsabilidades:
 * - Almacenar los ítems seleccionados (instancias de ItemCarrito).
 * - Agregar productos usando una pila (LIFO) mediante push().
 * - Quitar el último producto agregado con pop().
 * - Permitir eliminar cualquier producto por su identificador.
 * - Mostrar el contenido actual del carrito.
 */
class Carrito {
  /**
   * @param {string} idCarrito - Identificador único del carrito
   */
  constructor(idCarrito) {
    if (!idCarrito) {
      throw new Error("El carrito requiere un idCarrito.");
    }
    this.idCarrito = idCarrito;
    /** @type {ItemCarrito[]} Pila de ítems (el último agregado está al final) */
    this.items = [];
  }

  /**
   * Agrega un ítem al carrito (comportamiento LIFO: se apila al final).
   * Si el producto ya existe en el carrito, se incrementa su cantidad.
   * @param {ItemCarrito} nuevoItem - Instancia de ItemCarrito
   */
  agregarProducto(nuevoItem) {
    // Verificar si el producto ya está en el carrito
    const itemExistente = this.items.find(
      item => item.producto.idProducto === nuevoItem.producto.idProducto
    );

    if (itemExistente) {
      // Si ya existe, aumentamos la cantidad en lugar de duplicar el ítem
      itemExistente.aumentarCantidad(nuevoItem.cantidad);
    } else {
      // Si no existe, lo apilamos (push = LIFO)
      this.items.push(nuevoItem);
    }
  }

  /**
   * Elimina y devuelve el último producto agregado (cima de la pila LIFO).
   * @returns {ItemCarrito | undefined} El ítem eliminado o undefined si el carrito está vacío
   */
  quitarUltimoProducto() {
    if (this.items.length === 0) {
      console.log("El carrito está vacío. No hay productos para quitar.");
      return undefined;
    }
    return this.items.pop(); // pop() extrae el último elemento (cima de la pila)
  }

  /**
   * Elimina un producto del carrito por su idProducto, sin importar su posición.
   * @param {string} idProducto - Identificador del producto a eliminar
   * @returns {boolean} true si se eliminó, false si no se encontró
   */
  eliminarProducto(idProducto) {
    const indice = this.items.findIndex(
      item => item.producto.idProducto === idProducto
    );

    if (indice === -1) {
      console.log(`Producto con ID ${idProducto} no encontrado en el carrito.`);
      return false;
    }

    // splice elimina el elemento en la posición indicada
    this.items.splice(indice, 1);
    return true;
  }

  /**
   * Muestra en consola el contenido actual del carrito.
   */
  verCarrito() {
    if (this.items.length === 0) {
      console.log("Carrito vacío.");
      return;
    }

    console.log(`\n--- Carrito (ID: ${this.idCarrito}) ---`);
    this.items.forEach((item, index) => {
      // Índice 0 = base de la pila (primer agregado), último índice = cima
      console.log(`[${index + 1}] ${item.toString()}`);
    });
    console.log("-----------------------------------");
  }

  /**
   * Devuelve el número de ítems (líneas) en el carrito.
   * @returns {number}
   */
  cantidadItems() {
    return this.items.length;
  }

  /**
   * Vacía el carrito por completo.
   */
  vaciar() {
    this.items = [];
  }
}

// Exportación para Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Carrito;
}