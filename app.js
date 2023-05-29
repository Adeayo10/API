const express = require("express");
const app = express();
const database = require("./database")
const bookRouter = require("./routes/bookRouter");
const debug = require("debug")("app");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;


database._connect()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("helo from my app");
});

app.listen(port, () => {
  debug(`server started on port ${port}`);
});
