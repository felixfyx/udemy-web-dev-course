// This is how to select a element in the document with jQuery
// No need to type the long ass bollocks anymore
$("h1").css("color", "red");

// Just like css, you can pick classes by putting a . or an id by # at the front

// Adding class
// Somehow color not applied
$("h1").addClass("big");

//$("button").text("Clickity Clackity");

// We can modify their html too! Neato!
$("button").html("<em>Click this!</em>");

// Changing attribute on the fly
$("a").attr("href", "https://yahoo.com");

// Adding functions
$("h1").on("click", function() {
    $("h1").text("Bye");
});

// Adding a keydown event
$("input").on("keydown", function(event) {
    // To change between hide and show
    // $("h1").toggle(); 

    // I can fadeIn and fadeOut too
    //$("h1").fadeToggle();

    // Slide up and down works too
    // $("h1").slideToggle();

    // You can chain animation (animate gives you fine tune control)
    $("h1").slideUp().slideDown().animate({opacity: 0.5});
});

// This will make you a nice keylogger
$(document).on("keydown", function(event) {
    $("h1").text(event.key);
});

// Adding new elements to all buttons
$("button").on("click", function(event) {
    $("h1").text(event.target);
    // This an example of adding and removing elements
    if (event.target.innerHTML === "new") {
        // HACK: Somehow using the button tag will not work for button outside the button
        // I had to use document for it instead
        $(event.target).remove();
    } else {
        // Sometimes this will add button in the button cuz you clicked on the text
        $(event.target).after("<button>new</button>");
        // There's also after, prepend, append
    }
});