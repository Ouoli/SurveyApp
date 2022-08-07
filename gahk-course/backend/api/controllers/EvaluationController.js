/**
 * EvaluationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // action - create
  create: async function (req, res) {
    var evaluation = await Evaluation.create(req.body).fetch();

    return res.status(201).json({ id: evaluation.id });
  },

  json: async function (req, res) {
    var everyevaluations = await Evaluation.find();
    return res.json(everyevaluations);
  },

  populate: async function (req, res) {
    var evaluation = await Evaluation.findOne({
      course: req.params.id,
    }).populate("feedbacks");

    if (!evaluation) return res.notFound();

    console.log(JSON.stringify(evaluation));

    evaluation.pages[0].questions.forEach(function (question) {
      if (question.type == "rating") {
        question.result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        evaluation.feedbacks.forEach(function (feedback) {
          question.result["" + feedback.data[question.name]] += 1;
        });
      } else if (question.type == "radiogroup") {
        question.result = { yes: 0, no: 0 };

        evaluation.feedbacks.forEach(function (feedback) {
          question.result["" + feedback.data[question.name]] += 1;
        });
      } else if (question.type == "comment") {
        question.result = [];

        evaluation.feedbacks.forEach(function (feedback) {
          question.result.push(feedback.data[question.name]);
        });
      }
    });

    delete evaluation.feedbacks;

    // console.log(JSON.stringify(evaluation));

    return res.json(evaluation);
  },

  populateFeedbacks: async function (req, res) {
    var evaluation = await Evaluation.findOne({
      course: req.params.id,
    }).populate("feedbacks");

    if (!evaluation) return res.notFound();

    console.log(JSON.stringify(evaluation));

    return res.json(evaluation);
  },

  // action - read
  read: async function (req, res) {
    var thatEvaluation = await Evaluation.findOne(req.params.id);

    if (!thatEvaluation) return res.notFound();

    console.log(thatEvaluation);

    return res.json(thatEvaluation);
  },
};
