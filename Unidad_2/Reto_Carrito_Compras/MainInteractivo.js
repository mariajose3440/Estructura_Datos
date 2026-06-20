/**
 * MainInteractivo.js
 * Punto de entrada interactivo por consola.
 * Utiliza el módulo nativo 'readline' para la entrada del usuario.
 * No requiere dependencias externas adicionales.
 */

const readline = require('readline');

// Importación de módulos del proyecto
const Producto = require('./Producto.js');
const ItemCarrito = require('./ItemCarrito.js');
const Inventario = require('./Inventario.js');
const Carrito = require('./Carrito.js');
const Cliente = require('./Cliente.js');
const Factura = require('./Factura.js');

/**
 * Crea una interfaz readline y devuelve una función para hacer preguntas como promesa.
 */
function crearInterfaz() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return {
    /**
     * Hace una pregunta y retorna la respuesta como promesa.
     * @param {string} prompt - Mensaje a mostrar
     * @returns {Promise<string>} respuesta del usuario
     */
    pregunta: (prompt) => new Promise((resolve) => {
      rl.question(prompt, (respuesta) => {
        resolve(respuesta.trim());
      });
    }),

    /**
     * Cierra la interfaz.
     */
    cerrar: () => rl.close()
  };
}

/**
 * Función principal asíncrona que ejecuta la interfaz interactiva.
 */
async function main() {
  const ui = crearInterfaz();

  console.log("==========================================");
  console.log("  LIBRERÍA 'EL BUEN LECTOR'              ");
  console.log("  Sistema de Carrito de Compras          ");
  console.log("==========================================\n");

  // Crear inventario con algunos productos precargados
  const inventario = new Inventario();
  inicializarInventario(inventario);

  // Crear un carrito para la sesión
  const carrito = new Carrito("CART-001");

  let opcion;
  do {
    mostrarMenu();
    opcion = await ui.pregunta("Seleccione una opción: ");

    switch (opcion) {
      case "1":
        verCatalogo(inventario);
        break;
      case "2":
        await agregarProducto(inventario, carrito, ui);
        break;
      case "3":
        quitarUltimoProducto(inventario, carrito);
        break;
      case "4":
        await eliminarProductoEspecifico(inventario, carrito, ui);
        break;
      case "5":
        carrito.verCarrito();
        break;
      case "6":
        await finalizarCompra(inventario, carrito, ui);
        ui.cerrar();
        return; // Salir del bucle y del programa
      case "0":
        console.log("Saliendo del sistema...");
        ui.cerrar();
        return;
      default:
        console.log("Opción no válida. Intente de nuevo.");
    }
  } while (true);
}

/**
 * Inicializa el inventario con algunos productos de ejemplo.
 * @param {Inventario} inventario
 */
function inicializarInventario(inventario) {
  const productos = [
    new Producto("LIB001", "Cien años de soledad", 19.99),
    new Producto("LIB002", "El principito", 9.50),
    new Producto("LIB003", "1984", 12.30),
    new Producto("LIB004", "Rayuela", 15.75),
    new Producto("LIB005", "Don Quijote", 22.00)
  ];

  inventario.agregarProducto(productos[0], 5);
  inventario.agregarProducto(productos[1], 3);
  inventario.agregarProducto(productos[2], 4);
  inventario.agregarProducto(productos[3], 2);
  inventario.agregarProducto(productos[4], 6);

  console.log("Inventario inicializado con productos.\n");
}

/**
 * Muestra el menú de opciones.
 */
function mostrarMenu() {
  console.log("\n--- MENÚ PRINCIPAL ---");
  console.log("1. Ver catálogo");
  console.log("2. Agregar producto al carrito");
  console.log("3. Quitar último producto agregado (LIFO)");
  console.log("4. Eliminar producto específico del carrito");
  console.log("5. Ver carrito");
  console.log("6. Finalizar compra");
  console.log("0. Salir");
}

/**
 * Muestra el catálogo de productos con su stock actual.
 * @param {Inventario} inventario
 */
