<template>
  <div class="nav-container-second-level">
    <nav
      v-for="band in bands"
      :key="band.id"
      v-on:click.stop="setAlbums(band.id)"
    >
      <div class="menu-item">
        <a href="#">{{ band.name }}</a>
      </div>
      <div v-if="band.id === Id">
        <AlbumsDropdown v-bind:albumsId="Id" />
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import AlbumsDropdown from "./AlbumsDropdown.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "dropdown",
  components: {
    AlbumsDropdown,
  },
})
export default class Dropdown extends Vue {
  @Prop() bandsId?: number;
  @Prop() Id?: number | null;

  get bands() {
    const store = this.$store.state;

    if (this.bandsId !== undefined) {
      if (this.bandsId === 1) {
        return [store.bands[0], store.bands[1]];
      } else if (this.bandsId === 2) {
        return [store.bands[2], store.bands[3]];
      }
    }
    return null;
  }

  setAlbums(album: number) {
    this.Id = album;
    return;
  }
}
</script>

<style scoped>
.nav-container-second-level {
  display: flex;
  flex-direction: column;
  position: absolute;
  transform: translate(-70px, 21px);
}
.menu-item {
  color: #fff;
  background-color: #444;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
  border-radius: 20%;
  min-width: 125px;
  max-width: 125px;
}

.menu-item.active,
.menu-item:hover {
  background-color: #444;
  border-color: #ff5858;
}

.menu-item a {
  color: inherit;
  text-decoration: none;
}
</style>
