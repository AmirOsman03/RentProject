<template>
  <div id="app">
    <NavbarPage /> <!-- Display the Navbar component -->
    <router-view></router-view> <!-- This will load the active route component -->
  </div>
</template>

<script>
import NavbarPage from "./views/Navbar.vue";

export default {
  name: "App",
  components: {
    NavbarPage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
