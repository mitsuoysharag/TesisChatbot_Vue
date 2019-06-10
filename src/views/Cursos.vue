<template>
  <v-content class="chat-vista">
    <Cabecera/>
    <v-container grid-list-xl>
      <v-layout wrap>
        <v-flex sx12 md6 lg4 v-for="(curso, index) in cursos" :key="index">
          <v-card elevation="3">
            <v-card-text>
              <h1 class="curso-nombre pb-4">{{curso.nombre}}</h1>
              <p class="curso-docente">
                <strong>Docente:</strong>
                &nbsp&nbsp {{curso.docente}}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="ingresarChat" flat color="blue">Ingresar</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Cabecera from "../components/Cabecera";
export default {
  data() {
    return {
      cursos: [
        new Curso("Algorítmica I", "Pablito"),
        new Curso("Redes Neuronales", "Pedrito"),
        new Curso("Cálculo III", "Carlitos"),
        new Curso("Diseño de Patrones", "Juanito"),
        new Curso("Inteligencia Artificial", "Jaimito")
      ]
    };
  },
  methods: {
    ingresarChat() {
      this.$router.push("chat");
    }
  },
  components: {
    Cabecera
  }
};
class Curso {
  constructor(nombre, docente) {
    this.nombre = nombre;
    this.docente = docente;
  }
}
</script>

<style scoped>
.curso-nombre {
  color: rgb(117, 117, 117);
  text-align: center
}
.curso-docente {
  color: #525252;
  font-size: 16px;
  margin-bottom: 0;
  padding: 0 10px
}
</style>
