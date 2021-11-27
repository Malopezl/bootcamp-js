/*
* las constantes permiten cambiar modificar las
* propiedades del objeto pero no permite cambiar
* los tipos de datos ni agregar nuevos valores
*/
const juan = {
    nombre: "juan",
    apellido: "Rodriguez",
    edad: 30
};

juan.apellido = "Perez";
// console.log(juan);

// const juan2 = juan;
// juan2.apellido = "Perez";
// console.log(juan2);

// const juan2 = Object.assign({}, juan);
// juan2.apellido = "Perez";

// const juan2 = Object.assign({}, juan, { apellido: "Perez" });

const juan3 = {
    nombre: "juan",
    apellido: "Rodriguez",
    edad: 30,
    direccion: {
        departamento: "Guatemala",
        municipio: "Guatemala"
    }
};

/*
* a ... se le conoce como spread operator
* toma todos los valores y se los asigna a la variable
* que se esta inicializando y cambia los valores por los
* definidos
*/
const juan2 = {
    ...juan3,
    apellido: "Perez",
    telefono: "12345678",
    direccion: {
        ...juan3.direccion,
        municipio: "Mixco",
        aldea: "1",
    }
};

// juan2.direccion.municipio = "Mixco";
// console.log(juan2);

// arreglos inmutables
const numeros = [1, 2, 3];
const numeros2 = [...numeros, 4];
// numeros2.push(4);

console.log("numeros: ", numeros);
console.log("numeros 2", numeros2);