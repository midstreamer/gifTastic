var animal = ["cat", "goat", "bird", "pig", "skunk", "duck", "cow", "frog", "fish", "bear", "moose", "turtle"];

    function renderButtons() { //this function will loop through the array and render buttons for each animal

      $("#animal-view").empty();

      for (var i = 0; i < animal.length; i++) {
        console.log(animal[i]);
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-name", animal[i]);
        a.text(animal[i]);  // This provides the button's text with a value of the animal at index i

        $("#animal-view").append(a);
      }
    }

    renderButtons();  // Calling the renderButtons function at least once to display the initial list of animals

    $("button").on("click", function () { //this on click event will query the Giphy API for the animal in the array 

      var animalName = $(this).attr("data-name");

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animalName + "&api_key=sHH4T81tmO7kT9Nb2jYBX8S5Fz7jZkJo&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })

        .then(function (response) {
          console.log(queryURL);

          console.log(response);

          var results = response.data; // This stores the data from the AJAX request in the results variable

          for (var i = 0; i < results.length; i++) { // This loops through each result item

            var animalDiv = $("<div>"); // Creates and stores a div tag

            var p = $("<p>").text("Rating: " + results[i].rating); // This creates a paragraph tag with the result item's rating

            var animalImage = $("<img>");// Creating and storing an image tag

            animalImage.attr("src", results[i].images.fixed_height_still.url); // This sets the src attribute of the image to a property pulled off the result item
            animalImage.attr("class", "gif"); // Added this class do that we can use it later to call the gif and animate it or stop it
            animalImage.attr("data-state", "still"); //assigns a data state of still to the gif
            animalImage.attr("data-still", results[i].images.fixed_height_still.url); //assigns the url for the stil image to the data-still attribute
            animalImage.attr("data-dynamic", results[i].images.fixed_height.url); //assigns the url for the dynamic image to the data-dynamic attribute


            animalDiv.append(p); // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(animalImage);
            animalDiv.append(p, animalImage); //this works the same as the two above lines.

            $("#gifs-appear-here").prepend(animalDiv); // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div

          }
        });
    });

    $("#add-animal").on("click", function (event) { // This function handles events where one of the buttons is clicked

      event.preventDefault(); // event.preventDefault() prevents the form from trying to submit itself.

      var animalInput = $("#animal-input").val().trim();  // This line will grab the text from the input box

      animal.push(animalInput); // The animal from the textbox is then added to our array

      renderButtons();  // calling renderButtons which handles the processing of our animal array with the new animal added

      $("button").on("click", function () { //this on click event will query the Giphy API for the animal in the array 

        var animalName = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animalName + "&api_key=sHH4T81tmO7kT9Nb2jYBX8S5Fz7jZkJo&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        })

          .then(function (response) {
            console.log(queryURL);

            console.log(response);

            var results = response.data; // This stores the data from the AJAX request in the results variable

            for (var i = 0; i < results.length; i++) { // This loops through each result item

              var animalDiv = $("<div>"); // Creates and stores a div tag

              var p = $("<p>").text("Rating: " + results[i].rating); // This creates a paragraph tag with the result item's rating

              var animalImage = $("<img>");// Creating and storing an image tag

              animalImage.attr("src", results[i].images.fixed_height_still.url); // This sets the src attribute of the image to a property pulled off the result item
              animalImage.attr("class", "gif"); // Added this class do that we can use it later to call the gif and animate it or stop it
              animalImage.attr("data-state", "still"); //assigns a data state of still to the gif
              animalImage.attr("data-still", results[i].images.fixed_height_still.url); //assigns the url for the stil image to the data-still attribute
              animalImage.attr("data-dynamic", results[i].images.fixed_height.url); //assigns the url for the dynamic image to the data-dynamic attribute


              animalDiv.append(p); // Appending the paragraph and image tag to the animalDiv
              animalDiv.append(animalImage);
              animalDiv.append(p, animalImage); //this works the same as the two above lines.

              $("#gifs-appear-here").prepend(animalDiv); // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div

            }
          });
      });

    });

    $(document).on("click", ".gif", function () { // This function will change the data state of the gif if it is clicked on.
      console.log("im here")

      var state = $(this).attr("data-state"); // this sets the value of the attribute data-state to the variable state 

      // Then, set the image's data-state to animate
      // Else set src to the data-still value

      var still = $(this).attr("data-still");
      var dynamic = $(this).attr("data-dynamic");


      if (state === "still") { //this checks to see if the data state of the gif is still 
        $(this).attr("src", dynamic); // Then, if it is still this will set the image's data-state to animate
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", still); // Else sets the data state to animate
        $(this).attr("data-state", "still");
      }
    });