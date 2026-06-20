/**
 * Clase Producto
 * Representa un artículo disponible en el catálogo de la librería.
 * Responsabilidad: Almacenar únicamente la información de un producto.
 */
class Producto {
  /**
   * @param {string} idProducto - Identificador único del producto (ej. "LIB001")
   * @param {string} nombre - Nombre del libro o producto
   * @param {number} precio - Precio unitario (número positivo)
   */
  constructor(idProducto, nombre, precio) {
    this.idProducto = idProducto;
    this.nombre = nombre;
    this.precio = precio;
  }

  /**
   * Devuelve una representación en texto del producto.
   * Útil para depuración y para mostrar el catálogo.
   */
  toString() {
    return `[${this.idProducto}] ${this.nombre} - $${this.precio.toFixed(2)}`;
  }
}

// Exportación para Node.js (si se usa en entorno de módulos)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Producto;
}