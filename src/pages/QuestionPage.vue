<template>
	<PageContent
		icon="fa fa-cogs"
		title="Admin"
		subtitle="Questions"
	>
		<b-form>
			<input id="question-id" type="hidden" v-model="question.id" />
			<b-row>
				<b-col xs="12">
					<b-form-group label="Title:" label-for="question-title">
						<b-form-input
							id="question-title"
							type="text"
							placeholder="Question title..."
							required
							:readonly="mode === 'remove'"
							v-model="question.title"
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col xs="12">
					<b-form-group
            v-if="mode === 'save'"
            label="Context:"
            label-for="question-text"
          >
            <VueEditor
              v-model="question.text"
              placeholder="Optional question context..."
            />
          </b-form-group>
				</b-col>
			</b-row>
			<b-row v-if="mode === 'save'">
				<b-col cols="12">
					<b-form-group label="Answers:">
						<b-row>
							<b-col
                sm="12"
                class="mb-2"
                v-for="(answer, idx) in question.answers"
                :key="idx"
              >
								<b-input-group>
                  <b-input-group-prepend
                    is-text
                    class="input-group-prepend-md"
                    v-b-tooltip.hover
                    title="Mark as correct"
                  >
                    <b-form-radio
                      class="mr-n2"
                      name="question-answer-correct"
                      v-model="question.correctOption"
                      :value="question.answers[idx].option"
                    >
                      <span class="sr-only">Select this as corect answer</span>
                    </b-form-radio>
                  </b-input-group-prepend>

									<b-form-input
										placeholder="Type answer option..."
                    v-model="question.answers[idx].title"
                    :readonly="mode == 'remove'"
                    class="form-control"
                    :class="{ 'is-valid': question.answers[idx].correct }"
									/>

									<b-input-group-append class="input-group-append-md">
										<b-button variant="success" class=" ml-1 mr-1" @click="() => question.addAnswer()">
											<em class="fa fa-plus"></em>
										</b-button>
										<b-button variant="danger" @click="() => question.removeAnswer(answer.option)">
											<em class="fa fa-trash"></em>
										</b-button>
									</b-input-group-append>
								</b-input-group>
							</b-col>
						</b-row>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col xs="12">
					<b-button variant="primary" v-if="mode === 'save'" @click="save" :disabled="loading">
						Save
            <template v-if="loading">
              <div>
                <b-spinner small type="grow" class="ml-1"></b-spinner>
                <span class="sr-only ml-1">Saving...</span>
              </div>
            </template>
					</b-button>
					<b-button class="ml-2" @click="reset">
						Cancel
					</b-button>
					<hr />
				</b-col>
			</b-row>
		</b-form>
		<b-table
      responsive
      hover
      striped
      show-empty
      :fields="fields"
      :items="questions"
      :busy="loading"
    >
      <template #table-busy>
        <div class="text-center my-1">
          <b-spinner class="align-middle"></b-spinner>
          <strong class="align-middle ml-2">Loading...</strong>
        </div>
      </template>
      <template #empty>
        <div class="text-center">
          <p class="text-center">There are no data</p>
        </div>
      </template>
			<template #cell(actions)="data">
				<b-button variant="warning" @click="loadQuestion(data.item)" class="mr-2">
					<i class="fas fa-pencil-alt"></i>
				</b-button>
				<b-button variant="danger" @click="remove(data.item.id)">
					<i class="fas fa-trash-alt"></i>
				</b-button>
			</template>
		</b-table>
		<b-pagination
			size="md"
			class="mt-2"
			v-model="page"
			:total-rows="count"
			:per-page="limit"
		/>
	</PageContent>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import PageContent from './template/PageContent.vue';
import api from '@/services/api';
import VuePage from '@/models/vue-page';
import Question from '@/models/question';

@Component({
  components: {
    PageContent
	}
})
export default class QuestionPage extends VuePage {
	mode = 'save';
  loading = false;

	question = new Question();
	questions: Question[] = [];

  fields: unknown[] = [
		{ key: 'id', label: 'Id', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'actions', label: 'Action', tdClass: 'd-flex', thStyle: { width: '200px' } }
	];

  page = 1;
  limit = 0;
  count = 0;

  mounted(): void {
    this.loadQuestions();
  }

  async loadQuestions(): Promise<void> {
    this.loading = true;
    try {
      const res = await api.get(`/questions?page=${this.page}`);
      if (res && res.data) {
        const { data, count, limit } = res.data;

        this.questions = data.map((a: unknown) => new Question(a));
        this.count = count;
        this.limit = limit;
      }
    } catch (err) {
      this.showError(err);
      this.questions = [];
    } finally {
      this.loading = false;
    }
  }

  async loadQuestion(question: Question, mode = 'save'): Promise<void> {
    this.mode = mode;
    try {
      const res = await api.get(`/questions/${question.id}`)
      this.question = new Question(res.data);
    } catch (err) {
      this.showError(err);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      if (await this.$bvModal.msgBoxConfirm('Are you sure you want to remove this question?', {
        title: 'Confirmation',
        size: 'sm',
        buttonSize: 'sm',
        headerClass: 'p-2',
        footerClass: 'p-2',
        centered: true
      })) {
        this.loading = true;
        await api.delete(`/questions/${id}`);

        this.showSuccess();
        this.reset();
      }
    } catch (err) {
      this.showError(err);
    } finally {
      this.loading = false;
    }
  }

  async save(): Promise<void> {
    this.loading = true;

    const method = this.question.id ? 'put' : 'post';
    const id = this.question.id ? `/${this.question.id}` : '';

    try {
      const question = {
        id: this.question.id,
        title: this.question.title,
        text: this.question.text,
        answers: this.question.answers.map(answer => ({
          questionId: answer.questionId,
          option: answer.option,
          title: answer.title,
          correct: answer.correct
        }))
      };

      await api[method](`/questions${id}`, question);

      this.showSuccess();
      this.reset();
    } catch (err) {
      this.showError(err);
    } finally {
      this.loading = false;
    }
  }

  reset(): void {
    this.mode = 'save';
    this.page = 1;
    this.question = new Question();

    this.loadQuestions();
  }

  @Watch('page')
  onChangePage(): void {
    this.loadQuestions();
  }
}
</script>
