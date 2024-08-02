let boxes = document.getElementsByClassName("box");
let resetGame = document.getElementById("reset");
let gameWinContainer = document.querySelector(".gamewin");
let resultContainer = document.getElementById("winnerBox");
let guide = document.getElementById("guide");
let gameWin = new Audio("Media/gamewin.wav");
let turnMusic = new Audio("Media/ting.mp3");
let gameStart = new Audio("Media/gamestart.wav"); 
let bgMusic = new Audio("Media/music.mp3");
let gameTie = new Audio("Media/gameover.wav");
let musicIcon = document.getElementById('music');
let music = 1;
let turnFirst = true;
let filledBoxes = 0;

let winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

resetGame.style.visibility = "hidden";
gameWinContainer.style.display = "none";

musicIcon.addEventListener("click", ()=>{
    musicIcon.classList.toggle("ri-volume-up-line");
    if(music == 1){
        bgMusic.play();
        music = 2;
    } else if(music == 2){
        bgMusic.pause();
        music = 1;
    }
})

for(let box of boxes){
    box.addEventListener("click",()=>{
        turnMusic.play();
        filledBoxes++;
        if(turnFirst){
            box.innerText = 'X';
            guide.innerText = "Its O turn";
            turnFirst = false;
        } else{
            box.innerText = 'O';
            box.style.color = "purple";
            guide.innerText = "Its X turn";
            turnFirst = true;
        }
        box.disabled = true;
        matchWin();
        matchTie();
    });
};

function matchWin(){
    for(let pat of winPatterns){
        let valueOne = boxes[pat[0]].innerText;
        let valueTwo = boxes[pat[1]].innerText;
        let valueThree = boxes[pat[2]].innerText;
        if(valueOne != "" && valueTwo != "" && valueThree != ""){
            if(valueOne == valueTwo && valueTwo == valueThree){
                boxes[pat[0]].style.color = "green";
                boxes[pat[1]].style.color = "green";
                boxes[pat[2]].style.color = "green";
                resultContainer.innerText = `Winner is ${valueOne}`;
                guide.innerText = "Its X turn";
                gameWin.play();
                gameEnd();
            }
        }
    }
}

function matchTie (){
    if(filledBoxes == 9){
        gameEnd();
        resultContainer.innerText = `It's a tie`;
        gameTie.play();
    }
}

function gameEnd(){
    for(let box of boxes){
        resetGame.style.visibility = "visible";
        box.disabled = true;
        gameWinContainer.style.display = "flex";
    }
}

resetGame.onclick = ()=>{
    for(let box of boxes){
        box.innerText = '';
        box.disabled = false;
        resetGame.style.visibility = "hidden";
        box.style.color = "black";
        resultContainer.innerText = "";
        turnFirst = true;
        gameWinContainer.style.display = "none";
        gameStart.play();
    }
}