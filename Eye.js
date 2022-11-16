class Eye {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

  display() {
    fill(0);
    ellipse(
      this.x,
      this.y,
      150 + sin(millis() / 1000) * 10,
      70 + sin(millis() / 1000) * 10
    );
  }
}
