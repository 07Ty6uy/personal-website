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

    console.log("Random number selected: " + guessGame.ranNum);
}

function Guess() {
    let guess = parseInt(document.getElementById("guess").value.trim());
    let hl = document.getElementById("high-low");
    hl.textContent = " ";
    hl.style.display = "block";

    if (guess === "" || isNaN(guess)) {
        console.log("No value/invalid input");
        hl.textContent = "Please enter a valid number!";
        return;
    }   else {
            console.log("Guess: " + guess)

            if (guess == guessGame.ranNum) {
                console.log("Game has won: " + guessGame.ranNum);
                document.body.style.backgroundColor = "green";
                hl.textContent = "Congrats! You won!";
                guessGame.attempts++;
                document.getElementById("attempts").textContent = "Attempts: " + guessGame.attempts;
                GameWon();
            } else if (guess > guessGame.ranNum) {
                console.log("Guess was greater than random number: " + guessGame.ranNum);
                guessGame.attempts += 1;
                document.getElementById("attempts").textContent = "Attempts: " + guessGame.attempts;
                hl.textContent = "Too High!";
            } else { // guess < guessGame.ranNum
                console.log("Guess was lower than random number: " + guessGame.ranNum);
                guessGame.attempts++;
                document.getElementById("attempts").textContent = "Attempts: " + guessGame.attempts;
                hl.textContent = "Too Low!";
            }
        }
}

function GameWon() {
    var guessBtn = document.getElementById("btn-guess");
    guessBtn.style.display = "none";
}

function Reset() {
    var intro = document.getElementById("game-intro");
    intro.style.display = "none";

    var game = document.getElementById("game");
    game.style.display = "block";

    console.log("Game Reset. Random number selected: " + guessGame.ranNum);

    let hl = document.getElementById("high-low");
    hl.textContent = " ";

    var guessBtn = document.getElementById("btn-guess");
    guessBtn.style.display = "inline-block";

    guessGame.attempts = 0;
    document.getElementById("attempts").textContent = "Attempts: " + guessGame.attempts;

    let guessInput = document.getElementById("guess");
    guessInput.value = "";

    document.body.style.backgroundColor = "black";
    guessGame.NewNum();
    console.log("New num generated: " + guessGame.ranNum);
}