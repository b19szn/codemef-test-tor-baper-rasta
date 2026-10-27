const rickshaw = document.getElementById("rickshaw");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

let score = 0;
let isGameOver = false;

startBtn.addEventListener("click", startGame);

function startGame() {
    score = 0;
    isGameOver = false;
    scoreDisplay.innerHTML = "Score: 0";
    obstacle.style.top = "-60px";
    moveObstacle();
}

function moveObstacle() {
    if (isGameOver) return;
    let obstaclePosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"));
    if (obstaclePosition >= 500) {
        obstaclePosition = -60;
        score++;
        scoreDisplay.innerHTML = "Score: " + score;
        obstacle.style.left = Math.random() * 240 + 'px'; // Random horizontal position
    }
    obstacle.style.top = (obstaclePosition + 5) + 'px';
    if (obstaclePosition > 440 && checkCollision()) {
        endGame();
    }
    requestAnimationFrame(moveObstacle);
}

function checkCollision() {
    const rickshawRect = rickshaw.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    return !(
        rickshawRect.top > obstacleRect.bottom ||
        rickshawRect.bottom < obstacleRect.top ||
        rickshawRect.left > obstacleRect.right ||
        rickshawRect.right < obstacleRect.left
    );
}

function endGame() {
    isGameOver = true;
    alert("Game Over! Your score is: " + score);
}