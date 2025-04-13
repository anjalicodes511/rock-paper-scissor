const score =JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
};

updateScore();        
/*
if(!score){
    score = {
        wins:0,
        losses:0;
        ties:0
    };
}
!score = 0
*/


//This is a string(due to JSON>stringify) which needs to be converted into object

//localStorage is used so the values are stored locally and the game is continued even after refreshing the page

let isAutoPlaying = false;
let intervalId;

function autoPlay(){

    if(!isAutoPlaying){
        intervalId = setInterval(() => {    //setInterval() returns an Id through which we can stop the auto Play
            const playerMove = pickComputerMove();
            playGame(playerMove);
        },2000);

        isAutoPlaying = true;
    }
    else{
        clearInterval(intervalId); //To stop auto play
        isAutoPlaying = false;
    }
    
}

document.body.addEventListener('keydown',(event) => {
    if(event.key==='r'){
        playGame('Rock');
    }
    else if(event.key==='p'){
        playGame('Paper');
    }
    else if(event.key==='s'){
        playGame('Scissor');
    }
})

function playGame(playerMove){
    const computerMove = pickComputerMove(); //Function calling

    let result = '';
    if(playerMove==='Scissor'){
        
        if(computerMove==='Rock'){
            result = 'You Lose.';
        }
        else if(computerMove==='Paper'){
            result = 'You Win.'
        }
        else if(computerMove==='Scissor'){
            result = 'Tie.'
        }
    }

    else if(playerMove==='Paper'){
        if(computerMove==='Rock'){
            result = 'You Win.';
        }
        else if(computerMove==='Paper'){
            result = 'Tie.'
        }
        else if(computerMove==='Scissor'){
            result = 'You Lose.'
        }
    }
    
    else if(playerMove==='Rock'){
        if(computerMove==='Rock'){
            result = 'Tie.';
        }
        else if(computerMove==='Paper'){
            result = 'You Lose.'
        }
        else if(computerMove==='Scissor'){
            result = 'You Win.'
        }
    } 
    
    if(result==='You Win.'){
        score.wins+=1;
    }
    else if(result==='You Lose.'){
        score.losses+=1;
    }
    else if(result==='Tie.'){
        score.ties+=1;
    }
    
    localStorage.setItem('score',JSON.stringify(score));//localStorage only supports strings

    updateScore();

    document.querySelector('.js-result').innerHTML = `${result}`;

    document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;

}


function updateScore(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


function pickComputerMove(){
    const randNum = Math.random();

    let computerMove = '';

    if(randNum >=0 && randNum<1/3){
        computerMove = 'Rock';
    }
    else if(randNum>=1/3 && randNum<2/3){
        computerMove = 'Paper';
    }
    else{
        computerMove = 'Scissor';
    } 
    
    return computerMove;

}