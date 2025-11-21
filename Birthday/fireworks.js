const fw = document.getElementById("fireworks");
const ctx = fw.getContext("2d");

fw.width = window.innerWidth;
fw.height = window.innerHeight;

const fireworks = [];
const particles = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Firework {
  constructor() {
    this.x = random(0, fw.width);
    this.y = fw.height;
    this.targetY = random(100, fw.height / 2);
    this.speed = random(4, 7);
    this.color = `hsl(${random(0, 360)}, 100%, 60%)`;
  }
  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      for (let i = 0; i < 50; i++) particles.push(new Particle(this.x, this.y, this.color));
      return true;
    }
    return false;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
    this.alpha = 1;
    this.color = color;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 4, 4);
    ctx.globalAlpha = 1;
  }
}

function animate() {
  ctx.clearRect(0, 0, fw.width, fw.height);

  if (Math.random() < 0.05) fireworks.push(new Firework());

  fireworks.forEach((fw, i) => {
    fw.draw();
    if (fw.update()) fireworks.splice(i, 1);
  });

  particles.forEach((p, i) => {
    p.draw();
    p.update();
    if (p.alpha <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();
