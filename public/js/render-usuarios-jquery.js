var div = $('#divUsuarios')
var formEnviar = $('#formEnviar')
var txtMensaje = $('#txtMensaje')
var divChatBox = $('#divChatbox')
var buscarContacto = $('#buscarContacto')


var url = new URLSearchParams(window.location.search)
var sala = url.get('sala')
var nombre = url.get('nombre')

function renderizar(personas) {
    console.log('Data de personas:', personas);
    let html = ` <li>
    <a href="javascript:void(0)" class="active"> Chat de <span> ${sala}</span></a>
</li>`
    for (let i = 0; i < personas.length; i++) {

        html += ` 
    
    <li>
        <a data-id= ${personas[i].id} href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ${personas[i].nombre} <small class="text-success">online</small></span></a>
    </li>
   `
    }

    div.html(html)





}



div.on('click', 'a', function() {
    var id = $(this).data('id')

    if (id) {
        console.log(id);
    }
})

formEnviar.on('submit', function(e) {
    e.preventDefault();
    // console.log(txtMensaje.val());
    socket.emit('enviarMensaje', { mensaje: txtMensaje.val(), nombre }, function(data) {
        console.log(`callback: ${data.mensaje}, ${data.nombre}`);
        renderizarMensaje(data.mensaje, data.nombre, true)
    })

    txtMensaje.val('')


})

function renderizarMensaje(mensaje, name, yo) {
    var html = ''
    if (yo) {
        html = `<li class="animated fadeIn">
    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
    <div class="chat-content">
        <h5>${name}</h5>
        <div class="box bg-light-info">${mensaje}</div>
    </div>
    <div class="chat-time">10:56 am</div>
</li>`
    } else {

        html = ` <li class="reverse">
    <div class="chat-content">
        <h5>${name}</h5>
        <div class="box bg-light-inverse">${mensaje}</div>
    </div>
    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
    <div class="chat-time">10:57 am</div>
</li>`


    }

    divChatBox.append(html)

}

//Buscar Contacto..
buscarContacto.on('input', function() {
    var regex = new RegExp(buscarContacto.val())


})