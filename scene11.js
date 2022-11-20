/////////////// Scene 11///////////////
function scene11() {
  background(0, 0, 255);
  fill(220);
  rect(width / 2 - roadWidth / 2, 0, roadWidth, 120);
  rect(50, 20, 200, roadWidth);
  rect(50, 20, roadWidth, 215);
  rect(50, 135, 500, roadWidth);
  rect(450, 135, roadWidth, 215);
  rect(width / 2 - roadWidth / 2, 250, 200, roadWidth);
  rect(width / 2 - roadWidth / 2, 250, roadWidth, height / 2);

  // mouths
  for (let i = 0; i < mouths11.length; i++) {
    if (me.col > 135 && me.row > mouths11[i].x) {
      mouths11[i].display();
      mouths11[i].catchDetection();
    }
  }

  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();
  scarfIcon();

  attackCountdown++;

  if (attackCountdown >= 40 && life.now > 0) {
    monster.display();
    monster.checkMovement();
    monster.kill();
  } else if (attackCountdown < 40) {
    monster.row = width / 2;
    monster.col = monster.r;
  }

  // hands
  for (let i = 0; i < hands11.length; i++) {
    if (
      me.col >= hands11[i].y - 30 &&
      dist(me.row, me.col, hands11[i].x + 35, hands11[i].y) <
        100 - hands11[i].side * 7
    ) {
      hands11[i].move(1);
      hands11[i].catchDetection();
    }

    hands11[i].display();
  }

  // drop ticket
  if (me.col > 315 && me.row < width / 2 + roadWidth && !pick) {
    haveTicket = false;
  }

  if (!haveTicket) {
    fill(0);
    rect(width / 2 + 20, 300, 30, 15);

    pickOffset++;

    // pick up ticket
    let pickTicket = collideRectCircle(
      width / 2 + 20,
      300,
      30,
      15,
      me.row,
      me.col,
      me.r * 2
    );

    if (pickTicket && pickOffset >= 20) {
      haveTicket = true;
      pick = true;
    }
  }

  if (me.col > height) {
    nextScene = true;
    sceneChange();
    me.col = me.r;
    attackCountdown = 0;
  }
}
