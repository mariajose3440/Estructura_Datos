package Unidad_2.APE07;

/**
 * Gestión y ordenamiento de rutas de paquetes.
 *
 * Métodos disponibles:
 *   - ordenar(Paquete[])          : Bubble Sort por código postal (O n²).
 *   - procesarConColaLineal       : demuestra una cola lineal (arreglo fijo).
 *   - procesarConColaCircular     : demuestra una cola circular (arreglo reutilizable).
 *   - procesarConPilaLIFO         : demuestra una pila LIFO (PilaPaquete).
 *
 * DIFERENCIA: Cola lineal vs. cola circular
 * ─────────────────────────────────────────────────────────────────────────────
 * Cola LINEAL   : frente y fin avanzan solo hacia la derecha.
 *                 Cuando fin llega al tope, ya no hay espacio aunque el inicio
 *                 del arreglo esté vacío → desperdicio de memoria.
 *                 Solo sirve si se vacía completamente antes de reusar.
 *
 * Cola CIRCULAR : fin = (fin + 1) % capacidad
 *                 frente = (frente + 1) % capacidad
 *                 El fin "da la vuelta" y reutiliza los espacios liberados
 *                 por dequeue → sin desperdicio, capacidad máxima aprovechada.
 *                 Es la implementación de ColaPaquetes.
 *
 * Martes Lección,
 * @author bluebul
 */
public class GestorRutas {

    // ─────────────────────────────────────────────────────────────────────────
    // BUBBLE SORT — ordenamiento por código postal
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Ordena un arreglo de paquetes por código postal usando Bubble Sort.
     * Complejidad: O(n²) — adecuado para arreglos pequeños.
     * En cada pasada el mayor elemento "burbujea" hacia el final.
     * Incluye optimización de bandera: si no hubo intercambios, ya está ordenado.
     *
     * @param datos arreglo de paquetes a ordenar (modificado en sitio)
     */
    public static void ordenar(Paquete[] datos) {
        int n = datos.length;
        for (int i = 0; i < n - 1; i++) {
            boolean huboIntercambio = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (datos[j].getCodigoPostal() > datos[j + 1].getCodigoPostal()) {
                    // Intercambiar posiciones j y j+1
                    Paquete temp = datos[j];
                    datos[j]     = datos[j + 1];
                    datos[j + 1] = temp;
                    huboIntercambio = true;
                }
            }
            // Optimización: si no hubo intercambios, el arreglo ya está ordenado
            if (!huboIntercambio) break;
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // COLA LINEAL — arreglo con punteros que solo avanzan hacia la derecha
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Procesa paquetes usando una cola LINEAL (arreglo de tamaño fijo).
     * Demuestra la limitación: cuando fin alcanza el tope no se puede
     * insertar más aunque el inicio esté vacío (espacios desperdiciados).
     *
     * @param paquetes arreglo de paquetes de entrada
     * @return arreglo con los paquetes procesados en orden FIFO
     */
    public static Paquete[] procesarConColaLineal(Paquete[] paquetes) {
        int capacidad = paquetes.length;
        Paquete[] colaLineal = new Paquete[capacidad]; // arreglo de tamaño fijo
        int frente = 0;
        int fin    = 0; // fin avanza pero NUNCA retrocede (lineal)

        // Enqueue: solo inserta si fin no llegó al tope
        for (Paquete p : paquetes) {
            if (fin < capacidad) {
                colaLineal[fin] = p;
                fin++;
            }
            // Si fin == capacidad y frente > 0, esos espacios iniciales están
            // vacíos pero la cola lineal los ignora → desperdicio de memoria.
        }

        // Dequeue en orden FIFO
        Paquete[] resultado = new Paquete[fin - frente];
        int idx = 0;
        while (frente < fin) {
            resultado[idx++] = colaLineal[frente];
            colaLineal[frente] = null; // liberar referencia
            frente++;
        }
        return resultado;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // COLA CIRCULAR — usa operador módulo para reutilizar el espacio
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Procesa paquetes usando la cola CIRCULAR ColaPaquetes.
     * El operador módulo permite reutilizar los espacios liberados
     * por dequeue, eliminando el desperdicio de la cola lineal.
     *
     * @param paquetes arreglo de paquetes de entrada
     * @return arreglo con los paquetes procesados en orden FIFO
     */
    public static Paquete[] procesarConColaCircular(Paquete[] paquetes) {
        ColaPaquete cola = new ColaPaquete(paquetes.length);

        // Enqueue — fin avanza circularmente: fin = (fin + 1) % capacidad
        for (Paquete p : paquetes) {
            cola.enqueue(p);
        }

        // Dequeue en orden FIFO hasta vaciar la cola
        Paquete[] resultado = new Paquete[paquetes.length];
        int idx = 0;
        Paquete p;
        while (!cola.isEmpty()) {
            p = cola.dequeue();
            if (p != null) resultado[idx++] = p;
        }
        return resultado;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PILA LIFO — usa PilaPaquete para orden inverso al de llegada
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Procesa paquetes usando la pila LIFO PilaPaquete.
     * El último paquete apilado es el primero en ser despachado.
     * Útil para priorizar los paquetes más recientes del grupo de mayor frecuencia.
     *
     * @param paquetes arreglo de paquetes de entrada
     * @return arreglo con los paquetes procesados en orden LIFO (inverso)
     */
    public static Paquete[] procesarConPilaLIFO(Paquete[] paquetes) {
        PilaPaquete pila = new PilaPaquete(paquetes.length);

        // Push — apilar todos los paquetes en orden de llegada
        for (Paquete p : paquetes) {
            pila.push(p);
        }

        // Pop — retirar en orden inverso (LIFO): el último apilado sale primero
        Paquete[] resultado = new Paquete[pila.size()];
        int idx = 0;
        while (!pila.isEmpty()) {
            resultado[idx++] = pila.pop();
        }
        return resultado;
    }
}
