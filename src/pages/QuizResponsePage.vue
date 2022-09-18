<template>
  <b-container>
    <b-row class="quiz-wrapper">
      <b-col cols="12" class="accordion" role="tablist">
        <b-card class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              block
              v-b-toggle.ask-accordion
              class="text-left"
            >
              {{ currentQuestion.title }}
            </b-button>
          </b-card-header>
          <b-collapse id="ask-accordion" visible accordion="ask-accordion" role="tabpanel">
            <b-card-body>
              <b-card
                no-body
                v-for="answer in currentQuestion.answers"
                :key="`${answer.id}-${answer.option}`"
                class="mb-2"
              >
                <b-card-body
                  v-if="!answer.showed"
                  style="cursor: pointer"
                  @click="() => currentQuestion.selectAnswer(answer.option)"
                >
                  <b-card-text>{{ answer.option }} - {{ answer.title }}</b-card-text>
                </b-card-body>

                <b-card-body
                  v-else
                  class="text-white"
                  :class="{ 'bg-success': answer.correct, 'bg-danger': !answer.correct }"
                >
                  <b-card-text>
                    {{ answer.correct ? 'The correct answer is' : 'The selected answer is wrong' }}... {{ answer.title }}
                  </b-card-text>
                </b-card-body>
              </b-card>
            </b-card-body>
          </b-collapse>
          <div class="m-1">
            <b-button v-if="!isFirstPage" class="mr-1" @click="previous">Previous</b-button>
            <b-button v-if="!isLastPage" variant="primary" @click="next">Next</b-button>
            <b-button v-if="isLastPage" variant="primary" @click="finish">Finish</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import Header from '@/pages/template/Header.vue';
import Footer from '@/pages/template/Footer.vue';
import api from '@/services/api';
import VuePage from '@/models/vue-page';
import Question from '@/models/question';

@Component({
  components: {
    Header,
    Footer
  }
})
export default class QuizResponsePage extends VuePage {

  quizId = '';

  currentPage = 0;
  currentQuestion: Question = new Question();
  questions: Question[] = []

  mounted(): void {
    const { id: quizId } = this.$route.params;
    this.loadQuestions(quizId);
  }

  async loadQuestions(quizId: string): Promise<void> {
    this.quizId = quizId;
    try {
      const res = await api.get(`/quizes/${quizId}/questions`);
      if (res && res.data) {
        this.questions = res.data.map((a: unknown) => new Question(a));
        this.currentQuestion = this.questions[this.currentPage];
      }
    } catch (err) {
      this.showError(err);
      this.questions = [];
    }
  }

  previous(): void {
    const previousPage = this.currentPage - 1;
    if (previousPage >= 0 && previousPage < this.questions.length)
      this.currentPage = previousPage;
  }

  next(): void {
    const nextPage = this.currentPage + 1;
    if (nextPage < this.questions.length)
      this.currentPage = nextPage;
  }

  async finish(): Promise<void> {
    const total = this.questions.length;
    const corrects = this.questions.filter(q => q.isCorrect).length;
    this.$router.replace(`${this.quizId}/result?total=${total}&corrects=${corrects}`);
  }

  get isFirstPage(): boolean {
    return this.currentPage == 0;
  }

  get isLastPage(): boolean {
    return this.currentPage == this.questions.length - 1;
  }

  @Watch('currentPage')
  onChangeCurrentPage(): void {
    this.currentQuestion = this.questions[this.currentPage];
  }
}
</script>

<style lang="scss">
@import '~quill/dist/quill.core.css';

.quiz-wrapper {
  padding-top: 10px;

  .card-header .btn {
    background: linear-gradient(to right, #00bf8f, #73C8A9);
    border: 0;
  }
}
</style>
