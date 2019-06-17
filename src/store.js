import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    codigo_alumno: 14200098,

    servicio: {
      enviarConsulta(consulta, onSuccess, onError) {
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
      }
    }
  },
  mutations: {

  },
  actions: {

  }
})
