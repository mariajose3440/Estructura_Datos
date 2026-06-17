/**
 * floor =  sirve para delimitar el número random
 * @author bluebul
 */


const numeroSecreto = Math.floor(Math.random()*10 + 1);
const numeroJugador = parseInt(prompt("Adivina el número secreto del 1 al 10: "));

console.log ("Este es el número con el que juegas : " + numeroJugador);

if(numeroJugador == numeroSecreto){
    console.log("Felicitaciones, adivinaste el número secreto!");
}else if(numeroJugador < numeroSecreto){
    console.log("número menor, intenta nuevamente");
}else{
    console.log("número mayor/número muy alto, intenta nuevamente");
}
