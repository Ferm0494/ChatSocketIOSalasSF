const date = new Date()
const enviarMensaje = (nombre, mensaje) => {

    return {
        nombre,
        mensaje,
        date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

    }
}

module.exports = {
    enviarMensaje
}