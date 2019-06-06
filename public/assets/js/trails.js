// $("#searchLocation").on("click", function(event) {

// function trailSearch() {
//   var lat = 33.44838;
//   var long = -112.07404;
//   var distance = 10;
//   // var radius = $("#search-max-dist")
//   // var location =

//   var queryURL =
//     "https://www.hikingproject.com/data/get-trails?lat=" +
//     lat +
//     "&lon=" +
//     long +
//     "&maxDistance=" +
//     distance +
//     "&key=200478105-d8aad42d0f96cc437e18f84fec7edbbc";
//   console.log(queryURL);
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//     .done(function(data) {
//       console.log(data);
//     })
//     .fail(function(error) {
//       console.log("Promise catch: " + error);
//     });
// }

// require the dependencies
// require("dotenv").config();
// var request = require("request");
// // var db = require("../models");
// var keys = require("../keys.js");
// var trailsKey = "200478105-d8aad42d0f96cc437e18f84fec7edbbc";
// var googleMapsGeoKey = "AIzaSyBhQzp3YANF-ovfShlRlDcLCCxiJB_Nntg"

// activate api keys
// var googleMapsGeoKey = keys.google.id;
// var trailsKey = keys.trail.id;

// module.exports = function(app) {
//   // get route to ultimately return trails of a given minimum length in a given radius around a given address
//   app.get("/api/ex/trail", function(req, res) {
//     var address = req.query.address;
//     var searchRadius = req.query.searchRadius;
//     var searchLength = req.query.searchLength;

//     var latlngUrl =
//       "https://maps.googleapis.com/maps/api/geocode/json?address=" +
//       address +
//       "&key=" +
//       googleMapsGeoKey;

//     // request to the googlemaps geocode api to convert the address into latitude and longitude
//     request(latlngUrl, function(error, response, body) {
//       var externalRes = {};

//       if (error) {
//         console.log("Error Occurred: " + error);
//         return res.json(error);
//       }

//       // collect lat & long from body
//       var latlngParsed = JSON.parse(body);
//       externalRes.location = latlngParsed.results[0].geometry.location;

//       var trailUrl =
//         "https://www.hikingproject.com/data/get-trails?lat=" +
//         externalRes.location.lat +
//         "&lon=" +
//         externalRes.location.lng +
//         "&maxDistance=" +
//         searchRadius +
//         "&minLength=" +
//         searchLength +
//         "&key=" +
//         trailsKey;

//       // request to the trail api using the returned latitude and longitude and the given minimum trail length and search radius
//       request(trailUrl, function(error, response, body) {
//         if (error) {
//           console.log("Error Occurred: " + error);
//           return res.json(error);
//         }

//         var trailParsed = JSON.parse(body);
//         externalRes.trails = trailParsed.trails;

//         res.send(externalRes);
//       });
//     });
//   });
// };

// var lat = 33.44838;
// var long = -112.07404;
// var distance = $("#search-min-lng");
// // var radius = $("#search-max-dist")
// // var location =

// var queryURL =
//   "https://maps.googleapis.com/maps/api/geocode/json?address=" +
//   address +
//   "&key=" +
//   googleMapsGeoKey;

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(data) {
//   console.log(data);
//   res.render("trails", {
//     msg: "address changed to latLong!",
//     examples: data
//   });
// });

// var queryURL =
//   "https://www.hikingproject.com/data/get-trails?lat=" +
//   lat +
//   "&lon=" +
//   long +
//   "&maxDistance=" +
//   distance +
//   "&key=" +
//   trailsKey;

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(data) {
//   console.log(data);
//   res.render("trails", {
//     msg: "Welcome!",
//     examples: data
//   });
