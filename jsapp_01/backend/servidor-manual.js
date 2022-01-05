import http from "http";

// se puede importar de esta manera si no funciona de forma normal
// const http = require("http");

const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify([
        {
            codigo: 1,
            nombre: "producto 1",
            precio: 10,
            cantidad: 100
        },
        {
            codigo: 2,
            nombre: "producto 2",
            precio: 5,
            cantidad: 10
        }
    ]));
    response.end();
})

server.listen(5000, () => {
    console.log("Servidor escuchando en puerto 5000")
})