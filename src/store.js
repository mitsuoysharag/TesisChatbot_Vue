import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    codigo_alumno: "14200098",

    servicio: {
      enviarConsulta(consulta, onSuccess, onError) {
        console.log(JSON.stringify(consulta))
        fetch('https://adaptive-chatbot.herokuapp.com/pregunta',{
          method: 'POST',
          body: JSON.stringify(consulta),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .catch(error => onError(error))
        .then(response => onSuccess(response))
      },
      enviarPerfil(perfil, onSuccess, onError) {
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
      }
    }
  },
  mutations: {

  },
  actions: {

  }
})
