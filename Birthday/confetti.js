const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const total = 250;

for (let i = 0; i < total; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    w: 8 + Math.random() * 8,
    h: 8 + Math.random() * 8,
    speed: 2 + Math.random() * 4,
    angle: Math.random() * 360,
    spin: 2 + Math.random() * 4,
    color: `hsl(${Math.random() * 360}, 90%, 60%)`
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.angle += p.spin;
    p.y += p.speed;
    p.x += Math.sin(p.angle * Math.PI / 180) * 1.2;

    if (p.y > canvas.height + 20) {
      p.y = -20;
      p.x = Math.random() * canvas.width;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.angle * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  });

  requestAnimationFrame(draw);
}

draw();
