function scene13() {
  background(255);
  fadeOffset -= 1;

  if (fadeOffset <= -100) {
    fill(0);
    rect(width / 2 - 50, 300, 100, 50);
  }
}
