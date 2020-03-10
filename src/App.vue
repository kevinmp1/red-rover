<template>
  <div id="app">
    <Navbar />
    <div style="padding-top: 50px;">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Navbar from "./components/Navbar";

export default {
  name: 'App',
  components: {
    Navbar,
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: linear-gradient(90deg, #000000, #fff);
  height: 200vh;
  display: flex;
}
</style>
