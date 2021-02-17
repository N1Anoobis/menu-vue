<template>
  <div class="nav-container">
    <nav v-for="band in bands" :key="band.id">
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

  get bands() {
    console.log(this.bandsId);
    return this.$store.state.bands;
  }
}
</script>

<style></style>
