export function drawBomber(ctx, x, y, direction, count) {
  if(direction === 'l'){
    bomberLeft(ctx, x, y, count);
  } else {
    bomberRight(ctx, x, y, count);
  }
}

function bomberRight(ctx, x, y, count) {
  // static;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x+6, y+8, 8, 2);
  ctx.fillRect(x+4, y+10, 8, 2);
  ctx.fillRect(x+2, y+12, 8, 2);

  ctx.fillStyle = '#55ffff';
  ctx.fillRect(x, y, 6, 2);
  ctx.fillRect(x, y+2, 2, 4);
  ctx.fillRect(x+2, y+6, 2, 4);
  ctx.fillRect(x+4, y+10, 2, 4);
  ctx.fillRect(x+6, y+14, 2, 4);
  ctx.fillRect(x+6, y+2, 2, 2);
  ctx.fillRect(x+8, y+4, 2, 2);
  ctx.fillRect(x+10, y+6, 2, 2);
  ctx.fillRect(x+12, y+8, 22, 2);
  ctx.fillRect(x+8, y+18, 36, 2);
  ctx.fillRect(x+34, y+10, 2, 2);
  ctx.fillRect(x+36, y+12, 2, 2);
  ctx.fillRect(x+38, y+14, 10, 2);
  ctx.fillRect(x+2, y+16, 2, 2);

  ctx.fillStyle = '#ff55ff';
  ctx.fillRect(x+16, y+14, 16, 2);

  // dynamic
  // if(count % 6 < 4){
  //   ctx.fillRect(x+20, y, 24, 2);
  //   ctx.fillRect(x+4, y+4, 2, 6);
  // } else {
  //   ctx.fillRect(x+30, y, 4, 2);
  //   ctx.fillRect(x+2, y+6, 6, 2);
  // }
}

function bomberLeft(ctx, x, y, count) {
  // static;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x+34, y+8, 8, 2);
  ctx.fillRect(x+36, y+10, 8, 2);
  ctx.fillRect(x+38, y+12, 8, 2);

  ctx.fillStyle = '#55ffff';
  ctx.fillRect(x+42, y, 6, 2);
  ctx.fillRect(x+46, y+2, 2, 4);
  ctx.fillRect(x+44, y+6, 2, 4);
  ctx.fillRect(x+42, y+10, 2, 4);
  ctx.fillRect(x+38, y+14, 2, 4);
  ctx.fillRect(x+40, y+2, 2, 2);
  ctx.fillRect(x+38, y+4, 2, 2);
  ctx.fillRect(x+36, y+6, 2, 2);
  ctx.fillRect(x+14, y+8, 22, 2);
  ctx.fillRect(x+4, y+18, 36, 2);
  ctx.fillRect(x+12, y+10, 2, 2);
  ctx.fillRect(x+10, y+12, 2, 2);
  ctx.fillRect(x+0, y+14, 10, 2);
  ctx.fillRect(x+44, y+16, 2, 2);

  ctx.fillStyle = '#ff55ff';
  ctx.fillRect(x+16, y+14, 16, 2);

  // dynamic
  // if(count % 6 < 4){
  //   ctx.fillRect(x+20, y, 24, 2);
  //   ctx.fillRect(x+4, y+4, 2, 6);
  // } else {
  //   ctx.fillRect(x+30, y, 4, 2);
  //   ctx.fillRect(x+2, y+6, 6, 2);
  // }
}
