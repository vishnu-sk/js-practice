//  let playerChoice = getPlayerChoice();
//  let computerChoice = getComputerChoice();
let playerScore = 0; 
let computerScore = 0;

function getPlayerChoice()
{
    return prompt("What do you want to choose? Rock, Paper Scissors");
}
function getComputerChoice()
{
    let randInt = Math.random();
    if(randInt<=0.33)
    {
        console.log("comp choice: rock " + randInt);
        return "rock";
    }
    else if(randInt >= 0.66)
    {
        console.log("comp choice: scissors " + randInt);
        return "scissors";
    }
    else {
        console.log("comp choice: paper " + randInt);
        return "paper";
    }
}
function selectWinner(player, comp)
{
    player = player.toLowerCase();
    if(player == "rock")
    {
        if(comp == "paper") return -1;
        else if(comp == "scissors") return 1;
        else return 0;
    }
    else if(player == "paper")
    {
        if(comp == "paper") return 0;
        else if(comp == "scissors") return -1;
        else return 1;
    }
    else
    {
        if(comp == "paper") return 1;
        else if(comp == "scissors") return 0;
        else return -1;
    }
}
function playRound()
{
    let outcome =selectWinner(getPlayerChoice(), getComputerChoice());
    if(outcome == 1)
    {
        playerScore++;
    }
    else if(outcome == -1)
    {
        computerScore++;
    }
}
function playGame(){
    for( i = 0; i < 5; i++)
    {
        playRound();
    }
    console.log("Player score: " + playerScore );
    console.log("Computer score: " + computerScore);
    if(playerScore > computerScore)
    {
        console.log("Player Won!!");
    }
    else if(playerScore<computerScore)
    {
        console.log("Computer Won!!");
    }
    else
    {
        console.log("Game is a draw");
    }
}