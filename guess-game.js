class Game {
    constructor() {
        this.ranNum = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
    }

    NewNum() {
        this.ranNum = Math.floor(Math.random() * 100) + 1;
    }
}

let guessGame = new Game();

function StartGame() {
    var intro = document.getElementById("game-intro");
    intro.style.display = "none";

    var game = document.getElementById("game");
    game.style.display = "block";

    guessGame.NewNum(); // Ensure a new number is selected when starting
    console.log("Random number selected: " + guessGame.ranNum);
}

function Guess() {
    let guess = parseInt(document.getElementById("guess").value.trim());
    let hl = document.getElementById("high-low-text");
    hl.textContent = " ";
    hl.style.display = "block";

    if (isNaN(guess)) {
        console.log("No value/invalid input");
        hl.textContent = "Please enter a valid number!";
        return;
    }

    console.log("Guess: " + guess);

    if (guess === guessGame.ranNum) {
        console.log("Game has won: " + guessGame.ranNum);
        document.body.style.backgroundColor = "green";
        hl.textContent = "Congrats! You won!";
        guessGame.attempts++;
        document.getElementById("attempts").textContent = "Attempts: " + guessGame.attempts;
        GameWon();
    } else if (guess > guessGame.ranNum) {
        console.log("Guess was greater than random number: " + guessGame.ranNum);
        guessGame.attempts++;
        document.getElementById("attempts").textContent = "Attempts: " + guessGame.attempts;
        hl.textContent = "Too High!";
    } else {
        console.log("Guess was lower than random number: " + guessGame.ranNum);
        guessGame.attempts++;
        document.getElementById("attempts").textContent = "Attempts: " + guessGame.attempts;
        hl.textContent = "Too Low!";
    }
}

function GameWon() {
    var guessBtn = document.getElementById("btn-guess");
    guessBtn.style.display = "none";
}

function Reset() {
    document.getElementById("game-intro").style.display = "block";
    document.getElementById("game").style.display = "none";
    console.log("Game Reset. New random number selected.");

    let hl = document.getElementById("high-low-text");
    hl.textContent = " ";

    document.getElementById("btn-guess").style.display = "inline-block";

    guessGame.attempts = 0;
    document.getElementById("attempts").textContent = "Attempts: " + guessGame.attempts;

    document.getElementById("guess").value = "";

    document.body.style.backgroundColor = "black";
    guessGame.NewNum();
    console.log("New number generated: " + guessGame.ranNum);
}