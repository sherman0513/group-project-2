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
  });
};
