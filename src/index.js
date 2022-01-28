const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io =socketio(server);

const port = process.env.PORT || 3000

const pathDir = path.join(__dirname, '../public');

app.use(express.static(pathDir));


app.get('/', (req, res)=>{
    res.render('index');
})

io.on('connection', (socket)=>{
    console.log('New connection');

    socket.emit('message', "Welcome!");
    // socket.emit('countup', count);

    // socket.on('countincr', ()=>{
    //     count++;
    //     io.emit('countup', count);
    // })
    socket.on('sendMessage', (msg)=>{
        io.emit('message', msg)
    })
})

server.listen(port, ()=>{
    console.log(`The server is up and running at ${port}`);
})