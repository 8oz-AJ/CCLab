let mySound;
let x = 25
let speedX = 10;
function preload() {
  mySound = loadSound("assets/Fahh Sound Effect.mp3");
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("p5-canvas-container");
  mySound.play();
}

function draw() {
  background(220);
  fill(0);
  circle(x, height / 2, 50);
  x = x + speedX;
  if (x > width - 25 || x < 25) {
    speedX = -speedX
    mySound.play();
  }
}
