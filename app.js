
const http = require('http');
const PORT = 3000;
const express = require('express');
const app = express();

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
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

const WebSocket = require('ws');
const wss = new WebSocket.Server( { port: '8080'} );

wss.on('connection', function connection(socket) {
    socket.on('error', console.error);
    
    socket.on('message', message => {
        socket.send(`Message recieved: ${message}`)
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
