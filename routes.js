const express = require("express");
const Post = require("./models/PostSchema");
const moment = require("moment");
const Profile = require("./models/profileSchema");

const router = express.Router();
let isLoggedIn = false;
router.use((req, res, next) => {
  res.locals.title = "KodedLand";
  res.locals.moment = moment;
  next();
});

let user = {}
router.get("/", (req, res) => {
  Post.find()
    .then(data => {
      res.render("index", {
        pagetitle: "Home",
        posts: data,
        isLoggedIn,
        user
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

router.get("/signup", (req, res) => {
  let obj = {};
  res.render("signup", {
    pagetitle: "Sign-up",
    obj
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

router.post("/deletepost/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  console.log(req.body);
  Post.remove(
    {
      _id: id
    },
    err => {
      if (err) throw err;
      console.log(`post with id: ${id} removed successfully`);
    }
  );
  return res.redirect("/");
});

router.post("/searchresults", (req, res) => {
  let search = req.body.query.trim();
  let myquery = Post.where({
    title: new RegExp(search, "i")
  });
  myquery
    .find()
    .then(data => {
      console.log(`Displaying search results with query: ${search}`);
      return res.render("searchresults", {
        pagetitle: "Search Results",
        posts: data,
        isLoggedIn,
        user: users[Math.floor(Math.random() * users.length)],
        search
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/updatepost/:id", (req, res) => {
  let id = req.params.id;
  Post.findById(id, (err, data) => {
    if (err) {
    }
    return res.render("updatePost", {
      pagetitle: "Update Post",
      post: data,
      isLoggedIn,
      user: users[Math.floor(Math.random() * users.length)]
    });
  });
});

router.post("/updatepost/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  let title = req.body.title.trim();
  let content = req.body.content.trim();
  let tags = req.body.tags.replace(/[,\s+]/g, " ").split(/\s+/g);
  let imagelink =
    req.body.imagelink.trim() ||
    "http://www.arabamerica.com/wp-content/themes/arabamerica/assets/img/thumbnail-default.jpg";
  Post.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: {
        title,
        content,
        tags,
        imagelink
      }
    },
    {
      new: true
    },
    err => {
      console.log(err);
    }
  );
  return res.redirect("/");
});

router.post("/signup", (req, res) => {
  let firstName = req.body.firstName.trim();
  let lastName = req.body.lastName.trim();
  let email = req.body.email.trim();
  let phoneNumber = req.body.phoneNumber.trim();
  let username = req.body.username.trim().toLowerCase();
  let error = "";
  let password = req.body.password.trim();
  let password2 = req.body.password2.trim();
  let obj = {
    firstName,
    lastName,
    username,
    password,
    email,
    phoneNumber,
    error
  };
  let search = "";
  let usernamequery = Profile.where({
    username: new RegExp(username, "i")
  });
  usernamequery
    .findOne()
    .then(data => {
      if (data) {
        search = data.username;
        if (password !== password2 || search == username) {
          if (password !== password2) {
            obj.error = "password";
          }
          if (search == username) {
            obj.error = "username";
          }
          if (password !== password2 && search == username) {
            obj.error = "full";
          }
          console.log(obj.error);
          return res.render("signup", {
            pagetitle: "Update Post",
            obj: obj
          });
        }
      } else {
        Profile.create(obj);
        console.log(`Profile for ${obj.username} created successfully`);
        return res.redirect("/");
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  let username = req.body.username.trim().toLowerCase();
  let password = req.body.password;
  let usernamequery = Profile.where({ username: new RegExp(username, "i") });
  usernamequery
    .findOne()
    .then(data => {
      if (data.password == password) {
        isLoggedIn = true;
        user = data;
        return res.redirect("/");
      } else {
        return res.redirect("/");
      }
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
