<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "./components/NavBar.vue";
@Component({
  components: {
    NavBar,
  },
})
export default class App extends Vue {}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: ubuntu, sans-serif;
}
header {
  min-width: 100vh;
  background-color: #222;
  padding: 15px;
}
</style>
