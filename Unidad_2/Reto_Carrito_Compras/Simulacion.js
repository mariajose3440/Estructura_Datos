/**
 * MainSimulacion.js
 * Punto de entrada que ejecuta automáticamente una simulación completa
 * del sistema de carrito de compras sin interacción del usuario.
 * Demuestra todas las funcionalidades: catálogo, agregar (LIFO), quitar último,
 * eliminar producto específico, control de stock FIFO, factura con MergeSort.
 */

// Importación de módulos
const Producto = require('./Producto.js');
const ItemCarrito = require('./ItemCarrito.js');
const Inventario = require('./Inventario.js');
const Carrito = require('./Carrito.js');
const Cliente = require('./Cliente.js');
const Factura = require('./Factura.js');

/**
 * Función principal que ejecuta la simulación.
 */
function main() {
  console.log("==========================================");
  console.log("  SIMULACIÓN DEL CARRITO DE COMPRAS       ");
  console.log("  LIBRERÍA 'EL BUEN LECTOR'              ");
  console.log("==========================================\n");

  // 1. Crear inventario y poblar con productos
  console.log(">>> Creando inventario y agregando productos...\n");
  const inventario = new Inventario();

  const p1 = new Producto("LIB001", "Cien años de soledad", 19.99);
  const p2 = new Producto("LIB002", "El principito", 9.50);
  const p3 = new Producto("LIB003", "1984", 12.30);
  const p4 = new Producto("LIB004", "Rayuela", 15.75);

  // Agregar productos con stock inicial (se crea un lote FIFO)
  inventario.agregarProducto(p1, 5);
  inventario.agregarProducto(p2, 3);
  inventario.agregarProducto(p3, 4);
  inventario.agregarProducto(p4, 2);

  // Mostrar catálogo inicial
  console.log("--- Catálogo de productos disponibles ---");
  inventario.listarCatalogo().forEach(linea => console.log(linea));
  console.log("");

  // 2. Crear un carrito
  const carrito = new Carrito("CART-001");

  // 3. Simular acciones del usuario
  console.log(">>> INICIO DE LA SIMULACIÓN DE COMPRA\n");

  // Agregar productos al carrito (LIFO - push)
  console.log("1. Agregando 'Cien años de soledad' x2...");
  if (inventario.verificarDisponibilidad("LIB001", 2)) {
    carrito.agregarProducto(new ItemCarrito(p1, 2));
    inventario.descontarStock("LIB001", 2);
    console.log("   Agregado correctamente.");
  } else {
    console.log("   Stock insuficiente.");
  }

  console.log("2. Agregando 'El principito' x1...");
  if (inventario.verificarDisponibilidad("LIB002", 1)) {
    carrito.agregarProducto(new ItemCarrito(p2, 1));
    inventario.descontarStock("LIB002", 1);
    console.log("   Agregado correctamente.");
  } else {
    console.log("   Stock insuficiente.");
  }

  console.log("3. Agregando '1984' x3...");
  if (inventario.verificarDisponibilidad("LIB003", 3)) {
    carrito.agregarProducto(new ItemCarrito(p3, 3));
    inventario.descontarStock("LIB003", 3);
    console.log("   Agregado correctamente.");
  } else {
    console.log("   Stock insuficiente.");
  }

  // Mostrar carrito actual
  console.log("\n--- Estado actual del carrito ---");
  carrito.verCarrito();

  // Quitar el último producto agregado (LIFO - pop)
  console.log("\n4. Quitando el último producto agregado (pop)...");
  const eliminadoPop = carrito.quitarUltimoProducto();
  if (eliminadoPop) {
    console.log(`   Producto eliminado: ${eliminadoPop.producto.nombre}`);
    // Devolver el stock al inventario (opcional en la simulación)
    inventario.reponerStock(eliminadoPop.producto.idProducto, eliminadoPop.cantidad);
    console.log("   Stock devuelto al inventario.");
  }

  // Mostrar carrito después de pop
  console.log("\n--- Carrito después de quitar el último producto ---");
  carrito.verCarrito();

  // Eliminar un producto específico por ID
  console.log("\n5. Eliminando producto 'LIB001' (Cien años de soledad) del carrito...");
  const itemEliminado = carrito.items.find(item => item.producto.idProducto === "LIB001");
  if (carrito.eliminarProducto("LIB001")) {
    console.log("   Producto eliminado.");
    // Devolver el stock
    inventario.reponerStock("LIB001", itemEliminado.cantidad);
    console.log("   Stock devuelto al inventario.");
  }

  // Agregar un producto más para la factura final
  console.log("\n6. Agregando 'Rayuela' x1...");
  if (inventario.verificarDisponibilidad("LIB004", 1)) {
    carrito.agregarProducto(new ItemCarrito(p4, 1));
    inventario.descontarStock("LIB004", 1);
    console.log("   Agregado correctamente.");
  } else {
    console.log("   Stock insuficiente.");
  }

  // Intentar agregar más de lo disponible (debe fallar)
  console.log("\n7. Intentando agregar 'El principito' x5 (solo quedan 2)...");
  if (inventario.verificarDisponibilidad("LIB002", 5)) {
    // No debería entrar
    carrito.agregarProducto(new ItemCarrito(p2, 5));
    inventario.descontarStock("LIB002", 5);
  } else {
    console.log("   ERROR: Stock insuficiente. No se puede agregar.");
  }

  // Mostrar carrito final
  console.log("\n--- Carrito final antes de la compra ---");
  carrito.verCarrito();

  // Mostrar stock remanente
  console.log("\n--- Stock actual en inventario ---");
  inventario.listarCatalogo().forEach(linea => console.log(linea));

  // 4. Finalizar compra: crear cliente y generar factura
  console.log("\n>>> FINALIZANDO COMPRA...\n");
  const cliente = new Cliente("1723456789", "María García");
  console.log("Datos del cliente:");
  console.log(cliente.toString());

  // Generar factura (internamente ordena con MergeSort)
  Factura.generarFactura(cliente, carrito);

  console.log(">>> SIMULACIÓN FINALIZADA <<<");
}

// Ejecutar la simulación
main();