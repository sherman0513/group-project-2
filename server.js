require("dotenv").config();
var bodyParser = require("body-parser");
var express = require("express");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var localStrategy = require("./config/passport");

<<<<<<< HEAD
// sets up port and requiring models for syncing
var PORT = process.env.PORT || 3000;
var db = require("./models");

// Middleware
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());
=======
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
>>>>>>> 86c2337950becd50d79c9295a2078b29baaa44fb
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use('local', localStrategy);
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    var namespace = param.split('.'), root = namespace.shift(), formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.succes_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes");
require("./routes/htmlRoutes");

<<<<<<< HEAD
var syncOptions = { force: true };
=======
var syncOptions = {
  force: false
};
>>>>>>> 86c2337950becd50d79c9295a2078b29baaa44fb

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "development") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  // app.get("/", (req, res) => {
  //   res.send(process.env.SECRET_KEY);
  // })

  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
