/////////////// Scene 12///////////////
function scene12() {
  background(0, 0, 255);
  fill(220);
  rect(width / 2 - roadWidth / 2, 0, roadWidth, 300);
  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();
  scarfIcon();

  attackCountdown++;

  if (attackCountdown >= 60 && life.now > 0) {
    monster.display();
    monster.checkMovement();
    monster.kill();
  } else if (attackCountdown < 60) {
    monster.row = width / 2;
    monster.col = monster.r;
  }

  // escape
  exit = collideRectCircle(
    0,
    300 - meSpeed,
    width,
    100,
    me.row,
    me.col,
    me.r * 2
  );
  if (exit) {
    fill(0);
    rect(width / 2 - 150, 320, 300, 60);
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(30);
    text("TICKET, PLEASE", width / 2, 365);

    if (HE) {
      scene = 13;
      me.col = 140;
    }
    if (BE) {
      fadeOffset += 3;
      fill(0, fadeOffset);
      rect(0, 0, width, height);
    }
  }

  if (fadeOffset >= 255) {
    scene = 14;
    fadeOffset = 255;
  }
}
