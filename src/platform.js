function Platform(x, y, w, h) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;

    this.show = function() {
      fill(0, 155, 0);
      noStroke();
      rectMode(CENTER);
      rect(this.x, this.y, this.width, this.height);
    }
}