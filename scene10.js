/////////////// Scene 10///////////////
function scene10() {
  background(0, 0, 255);
  fill(220);
  rect(width / 2 - roadWidth / 2, 0, roadWidth, height);
  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();
  scarfIcon();

  attackCountdown++;

  for (let i = 0; i < s10Flowers.length; i++) {
    s10Flowers[i].display();
    if (attackCountdown > 20) {
      flowerAttack10[i].hitDetection();
      flowerAttack10[i].move();
      flowerAttack10[i].display();
    }
  }

  if (attackCountdown >= 40 && life.now > 0) {
    monster.display();
    monster.checkMovement();
    monster.kill();
  } else if (attackCountdown < 40) {
    monster.row = width / 2;
    monster.col = monster.r;
  }

  if (me.col > height) {
    nextScene = true;
    sceneChange();
    me.col = me.r;
    attackCountdown = 0;
  }
}
