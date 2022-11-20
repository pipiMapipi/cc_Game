/////////////// Scene 4 ///////////////
function scene4() {
  background(0, 0, 255);
  fill(220);
  rect(0, height / 2, width / 2 + roadWidth / 2, roadWidth);
  rect(width / 2 - roadWidth / 2, 0, roadWidth, height / 2 + roadWidth);
  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();

  scarfDisplay();
  scarfIcon();

  if (me.col - me.r < 0) {
    nextScene = true;
    sceneChange();
    me.col = height - me.r;
  }
}

function scarfDisplay() {
  fill(150);
  rect(width / 2 - 45, height / 2 + 5, 90, 90);
  rect(width / 2 + 85, height / 2 + 5, 90, 90);

  let touchScarf = collideRectCircle(
    width / 2 - 45,
    height / 2 + 5,
    90,
    90,
    me.row,
    me.col,
    (me.r + meSpeed) * 2
  );
  if (touchScarf) {
    if (!haveScarf) {
      fill(250);
      rect(width / 2 - 30, height / 2 + 110, 60, 20);
    } else {
      fill(0);
      rect(width / 2 - 30, height / 2 + 110, 60, 20);
      me.row = width / 2;
      me.col = height / 2 - me.r;
    }
  }
  return touchScarf;
}
