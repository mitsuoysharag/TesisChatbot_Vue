import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    codigo_alumno: '14200098',
    alumno_id: '5d192b8f1c9d4400001f40ad',
    //alumno_id_2: '5d1957061c9d440000a45fcd',
    profesor_id: '5d192cdd1c9d4400001f40b1',
    curso_id: '5d192d021c9d4400001f40b2',

    // Opciones
    recursos_mostrar_auto: true, //mostrar automaticamente los recursos

    // Servicio
    servicio: {
      obtenerRespuesta(data, onSuccess, onError) {
        fetch('https://adaptive-chatbot.herokuapp.com/obtenerRespuesta', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .catch(error => onError(error))
          .then(response => onSuccess(response))
      },
      /*enviarPerfil(perfil, onSuccess, onError) {
        console.log(JSON.stringify(perfil))
        fetch('https://adaptive-chatbot.herokuapp.com/perfil',{
          method: 'POST',
          body: JSON.stringify(perfil),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(response => onSuccess())
        .catch(error => onError(error))
      }*/
    }
  },
  mutations: {

  },
  actions: {

  }
})
