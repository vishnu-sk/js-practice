//  let playerChoice = getPlayerChoice();
//  let computerChoice = getComputerChoice();
let playerScore = 0;
let computerScore = 0;
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const c = document.querySelector(".button-class");
c.addEventListener("click",(e)=>{playRound(e.target.id);})
// rock.addEventListener("click", getPlayerChoice);
// function getPlayerChoice(e) {
//     playRound(e);
// }
function getComputerChoice() {
    let randInt = Math.random();
    if (randInt <= 0.33) {
        console.log("comp choice: rock " + randInt);
        return "rock";
    }
    else if (randInt >= 0.66) {
        console.log("comp choice: scissors " + randInt);
        return "scissors";
    }
    else {
        console.log("comp choice: paper " + randInt);
        return "paper";
    }
}
function selectWinner(player, comp) {
    player = player.toLowerCase();
    if (player == "rock") {
        if (comp == "paper") return -1;
        else if (comp == "scissors") return 1;
        else return 0;
    }
    else if (player == "paper") {
        if (comp == "paper") return 0;
        else if (comp == "scissors") return -1;
        else return 1;
    }
    else {
        if (comp == "paper") return 1;
        else if (comp == "scissors") return 0;
        else return -1;
    }
}
function playRound(playerChoice) {
    // let outcome = selectWinner(getPlayerChoice(), getComputerChoice());
    let outcome = selectWinner(playerChoice, getComputerChoice());
    if (outcome == 1) {
        playerScore++;
    }
    else if (outcome == -1) {
        computerScore++;
    }
    document.getElementById("playerscore").innerText = playerScore;
    document.getElementById("compscore").innerText = computerScore;
}
function playGame() {
    playerScore = 0; computerScore = 0;
    
    console.log("Player score: " + playerScore);
    console.log("Computer score: " + computerScore);
    if (playerScore > computerScore) {
        console.log("Player Won!!");
    }
    else if (playerScore < computerScore) {
        console.log("Computer Won!!");
    }
    else {
        console.log("Game is a draw");
    }
}