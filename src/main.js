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


//Defining velocity and gravity
let velocityX = 0;
let velocityY = 0;
let initialVelocityY = -8;
let gravity =0.3;

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
let platformWidth = 50;
let platformHeight = 18;
let platformImg;


window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw a green rectangle
    // ctx.fillStyle = "green";
    // ctx.fillRect(doodle.x, doodle.y, doodle.width, doodle.height);

    // Load image
    let doodleRightImg = new Image();
    doodleRightImg.src = "../src/image/doodlestein-right@2x.png";
    doodle.img = doodleRightImg;
    doodleRightImg.onload = function(){
        ctx.drawImage(doodle.img, doodle.x, doodle.y, doodle.width, doodle.height);
    }
    let doodleLeftImg = new Image();
    doodleLeftImg.src = "../src/image/doodlestein-left@2x.png";
    
    platformImg = new Image();
    platformImg.src = "../src/image/platform.png";

   
    

    // Wait for the image to load
    // doodleRightImg.onload = function () {
    //     // // Clear the canvas
    //     // ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     // Draw the image
    //     ctx.drawImage(doodle.img, doodle.x, doodle.y, doodle.width, doodle.height);
    // };

    // doodleLeftImg = new Image();
    // doodleLeftImg.src = "./doodler-left.png";
    // doodle.img = doodleLeftImg;

    velocityY = initialVelocityY;
    placePlatform();
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDoodle);

};

function update(){
    //animating the doodle
    requestAnimationFrame(update)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
     
    //draw platform
    for (let i = 0; i < platformArray.length; i++){
        let platform = platformArray[i];
        if(detectCollision(doodle, platform)){
            velocityY = initialVelocityY; //jump
        }
        ctx.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height)
    }

    //teleport to opposite side ot wall
    if(doodle.x > canvasWidth){
        doodle.x = 0;

    }
    else if(doodle.x + doodle.width <0){
        doodle.x = canvasWidth;
    }


    velocityY += gravity;
    doodle.y += velocityY;
    doodle.x += velocityX;
    ctx.drawImage(doodle.img, doodle.x, doodle.y, doodle.width, doodle.height);
}


//adding the platform
function placePlatform(){
    platformArray =[];

    let platform = {
       x: canvasWidth/2,
       y: canvasHeight - 50,
        width: platformWidth,
        height: platformHeight,
        img: platformImg,
    }

    platformArray.push(platform);
}


// movement funcationality
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

//collision detection function
function detectCollision(a,b){
    return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
}




