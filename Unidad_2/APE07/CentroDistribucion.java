package Unidad_2.APE07;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Centro de Distribución optimizado.
 *
 * Política de inventario:
 *   - Posiciones iniciales (0, 1, 2 …): paquetes con código postal único (sin repetir).
 *   - Posiciones finales: grupos de paquetes duplicados, ordenados de menor a mayor
 *     frecuencia de código postal.
 *
 * Estructuras de datos utilizadas:
 *   - {@link ColaPaquete}: buffer de entrada FIFO — refleja el orden de llegada
 *     del camión antes de trasladar al inventario principal.
 *   - {@link PilaPaquete}: pila de despacho LIFO — los paquetes del grupo con mayor
 *     frecuencia se apilan aquí tras la reorganización; el pop() entrega siempre
 *     el último en llegar del grupo más demandado.
 *   - {@code ArrayList<Paquete>}: inventario principal ordenado por MergeSort.
 *
 * Despacho (LIFO vía PilaPaquete):
 *   Tras reorganizarInventario() los paquetes del grupo con mayor frecuencia
 *   se apilan en {@code pilaDespacho}; el despacho retira desde la cima.
 *
 * Ordenamiento interno: MergeSort (O(n log n)) — óptimo para 50 000, 75 000 y
 * 1 000 000 de registros gracias a su comportamiento estable y predecible.
 *
 * @author bluebul
 */
public class CentroDistribucion {

    private ArrayList<Paquete> inventario;

    /**
     * Buffer de entrada FIFO: los paquetes llegan en orden de camión.
     * Al llamar a recibirCajaCamion() el paquete entra a la cola primero;
     * vaciarColaAlInventario() los transfiere al inventario principal.
     */
    private ColaPaquete colaEntrada;

    /**
     * Pila de despacho LIFO: cargada con el grupo de mayor frecuencia
     * después de cada reorganizarInventario().
     */
    private PilaPaquete pilaDespacho;

    /** Capacidad máxima de la cola y de la pila (ajustable). */
    private static final int CAPACIDAD_MAX = 1_100_000;

