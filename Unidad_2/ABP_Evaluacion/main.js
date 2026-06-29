/**
 * main.js
 * Punto de entrada del Sistema de Gestión Bibliotecaria.
 * 
 * Este archivo coordina todos los módulos para:
 * 1. Generar datasets de libros
 * 2. Ordenar usando MergeSort
 * 3. Realizar búsquedas binarias
 * 4. Simular préstamos con cola circular
 * 5. Medir y reportar rendimiento
 */

const { generarDatasets } = require('./generadorDatos');
const { ordenarLibros } = require('./mergeSort');
const { buscarPorTitulo } = require('./busqueda');
const ColaCircular = require('./colaCircular');
const { ejecutarMediciones, generarReporte, formatearTiempo, medirTiempo } = require('./medicion');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const CONFIGURACION = {
    iteracionesMedicion: 5,     
    capacidadCola: 15,         
    cantidadLectores: 100,     
    solicitudesPorLibro: {     
        minimo: 8,
        maximo: 12
    }
};

// ============================================================================
// FUNCIONES AUXILIARES PARA SIMULACIÓN
// ============================================================================

/**
 * Genera un array de lectores con datos ficticios.
 */
function generarLectores(cantidad) {
    const nombres = [
        "Maria Garcia", "Juan Lopez", "Ana Martinez", "Carlos Rodriguez",
        "Laura Hernandez", "Pedro Gonzalez", "Sofia Perez", "Diego Sanchez",
        "Valentina Ramirez", "Jose Torres", "Isabella Flores", "Miguel Diaz",
        "Camila Morales", "Alejandro Castro", "Lucia Ruiz", "Daniel Alvarez",
        "Valeria Gutierrez", "Sebastian Ortiz", "Mariana Vargas", "Gabriel Mendoza",
        "Ximena Jimenez", "Andres Romero", "Fernanda Silva", "Ricardo Rojas",
        "Daniela Campos", "Eduardo Herrera", "Paula Navarro", "Francisco Medina",
        "Catalina Paredes", "Jorge Pena", "Adriana Fuentes", "Manuel Contreras",
        "Gabriela Rios", "Oscar Acosta", "Renata Delgado", "Hugo Leon",
        "Natalia Espinoza", "Emilio Ponce", "Alejandra Mejia", "Alberto Guerrero",
        "Carmen Vega", "Raul Cordova", "Andrea Santana", "Ernesto Gallegos",
        "Patricia Reyes", "Fernando Barrera", "Lorena Benitez", "Sergio Cano",
        "Rosa Quintana", "Antonio Serrano", "Teresa Padilla", "Enrique Montes",
        "Gloria Aviles", "Francisco Javier", "Monica Estrada", "Ramon Valdez",
        "Silvia Orozco", "Victor Zamora", "Beatriz Ibarra", "Hector Rivas",
        "Claudia Molina", "Mario Robles", "Veronica Cuevas", "Felipe Salinas",
        "Patricia Lozano", "Ruben Tellez", "Karina Corona", "Saul Aguirre",
        "Elisa Guevara", "Marco Valenzuela", "Raquel Zuniga", "Arturo Rosas",
        "Diana Pacheco", "Joaquin Solis", "Liliana Mondragon", "Roberto Esquivel",
        "Alicia Villanueva", "Gustavo Tovar", "Marisol Olvera", "Mauricio Ledesma",
        "Yolanda Esparza", "Pablo Coronado", "Elena Godinez", "Angel Fonseca",
        "Miriam Cervantes", "Esteban Ceballos", "Julia Duenas", "Lorenzo Alfaro",
        "Maribel Avila", "Cesar Galvan", "Nadia Regalado", "Cristian Carbajal",
        "Tania Montoya", "Benito Casillas", "Rocio Villalpando", "Damian Bolanos",
        "Aurora Fierro", "Salvador Lomeli", "Cecilia Olguin", "Octavio Terrazas"
    ];

    const lectores = [];
    for (let i = 1; i <= cantidad; i++) {
        lectores.push({
            id: i,
            nombre: nombres[(i - 1) % nombres.length] + (i > nombres.length ? ` ${i}` : "")
        });
    }
    return lectores;
}

// ============================================================================
// FUNCIONES PRINCIPALES
// ============================================================================

/**
 * Ejecuta las pruebas de rendimiento para MergeSort y busqueda binaria.
 * Realiza multiples iteraciones para cada tamano de dataset y recopila estadisticas.
 */
