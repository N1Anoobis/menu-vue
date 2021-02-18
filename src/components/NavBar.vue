<template>
  <div class="nav-container">
    <nav
      v-for="genre in genres"
      :key="genre.id"
      v-on:click="setBands(genre.id)"
    >
      <div class="menu-item">
        <a href="#">{{ genre.name }}</a>
      </div>
      <div v-if="genre.id === Id">
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
  @Prop() Id?: number | null;
  @Prop({ default: false }) isActive: boolean;

  get genres() {
    return this.$store.state.genres;
  }

  setBands(genre: number) {
    if (this.Id && this.isActive === true) {
      this.Id = null;
      this.isActive = false;
      return;
    }
    this.Id = genre;
    this.isActive = true;
  }
}
</script>

<style scoped>
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
  border-radius: 20%;
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
