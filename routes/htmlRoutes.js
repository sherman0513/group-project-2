/* eslint-disable prettier/prettier */
// Dependencies
// =============================================================
// require("dotenv").config();
// var keys = require("../keys.js");
// var request = require("request");
// // var path = require("path");
// // var db = require("../models");

// // var axios = require("axios");

// // var googleMapsGeoKey = keys.google.id;
// var googleMapsGeoKey = "200478105-d8aad42d0f96cc437e18f84fec7edbbc";

// // var trailsKey = keys.trail.id;
// var trailsKey = "AIzaSyBhQzp3YANF-ovfShlRlDcLCCxiJB_Nntg";

// Routes
// =============================================================
module.exports = function (app) {
  // main route
  app.get("/", function (req, res) {
    res.render("index");
  });

  // user sign-up (create account) route
  app.get("/userReg", function (req, res) {
    console.log("Your user information has been received!");
    res.render("userReg");
  });

  app.get("/api/users", function (req, res) {
    res.render("example");
  });


  app.get("/trails", function (req, res) {
    console.log("Trails handlebar page rendered!");
    res.render("trails");
  });
  
};

// / Basic Node application for requesting data from the OMDB website via axios
// Here we incorporate the "axios" npm package
var axios = require("axios");
// var request = require("request");
var googleMapsGeoKey = "AIzaSyAcWi7e4cYLA0SxYDy4qM4TI4itINyOIek";

// var request = require("request-promise");
var address = "85295";
var latlngUrl =
  "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  address +
  "&key=" +
  googleMapsGeoKey;

/* request.get(latlngUrl).on("response", function(response) {
 console.log(response.statusCode); // 200

 Object.keys(response);

 console.log(Object.keys(response)); // 'image/png'
}); */

// /* // We then run the request with axios module on a URL with a JSON
axios.get(latlngUrl).then(function (response) {

  var myresult = JSON.stringify(response.data.results, null, 2);

  console.log(myresult);
});