function ejecutarPruebasRendimiento(datasets) {
    console.log('\n' + '='.repeat(80));
    console.log('INICIANDO PRUEBAS DE RENDIMIENTO');
    console.log('='.repeat(80));
    
    const resultados = {
        ordenamiento: {},
        busqueda: {}
    };
    
    for (const [nombre, dataset] of Object.entries(datasets)) {
        const tamano = dataset.length;
        console.log(`\n${'-'.repeat(80)}`);
        console.log(`Dataset: ${nombre} (${tamano.toLocaleString()} libros)`);
        console.log(`${'-'.repeat(80)}`);
        
        const fnOrdenar = (datos) => ordenarLibros(datos);
        
        const medicionOrden = ejecutarMediciones(
            fnOrdenar,
            [dataset],
            CONFIGURACION.iteracionesMedicion,
            `MergeSort - ${nombre} (${tamano} libros)`
        );
        
        resultados.ordenamiento[nombre] = {
            ...medicionOrden,
            tamano,
            iteraciones: CONFIGURACION.iteracionesMedicion
        };
        
        const indicesOrdenados = ordenarLibros(dataset);
        
        // Seleccionar un titulo existente para la busqueda
        const indiceAleatorio = Math.floor(Math.random() * tamano);
        const tituloBuscar = dataset[indicesOrdenados[indiceAleatorio]].titulo;
        
        // Funcion de busqueda binaria
        const fnBuscar = (datos, indices, titulo) => buscarPorTitulo(datos, indices, titulo);
        
        // Medir busqueda
        const medicionBusqueda = ejecutarMediciones(
            fnBuscar,
            [dataset, indicesOrdenados, tituloBuscar],
            CONFIGURACION.iteracionesMedicion,
            `Busqueda Binaria - ${nombre} (${tamano} libros)`
        );
        
        // Guardar resultados de busqueda
        resultados.busqueda[nombre] = {
            ...medicionBusqueda,
            tamano,
            iteraciones: CONFIGURACION.iteracionesMedicion
        };
    }
    
    return resultados;
}

/**
 * Simula el proceso de prestamo de libros usando la cola circular.
 */
function simularPrestamos(libros) {
    console.log('\n' + '='.repeat(80));
    console.log('SIMULACION DE PRESTAMOS CON COLA CIRCULAR');
    console.log('='.repeat(80));
    
    const lectores = generarLectores(CONFIGURACION.cantidadLectores);
    console.log(`\n[OK] ${lectores.length} lectores generados`);
    
    const libroPopular = libros[Math.floor(libros.length / 2)];
    console.log(`[OK] Libro seleccionado para prestamo: "${libroPopular.titulo}" (ID: ${libroPopular.id})`);
    
    const colaPrestamos = new ColaCircular(CONFIGURACION.capacidadCola);
    console.log(`[OK] Cola circular creada con capacidad para ${CONFIGURACION.capacidadCola} solicitudes`);
    
    const numSolicitantes = Math.floor(Math.random() * 
        (CONFIGURACION.solicitudesPorLibro.maximo - CONFIGURACION.solicitudesPorLibro.minimo + 1)) + 
        CONFIGURACION.solicitudesPorLibro.minimo;
    
    console.log(`\n${'-'.repeat(80)}`);
    console.log(`FASE 1: ${numSolicitantes} lectores solicitan el libro "${libroPopular.titulo}"`);
    console.log(`${'-'.repeat(80)}`);
    
    for (let i = 0; i < numSolicitantes; i++) {
        const lector = lectores[i];
        const solicitud = {
            idLector: lector.id,
            nombreLector: lector.nombre,
            idLibro: libroPopular.id,
            fechaSolicitud: new Date()
        };
        
        console.log(`\n--- Solicitud #${i + 1} ---`);
        console.log(`   Lector: ${lector.nombre} (ID: ${lector.id})`);
        console.log(`   Libro solicitado: "${libroPopular.titulo}" (ID: ${libroPopular.id})`);
        
        const encolado = colaPrestamos.encolar(solicitud);
        
        if (encolado) {
            console.log(`   [OK] Solicitud encolada exitosamente`);
        } else {
            console.log(`   [ERROR] Cola llena - No se pudo encolar la solicitud`);
        }
        
        console.log(`   Estado de la cola: ${colaPrestamos.obtenerTamano()} solicitudes en espera`);
        console.log(`   Cola: ${colaPrestamos.toString()}`);
    }
    
    console.log(`\n${'-'.repeat(80)}`);
    console.log(`FASE 2: Simulacion de devolucion del libro`);
    console.log(`${'-'.repeat(80)}`);
    
    let contadorDevoluciones = 0;
    
    while (!colaPrestamos.estaVacia()) {
        contadorDevoluciones++;
        console.log(`\n--- Devolucion #${contadorDevoluciones} ---`);
        
        const siguienteSolicitud = colaPrestamos.desencolar();
        
        if (siguienteSolicitud) {
            console.log(`   Libro devuelto y asignado a: ${siguienteSolicitud.nombreLector}`);
            console.log(`   ID Lector: ${siguienteSolicitud.idLector}`);
            console.log(`   Fecha de solicitud: ${siguienteSolicitud.fechaSolicitud.toLocaleString()}`);
            
            const diasPrestamo = Math.floor(Math.random() * 14) + 1;
            console.log(`   Periodo de prestamo: ${diasPrestamo} dias`);
        }
        
        console.log(`   Solicitudes restantes en cola: ${colaPrestamos.obtenerTamano()}`);
        console.log(`   Cola actual: ${colaPrestamos.toString()}`);
        
        if (colaPrestamos.obtenerTamano() > 0) {
            console.log(`   >>> Esperando siguiente devolucion...`);
        }
    }
    
    console.log(`\n[OK] Simulacion completada: ${contadorDevoluciones} prestamos procesados`);
    console.log(`[OK] Cola vacia: Todas las solicitudes fueron atendidas`);
    
    console.log(`\n${'-'.repeat(80)}`);
    console.log(`RESUMEN DE LA SIMULACION:`);
    console.log(`${'-'.repeat(80)}`);
    console.log(`  - Total lectores: ${lectores.length}`);
    console.log(`  - Solicitantes del libro: ${numSolicitantes}`);
    console.log(`  - Libro prestado: "${libroPopular.titulo}"`);
    console.log(`  - Capacidad de la cola: ${CONFIGURACION.capacidadCola}`);
    console.log(`  - Solicitudes procesadas: ${contadorDevoluciones}`);
    console.log(`  - Estado final de la cola: ${colaPrestamos.estaVacia() ? 'Vacia' : 'Con solicitudes pendientes'}`);
}

