import axios from "axios";

async function all() {
    const response = await axios.get('http://localhost:5000/productos/');
    return response.data;
}

async function single(codigo) {
    const response = await axios.get('http://localhost:5000/productos/' + codigo);
    return response.data;
}

async function add(producto) {
    const response = await axios.post('http://localhost:5000/productos/', producto);
    return response.data;
}

async function update(producto) {
    const response = await axios.put('http://localhost:5000/productos/' + producto.codigo, producto);
    return response.data;
}

async function remove(codigo) {
    const response = await axios.delete('http://localhost:5000/productos/' + codigo);
    return response.data;
}

export {
    all,
    single,
    add,
    update,
    remove
}