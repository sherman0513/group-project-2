// example of the starter boiler plate
// var db = require("../models");


// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(
//       dbExample
//     ) {
//       res.json(dbExample);
//     });
//   });
// };

// this is going the routes to do get and post for our database
var db = require('../models');
var passport = require('../config/passport');

module.export = (app) => {

  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    // /member is the path of the page that is return will change later to what the correct path once it is established
    res.json('/members');
  });

  app.post('/api/signup', (req, res) => {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(() => {
      res.redirect(307, '/api/login');
      console.log(err);
      res.json(err);
    });
  });

  app.get('/api/user_data', (req, res) => {
    if (!req.user) {
      res.json({});
    }
    else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }

    module.exports = function (app) {
      // Get all users
      app.get("/api/users", function (req, res) {
        db.Hiker.findAll({}).then(function (dbHikers) {
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
      app.post("/api/users", function (req, res) {
        console.log("i'm in post");
        db.Hiker.create(req.body).then(function (dbHiker) {
          res.json(dbHiker);
        });
      });

      app.post("/api/mike", function (req, res) {
        console.log("i'm in post");
        db.Hiker.create(req.body).then(function (dbHiker) {
          res.json(dbHiker);
        });
      });

      // Delete a user by id
      app.delete("/api/users/:id", function (req, res) {
        db.Hiker.destroy({ where: { id: req.params.id } }).then(function (dbHiker) {
          res.json(dbHiker);
        });
      });

      //Get all favorite hikes
      app.get("/api/favehikes", function (req, res) {
        db.Example.findAll({}).then(function (dbExamples) {
          res.json(dbExamples);
        });
      });

      // post route saving the parameters of an activity to the database
      app.post("/api/favehikes", function (req, res) {
        db.SearchFav.create({
          trailName: req.body.trailName,
          type: req.body.type,
          summary: req.body.summary,
          difficulty: req.body.difficulty,
          stars: req.body.stars,
          location: req.bidy.location,
          url: req.body.url,
          image: req.body.image,
          length: req.body.length,
          longit: req.body.longit,
          latit: req.body.latit,
          conditionDetails: req.body.conditionDetails,
          conditionDate: req.body.conditionDate,
          searchedDate: req.body.searchedDate
        })
          .then(function (dbSearchFav) {
            res.json(dbSearchFav);
          })
          .catch(function (err) {
            res.send(err);
          });
      });

      // delete route to remove a saved activity from the database (will NOT delete the saved search it is associated with)
      app.delete("/api/activity", function (req, res) {
        db.SearchFav.destroy({
          where: {
            id: req.body.id
          }
        }).then(function (dbActivity) {
          res.json(dbActivity);
        });
      });
    }
  })
}