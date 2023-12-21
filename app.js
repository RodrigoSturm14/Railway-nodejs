
const http = require('http');
const PORT = 3000;
// http.createServer() convierte la pc en un servidor http, ademas hace a 'server' un objeto 'http server'
// sintaxis: http.createServer(requestListenerFunction), requestListenerFunction es opcional
// pero se ejecuta cada vez q se escuche una request, permite ademas devolver una respuesta a esa request
/*
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!');
    res.end();
})
//comentario
server.listen(PORT, () => {
    console.log(`Running at port ${PORT}`);
});
*/

const fs = require('fs');
fs.readFile('./index.html', function (err, html) {
    if (err) throw err;

    http.createServer(function(req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }).listen(PORT, () => {
        console.log(`Running at port ${PORT}`);
    });
});


const mqtt = require('mqtt');
const clientId = 'emqx_nodejs_' + Math.random().toString(16).substring(2, 8);
const username = 'Rodri';
const password = 'NodeJS';

const client = mqtt.connect('mqtt://broker.emqx.io:1883', {
    clientId,
    username,
    password,
});

const topic = 'posicion/lugar';
const payload = 'conectado';
const qos = 0;

client.subscribe(topic, { qos }, (error) => {
    if (error){
        console.log('Subscribe error...');
    }
    console.log(`Suscripcion exitosa al topico ${topic}`);
});

client.publish(topic, payload, { qos }, (error) => {
    if(error){
        console.log('Publish error...');
    }
});

client.on('message', (topic, payload) => {

    console.log('Mensaje recibido: ', topic, payload.toString());
    
});
