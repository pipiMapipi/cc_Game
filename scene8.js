/////////////// Scene 8 ///////////////
function scene8() {
  background(0, 0, 255);
  fill(220);
  rect(0, 165, width / 2, roadWidth);
  rect(width / 2 - 50, 165, roadWidth, height);

  // Monster Talking
  fill(255, 0, 0);
  ellipse(width / 2 + 10, 215 - 10, 30);
  rect(width / 2 - 30, 215, 25, 25);

  // Text
  if (me.row > width / 2 - roadWidth / 1.3) {
    approachMonster = true;
  }

  if (!monsterAttack) {
    if (!approachMonster) {
      if (textOffset == 50) {
        if (textNum == 1) {
          textNum = 2;
        } else if (textNum == 2) {
          textNum = 1;
        }
        textOffset = 0;
      } else {
        textOffset += 1;
      }
      textSize(25);
      textAlign(CENTER);
      if (textNum == 1) {
        text("IT'S HERE...", width / 2 + roadWidth, 120);
      } else {
        text("IT'S NOT HERE", width / 2 + roadWidth * 1.6, 200);
      }
    } else {
      textSize(30);
      textAlign(CENTER);
      text("IS IT HERE???", width / 2 + roadWidth * 1.7, 230);
      textAlign(LEFT);
      if (me.col <= height / 2) {
        textSize(30);
        text("YES", width / 2 - roadWidth * 1.5, height / 2 + 5);
        textSize(25);
        text("NO", width / 2 - roadWidth * 1.5, height / 2 + 50);
      } else {
        textSize(25);
        text("YES", width / 2 - roadWidth * 1.5, height / 2 + 5);
        textSize(30);
        text("NO", width / 2 - roadWidth * 1.5, height / 2 + 50);
      }
    }
  } else {
    textSize(35);
    textAlign(CENTER);
    text("YOU LIED!!!", width / 2 + random(-5, 5), 150 + random(-10, 10));
    attackCountdown++;
  }

  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();
  scarfIcon();

  if (attackCountdown == 100) {
    nextScene = true;
    sceneChange();
    me.row = width / 2;
    me.col = height / 2 + roadWidth;
    attackCountdown = 0;
  }
}
