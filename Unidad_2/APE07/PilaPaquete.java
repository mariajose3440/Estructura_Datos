package Unidad_2.APE07;

/**
 * Estructura de datos tipo pila (Stack) con principio LIFO.
 *
 * LIFO — Last In, First Out:
 *   El último paquete apilado con push() es el primero en salir con pop().
 *   Útil para el despacho prioritario: los paquetes del grupo con mayor
 *   frecuencia se apilan y se despachan en orden inverso de inserción.
 *
 * Métodos disponibles:
 *   - push(Paquete)  : apila un paquete en la cima.
 *   - pop()          : retira y retorna el paquete de la cima (LIFO).
 *   - peek()         : consulta la cima sin retirar el paquete.
 *   - isEmpty()      : indica si la pila está vacía.
 *   - size()         : retorna la cantidad de elementos apilados.
 *
 * @author bluebul
 */
public class PilaPaquete {
    private Paquete[] stack;
    private int top;

    public PilaPaquete(int capacidad) {
        this.stack = new Paquete[capacidad];
        this.top = -1; // -1 indica pila vacía (ningún elemento apilado aún)
    }

    /**
     * Apila un paquete en la cima de la pila.
     * Solo inserta si hay espacio disponible (top < capacidad - 1).
     *
     * @param p paquete a apilar
     */
    public void push(Paquete p) {
        // LIFO: apilar en la cima. Solo se inserta si hay espacio.
        if (top < stack.length - 1) {
            stack[++top] = p;
        }
    }

    /**
     * Retira y retorna el paquete en la cima de la pila (LIFO).
     * El índice top retrocede; el último elemento insertado es el primero en salir.
     *
     * @return el paquete en la cima, o {@code null} si la pila está vacía
     */
    public Paquete pop() {
        // LIFO: retirar siempre desde la cima (último en entrar, primero en salir).
        if (top == -1) {
            return null;          // pila vacía
        }
        Paquete p = stack[top];
        stack[top] = null;        // liberar referencia para el GC
        top--;
        return p;
    }

    /**
     * Consulta el paquete en la cima sin retirarlo de la pila.
     * Permite inspeccionar el próximo elemento a despachar sin consumirlo.
     *
     * @return el paquete en la cima, o {@code null} si la pila está vacía
     */
    public Paquete peek() {
        if (top == -1) {
            return null;          // pila vacía
        }
        return stack[top];
    }

    /**
     * Indica si la pila no contiene elementos.
     *
     * @return {@code true} si la pila está vacía, {@code false} en caso contrario
     */
    public boolean isEmpty() {
        return top == -1;
    }

    /**
     * Retorna la cantidad de paquetes actualmente apilados.
     *
     * @return número de elementos en la pila (0 si está vacía)
     */
    public int size() {
        return top + 1;
    }
}