class Hand {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.startX = x;
    this.startY = y;
    this.offset = 0;
    this.time = 0;
  }

  display() {
    fill(0, 0, 255);
    rect(
      this.x,
      this.y + sin(millis() / 100 + this.offset / this.side) * 5,
      70,
      20
    );
  }

  wallText() {
    textAlign(CENTER);
    textSize(25);
    fill(255, 0, 0);
    if (this.side == -1) {
      text("WHERE?", this.x - 100, this.y + 50);
    } else {
      text("WHERE!!", this.x + 170, this.y + 50);
    }
  }

  move(direction) {
    // hands out
    if (direction == 1) {
      if (this.offset < 1) {
        this.offset += 0.1;
      } else {
        this.offset = 1;
      }
    } else {
      // hands back
      if (this.offset > 0) {
        this.offset -= 0.1;
      } else {
        this.offset = 0;
      }
    }

    if (this.side == -1) {
      // left hands
      this.x = lerp(this.startX, this.startX + 55, this.offset);
    } else {
      // right hands
      this.x = lerp(this.startX, this.startX - 55, this.offset);
    }
  }

  catchDetection() {
    if (
      (this.side == 1 && me.row + me.r >= 295 && me.col + me.r > this.y) ||
      (this.side == -1 && me.row - me.r <= 305 && me.col + me.r > this.y)
    ) {
      this.time += 0.04;
      if (this.time <= 0.04) {
        life.now--;
      }
      if (this.time >= 2) {
        this.time = 0;
      }
    }
  }
}
