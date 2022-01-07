const form = document.getElementsByTagName("form")[0];

/** @type {HTMLInputElement} */
const inputCode = document.getElementById("code");
/** @type {HTMLInputElement} */
const inputName = document.getElementById("txt");
/** @type {HTMLInputElement} */
const inputQuantity = document.getElementById("qt");
/** @type {HTMLInputElement} */
const inputPrice = document.getElementById("pr");
/** @type {HTMLInputElement} */
const selectCategory = document.getElementById("cat");

const tbody = document.getElementsByTagName("tbody")[0];
const totalQuantityElement = document.getElementById("total-quantity")
const totalPriceElement = document.getElementById("total-price")
const totalElement = document.getElementById("total")

const preloadedState = {
    producto: {},
    productos: []
};

let index = 100;
const reducer = (state, action) => {
    if (action.type == "producto:agregado") {
        index++;
        const producto = action.payload;
        const code = index;
        const total = producto.quantity * producto.price;
        // esto hace que el navegador se comporte mal
        // state.productos.push(action.payload);
        return {
            ...state,
            productos: [
                ...state.productos,
                {
                    ...producto,
                    code,
                    total
                }
            ]
        };
    }

    if (action.type == "producto:modificado") {
        const producto = action.payload;
        const productos = state.productos.slice();
        const code = producto.code;
        const total = producto.quantity * producto.price;
        const old =productos.find((item) => item.code == code);
        const index = productos.indexOf(old);
        productos[index] = {...producto, total };
        return {
            ...state,
            productos
        }
    }

    if (action.type == "producto:eliminado") {
        const code = action.payload.code;
        const productos = state.productos.filter((item) => item.code != code);
        return { ...state, productos }
    }

    if (action.type == "producto:seleccionado") {
        const code = action.payload.code;
        return {
            ...state,
            producto: state.productos.find(x => x.code == code) || {}
        }
    }

    return state;
};

const store = Redux.createStore(reducer, preloadedState);

let latestState;

/*
* la funcion subscribe nos devuelve una funcion para
* desubscribirnos de lo que esta sucediendo
*/
// const unsuscribe = store.subscribe(() => {
//     let currentState = store.getState();
//     if (currentState != latestState) {
//         latestState = currentState;
//         console.log("estado: ", store.getState());
//         renderTable(currentState.productos);
//     }
// });

store.subscribe(() => {
    let currentState = store.getState();
    if (currentState != latestState) {
        latestState = currentState;
        console.log("estado: ", store.getState());
        renderForm(currentState.producto);
        renderTable(currentState.productos);
    }
});

function renderForm(producto) {
    inputCode.value = producto.code || "";
    inputName.value = producto.name || "";
    inputQuantity.value = producto.quantity || "";
    inputPrice.value = producto.price || "";
    selectCategory.value = producto.category || 1;
}

function renderTable(productos) {
    const filas = productos.map((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.total}</td>
            <td>
                <div class="btn-group">
                    <a title="Editar" href='#' class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-pencil-square"></i>
                    </a>
                    <a title="Eliminar" href='#' class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash-fill"></i>
                    </a>
                </div>
            </td>
        `;

        const [editar, eliminar] = tr.getElementsByTagName("a");
        // const links = tr.getElementsByTagName("a");
        // const editar = links[0];
        // const eliminar = links[1];
        eliminar.addEventListener("click", (event) => {
            event.preventDefault();
            store.dispatch({
                type: "producto:eliminado",
                payload: {
                    code: item.code
                }
            });
        });

        editar.addEventListener("click", (event) => {
            event.preventDefault();
            store.dispatch({
                type: "producto:seleccionado",
                payload: {
                    code: item.code
                }
            });
        });

        return tr;
    });

    tbody.innerHTML = "";
    filas.forEach((tr) => {
        tbody.appendChild(tr);
    });

    // const totalQuantity = productos
    //     .map(x => x.quantity)
    //     .reduce((a, b) => a + b, 0);

    // const totalPrice = productos
    //     .map(x => x.price)
    //     .reduce((a, b)  => a + b, 0);

    // const totalTotal = productos
    //     .map(x => x.total)
    //     .reduce((a, b)  => a + b, 0);

    totalQuantityElement.innerText = sum(productos, x => x.quantity);
    totalPriceElement.innerText = sum(productos, x => x.price);
    totalElement.innerText = sum(productos, x => x.total);

    function sum(elements, selector) {
        return elements
            .map(selector)
            .reduce((a, b) => a + b, 0);
    }
}

form.addEventListener("submit", onSubmit);

/**
 *
 * @param {Event} event
 */
function onSubmit(event) {
    event.preventDefault();

    const data = new FormData(form);
    const values = Array.from(data.entries());

    const [formCode, formName, formQuantity, formPrice, formCategory] = values;

    const code = parseInt(formCode[1]);
    const name = formName[1];
    const quantity = parseFloat(formQuantity[1]);
    const price = parseFloat(formPrice[1]);
    const category = parseInt(formCategory[1]);

    if (code) {
        store.dispatch({
            type: "producto:modificado",
            payload: {
                code,
                name,
                quantity,
                price,
                category
            }
        })
    } else {
        store.dispatch({
            type: "producto:agregado",
            payload: {
                name,
                quantity,
                price,
                category
            }
        })
    }

    store.dispatch({
        type: "producto:seleccionado",
        payload: {
            code: null
        }
    });
}

store.dispatch({
    type: "producto:agregado",
    payload: {
        name: "prueba a",
        quantity: 3,
        price: 10
    }
});

store.dispatch({
    type: "producto:modificado",
    payload: {
        code: 1,
        name: "prueba a_02",
        quantity: 5,
        price: 10
    }
});

store.dispatch({
    type: "producto:agregado",
    payload: {
        name: "prueba b",
        quantity: 2,
        price: 1
    }
});

// unsuscribe();

store.dispatch({
    type: "producto:agregado",
    payload: {
        name: "prueba c",
        quantity: 4,
        price: 5
    }
});

store.dispatch({
    type: "producto:eliminado",
    payload: {
        code: 2
    }
})

// console.log(store);