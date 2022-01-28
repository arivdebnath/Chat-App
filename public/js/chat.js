const socket = io();

// socket.on('countup', (count) => {
//     console.log('received your bs', count);
// })

// document.querySelector('#incr').addEventListener("click", () => {
//     socket.emit('countincr');
// })

socket.on('message', (message) => {
    console.log(message);
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message);
})