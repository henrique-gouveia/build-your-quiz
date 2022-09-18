<template>
  <b-container>
    <div class="text-center m-3">
      <h1>Result:</h1>
    </div>
    <b-list-group>
      <b-list-group-item variant="info" class="d-flex justify-content-between">
        <span>Total:</span>
        <span>{{ total }}</span>
      </b-list-group-item>
      <b-list-group-item variant="success" class="d-flex justify-content-between">
        <span>Corrects:</span>
        <span>{{ corrects }}</span>
      </b-list-group-item>
      <b-list-group-item variant="danger" class="d-flex justify-content-between">
        <span>Errors:</span>
        <span>{{ errors }}</span>
      </b-list-group-item>
      <b-list-group-item variant="warning" class="d-flex justify-content-between">
        <span>Performance:</span>
        <span>{{ percentage }}%</span>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class QuizResultPage extends Vue {

  total = 0;
  corrects = 0;
  errors = 0;
  percentage = 0;

  created(): void {
    const { total = 0, corrects = 0 } = this.$route.query;

    this.total = +total;
    this.corrects = +corrects;
    this.errors = this.total - this.corrects;

    this.percentage = this.total ? Math.round((this.corrects / this.total) * 100) : 0;
  }
}
</script>
