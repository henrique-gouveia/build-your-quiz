<template>
	<PageContent
		icon="fa fa-cogs"
		title="Admin"
		subtitle="Quizes"
	>
    <b-form>
			<input id="quiz-id" type="hidden" v-model="quiz.id" />
			<b-row>
				<b-col md="12" lg="3">
					<b-form-group label="Total Questions:" label-for="quiz-count">
						<b-form-spinbutton
							id="quiz-count"
							min="1"
              max="100"
							v-model="quiz.count"
              :disabled="mode === 'remove'"
						/>
					</b-form-group>
				</b-col>
        <b-col md="12" lg="9">
          <div class="h-100 pb-3 d-flex align-items-end">
            <b-button variant="primary" v-if="mode === 'save'" @click="save">
              Generate
            </b-button>
          </div>
        </b-col>
			</b-row>
      <hr />
		</b-form>
		<b-table
      responsive
      hover
      striped
      show-empty
      :fields="fields"
      :items="quizes"
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
          <p class="text-center">Thre are no data</p>
        </div>
      </template>
      <template #cell(start)="row">
        {{ row.value | date }}
      </template>
      <template #cell(end)="row">
        {{ row.value | date }}
      </template>
			<template #cell(actions)="data">
        <router-link
          class="btn btn-info mr-2"
          tag="a"
          :to="`quiz/${data.item.id}`"
          target="_blank"
        >
          <i class="fas fa-external-link-alt"></i>
        </router-link>
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
import Quiz from '@/models/quiz';

@Component({
  components: {
    PageContent
	}
})
export default class QuizPage extends VuePage {
  mode = 'save';
  loading = false;

	quiz: Quiz = new Quiz();
	quizes: Quiz[] = [];

  fields: unknown[] = [
  { key: 'id', label: 'Id', sortable: true },
    { key: 'count', label: 'Total Questions', sortable: true },
    { key: 'actions', label: 'Action', tdClass: 'd-flex', thStyle: { width: '200px' } }
	];

  page = 1;
  limit = 0;
  count = 0;

  mounted(): void {
    this.loadQuizes();
  }

  async loadQuizes(): Promise<void> {
    this.loading = true;
    try {
      const res = await api.get(`/quizes?page=${this.page}`);
      if (res && res.data) {
        const { data, count, limit } = res.data;

        this.quizes = data.map((a: unknown) => new Quiz(a));
        this.count = count;
        this.limit = limit;
      }
    } catch (err) {
      this.showError(err);
      this.quizes = [];
    } finally {
      this.loading = false;
    }
  }

  async loadQuiz(quiz: Quiz, mode = 'save'): Promise<void> {
    this.mode = mode;
    try {
      const res = await api.get(`/quizes/${quiz.id}`)
      this.quiz = new Quiz(res.data);
    } catch (err) {
      this.showError(err);
    }
  }

  async save(): Promise<void> {
    try {
      const quiz = {
        id: this.quiz.id,
        count: this.quiz.count
      };

      await api.post(`/quizes`, quiz);

      this.showSuccess();
      this.reset();
    } catch (err) {
      this.showError(err);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      if (await this.$bvModal.msgBoxConfirm('Are you sure you want to remove this quiz?', {
        title: 'Confirmation',
        size: 'sm',
        buttonSize: 'sm',
        headerClass: 'p-2',
        footerClass: 'p-2',
        centered: true
      })) {
        this.loading = true;
        await api.delete(`/quizes/${id}`);

        this.showSuccess();
        this.reset();
      }
    } catch (err) {
      this.showError(err);
    } finally {
      this.loading = false;
    }
  }

  reset(): void {
    this.mode = 'save';
    this.page = 1;
    this.quiz = new Quiz();
    this.loadQuizes();
  }

  @Watch('page')
  onChangePage(): void {
    this.loadQuizes();
  }
}
</script>
