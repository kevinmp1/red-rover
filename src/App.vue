<template>
  <div id="app">
    <Navbar />
    <div class="backyboi">
      <router-view :key="$route.path"/>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Dosis&display=swap');
  #app {
    font-family: 'Dosis', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    min-height: 100vh;
    display: flex;
  }

  .backyboi {
    min-height: 100vh;
    width: 100%;
    display: flex;
    color: white;
    background-color: #100507;
  }
</style>
