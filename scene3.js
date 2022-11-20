/////////////// Scene 3 ///////////////
function scene3() {
  background(0, 0, 255);
  fill(220);
  rect(0, height / 2, width, roadWidth);
  me.display();
  me.checkMovement();
  ticketIcon();
  lifeIcon();

  if (me.row + me.r > width) {
    nextScene = true;
    sceneChange();
    me.row = me.r;
  }
}