/**
 * Funcion principal que ejecuta todo el sistema.
 */
function main() {
    console.log('='.repeat(80));
    console.log('SISTEMA DE GESTION BIBLIOTECARIA');
    console.log('='.repeat(80));
    console.log(`Inicio: ${new Date().toLocaleString()}`);
    
    try {
        // Fase 1: Generar datasets
        console.log('\n' + '='.repeat(80));
        console.log('FASE 1: GENERACION DE DATOS');
        console.log('='.repeat(80));
        
        const datasets = generarDatasets();
        console.log('[OK] Datasets generados exitosamente');
        console.log(`  - Pequeno: ${datasets.pequeno.length.toLocaleString()} libros`);
        console.log(`  - Mediano: ${datasets.mediano.length.toLocaleString()} libros`);
        console.log(`  - Grande: ${datasets.grande.length.toLocaleString()} libros`);
        
        // Fase 2: Pruebas de rendimiento
        const resultadosRendimiento = ejecutarPruebasRendimiento(datasets);
        
        console.log('\n' + '='.repeat(80));
        console.log('GENERANDO REPORTE DE RENDIMIENTO');
        console.log('='.repeat(80));
        
        const reporte = generarReporte(
            { 
                ordenamiento: resultadosRendimiento.ordenamiento, 
                busqueda: resultadosRendimiento.busqueda 
            },
            'resultados_rendimiento.txt'
        );
        
        // Fase 3: Simulacion de prestamos
        // Usamos el dataset pequeno para la simulacion
        simularPrestamos(datasets.pequeno);
        
        // Mostrar ejemplo del reporte en consola
        console.log('\n' + '='.repeat(80));
        console.log('EJEMPLO DE BUSQUEDA EN EL CATALOGO');
        console.log('='.repeat(80));
        
        const indicesOrdenados = ordenarLibros(datasets.pequeno);
        const libroEjemplo = datasets.pequeno[indicesOrdenados[500]];
        const resultadoBusqueda = buscarPorTitulo(
            datasets.pequeno, 
            indicesOrdenados, 
            libroEjemplo.titulo
        );
        
        console.log(`\nBusqueda: "${libroEjemplo.titulo}"`);
        if (resultadoBusqueda) {
            console.log(`[OK] Libro encontrado - ID: ${resultadoBusqueda.id}, Titulo: "${resultadoBusqueda.titulo}"`);
        } else {
            console.log('[ERROR] Libro no encontrado');
        }
        
        const resultadoNoExiste = buscarPorTitulo(
            datasets.pequeno, 
            indicesOrdenados, 
            "Libro que no existe en el catalogo"
        );
        console.log(`\nBusqueda: "Libro que no existe en el catalogo"`);
        console.log(resultadoNoExiste ? '[OK] Encontrado' : '[OK] Correctamente no encontrado (null)');
        
    } catch (error) {
        console.error('\n[ERROR] Error durante la ejecucion:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('EJECUCION COMPLETADA EXITOSAMENTE');
    console.log(`Fin: ${new Date().toLocaleString()}`);
    console.log('='.repeat(80));
}

main();
