const express = require("express");
const Post = require("./models/PostSchema");
const moment = require("moment");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.title = "KodedLand";
  res.locals.moment = moment;
  next();
});

let users = [
  { name: "Henry Dimo", registered: "Last Week" },
  { name: "Lumie Olumide", registered: "2 days ago" },
  { name: "Bolaji Bolaji", registered: "2 weeks ago" },
  { name: "Chibaba Chiscript", registered: "Yesterday" },
  { name: "Eva Alordiah", registered: "4 days ago" }
];

router.get("/", (req, res) => {
  Post.find()
    .then(data => {
      console.log(data);
      res.render("index", {
        pagetitle: "Home",
        posts: data,
        isLoggedIn: false,
        user: users[Math.floor(Math.random() * users.length)]
      });
    })
    .catch(err => {
      console.log(err);
      res.send("Error getting Posts");
    });
});

router.get("/addpost", (req, res) => {
  res.render("addpost", {
    pagetitle: "Add Post"
  });
});

router.post("/addpost", (req, res) => {
  let title = req.body.title.trim();
  let content = req.body.content.trim();
  let tags = req.body.tags.replace(/[,\s+]/g, " ").split(/\s+/g);
  let author = req.body.author || "Anonymous";
  let imagelink =
    req.body.imagelink.trim() ||
    "http://www.arabamerica.com/wp-content/themes/arabamerica/assets/img/thumbnail-default.jpg";
  Post.create({
    title,
    content,
    tags,
    author,
    imagelink
  })
    .then(() => {
      console.log("Post created successfully");
      return res.redirect("/");
    })
    .catch(err => {
      console.log(err);
      return err;
    });
});

router.post("/deletepost", (req, res) => {
  var myquery = {title: 'Second Post'}
})

module.exports = router;
