class FlowerBullet {
  constructor(flower) {
    this.x = flower.x;
    this.y = flower.y;
    this.initX = flower.x;
    this.initY = flower.y;
    this.r = 10;
    this.speed = 30;
    this.time = 0;
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.r * 2);
    if (dist(me.row, me.col, this.x, this.y) < me.r) {
      this.x = this.initX;
      this.y = this.initY;
    }
  }

  move() {
    let posX = (me.row - this.x) / this.speed;
    let posY = (me.col - this.y) / this.speed;
    this.x += posX;
    this.y += posY;
  }

  hitDetection() {
    if (dist(me.row, me.col, this.x, this.y) < me.r + 3) {
      this.time += 0.05;
      if (this.time <= 0.05) {
        life.now--;
      }
      if (this.time >= 1) {
        this.time = 0;
      }
    }
  }
}
