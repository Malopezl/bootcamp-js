import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

let lastId = 1;
let productos = [
    {
        nombre: "Producto A",
        cantidad: 2,
        precio: 4,
        codigo: lastId,
        total: 8
    }
];

const app = express();

app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(logs);

app.get("/", (req, res) => res.send("<h1>API de productos</h1>"));

app.get("/productos", (req, res) => {
    const filter = req.query.filter;

    if (filter) {
        res.json(productos.filter(p => p.nombre.indexOf(filter) >= 0));
    } else {
        res.json(productos);
    }
});

app.get("/productos/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p => p.codigo == codigo);

    if (!producto) {
        res.status(404);
        res.json({ mensaje: "No existe algun producto con el codigo: " + codigo });
    } else {
        res.status(200);
        res.json(producto);
    }
})

app.post("/productos", (req, res) => {
    // console.log("body: ", req.body);
    lastId++;
    const { cantidad, precio} = req.body;
    const producto = { ...req.body, codigo: lastId, total: cantidad * precio };
    productos.push(producto);
    res.status(201);
    res.json(producto);
})

app.put("/productos/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p => p.codigo == codigo);

    if (!producto) {
        res.status(404);
        res.json({ mensaje: "No existe algun producto con el codigo: " + codigo });
    } else {
        const { cantidad, precio} = req.body;
        const index = productos.indexOf(producto);
        const nuevoProducto = productos[index] = { ...req.body, codigo, total: cantidad * precio };
        res.status(200);
        res.json(nuevoProducto);
    }
})

app.delete("/productos/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p => p.codigo == codigo);

    if (!producto) {
        res.status(404);
        res.json({ mensaje: "No existe algun producto con el codigo: " + codigo });
    } else {
        productos = productos.filter(x => x != producto);
        res.status(200);
        res.json({ mensaje: "Producto eliminado" });
    }
})

/*
* si toda la app es privada y necesita tener autenticacion
* se usa este comando para que se verifique de forma global.
*/
// app.use(isAuthenticated);

app.listen(5000, () => {
    console.log("servidor express escuchando en puerto 5000");
})

// function isAuthenticated(req, res, next) {
//     const auth = req.headers.authorization;

//     if (auth == "hola-mundo") {
//         next();
//     } else {
//         res.status(401);
//         res.send("Not authorized");
//     }
// }

function logs(req, res, next) {
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
}