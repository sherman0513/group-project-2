var lat = 33.44838;
var long = -112.07404;
var distance = $("#search-min-lng");
// var radius = $("#search-max-dist")
// var location =

var queryURL =
  "https://www.hikingproject.com/data/get-trails?lat=" +
  lat +
  "&lon=" +
  long +
  "&maxDistance=" +
  distance +
  "&key=200478105-d8aad42d0f96cc437e18f84fec7edbbc";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(data) {
  console.log(data);
  res.render("trails", {
    msg: "Welcome!",
    examples: data
  });
});

