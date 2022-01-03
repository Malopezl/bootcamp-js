// let index = 0;

const ActionTypes = {
    ProductoAgregado: "producto:agregado",
    ProductoModificado: "producto:modificado",
    ProductoEliminado: "producto:eliminado",
    ProductoSeleccionado: "producto:seleccionado",
    ProductoAgregadoModificado: "producto:agregado:o:modificado",
}

export const reducer = (state, action) => {

    switch (action.type) {
        case ActionTypes.ProductoAgregado:
            return productoAgregadoReducer(state, action);

        case ActionTypes.ProductoModificado:
            return productoModificadoReducer(state, action);

        case ActionTypes.ProductoEliminado:
            return productoEliminadoReducer(state, action);

        case ActionTypes.ProductoSeleccionado: {
            return productoSeleccionadoReducer(state, action);
        }

        default:
            return state;
    }

    // if (action.type == ActionTypes.ProductoAgregado) {
    //     // index++;
    //     const producto = action.payload;
    //     // const code = index;
    //     const total = producto.quantity * producto.price;
    //     return {
    //         ...state,
    //         productos: [
    //             ...state.productos,
    //             {
    //                 ...producto,
    //                 // code,
    //                 total
    //             }
    //         ]
    //     };
    // }

    // if (action.type == ActionTypes.ProductoModificado) {
    //     const producto = action.payload;
    //     const productos = state.productos.slice();
    //     const code = producto.code;
    //     const total = producto.quantity * producto.price;
    //     const old =productos.find((item) => item.code == code);
    //     const index = productos.indexOf(old);
    //     productos[index] = {...producto, total };
    //     return {
    //         ...state,
    //         productos
    //     }
    // }

    // if (action.type == ActionTypes.ProductoEliminado) {
    //     const code = action.payload.code;
    //     const productos = state.productos.filter((item) => item.code != code);
    //     return { ...state, productos }
    // }

    // if (action.type == ActionTypes.ProductoSeleccionado) {
    //     const code = action.payload.code;
    //     return {
    //         ...state,
    //         producto: state.productos.find(x => x.code == code) || {}
    //     }
    // }

    // return state;
};

export const productoSeleccionado = (code) => ({
    type: ActionTypes.ProductoSeleccionado,
    payload: {
        code
    }
});

// Aqui se define un metodo externo
// const productosStore = {
//     reducer,
//     productoSeleccionado,
// }

export const productoEliminado = (code) => ({
    type: ActionTypes.ProductoEliminado,
    payload: { code }
});

export const productoModificado = (payload) => ({
    type: ActionTypes.ProductoModificado,
    payload
});

export const productoAgregado = (payload) => ({
    type: ActionTypes.ProductoAgregado,
    payload
});

export const agregarOModificarProducto = (payload) => ({
    type: ActionTypes.ProductoAgregadoModificado,
    payload
});

/*
* un middleware es una funcion que retorna otra funcion
*/
// function loggerMiddleware(store) {
//     /*
//     * Esta funcion encierra todas las llamadas que se hagan al dispatch
//     * es decir, todas las acciones del dispatch pasan antes por esta funcion.
//     *
//     * next: es una funcion que llamamos cuando queremos que se ejecute el
//     *       action original.
//     *
//     * Esta funcion tambien retorna otra funcion
//     */
//     return function dispatchWrapper(next) {
//         return function actionHandler(action) {
//             // console.log("dispatching", action);
//             const stateA = store.getState();
//             // console.log("dispatching", action);
//             // console.log("state before", stateA);
//             next(action);
//             const state = store.getState();
//             // console.log("state after", stateB);
//             console.log("dispatched", action);
//             console.log("state", state);
//         }
//     }
// }

export const loggerMiddleware = store => next => action => {
    console.log("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    return result;
}

export const agregarOModificarProductoMiddleware = store => next => action => {
    if (action.type != ActionTypes.ProductoAgregadoModificado) {
        return next(action);
    }

    const producto = action.payload;
    const actionToDispatch = producto.code
        ? productoModificado(producto)
        : productoAgregado(producto);
    // if (producto.code) {
    //     actionToDispatch = store.dispatch(productoModificado(producto));
    // } else {
    //     actionToDispatch = store.dispatch(productoAgregado(producto));
    // }

    store.dispatch(actionToDispatch);
    return store.dispatch(productoSeleccionado(null));
}

function productoSeleccionadoReducer(state, action) {
    const code = action.payload.code;
    return {
        ...state,
        producto: state.productos.find(x => x.code == code) || {}
    };
}

function productoEliminadoReducer(state, action) {
    const code = action.payload.code;
    const productos = state.productos.filter((item) => item.code != code);
    return { ...state, productos };
}

function productoModificadoReducer(state, action) {
    const producto = action.payload;
    const productos = state.productos.slice();
    const code = producto.code;
    const total = producto.quantity * producto.price;
    const old = productos.find((item) => item.code == code);
    const index = productos.indexOf(old);
    productos[index] = { ...producto, total };
    return {
        ...state,
        productos
    };
}

function productoAgregadoReducer(state, action) {
    const producto = action.payload;
    const total = producto.quantity * producto.price;
    return {
        ...state,
        productos: [
            ...state.productos,
            {
                ...producto,
                total
            }
        ]
    };
}

export function generadorCodigoProductoBuilder(codigoInicial) {
    let code = codigoInicial;
    return store => next => action => {
        if (action.type != ActionTypes.ProductoAgregado) {
            return next(action);
        }
        code++;
        const actionToDispatch = {
            ...action,
            payload: {
                ...action.payload,
                code
            }
        };
        action.payload = { ...action.payload, code };
        return next(actionToDispatch);
    }
}