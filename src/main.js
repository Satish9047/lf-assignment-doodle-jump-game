// Creating the canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 320;
canvas.height = 512;

// Defining constants
const gravity = 0.4;

//defining the platform
const platformArray = [];
let platformHeight = 18;
let platformWidth = 60;
let platformImg;
platformImg = new Image();
platformImg.src = "./image/doodle-char-1-L-x1.png";


// Creating the background image
const backgroundImage = new Image();
backgroundImage.src = '../src/image/bck.png';

backgroundImage.onload = function () {
  animate();
};

// Creating the Player class
class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 50;
  }

  draw() {
    ctx.fillStyle = "red"; // Set the fill style
    ctx.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Check if the player has reached the left or right boundary
    if (this.position.x < 0) {
        this.position.x = canvas.width; // Move to the right side
      } else if (this.position.x > canvas.width) {
        this.position.x = 0; // Move to the left side
      }


    //check if the player reach at the bottom of the canvas
    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

const player = new Player({
  x: 200,
  y: 200,
});

// Key object to track key events
const key = {
  d: { pressed: false },
  a: { pressed: false },
};

// Animation function
function animate() {
  window.requestAnimationFrame(animate);

  // Draw the background image only once
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Update and draw other elements
  player.update();
  player.velocity.x = 0;

  if (key.d.pressed) {
    player.velocity.x = 5;
  } else if (key.a.pressed) {
    player.velocity.x = -5;
  }
}

// Event listeners for keydown and keyup
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      key.d.pressed = true;
      break;
    case "a":
      key.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -12;
      break;
    default:
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      key.d.pressed = false;
      break;
    case "a":
      key.a.pressed = false;
      break;
    default:
      break;
  }
});
