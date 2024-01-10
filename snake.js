const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const groundImg = new Image();
groundImg.src = "./ground.png";

const foodImg = new Image();
foodImg.src = "./food.png";

let box = 32;
let score = 0;

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

const lev = 100;
if (score >= 3) {
  lev = 50;
  game = setInterval(drawImage, lev);
}

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
  if (event.keyCode === 37 && dir !== "right") {
    dir = "left";
  } else if (event.keyCode === 38 && dir !== "down") {
    dir = "up";
  } else if (event.keyCode === 39 && dir !== "left") {
    dir = "right";
  } else if (event.keyCode === 40 && dir !== "up") {
    dir = "down";
  }
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      clearInterval(game);
    }
  }
}

function drawImage() {
  ctx.drawImage(groundImg, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.fillStyle = "white";
  ctx.font = "50px  Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === food.x && snakeY === food.y) {
    snake.push({
      x: food.x,
      y: food.y,
    });
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  }
  snake.pop();

  if (
    snakeX < 0 ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box
  ) {
    clearInterval(game);
  }

  if (dir === "left") {
    snakeX -= box;
  }
  if (dir === "right") {
    snakeX += box;
  }
  if (dir === "up") {
    snakeY -= box;
  }
  if (dir === "down") {
    snakeY += box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

let game = setInterval(drawImage, lev);
