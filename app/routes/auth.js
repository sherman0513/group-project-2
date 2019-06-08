var authController = require('../controllers/authcontroller.js');
var db = require("../models");
var axios = require("axios");

module.exports = function (app, passport) {

    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }
    ));

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }
    ));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }

    app.get("/trails", authController.trails, function (req, res) {

        axios
            .get(latlngUrl)
            .then(function (response) {
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

                axios.get(trailUrl).then(function (response) {
                    // console.log(response.data.trails);

                    var data = {};
                    data = response.data.trails;
                    //data.stringify = JSON.stringify(data);
                    console.log(data);
                    console.log("renderME");
                    res.render("trails", { trails: data });
                });

                //console.log(response.data.results[0].geometry.location.lat);
                //console.log(response.data.results[0].geometry.location.lng);
            })

            .catch(function (error) {
                // handle error
                res.json(error);
            })
            .finally(function () {
                // always executed
            });

    });

    app.post("/trails", function (req, res) {
        res.render("trails", authController.trails);
    });

}

