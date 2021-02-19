<template>
  <div class="nav-container" @mouseleave="clearAlbooms">
    <nav>
      <div
        class="nav"
        v-for="genre in genres"
        :key="genre.id"
        v-on:click="setBands(genre.id)"
      >
        <div class="menu-item">
          <a @mouseover="close" href="#">{{ genre.name }}</a>
        </div>
        <div v-if="genre.id === index" @mouseover="setAlbums">
          <Dropdown v-bind:bandArray="bandArray" />
        </div>
      </div>
      <div v-if="index">
        <Dropdown v-bind:bandArray="setAlbums" class="second-level" />
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
  @Prop() Id?: any;
  @Prop() index?: number;
  @Prop() albooms?: object[] | null;
  @Prop({ default: false }) bandArray: object[] | null;

  get genres() {
    return this.$store.state.genres;
  }

  get setAlbums() {
    return (this.albooms = this.$store.state.albumsData);
  }

  setBands(index: number) {
    if (this.bandArray) {
      this.close();
    }

    this.clearAlbooms();
    const genres = this.$store.state.genres;
    const bands = this.$store.state.bands;
    this.index = index;
    this.Id = genres[index - 1].bands;
    if (this.Id) {
      this.bandArray = [bands[this.Id[0] - 1], bands[this.Id[0]]];
    }
  }

  close() {
    this.bandArray = null;
    this.clearAlbooms();
  }

  clearAlbooms() {
    this.$store.dispatch("storeAlbums", null);
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
.menu-item {
  color: #fff;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
  border-radius: 20%;
  min-width: 120px;
  max-width: 120px;
  font-size: 15px;
}

nav .menu-item.active,
nav .menu-item:hover {
  background-color: #444;
  border-color: #ff5858;
}

nav .menu-item a {
  color: inherit;
  text-decoration: none;
  display: block;
  width: 100%;
}

.second-level {
  transform: translate(-180px, 100px);
}
</style>
