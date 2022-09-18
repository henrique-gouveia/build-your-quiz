<template>
  <b-container fluid>
    <div class="page-title">
      <h1><i v-if="icon" :class="icon"></i> {{ title }}</h1>
      <h2>{{ subtitle }}</h2>
      <hr />
    </div>
    <div>
      <b-card no-body>
        <b-card-body>
          <slot></slot>
        </b-card-body>
      </b-card>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PageContent extends Vue {
	@Prop({ default: "" }) public icon!: string;
  @Prop({ default: "" }) public title!: string;
  @Prop({ default: "" }) public subtitle!: string;
}
</script>

<style lang="scss">
.page-title {
  h1 {
    margin: 0px;
  }

  h2 {
    color: #777;
    margin-top: 5px;
    font-size: 1.3rem;
  }
}
</style>
