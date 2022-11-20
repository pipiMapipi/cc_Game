/////////////// Scene 5 ///////////////
function scene5() {
  background(0, 0, 255);
  fill(220);
  rect(width / 2 - roadWidth / 2, 0, roadWidth, height);
  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();
  scarfIcon();

  handsOut();

  if (me.col - me.r < 0) {
    nextScene = true;
    sceneChange();
    me.col = height - me.r;
  }
}

function handsOut() {
  for (let i = 0; i < hands.length; i++) {
    if (me.col <= hands[i].y + 30) {
      hands[i].move(1);
      hands[i].wallText();
      hands[i].catchDetection();
    } else {
      hands[i].move(-1);
    }

    hands[i].display();
  }
}
