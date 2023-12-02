// Canvas properties
let canvasHeight = 512;
let canvasWidth = 320;
let ctx;

// Doodle properties
let doodleWidth = 50;
let doodleHeight = 50;
let doodleX = canvasWidth / 2 - doodleWidth / 2;
let doodleY = canvasHeight * 7 / 8 - doodleHeight;

// Doodle object
let doodle = {
    x: doodleX,
    y: doodleY,
    img: null,
    width: doodleWidth,
    height: doodleHeight
};

window.onload = function () {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw a green rectangle
    ctx.fillStyle = "green";
    ctx.fillRect(doodle.x, doodle.y, doodle.width, doodle.height);

    // Load image
    let doodleRightImg = new Image();
    doodleRightImg.src = "../src/image/doodlestein-right@2x.png";

    // Wait for the image to load
        doodleRightImg.onload = function () {
        doodle.img = doodleRightImg;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the image
        ctx.drawImage(doodle.img, doodle.x, doodle.y, doodle.width, doodle.height);
    };
};





