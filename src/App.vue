<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

<style>
/*Scrollbar*/
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: rgb(224, 223, 223);
}
::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
  background: rgb(206, 206, 206);
}
</style>
