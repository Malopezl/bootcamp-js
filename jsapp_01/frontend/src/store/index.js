import { applyMiddleware, createStore } from "redux";
import apiMiddleware from "./api-redux";
import * as $store from "./store";

// const savedState = localStorage.getItem("state");
// const deserialized = savedState && JSON.parse(savedState);

const preloadedState = {
    producto: {},
    productos: []
};

const middlewares = applyMiddleware(
    $store.loggerMiddleware,
    apiMiddleware,
    $store.agregarOModificarProductoMiddleware,
    // $store.generadorCodigoProductoBuilder(100),
    // $store.storageMiddleware,
);

const store = createStore($store.reducer, preloadedState, middlewares);

export default store;