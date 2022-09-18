
<template>
  <aside class="menu" v-show="!isCollapsed">
    <ul class="menu-items">
      <router-link
        tag="li"
        to="questions"
        class="menu-item"
        :class="{'active': currentPage === 'questions'}"
      >
        <a @click="() => setcurrentPage('questions')">
          <span>Questions</span>
        </a>
      </router-link>
      <router-link
        tag="li"
        to="quizes"
        class="menu-item"
        :class="{'active': currentPage === 'quizes'}"
      >
        <a @click="() => setcurrentPage('quizes')">
          <span>Quizes</span>
        </a>
      </router-link>
    </ul>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';

@Component
export default class Menu extends Vue {
  @State((state) => state.currentPage) currentPage!: string;
  @State((state) => state.isCollapsed) isCollapsed!: boolean;

  @Mutation toggleMenu: any;
  @Mutation setcurrentPage: any;
}
</script>

<style lang="scss">
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345 );

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  .menu-items {
    position: relative;
    font-size: 1.0em;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;

    .menu-item {
      display: block;
      border-left: 3px solid transparent;
      text-align: -webkit-match-parent;

      a, a:hover {
        position: relative;
        color: #fff;
        text-decoration: none;
        padding: 10px;
        display: block;
        letter-spacing: .025em;
        font-weight: 400;
        cursor: pointer;
      }
    }

    .menu-item:hover, .menu-item.active {
      background: linear-gradient(to right, #333333, #414345 );
    }
  }
}
</style>
