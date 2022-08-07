<template>
  <div class="container">
    <h2>課程報名</h2>
    <!-- <h2>{{ courseInfo }}</h2> -->
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
      progressBarType: "buttons",
      showProgressBar: "top",
      pages: [
        {
          navigationTitle: "緊急聯繫人信息",
          questions: [
            {
              name: "Ename",
              type: "text",
              title: "姓名（中文）",
              placeHolder: "用戶007",
              isRequired: true,
              autoComplete: "Ename",
            },
            {
              name: "tel",
              type: "text",
              title: "電話",
              isRequired: true,
              autoComplete: "tel",
              validators: [
                {
                  type: "numeric",
                },
              ],
            },
            {
              name: "address",
              type: "text",
              title: "通訊地址",
              isRequired: true,
              autoComplete: "addr",
            },
          ],
          name: "EmerageInfo",
          title: "緊急聯繫你人信息",
        },
        {
          navigationTitle: "繳費方式",
          questions: [
            {
              type: "radiogroup",
              name: "paying",
              title: "繳費方式",
              isRequired: true,
              hasNone: false,
              colCount: 2,
              choices: ["支票（郵寄）", "現金（親身遞交）"],
            },
          ],
          name: "paymentM",
          title: "繳費方式",
        },
        {
          navigationTitle: "聲明",
          questions: [
            {
              type: "radiogroup",
              name: "isOld",
              title: "你是否已年滿18歲",
              isRequired: true,
              hasNone: false,
              colCount: 2,
              choices: ["未滿18歲由家長填寫", "已滿18歲自行填寫"],
            },
            {
              type: "html",
              name: "words",
              "html":
                "<p>謹證明本人自願參加此課程，並願意自行承擔所有責任。本人亦謹遵守貴會之一切規則、決定，包括藥物檢查條例。本人、本人之繼承人、本人之遺囑執行人及本人之管理人謹此豁免中國香港體操總會、所有贊助商、支持是項活動之團體及任何有關之團體對於本人因參加是項比賽或課程而由任何原因，包括疏忽，所引致之疾病、死亡、個人損失之任何法律責任，以及放棄任何有關之權利、索償及追究行動。本人亦同時聲明本人身體狀況良好及具備足夠之體能及技術完成賽事。本人願意授權大會及傳媒在無須本人審查而可以使用本人的肖像、姓名、聲線及個人資料作為活動籌辦及推廣之用。本人已細閱及明瞭<a href='http://www.gahk.org.hk/doc/Physical%20Activity%20Readiness.pdf' target='_blank'>附件一</a>之體能及健康須知，並同時聲明本人/敝子女身體狀況良好及具備足夠之體能及技術完成賽事或訓練。</p>"
              },
            {
              type: "checkbox",
              name: "isAgree",
              title: "是否同意上述聲明",
              isRequired: true,
              hasNone: false,
              colCount: 1,
              choices: ["同意"],
            },
            {
              type: "checkbox",
              name: "isCorrect",
              title: "請確保所填寫的資料均屬正確",
              isRequired: true,
              hasNone: false,
              colCount: 1,
              choices: ["正確"],
            },
          ],
          name: "declare",
          title: "聲明",
        },
      ],
    };
    var model = new Model(json);
    model.showPreviewBeforeComplete = "showAnsweredQuestions";
    model.onComplete.add(this.alertResults);
    model.completedHtml = "Course registered successfully!";

    return {
      survey: model,
      courseInfo: {},
    };
  },
  methods: {
    async alertResults(sender) {
      var response = await fetch("http://localhost:1337/student/create", {
        method: "POST",
        body: JSON.stringify(sender.data),
      });

      if (response.ok) {
        var students = await response.text();
        console.log(students);
      } else {
        console.log(response.statusText);
      }
    },
  },
  async mounted() {
    var response = await fetch(
      "http://localhost:1337/course/read/" + this.$route.params.id
    );

    if (response.ok) {
      this.courseInfo = await response.json();
    }
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
