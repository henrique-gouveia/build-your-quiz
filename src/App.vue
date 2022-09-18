<template>
  <router-view />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class App extends Vue {
  @State((state) => state.currentPage) currentPage!: string;

  mounted(): void {
    if (this.$route.path !== `/${this.currentPage}` && !(this.$route.path || '').includes('quiz'))
      this.$router.push(this.currentPage);
  }
}
</script>

<style lang="scss">
* {
  font-family: "Lato", sans-serif;

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
