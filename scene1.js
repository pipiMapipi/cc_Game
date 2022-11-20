/////////////// Scene 1 ///////////////
function scene1() {
  const museum = { w: 400, h: 100 };
  const door = { w: 100, h: 40 };

  background(0, 250, 0);
  fill(0);
  // wall: rect(width/2-museum.w/2, 0, museum.w, museum.h)
  rect(
    width / 2 - museum.w / 2 + me.r,
    0,
    museum.w - me.r * 2,
    museum.h - me.r
  );
  fill(255);
  rect(width / 2 - door.w / 2, museum.h - door.h, door.w, door.h - me.r);
  me.display();
  me.checkMovement();
  checkTicket(museum, door);
  ticketIcon();
}

function checkTicket(museum, door) {
  let security = collideRectCircle(
    width / 2 - door.w / 2,
    museum.h - door.h,
    door.w,
    door.h - me.r + meSpeed,
    me.row,
    me.col,
    me.r * 2
  );
  if (security) {
    if (!haveTicket) {
      fill(150);
      rect(width / 2 - door.w, museum.h - door.h - 25, door.w * 2, door.h);
      showFigure = true;
    } else {
      if (
        me.row - me.r > width / 2 - door.w / 2 &&
        me.row + me.r < width / 2 + door.w / 2
      ) {
        nextScene = true;
        sceneChange();
        me.col = height - me.r;
      }
    }
  }

  if (showFigure) {
    mysteriousFigure();
    getTicket();
  }
}

function mysteriousFigure() {
  fill(0);
  rect(500, 300 + sin(millis() / 100) * 5, me.r * 2, me.r * 2);
}

function getTicket() {
  let approach = collideRectCircle(
    500,
    300,
    me.r * 2,
    me.r * 2,
    me.row,
    me.col,
    (me.r + meSpeed) * 2
  );
  if (approach) {
    if (!haveTicket) {
      fill(150);
      rect(475, 250, 80, 30);
    } else {
      fill(0);
      rect(475, 250, 80, 30);
    }
  }
  return approach;
}
