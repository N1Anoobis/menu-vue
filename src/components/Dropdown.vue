<template>
  <div class="nav-container-second-level">
    <ul
      v-for="band in bands"
      :key="band.id"
      v-on:mouseover="setMusicans(band.id)"
    >
      <li class="menu-item">
        <a href="">{{ band.name }}</a>
      </li>
      <div v-if="musicanArray"></div>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "dropdown",
  components: {},
})
export default class Dropdown extends Vue {
  @Prop() bandArray?: object[];
  @Prop() musicanArray?: object[] | null;
  @Prop() index?: number;
  @Prop() Id?: any;

  get bands() {
    const bands = this.bandArray;
    return bands;
  }

  get musicans(): object[] {
    return this.musicans;
  }

  setMusicans(index: number) {
    const bands = this.$store.state.bands;
    const musicians = this.$store.state.musicians;

    this.index = index;
    this.Id = index;

    this.musicanArray = [
      musicians[bands[this.Id - 1].albums[0] - 1],
      musicians[bands[this.Id - 1].albums[1] - 1],
    ];
    this.$store.dispatch("storeAlbums", this.musicanArray);
    return this.musicanArray;
  }
}
</script>

<style scoped>
.nav-container-second-level {
  display: flex;
  flex-direction: column;
  position: absolute;
  transform: translate(0px, -0px);
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
  min-width: 120px;
  max-width: 120px;
  font-size: 15px;
}

.menu-item.active,
.menu-item:hover {
  background-color: #444;
  border-color: #ff5858;
}

.menu-item a {
  color: inherit;
  text-decoration: none;
  display: block;
  width: 100%;
}
</style>
