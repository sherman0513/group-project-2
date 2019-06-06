require("dotenv").config();
var bodyParser = require("body-parser");
var express = require("express");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var localStrategy = require("./config/passport");

// sets up port and requiring models for syncing
var PORT = process.env.PORT || 3000;
var db = require("./models");

// Middleware
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());
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

// assemble is a descendant of `templates`
// var app = assemble();
// app.engine('hbs', require('engine-handlebars'));

// // engines like handlebars can handle a helper name with dashes
// app.helper('link-to', require('helper-link-to'));

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


var syncOptions = { force: true };

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
