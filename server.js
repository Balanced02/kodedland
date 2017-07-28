const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routes = require("./routes"); //because routes is a file

const PORT = 4000;

const app = express();

mongoose.Promise = global.Promise;

let db = mongoose
  .connect("mongodb://kodedland:kodedland@ds125113.mlab.com:25113/kodedland")
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch(err => {
    console.log(err);
  });

//Viewing engines

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Express Middleware
app.use(express.static(path.join(__dirname, "assets")));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
