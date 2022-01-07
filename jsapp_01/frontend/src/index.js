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

test();

async function test() {
    try {
        console.log("Antes del fetch");
        const response = await axios.get('http://localhost:5000/productos');
        const productos = response.data;
        console.log("productos: ", productos);
        console.log("Luego del fetch ", productos);
    } catch (error) {
        console.log("error en el request: ", error);
    }
}