function verCatalogo(inventario) {
  console.log("\n--- CATÁLOGO DE PRODUCTOS ---");
  const catalogo = inventario.listarCatalogo();
  if (catalogo.length === 0) {
    console.log("No hay productos en el inventario.");
  } else {
    catalogo.forEach(linea => console.log(linea));
  }
}

/**
 * Permite al usuario agregar un producto al carrito, verificando stock.
 * @param {Inventario} inventario
 * @param {Carrito} carrito
 * @param {object} ui - interfaz con método pregunta()
 */
async function agregarProducto(inventario, carrito, ui) {
  verCatalogo(inventario);

  const id = await ui.pregunta("Ingrese el ID del producto a agregar: ");
  const producto = inventario.obtenerProducto(id);
  if (!producto) {
    console.log("Producto no encontrado.");
    return;
  }

  const cantidadStr = await ui.pregunta("Ingrese la cantidad deseada: ");
  const cantidad = parseInt(cantidadStr, 10);
  if (isNaN(cantidad) || cantidad <= 0) {
    console.log("La cantidad debe ser un número positivo.");
    return;
  }

  if (!inventario.verificarDisponibilidad(id, cantidad)) {
    console.log("Stock insuficiente. No se puede agregar al carrito.");
    return;
  }

  inventario.descontarStock(id, cantidad);
  carrito.agregarProducto(new ItemCarrito(producto, cantidad));
  console.log(`"${producto.nombre}" x${cantidad} agregado(s) al carrito.`);
}

/**
 * Quita el último producto agregado al carrito (cima de la pila LIFO).
 * Devuelve el stock al inventario.
 * @param {Inventario} inventario
 * @param {Carrito} carrito
 */
function quitarUltimoProducto(inventario, carrito) {
  const eliminado = carrito.quitarUltimoProducto();
  if (eliminado) {
    inventario.reponerStock(eliminado.producto.idProducto, eliminado.cantidad);
    console.log(`Se quitó "${eliminado.producto.nombre}" del carrito y se repuso el stock.`);
  }
}

/**
 * Elimina un producto del carrito según su ID, sin importar su posición.
 * Devuelve el stock al inventario.
 * @param {Inventario} inventario
 * @param {Carrito} carrito
 * @param {object} ui
 */
async function eliminarProductoEspecifico(inventario, carrito, ui) {
  carrito.verCarrito();
  const id = await ui.pregunta("Ingrese el ID del producto a eliminar del carrito: ");

  const item = carrito.items.find(it => it.producto.idProducto === id);
  if (!item) {
    console.log("El producto no está en el carrito.");
    return;
  }

  const confirmacion = await ui.pregunta(`¿Está seguro de eliminar "${item.producto.nombre}"? (s/n): `);
  if (confirmacion.toLowerCase() === 's') {
    if (carrito.eliminarProducto(id)) {
      inventario.reponerStock(id, item.cantidad);
      console.log("Producto eliminado del carrito y stock repuesto.");
    }
  } else {
    console.log("Operación cancelada.");
  }
}

/**
 * Finaliza la compra: pide datos del cliente, genera factura y termina.
 * @param {Inventario} inventario
 * @param {Carrito} carrito
 * @param {object} ui
 */
async function finalizarCompra(inventario, carrito, ui) {
  if (carrito.cantidadItems() === 0) {
    console.log("El carrito está vacío. Agregue productos antes de finalizar la compra.");
    return;
  }

  console.log("\n--- FINALIZAR COMPRA ---");
  const cedula = await ui.pregunta("Ingrese la cédula del cliente: ");
  const nombre = await ui.pregunta("Ingrese el nombre completo del cliente: ");

  if (!cedula || !nombre) {
    console.log("Datos incompletos. No se puede generar la factura.");
    return;
  }

  const cliente = new Cliente(cedula, nombre);
  Factura.generarFactura(cliente, carrito);
  console.log("Gracias por su compra. ¡Vuelva pronto!");
}

// Iniciar el programa interactivo
main().catch(err => {
  console.error("Error en la aplicación:", err);
  process.exit(1);
});