class Flower {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.r = 50;
    this.flowerX = _x;
    this.flowerY = _y;
    this.speed = 40;
  }

  display() {
    if (!evilFlower) {
      fill(255);
    } else {
      fill(255, 0, 0);
    }
    ellipse(this.x, this.y, this.r);
  }

  flowerAttack() {
    if (evilFlower) {
      let posX = (me.row - this.flowerX) / this.speed;
      let posY = (me.col - this.flowerY) / this.speed;
      this.flowerX += posX;
      this.flowerY += posY;
      fill(255, 0, 0);
      ellipse(this.flowerX, this.flowerY, 20);
    }
  }
}
