<template>
  <div class="container has-text-left">
    <survey :survey="survey"></survey>
  </div>
</template>

<script>
import "survey-vue/modern.min.css";
import { Survey, StylesManager, Model } from "survey-vue";

StylesManager.applyTheme("modern");

export default {
  components: {
    Survey,
  },
  data() {
    var json = {
      pages: [
        {
          questions: [
            {
              name: "code",
              type: "text",
              title: "課程編碼",
              placeHolder: "A000007",
              isRequired: true,
              autoComplete: "code",
            },
            {
              type: "dropdown",
              name: "category",
              title: "體操類別",
              isRequired: true,
              colCount: 0,
              hasNone: false,
              choices: [
                "競技體操",
                "藝術體操",
                "技巧體操",
                "彈網",
                "健美體操",
                "普及體操",
                "跑酷",
                "其他"
              ],
            },
            {
              type: "dropdown",
              name: "difficulty",
              title: "項目難度",
              isRequired: false,
              colCount: 0,
              choices: ["Level 1", "Level 2", "Level 3",
              "Level 4",  "Level 5", "Level 6", "Level 7", "Level 8", "Level 9"],
            },
            {
              type: "dropdown",
              name: "coach",
              title: "教練",
              isRequired: false,
              colCount: 0,
              hasNone: true,
              choices: ["Bob", "Cindy", "Jack"],
            },
            {
              type: "multipletext",
              name: "dates",
              title: "日期",
              isRequired: true,
              colCount: 3,
              validators: [
                {
                  type: "expression",
                  expression:
                    "{dates.Sdate} <= {dates.Edate} and {dates.Sdate} >= {dates.Ddate}",
                  text: "Please correct the date.",
                },
              ],
              items: [
                {
                  name: "Sdate",
                  title: "開始日期",
                  inputType: "date",
                },
                {
                  name: "Edate",
                  title: "結束日期",
                  inputType: "date",
                },
                {
                  name: "Ddate",
                  title: "截止日期",
                  inputType: "date",
                },
              ],
            },
            {
              type: "checkbox",
              name: "week",
              title: "星期 ",
              colCount: 1,
              choices: ["一", "二", "三", "四", "五", "六", "日"],
            },
            // {
            //   type: "comment",
            //   name: "Alldates",
            //   title: "所有上課日期",
            // },
            {
              name: "time",
              type: "text",
              title: "截止時間",
               // "html":
              //  "<label>截止時間</label><input type='time' min='00:00' max='23:59'>"
            },
            {
              type: "multipletext",
              name: "ages",
              title: "年齡限制",
              isRequired: true,
              colCount: 2,
              validators: [
                {
                  type: "expression",
                  expression: "{ages.Uage} >= {ages.Lage}",
                  text:
                    "Please correct the age. The first value should be large or equal to the second one.",
                },
              ],
              items: [
                {
                  name: "Uage",
                  title: "年齡上限",
                  validators: [
                    {
                      type: "numeric",
                      maxValue: 99,
                    },
                  ],
                },
                {
                  name: "Lage",
                  title: "年齡下限",
                  validators: [
                    {
                      type: "numeric",
                      minValue: 1,
                    },
                  ],
                },
              ],
            },
            {
              type: "dropdown",
              name: "gym",
              title: "體育館",
              isRequired: true,
              colCount: 0,
              hasNone: false,
              choices: ["马鞍山体育馆", "石咀塘体育馆", "荃湾体育馆"],
            },
            {
              type: "dropdown",
              name: "gym1",
              title: "場地",
              colCount: 0,
              hasNone: false,
              choices: ["蹦床館", "單鋼館", "訓練室"],
            },
            {
              name: "quato",
              type: "text",
              title: "名額",
              isRequired: true,
              autoComplete: "quato",
              validators: [
                {
                  type: "expression",
                  text: "The quato should not less than 1.",
                  expression: "{quato} >= 1",
                },
              ],
            },
            {
              name: "fee",
              type: "text",
              title: "費用",
              isRequired: true,
              validators: [
                {
                  type: "numeric",
                  minValue: 0,
                },
              ],
            },
            {
              type: "comment",
              name: "intro",
              title: "內文",
            },
          ],
        },
      ],
    };

  const model = new Model(json);
  model.showPreviewBeforeComplete = "showAnsweredQuestions";
  model.onComplete.add(this.alertResults);
  model.completedHtml = "Course created successfully!";

    return {
    survey: model,
    };
  },
  methods: {
    async alertResults(sender) {
      var response = await fetch("http://localhost:1337/course/create", {
        method: "POST",
        body: JSON.stringify(sender.data),
      });

      if (response.ok) {
        var courses = await response.text();
        console.log(courses);
      } else {
        console.log(response.statusText);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
