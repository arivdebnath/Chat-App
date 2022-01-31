const socket = io();

//Elements
const messageForm = document.querySelector('#message-form');
const messageFormInput = messageForm.querySelector('input');
const messageFormButton = messageForm.querySelector('button');
const locationButton = document.querySelector('#location-btn')
const messageDiv = document.querySelector('#messages');

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;

socket.on('message', (message) => {
    console.log(message);
    
    const html = Mustache.render(messageTemplate, {
        message,
    });
    messageDiv.insertAdjacentHTML('beforeend', html);
})


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