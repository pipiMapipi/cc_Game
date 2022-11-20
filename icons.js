function ticketIcon() {
  if (haveTicket) {
    fill(255);
    rect(20, 370, 30, 15);
  }
}

function lifeIcon() {
  if (haveLife) {
    if (life.now == 0 && !exit) {
      scene = 15;
    } else if (life.now == 0 && exit) {
      BE = true;
    }
    fill(255);
    rect(520, 15, life.total * 6, 15);
    fill(0, 255, 0);
    let remainLife = map(life.now, 0, 10, 0, life.total * 6);
    rect(520, 15, remainLife, 15);
  }
}

function scarfIcon() {
  if (haveScarf) {
    fill(0);
    rect(me.row - me.r, me.col, me.r * 2, 10);
  }
}
