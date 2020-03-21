const { io } = require('../server');
const { Usuarios } = require('../classes/Usuarios')
const { enviarMensaje } = require('../utils/mensaje')


const usuarios = new Usuarios()


io.on('connection', (client) => {

    //Muestra la conexion de un usuario a nuestro chat y agrega a arreglo.

    client.on('enviarChat', (usuario, callback) => {

        if (!usuario.nombre || !usuario.sala) {
            return callback('Nombre/Sala es necesario server.')
        } else {

            client.join(usuario.sala);

            var personas = usuarios.agregarPersonas(client.id, usuario.nombre, usuario.sala)
            client.broadcast.to(usuario.sala).emit('AgregaroBorrar', {
                msj: `${usuario.nombre} 
            ha ingresado al chat`,
                lista: usuarios.getPersonaPorSala(usuario.sala)
            })

            callback(usuarios.getPersonaPorSala(usuario.sala))

        }

    })

    // Envia mensaje a todos los usuarios.
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(persona.sala).emit('enviarMensaje', enviarMensaje(persona.nombre, data.mensaje))
        callback(enviarMensaje(persona.nombre, data.mensaje))

    })

    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id)
        client.broadcast.to(data.id).emit('mensajePrivado', enviarMensaje(persona.nombre, data.mensaje))

    })

    //Muestra desconexion de usuario quita de arrreglo.

    client.on('disconnect', () => {
        let personaDesconetada = usuarios.borrarPersona(client.id)
        client.broadcast.to(personaDesconetada.sala).emit('AgregaroBorrar', {
            msj: `Usuario ${personaDesconetada.nombre} 
                                                    ha abandonado el chat.`,
            lista: usuarios.getPersonaPorSala(personaDesconetada.sala)
        })





    })







    // console.log('Usuario conectado');

    // client.emit('enviarMensaje', {
    //     usuario: 'Administrador',
    //     mensaje: 'Bienvenido a esta aplicación'
    // });



    // client.on('disconnect', () => {
    //     console.log('Usuario desconectado');
    // });

    // // Escuchar el cliente
    // client.on('enviarMensaje', (data, callback) => {

    //     console.log(data);

    //     client.broadcast.emit('enviarMensaje', data);


    //     // if (mensaje.usuario) {
    //     //     callback({
    //     //         resp: 'TODO SALIO BIEN!'
    //     //     });

    //     // } else {
    //     //     callback({
    //     //         resp: 'TODO SALIO MAL!!!!!!!!'
    //     //     });
    //     // }



    // });

});