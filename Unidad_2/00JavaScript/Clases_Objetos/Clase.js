/**
 * Las clases son plantillas o moldes para crear objetos.
 * Se definen con la palabra reservada "class".
 * @author bluebul
 */
class Curso {
  // No existe el concepto de visibilidad real (todo es público por defecto)
  // No existen tipos
  // Solo puede haber un constructor por clase

    constructor(titulo, dificultad) {
        this.titulo = titulo;
        // El guion bajo es solo una CONVENCIÓN para indicar "no tocar directamente",
        // pero no impide el acceso real (no es privado de verdad)
        this._dificultad = dificultad;
        this.lecciones = [];
    }

    // ESTÁTICOS: pertenecen a la clase, no a las instancias
    static BASE_URL = 'desarrolloutil.com/cursos/';

    static saludar() {
        console.log("Saludos, soy Bluebul");
    }

    agregarLeccion(leccion) {
        this.lecciones.push(leccion);
    }

    eliminarUltimaLeccion() {
        this.lecciones.pop();
    }

    /**
     * Getter: evita exponer directamente el atributo
     */
    get dificultad() {
        console.log("GETTER");
        return this._dificultad;
    }

    /**
     * Setter: valida antes de modificar el atributo
     */
    set dificultad(nuevaDificultad) {
        if (nuevaDificultad > 0 && nuevaDificultad <= 5) {
            this._dificultad = nuevaDificultad;
        } else {
            console.log("No hace nada");
        }
    }
}

const cursoJS = new Curso("JavaScript", 1);
const cursoTS = new Curso("TypeScript", 3);

cursoJS.agregarLeccion("Intro a JS");
cursoJS.agregarLeccion("Variables");
cursoJS.agregarLeccion("Tipos de datos");

console.log(cursoJS, cursoTS);

/**
 * Ejemplo de mala práctica: sobreescribir un método de instancia.
 * JavaScript lo permite porque no hay encapsulamiento real,
 * pero NO se debería hacer.
 */
cursoJS.eliminarUltimaLeccion = () => console.log("No hago nada");
cursoJS.eliminarUltimaLeccion(); // ya no llama al método original

/**
 * Uso del setter: solo acepta valores entre 1 y 5
 */
cursoJS.dificultad = 7;            // inválido -> imprime "No hace nada"
console.log(cursoJS.dificultad);   // sigue siendo 1

cursoJS.dificultad = 3;            // válido, se actualiza
cursoJS._dificultad = 7;           // bypass directo del setter (otra "mala práctica")

console.log(Curso.BASE_URL);
Curso.saludar();

/**
 * La clase Number también tiene atributos/métodos estáticos
 */
console.log("Atributos estáticos en la clase Number");
console.log(Number.EPSILON);
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MAX_VALUE);
// Number.parseInt(...)