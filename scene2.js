/////////////// Scene 2 ///////////////
function scene2() {
  background(0, 0, 255);
  fill(220);
  rect(width / 2 - roadWidth / 2, height / 2, roadWidth, height / 2);
  rect(width / 2 - roadWidth / 2, height / 2, width, roadWidth);

  // counter
  fill(0);
  rect(width / 2 - 100, height / 2 - 50, 200, 50);
  rect(
    width / 2 - me.r,
    height / 2 - 85 + sin(millis() / 100) * 5,
    me.r * 2,
    me.r * 2
  );

  me.display();
  me.checkMovement();
  counterCheck();
  ticketIcon();
  lifeIcon();
  nextRoom();
}

function counterCheck() {
  let receptionist = collideRectCircle(
    width / 2 - 100,
    height / 2 - 50,
    200,
    50,
    me.row,
    me.col,
    (me.r + meSpeed) * 2
  );
  if (receptionist) {
    if (!haveLife) {
      fill(220);
      rect(width / 2 - 50, height / 2 - 130, 100, 30);
    } else {
      fill(255, 0, 0);
      rect(width / 2 - 50, height / 2 - 130, 100, 30);
    }
  }
  return receptionist;
}

function nextRoom() {
  // go to the next room
  if (haveLife) {
    if (me.row + me.r > width) {
      nextScene = true;
      sceneChange();
      me.row = me.r;
    }
  }
}
