/**
 * FeedbackController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    var feedback = await Feedback.create(req.body).fetch();

    return res.status(201).json({ id: feedback.id });
  },

  // action - read
  read: async function (req, res) {
    // var thatFeedback = await Feedback.find({id: "1"});
    var thatFeedback = await Feedback.find(req.params.id);

    if (!thatFeedback) return res.notFound();
    console.log(thatFeedback);
    //return res.json(thatFeedback);

    evaluation.pages[0].questions.forEach(function (question) {
        if (question.type == "rating") {
          question.result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
          feedbacks.forEach(function (feedback) {
            question.result["" + feedback.data[question.name]] += 1;
          });
        } else if (question.type == "radiogroup") {
          question.result = { yes: 0, no: 0 };
  
          feedbacks.forEach(function (feedback) {
            question.result["" + feedback.data[question.name]] += 1;
          });
        } else if (question.type == "comment") {
          question.result = [];
  
          feedbacks.forEach(function (feedback) {
            question.result.push(feedback.data[question.name]);
          });
        }
      });
  
      delete feedbacks;
  
      // console.log(JSON.stringify(evaluation));
  
      return res.json(thatFeedback);
  },

  populate: async function (req, res) {
    var feedback = await Feedback.findOne(req.params.id).populate("Evaluation");

    if (!feedback) return res.notFound();

    return res.json(feedback);
  },

  json: async function (req, res) {
    var everyfeedbacks = await Feedback.find();
    return res.json(everyfeedbacks);
  },
};
