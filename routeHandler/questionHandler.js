const express = require("express");
const router = express.Router();

const Question = require("../models/Question");

// GET THE Questions
router.get("/", (req, res) => {
   Question.find().sort({"_id":-1}).byLanguage('mongoDB').limit(10)
    .exec((err, data) => {  
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Success",
        });
      }
    });
});

// GET A Question by ID
router.get("/:id", (req, res) => {
  Question.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Success",
      });
    }
  });
});

// GET ALL THE Questions with params limit
router.get("/limit/:limit", async (req, res) => {
  try {
    const limit = Number(req.params.limit);
    const data = await Question.find().limit(limit);
    res.status(200).json({
      result: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// GET THE Questions by category and limit
router.get("/:lang/:limit", async (req, res) => {
    try {
          const lang = req.params.lang;
          const limit = Number(req.params.limit);
          const data = await Question.find().byLanguage(lang).limit(limit);
          res.status(200).json({
            result: data,
            message: "Success",
          });
        } catch (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        }

  });

  // GET THE Questions by category ALL
  router.get("/:lang/all", async (req, res) => {
    try {
      const lang = req.params.lang;
      const data = await Question.find().byLanguage(lang);
      res.status(200).json({
        result: data,
        message: "Success",
      });
    } catch (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    }
  });

// POST A Question
router.post("/add",(req, res) => {
  const newQuestion = new Question(req.body);
  newQuestion.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Question is inserted successfully!",
      });
    }
  });
});

// GET THE Questions through req (category and limit)
router.post("/",async (req, res) => {
  try {
    const lang = req.body.lang;
    const limit = Number(req.body.limit);
    const data = await Question.find().byLanguage(lang).limit(limit);
    res.status(200).json({
      result: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
  
});


module.exports = router;
