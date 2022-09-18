
<template>
  <header class="header">
    <a class="toggle" @click="() => toggleMenu()" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>
    <h1 class="title">
      <router-link to="/">{{ title }}</router-link>
    </h1>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';

@Component
export default class Header extends Vue {
  @Prop({ default: '' }) public title!: string;
  @Prop({ default: false }) public hideToggle!: boolean;

  @State((state) => state.isCollapsed) isCollapsed!: boolean;
  @Mutation toggleMenu: any;

  public get icon() : string {
    return this.isCollapsed ? 'fa-angle-down' : 'fa-angle-left';
  }
}
</script>

<style lang="scss">
.header {
  grid-area: header;
  background: linear-gradient(to right, #00bf8f, #73C8A9);

  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    margin: 0;
    font-size: 1.25rem;
    color: #fff;
    font-weight: 800;
    flex-grow: 1;
    text-align: center;

    a {
      color: #fff;
      text-decoration: none;
    }
  }

  > a.toggle {
    width: 60px;
    height: 100%;
    color: #fff;
    justify-self: flex-start;
    text-decoration: none;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  > a.toggle:hover {
      background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
