var socket = io();

var url = new URLSearchParams(window.location.search)

console.log('Sala', url.get('sala'));


if (!url.has('nombre') || !url.has('sala')) {

    window.location = 'index.html'
    throw new Error('Nombre es necsario front end..')
} else if (url.get('sala') === 'Elige una...') {
    window.location = 'index.html'
    alert('Escoje una sala...')


} else {

    console.log('proceed');
}

socket.on('connect', function() {

    var usuario = {
        nombre: url.get('nombre'),
        sala: url.get('sala')
    }

    socket.emit('enviarChat', usuario, (resp) => {
        console.log(resp);
    })

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


socket.on('AgregaroBorrar', function(mensaje) {

    console.log('Servidor:', mensaje.msj);

});

//Mensaje privado

socket.on('mensajePrivado', (data) => {
    console.log('Servidor: ', data);
})