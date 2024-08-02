let boxes = Array.from(document.querySelectorAll(".circle"));
let player = document.getElementById("player");
let playerValue = parseInt(player.innerText);
let computer = document.getElementById("comp");
let computerValue = parseInt(computer.innerText);
let lastButton = document.getElementById("lastButton");
let comp = null;
let userChoice = null;

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        comp = compChoiceFunc();
        let id = box.id;
        if(id == "circleOne"){
            userChoice = "rock";
        } else if(id == "circleTwo"){
            userChoice = "paper";
        } else if(id == "circleThree"){
            userChoice = "scissor";
        }
        if(comp == userChoice){
            lastButton.innerText = "It was Draw.";
            lastButton.style.backgroundColor = 'rgb(43, 43, 97)';
        } else if(comp == "rock"){
            if(userChoice == "paper"){
                lastButton.innerText = "You won! because paper covers rock";
                playerValue++;
                player.innerText = playerValue;
                lastButton.style.backgroundColor = 'green';
            } else if(userChoice == "scissor"){
                lastButton.innerText = "You Lost! because rock break scissor";
                computerValue++;
                computer.innerText = computerValue;
                lastButton.style.backgroundColor = 'red';
            }
        } else if(comp == "paper"){
            if(userChoice == "rock"){
                lastButton.innerText = "You Lost! because paper covers rock";
                computerValue++;
                computer.innerText = computerValue;
                lastButton.style.backgroundColor = 'red';
            } else if(userChoice == "scissor"){
                lastButton.innerText = "You won! because scissor cuts paper";
                playerValue++;
                player.innerText = playerValue;
                lastButton.style.backgroundColor = 'green';
            }
        } else if (comp == "scissor"){
            if(userChoice == "rock"){
                lastButton.innerText = "You won! because rock breaks scissor";
                playerValue++;
                player.innerText = playerValue;
                lastButton.style.backgroundColor = 'green';
            } else if (userChoice == "paper"){
                lastButton.innerText = "You Lost! because scissor cuts paper";
                computerValue++;
                computer.innerText = computerValue;
                lastButton.style.backgroundColor = 'red';
            }
        }
    })
})

function compChoiceFunc(){
    let choices = ["rock", "paper", "scissor"];
    let randNo = Math.floor(Math.random() * 3);
    return choices[randNo];
}