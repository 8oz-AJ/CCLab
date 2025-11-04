let cloudInstance;
let clouds = []

function setup() {
  let canvas = createCanvas(800, 500);
  for (let i = 0; i < 20; i++) {
    clouds[i] = new Cloud(random(width), random(height), random(50, 200))
  }
  canvas.parent("p5-canvas-container");
  console.log(clouds)
}

function draw() {
  background(150, 125, 255);
  //cloudInstance.display();
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].move()
    clouds[i].display()
  }
}

class Cloud {
  constructor(cloudX, cloudY, cloudS) {
    this.x = cloudX
    this.y = cloudY
    this.s = cloudS
  }
  move() {
    this.x += random(-5, 5)
    this.y += random(-5, 5)
  }
  display() {
    push()
    translate(this.x, this.y)
    rotate(frameCount * 0.1)
    noStroke()
    fill(200, 220, 150)
    circle(0, 0, this.s)

    for (let a = 0; a < 2 * PI; a += PI / 4) {
      push();
      rotate(a);
      circle(this.s * 0.4, this.s * 0.1, this.s * 0.5);
      pop();
    }

    // blushes
    noStroke()
    fill(255, 10, 255, 100)
    ellipse(0 - this.s / 4, 0 + this.s / 20, this.s / 8, this.s / 10)
    ellipse(0 + this.s / 4, 0 + this.s / 20, this.s / 8, this.s / 10)

    // eyes
    noStroke();
    fill(0);
    circle(0 - this.s / 5, 0, this.s / 10);
    circle(0 + this.s / 5, 0, this.s / 10);

    stroke(0)
    noFill()
    strokeWeight(this.s / 20)
    arc(0, 0 + this.s / 10, this.s / 5, this.s / 10, 0, PI)
    pop()
  }
}