const preloadedState = {
    producto: {},
    productos: []
};

const middlewares = Redux.applyMiddleware(
    loggerMiddleware,
    agregarOModificarProductoMiddleware,
    generadorCodigoProductoBuilder(0),
);
const store = Redux.createStore(reducer, preloadedState, middlewares);

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
ui.onFormSubmit = (producto) => store.dispatch(agregarOModificarProducto(producto));

ui.onEliminarClick = (code) => store.dispatch(productoEliminado(code));

ui.onEditarClick = (code) => store.dispatch(productoSeleccionado(code));

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