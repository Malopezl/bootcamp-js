import { applyMiddleware, createStore } from "redux";
import * as $store from "./store";

const preloadedState = {
    producto: {},
    productos: []
};

const middlewares = applyMiddleware(
    $store.loggerMiddleware,
    $store.agregarOModificarProductoMiddleware,
    $store.generadorCodigoProductoBuilder(0),
);

const store = createStore($store.reducer, preloadedState, middlewares);

export default store;