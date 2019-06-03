var db = require("../models");

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.Hiker.findAll({}).then(function(dbHikers) {
      res.json(dbHikers);
    });
  });

  // app.post("/api/authors", function(req, res) {
  //   // Create an Author with the data available to us in req.body
  //   console.log(req.body);
  //   db.Author.create(req.body).then(function(dbAuthor) {
  //     res.json(dbAuthor);
  //   });
  // });

  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // Create a new user
  app.post("/api/users", function(req, res) {
    console.log("i'm in post");
    db.Hiker.create(req.body).then(function(dbHiker) {
      res.json(dbHiker);
    });
  });

  // Delete a user by id
  app.delete("/api/users/:id", function(req, res) {
    db.Hiker.destroy({ where: { id: req.params.id } }).then(function(dbHiker) {
      res.json(dbHiker);
    });
  });

  //Get all favorite hikes
  app.get("/api/favehikes", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new favorite
  app.post("/api/favehikes", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
