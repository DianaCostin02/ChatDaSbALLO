const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var nClien=0;//per contare il numero di client connessi
/*
app.get('/', (req, res) => {
  res.send('<h1>sciao bello</h1>');
});*/
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', (socket) => {
    
    console.log(" user connesso");
       nClien++;;
    console.log('user connessi: '+nClien);
    socket.on('disconnect', () => {
      console.log('user disconesso');
      nClien--;
      console.log('user connessi: '+nClien);
    });
  });
  /*
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => { //se si vuole stalkerare i messggi
      console.log('message: ' + msg);
    });
  });*/

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(3000, () => {
  console.log('porta:3000 in ascolto');
});