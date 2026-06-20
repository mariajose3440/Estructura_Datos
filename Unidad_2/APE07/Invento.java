package Unidad_2.APE07;

import java.util.Random;

/**
 *
 * @author bluebul
 */
public class Invento {

    /**
     * Ordenar 50 mil paquetes y obtener el ultimo paquete despachado.
     */
    public static void ordenarPaquetes (CentroDistribucion centro, Random random, long cantidad){

        System.out.println("==========================================================================");
        System.out.println("||             GENERAR SEMILLA DE PAQUETES ("+ cantidad +")");                     ;
        System.out.println("==========================================================================");
        System.out.println("Progreso: Inicializando la generación de datos... Por favor, espere.\n");

        centro.limpiarInventario();

        int cont =0;
        while(cont < cantidad) {
            int id = cont +1;
            int codigoPostal = random.nextInt(50)*110101;
            if (codigoPostal != 0){
                Paquete paquete = new Paquete(id, codigoPostal);
                centro.recibirCajaCamion(paquete);
                ++cont;
            }

        }

        System.out.println("Ordenar los paquetes por codigo postal usando el metodo de ordenamiento Merge Sort.........");
        long inicio = System.currentTimeMillis();
        centro.reorganizarInventario();
        long fin = System.currentTimeMillis();

        double tiempoSegundos = (fin - inicio) / 1000.0;
        System.out.println("Tiempo de ordenamiento: " + tiempoSegundos + " segundos");

        System.out.println("Despachando paquete del grupo con mayor frecuencia (LIFO)...");

        Paquete despachado = centro.despacharACliente();

        if (despachado != null) {
            System.out.println("Paquete entregado: " + despachado.getId() + " - " + despachado.getCodigoPostal());
        }
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        CentroDistribucion centro = new CentroDistribucion();
        Random random = new Random(42);


        // 50 000 paquetes
        ordenarPaquetes(centro, random, 50000);
        System.out.println(centro.resumenInventario());

        // 75 000 paquetes
        ordenarPaquetes(centro, random, 75000);
        System.out.println(centro.resumenInventario());

        // 1 000 000 paquetes
        ordenarPaquetes(centro, random, 1000000);
        System.out.println(centro.resumenInventario());


    }
}
