console.log("LINKED");
// Get references to page elements
// var $saveFavTrail = $("#favorite-hike");
// var $exampleDescription = $("#example-description");
var $submitBtn = $("#submitSignUp");
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
var API = {
  saveFavTrail: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/trails",
      // url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getFavTrails: function() {
    return $.ajax({
      url: "api/trails",
      type: "GET"
    });
  },

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

// refreshExamples gets new examples from the db and repopulates the list
// var refreshFavTrails = function() {
//   API.getFavTrails().then(function(data) {
//     var $favTrails = data.map(function(favTrail) {
//       var $a = $("<a>")
//         .text(favTrail.text)
//         .attr("href", "/favtrail/" + favTrail.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": favTrail.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("Favorite");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($favTrails);
//   });
// };


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("i'm here");

  var user = {
    fName: $fName.val().trim(),
    lName: $lName.val().trim(),
    email: $email.val().trim(),
    // password: $password.val().trim(),
    address: $address.val().trim(),
    city: $city.val().trim(),
    state: $state.val().trim(),
    zip: $zip.val().trim()
  };

  console.log(user);
  if (!(user.fName && user.lName)) {
    alert("You must enter a first and last name!");
    return;
  }
  console.log("I'm on line 143");

  API.saveUser(user).then(function() {
    console.log("callback");
    // refreshForm();
  });
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshFavTrails();
//   });
// };

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
// $saveFavTrail.on("click", saveFavTrail);
