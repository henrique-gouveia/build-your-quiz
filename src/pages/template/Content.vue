<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Content extends Vue { }
</script>

<style lang="scss">
.content {
  grid-area: content;
  background-color: #efefef;
  padding: 20px;
}
</style>
