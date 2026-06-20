/**
 * Clase ItemCarrito
 * Representa la selección de un producto con una cantidad concreta dentro del carrito.
 * Responsabilidad: Vincular un Producto con la cantidad deseada por el cliente,
 * sin modificar la definición original del producto.
 */
class ItemCarrito {
  /**
   * @param {Producto} producto - Instancia de Producto que se agrega al carrito
   * @param {number} cantidad - Cantidad deseada (entero positivo)
   */
  constructor(producto, cantidad) {
    if (!producto) {
      throw new Error("El item requiere una instancia de Producto válida.");
    }
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error("La cantidad debe ser un entero positivo.");
    }
    this.producto = producto;
    this.cantidad = cantidad;
  }

  /**
   * Incrementa la cantidad de este item.
   * @param {number} unidades - Unidades a añadir (entero positivo)
   */
  aumentarCantidad(unidades = 1) {
    if (!Number.isInteger(unidades) || unidades <= 0) return;
    this.cantidad += unidades;
  }

  /**
   * Calcula el subtotal para este item (precio unitario * cantidad).
   * @returns {number} Subtotal
   */
  subtotal() {
    return this.producto.precio * this.cantidad;
  }

  /**
   * Representación textual del item.
   */
  toString() {
    return `${this.producto.toString()} x${this.cantidad} | Subtotal: $${this.subtotal().toFixed(2)}`;
  }
}

// Exportación para Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ItemCarrito;
}
