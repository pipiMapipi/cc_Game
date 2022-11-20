class Mouth {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.r = 20;
    this.time = 0;
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.r * 2, this.r * 2 + cos(millis() / 80) * 5);
  }

  catchDetection() {
    let distMeMouth = dist(me.row, me.col, this.x, this.y);
    if (distMeMouth <= me.r + this.r) {
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
