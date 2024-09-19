//  let playerChoice = getPlayerChoice();
//  let computerChoice = getComputerChoice();
let playerScore = 0;
let computerScore = 0;
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const c = document.querySelector(".button-class");
const playBtn = document.getElementsByClassName("play")[0];

c.addEventListener("click",(e)=>{
    if(e.target.id === "rock"){playRound("rock", getComputerChoice());}
    else if(e.target.id === "paper"){playRound("paper",getComputerChoice());}
    else if(e.target.id==="scissors"){playRound("scissors",getComputerChoice());}
});

playBtn.addEventListener("click",reset);

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

function playRound(playerChoice, computerChoice) {
    let outcome = selectWinner(playerChoice, computerChoice);
    if (outcome == 1) {
        playerScore++;
    }
    else if (outcome == -1) {
        computerScore++;
    }
    updateChoiceUI(playerChoice,computerChoice);
    updateScoreUI(playerScore,computerScore)
    if(playerScore >= 5 || computerScore >= 5){
        playGame();
    }
}

function updateChoiceUI(playerChoice, computerChoice){
    document.getElementsByClassName("your-choice")[0].innerHTML = playerChoice;
    document.getElementsByClassName("comp-choice")[0].innerText = computerChoice
}

function updateScoreUI(playerScore, computerScore){
    document.getElementById("playerscore").innerText = playerScore;
    document.getElementById("compscore").innerText = computerScore
}

function playGame() {    
    console.log("Player score: " + playerScore);
    console.log("Computer score: " + computerScore);
    const results =  document.querySelector("h2");
    if (playerScore > computerScore) {
        console.log("Player Won!!");
        results.innerHTML = "Player Won!!";
    }
    else if (playerScore < computerScore) {
        console.log("Computer Won!!");
        results.innerHTML = "Computer Won!!";
    }
    else {
        console.log("Game is a draw");
    }
}

function reset()
{
    playerScore = 0;
    computerScore = 0;
    updateScoreUI(playerScore,computerScore);
}