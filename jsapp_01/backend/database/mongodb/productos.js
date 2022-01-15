import mongoose from "mongoose";

const productosSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    categoria: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
    total: { type: Number, required: true },
});

const Productos = mongoose.model("productos", productosSchema);

const all = () => Productos.find({}).then(mapProductos);
const filter = (filter) => Productos.find({ nombre: { $regex: filter, $options: "i" } }).then(mapProductos);
const add = (producto) => {
    const nuevoProducto = new Productos({...producto, total: producto.cantidad * producto.precio });
    return nuevoProducto.save().then(mapProducto);
};
const single = (_id) => Productos.findOne({ _id }).then(mapProducto);
const update = (_id, producto) => Productos.findByIdAndUpdate({ _id }, producto, { new: true }).then(mapProducto);
const remove = (_id) => Productos.findByIdAndRemove({ _id }).then(mapProducto);

function mapProductos(productos) {
    return productos.map(p => ({...p.toJSON(), codigo: p._id}));
}

function mapProducto(producto) {
    if (producto) {
        return {...producto.toJSON(), codigo: producto._id};
    }
    return null;
}

export default {
    all,
    filter,
    add,
    single,
    update,
    remove
};