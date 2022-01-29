const socket = io();

socket.on('message', (message) => {
    console.log(message);
})

const messageForm = document.querySelector('#message-form');
const messageFormInput = messageForm.querySelector('input');
const messageFormButton = messageForm.querySelector('button');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageFormButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
        messageFormButton.removeAttribute('disabled');
        messageFormInput.value = '';
        messageFormInput.focus();

        if (error) {
            return console.log(error);
        }
        console.log('confirmation received');
    });
})

const locationButton = document.querySelector('#location-btn')

locationButton.addEventListener('click', () => {

    locationButton.setAttribute('disabled', 'disabled');

    if (!navigator.geolocation) {
        return alert("Geolocation no supported in your browser.");
    }
    navigator.geolocation.getCurrentPosition((position) => {


        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }, (error) => {
            locationButton.removeAttribute('disabled');
            if (error) {
                return console.log(error);
            }
            console.log('location shared');
        });
    })
})