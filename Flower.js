class Flower {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.r = 50;
  }

  display() {
    if (!evilFlower) {
      fill(255);
    } else {
      fill(255, 0, 0);
    }
    ellipse(this.x, this.y, this.r);
  }
}
