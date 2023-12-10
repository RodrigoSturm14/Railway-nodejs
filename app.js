
const http = require('http');
const PORT = 3000;
// http.createServer() convierte la pc en un servidor http, ademas hace a 'server' un objeto 'http server'
// sintaxis: http.createServer(requestListenerFunction), requestListenerFunction es opcional
// pero se ejecuta cada vez q se escuche una request, permite ademas devolver una respuesta a esa request
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!');
    res.end();
})

server.listen(PORT, () => {
    console.log(`Running at port ${PORT}`);
});