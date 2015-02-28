$ ->
  c = $("canvas")[0]
  context = c.getContext("2d")
  context.arc(100, 100, 30, 0, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();
  context.lineWidth = 5;
  context.stroke();
  console.log "Started"
