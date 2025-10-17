let target = null;
let physarum = {x: 200, y: 200};

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  strokeWeight(3);
}

function draw() {
  background(30);
  
  // Draw lightning if target exists
  if (target) {
    stroke(200, 200, 255);
    lightningStrike(target.x, target.y);
    
    // Move physarum toward target
    stroke(100, 255, 150);
    physarum.x += (target.x - physarum.x) * 0.05 + random(-5, 5);
    physarum.y += (target.y - physarum.y) * 0.05 + random(-5, 5);
    point(physarum.x, physarum.y);
  }
}

function mousePressed() {
  target = {x: mouseX, y: mouseY};
}

function lightningStrike(x, y) {
  let x1 = random(width);
  let y1 = 0;
  while (y1 < y) {
    let x2 = x1 + random(-20, 20);
    let y2 = y1 + random(10, 30);
    line(x1, y1, x2, y2);
    x1 = x2; 
    y1 = y2;
  }
}
