import React, { useState } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux"
import App from "./app";
import store from "./store";

const rootElement = document.getElementById("root");

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement);

console.log("Antes del fetch");
const promesa = fetch('http://localhost:5000/productos');

let productos = null;

/*
* Una promesa se ejecuta en segundo plano,
* por lo que el codigo dentro de la promesa no se ejecuta
* hasta que ya se ejecutaron todas las lineas de codigo
* que estan fuera de la promesa.
*/
promesa
    // este then lee el body del response y lo pasa al siguiente
    .then((response) => {
        return response.json();
    })
    // este then recibe el json del then anterior
    .then((response) => {
        productos = response;
        console.log("success: ", productos);
        return "success";
    })
    .then((p) => {
        console.log('tercer then: ', p);
    })
    .catch(() => {
        console.log("error");
    });

console.log("Luego del fetch ", productos);