<template>
  <div class="container has-text-center" id="charts">
    <div>{{ evaluation.title }}</div>
    <br /><br />
    <div v-for="(question, i) in evaluation.pages[0].questions" v-bind:key="i">
      <div>{{ question.title }}</div>
      <column-chart
        :data="question.result"
        v-if="question.type == 'rating'"
      ></column-chart>

      <column-chart
        :data="question.result"
        v-if="question.type == 'radiogroup'"
      ></column-chart>
      <div v-if="question.type == 'comment'">
        <div v-for="comment in question.result">{{ comment }}</div>
      </div>
      <br /><br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      evaluation: {},
    };
  },
  async mounted() {
    let response = await fetch(
      "http://localhost:1337/evaluation/populate/" + this.$route.params.id
    );

    if (response.ok) {
      this.evaluation = await response.json();
    } else {
      alert("error");
    }
  },
};
</script>

<style>
#charts{
  width: 650px;
}

</style>
