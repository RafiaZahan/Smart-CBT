const express = require("express");
const mongoose = require("mongoose");
const questionHandler = require("./routeHandler/questionHandler");
const { MONGODB } = require('./config.js');
const cors = require('cors');

// express app initialization
const app = express();
app.use(express.json());

app.use(cors());

// database connection with mongoose
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// application routes
app.use("/question", questionHandler);

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}
app.use(errorHandler);

app.listen(5000, () => {
  console.log("app listening at port 5000");
});
