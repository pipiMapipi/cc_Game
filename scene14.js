function scene14() {
  background(255);
  fill(0, fadeOffset);
  rect(0, 0, width, height);
  fadeOffset -= 1;

  if (fadeOffset <= -100) {
    fill(0);
    rect(width / 2 - 50, 300, 100, 50);
  }
}
