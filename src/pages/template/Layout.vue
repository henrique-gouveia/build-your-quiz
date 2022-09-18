
<template>
  <div id="app" :class="{'hide-menu': isCollapsed}">
    <Header  title="ByQuiz" />
    <Menu />
    <Content />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Header from '@/pages/template/Header.vue';
import Menu from '@/pages/template/Menu.vue';
import Content from '@/pages/template/Content.vue';
import Footer from '@/pages/template/Footer.vue';

@Component({
  components: {
    Header,
    Menu,
    Content,
    Footer
  }
})
export default class Layout extends Vue {
  @State((state) => state.isCollapsed) isCollapsed!: boolean;
}
</script>

<style lang="scss">
#app {
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";

  &.hide-menu {
    grid-template-areas:
      "header header"
      "content content"
      "footer footer";
  }
}
</style>
