<template>
  <v-layout justify-center wrap style="height: 100%">
    <v-flex xs12 md5 style="height: 100%">
      <v-card class="elevation-6 fill-height">
        <div class="chat-componente" style="height: 100%">
          <v-container id="chat-ventana">
            <v-layout column>
              <v-flex v-for="(mensaje, index) in mensajes" :key="index">
                <v-card
                  v-ripple
                  class="chat-mensaje elevation-3"
                  :class="{ 'chat-mensaje-0':mensaje.autor==0, 'chat-mensaje-1':mensaje.autor==1 }"
                >
                  <span>{{mensaje.mensaje}}</span>
                </v-card>
                <div style="color: #ccc">
                  <v-btn
                    v-if="mensaje.texto"
                    @click="accionMensajeRecurso(mensaje.texto)"
                    small
                    fab
                    icon
                    outline
                    color="#1976d2"
                    class="ma-0 my-1 ml-2"
                  >
                    <v-icon>file_copy</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="mensaje.video"
                    @click="accionMensajeRecurso(mensaje.video)"
                    small
                    fab
                    icon
                    outline
                    color="#1976d2"
                    class="ma-0 my-1 ml-2"
                  >
                    <v-icon>video_library</v-icon>
                  </v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
          <div>
            <v-form class="chat-botones" @submit.prevent="enviarMensaje">
              <v-text-field v-model="texto" class="mr-3"></v-text-field>
              <v-btn v-if="enviar_mensaje" fab dark small color="primary" @click="enviarMensaje">
                <v-icon dark>send</v-icon>
              </v-btn>
              <v-progress-circular v-else class="ml-2 mr-2" indeterminate color="primary"></v-progress-circular>
            </v-form>
          </div>
        </div>
      </v-card>
    </v-flex>
    <v-flex v-if="recurso_estado != 0" xs12 md7 style="height: 100%">
      <v-card class="elevation-6 fill-height">
        <div
          class="chat-recurso"
          :class="{ 'chat-recurso-maximizado':recurso_maximizado }"
          style="height: 100%"
        >
          <embed v-if="recurso" :src="recurso" width="100%" height="100%" />
          <div v-else style="margin: auto">
            <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
          </div>
          <div class="my-3">
            <v-btn fab dark small color="primary" @click="recurso_maximizado = !recurso_maximizado">
              <v-icon v-if="!recurso_maximizado" dark>fullscreen</v-icon>
              <v-icon v-else dark>fullscreen_exit</v-icon>
            </v-btn>
            <v-btn fab dark small color="error" @click="recurso_estado = 0">
              <v-icon dark>close</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      enviar_mensaje: true,
      texto: "",
      recurso: null,
      recurso_estado: 0, //0: no hay, 1: cargando, 2: hay
      recurso_maximizado: false,
      mensajes: [
        new Mensaje(0, "Soy tu docente virtual. Prueba escribiéndome algo.")
      ]
    };
  },
  mounted() {
    this.scrollDown();
  },
  methods: {
    enviarMensaje() {
      if (this.texto.trim().length != 0 && this.enviar_mensaje) {
        this.enviar_mensaje = false;
        this.mensajes.push(new Mensaje(1, this.texto));

        let data = {
          alumno_id: this.$store.state.alumno_id,
          consulta: this.texto
        };
        this.texto = "";

        this.obtenerRespuesta(data);
        this.scrollDown();
      }
    },
    obtenerRespuesta(data) {
      console;
      this.$store.state.servicio.obtenerRespuesta(
        data,
        response => {
          //onSuccess
          this.enviar_mensaje = true;
          console.log(response);

          if (typeof response !== "undefined") {
            this.enviar_mensaje = true;
            let pdf = "";
            let video = "";
            if (response.entrada.verbal >= response.entrada.visual) {
              pdf = response.pdf;
              if (this.$store.state.recursos_mostrar_auto)
                this.accionMensajeRecurso(pdf);
            }
            if (response.entrada.visual >= response.entrada.verbal) {
              video = response.video;
              if (this.$store.state.recursos_mostrar_auto)
                this.accionMensajeRecurso(video);
            }

            this.mensajes.push(new Mensaje(0, response.respuesta, pdf, video));
            this.scrollDown();

            console.log(response);
          }
        },
        error => {
          //onError
          this.enviar_mensaje = true;
          this.scrollDown();

          console.log(error);
        }
      );
    },
    accionMensajeRecurso(recurso) {
      if (recurso !== undefined && recurso.trim() !== "") {
        this.recurso = null;
        this.recurso_estado = 1; //cargando
        setTimeout(() => {
          this.recurso = recurso;
          this.recurso_estado = 2; //hay
        }, 500);
      }
    },
    scrollDown() {
      var objDiv = document.getElementById("chat-ventana");
      setTimeout(() => {
        if (objDiv.scrollHeight - objDiv.scrollTop < 1100)
          objDiv.scrollTop = objDiv.scrollHeight;
      }, 0);
    }
  }
};
class Mensaje {
  constructor(autor, mensaje, texto, video) {
    this.autor = autor;
    this.mensaje = mensaje;
    this.texto = texto;
    this.video = video;
  }
}
</script>

<style>
.chat-vista {
  height: 100vh;
}
.chat-componente {
  display: flex;
  flex-direction: column;
}
#chat-ventana {
  padding: 20px;
  overflow-y: auto;
}
.chat-botones {
  padding: 0px 10px 0px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin: 0 -8px -8px -8px;
  background: #fff;
  box-shadow: -1px 4px 14px -2px rgba(0, 0, 0, 0.5);
}
.chat-mensaje {
  padding: 10px 14px;
  cursor: pointer;
  font-size: 15px;
  border-radius: 6px;
  width: max-content;
  max-width: 75%;
}
.chat-mensaje-0 {
  float: left;
  background: #fff !important;
  margin-right: 8px;
}
.chat-mensaje-1 {
  float: right;
  color: #fff !important;
  background: #1976d2 !important;
}
.chat-recurso {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.chat-recurso-maximizado {
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 60px;
  width: 100%;
  background: #fff;
}
.chat-no-recurso {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
  overflow-y: auto;
}
</style>
