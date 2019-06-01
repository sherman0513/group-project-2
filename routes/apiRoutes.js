var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};

// var express = require("express");

// var router = express.Router();

// Import the model (burger.js) to use its database functions.
// var trails = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
// router.get("/api/trails", function(req, res) {
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {

//   trails.all(function(data) {
//     var hbsObject = {
//       trails: data
//     };
//     console.log(hbsObject);
//     console.log("Inside get all");
//     res.render("trails", hbsObject);
//   });
// });
