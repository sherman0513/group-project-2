$(document).ready(function() {
  console.log("LINKED");

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

  $(document)
    .off("click", ".btn-saveTrail")
    .on("click", ".btn-saveTrail", function(event) {
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
      $(this).text("Hike Saved");
      $(this).prop("disabled", true);

      API.saveFavTrail(newTrailSav).then(function(result) {
        console.log("My result of saving trails", result);
      });
    });

  $("#searchLocation2").on("click", function(event) {
    event.preventDefault();
    //  event.stopPropagation();
    console.log("click me");
    var varloc = $("#locations")
      .val()
      .trim();
    console.log("My input ", varloc);
    if (varloc.length === 0) {
      alert("Please enter a location");
      return;
    }
    window.location = "/trails/" + varloc;

  });

});