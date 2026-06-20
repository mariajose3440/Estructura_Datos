/**
 * Clase Cliente
 * Representa al comprador.
 * Responsabilidad: Almacenar los datos del cliente para la factura.
 */
class Cliente {
  /**
   * @param {string} cedula - Número de cédula o identificación
   * @param {string} nombre - Nombre completo del cliente
   */
  constructor(cedula, nombre) {
    if (!cedula || !nombre) {
      throw new Error("Cédula y nombre son obligatorios.");
    }
    this.cedula = cedula;
    this.nombre = nombre;
  }

  /**
   * Representación textual del cliente.
   */
  toString() {
    return `Cliente: ${this.nombre} (Cédula: ${this.cedula})`;
  }
}

// Exportación para Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Cliente;
}