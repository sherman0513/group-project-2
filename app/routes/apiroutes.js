var db = require("../models");

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(dbuser) {
      res.json(dbuser);
    });
  });
  // Create a new user
  app.post("/api/users", function(req, res) {
    console.log("i'm in post");
    db.user.create(req.body).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  //Get all favorite hikes
  app.get("/api/favehikes", function(req, res) {
    db.SearchFav.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.post("/api/favehikes", function(req, res) {
    db.SearchFav.create(req.body)
      .then(function(dbSearchFav) {
        res.json(dbSearchFav);
      })
      .catch(function(err) {
        res.send(err);
      });
  });
};