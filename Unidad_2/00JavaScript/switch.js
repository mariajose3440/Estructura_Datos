/**
 * Cómo funciona los switch
 * @author bluebul
 */

let exp = "mangos";

switch(exp){
    case "mangos":
        //código
        console.log("los mangos cuestan $1");
        break;
    case "naranja":
        //codigo
        console.log("las naranjas cuestan  x10 $1");
        break;
    case "manzanas":
        //codigo
        console.log("las manzanas x5 cuestan $1")
        break;
    default:
        console.log(`Lo siento no contamos con ${exp}`);
        break;
}