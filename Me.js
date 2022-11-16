class Me {
  constructor(_row, _col, _r) {
    this.row = _row;
    this.col = _col;
    this.r = _r;
  }

  display() {
    fill(255);
    ellipse(this.row, this.col, this.r * 2);
  }

  checkMovement() {
    if (
      (keyIsDown(LEFT_ARROW) || keyIsDown(65 /*a*/)) &&
      !isWall(scene, this.row - meSpeed, this.col)
    ) {
      this.row -= meSpeed;
    } else if (
      (keyIsDown(RIGHT_ARROW) || keyIsDown(68 /*d*/)) &&
      !isWall(scene, this.row + meSpeed, this.col)
    ) {
      this.row += meSpeed;
    } else if (
      (keyIsDown(UP_ARROW) || keyIsDown(87 /*w*/)) &&
      !isWall(scene, this.row, this.col - meSpeed)
    ) {
      this.col -= meSpeed;
    } else if (
      (keyIsDown(DOWN_ARROW) || keyIsDown(83 /*s*/)) &&
      !isWall(scene, this.row, this.col + meSpeed)
    ) {
      this.col += meSpeed;
    }
  }
}
