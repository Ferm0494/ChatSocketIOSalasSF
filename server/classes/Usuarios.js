class Usuarios {

    constructor() {

        this.personas = []
    }

    agregarPersonas(id, nombre, sala) {
        let persona = {
            id,
            nombre,
            sala
        }

        this.personas.push(persona)

        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.find(persona => {
            if (persona.id === id) {
                return persona
            }
        })
        return persona;
    }

    getPersonas() {

        return this.personas
    }

    getPersonaPorSala(sala) {
        // Falta...
        let personasPorSala = this.personas.filter(persona => {
            if (persona.sala === sala) {
                return persona;
            }
        })

        return personasPorSala
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id)
        this.personas = this.personas.filter(persona => {
            if (persona.id != id) {
                return persona
            }

        })
        return personaBorrada


    }

}

module.exports = {
    Usuarios
}