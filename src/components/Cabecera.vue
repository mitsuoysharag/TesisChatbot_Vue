<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Chat</span>
      <span class="font-weight-light">Bot</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="ingresarTest">
        <span class="mr-2">Test</span>
      </v-btn>
      <v-btn flat @click="ingresarCursos">
        <span class="mr-2">Mis Cursos</span>
      </v-btn>
      <v-btn flat @click="cerrarSesion">
        <span class="mr-2">Cerrar Sesión</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    ingresarTest(){
      this.$router.push("test");
    },
    ingresarCursos() {
      this.$router.push("cursos");
    },
    cerrarSesion() {
      this.$router.push("login");
    }
  }
};
</script>

<style>
</style>
