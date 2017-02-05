export function drawHelicopter(ctx, x, y, direction, count) {
  if(direction === 'l'){
    helicopterLeft(ctx, x, y, count);
  } else {
    helicopterRight(ctx, x, y, count);
  }
}

function helicopterLeft(ctx, x, y, count) {
  // static
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x+14, y+2, 4, 2);
  ctx.fillRect(x+8, y+4, 16, 2);
  ctx.fillRect(x+6, y+6, 10, 2);
  ctx.fillRect(x+24, y+6, 18, 2);
  ctx.fillRect(x+4, y+8, 10, 2);
  ctx.fillRect(x+28, y+8, 10, 2);
  ctx.fillRect(x+4, y+10, 2, 2);
  ctx.fillRect(x+26, y+10, 2, 2);
  ctx.fillRect(x+6, y+12, 2, 2);
  ctx.fillRect(x+24, y+12, 2, 2);
  ctx.fillRect(x+8, y+14, 16, 2);
  ctx.fillStyle = '#55ffff';
  ctx.fillRect(x, y+16, 2, 2);
  ctx.fillRect(x+10, y+16, 2, 2);
  ctx.fillRect(x+20, y+16, 2, 2);
  ctx.fillRect(x+2, y+18, 30, 2);
  // dynamic
  ctx.fillStyle = '#ff55ff';
  if(count % 6 < 4){
    ctx.fillRect(x+4, y, 24, 2);
    ctx.fillRect(x+42, y+4, 2, 6);
  } else {
    ctx.fillRect(x+14, y, 4, 2);
    ctx.fillRect(x+40, y+6, 6, 2);
  }
}

function helicopterRight(ctx, x, y, count) {
  // static;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x+30, y+2, 4, 2);
  ctx.fillRect(x+24, y+4, 16, 2);
  ctx.fillRect(x+32, y+6, 10, 2);
  ctx.fillRect(x+6, y+6, 18, 2);
  ctx.fillRect(x+34, y+8, 10, 2);
  ctx.fillRect(x+10, y+8, 10, 2);
  ctx.fillRect(x+42, y+10, 2, 2);
  ctx.fillRect(x+20, y+10, 2, 2);
  ctx.fillRect(x+22, y+12, 2, 2);
  ctx.fillRect(x+40, y+12, 2, 2);
  ctx.fillRect(x+24, y+14, 16, 2);
  ctx.fillStyle = '#55ffff';
  ctx.fillRect(x+26, y+16, 2, 2);
  ctx.fillRect(x+36, y+16, 2, 2);
  ctx.fillRect(x+46, y+16, 2, 2);
  ctx.fillRect(x+16, y+18, 30, 2);
  // dynamic
  ctx.fillStyle = '#ff55ff';
  if(count % 6 < 4){
    ctx.fillRect(x+20, y, 24, 2);
    ctx.fillRect(x+4, y+4, 2, 6);
  } else {
    ctx.fillRect(x+30, y, 4, 2);
    ctx.fillRect(x+2, y+6, 6, 2);
  }
}
