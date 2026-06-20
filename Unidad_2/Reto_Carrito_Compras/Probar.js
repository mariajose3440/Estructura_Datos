const Producto = require('./Producto.js');
const ItemCarrito = require('./ItemCarrito.js');
const Inventario = require('./Inventario.js');
const Carrito = require('./Carrito.js');
const Cliente = require('./Cliente.js');
const Factura = require('./Factura.js');

// Crear inventario con productos
const inv = new Inventario();
const p1 = new Producto("LIB001", "Cien años de soledad", 19.99);
const p2 = new Producto("LIB002", "El principito", 9.50);
const p3 = new Producto("LIB003", "1984", 12.30);
inv.agregarProducto(p1, 10);
inv.agregarProducto(p2, 5);
inv.agregarProducto(p3, 7);

// Crear carrito y agregar ítems
const carrito = new Carrito("CART-001");
carrito.agregarProducto(new ItemCarrito(p1, 2));
carrito.agregarProducto(new ItemCarrito(p2, 3));
carrito.agregarProducto(new ItemCarrito(p3, 1));
carrito.agregarProducto(new ItemCarrito(p1, 1)); // mismo producto, aumenta cantidad a 3

// Datos del cliente
const cliente = new Cliente("1234567890", "Juan Pérez");

// Generar factura
Factura.generarFactura(cliente, carrito);

// Verificar que el inventario sigue intacto
console.log("Stock actual:");
console.log(inv.listarCatalogo());