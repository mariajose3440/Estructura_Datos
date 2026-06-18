package Unidad_2.APE07;

public class Paquete {
    private int id;
    private int codigoPostalDestino;

    public Paquete(int id, int codigoPostalDestino) {
        this.id = id;
        this.codigoPostalDestino = codigoPostalDestino;
    }

    public int getId() {return id;}

    public int getCodigoPostal() {return codigoPostalDestino;}
}
