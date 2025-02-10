const suits = ['h', 'd', 'c', 's'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
let deck = [];
let playerHand = [];
let splitHand = [];
let dealerHand = [];
let playerCredits = 500;
let currentBet = 0;
let splitBet = 0;
let playerSplit = false;
let gameActive = false;

// Create deck
function createDeck() {
    deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({
                name: `${value}${suit}.png`,
                value: value === 'a' ? 11 : (['j', 'q', 'k'].includes(value) ? 10 : parseInt(value))
            });
        });
    });
    shuffleDeck();
    console.log("Deck at start:", deck); // Debugging log
}

// Shuffle deck
function shuffleDeck() {
    deck.sort(() => Math.random() - 0.5);
}

// Calculate hand value
function calculateHandValue(hand) {
    let total = 0;
    let aces = 0;
    hand.forEach(card => {
        total += card.value;
        if (card.value === 11) aces += 1;
    });
    while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
    }
    return total;
}

// Deal card
function dealCard(hand, container) {
    if (deck.length === 0) {
        console.error("Deck is empty! Cannot deal a card.");
        return;
    }
    
    let card = deck.pop();
    console.log("Dealing card:", card);
    hand.push(card);
    
    let img = document.createElement('img');
    img.src = `deck-of-cards/${card.name}`;
    img.alt = card.name;
    img.style.width = "80px"; // Adjust this value as needed
    img.style.height = "auto"; // Maintains aspect ratio
    container.appendChild(img);
}

// Start game
function startGame() {
    if (gameActive) return;
    gameActive = true;
    if (deck.length < 10) {
        createDeck();
    }

    if (currentBet < 5 || currentBet > playerCredits) return alert('Invalid bet');
    playerCredits -= currentBet;
    document.getElementById('credit-amount').innerText = playerCredits;
    
    document.getElementById('hit').disabled = false;
    document.getElementById('stand').disabled = false;
    document.getElementById('double-down').disabled = playerCredits < currentBet;
    document.getElementById('split').disabled = true;

    playerHand = [];
    dealerHand = [];
    document.getElementById('player-cards').innerHTML = '';
    document.getElementById('dealer-cards').innerHTML = '';

    dealCard(playerHand, document.getElementById('player-cards'));
    dealCard(playerHand, document.getElementById('player-cards'));
    dealCard(dealerHand, document.getElementById('dealer-cards'));

    // Enable split if both cards are the same
    if (playerHand[0].value === playerHand[1].value && playerCredits >= currentBet) {
        document.getElementById('split').disabled = false;
    }

    if (calculateHandValue(playerHand) === 21) {
        setTimeout(endGame, 1000);
    }
}

// Double Down Logic
function doubleDown() {
    if (!gameActive) return;
    
    playerCredits -= currentBet;
    currentBet *= 2;
    document.getElementById('credit-amount').innerText = playerCredits;

    dealCard(playerHand, document.getElementById('player-cards'));
    document.getElementById('hit').disabled = true;
    document.getElementById('stand').disabled = true;
    document.getElementById('double-down').disabled = true;
    document.getElementById('split').disabled = true;

    setTimeout(endGame, 1000); // Auto stand after doubling down
}

// Split Logic
function split() {
    if (!gameActive || playerHand.length !== 2 || playerHand[0].value !== playerHand[1].value) return;
    
    playerSplit = true;
    splitHand.push(playerHand.pop()); // Move second card to split hand
    splitBet = currentBet;
    playerCredits -= splitBet;
    
    document.getElementById('credit-amount').innerText = playerCredits;
    
    // Update UI for split hands
    let splitContainer = document.createElement('div');
    splitContainer.id = 'split-hand';
    document.getElementById('player-cards').parentElement.appendChild(splitContainer);

    dealCard(playerHand, document.getElementById('player-cards'));
    dealCard(splitHand, splitContainer);

    document.getElementById('split').disabled = true;
}

// End game
function endGame() {
    gameActive = false;
    document.getElementById('hit').disabled = true;
    document.getElementById('stand').disabled = true;
    document.getElementById('double-down').disabled = true;
    document.getElementById('split').disabled = true;

    let playerTotal = calculateHandValue(playerHand);
    let dealerTotal = calculateHandValue(dealerHand);

    // Dealer keeps drawing cards until at least 17
    function dealerTurn() {
        if (dealerTotal < 17) {
            dealCard(dealerHand, document.getElementById('dealer-cards'));
            dealerTotal = calculateHandValue(dealerHand);
            setTimeout(dealerTurn, 1000);
        } else {
            setTimeout(showResults, 1000);
        }
    }

    // Function to show results after dealer finishes
    // Function to show results after dealer finishes
    function showResults() {
        let resultMessage = "";
        let amountWon = 0;

        if (playerTotal > 21) {
            resultMessage = "You busted! Dealer wins.";
            amountWon = -currentBet;
        } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
            resultMessage = "You win!";
            amountWon = currentBet * 2;
            playerCredits += amountWon;
        } else if (playerTotal === dealerTotal) {
            resultMessage = "It's a tie!";
            amountWon = 0;
            playerCredits += currentBet;
        } else {
            resultMessage = "Dealer wins!";
            amountWon = -currentBet;
        }

        document.getElementById('credit-amount').innerText = playerCredits;

        // Show the result message with win/loss amount
        alert(`${resultMessage}\nYou ${amountWon >= 0 ? "won" : "lost"} ${Math.abs(amountWon)} credits.`);
    }

    dealerTurn();
}

// Attach event listeners after DOM loads
document.addEventListener("DOMContentLoaded", () => {
    createDeck();

    document.getElementById('place-bet').addEventListener('click', () => {
        currentBet = parseInt(document.getElementById('bet-amount').value);
        startGame();
    });

    document.getElementById('hit').addEventListener('click', () => {
        dealCard(playerHand, document.getElementById('player-cards'));
        if (calculateHandValue(playerHand) > 21) {
            setTimeout(endGame, 1000);
        }
    });

    document.getElementById('stand').addEventListener('click', () => {
        setTimeout(endGame, 1000);
    });

    document.getElementById('double-down').addEventListener('click', doubleDown);
    document.getElementById('split').addEventListener('click', split);
});