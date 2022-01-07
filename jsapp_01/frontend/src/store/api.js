import axios from "axios";

const url = 'http://localhost:5000/productos/';

async function request(httpCall) {
    const response = await httpCall();
    return response.data;
}

const all = () => request(() => axios.get(url));
const single = (codigo) => request(() => axios.get(url + codigo));
const add = (producto) => request(() => axios.post(url, producto));

/*
* notas:
* ({ codigo, ...producto })
* se hizo de esta manera para separar lo que viene del objeto en codigo
* y lo demas se guardara en la variable producto.
* Ej de objeto:
* { codigo: 1, nombre: "producto b", cantidad: 5, precio: 10 }
*/
const update = ({ codigo, ...producto }) => request(() => axios.put(url + codigo, producto));
const remove = (codigo) => request(() => axios.delete(url + codigo));

export default{
    all,
    single,
    add,
    update,
    remove
}