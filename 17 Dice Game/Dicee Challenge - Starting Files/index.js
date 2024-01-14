function rollDice() {
    return Math.floor(Math.random() * 6);
}

var diceImg = [ "./images/dice1.png", 
                "./images/dice2.png",
                "./images/dice3.png",
                "./images/dice4.png",
                "./images/dice5.png",
                "./images/dice6.png" ];

var p1Roll = rollDice();
var p2Roll = rollDice();

// Modify img
document.querySelector(".img1").setAttribute("src", diceImg[p1Roll])
document.querySelector(".img2").setAttribute("src", diceImg[p2Roll])

// Modify text to reflect winner
if (p1Roll > p2Roll) {
    document.querySelector("h1").textContent = "🚩Player 1 Wins!";
} else if (p2Roll > p1Roll) {
    document.querySelector("h1").textContent = "Player 2 Wins!🚩";
} else {
    document.querySelector("h1").textContent = "Draw";
}