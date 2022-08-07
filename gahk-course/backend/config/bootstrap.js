/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  const { v4: uuidv4 } = require("uuid");

  await Course.createEach([
    {
      code: "C11111",
      category: "競技體操",
      difficulty: "Level 5",
      coach: "Bob",
      dates: { Sdate: "2022-03-23", Edate: "2022-03-30", Ddate: "2022-03-22" },
      week: ["一", "二"],
      ages: { Uage: "12", Lage: "9" },
      gym: "馬鞍山體育館",
      gym1: "蹦床館",
      quato: "12",
      fee: "3000",
      intro: "The quato is limited, please be quick!",
      createdAt: 1648040659208,
      updatedAt: 1648040659208,
      id: 1,
      _id: 1,
    },
    {
      code: "B12345",
      category: "彈網",
      difficulty: "Level 2",
      coach: "Cindy",
      dates: { Sdate: "2022-03-09", Edate: "2022-03-16", Ddate: "2022-03-09" },
      week: ["五"],
      ages: { Uage: "20", Lage: "9" },
      gym: "荃湾体育馆",
      gym1: "訓練室",
      quato: "30",
      fee: "300",
      createdAt: 1648040712553,
      updatedAt: 1648040712553,
      id: 2,
      _id: 2,
    },
    {
      code: "A09876",
      category: "藝術體操",
      difficulty: "Level 1",
      coach: "Jack",
      dates: { Sdate: "2022-03-15", Edate: "2022-03-24", Ddate: "2022-03-14" },
      week: ["五", "六"],
      ages: { Uage: "12", Lage: "9" },
      gym: "石咀塘体育馆",
      quato: "12",
      gym1: "單鋼館",
      fee: "2500",
      createdAt: 1648040793740,
      updatedAt: 1648040793740,
      id: 3,
      _id: 3,
    },
    {
      code: "A20220326",
      category: "普及體操",
      difficulty: "Level 1",
      coach: "Jack",
      dates: { Sdate: "2022-03-26", Edate: "2022-04-02", Ddate: "2022-03-25" },
      week: ["二", "三"],
      time: "23:59",
      ages: { Uage: "30", Lage: "10" },
      gym: "荃湾体育馆",
      gym1: "none",
      quato: "666",
      fee: "200",
      intro: "welcome everyone！",
      createdAt: 1648281074160,
      updatedAt: 1648281074160,
      id: 4,
      _id: 4,
    },
  ]);

  await Student.createEach([
    {
      Ename: "陈大明",
      tel: "12345678",
      address: "中国香港",
      paying: "支票（郵寄）",
      isOld: "已滿18歲自行填寫",
      isAgree: ["同意"],
      isCorrect: ["正確"],
      createdAt: 1648041083247,
      updatedAt: 1648041083247,
      id: 1,
      _id: 1,
    },
    {
      Ename: "吴彦祖",
      tel: "98765432",
      address: "沙田",
      paying: "現金（親身遞交）",
      isOld: "未滿18歲由家長填寫",
      isAgree: ["同意"],
      isCorrect: ["正確"],
      createdAt: 1648041127812,
      updatedAt: 1648041127812,
      id: 2,
      _id: 2,
    },
    

    {
      Ename: "小吴",
      tel: "20220326",
      address: "广州天河",
      paying: "支票（郵寄）",
      isOld: "未滿18歲由家長填寫",
      isAgree: ["同意"],
      isCorrect: ["正確"],
      createdAt: 1648281393159,
      updatedAt: 1648281393159,
      id: 4,
      _id: 4,
    },
  ]);

  await Evaluation.createEach([
    {
      id: 1,
      course: 1,
      title: "本課程為競技體操，教練是Bob",
      showProgressBar: "top",
      pages: [
        {
          questions: [
            {
              type: "rating",
              name: uuidv4(),
              title: "課程簡便程度",
              isRequired: true,
              mininumRateDescription: "Not Satisfied不滿意",
              maximumRateDescription: "Completely satisfied非常滿意",
            },
            {
              type: "rating",
              name: uuidv4(),
              title: "課程滿意程度",
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
    },
    {
      id: 2,
      course: 2,
      title: "本課程為彈網，教練是Cindy",
      showProgressBar: "top",
      pages: [
        {
          questions: [
            {
              type: "rating",
              name: uuidv4(),
              title: "教練滿意程度",
              isRequired: true,
              mininumRateDescription: "Not Satisfied不滿意",
              maximumRateDescription: "Completely satisfied非常滿意",
            },
            {
              type: "rating",
              name: uuidv4(),
              title: "課程安排滿意程度",
              isRequired: true,
              mininumRateDescription: "Not Satisfied不滿意",
              maximumRateDescription: "Completely satisfied非常滿意",
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
    },
  ]);

  /*
    await Evaluation.create({
      title: "Feedback page for user to write",
      showProgressBar: "top",
      pages: [
        {
          questions: [
            {
              name: "date",
              type: "datepicker",
              inputType: "date",
              title: "Your favorite date:",
              dateFormat: "mm/dd/yy",
              isRequired: true,
            },
            {
              type: "matrix",
              name: "Quality",
              title:
                "Please indicate if you agree or disagree with the following statements",
              columns: [
                {
                  value: 1,
                  text: "Strongly Disagree",
                },
                {
                  value: 2,
                  text: "Disagree",
                },
                {
                  value: 3,
                  text: "Neutral",
                },
                {
                  value: 4,
                  text: "Agree",
                },
                {
                  value: 5,
                  text: "Strongly Agree",
                },
              ],
              rows: [
                {
                  value: "affordable",
                  text: "Product is affordable",
                },
                {
                  value: "does what it claims",
                  text: "Product does what it claims",
                },
                {
                  value: "better then others",
                  text: "Product is better than other products on the market",
                },
                {
                  value: "easy to use",
                  text: "Product is easy to use",
                },
              ],
            },
            {
              type: "rating",
              name: "satisfaction",
              title: "How satisfied are you with the Product?",
              mininumRateDescription: "Not Satisfied",
              maximumRateDescription: "Completely satisfied",
            },
            {
              type: "rating",
              name: "recommend_friends",
              visibleIf: "{satisfaction} > 3",
              title:
                "How likely are you to recommend the Product to a friend or co-worker?",
              mininumRateDescription: "Will not recommend",
              maximumRateDescription: "I will recommend",
            },
            {
              type: "comment",
              name: "suggestions",
              title: "What would make you more satisfied with the Product?",
            },
          ],
        },
      ],
    })
  */
};