    public CentroDistribucion() {
        this.inventario    = new ArrayList<>();
        this.colaEntrada   = new ColaPaquete(CAPACIDAD_MAX);
        this.pilaDespacho  = new PilaPaquete(CAPACIDAD_MAX);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // RECEPCIÓN  (FIFO — ColaPaquetes)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Recibe un paquete del camión encolándolo primero (FIFO) y luego
     * trasladándolo al inventario principal, conservando el orden de llegada.
     *
     * @param p paquete recibido
     */
    public void recibirCajaCamion(Paquete p) {
        colaEntrada.enqueue(p);             // entra por la cola (FIFO)
        Paquete siguiente = colaEntrada.dequeue();
        if (siguiente != null) {
            this.inventario.add(siguiente); // pasa al inventario en orden de llegada
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DESPACHO  (LIFO — PilaPaquete)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Despacha el paquete en la cima de la pila LIFO.
     * La pila se carga con el grupo de mayor frecuencia durante
     * {@link #reorganizarInventario()}, por lo que se atienden primero
     * las rutas con más paquetes acumulados.
     *
     * @return el paquete despachado, o {@code null} si la pila está vacía.
     */
    public Paquete despacharACliente() {
        return pilaDespacho.pop();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // REORGANIZACIÓN PRINCIPAL
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Reorganiza el inventario aplicando los siguientes pasos:
     * <ol>
     *   <li>Ordena todos los paquetes por código postal con MergeSort.</li>
     *   <li>Separa paquetes únicos de grupos duplicados.</li>
     *   <li>Ordena los grupos duplicados de menor a mayor cantidad (frecuencia).</li>
     *   <li>Reconstruye el arreglo: únicos primero, luego duplicados
     *       (de menor a mayor frecuencia) para que el despacho LIFO
     *       atienda el grupo más grande al final.</li>
     * </ol>
     */
    public void reorganizarInventario() {

        if (this.inventario.isEmpty()) return;

        // Paso 1 ─ Ordenar por código postal con MergeSort
        ordenarPorFusion();

        // Paso 2 ─ Separar únicos y grupos de duplicados
        ArrayList<Paquete> unicos   = new ArrayList<>();
        // Cada entrada del mapa: codigoPostal → lista de paquetes con ese CP
        Map<Integer, ArrayList<Paquete>> mapaGrupos = new HashMap<>();

        int n = inventario.size();
        int i = 0;
        while (i < n) {
            int cpActual = inventario.get(i).getCodigoPostal();
            int j = i + 1;
            // Avanzar mientras el siguiente tenga el mismo CP (arreglo ya ordenado)
            while (j < n && inventario.get(j).getCodigoPostal() == cpActual) {
                j++;
            }
            int cantidad = j - i;
            if (cantidad == 1) {
                unicos.add(inventario.get(i));
            } else {
                ArrayList<Paquete> grupo = new ArrayList<>();
                for (int k = i; k < j; k++) {
                    grupo.add(inventario.get(k));
                }
                mapaGrupos.put(cpActual, grupo);
            }
            i = j;
        }

        // Paso 3 ─ Ordenar los grupos duplicados por frecuencia (menor → mayor)
        //          usando MergeSort sobre la lista de entradas del mapa
        ArrayList<Map.Entry<Integer, ArrayList<Paquete>>> entradas =
                new ArrayList<>(mapaGrupos.entrySet());
        ordenarGruposPorFrecuencia(entradas, 0, entradas.size() - 1);

        // Paso 4 ─ Reconstruir el inventario
        //   [ únicos | grupo_freq_menor | ... | grupo_freq_mayor ]
        this.inventario.clear();
        this.inventario.addAll(unicos);
        for (Map.Entry<Integer, ArrayList<Paquete>> entrada : entradas) {
            this.inventario.addAll(entrada.getValue());
        }

        // Paso 5 ─ Cargar la PilaPaquete con el grupo de MAYOR frecuencia (último en entradas)
        //          La pila LIFO entregará el último paquete apilado en despacharACliente().
        this.pilaDespacho = new PilaPaquete(CAPACIDAD_MAX);   // reiniciar pila
        if (!entradas.isEmpty()) {
            // El último elemento en 'entradas' es el grupo con mayor frecuencia
            ArrayList<Paquete> grupoMayor = entradas.get(entradas.size() - 1).getValue();
            for (Paquete p : grupoMayor) {
                pilaDespacho.push(p);   // apilar en orden; pop() retirará el último
            }
        } else if (!unicos.isEmpty()) {
            // Si no hay duplicados, apilar el último paquete único
            pilaDespacho.push(unicos.get(unicos.size() - 1));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MERGESORT — paquetes por código postal
    // ─────────────────────────────────────────────────────────────────────────

    /** Punto de entrada público para ordenar el inventario completo. */
    public void ordenarPorFusion() {
        ordenarPorFusion(this.inventario, 0, this.inventario.size() - 1);
    }

    private void ordenarPorFusion(ArrayList<Paquete> lista, int izq, int der) {
        if (izq < der) {
            int medio = izq + (der - izq) / 2;
            ordenarPorFusion(lista, izq, medio);
            ordenarPorFusion(lista, medio + 1, der);
            fusionar(lista, izq, medio, der);
        }
    }

    private void fusionar(ArrayList<Paquete> lista, int izq, int medio, int der) {
        int n1 = medio - izq + 1;
        int n2 = der - medio;

        ArrayList<Paquete> izquierdo = new ArrayList<>(n1);
        ArrayList<Paquete> derecho   = new ArrayList<>(n2);

        for (int i = 0; i < n1; i++) izquierdo.add(lista.get(izq + i));
        for (int j = 0; j < n2; j++) derecho.add(lista.get(medio + 1 + j));

        int i = 0, j = 0, k = izq;

        while (i < n1 && j < n2) {
            if (izquierdo.get(i).getCodigoPostal() <= derecho.get(j).getCodigoPostal()) {
                lista.set(k++, izquierdo.get(i++));
            } else {
                lista.set(k++, derecho.get(j++));
            }
        }
        while (i < n1) lista.set(k++, izquierdo.get(i++));
        while (j < n2) lista.set(k++, derecho.get(j++));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MERGESORT — grupos de duplicados por frecuencia
    // ─────────────────────────────────────────────────────────────────────────
    private void ordenarGruposPorFrecuencia(
            ArrayList<Map.Entry<Integer, ArrayList<Paquete>>> lista, int izq, int der) {
        if (izq < der) {
            int medio = izq + (der - izq) / 2;
            ordenarGruposPorFrecuencia(lista, izq, medio);
            ordenarGruposPorFrecuencia(lista, medio + 1, der);
            fusionarGrupos(lista, izq, medio, der);
        }
    }

    private void fusionarGrupos(
            ArrayList<Map.Entry<Integer, ArrayList<Paquete>>> lista,
            int izq, int medio, int der) {

        int n1 = medio - izq + 1;
        int n2 = der - medio;

        ArrayList<Map.Entry<Integer, ArrayList<Paquete>>> left  = new ArrayList<>(n1);
        ArrayList<Map.Entry<Integer, ArrayList<Paquete>>> right = new ArrayList<>(n2);

        for (int i = 0; i < n1; i++) left.add(lista.get(izq + i));
        for (int j = 0; j < n2; j++) right.add(lista.get(medio + 1 + j));

        int i = 0, j = 0, k = izq;

        while (i < n1 && j < n2) {
            // Ordenar de menor a mayor frecuencia
            if (left.get(i).getValue().size() <= right.get(j).getValue().size()) {
                lista.set(k++, left.get(i++));
            } else {
                lista.set(k++, right.get(j++));
            }
        }
        while (i < n1) lista.set(k++, left.get(i++));
        while (j < n2) lista.set(k++, right.get(j++));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // UTILIDADES
    // ─────────────────────────────────────────────────────────────────────────

    /** Vacía el inventario, la cola de entrada y la pila de despacho. */
    public void limpiarInventario() {
        this.inventario.clear();
        this.colaEntrada  = new ColaPaquete(CAPACIDAD_MAX);
        this.pilaDespacho = new PilaPaquete(CAPACIDAD_MAX);
    }

    /**
     * Retorna un resumen del estado actual del inventario:
     * cuántos paquetes únicos y cuántos grupos/duplicados existen.
     */
    public String resumenInventario() {
        Map<Integer, Integer> frecuencias = new HashMap<>();
        for (Paquete p : inventario) {
            frecuencias.merge(p.getCodigoPostal(), 1, Integer::sum);
        }
        long unicos = frecuencias.values().stream().filter(v -> v == 1).count();
        long grupos = frecuencias.values().stream().filter(v -> v > 1).count();

        StringBuilder sb = new StringBuilder();
        sb.append("=== Resumen de inventario ===\n");
        sb.append("Total paquetes : ").append(inventario.size()).append("\n");
        sb.append("CPs únicos     : ").append(unicos).append("\n");
        sb.append("CPs duplicados : ").append(grupos).append("\n");

        return sb.toString();
    }

    /** Tamaño actual del inventario. */
    public int tamanoInventario() {
        return this.inventario.size();
    }
}
