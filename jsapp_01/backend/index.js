import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { productos } from "./database";

const app = express();

app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(logs);

app.get("/", (req, res) => res.send("<h1>API de productos</h1>"));

app.get("/productos", async (req, res) => {
    const filter = req.query.filter;
    let result;
    if (filter) {
        result = await productos.filter(filter);
    } else {
        result = await productos.all();
    }
    res.json(result);
});

app.get("/productos/:codigo", async (req, res) => {
    const codigo = req.params.codigo;

    try {
        const producto = await productos.single(codigo);
        res.status(200);
        res.json(producto);
    } catch (error) {
        res.status(404);
        res.json({ mensaje: "No existe algun producto con el codigo: " + codigo });
    }
})

app.post("/productos", async (req, res) => {
    const producto = await productos.add(req.body);
    res.status(201);
    res.json(producto);
})

app.put("/productos/:codigo", async (req, res) => {
    const codigo = req.params.codigo;

    try {
        const newProducto = await productos.update(codigo, req.body);
        res.status(200);
        res.json(newProducto);
    } catch (message) {
        res.status(404);
        res.json({ message });
    }
})

app.delete("/productos/:codigo", async (req, res) => {
    const codigo = req.params.codigo;

    try {
        await productos.remove(codigo);
        res.status(200);
        res.json({ mensaje: "Producto eliminado" });
    } catch (message) {
        res.status(404);
        res.json({ message });
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