const express = require("express");
const app = express();
const database = require("./database");
const bookRouter = require("./routes/bookRouter");
const debug = require("debug")("app");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;


if (process.env.ENV === 'Test') {
  console.log('starting test server');
  database._test();
} else {
  debug('starting real server');
  database._connect();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("<h1>Book Club</h1> </br> <p>Hello, welcome to my book club</p>");
});

app.server = app.listen(port, () => {
  debug(`server started on port ${port}`);
});

module.exports = app;