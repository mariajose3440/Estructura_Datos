package Unidad_2.APE07;

/**
 * Estructura de datos tipo cola circular (Queue) con principio FIFO.
 *
 * FIFO — First In, First Out:
 *   El primer paquete encolado con enqueue() es el primero en salir con dequeue().
 *   Refleja el orden real de llegada de los paquetes del camión.
 *
 * Cola CIRCULAR vs. Cola LINEAL:
 *   - Cola LINEAL : frente y fin solo avanzan hacia la derecha.
 *     Cuando fin llega al tope no hay espacio aunque el inicio esté vacío → desperdicio.
 *   - Cola CIRCULAR: fin = (fin + 1) % capacidad
 *     El fin "da la vuelta" y reutiliza los espacios liberados por dequeue.
 *     Sin desperdicio — capacidad máxima aprovechada en todo momento.
 *
 * Métodos disponibles:
 *   - enqueue(Paquete) : inserta un paquete al final de la cola.
 *   - dequeue()        : retira y retorna el paquete del frente (FIFO).
 *   - isEmpty()        : indica si la cola está vacía.
 *   - size()           : retorna la cantidad de elementos en la cola.
 *
 * @author bluebul
 */
public class ColaPaquete {
    private Paquete[] queue;
    private int frente, fin, total;

    public ColaPaquete(int capacidad) {
        this.queue  = new Paquete[capacidad];
        this.frente = 0;
        this.fin    = 0;
        this.total  = 0;
    }

    /**
     * Inserta un paquete al final de la cola (FIFO).
     * Cola circular: cuando fin llega al tope del arreglo, el operador módulo
     * lo regresa al inicio (posición 0), reutilizando los espacios liberados
     * por dequeue.
     *
     * @param p paquete a encolar; se ignora si la cola está llena
     */
    public void enqueue(Paquete p) {
        if (total < queue.length) {
            queue[fin] = p;
            fin = (fin + 1) % queue.length;   // avanzar circularmente
            total++;
        }
    }

    /**
     * Retira y retorna el paquete del frente de la cola (FIFO).
     * El frente avanza circularmente igual que el fin, reutilizando posiciones.
     *
     * @return el paquete del frente, o {@code null} si la cola está vacía
     */
    public Paquete dequeue() {
        // FIFO: se retira siempre desde el frente de la cola.
        if (total == 0) {
            return null;                       // cola vacía
        }
        Paquete p = queue[frente];
        queue[frente] = null;                  // liberar referencia para el GC
        frente = (frente + 1) % queue.length;  // avanzar circularmente
        total--;
        return p;
    }

    /**
     * Indica si la cola no contiene elementos.
     *
     * @return {@code true} si la cola está vacía, {@code false} en caso contrario
     */
    public boolean isEmpty() {
        return total == 0;
    }

    /**
     * Retorna la cantidad de paquetes actualmente en la cola.
     *
     * @return número de elementos en la cola (0 si está vacía)
     */
    public int size() {
        return total;
    }
}