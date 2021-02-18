<template>
  <div class="nav-container-second-level">
    <ul v-for="musican in this.musicans" :key="musican.id">
      <li class="menu-item">
        <a href="#">{{ musican.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "albumsdropdown",
})
export default class AlbumsDropdown extends Vue {
  @Prop() albumsId?: number;

  get musicans() {
    const store = this.$store.state;

    if (this.albumsId !== undefined) {
      if (this.albumsId === 1) {
        return [store.musicians[0], store.musicians[1]];
      } else if (this.albumsId === 2) {
        return [store.musicians[2], store.musicians[3]];
      } else if (this.albumsId === 3) {
        return [store.musicians[4], store.musicians[5]];
      } else if (this.albumsId === 4) {
        return [store.musicians[6], store.musicians[7]];
      }
    }
    return null;
  }
}
</script>

<style scoped>
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
  transform: translate(190px, -35px);
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
