<template>
  <div class="container">
    <survey :survey="survey"></survey>
  </div>
</template>

<script>
import "survey-vue/modern.min.css";
// import 'survey-vue/survey.min.css';
import { Survey, StylesManager, Model } from "survey-vue";

StylesManager.applyTheme("modern");

const surveyJson = {
  elements: [],
};

export default {
  components: {
    Survey,
  },
  data() {
    const survey = new Model(surveyJson);
    survey.onComplete.add(this.alertResults);

    return {
      survey,
    };
  },
  mounted() {
    fetch("http://localhost:1337/evaluation/read/" + this.$route.params.id)
      .then((res) => res.json())
      .then((data) => {
        var survey = new Model(data);
        survey.onComplete.add(this.alertResults);
        this.survey = survey;
      })
      .catch((err) => console.log(err.message));
  },
  methods: {
    async alertResults(sender) {
      //alert(JSON.stringify(sender.data));
      var response = await fetch("http://localhost:1337/feedback/create", {
        method: "POST",
        body: JSON.stringify({ Evaluation: this.$route.params.id, data: sender.data }),
      });
      if (response.ok) {
        var surveys = await response.text();
        console.log(surveys);
        // `this` inside methods points to the Vue instance
      } else {
        alert(response.statusText);
      }
    },
  },
};
</script>