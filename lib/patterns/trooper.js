export function drawTrooper(ctx, x, y){
  ctx.fillStyle = '#ffffff';
  // head
  ctx.fillRect(x+2, y, 4, 4);
  ctx.fillStyle = '#55ffff';
  // torso
  ctx.fillRect(x+2, y+4, 4, 6);
  // arms
  ctx.fillRect(x, y+4, 2, 2);
  ctx.fillRect(x+6, y+4, 2, 2);
  // legs
  ctx.fillRect(x, y+10, 2, 6);
  ctx.fillRect(x+6, y+10, 2, 6);
  // debugger;
}

export function drawChute(ctx, x, y){
  ctx.fillStyle = '#55ffff';
  ctx.fillRect(x+8, y, 8, 2);
  ctx.fillRect(x+4, y+2, 16, 2);
  ctx.fillRect(x+2, y+4, 20, 2);
  ctx.fillRect(x, y+6, 24, 6);
  ctx.fillStyle = '#ff55ff';
  ctx.fillRect(x, y+12, 2, 2);
  ctx.fillRect(x+2, y+14, 2, 4);
  ctx.fillRect(x+4, y+18, 2, 4);
  ctx.fillRect(x+6, y+22, 2, 4);
  ctx.fillRect(x+8, y+26, 2, 2);
  ctx.fillRect(x+22, y+12, 2, 2);
  ctx.fillRect(x+20, y+14, 2, 4);
  ctx.fillRect(x+18, y+18, 2, 4);
  ctx.fillRect(x+16, y+22, 2, 4);
  ctx.fillRect(x+14, y+26, 2, 2);
}
