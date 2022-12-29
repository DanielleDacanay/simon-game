var btnColors = ["red", "blue", "green", "yellow"];
var gamePattern = []; //stores the color pattern the game has generated
var userClickedPattern = []; //stores the button pattern the user has clicked
var level = 0;

//start game on first keypress
$(document).one("keypress", nextSequence);
$(document).one("keypress", function(){
    $("#level-title").text("Level " + level);
});


//feedback when user clicks a button, store color that was clicked
$(".btn").click(function() {
    var userChosenColor = this.id;
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);
});

//prompts the user for which button to click next
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var chosenColor = btnColors[randomNumber];
    gamePattern.push(chosenColor);
    $("#" + chosenColor).fadeOut(200).fadeIn(200);
    playSound(chosenColor);
    level += 1;
}

//plays sound associated to button
function playSound(name) {
    var makeSound = new Audio("/sounds/" + name + ".mp3");
    makeSound.play();
}

//animates button when user clicks
function animatePress(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function() {
        $("#" + name).removeClass("pressed");
    }, 100)
}