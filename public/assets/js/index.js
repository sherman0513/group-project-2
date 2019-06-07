$(document).ready(function() {
  console.log("LINKED");

  // $(".bootstrap-tagsinput input").keydown(function(event) {
  //   if (event.which === 13) {
  //     $(this).blur();
  //     $(this).focus();
  //     return false;
  //   }
  // });
});

var API = {
  saveFavTrail: function(newTrailSav) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/favehikes",
      // url: "api/examples",
      // data: JSON.stringify(example)
      data: JSON.stringify(newTrailSav)
    });
  },
  getFavTrails: function(loc) {
    console.log("GetFavTrails");
    console.log("passLoc", loc);
    return $.ajax({
      url: "/trails/" + loc,
      type: "GET"
    });
  },
  // getExamples: function() {
  //   return $.ajax({
  //     url: "api/examples",
  //     type: "GET"
  //   });
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  saveUser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(user)
    });
  }
};

$(document).on("click", ".btn-saveTrail", function(event) {
  event.preventDefault();
  event.stopPropagation();

  //building the save trail object
  var newTrailSav = {
    trailname: $(this).data("trailname"),
    type: $(this).data("type"),
    summary: $(this).data("summary"),
    difficulty: $(this).data("difficulty"),
    stars: $(this).data("stars"),
    location: $(this).data("location"),
    url: $(this).data("url"),
    image: $(this).data("image"),
    length: $(this).data("length"),
    longit: $(this).data("longit"),
    latit: $(this).data("latit"),
    conditionstat: $(this).data("conditionstat"),
    conditiondetails: $(this).data("conddetails"),
    conditiondate: $(this).data("conddate"),
    trailid: $(this).data("myval"),
    HikerId: $(this).data("hikerid")
  };

  API.saveFavTrail(newTrailSav).then(function(result) {
    console.log("My result of saving trails", result);
  });
});

var $submitBtn = $("#submitSignUp");
var $exampleList = $("#example-list");

// var $searchLocation = $("#locationInput");

var $fName = $("#fName");
var $lName = $("#lName");
var $email = $("#inputEmail");
// var $password = $("#inputPassword");
var $address = $("#inputAddress");
var $city = $("#inputCity");
var $state = $("#inputState");
var $zip = $("#inputZip");

// The API object contains methods for each kind of request we'll make

// refreshExamples gets new examples from the db and repopulates the list
var refreshFavTrails = function() {
  API.getFavTrails().then(function(data) {
    var $favTrails = data.map(function(favTrail) {
      var $a = $("<a>")
        .text(favTrail.text)
        .attr("href", "/favtrail/" + favTrail.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": favTrail.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("Favorite");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($favTrails);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("i'm here");

  var user = {
    fname: $fName.val().trim(),
    lname: $lName.val().trim(),
    email: $email.val().trim(),
    // password: $password.val().trim(),
    address: $address.val().trim(),
    city: $city.val().trim(),
    state: $state.val().trim(),
    zip: $zip.val().trim()
  };

  console.log(user);
  if (!(user.fname && user.lname)) {
    alert("You must enter a first and last name!");
    return;
  }
  console.log("I'm on line 143");

  API.saveUser(user).then(function() {
    console.log("callback");
    // refreshForm();
  });

  $fName.val("");
  $lName.val("");
  $email.val("");
  // $password.val("");
  $address.val("");
  $city.val("");
  $state.val("");
  $zip.val("");
};

$("#searchLocation2").on("click", function(event) {
  event.preventDefault();
  event.stopPropagation();
  console.log("click me");
  varloc = $("#locations")
    .val()
    .trim();
  console.log("My input ", varloc);

  if (varloc.length === 0) {
    alert("Please enter a location");
    return;
  }

  window.location = "/trails/" + varloc;
  // API.getFavTrails(varloc)
  // .done(res => {
  //     console.log('res',res);
  // })
  // .fail()
});

var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshFavTrails();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
// $saveFavTrail.on("click", saveFavTrail);
