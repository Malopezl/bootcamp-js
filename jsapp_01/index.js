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
const totalquantity = document.getElementById("total-quantity")
const totalprice = document.getElementById("total-price")
const totaltotal = document.getElementById("total")

let index = 0;
let totalQ = 0;
let totalP = 0;
let totalt = 0;
let currentRow;

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

    let code = formCode[1];
    const name = formName[1];
    const quantity = formQuantity[1];
    const price = formPrice[1];
    const category = formCategory[1];
    const total = quantity * price;

    totalQ = parseFloat(quantity) + totalQ;
    totalP = parseFloat(price) + totalP;
    totalt = parseFloat(total) + totalt;

    let tr;
    if (!code) {
        code = index++;
        tr = document.createElement("tr");
        tbody.appendChild(tr);
    } else {
        tr = currentRow;
    }

    console.log(totalQ);
    console.log(totalP);
    console.log(totalt);

    //creando un elemento html para agregarlo a tbody
    // const tr = document.createElement("tr");
    // Guardar datos dentro del objeto que no son visibles para el usuario
    tr.dataset.category = category;

    //Generar un string concatenado basico
    // tr.innerHTML = "<td>x</td><td>" + name + "</td><td>" + quantity
    // + "</td><td>" + price + "</td><td>" + 0 + "</td>"
    // + "<td><a href='#'>Editar</a> | <a href='#'>Eliminar</a></td>"

    //Generar un string interpolado
    tr.innerHTML = `
        <td>${code}</td>
        <td>${name}</td>
        <td>${quantity}</td>
        <td>${price}</td>
        <td>${total}</td>
        <td>
            <div class="btn-group">
                <a title="Editar" href='#' onclick='onEdit(event)' class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-pencil-square"></i>
                </a>
                <a title="Eliminar" href='#' onclick='onDelete(event)' class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash-fill"></i>
                </a>
            </div>
        </td>
    `;

    //Agregar datos a la tabla del form
    totalquantity.innerText = totalQ;
    totalprice.innerText = totalP;
    totaltotal.innerText = totalt;

    tbody.appendChild(tr);

    //Limpiar formulario
    form.reset();
}

/**
 *
 * @param {Event} event
 */
function onEdit(event) {
    event.preventDefault();

    /** @type {HTMLElement} */
    const anchor = event.currentTarget;
    const tr = anchor.parentElement.parentElement.parentElement;
    const cells = tr.getElementsByTagName("td");
    const [tdCode, tdName, tdQuantity, tdPrice] = cells;

    inputCode.value = tdCode.innerText;
    inputName.value = tdName.innerText;
    inputQuantity.value = tdQuantity.innerText;
    inputPrice.value = tdPrice.innerText;
    selectCategory.value = tr.dataset.category;

    currentRow = tr;

}

/**
 *
 * @param {Event} event
 */
function onDelete(event) {
    event.preventDefault();

    /** @type {HTMLElement} */
    const anchor = event.currentTarget;
    const tr = anchor.parentElement.parentElement.parentElement;
    tbody.removeChild(tr);
}