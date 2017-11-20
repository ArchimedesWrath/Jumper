function Platform(x, y) {
    this.width = 40;
    this.height = 10;
    this.x = x;
    this.y = y;

    this.show = function() {
      fill(0, 155, 0);
      noStroke();
      rectMode(CENTER);
      rect(this.x, this.y, this.width, this.height);
    }
}