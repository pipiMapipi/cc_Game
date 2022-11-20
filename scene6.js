/////////////// Scene 6 ///////////////
function scene6() {
  background(0, 0, 255);
  fill(220);
  rect(width / 2 - roadWidth / 2, 280, roadWidth, height / 2);
  rect(50, 280, width / 2, roadWidth);
  rect(50, 165, roadWidth, roadWidth * 2 + 15);
  rect(50, 165, width, roadWidth);
  // painting
  fill(100);
  rect(30, 40, 200, 100);

  // mouths
  for (let i = 0; i < mouths.length; i++) {
    if (me.col < 265 && me.row > mouths[i].x) {
      mouths[i].display();
      mouths[i].catchDetection();
    }
  }
  // me
  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();
  scarfIcon();

  // eyes
  if (me.col < 265) {
    eye1.display();
  }
  if (me.row > width / 2 + roadWidth) {
    eye2.display();
  }

  // Texts
  for (let i = 0; i < scene6Text.length; i++) {
    fill(255, 0, 0);
    textSize(25);
    if (me.col < 265 && me.row >= 300 + i * 60) {
      text(scene6Text[i], 300 + i * 60, 70 + (i % 2) * 50);
    }
  }

  if (me.row > width) {
    nextScene = true;
    sceneChange();
    me.row = me.r;
  }
}
