import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { productoEliminado, productoSeleccionado } from "../store/store";

const ProductItem = (prop) => {
    const producto = prop.producto;
    const actions = prop.actions;
    return <tr>
        <td>{producto.codigo}</td>
        <td>{producto.nombre}</td>
        <td>{producto.cantidad}</td>
        <td>{producto.precio}</td>
        <td>{producto.total}</td>
        <td>
            <div className="btn-group">
                <a
                    title="Editar"
                    href='#'
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => actions.seleccionar(producto.codigo)}
                    >
                    <i className="bi bi-pencil-square"></i>
                </a>
                <a
                    title="Eliminar"
                    href='#'
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => actions.eliminar(producto.codigo)}
                    >
                    <i className="bi bi-trash-fill"></i>
                </a>
            </div>
        </td>
    </tr>;
}

const ProductsList = () => {
    const productos = useSelector((state) => state.productos);
    const dispatch = useDispatch();

    const seleccionar = (codigo) => dispatch(productoSeleccionado(codigo));
    const eliminar = (codigo) => dispatch(productoEliminado(codigo));

    const actions = {
        seleccionar,
        eliminar
    }

    const totalQuantity = sum(productos, x => x.cantidad);
    const totalPrice = sum(productos, x => x.precio);
    const total = sum(productos, x => x.total);

    return <table className="table">
        <thead>
            <tr>
                <td>Codigo</td>
                <td>Nombre</td>
                <td>Cantidad</td>
                <td>Precio</td>
                <td>Total</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {productos.map(item => <ProductItem key={item.codigo} producto={item} actions={actions} />)}
        </tbody>
        <tfoot>
            <tr>
                <td colSpan="2">Totales:</td>
                <td>{totalQuantity}</td>
                <td>{totalPrice}</td>
                <td>{total}</td>
                <td></td>
            </tr>
        </tfoot>
    </table>;
}

function sum(elements, selector) {
    return elements
        .map(selector)
        .reduce((a, b) => a + b, 0);
}

export default ProductsList;