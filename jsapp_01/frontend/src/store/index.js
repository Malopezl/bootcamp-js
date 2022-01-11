import { applyMiddleware, combineReducers, createStore } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import apiMiddleware from "./api-redux";
import * as $store from "./store";

const history = createBrowserHistory();

const preloadedState = {
    producto: {},
    productos: []
};

const middlewares = applyMiddleware(
    $store.loggerMiddleware,
    routerMiddleware(history),
    apiMiddleware,
    $store.agregarOModificarProductoMiddleware,
    // $store.generadorCodigoProductoBuilder(100),
    // $store.storageMiddleware,
);

const reducer = combineReducers({
    router: connectRouter(history),
    producto: $store.producto,
    productos: $store.productos
});

const store = createStore(reducer, preloadedState, middlewares);

export { history };
export default store;