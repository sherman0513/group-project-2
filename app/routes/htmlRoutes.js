require('dotenv').config();
var db = require("../models");
var axios = require("axios");
var keys = require("../keys");
var fs = require("fs")
var googleMapsGeoKey = keys.google.id;
var trailsKey = keys.trail.id;
console.log(googleMapsGeoKey);
console.log(trailsKey);
var searchRadius = 100;
var searchLength = 10;
var lat;
var lng;
module.exports = function(app) {
 
  //Render list of users on UserList handlebar page
  app.get("/users", function(req, res) {
    db.Hiker.findAll({}).then(function(dbHikers) {
      res.render("UserList", {
        msg: "Welcome!",
        examples: dbHikers
      });
    });
  });

  /// MFH, this one below need to code to handlbars towork
  app.get("/savedsearches", function(req, res) {
    console.log("inside saved searches");
    db.SearchFav.findAll({})
      .then(function(dbSearchFavs) {
        console.log(dbSearchFavs);
        res.render("savedsearches", {
          faves: dbSearchFavs
        });
      })
      .catch(function(err) {
        res.send(err);
      });
  });



  app.get("/trails/:loc", function(req, res) {
    console.log("Im here htmlroute");

    var address = req.params.loc;
    console.log("my address", address);
    var latlngUrl =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "&key=" +
      googleMapsGeoKey;
    axios
      .get(latlngUrl)
      .then(function(response) {
        //var myresult = JSON.stringify(response.data.results[0].geometry, null,2);
        lat = response.data.results[0].geometry.location.lat;
        lng = response.data.results[0].geometry.location.lng;
        var trailUrl =
          "https://www.hikingproject.com/data/get-trails?lat=" +
          lat +
          "&lon=" +
          lng +
          "&maxDistance=" +
          searchRadius +
          "&minLength=" +
          searchLength +
          "&key=" +
          trailsKey;
        axios.get(trailUrl).then(function(response) {
          // console.log(response.data.trails);
          var data = {};
          data = response.data.trails;
          //data.stringify = JSON.stringify(data);
          // console.log(data);
          console.log("renderME");
          res.render("trails", { trails: data });

        });
        //console.log(response.data.results[0].geometry.location.lat);
        //console.log(response.data.results[0].geometry.location.lng);
      })
      .catch(function(error) {
        // handle error
        res.json(error);
      })
      .finally(function() {
        // always executed
      });
  });

  app.get("/aboutUs", function(req, res) {
    res.render("aboutUs");
  });

  app.get("/savedSearches", function(req, res) {
    res.render("savedSearches");
  });

};
