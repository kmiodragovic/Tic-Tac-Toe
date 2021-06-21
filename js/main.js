import Player from "./Player.js";

const players = [ ];
const fields = document.querySelectorAll(".field");
const board = document.querySelector(".board")
const resetButton = document.querySelector(".reset");
const playerOne = new Player("player1", "X");
const playerTwo = new Player("player2", "O");

let currentPlayer = 0; // This is the index of the array of the currentplayer

players.push(playerOne);
players.push(playerTwo);

for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    field.addEventListener("click", function() {
        addSymbolToField(field);        
        checkWinner();
    });
}

resetButton.addEventListener("click", resetGame);

let currentSymbol = players[currentPlayer].symbol;

function addSymbolToField(field) {
    let fieldContent = field.textContent;
    
    if (fieldContent === 'X' || fieldContent === 'O') {
        alert('This field can not be used');
        return;
    }

    if (currentPlayer === 0) {
        currentSymbol = players[currentPlayer].symbol;
        field.textContent = currentSymbol;
        currentPlayer++;
        return;
    } else  {
        currentSymbol = players[currentPlayer].symbol;
        field.textContent = currentSymbol;
        currentPlayer--;
        return;
    }
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameState = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
    console.log(gameState)
    for(let i = 0; i < fields.length; i++)  {
        const state = fields[i].textContent;
        gameState[i] = state;
    }

    let roundWon = false;

    for (let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        for(let i = 0; i < players.length; i++) {
            let player = players[i];

            if(currentSymbol === player.symbol) {
                player.addPoint();
                alert(player.name + " has won & has " + player.points + " Points");
            }
        }
    }
}

function resetGame() {
    for (let i = 0; fields.length > i; i++){
        fields[i].textContent = "";        
    }

    currentSymbol = players[0].symbol;
    currentPlayer = 0;
}

