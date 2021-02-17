<template>
  <div class="nav-container">
    <nav v-for="band in this.bands" :key="band.id">
      <div class="menu-item">
        <a href="#">{{ band.name }}</a>
      </div>
      <!-- <div class="menu-item"><a href="#">pop</a></div> -->
    </nav>
  </div>
</template>

<script lang="ts">
// import Dropdown from "./Dropdown.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "navbar",
  components: {
    // Dropdown,
  },
})
export default class Dropdown extends Vue {
  @Prop() bandsId?: number;
  @Prop() bandsArray?: number[];

  get bands() {
    if (this.bandsId !== undefined) {
      this.bandsArray = this.$store.state.genres[this.bandsId - 1].bands;
      if (this.bandsId === 1) {
        return [this.$store.state.bands[0], this.$store.state.bands[1]];
      } else if (this.bandsId === 2) {
        return [this.$store.state.bands[2], this.$store.state.bands[1]];
      }
    }
    return null;
  }

  updated() {
    console.log(this.bands);
  }
}
</script>

<style></style>
