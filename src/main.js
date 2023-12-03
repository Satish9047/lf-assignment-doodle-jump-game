// Canvas properties
let ctx;
let canvas;
let canvasHeight = 512;
let canvasWidth = 320;

// Doodle properties
let doodleWidth = 50;
let doodleHeight = 50;
let doodleX = canvasWidth / 2 - doodleWidth / 2;
let doodleY = canvasHeight * 7 / 8 - doodleHeight;

// Defining velocity and gravity
let velocityX = 0;
let velocityY = 0;
let initialVelocityY = -6;
let gravity = 0.3;

// Doodle object
let doodle = {
    x: doodleX,
    y: doodleY,
    img: null,
    width: doodleWidth,
    height: doodleHeight
};
let doodleRightImg;
let doodleLeftImg;

// Platform
let platformArray = [];
let platformWidth = 50;
let platformHeight = 18;
let platformImg;

// Score
let score = 0;
let maxScore = 0;

// Game over check
let gameOver = false;

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Load image
    doodleRightImg = new Image();
    doodleRightImg.src = "../src/image/doodlestein-right@2x.png";
    doodle.img = doodleRightImg;
    doodleRightImg.onload = function () {
        ctx.drawImage(doodle.img, doodle.x, doodle.y, doodle.width, doodle.height);
    };

    doodleLeftImg = new Image();
    doodleLeftImg.src = "../src/image/doodlestein-left@2x.png";

    platformImg = new Image();
    platformImg.src = "../src/image/platform.png";

    velocityY = initialVelocityY;
    placePlatform();
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDoodle);
};

function update() {
    // Animating the doodle
    requestAnimationFrame(update);

    if (gameOver) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Teleport to the opposite side of the wall
    if (doodle.x > canvasWidth) {
        doodle.x = 0;
    } else if (doodle.x + doodle.width < 0) {
        doodle.x = canvasWidth;
    }

    // Draw platforms
    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        if (velocityY < 0 && doodle.y < canvasHeight * 3 / 4) {
            platform.y -= initialVelocityY; // Slide platform downward
        }
        if (detectCollision(doodle, platform) && velocityY >= 0) {
            velocityY = initialVelocityY; // Jump
        }
        ctx.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    }

    // Create new platforms
    while (platformArray.length > 0 && platformArray[0].y >= canvas.height) {
        platformArray.shift(); // Delete platforms that reach the bottom of the screen
        newPlatform(); // Add new platforms on top
    }

    // Update score
    updateScore();
    ctx.fillStyle = "black";
    ctx.font = "16px sans-serif";
    ctx.fillText(score, 10, 20);

    // Update the position of doodle and velocity
    velocityY += gravity;
    doodle.y += velocityY;
    doodle.x += velocityX;
    ctx.drawImage(doodle.img, doodle.x, doodle.y, doodle.width, doodle.height);

    // Check if doodle is out of the screen
    if (doodle.y > canvas.height) {
        gameOver = true;
    }

    // Display game over message
    if (gameOver) {
        ctx.fillText("Game Over", canvasWidth / 3, canvasHeight * 6.6/ 8);
        ctx.fillText(`Your Score is ${score}`, canvasWidth / 3, canvasHeight * 6.8 / 8);
        ctx.fillText("Press 'Space' to Restart", canvasWidth / 3, canvasHeight * 7 / 8);
    }
}

// Add the initial platform (static platform)
function placePlatform() {
    platformArray = [];

    let platform = {
        x: canvasWidth / 2,
        y: canvasHeight - 50,
        width: platformWidth,
        height: platformHeight,
        img: platformImg,
    };
    platformArray.push(platform);

    // For randomly generating platforms
    for (let i = 0; i < 6; i++) {
        let randomX = Math.floor(Math.random() * canvasWidth * 3 / 4);
        let platform = {
            x: randomX,
            y: canvasHeight - 75 * i - 150,
            width: platformWidth,
            height: platformHeight,
            img: platformImg,
        };
        platformArray.push(platform);
    }
}

// Movement functionality
function moveDoodle(e) {
    console.log(e.code);
    if (e.code == "ArrowRight" || e.code == "KeyD") {
        velocityX = 4;
        doodle.img = doodleRightImg;
    } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
        velocityX = -4;
        doodle.img = doodleLeftImg;
    } else if (e.code == "Space" && gameOver) {
        // Reset
        doodle = {
            x: doodleX,
            y: doodleY,
            img: doodleRightImg,
            width: doodleWidth,
            height: doodleHeight
        };
        velocityX = 0;
        velocityY = initialVelocityY;
        maxScore = 0;
        gameOver = false;
        placePlatform();
    }
}

// Collision detection function
function detectCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// For randomly generating platforms while scrolling upward
function newPlatform() {
    let randomX = Math.floor(Math.random() * canvasWidth * 3 / 4);
    let platform = {
        x: randomX,
        y: -platformHeight,
        width: platformWidth,
        height: platformHeight,
        img: platformImg,
    };
    platformArray.push(platform);
}

// Updating score when the doodle reaches new heights
function updateScore() {
    let points = Math.floor(2 * Math.random());

    if (velocityY < 0) {
        maxScore += points;
        if (score < maxScore) {
            score = maxScore;
        }
    } else if (velocityY >= 0) {
        maxScore -= points;
    }
}
