$(document).ready(function() {
  // Getting references to the name input and hiker container, as well as the table body
  var fName = $("#fName");
  var lName = $("#lName");
  var email = $("#inputEmail");
  var password = $("#inputPassword");
  var address = $("#inputAddress");
  var city = $("#inputCity");
  var state = $("#inputState");
  var zip = $("#inputZip");

  // Adding event listeners to the form to create a new object, and the button to delete
  // an hiker
  $(document).on("submit", "#hiker-form", handleHikerFormSubmit);
  // $(document).on("click", ".delete-hiker", handleDeleteButtonPress);

  // Getting the initial list of hikers
  // getHikers();

  // A function to handle what happens when the form is submitted to create a new hiker
  function handleHikerFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (
      !fName
        .val()
        .trim()
        .trim() &&
      !lName
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    // Calling the upserthiker function and passing in the value of the name input
    upsertHiker({
      fname: fName.val().trim(),
      lname: lName.val().trim(),
      address: address.val().trim(),
      city: city.val().trim(),
      state: state.val().trim(),
      zip: zip.val().trim(),
      email: email.val().trim(),
      longit: 0,
      latit: 0
    });
  }

  // A function for creating an hiker. Calls getHikers upon completion
  function upsertHiker(hikerData) {
    $.post("/api/hikers", hikerData).then(console.log("hiker added"));
  }

  // Function for creating a new list row for hikers
  function createHikerRow(hikerData) {
    var newTr = $("<tr>");
    newTr.data("hiker", hikerData);
    newTr.append("<td>" + hikerData.name + "</td>");
    if (hikerData.Posts) {
      newTr.append("<td> " + hikerData.Posts.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append(
      "<td><a href='/blog?hiker_id=" + hikerData.id + "'>Go to Posts</a></td>"
    );
    newTr.append(
      "<td><a href='/cms?hiker_id=" + hikerData.id + "'>Create a Post</a></td>"
    );
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-hiker'>Delete hiker</a></td>"
    );
    return newTr;
  }

  //   Function for retrieving hikers and getting them ready to be rendered to the page
  // function getHiker() {
  //   $.get("/api/hikers", function(data) {
  //     // var rowsToAdd = [];
  //     // for (var i = 0; i < data.length; i++) {
  //       rowsToAdd.push(createHikerRow(data[i]));
  //     }
  //     // renderHikerList(rowsToAdd);
  //     nameInput.val("");
  //   });
  // }

  // function getHikers() {
  //         $.get("/api/hikers", function(data) {
  //             rowsToAdd.push(createHikerRow(data[i]));
  //         }

  //   A function for rendering the list of hikers to the page
  // function renderHikerList(rows) {
  //   hikerList
  //     .children()
  //     .not(":last")
  //     .remove();
  //   hikerContainer.children(".alert").remove();
  //   if (rows.length) {
  //     console.log(rows);
  //     hikerList.prepend(rows);
  //   } else {
  //     renderEmpty();
  //   }
  // }

  // Function for handling what to render when there are no hikers
  //   function renderEmpty() {
  //     var alertDiv = $("<div>");
  //     alertDiv.addClass("alert alert-danger");
  //     alertDiv.text("You must create a hiker before you can create a Post.");
  //     hikerContainer.append(alertDiv);
  //   }

  //   // Function for handling what happens when the delete button is pressed
  //   function handleDeleteButtonPress() {
  //     var listItemData = $(this)
  //       .parent("td")
  //       .parent("tr")
  //       .data("hiker");
  //     var id = listItemData.id;
  //     $.ajax({
  //       method: "DELETE",
  //       url: "/api/hikers/" + id
  //     }).then(getHikers);
  //   }
});
