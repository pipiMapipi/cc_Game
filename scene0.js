function scene0() {
  background(230);
  fill(0);
  textSize(15);
  textStyle(BOLD);
  textAlign(CENTER);
  text("Press WASD to move", width / 2, 350);
  text("Press ENTER to talk with NPCs", width / 2, 380);

  triangle(
    width / 2,
    10 + sin(millis() / 100) * 10,
    width / 2 - 10,
    20 + sin(millis() / 100) * 10,
    width / 2 + 10,
    20 + sin(millis() / 100) * 10
  );
  me.display();
  me.checkMovement();
  sceneChange();
  if (me.col <= me.r) {
    nextScene = true;
    me.col = height - me.r;
  }
}
