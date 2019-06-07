// example of the starter boiler plate
// var db = require("../models");

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.Hiker.findAll({}).then(function(dbHikers) {
      res.json(dbHikers);
    });
  });
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
    }

  // app.get("/api/searchfavs", function(req, res) {
  //   db.SearchFav.findAll({})
  //     .then(function(hikers) {
  //       res.render("faves", {
  //         hikers: hikers,
  //         trailname: trailname,
  //         location: location,
  //         length: length,
  //         stars: stars
  //       });
  //     })
  //     .catch(function(err) {
  //       res.send(err);
  //     });
  // });

  // post route saving the parameters of an activity to the database
  // app.post("/api/favehikes", function(req, res) {
  //   db.SearchFav.create(
  //     {

  // trailname: req.body.trailName,
  // type: req.body.type,
  // summary: req.body.summary,
  // difficulty: req.body.difficulty,
  // stars: req.body.stars,
  // location: req.bidy.location,
  // url: req.body.url,
  // image: req.body.image,
  // length: req.body.length,
  // longit: req.body.longit,
  // latit: req.body.latit,
  // conditiondetails: req.body.conditionDetails,
  // conditionstat: req.body.conditionStat,
  // searcheddate: req.body.searchedDate,
  // trailid: req.body.ID
  // })
  //   .then(function(dbSearchFav) {
  //     res.json(dbSearchFav);
  //   })
  //   .catch(function(err) {
  //     res.send(err);
  //   });
  //   });
  )};
