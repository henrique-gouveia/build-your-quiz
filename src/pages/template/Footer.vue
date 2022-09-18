<template>
  <footer class="footer">
    <span>Copyright © {{ new Date().getFullYear() }}</span>
  </footer>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss">
.footer {
  grid-area: footer;
  background-color: #DDD;
  color: #333;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 15px;
}
</style>
