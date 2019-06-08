require('dotenv').config()
var express = require('express')
var app = express()
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var PORT = process.env.PORT || 5000

//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/app"));

// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    res.render('index');
});

//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);
require("./app/routes/htmlRoutes")(app);
require("./app/routes/apiroutes")(app);

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

console.log(process.env.NODE_ENV);
//Sync Database
models.sequelize.sync().then(function () {

    app.get("/", (req, res) => {
        res.send(process.env.SECRET_KEY);
    });

    app.listen(PORT, function (err) {
        if (!err)
            console.log("Site is live");
        else console.log(err)
    });

    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});


