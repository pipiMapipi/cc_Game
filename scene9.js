/////////////// Scene 9 (8.2) ///////////////
function scene9() {
  background(0, 0, 255);
  fill(220);
  rect(0, 165, width / 2, roadWidth);
  rect(width / 2 - 50, 165, roadWidth, height);
  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();
  scarfIcon();

  attackCountdown++;

  if (life.now != 0 && attackCountdown >= 30) {
    monster.display();
    monster.checkMovement();
    monster.kill();
  }

  if (me.col > height) {
    nextScene = true;
    sceneChange();
    me.col = me.r;
    attackCountdown = 0;
  }
}
