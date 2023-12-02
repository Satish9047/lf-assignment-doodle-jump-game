// Canvas properties
let canvasHeight = 512;
let canvasWidth = 320;
let ctx;

// Doodle properties
let doodleWidth = 50;
let doodleHeight = 50;
let doodleX = canvasWidth / 2 - doodleWidth / 2;
let doodleY = canvasHeight * 7 / 8 - doodleHeight;

let velocityX = 0;

// Doodle object
let doodle = {
    x: doodleX,
    y: doodleY,
    img: null,
    width: doodleWidth,
    height: doodleHeight
};

//platform 
let platformArray = [];
let platformWidth = 60;
let platformHeight = 18;
let platformImg;


window.onload = function () {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw a green rectangle
    // ctx.fillStyle = "green";
    // ctx.fillRect(doodle.x, doodle.y, doodle.width, doodle.height);

    // Load image
    let doodleRightImg = new Image();
    doodleRightImg.src = "../src/image/doodlestein-right@2x.png";

    let doodleLeftImg = new Image();
    doodleRightImg.src = "../src/image/doodlestein-left@2x.png";

    platformImg = new Image();
    platformImg.src = "../src/image/platform.png";

    // Wait for the image to load
        doodleRightImg.onload = function () {
        doodle.img = doodleRightImg;
        

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the image
        ctx.drawImage(doodle.img, doodle.x, doodle.y, doodle.width, doodle.height);
    };

    placePlatforms();
    requestAnimationFrame(update)
    document.addEventListener("keydown", moveDoodle);

};

function update(){
    //animating the doodle
    requestAnimationFrame(update)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
     
    //teleport to opposite side ot wall
    if(doodle.x > canvasWidth){
        doodle.x = 0;

    }
    else if(doodle.x + doodle.width <0){
        doodle.x = canvasWidth;
    }
    doodle.x += velocityX;
    ctx.drawImage(doodle.img, doodle.x, doodle.y, doodle.width, doodle.height);
}

function moveDoodle(e){
    if(e.code == "ArrowRight" || e.code == "keyD"){
        velocityX = 4;
        doodle.img = doodleRightImg;
    }
    else if(e.code == "ArrowLeft" || e.code == "keyA"){
        velocityX =  -4;
        doodle.img = doodleLeftImg;
    }
}

function placePlatform(){
    platformArray =[];

    let platform = {
       x: canvasWidth/2,
       y: canvasHeight -50,
        width: platformWidth,
        height: platformHeight,
        img: platformImg,
    }

    platformArray.push(platform);
}





