import { applyMiddleware, createStore } from "redux";
import * as $store from "./store";

const savedState = localStorage.getItem("state");
const deserialized = savedState && JSON.parse(savedState);

const preloadedState = deserialized || {
    producto: {},
    productos: []
};

const middlewares = applyMiddleware(
    $store.loggerMiddleware,
    $store.agregarOModificarProductoMiddleware,
    $store.generadorCodigoProductoBuilder(0),
    $store.storageMiddleware,
);

const store = createStore($store.reducer, preloadedState, middlewares);

export default store;