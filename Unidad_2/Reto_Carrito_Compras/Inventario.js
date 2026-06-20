/**
 * Clase Inventario
 * Gestiona el catálogo de productos y el stock mediante una cola FIFO por producto.
 * Responsabilidades:
 * - Mantener el catálogo de productos.
 * - Controlar la disponibilidad del stock respetando el orden de llegada (FIFO).
 * - Verificar si existe suficiente cantidad antes de vender.
 */
class Inventario {
  constructor() {
    /**
     * Estructura interna:
     * Map<string, { producto: Producto, stockQueue: Array<{ cantidad: number }> }>
     */
    this.catalogo = new Map();
  }

  /**
   * Agrega un producto al catálogo con un stock inicial encolado como un lote.
   * @param {Producto} producto - Instancia de Producto
   * @param {number} cantidadInicial - Cantidad del primer lote (entero positivo)
   */
  agregarProducto(producto, cantidadInicial) {
    if (!producto || !producto.idProducto) {
      throw new Error("Producto inválido.");
    }
    if (!Number.isInteger(cantidadInicial) || cantidadInicial <= 0) {
      throw new Error("La cantidad inicial debe ser un entero positivo.");
    }
    if (this.catalogo.has(producto.idProducto)) {
      throw new Error(`El producto ${producto.idProducto} ya existe en el inventario.`);
    }

    // Crear la cola con un primer lote
    this.catalogo.set(producto.idProducto, {
      producto: producto,
      stockQueue: [{ cantidad: cantidadInicial }]
    });
  }

  /**
   * Agrega stock adicional a un producto existente (encola un nuevo lote).
   * @param {string} idProducto
   * @param {number} cantidad - Cantidad a agregar (entero positivo)
   */
  reponerStock(idProducto, cantidad) {
    const entrada = this.catalogo.get(idProducto);
    if (!entrada) {
      throw new Error(`Producto ${idProducto} no encontrado.`);
    }
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error("La cantidad a reponer debe ser un entero positivo.");
    }
    // Encolar nuevo lote al final (FIFO: último en llegar, último en salir)
    entrada.stockQueue.push({ cantidad });
  }

  /**
   * Verifica si hay suficiente stock para cubrir una cantidad solicitada,
   * respetando el orden FIFO (los lotes más antiguos primero).
   * @param {string} idProducto
   * @param {number} cantidadRequerida
   * @returns {boolean}
   */
  verificarDisponibilidad(idProducto, cantidadRequerida) {
    const entrada = this.catalogo.get(idProducto);
    if (!entrada) return false;

    let acumulado = 0;
    // Recorremos la cola desde el frente (índice 0 = más antiguo)
    for (let i = 0; i < entrada.stockQueue.length; i++) {
      acumulado += entrada.stockQueue[i].cantidad;
      if (acumulado >= cantidadRequerida) {
        return true;
      }
    }
    return false;
  }

  /**
   * Descuenta stock del inventario siguiendo el orden FIFO.
   * PRECONDICIÓN: verificarDisponibilidad() debe haberse llamado antes y retornar true.
   * @param {string} idProducto
   * @param {number} cantidad
   * @throws {Error} si no hay suficiente stock o el producto no existe.
   */
  descontarStock(idProducto, cantidad) {
    const entrada = this.catalogo.get(idProducto);
    if (!entrada) {
      throw new Error(`Producto ${idProducto} no existe.`);
    }
    if (!this.verificarDisponibilidad(idProducto, cantidad)) {
      throw new Error(`Stock insuficiente para ${idProducto}.`);
    }

    let restante = cantidad;
    // Mientras quede cantidad por descontar y haya lotes
    while (restante > 0 && entrada.stockQueue.length > 0) {
      const lote = entrada.stockQueue[0]; // frente de la cola (más antiguo)
      if (lote.cantidad <= restante) {
        // Consumimos el lote completo
        restante -= lote.cantidad;
        entrada.stockQueue.shift(); // eliminar el lote del frente
      } else {
        // El lote cubre la cantidad restante con sobrante
        lote.cantidad -= restante;
        restante = 0;
      }
    }

    // Si la cola queda vacía, podríamos opcionalmente eliminar el producto del catálogo
    if (entrada.stockQueue.length === 0) {
      // En un sistema real podría seguir existiendo como producto sin stock.
      // Por simplicidad, lo mantenemos en el catálogo pero con cola vacía.
    }
  }

  /**
   * Obtiene la instancia de Producto dado su id.
   * @param {string} idProducto
   * @returns {Producto | undefined}
   */
  obtenerProducto(idProducto) {
    const entrada = this.catalogo.get(idProducto);
    return entrada ? entrada.producto : undefined;
  }

  /**
   * Devuelve el stock total actual de un producto (suma de todos los lotes).
   * @param {string} idProducto
   * @returns {number}
   */
  stockTotal(idProducto) {
    const entrada = this.catalogo.get(idProducto);
    if (!entrada) return 0;
    return entrada.stockQueue.reduce((total, lote) => total + lote.cantidad, 0);
  }

  /**
   * Lista todos los productos del catálogo con su stock total.
   * @returns {string[]} Array de representaciones textuales
   */
  listarCatalogo() {
    const lista = [];
    for (const [id, entrada] of this.catalogo) {
      const total = this.stockTotal(id);
      lista.push(`${entrada.producto.toString()} | Stock: ${total}`);
    }
    return lista;
  }
}

// Exportación para Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Inventario;
}