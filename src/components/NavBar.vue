<template>
  <div class="nav-container">
    <nav
      v-for="genre in genres"
      :key="genre.id"
      v-on:click="setBands(genre.id)"
    >
      <div class="menu-item">
        <a href="#">{{ genre.name }}</a>
        <Dropdown v-bind:bandsId="Id" />
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Dropdown from "./Dropdown.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "navbar",
  components: {
    Dropdown,
  },
})
export default class NavBar extends Vue {
  @Prop() Id?: number;

  get genres() {
    return this.$store.state.genres;
  }
  setBands(genre: number) {
    this.Id = genre;
  }

  computed() {
    this.Id = -1;
  }
}
</script>

<style>
.nav-container {
  display: flex;
}

nav {
  display: flex;
  align-items: center;
  justify-content: center;
}
nav .menu-item {
  color: #fff;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
}

nav .menu-item.active,
nav .menu-item:hover {
  background-color: #444;
  border-color: #ff5858;
}

nav .menu-item a {
  color: inherit;
  text-decoration: none;
}
</style>
