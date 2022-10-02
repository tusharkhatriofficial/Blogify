//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//---------------------------------------------------------------------------------------------------------------------------
//connecting to the database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

//creating a schema for the database
const postSchema = {
  title: String,
  postFeaturedImage: String,
  content: String,
}

//creating a model for the schema
const Post = mongoose.model("Post", postSchema);
//----------------------------------------------------------------------------------------------------------------------------



app.get("/", (req, res) => {

  Post.find({}, (err, foundPosts) => {
    if(!err){
      posts = foundPosts;
      res.render("home", {
        posts: posts
      });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", (req, res) => {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", (req, res) => {
  res.render("compose");
});


app.post("/compose", (req, res) => {
  //creating a new post
  const addPost = new Post({
    title: req.body.postTitle,
    postFeaturedImage: req.body.postFeaturedImage,
    content: req.body.postBody
  });

  addPost.save(
    (err) => {
      if(!err){
        res.redirect("/");
      }
    }
  );

});


app.get("/posts/:optional", (req, res) => {
  posts.forEach((element)=>{
    var optionalRoute = _.lowerCase(req.params.optional);
    if(_.lowerCase(element.title) === optionalRoute){
      res.render("post", {postTitle: element.title, postContent: element.content, postFeaturedImage: element.postFeaturedImage});
    }else{
      console.log("No such route found");
      }
  });
});

app.get("*", (req, res) => {
  res.send("The page you are looking for does not exists!");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
