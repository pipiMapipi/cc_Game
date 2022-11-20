/////////////// Scene 7 ///////////////
function scene7() {
  background(0, 0, 255);
  fill(220);
  rect(0, 165, width, roadWidth);
  ellipse(width / 2, height / 2, 300);
  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();
  scarfIcon();

  // Recover?
  if (!extraLife) {
    fill(255);
    rect(width / 2 - 60, height / 2 - 60, 120, 120);
  } else {
    fill(255, 0, 0);
    rect(width / 2 - 60, height / 2 - 60, 120, 120);
  }

  extraLifeCheck();

  for (let i = 0; i < s7Flowers.length; i++) {
    s7Flowers[i].display();
    if (evilFlower) {
      flowerAttack[i].hitDetection();
      flowerAttack[i].move();
      flowerAttack[i].display();
      push();
      textSize(15);
      textAlign(CENTER);
      text(
        scene7Text[i],
        s7Flowers[i].x + (s7Flowers[i].x - width / 2) / 2,
        s7Flowers[i].y + (s7Flowers[i].y - height / 2) / 3.5
      );
      pop();
    }
  }

  if (me.row + me.r > width && evilFlower) {
    nextScene = true;
    sceneChange();
    me.row = me.r;
  }
}

function extraLifeCheck() {
  let Credence = collideRectCircle(
    width / 2 - 60,
    height / 2 - 60,
    120,
    120,
    me.row,
    me.col,
    (me.r + meSpeed) * 2
  );
  if (Credence) {
    if (!extraLife) {
      fill(255);
      rect(width / 2 - 50, height / 2 + 70, 100, 30);
    }
  }
  return Credence;
}
