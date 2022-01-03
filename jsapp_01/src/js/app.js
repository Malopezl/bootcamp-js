import { applyMiddleware, createStore } from "redux";
import { ui } from "./ui";
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

// let latestState;

// store.subscribe(() => {
//     let currentState = store.getState();
//     if (currentState != latestState) {
//         latestState = currentState;
//         ui.renderForm(currentState.producto);
//         ui.renderTable(currentState.productos);
//     }
// });

store.subscribe(dispatchOnChange(store, (state) => {
    ui.renderForm(state.producto);
    ui.renderTable(state.productos);
}))

// En un arrow function si solo es 1 parametro no es necesario los parentesis
ui.onFormSubmit = (producto) => store.dispatch($store.agregarOModificarProducto(producto));

ui.onEliminarClick = (code) => store.dispatch($store.productoEliminado(code));

ui.onEditarClick = (code) => store.dispatch($store.productoSeleccionado(code));

function dispatchOnChange(store, dispatch) {
    let latestState;

    return function () {
        let currentState = store.getState();
        if (currentState != latestState) {
            latestState = currentState;
            dispatch(currentState);
        }
    }
}