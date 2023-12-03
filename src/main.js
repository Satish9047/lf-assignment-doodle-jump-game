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
let initialVelocityY = -6;
let gravity =0.3;

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

//platform 
let platformArray = [];
let platformWidth = 50;
let platformHeight = 18;
let platformImg;

//countScore
let score = 0;
let maxScore = 0;

//game over check
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
    doodleRightImg.onload = function(){
        ctx.drawImage(doodle.img, doodle.x, doodle.y, doodle.width, doodle.height);
    }

    doodleLeftImg = new Image();
    doodleLeftImg.src = "../src/image/doodlestein-left@2x.png";
    
    platformImg = new Image();
    platformImg.src = "../src/image/platform.png";


    velocityY = initialVelocityY;
    placePlatform();
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDoodle);
};

function update(){
    //animating the doodle
    requestAnimationFrame(update);

    if(gameOver){
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
     


    //teleport to opposite side ot wall
    if(doodle.x > canvasWidth){
        doodle.x = 0;

    }
    else if(doodle.x + doodle.width <0){
        doodle.x = canvasWidth;
    }

    //draw platform
    for (let i = 0; i < platformArray.length; i++){
        let platform = platformArray[i];
        if(velocityY <0 &&doodle.y < canvasHeight*3/4){
            platform.y -= initialVelocityY; //slide platform down ward
        }
        if(detectCollision(doodle, platform)&&velocityY>=0){
            velocityY = initialVelocityY; //jump
        }
        ctx.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height)
    }

    //create new platform
     while(platformArray.length > 0 && platformArray[0].y >= canvas.height){
        platformArray.shift(); //deleteing the platform that goes bottom of the screen
        newPlatform(); // add new platform on top
    }

    //update score
    updateScore();
    ctx.fillStyle = "black";
    ctx.font = "16px san-sarif";
    ctx.fillText(score, 10, 20);

    

    

    //updating the position of doodle and velocity
    
    velocityY += gravity;
    doodle.y += velocityY;
    doodle.x += velocityX;
    ctx.drawImage(doodle.img, doodle.x, doodle.y, doodle.width, doodle.height);

    if(doodle.y > canvas.height){
        gameOver=true;
    }

    if(gameOver){
        ctx.fillText("Game Over", canvasWidth/7, canvasHeight*5/8);
        ctx.fillText(`Your Score is ${score}`, canvasWidth/7, canvasHeight*6/8);
        ctx.fillText("Press 'Space' to Restart", canvasWidth/7, canvasHeight*7/8)
    } 

}


//adding the initial platform (static platcform)
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
 

//for randomly generatingt the platforms
    for(let i= 0; i<6; i++){
        let randomX = Math.floor(Math.random() * canvasWidth*3/4); //(0-1)*canvasWidth
    
        let platform = {
            x: randomX,
            y: canvasHeight - 75*i - 150,
             width: platformWidth,
             height: platformHeight,
             img: platformImg,
         }
     
         platformArray.push(platform);
    }
}


// movement funcationality
function moveDoodle(e){
    console.log(e.code);
    if(e.code == "ArrowRight" || e.code == "keyD"){
        velocityX = 4;
        doodle.img = doodleRightImg;
    }
    else if(e.code == "ArrowLeft" || e.code == "keyA"){
        velocityX =  -4;
        doodle.img = doodleLeftImg;
    }else if(e.code == "Space" && gameOver){
        // reset
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
        gameOver=false;
        placePlatform();
    }
}

//collision detection function
function detectCollision(a,b){
    return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
}

//for randomly generating the platform while scrolling upward
function newPlatform(){
    let randomX = Math.floor(Math.random() * canvasWidth*3/4); //(0-1)*canvasWidth
    
        let platform = {
            x: randomX,
            y: -platformHeight,
             width: platformWidth,
             height: platformHeight,
             img: platformImg,
         }
     
         platformArray.push(platform);
}


//updating scrore when the doodle reach new height
function updateScore(){
    let points = Math.floor(2*Math.random());
    
    if (velocityY < 0){
        maxScore += points;
        if(score < maxScore){
            score = maxScore;
        }
    } else if(velocityY >= 0){
        maxScore -= points;
    }
    
}


