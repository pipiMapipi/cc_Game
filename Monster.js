class Monster {
  constructor(_row, _col, _r, _me) {
    this.row = _row;
    this.col = _col;
    this.r = _r;
    this.me = _me;
    this.speed = 30;
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.row, this.col, this.r * 2);
  }

  checkMovement() {
    let posX = (this.me.row - this.row) / this.speed;
    let posY = (this.me.col - this.col) / this.speed;

    if (
      !isWall(scene, this.row + posX, this.col) &&
      !isWall(scene, this.row, this.col + posY)
    ) {
      this.row += posX;
      this.col += posY;
    }

    if (isWall(scene, this.row, this.col + posY)) {
      //   this.row += previousX;
      this.row -= 3;
    }
    if (
      this.row < this.me.row &&
      this.col > this.me.col &&
      isWall(scene, this.row + posX, this.col)
    ) {
      this.col -= 3;
    }
    if (
      this.row >= this.me.row &&
      this.col < this.me.col &&
      isWall(scene, this.row + posX, this.col)
    ) {
      this.col += 3;
    }

    // if (
    //   this.row > this.me.row + 1 &&
    //   !isWall(scene, this.row - this.speed, this.col)
    // ) {
    //   this.row -= this.speed;
    // } else if (
    //   this.row < this.me.row - 1 &&
    //   !isWall(scene, this.row + this.speed, this.col)
    // ) {
    //   this.row += this.speed;
    // } else if (
    //   this.col > this.me.col + 1 &&
    //   !isWall(scene, this.row, this.col - this.speed)
    // ) {
    //   this.col -= this.speed;
    // } else if (
    //   this.col < this.me.col - 1 &&
    //   !isWall(scene, this.row, this.col + this.speed)
    // ) {
    //   this.col += this.speed;
    // }
  }
}
