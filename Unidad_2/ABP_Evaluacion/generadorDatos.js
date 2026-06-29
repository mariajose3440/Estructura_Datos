/**
 * generadorDatos.js
 * Módulo encargado de generar los datos de libros para el sistema bibliotecario.
 * Crea datasets de diferentes tamaños con títulos únicos combinando palabras.
 */
const adjetivos = [
    "Rojo", "Azul", "Verde", "Oscuro", "Brillante", "Antiguo", "Moderno", "Misterioso",
    "Eterno", "Fugaz", "Silencioso", "Turbulento", "Profundo", "Lejano", "Cercano",
    "Olvidado", "Perdido", "Encontrado", "Sagrado", "Profano", "Último", "Primero",
    "Infinito", "Finito", "Claro", "Difuso", "Pesado", "Ligero", "Dulce", "Amargo"
];

const sustantivos = [
    "Horizonte", "Laberinto", "Espejo", "Castillo", "Jardín", "Océano", "Montaña",
    "Desierto", "Bosque", "Ciudad", "Aldea", "Río", "Estrella", "Luna", "Sol",
    "Viento", "Tormenta", "Niebla", "Fuego", "Hielo", "Cristal", "Sombra", "Luz",
    "Tiempo", "Espacio", "Sueño", "Realidad", "Destino", "Origen", "Final"
];

const generos = [
    "Misterio", "Aventura", "Romance", "Ciencia Ficción", "Fantasía",
    "Drama", "Comedia", "Terror", "Histórico", "Policial"
];

/**
 * Genera un título único combinando palabras aleatorias.
 * La combinación sigue el patrón: "Adjetivo + Sustantivo + de + Género"
 * 
 * @param {Set} titulosExistentes - Conjunto de títulos ya generados para evitar duplicados
 * @returns {string} Título único generado
 */
function generarTituloUnico(titulosExistentes) {
    let titulo;
    let intentos = 0;
    do {
        const adjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
        const sustantivo = sustantivos[Math.floor(Math.random() * sustantivos.length)];
        const genero = generos[Math.floor(Math.random() * generos.length)];
        
        titulo = `${adjetivo} ${sustantivo} de ${genero}`;
        intentos++;
        
        if (intentos > 100) {
            titulo = `${titulo} ${intentos}`;
            break;
        }
    } while (titulosExistentes.has(titulo));

    titulosExistentes.add(titulo);
    return titulo;
}

/**
 * Genera un dataset de libros con IDs y títulos únicos.
 * 
 * @param {number} cantidad - Cantidad de libros a generar
 * @returns {Array} Arreglo de objetos libro con propiedades id y titulo
 */
function generarLibros(cantidad) {
    const libros = [];
    const titulosExistentes = new Set();
    
    for (let i = 1; i <= cantidad; i++) {
        libros.push({
            id: i,
            titulo: generarTituloUnico(titulosExistentes)
        });
    }
    
    return libros;
}

/**
 * Genera datasets de diferentes tamaños para pruebas de rendimiento.
 * 
 * @returns {Object} Objeto con datasets de 1000, 25000 y 500000 libros
 */
function generarDatasets() {
    console.log("Generando dataset de 1,000 libros...");
    const dataset1000 = generarLibros(1000);
    
    console.log("Generando dataset de 25,000 libros...");
    const dataset25000 = generarLibros(25000);
    
    console.log("Generando dataset de 500,000 libros...");
    const dataset500000 = generarLibros(500000);
    
    return {
        pequeno: dataset1000,
        mediano: dataset25000,
        grande: dataset500000
    };
}

module.exports = { generarDatasets, generarLibros };
