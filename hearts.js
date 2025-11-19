const hearts = [];
const heartCanvas = document.createElement("canvas");

heartCanvas.id = "hearts";
document.body.appendChild(heartCanvas);

const hctx = heartCanvas.getContext("2d");
heartCanvas.width = window.innerWidth;
heartCanvas.height = window.innerHeight;
heartCanvas.style.position = "fixed";
heartCanvas.style.top = 0;
heartCanvas.style.left = 0;
heartCanvas.style.pointerEvents = "none";
heartCanvas.style.zIndex = 5;

function createHeart() {
  hearts.push({
    x: Math.random() * heartCanvas.width,
    y: heartCanvas.height + 20,
    size: Math.random() * 18 + 10,
    speed: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.5 + 0.3
  });
}

setInterval(createHeart, 350);

function drawHearts() {
  hctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);

  hearts.forEach((h, i) => {
    h.y -= h.speed;

    if (h.y < -30) hearts.splice(i, 1);

    hctx.globalAlpha = h.alpha;
    hctx.fillStyle = "red";

    hctx.beginPath();
    hctx.moveTo(h.x, h.y);
    hctx.bezierCurveTo(h.x - h.size, h.y - h.size, h.x - h.size * 1.5, h.y + h.size / 2, h.x, h.y + h.size);
    hctx.bezierCurveTo(h.x + h.size * 1.5, h.y + h.size / 2, h.x + h.size, h.y - h.size, h.x, h.y);
    hctx.fill();
  });

  requestAnimationFrame(drawHearts);
}

drawHearts();
