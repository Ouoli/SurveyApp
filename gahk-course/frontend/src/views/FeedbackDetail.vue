<template>
  <div class="container">
    <h2>Here shows the details of the feedback</h2>
    <br /><br />
    <div v-for="(question, i) in feedback.Evaluation.pages[0].questions" v-bind:key="i">
      <div class="columns">
        <div class="column is-half">{{ question.title }}</div>

        <div class="column is-one-quarter"></div>

        <div lass="column is-half">{{ feedback.data[question.name] }}</div>

        <div v-if="question.type == 'comment'"></div>
        <br /><br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedback: {},
    };
  },
  async mounted() {
    let response = await fetch(
      "http://localhost:1337/feedback/" + +this.$route.params.id + "/evaluation"
    );

    if (response.ok) {
      this.feedback = await response.json();
    } else {
      alert("error");
    }
  },
};
</script>
