/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new YourNameDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class YourNameDancer {
  constructor(x, y) {
    this.size = 25;
    this.x = x
    this.y = y
    this.t = random(TWO_PI);
    this.legLength = 16;
    this.legSwingAmp = PI / 10;
    this.bodyColor = color(30, 80, 40);
  }

  update() {
    super.update();
    this.t += 0.05;

    // Rhythmic movement using sin() and cos()
    this.y += sin(this.t * 2) * 0.6;   // vertical bob
    this.x += cos(this.t * 0.8) * 0.3; // subtle horizontal sway
  }

  display() {
    push();
    translate(this.x, this.y);

    // rhythmic bobbing
    let bob = sin(this.t * 2) * 4;
    translate(0, bob);

    // body
    noStroke();
    fill(this.bodyColor);
    ellipse(0, 0, this.size, this.size * 0.8);

    // head
    fill(20);
    ellipse(-this.size * 0.45, 0, this.size * 0.45, this.size * 0.45);

    // eyes (rhythmic glow)
    let glow = map(sin(this.t * 3), -1, 1, 100, 255);
    fill(glow, 0, 0);
    ellipse(-this.size * 0.6, -4, 3, 3);
    ellipse(-this.size * 0.6, 4, 3, 3);

    // legs
    stroke(25);
    strokeWeight(2);
    for (let i = 0; i < 8; i++) {
      let side = i < 4 ? -1 : 1;
      let idx = i % 4;
      let baseAngle = map(idx, 0, 3, -PI / 3, PI / 3);
      let swing = sin(this.t * 2 + idx) * this.legSwingAmp;
      let legAngle = baseAngle * side + swing * side;

      // joint points
      let x1 = cos(legAngle) * this.size * 0.4;
      let y1 = sin(legAngle) * this.size * 0.4;
      let x2 = x1 + cos(legAngle) * this.legLength * side;
      let y2 = y1 + sin(legAngle) * this.legLength;

      line(0, 0, x1, y1);
      line(x1, y1, x2, y2);
    }

    pop();
  }
}




/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/