const PORT = 8080;
const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
// --- SocketIO ---
const socketIO = require('socket.io')(httpServer, {
    cors: { origin: "*" }
});
socketIO.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
// --- MQTT ---
const mqtt = require('mqtt');
const clientId = 'emqxnodejs' + Math.random().toString(16).substring(2, 8);
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
    socketIO.emit('mensajeBroker', payload.toString());
});
// --- Running lines ---
app.use(express.static(path.resolve(__dirname, './public')));
httpServer.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})