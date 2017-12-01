function Platform(x, y, w, h) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.arr = [];

    this.show = function() {
      fill(0, 155, 0);
      noStroke();
      rectMode(CENTER);
      rect(this.x, this.y, this.width, this.height);
    }

    this.hit = function(x1, y1, x2, y2) {

        if(y2 >= y1 - 15 && y2 <= y1 && x2 >= x1 - 20 && x2 <= x1 + 20) {
            return true;
        }
        return false;
    }
}