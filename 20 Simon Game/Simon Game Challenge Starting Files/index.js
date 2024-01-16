class GameButton {
    constructor(color, sound) {
        this.color = color;
        this.sound = new Audio(sound);
    }

    playSound() {
        this.sound.play();
    }
}

// Set up button map
var btnMap = new Map();
btnMap.set("green", new GameButton("green", "./sounds/green.mp3"));
btnMap.set("red", new GameButton("red", "./sounds/red.mp3"));
btnMap.set("yellow", new GameButton("yellow", "./sounds/yellow.mp3"));
btnMap.set("blue", new GameButton("blue", "./sounds/blue.mp3"));

var wrongSound = new Audio("./sounds/wrong.mp3");
var gameStart = false;
var level = 1;
const colArr = ["green", "red", "yellow", "blue"];
var answerArr = [];
var inputPos = 0;

function updateLevel(lvl) {
    $("#level-title").text("Level " + lvl);
    inputPos = 0;

    var rndBtn = colArr[Math.floor(Math.random() * 4)];
    answerArr.push(rndBtn);

    setTimeout(() => {
        // Animate the last answer
        $("#" + rndBtn).fadeOut(100).fadeIn(100);
        btnMap.get(rndBtn).playSound();
    }, 1000);
}

$(document).on("keypress", function() {
    if (gameStart === false) {
        gameStart = true;

        // Reset all stats
        level = 1;
        answerArr = [];

        updateLevel(level);
    }
});

$(".btn").on("click", function(e) {
    if (gameStart != true) {
        return;
    }

    // Animate and play sound
    $(e.target).addClass("pressed")
    setTimeout(() => {
        $(e.target).removeClass("pressed");
        btnMap.get(e.target.id).playSound();
    }, 100) ;

    if (answerArr[inputPos] === e.target.id) {
        // update position
        inputPos++;

        // Update level
        if (inputPos >= answerArr.length) {
            level++;
            updateLevel(level);
        }
    } else {
        wrongSound.play();
        $("body").addClass("game-over");
        $("#level-title").text("YOU LOSE! Press any key to try again.");
        gameStart = false;
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
    }
});