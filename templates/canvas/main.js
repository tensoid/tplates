var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function loop() {
  requestAnimationFrame(loop);

  // clear canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw stuff
  ctx.fillStyle = "lightblue";
  ctx.fillRect(100, 100, 100, 100);
  ctx.fillStyle = "lightgreen";
  ctx.ellipse(300, 300, 50, 50, 0, 0, 2 * Math.PI);
  ctx.fill();
}

loop();