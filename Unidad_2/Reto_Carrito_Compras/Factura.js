const mergeSort = require('./MergeSort.js');

/**
 * Clase Factura
 * Responsabilidades:
 * - Recorrer los ítems del carrito y agruparlos por producto.
 * - Calcular subtotales por producto y total de la compra.
 * - Recibir y mostrar los datos del cliente.
 * - Ordenar los productos de mayor a menor según la cantidad comprada usando MergeSort.
 * - Mostrar la factura organizada en consola.
 */
class Factura {
  /**
   * Genera y muestra la factura a partir del cliente y el carrito.
   * @param {Cliente} cliente - Instancia de Cliente con cédula y nombre
   * @param {Carrito} carrito - Instancia de Carrito con los ítems seleccionados
   */
  static generarFactura(cliente, carrito) {
    if (!cliente || !carrito) {
      throw new Error("Cliente y carrito son obligatorios para generar la factura.");
    }

    // 1. Obtener los ítems del carrito
    const itemsCarrito = carrito.items;

    if (itemsCarrito.length === 0) {
      console.log("El carrito está vacío. No se puede generar factura.");
      return;
    }

    // 2. Agrupar ítems por producto (por idProducto)
    const agrupados = {};
    for (const item of itemsCarrito) {
      const id = item.producto.idProducto;
      if (agrupados[id]) {
        // Sumar la cantidad al existente
        agrupados[id].cantidad += item.cantidad;
      } else {
        // Crear una copia para no modificar el item original
        agrupados[id] = {
          producto: item.producto,
          cantidad: item.cantidad
        };
      }
    }

    // Convertir el objeto agrupados en un arreglo de líneas de factura
    const lineasFactura = Object.values(agrupados);

    // 3. Calcular subtotales y total
    for (const linea of lineasFactura) {
      linea.subtotal = linea.producto.precio * linea.cantidad;
    }
    const total = lineasFactura.reduce((suma, linea) => suma + linea.subtotal, 0);

    // 4. Ordenar líneas de mayor a menor según cantidad comprada (MergeSort)
    const lineasOrdenadas = mergeSort(lineasFactura, 'cantidad');

    // 5. Mostrar la factura en consola
    console.log("\n==========================================");
    console.log("           FACTURA DE COMPRA              ");
    console.log("==========================================");
    console.log(cliente.toString());
    console.log("------------------------------------------");
    console.log("Producto                     Cant   Precio   Subtotal");
    console.log("------------------------------------------");

    for (const linea of lineasOrdenadas) {
      const nombre = linea.producto.nombre.padEnd(25).substring(0, 25);
      const cantidad = String(linea.cantidad).padStart(4);
      const precio = linea.producto.precio.toFixed(2).padStart(8);
      const subtotal = linea.subtotal.toFixed(2).padStart(9);
      console.log(`${nombre} ${cantidad} ${precio} ${subtotal}`);
    }

    console.log("------------------------------------------");
    console.log(`TOTAL A PAGAR:`.padStart(42) + ` $${total.toFixed(2)}`);
    console.log("==========================================\n");
  }
}

// Exportación para Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Factura;
}