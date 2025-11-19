const sparkleCanvas = document.createElement("canvas");
sparkleCanvas.id = "sparkles";
document.body.appendChild(sparkleCanvas);

const sctx = sparkleCanvas.getContext("2d");
sparkleCanvas.width = window.innerWidth;
sparkleCanvas.height = window.innerHeight;
sparkleCanvas.style.position = "fixed";
sparkleCanvas.style.top = "0";
sparkleCanvas.style.left = "0";
sparkleCanvas.style.pointerEvents = "none";
sparkleCanvas.style.zIndex = "9999";

let sparkles = [];

document.addEventListener("mousemove", e => {
  for (let i = 0; i < 4; i++) {
    sparkles.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 4 + 2,
      alpha: 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      color: `hsla(${Math.random() * 360}, 90%, 70%,`
    });
  }
});

function drawSparkles() {
  sctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);

  sparkles.forEach((s, index) => {
    s.x += s.speedX;
    s.y += s.speedY;
    s.alpha -= 0.02;

    if (s.alpha <= 0) sparkles.splice(index, 1);

    sctx.fillStyle = `${s.color}${s.alpha})`;
    sctx.beginPath();
    sctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    sctx.fill();
  });

  requestAnimationFrame(drawSparkles);
}

drawSparkles();
