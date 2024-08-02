const board = document.querySelector(".board");
const instructionPara = document.querySelector(".instruction-para");
const coverImage = document.querySelector(".cover");
const score = document.querySelector(".score");
const highScoreText = document.querySelector(".high-score");

const gridSize = 20;
let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction = "up";
let gameInterval;
let highScore = 0;
let gameSpeedDelay = 300;
let gameStarted = false;

function draw(){
    board.innerHTML = "";
    drawSnake();
    drawFood();
    updateScore();
}

function drawSnake(){
    snake.forEach(segment => {
        const snakeElement = createGameElement("div", "snake")
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    })
}

function createGameElement(tag, className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function drawFood(){
    if(gameStarted) {
        const foodElement = createGameElement("div", "food");
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

function generateFood(){
    const x = Math.floor((Math.random() * gridSize) + 1)
    const y = Math.floor((Math.random() * gridSize) + 1)
    return {x, y};
}

function moveSnake(){
    const head = {...snake[0]};
    switch (direction) {
        case "up":
            head.y--;
            break;

        case "down":
            head.y++;
            break;

        case "left":
            head.x--;
            break;

        case "right":
            head.x++;
            break;
    }

    snake.unshift(head);

    if(head.x === food.x && head.y === food.y){
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval);
        gameInterval = setInterval(()=>{
            moveSnake();
            checkCollision();
            draw();
        }, gameSpeedDelay); 
    } else {
        snake.pop();
    }
}

function startGame(){
    gameStarted = true;
    instructionPara.style.display = "none";
    coverImage.style.display = "none";
    gameInterval = setInterval(()=>{
        moveSnake();
        checkCollision();
        draw();
    }, gameSpeedDelay)
}

function handleKeyPress (event){
    if(
    (!gameStarted && event.code === "Space") || 
    (!gameStarted && event.key === " ") ) {
        startGame();
    } else {
        switch(event.key){
            case "ArrowUp":
                direction = "up";
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    }
}

document.addEventListener("keydown", handleKeyPress);

function increaseSpeed() {
    if (gameSpeedDelay > 250) {
        gameSpeedDelay -= 5;
    } else if (gameSpeedDelay > 200) {
        gameSpeedDelay -= 3;
    } else if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 2;
    } else if (gameSpeedDelay > 125) {
        gameSpeedDelay -= 1;
    }
}

function checkCollision () {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize){
        resetGame();
    }

    for(let i = 1; i < snake.length; i++){
        if (head.x === snake[i].x && head.y === snake[i].y){
            resetGame();
        }
    }
}

function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{x: 10, y: 10}];
    food = generateFood();
    direction = "right";
    gameSpeedDelay = 300;
    updateScore();
}

function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");
}

function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionPara.style.display = "block";
    coverImage.style.display = "block";
}

function updateHighScore(){
    const currentScore = snake.length - 1;
    if (currentScore > highScore){
        highScore = currentScore;
        highScoreText.innerText = highScore.toString().padStart(3, "0");
    }
    highScoreText.style.display = "block";
}