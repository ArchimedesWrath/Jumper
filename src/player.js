function Player(x, y, size, grav) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.gravity = grav;
  this.bounceForce = 0;
  this.moveDirection = 0;

  this.show = function() {
    fill(255, 0, 155);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
  }

  this.setMoveDirection = function(x){
    this.moveDirection = x;
  }

  this.move = function() {

    if(this.bounceForce < 0) this.bounceForce += 0.2;
    this.y += this.gravity + this.bounceForce;
    this.x += this.moveDirection;

  }
}