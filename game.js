var btnColors = ["red", "blue", "green", "yellow"];
var gamePattern = []; //stores the color pattern the game has generated
var userClickedPattern = []; //stores the button pattern the user has clicked
var level = 0;
var started = false;

//start game on first keypress or on restart
$(document).keypress(function() {
    if (started != true) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
});

//feedback when user clicks a button, store color that was clicked
$(".btn").click(function() {
    var userChosenColor = this.id;
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

//prompts the user for which button to click next
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var chosenColor = btnColors[randomNumber];
    gamePattern.push(chosenColor);
    $("#" + chosenColor).fadeOut(200).fadeIn(200);
    playSound(chosenColor);
    level = level + 1;
    $("#level-title").text("Level " + level);
    started = true;
}

//plays sound associated to button
function playSound(name) {
    var makeSound = new Audio("./sounds/" + name + ".mp3");
    makeSound.play();
}

//animates button when user clicks
function animatePress(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function() {
        $("#" + name).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }else{
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over! Press any key to play again.");
        startOver(0);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}