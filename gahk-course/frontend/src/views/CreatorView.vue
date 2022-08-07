<template>
  <div class="container has-text-left">
    <form @submit.prevent="createSurvey">
      <o-field label="Course Description課程介紹: "></o-field>
      <o-input v-model="json.title" />
      <br /><br />
      <div v-for="(page, i) in json.pages" :key="i">
        <o-field :label="'Page' + (i + 1)"></o-field><br />
        <div class="my-4" v-for="(question, j) in page.questions" :key="j">
          <!-- control -->
          <div class="card has-background-info-light">
            <div class="card-content">
              <o-field :label="'Question' + (j + 1)"></o-field> <br />
              <div class="columns">
                <div class="column is-one-quarter">
                  <o-field label="Type類型:"></o-field>
                  <o-select @input="changeType(j)" v-model="question.type">
                    <option value="comment">Comment意見</option>
                    <option value="rating">Ranking打分</option>
                    <option value="radiogroup">Yes/No</option>
                  </o-select>
                  <br />
                </div>
                <!-- survey data -->
                <div class="column is-three-quarters">
                  <div v-if="question.type == 'comment'">
                    <o-field label="Title題目:">
                      <o-input v-model="question.title" />
                    </o-field>
                  </div>
                  <div v-if="question.type == 'rating'">
                    <o-field label="Title題目:">
                      <o-input v-model="question.title" />
                    </o-field>
                    <o-field label="Mininum Rate Description最低限度:">
                      <!-- <o-input v-model="question.mininumRateDescription" /> -->
                      <o-select v-model="question.mininumRateDescription">
                        <!-- <option value="Very easy">Very easy</option> -->
                        <option value="Not Satisfied不滿意">不滿意</option>
                      </o-select>
                    </o-field>
                    <o-field label="Maximum Rate Description最高限度:">
                      <o-select v-model="question.maximumRateDescription">
                        <!-- <option value="Very difficult">Very difficult</option> -->
                        <option value="Completely satisfied非常滿意">非常滿意</option>
                      </o-select>
                    </o-field>
                  </div>
                  <div v-if="question.type == 'radiogroup'">
                    <o-field label="Title題目:">
                      <o-input v-model="question.title" />
                    </o-field>
                  </div>
                  <div v-if="question.type == 'matrix'">
                    <o-field label="Title題目:">
                      <o-input v-model="question.title" />
                    </o-field>
                  </div>
                  <br /><br />
                  <footer class="card-footer">
                    <div class="column">
                      <div class="buttons">
                        <o-button @click="deleteQuestion(j)" variant="danger is-small"
                          >Delete刪除</o-button
                        >
                        <o-button @click="moveUp(j)" class="button is-small is-info"
                          >Move Up上移</o-button
                        >
                        <br /><br />
                        <o-button @click="moveDown(j)" class="button is-small is-info"
                          >Move Down下移</o-button
                        >
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div class="field">
        <o-button @click="addQuestion()" variant="danger">Add Question新增</o-button
        ><br /><br />
        <button class="button is-info" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    var json = {
      title: "",
      showProgressBar: "top",
      pages: [
        {
          questions: [
            {
              type: "rating",
              name: uuidv4(),
              title: "課程滿意程度",
              isRequired: true,
              mininumRateDescription: "Not Satisfied不滿意",
              maximumRateDescription: "Completely satisfied非常滿意",
            },
            {
              type: "rating",
              name: uuidv4(),
              title: "教練滿意程度",
              isRequired: true,
              mininumRateDescription: "Not Satisfied不滿意",
              maximumRateDescription: "Completely satisfied非常滿意",
            },
            {
              type: "radiogroup",
              name: uuidv4(),
              title: "希望再參與本會之各項課程",
              isRequired: true,
              choices: [
                {
                  value: "yes",
                  text: "Yes",
                },
                {
                  value: "no",
                  text: "No",
                },
              ],
              colCount: 2,
            },
            {
              type: "comment",
              name: uuidv4(),
              title: "其他寶貴意見：",
              // isRequired: true,
            },
          ],
        },
      ],
    };

    return {
      json,
    };
  },
  methods: {
    async createSurvey() {
      this.json.course = this.$route.params.id;
      const results = JSON.stringify(this.json);
      //alert(results);
      var response = await fetch("http://localhost:1337/evaluation/create", {
        method: "POST",
        body: JSON.stringify(this.json),
      });
      if (response.ok) {
        var surveys = await response.text();
        console.log(surveys);
      } else {
        alert(response.statusText);
      }
    },
    changeType(j) {
      //const results = JSON.stringify(this.json.pages[0].questions[j]);
      var type = this.json.pages[0].questions[j].type;
      var originname = this.json.pages[0].questions[j].name;
      var origintitle = this.json.pages[0].questions[j].title;
      //alert(j + "  " + results + "   " + type);
      if (type == "comment") {
        this.json.pages[0].questions[j] = {
          type: "comment",
          name: originname,
          title: origintitle,
          // isRequired: true,
        };
      }
      if (type == "rating") {
        this.json.pages[0].questions[j] = {
          type: "rating",
          name: originname,
          title: origintitle,
          isRequired: true,
          mininumRateDescription: "",
          maximumRateDescription: "",
        };
      }
      if (type == "radiogroup") {
        this.json.pages[0].questions[j] = {
          type: "radiogroup",
          name: originname,
          title: origintitle,
          isRequired: true,
          choices: [
            {
              value: "yes",
              text: "Yes",
            },
            {
              value: "no",
              text: "No",
            },
          ],
          colCount: 2,
        };
      }
      alert("new result  " + JSON.stringify(this.json.pages[0].questions[j]));
    },
    deleteQuestion(j) {
      this.json.pages[0].questions.splice(j, 1);
    },
    addQuestion() {
      const newQ = {
        type: "",
        name: uuidv4(),
        title: "new question",
        // isRequired: true,
      };
      var end = this.json.pages[0].questions.length;
      this.json.pages[0].questions.splice(end, 0, newQ);
    },
    moveUp(j) {
      this.json.pages[0].questions[j] = this.json.pages[0].questions.splice(
        j - 1,
        1,
        this.json.pages[0].questions[j]
      )[0];
    },
    moveDown(j) {
      this.json.pages[0].questions[j] = this.json.pages[0].questions.splice(
        j + 1,
        1,
        this.json.pages[0].questions[j]
      )[0];
    },
  },
};
</script>
