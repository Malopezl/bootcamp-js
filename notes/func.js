const c = "hola ";

// funcion impura
function impure(text) {
    return c + text;
}
// console.log(impure("mundo"));

/*
* Funcion pura
* una funcion pura debe seguir devolviendo el mismo
* valor no importa el tiempo que pase.
*/
function pure(text) {
    return "hola " + text;
}
// console.log(pure("mundo"));

// una funcion que devuelve otra funcion
function msg(prefix) {
    /*
    * las funciones que no tienen nombre se les
    * conoce como funciones anonimas
    */
    return function(text) {
        return prefix + " " + text;
    }
}

/*
* funcion que nos define como concatenar
* el prefijo y el texto
*/
function msg1(prefix, formatter) {
    return function(text) {
        return formatter(prefix, text);
    }
}

/*
* las funciones constantes o variables las funciones
* deben ser declaradas antes de usarse
*/
const welcomeFormat = function(prefix, text) {
    return prefix + " " + text + "!";
}

const goodbyeFormat = function(prefix, text) {
    return prefix + " " + text + "! :c";
}

// const hola = msg1("hola", welcomeFormat);
// const adios = msg1("adios", goodbyeFormat);
// console.log(hola("mundo"));
// console.log(adios("mundo"));

/*
* arrow function son funciones que se realizan en una
* sola linea para reducir codigo y sea mas legible,
* aunque no es necesario ya que se pueden definir
* directamente en una variable
*/
const welcomeFormat1 = (prefix, text) => prefix + " " + text + "!";
const goodbyeFormat1 = (prefix, text) => prefix + " " + text + "! :c";

const msg2 = (prefix, formatter) => (text) => formatter(prefix, text)

// const hola = msg1("hola", (prefix, text) => prefix + " " + text + "!");
// const adios = msg1("adios", (prefix, text) => prefix + " " + text + "! :c");

// se puede interpolar
const hola = msg2("hola", (prefix, text) => `${prefix} ${text}!`);
const adios = msg2("adios", (prefix, text) => `${prefix} ${text}! :c`);
console.log(hola("mundo"));
console.log(adios("mundo"));