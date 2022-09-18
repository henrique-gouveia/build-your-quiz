<template>
  <div id="quiz">
    <Header  title="ByQuiz" :hideToggle="true" />
    <Content />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/pages/template/Header.vue';
import Content from '@/pages/template/Content.vue';
import Footer from '@/pages/template/Footer.vue';

@Component({
  components: {
    Header,
    Content,
    Footer
  }
})
export default class QuizLayout extends Vue {}
</script>

<style lang="scss">
#quiz {
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>
