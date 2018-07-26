/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/
var canv = document.getElementById("snake");
var ctx = canv.getContext("2d");



//sounds
const left = new Audio(),
    up = new Audio(),
    down = new Audio(),
    right = new Audio(),
    dead = new Audio(),
    eat = new Audio();

left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3"

//create a unit
const box = 32;

//load resource
const grnd = new Image();
grnd.src = "img/ground.png";

const foodItem = new Image();
foodItem.src = "img/food.png";

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

//create the food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

//score 
let score = 0;

//controls
let directionpast;
document.addEventListener("keydown", (e) => {
    if (e.keyCode == '38' && directionpast != "down") {
        directionpast = "up";
        up.play();
    } else if (e.keyCode == '40' && directionpast != "up") {
        directionpast = "down";
        down.play();
    } else if (e.keyCode == '37' && directionpast != "right") {
        directionpast = "left"
        left.play();
    } else if (e.keyCode == '39' && directionpast != "left") {
        directionpast = "right"
        right.play();
    }
});


function collision(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            return true;
        }
    }
    return false;
}


//main fn
function draw() {

    //bg draw
    ctx.drawImage(grnd, 0, 0);

    //snake draw
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "white" : "green";
        ctx.fillRect(snake[i]["x"], snake[i]["y"], box, box);
        ctx.strokeStyle = "blue";
        ctx.strokeRect(snake[i]["x"], snake[i]["y"], box, box);

    }

    //draw food item
    ctx.drawImage(foodItem, food.x, food.y);

    //score update
    ctx.fillStyle = "white";
    ctx.font = '45px changa one';
    ctx.fillText(score, 2 * box, 1.6 * box);



    //new head for process of case check/grow snake
    let snakeX = snake[0]["x"];
    let snakeY = snake[0]["y"];


    //eat and grow case
    if (snakeX == food.x && snakeY == food.y) {
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        score++;
    } else {
        // old head remove
        snake.pop();

    }





    //move direction check
    if (directionpast == "left") snakeX -= box;
    if (directionpast == "right") snakeX += box;
    if (directionpast == "up") snakeY -= box;
    if (directionpast == "down") snakeY += box;


    //new head
    let newhead = {
        x: snakeX,
        y: snakeY
    };


    //hit wall and close game
    if ((snakeX < box || snakeX > 17 * box) || (snakeY < 3 * box || snakeY > 17 * box) || collision(newhead, snake)) {
        dead.play();

        clearInterval(game);
    }

    //move head
    snake.unshift(newhead);


}





let game = setInterval(draw, 100);