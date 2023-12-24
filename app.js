
const http = require('http');
const PORT = 3000;
const express = require('express');
const app = express();

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

app.get('/', (req, res) =>{
    res.render();
    res.sendFile(__dirname + '/index.html');
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
