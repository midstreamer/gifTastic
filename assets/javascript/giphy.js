//Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you.Save it to a variable called`topics`.
   //We chose animals for our theme, but you can make a list to your own liking.-->

   var animal = ["cat", "dog", "bird", "pig", "skunk", "duck", "cow", "frog", "fish", "bear", "moose", "turtle"];

    function renderButtons() {

      $("#animal-view").empty();

      for (var i = 0; i < animal.length; i++) {
        console.log(animal[i]);
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-name", animal[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(animal[i]);

        // chain jQuery Methods
        // var a = $("<button>").addClass("movie").attr("data-name", movies[i]).text(movies[i]);
        // Adding the button to the HTML
        $("#animal-view").append(a);
      }
    }
    // This function handles events where one button is clicked
    $("#add-animal").on("click", function (event) {
      // event.preventDefault() prevents the form from trying to submit itself.
      // We're using a form so that the user can hit enter instead of clicking the button if they want
      event.preventDefault();

      // This line will grab the text from the input box
      var animalInput = $("#animal-input").val().trim();
      // The animal from the textbox is then added to our array
      animal.push(animal);

      // calling renderButtons which handles the processing of our animal array
      renderButtons();
    });

    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();

    $("button").on("click", function () {

      var animalName = $(this).attr("data-name");

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animalName + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);
            animalDiv.append(p, animalImage); //this works the same as the two above lines.

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(animalDiv);
            
          }
        });
    });
    $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
 

//Your app should take the topics in this array and create buttons in your HTML.
   //Try using a loop that appends a button for each string in the array.

//When the user clicks on a button, the page should grab 10 static, non - animated gif images from the GIPHY API and place them on the page.

//When the user clicks one of the still GIPHY images, the gif should animate.If the user clicks the gif again, it should stop playing.

//Under every gif, display its rating(PG, G, so on).
   //This data is provided by the GIPHY API.
   //Only once you get images displaying with button presses should you move on to the next step.

//Add a form to your page takes the value from a user input box and adds it into your`topics` array.Then make a function call that takes each topic in the array remakes the buttons on the page.

//Deploy your assignment to Github Pages.

//** Rejoice ** !You just made something really cool.-->