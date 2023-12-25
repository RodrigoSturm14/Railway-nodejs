
const http = require('http');
const PORT = 3000;
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

httpServer.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
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
