var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

// passport routes for htmlroutes for user authentication
var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticate.js");

module.exports = (app) => {
  app.get("/", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
    // change path to what ever is correct path amy created
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
        // change path to what ever is correct path amy created
    res.sendFile(path.join(__dirname, "../public/login.html"))
  });
}