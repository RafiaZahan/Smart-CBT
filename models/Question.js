const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    category: {
        type: String,
        required: true,
      },
    questionTitle: {
      type: String,
      required: true,
    },
    optionA: {
      type: String,
      required: true,
    },
    optionB: {
      type: String,
      required: true,
    },
    optionC: String,
    optionD: String,
    questionType: {
      type: String
    },
    answer: {
        type: String,
        required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

questionSchema.query = {
  byLanguage: function (language) {
    return this.find({ category: new RegExp(language, "i") }); // new RegExp()
  },
};

const Question = new mongoose.model("Question", questionSchema);
module.exports = Question;

