const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const { generateMessage } = require('./utils/genMessage');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


const port = process.env.PORT || 3000

const pathDir = path.join(__dirname, '../public');

app.use(express.static(pathDir));


app.get('/', (req, res) => {
    res.render('index');
})

io.on('connection', (socket) => {
    console.log('New connection');

    socket.emit('message',generateMessage("Welcome!"));

    socket.broadcast.emit('message',generateMessage("A new user has joined"));

    socket.on('sendMessage', (msg, callback) => {
        io.emit('message',generateMessage(msg));
        callback();
    })

    socket.on('sendLocation', (position, callback)=>{
        // io.emit('message', `https://google.com/maps?q=${position.latitude},${position.longitude}`)
        io.emit('locationMessage', `https://google.com/maps?q=${position.latitude},${position.longitude}`);
        callback();
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage( 'A user has left the chat |><|' ));
    })

})

server.listen(port, () => {
    console.log(`The server is up and running at ${port}`);
})