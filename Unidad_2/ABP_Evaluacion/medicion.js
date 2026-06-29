/**
 * medicion.js
 * Módulo para medir el rendimiento de los algoritmos de ordenamiento y búsqueda.
 * Utiliza process.hrtime.bigint() para mediciones de alta precisión en nanosegundos.
 */

const fs = require('fs');
const path = require('path');

/**
 * Mide el tiempo de ejecución de una función en nanosegundos.
 * process.hrtime.bigint() proporciona el tiempo en nanosegundos desde
 * un punto arbitrario en el pasado, ideal para medir intervalos cortos.
 */
function medirTiempo(funcion, ...argumentos) {
    const inicio = process.hrtime.bigint();
    
    const resultado = funcion(...argumentos);
    
    const fin = process.hrtime.bigint();
    const tiempoNanosegundos = fin - inicio;
    
    return {
        resultado,
        tiempoNanosegundos: Number(tiempoNanosegundos)
    };
}


function formatearTiempo(nanosegundos) {
    if (nanosegundos < 1000) {
        return `${nanosegundos} ns`;
    } else if (nanosegundos < 1000000) {
        return `${(nanosegundos / 1000).toFixed(2)} µs`;
    } else if (nanosegundos < 1000000000) {
        return `${(nanosegundos / 1000000).toFixed(2)} ms`;
    } else {
        return `${(nanosegundos / 1000000000).toFixed(2)} s`;
    }
}

/**
 * Ejecuta múltiples mediciones y calcula estadísticas.
 * 
 * @param {Function} funcion - Función a medir
 * @param {Array} argumentos - Argumentos para la función
 * @param {number} iteraciones - Número de veces a ejecutar
 * @param {string} nombrePrueba - Nombre descriptivo de la prueba
 * @returns {Object} Estadísticas de las mediciones
 */
function ejecutarMediciones(funcion, argumentos, iteraciones = 5, nombrePrueba = "") {
    const tiempos = [];
    
    console.log(`\nEjecutando ${iteraciones} mediciones para: ${nombrePrueba}`);
    
    for (let i = 0; i < iteraciones; i++) {
        const { tiempoNanosegundos } = medirTiempo(funcion, ...argumentos);
        tiempos.push(tiempoNanosegundos);
        console.log(`  Iteración ${i + 1}: ${formatearTiempo(tiempoNanosegundos)}`);
    }
    
    // Calcular promedio
    const promedio = tiempos.reduce((a, b) => a + b, 0) / tiempos.length;

    
    console.log(`  Promedio: ${formatearTiempo(promedio)}`);
    
    return {
        nombrePrueba,
        tiempos,
        promedio,
        minimo: Math.min(...tiempos),
        maximo: Math.max(...tiempos)
    };
}

/**
 * Genera un reporte completo de rendimiento y lo guarda en un archivo.
 * 
 * @param {Object} resultados - Resultados de todas las mediciones
 * @param {string} rutaArchivo - Ruta donde guardar el reporte
 */
function generarReporte(resultados, rutaArchivo = 'resultados_rendimiento.txt') {
    let reporte = '';
    
    reporte += '='.repeat(80) + '\n';
    reporte += 'REPORTE DE RENDIMIENTO - SISTEMA DE GESTIÓN BIBLIOTECARIA\n';
    reporte += '='.repeat(80) + '\n';
    reporte += `Fecha: ${new Date().toLocaleString()}\n`;
    reporte += `Método de medición: process.hrtime.bigint() (nanosegundos)\n`;
    reporte += '='.repeat(80) + '\n\n';
    
    // Resultados de MergeSort
    reporte += 'RESULTADOS DE ORDENAMIENTO (MergeSort)\n';
    reporte += '-'.repeat(80) + '\n';
    
    for (const [dataset, mediciones] of Object.entries(resultados.ordenamiento)) {
        reporte += `\nDataset: ${dataset}\n`;
        reporte += `  Tamaño: ${mediciones.tamano.toLocaleString()} libros\n`;
        reporte += `  Iteraciones: ${mediciones.iteraciones}\n`;
        reporte += `  Tiempo promedio: ${formatearTiempo(mediciones.promedio)}\n`;
        reporte += `  Tiempo mínimo: ${formatearTiempo(mediciones.minimo)}\n`;
        reporte += `  Tiempo máximo: ${formatearTiempo(mediciones.maximo)}\n`;
        reporte += `  Desviación estándar: ${formatearTiempo(mediciones.desviacionEstandar)}\n`;
        
        // Mostrar tiempos individuales
        reporte += `  Tiempos individuales:\n`;
        mediciones.tiempos.forEach((t, i) => {
            reporte += `    Iteración ${i + 1}: ${formatearTiempo(t)}\n`;
        });
    }
    
    // Resultados de búsqueda binaria
    reporte += '\n\nRESULTADOS DE BÚSQUEDA (Búsqueda Binaria)\n';
    reporte += '-'.repeat(80) + '\n';
    
    for (const [dataset, mediciones] of Object.entries(resultados.busqueda)) {
        reporte += `\nDataset: ${dataset}\n`;
        reporte += `  Tamaño: ${mediciones.tamano.toLocaleString()} libros\n`;
        reporte += `  Iteraciones: ${mediciones.iteraciones}\n`;
        reporte += `  Tiempo promedio: ${formatearTiempo(mediciones.promedio)}\n`;
        reporte += `  Tiempo mínimo: ${formatearTiempo(mediciones.minimo)}\n`;
        reporte += `  Tiempo máximo: ${formatearTiempo(mediciones.maximo)}\n`;
        reporte += `  Desviación estándar: ${formatearTiempo(mediciones.desviacionEstandar)}\n`;
        
        // Mostrar tiempos individuales
        reporte += `  Tiempos individuales:\n`;
        mediciones.tiempos.forEach((t, i) => {
            reporte += `    Iteración ${i + 1}: ${formatearTiempo(t)}\n`;
        });
    }
    
    // Análisis comparativo
    reporte += '\n\nANÁLISIS COMPARATIVO\n';
    reporte += '-'.repeat(80) + '\n';
    
    const datasets = Object.keys(resultados.ordenamiento);
    if (datasets.length >= 2) {
        reporte += '\nEscalabilidad del MergeSort:\n';
        for (let i = 1; i < datasets.length; i++) {
            const anterior = resultados.ordenamiento[datasets[i-1]];
            const actual = resultados.ordenamiento[datasets[i]];
            const ratioTamaños = actual.tamano / anterior.tamano;
            const ratioTiempos = actual.promedio / anterior.promedio;
            reporte += `  ${datasets[i-1]} -> ${datasets[i]}:\n`;
            reporte += `    Ratio de tamaños: ${ratioTamaños.toFixed(2)}x\n`;
            reporte += `    Ratio de tiempos: ${ratioTiempos.toFixed(2)}x\n`;
        }
    }
    
    // Guardar reporte en archivo
    fs.writeFileSync(rutaArchivo, reporte, 'utf8');
    console.log(`\nReporte guardado en: ${path.resolve(rutaArchivo)}`);
    
    return reporte;
}

module.exports = {
    medirTiempo,
    formatearTiempo,
    ejecutarMediciones,
    generarReporte
};
