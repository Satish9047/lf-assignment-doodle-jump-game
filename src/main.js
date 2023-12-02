//creatig the canvas into variable
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); //for 2d animation development
// console.log(ctx);


//defining the canvas width and height
canvas.width = 600;
canvas.height = 600;



let y = 200
//creating the animation function 
function animate(){
    window.requestAnimationFrame(animate);
    // console.log("animate")

    //this line and the next line will overwrite the rectangle with white color
    ctx.fillStyle = "white";       
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //this will create the drop down animation
    ctx.fillStyle = "red"; 
    ctx.fillRect(200, y, 50, 50);
    y++
}
animate();