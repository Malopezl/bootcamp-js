const ui = {
    onFormSubmit: (data) => {},
    onEliminarClick: (code) => {},
    onEditarClick: (code) => {},
    renderForm,
    renderTable,
}

const form = document.getElementsByTagName("form")[0];
const inputCode = document.getElementById("code");
const inputName = document.getElementById("txt");
const inputQuantity = document.getElementById("qt");
const inputPrice = document.getElementById("pr");
const selectCategory = document.getElementById("cat");
const tbody = document.getElementsByTagName("tbody")[0];
const totalQuantityElement = document.getElementById("total-quantity")
const totalPriceElement = document.getElementById("total-price")
const totalElement = document.getElementById("total")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const values = Array.from(data.entries());

    const [formCode, formName, formQuantity, formPrice, formCategory] = values;

    const code = parseInt(formCode[1]);
    const name = formName[1];
    const quantity = parseFloat(formQuantity[1]);
    const price = parseFloat(formPrice[1]);
    const category = parseInt(formCategory[1]);

    ui.onFormSubmit({
        code,
        name,
        quantity,
        price,
        category
    });
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

        eliminar.addEventListener("click", (event) => {
            event.preventDefault();
            ui.onEliminarClick(item.code);
        });

        editar.addEventListener("click", (event) => {
            event.preventDefault();
            ui.onEditarClick(item.code);
        });

        return tr;
    });

    tbody.innerHTML = "";
    filas.forEach((tr) => {
        tbody.appendChild(tr);
    });

    totalQuantityElement.innerText = sum(productos, x => x.quantity);
    totalPriceElement.innerText = sum(productos, x => x.price);
    totalElement.innerText = sum(productos, x => x.total);

    function sum(elements, selector) {
        return elements
            .map(selector)
            .reduce((a, b) => a + b, 0);
    }
}