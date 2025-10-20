let target = null;
let physarums = [];
let clouds = [];
let buildings = [];
let moon = {};
let raindrops = [];
let flash = 0;
let nextLightning = 0;
let lightningX, lightningY;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  strokeWeight(3);

  physarums.push({ x: 200, y: 200 });

  // clouds
  for (let i = 0; i < 6; i++) {
    clouds.push({
      x: random(width),
      y: random(50, 150),
      size: random(120, 250),
      speed: random(0.3, 0.7),
      opacity: random(120, 200)
    });
  }

  // buildings
  let buildingWidth = 60;
  for (let x = 0; x < width; x += buildingWidth) {
    let b = { x, h: random(150, 300), windows: [] };
    for (let y = height - 250; y < height; y += 30) {
      if (random() < 0.3) b.windows.push({ x: x + 20, y });
    }
    buildings.push(b);
  }

  // moon
  moon = {
    x: random(100, width - 200),
    y: random(60, 150),
    size: 90,
    glow: 80,
    speed: 0.1
  };

  // rain
  for (let i = 0; i < 250; i++) {
    raindrops.push({
      x: random(width),
      y: random(-500, height),
      len: random(10, 20),
      speed: random(4, 8)
    });
  }

  // randomize first lightning
  nextLightning = millis() + random(2000, 6000);
}

function draw() {
  background(20 + flash, 25 + flash, 35 + flash);

  drawMoonBehindClouds();
  drawBuildings();
  drawRain();

  // fade flash
  if (flash > 0) flash -= 5;

  // Random lightning trigger
  if (millis() > nextLightning) {
    lightningX = random(width);
    lightningY = random(200, 400);
    flash = 255;
    target = { x: lightningX, y: lightningY };
    nextLightning = millis() + random(3000, 8000); // next strike 3–8 seconds later
  }

  // Draw lightning if active
  if (flash > 100 && target) {
    stroke(200 + flash / 2, 200 + flash / 2, 255);
    lightningStrike(target.x, target.y);
  }

  // Physarum movement
  if (target) {
    stroke(100, 255, 150);
    for (let p of physarums) {
      p.x += (target.x - p.x) * 0.05 + random(-5, 5);
      p.y += (target.y - p.y) * 0.05 + random(-5, 5);
      point(p.x, p.y);
    }
  }
}

function drawRain() {
  stroke(180 + flash / 2, 180 + flash / 2, 255, 120 + flash / 4);
  for (let r of raindrops) {
    line(r.x, r.y, r.x + 2, r.y + r.len);
    r.y += r.speed;
    r.x += 0.5;
    if (r.y > height) {
      r.y = random(-100, 0);
      r.x = random(width);
    }
  }
}

function drawMoonBehindClouds() {
  noStroke();
  fill(255, 255, 200, 40);
  ellipse(moon.x, moon.y, moon.size + moon.glow);
  fill(255, 250, 210, 180);
  ellipse(moon.x, moon.y, moon.size);

  moon.x += moon.speed;
  if (moon.x - moon.size > width) moon.x = -moon.size;

  noStroke();
  for (let c of clouds) {
    let coverage = map(abs(c.x - moon.x), 0, c.size, 200, c.opacity);
    fill(40 + flash / 3, 40 + flash / 3, 40 + flash / 3, constrain(coverage, 100, 220));
    ellipse(c.x, c.y, c.size * 0.8, c.size * 0.4);
    ellipse(c.x + 40, c.y + 10, c.size * 0.6, c.size * 0.3);
    ellipse(c.x - 50, c.y + 10, c.size * 0.6, c.size * 0.3);
    c.x += c.speed;
    if (c.x - c.size > width) c.x = -c.size;
  }
}

function drawBuildings() {
  noStroke();
  fill(10 + flash / 4);
  for (let b of buildings) {
    rect(b.x, height - b.h, 60, b.h);
  }

  fill(255, 230, 100, 80 + flash / 4);
  for (let b of buildings) {
    for (let w of b.windows) {
      rect(w.x, w.y, 10, 15);
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    let newOnes = [];
    for (let p of physarums) {
      newOnes.push({
        x: p.x + random(-20, 20),
        y: p.y + random(-20, 20)
      });
    }
    physarums = physarums.concat(newOnes);
  }
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
