import React, { useState } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";
import App from "./app";
import store from "./store";

const rootElement = document.getElementById("root");

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement);

console.log("Antes del fetch");
const promesa = axios.get('http://localhost:5000/productos');

let productos = null;

/*
* Una promesa se ejecuta en segundo plano,
* por lo que el codigo dentro de la promesa no se ejecuta
* hasta que ya se ejecutaron todas las lineas de codigo
* que estan fuera de la promesa.
*/
promesa
    .then(response => response.data)
    .then((data) => {
        productos = data;
        console.log("success: ", productos);
    })
    .catch(() => {
        console.log("error");
    });

console.log("Luego del fetch ", productos);